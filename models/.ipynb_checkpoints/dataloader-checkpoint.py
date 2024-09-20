from torch.utils.data import Dataset
import rasterio
import numpy as np
from scripts.processing-utils import *

class DPLImageLoader(Dataset):
    """ Loads images and labels into torch datasets"""
    def __init__(self, image_path, label_path):
        self.image_path = image_path
        self.label_path = label_path
         
    def load_tif(self, path, bands=None):
        with rasterio.open(path) as src:
            if bands:
                band_data = src.read(bands)  # This loads data in (C, H, W) format
                band_data = np.transpose(band_data, (1, 2, 0))  # Change to (H, W, C)
                return band_data
            else:
                band_data = src.read()  # Loads all bands
                band_data = np.transpose(band_data, (1, 2, 0))  # Change to (H, W, C)
                return band_data
        
    def __getitem__(self, idx):
        image_path = self.image_paths[idx]
        label_path = self.label_paths[idx]
        image = normalize(resample_image(remove_invalid(self.load_tif(image_path, bands=[4, 5])), (256, 256)))
        label = normalize(resample_image(remove_invalid(self.load_tif(label_path)), (256, 256)))
        img = np.transpose(image, (2, 0, 1))  # From (H, W, C) -> (C, H, W)
        label = label[:, :, 0]  # remove the channel band
        return torch.tensor(img, dtype=torch.float32), torch.tensor(label, dtype=torch.float32)

    def __len__(self):
        return len(self.image_paths)
        