import { type Area } from 'react-easy-crop';

export const getCroppedImg = (
  imageSrc: string,
  pixelCrop: Area,
  naturalWidth: number,
  naturalHeight: number,
): Promise<string | null> => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = imageSrc;
    image.crossOrigin = 'anonymous'; // To avoid CORS issues
    image.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        return reject(new Error('Could not get canvas context'));
      }

      // Calculate the scale factor between the displayed image and the natural image
      const scaleX = naturalWidth / image.width;
      const scaleY = naturalHeight / image.height;

      // Adjust the crop area based on the scale factor
      const cropX = pixelCrop.x * scaleX;
      const cropY = pixelCrop.y * scaleY;
      const cropWidth = pixelCrop.width * scaleX;
      const cropHeight = pixelCrop.height * scaleY;

      canvas.width = cropWidth;
      canvas.height = cropHeight;

      ctx.drawImage(
        image,
        cropX,
        cropY,
        cropWidth,
        cropHeight,
        0,
        0,
        cropWidth,
        cropHeight
      );

      resolve(canvas.toDataURL('image/png'));
    };
    image.onerror = (error) => reject(error);
  });
};