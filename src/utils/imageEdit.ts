export async function processImage(base64: string, grayscale: boolean): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {

      try {
        const MAX_SIZE = 1200;
        const isPortrait = img.height > img.width;

        const originalWidth = img.width;
        const originalHeight = img.height;

        const scale = Math.min(
          MAX_SIZE / (isPortrait ? originalHeight : originalWidth),
          MAX_SIZE / (isPortrait ? originalWidth : originalHeight)
        );

        const scaledWidth = Math.round(originalWidth * scale);
        const scaledHeight = Math.round(originalHeight * scale);

        const canvasWidth = isPortrait ? scaledHeight : scaledWidth;
        const canvasHeight = isPortrait ? scaledWidth : scaledHeight;

        const canvas = document.createElement('canvas');
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      const ctx = canvas.getContext('2d');

      if (!ctx) throw new Error("Canvas context not available.");

      ctx.save();
      if (isPortrait) {
        ctx.translate(canvasWidth / 2, canvasHeight / 2);
        ctx.rotate(-90 * Math.PI / 180);
        ctx.drawImage(
          img, 
          -scaledWidth / 2, 
          -scaledHeight / 2,
          scaledWidth,
          scaledHeight
        );
      } else {
        ctx.drawImage(img, 0, 0, scaledWidth, scaledHeight);
      }
      ctx.restore();

      if (grayscale) {
        const imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
        const data = imageData.data;
        for (let i = 0; i < data.length; i += 4) {
          const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
          data[i] = data[i + 1] = data[i + 2] = avg;
        }
        ctx.putImageData(imageData, 0, 0);
      }

        resolve(canvas.toDataURL('image/jpeg', 0.8));
      } catch (error) {
        reject(`Error in image processing: ${error}`);
      }
    };
    img.onerror = () => reject("Image cannot be processed.");
    img.src = base64;
  });
}
