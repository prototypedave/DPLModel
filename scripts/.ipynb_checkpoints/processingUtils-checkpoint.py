import numpy as np

def remove_invalid(data):
    data = np.where(np.isnan(data), np.nanmedian(data), data)
    finite_max = np.max(data[np.isfinite(data)])
    data = np.where(np.isinf(data), finite_max, data)
    data = np.clip(data, np.nanmin(data), finite_max)
    
    return data
    

def resample_image(image, new_shape):
    """ Resample an image to new dimensions using bilinear interpolation """
    if len(image.shape) == 2:
        # Single-channel image
        src_height, src_width = image.shape
        dst_height, dst_width = new_shape
        resampled_image = np.zeros(new_shape, dtype=np.float32)

        scale_x = src_width / dst_width
        scale_y = src_height / dst_height

        for i in range(dst_height):
            for j in range(dst_width):
                src_x = int(j * scale_x)
                src_y = int(i * scale_y)
                resampled_image[i, j] = image[src_y, src_x]
        return resampled_image

    elif len(image.shape) == 3:
        # Multi-channel image
        src_height, src_width, channels = image.shape
        dst_height, dst_width = new_shape
        resampled_image = np.zeros((dst_height, dst_width, channels), dtype=np.float32)

        for c in range(channels):
            resampled_image[:, :, c] = resample_image(image[:, :, c], new_shape)

        return resampled_image
        

def normalize(data, min_value=None, max_value=None):
    if min_value is None:
        min_value = np.min(data)
    if max_value is None:
        max_value = np.max(data)
    normalized_data = (data - min_value) / (max_value - min_value)
    return normalized_data, min_value, max_value

def denormalize(normalized_data, min_value, max_value):
    return normalized_data * (max_value - min_value) + min_value

def normalizeT(data, min_value=None, max_value=None):
    if min_value is None:
        min_value = np.min(data)
    if max_value is None:
        max_value = np.max(data)
    return (data - min_value) / (max_value - min_value)

