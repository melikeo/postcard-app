export async function processImage(base64: string, grayscale: boolean): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const isPortrait = img.height > img.width;
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      const width = isPortrait ? img.height : img.width;
      const height = isPortrait ? img.width : img.height;

      canvas.width = width;
      canvas.height = height;

      if (!ctx) return;

      if (isPortrait) {
        ctx.translate(width / 2, height / 2);
        ctx.rotate(-90 * Math.PI / 180);
        ctx.drawImage(img, -img.width / 2, -img.height / 2);
      } else {
        ctx.drawImage(img, 0, 0);
      }

      if (grayscale) {
        const imageData = ctx.getImageData(0, 0, width, height);
        const data = imageData.data;
        for (let i = 0; i < data.length; i += 4) {
          const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
          data[i] = data[i + 1] = data[i + 2] = avg;
        }
        ctx.putImageData(imageData, 0, 0);
      }

      resolve(canvas.toDataURL('image/jpeg'));
    };
    img.src = base64;
  });
}
