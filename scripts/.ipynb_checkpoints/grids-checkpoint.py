import rasterio
from rasterio.windows import Window
import os
import string

def split_image_into_grids(input_tiff, output_folder, prefix_letter, num_rows=5, num_cols=5):
    with rasterio.open(input_tiff) as src:
        tile_width = src.width // num_cols
        tile_height = src.height // num_rows

        column_letters = string.ascii_uppercase[:num_cols]

        for i in range(num_rows):
            for j in range(num_cols):
                window = Window(j * tile_width, i * tile_height, tile_width, tile_height)
                kwargs = src.meta.copy()
                kwargs.update({
                    'width': tile_width,
                    'height': tile_height,
                    'transform': rasterio.windows.transform(window, src.transform)
                })

                row_number = i + 1
                column_letter = column_letters[j]
                output_tiff = os.path.join(output_folder, f"{prefix_letter}{row_number}{column_letter}.tif")
                with rasterio.open(output_tiff, 'w', **kwargs) as dst:
                    for k in range(1, src.count + 1):
                        dst.write(src.read(k, window=window), indexes=k)


if __name__ == '__main__':
    input_tiff = 'data/lab/brandenburg2.tif'  
    output_folder = './data/lab' 
    prefix_letter = 'Bb'  
    
    split_image_into_grids(input_tiff, output_folder, prefix_letter, num_rows=5, num_cols=5)
