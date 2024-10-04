from sklearn.metrics import mean_squared_error, r2_score, mean_absolute_error
import torch
import os
from models.dpl import DPL
from scripts.fileloader import load_files
from models.testloader import DPLImageLoader
from torch.utils.data import DataLoader
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.colors import ListedColormap, BoundaryNorm
import rasterio
from tqdm import tqdm
from scripts.processingUtils import denormalize
import torch.optim as optim
import torch.nn as nn
import base64
from io import BytesIO

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

def predict_sentinel_images(filename):
    # Load the trained model
    model = DPL(in_channels=2, out_channels=1).to(device)
    model.load_state_dict(torch.load('checkpoints/building_model.pth', weights_only=False))
    
    image_path = [os.path.join("data/sen2", filename)] 
    lab_path = [os.path.join("data/lab", filename)]
    dataset = DPLImageLoader(image_path, lab_path)
    dataloader = DataLoader(dataset, batch_size=16, shuffle=False)
    criterion = nn.MSELoss()

    predicted_image = None
    true_image = None
    
    # Make prediction
    model.eval()
    val_loss = 0.0
    all_preds = []
    all_labels = []
    with torch.no_grad():  
        for x, y, min_tensor, max_tensor in dataloader:
            x, y = x.to(device), y.to(device)
            pred = model(x)
            val_loss += criterion(pred, y).item()
            all_preds.append(pred.cpu().numpy())
            all_labels.append(y.cpu().numpy())
            
            predicted_image = pred.squeeze().cpu().numpy()  
            predicted_image = np.clip(predicted_image, 0, 1)  # Ensure the output is in range [0, 1]
            
            # Convert min and max tensors to numpy (or float if they are scalars)
            min_value = min_tensor.cpu().numpy() if min_tensor.numel() > 1 else min_tensor.item()
            max_value = max_tensor.cpu().numpy() if max_tensor.numel() > 1 else max_tensor.item()
            
            # Denormalize
            predicted_image = denormalize(predicted_image, min_value, max_value)
            true_image = y.squeeze().cpu().numpy()
            true_image = denormalize(true_image, min_value, max_value)
            
            max_value = np.max(true_image)
            print(f"Maximum value in predicted_image: {max_value}")

    avg_val_loss = val_loss / len(dataloader)
    
    y_val_pred_flat = np.concatenate([pred.flatten() for pred in all_preds])
    y_val_true_flat = np.concatenate([label.flatten() for label in all_labels])
    rmse = np.sqrt(mean_squared_error(y_val_true_flat, y_val_pred_flat))
    mae = mean_absolute_error(y_val_true_flat, y_val_pred_flat)
    r2 = r2_score(y_val_true_flat, y_val_pred_flat)

    # Save the predicted image as a GeoTIFF file using rasterio
    output_path = os.path.join("results", filename)
    with rasterio.open(
        output_path,
        'w',
        driver='GTiff',
        height=predicted_image.shape[0],
        width=predicted_image.shape[1],
        count=1,
        dtype='float32',
    ) as dst:
        dst.write(predicted_image, 1)

    # Save the true and predicted images
    plot_image_path = os.path.join("results/plots")
    os.makedirs(plot_image_path, exist_ok=True)

    plot_output_path = os.path.join(plot_image_path, "scatter_plot.png")
    scatt = plot_true_vs_predicted(true_image, predicted_image, rmse, plot_output_path)
    
    true = save_images(true_image, plot_image_path, "true_image.png")
    pred = save_images(predicted_image, plot_image_path, "predicted_image.png")
    
    hist = plot_histogram(predicted_image, true_image, plot_image_path)
    return pred, true, hist, output_path, avg_val_loss, rmse, r2, mae, scatt


def plot_true_vs_predicted(true_values, predicted_values, rmse, output_path):
    # Clip negative values to zero
    true_values = true_values / 10
    predicted_values = predicted_values / 10
    true_values = np.clip(true_values, 0, None)
    predicted_values = np.clip(predicted_values, 0, None)
    
    plt.figure(figsize=(8, 6))
    plt.scatter(true_values, predicted_values, color='blue', s=1, alpha=0.5, label='Predicted vs True')
    plt.plot([0, max(true_values.max(), predicted_values.max())], [0, max(true_values.max(), predicted_values.max())], 'r--', label='Ideal Fit')
    plt.xlabel('True Values')
    plt.ylabel('Predicted Values')
    plt.title('True vs Predicted Values')
    plt.text(0, predicted_values.max(), f'RMSE: {rmse:.2f}', fontsize=12, verticalalignment='top')
    plt.xlim(0, None)
    plt.ylim(0, None)
    plt.legend()
    plt.grid(True)
    plt.savefig(output_path)
    plt.close()
    return encode_image_to_base64(output_path)

def save_images(image, path, file_name):
    image = image / 10
    colors = ['black', '#90EE90', '#32CD32', '#9ACD32', '#FFD700', '#FFA500']
    max_value = max(np.max(image), 20) 
    bounds = [0, 2, 5, 10, 15, 20, max_value]
    cmap = ListedColormap(colors)
    norm = BoundaryNorm(bounds, cmap.N)

    if image.ndim == 3:  
        image = image[0] 

    fig, ax = plt.subplots(figsize=(6, 6))
    im = ax.imshow(image, cmap=cmap, norm=norm)
    ax.axis('off') 

    #cbar = fig.colorbar(im, ax=ax, boundaries=bounds, orientation='horizontal', fraction=0.046, pad=0.04)
    #cbar.set_label('Height in metres')

    save_path = f"{path}/{file_name}"
    plt.savefig(save_path, bbox_inches='tight', pad_inches=0)
    plt.close()
    
    return encode_image_to_base64(save_path)

def plot_histogram(predicted_image, true_image, path):
    predicted_image = predicted_image / 10.0
    true_image = true_image / 10.0
    predicted_image = np.clip(predicted_image, 0, None)
    true_image = np.clip(true_image, 0, None)
    
    # Filter out values less than 2
    predicted_image_filtered = predicted_image[predicted_image >= 2]
    true_image_filtered = true_image[true_image >= 2]
    
    fig, ax = plt.subplots(figsize=(8, 6))
    
    # Plot histogram of both predicted and true images (filtered)
    ax.hist(predicted_image_filtered.flatten(), bins=50, alpha=0.5, label='Predicted', color='blue')
    
    ax.set_title('Predicted vs True Heights')
    ax.set_xlabel('Height (meters)')
    ax.set_ylabel('Frequency')
    ax.legend(loc='upper right')
    
    # Save the histogram plot
    hist_path = f"{path}/histogram.png"
    plt.savefig(hist_path, bbox_inches='tight')
    plt.close()
    
    return encode_image_to_base64(hist_path)


def encode_image_to_base64(image_path):
    with open(image_path, "rb") as image_file:
        encoded_string = base64.b64encode(image_file.read()).decode('utf-8')
    return encoded_string

if __name__ == "__main__":
    _, _, _, _, _, _, _, _, _ = predict_sentinel_images("B1A.tif")
    
