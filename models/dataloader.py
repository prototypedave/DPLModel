from torch.utils.data import Dataset
import rasterio
import numpy as np
from scripts.processingUtils import *
import torch

class DPLImageLoader(Dataset):
    """ Loads images and labels into torch datasets"""
    def __init__(self, image_path, label_path, size=256, num=0):
        self.images = [normalizeT(resample_image(remove_invalid(self.load_tif(img, bands=[4, 5])), (size, size))) for img in image_path]
        self.labels = [normalizeT(resample_image(remove_invalid(self.load_tif(lab)), (size, size))) for lab in label_path]
        self.size = size
        if num > 0:
            self.images = self.images[:num]
            self.lab = self.labels[:num]

    

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
        return len(self.images) * 5

    def get_index(self, idx):
        value_range = self.size 
        section = int(idx // value_range)
        return section

    def __getitem__(self, idx):
        img = self.images[self.get_index(idx)] 
        label = self.labels[self.get_index(idx)] 
        img = np.transpose(img, (2, 0, 1))  # From (H, W, C) -> (C, H, W)
        if label.ndim == 2:
            label = np.expand_dims(label, axis=0)
    
        label = torch.tensor(label, dtype=torch.float32).permute(2, 0, 1)
        return torch.tensor(img, dtype=torch.float32), label