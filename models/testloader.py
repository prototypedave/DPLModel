from torch.utils.data import Dataset
import rasterio
import numpy as np
from scripts.processingUtils import *
import torch

class DPLImageLoader(Dataset):
    """ Loads images and labels into torch datasets"""
    def __init__(self, image_path, label_path, size=256, num=0):
        self.images = image_path
        self.labels = label_path
        self.size = size
        if num > 0:
            self.images = self.images[:num]
            self.lab = self.images[:num]

    def load_tif(self, path, bands=None):
        with rasterio.open(path) as src:
            if bands:
                band_data = src.read(bands)
                band_data = np.transpose(band_data, (1, 2, 0))
                return band_data
            else:
                band_data = src.read()
                band_data = np.transpose(band_data, (1, 2, 0))
                return band_data

    def __len__(self):
        return len(self.images)

    def __getitem__(self, idx):
        img, _, _ = normalize(resample_image(remove_invalid(self.load_tif(self.images[idx], bands=[4, 5])), (self.size, self.size)))
        label, min, max = normalize(resample_image(remove_invalid(self.load_tif(self.labels[idx])), (self.size, self.size)))
        if img.ndim == 3:
            img = np.transpose(img, (2, 0, 1))
        if label.ndim == 2:
            label = np.expand_dims(label, axis=0)
    
        label = torch.tensor(label, dtype=torch.float32).permute(2, 0, 1)
        
        return torch.tensor(img, dtype=torch.float32), label, min, max