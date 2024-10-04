from models.dpl import DPL
from models.dataloader import DPLImageLoader
from scripts.fileloader import load_files
import os
import logging
import random
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import DataLoader
from tqdm import tqdm
import torch
import numpy as np
from sklearn.metrics import mean_squared_error, r2_score, mean_absolute_error
import matplotlib.pyplot as plt

# DEVICE
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# LOGS
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

# SEEDS
torch.manual_seed(1337)
torch.cuda.manual_seed(1337)
np.random.seed(1337)
random.seed(1337)

# HYPERPARAMETERS
model = DPL(in_channels=2, out_channels=1).to(device)
criterion = nn.MSELoss()
optimizer = optim.Adam(model.parameters(), lr=0.001)
epochs = 20

def train_dpl():
    train_data = "data"
    img, lab, test_img, test_lab = load_files(train_data)
    train_dataset = DPLImageLoader(img, lab)
    train_dataloader = DataLoader(train_dataset, batch_size=16, shuffle=True)
    
    test_dataset = DPLImageLoader(img, lab, num=20)
    test_dataloader = DataLoader(test_dataset, batch_size=16, shuffle=False)

    t_loss = []
    v_loss = []
    t_rmse = []
    v_rmse = []
    t_mae = []
    t_r2 = []    
    
    for epoch in range(epochs):
        model.train()
        running_loss = 0.0
        print(f"Running Epoch {epoch + 1}")
        for x, y_true in tqdm(train_dataloader, desc="Training", leave=False):
            x, y_true = x.to(device), y_true.to(device)
            optimizer.zero_grad()
            y_pred = model(x)
            loss = criterion(y_pred, y_true)
            loss.backward()
            optimizer.step()
            running_loss += loss.item()
            rms = np.sqrt(running_loss / len(train_dataloader))
        print(f'Training loss: {running_loss:.3f}, RMSE: {rms:.3f}')
        t_loss.append(running_loss)
        t_rmse.append(rms)

        model.eval()
        val_loss = 0.0
        all_preds = []
        all_labels = []
            
        with torch.no_grad():
            for x_val, y_val_true in tqdm(test_dataloader, desc="Validation", leave=False):
                x_val, y_val_true = x_val.to(device), y_val_true.to(device)
                y_val_pred = model(x_val)
                val_loss += criterion(y_val_pred, y_val_true).item()
                    
                all_preds.append(y_val_pred.cpu().numpy())
                all_labels.append(y_val_true.cpu().numpy())
    
        avg_val_loss = val_loss / len(test_dataloader)
        print(f'Validation loss: {avg_val_loss:.3f}')
        v_loss.append(avg_val_loss)
    
        y_val_pred_flat = np.concatenate([pred.flatten() for pred in all_preds])
        y_val_true_flat = np.concatenate([label.flatten() for label in all_labels])
        rmse = np.sqrt(mean_squared_error(y_val_true_flat, y_val_pred_flat))
        mae = mean_absolute_error(y_val_true_flat, y_val_pred_flat)
        r2 = r2_score(y_val_true_flat, y_val_pred_flat)
        v_rmse.append(rmse)
        t_mae.append(mae)
        t_r2.append(r2)
        print(f'Validation RMSE: {rmse:.3f}, R² score: {r2:.3f}')
    plot_metrics("Training Loss", "trainloss", t_loss)
    plot_metrics("Validation Loss", "validationloss", v_loss)
    plot_metrics("Training RMSE", "trainrmse", t_rmse)
    plot_metrics("Validation RMSE", "validationrmse", v_rmse)
    plot_metrics("Testing MAE", "mae", t_mae)
    plot_metrics("R2 Accuracy", "r2", t_r2)
    os.makedirs('checkpoints', exist_ok=True)
    torch.save(model.state_dict(), os.path.join('tests', 'building_model.pth'))


def plot_metrics(title, name, met):
    met = np.round(met, 3)
    x_axis_values = np.arange(len(met))
    plt.plot(x_axis_values, met)
    plt.xlabel("Epochs")
    plt.ylabel(name)
    plt.title(title)
    plt.xticks(np.arange(0, len(met), step=2)) 
    plt.grid(True)
    plt.savefig(os.path.join("results", name))
    plt.close()
    

if __name__ == '__main__':
    train_dpl()