import torch.nn as nn
import torch

class DPL(nn.Module):
    """DPL model with Unet and regression for segmentations and continous building height predictions"""
    def __init__(self, in_channels, out_channels):
        super(DPL, self).__init__()
        
        def conv_block(in_c, out_c):
            return nn.Sequential(
                nn.Conv2d(in_c, out_c, kernel_size=3, padding=1),
                nn.BatchNorm2d(out_c),
                nn.ReLU(inplace=True),
                nn.Conv2d(out_c, out_c, kernel_size=3, padding=1),
                nn.BatchNorm2d(out_c),
                nn.ReLU(inplace=True)
            )

        def upconv_block(in_c, out_c):
            return nn.ConvTranspose2d(in_c, out_c, kernel_size=2, stride=2)

        self.encoder1 = conv_block(in_channels, 64)
        self.encoder2 = conv_block(64, 128)
        self.encoder3 = conv_block(128, 256)
        self.encoder4 = conv_block(256, 512)

        self.pool = nn.MaxPool2d(kernel_size=2, stride=2)
        
        self.middle = conv_block(512, 1024)

        self.upconv4 = upconv_block(1024, 512)
        self.decoder4 = conv_block(1024, 512)
        self.upconv3 = upconv_block(512, 256)
        self.decoder3 = conv_block(512, 256)
        self.upconv2 = upconv_block(256, 128)
        self.decoder2 = conv_block(256, 128)
        self.upconv1 = upconv_block(128, 64)
        self.decoder1 = conv_block(128, 64)

        self.out_conv = nn.Conv2d(64, out_channels, kernel_size=1)
        
    def forward(self, x):
        e1 = self.encoder1(x)
        e2 = self.encoder2(self.pool(e1))
        e3 = self.encoder3(self.pool(e2))
        e4 = self.encoder4(self.pool(e3))
        
        middle = self.middle(self.pool(e4))

        d4 = self.upconv4(middle)
        d4 = torch.cat([d4, e4], dim=1)
        d4 = self.decoder4(d4)
        d3 = self.upconv3(d4)
        d3 = torch.cat([d3, e3], dim=1)
        d3 = self.decoder3(d3)
        d2 = self.upconv2(d3)
        d2 = torch.cat([d2, e2], dim=1)
        d2 = self.decoder2(d2)
        d1 = self.upconv1(d2)
        d1 = torch.cat([d1, e1], dim=1)
        d1 = self.decoder1(d1)

        return self.out_conv(d1)