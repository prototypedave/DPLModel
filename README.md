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
   ```
3. **Install dependencies: Install the required Python packages from the requirements.txt file**:
   ```bash
   pip install -r requirements.txt
   ```

## Usage
1. **Train the model**: Run the training script to start training the U-Net model on the satellite images:
   ```bash
   python -m models.trainDpl 
   ```
2. **Generate predictions**: To predict building heights from new satellite images, use the prediction script:
   ```bash
   python predict.py --input path_to_image.tif --output output_path
   ```

## Model Structure
The project uses a U-Net architecture, which is well-suited for image segmentation and regression tasks. The model predicts building heights and footprints simultaneously from Sentinel-2 data.
-  Input: Sentinel-2 bands (e.g., Band 4, Band 5)
-  Output: Single-band image containing building heights and footprints

## Data PreProcessing
The data preprocessing steps include:
-  Resampling images and labels to a standard size (e.g., 256x256).
-  Normalizing the Sentinel-2 images to ensure consistent input for the model.
-  Removing invalid data points (e.g., -9999 values) and replacing them with a suitable placeholder.

## Training the model
Training is performed using a U-Net architecture, and includes the following steps:
-  Loading the dataset using the custom DPLImageLoader.
-  Applying data augmentation (if enabled in the configuration).
-  Using early stopping to avoid overfitting.
-  Evaluating the model during training with validation data.

## Evaluation
The model is evaluated using standard regression metrics:
-  **Mean Squared Error (MSE)**
-  **Root Mean Squared Error (RMSE)**
-  **R² score**

These metrics help in assessing the accuracy of the building height predictions.

## Contributing
Contributions are welcome! If you would like to contribute to the project:
1. Fork the repository
2. Create a new branch for your feature/bugfix
3. Submit a pull request

Please ensure that your changes are well-documented and tested.

## License