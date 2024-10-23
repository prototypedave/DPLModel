# DPLModel

**DPLModel** is a Python-based deep learning project designed for building height prediction using satellite images (Sentinel-2 data). The project utilizes a U-Net architecture for image segmentation and regression to predict building heights and footprints from satellite images. It includes data preprocessing, model training, and evaluation scripts.

## Features
- Building height prediction from Sentinel-2 images
- U-Net based architecture for segmentation and regression tasks
- Preprocessing of satellite images with normalization and resampling
- Data augmentation and transformation support
- Performance evaluation with metrics like MSE, RMSE, and R² score

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Model Structure](#model-structure)
- [Data Preprocessing](#data-preprocessing)
- [Training the Model](#training-the-model)
- [Evaluation](#evaluation)
- [Contributing](#contributing)
- [License](#license)

## Installation

To set up the project locally, follow the steps below:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/prototypedave/DPLModel.git
   cd DPLModel
   ```
2. **Create and activate a virtual environment**:
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # For Linux/Mac
   venv\Scripts\activate  # For Windows