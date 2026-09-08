// AI Image Enhancement Service using Canvas Filter Pipeline

export const enhanceProductImage = (imageSrc) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      canvas.width = img.width || 800;
      canvas.height = img.height || 600;

      // Draw original image
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Get image pixel data for simulated background shadow removal & lighting boost
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        let r = data[i];
        let g = data[i + 1];
        let b = data[i + 2];

        // 1. Contrast & Brightness Enhancement (+15% contrast, +10% brightness)
        r = Math.min(255, Math.max(0, (r - 128) * 1.15 + 128 + 12));
        g = Math.min(255, Math.max(0, (g - 128) * 1.15 + 128 + 12));
        b = Math.min(255, Math.max(0, (b - 128) * 1.15 + 128 + 12));

        // 2. Background whitening filter for dark border shadows
        const isNearWhiteBackground = (r > 200 && g > 200 && b > 200);
        if (isNearWhiteBackground) {
          r = Math.min(255, r + 15);
          g = Math.min(255, g + 15);
          b = Math.min(255, b + 15);
        }

        data[i] = r;
        data[i + 1] = g;
        data[i + 2] = b;
      }

      ctx.putImageData(imageData, 0, 0);

      // Return enhanced base64 data url
      resolve(canvas.toDataURL('image/jpeg', 0.92));
    };

    img.onerror = () => {
      // Fallback: return original image if loading fails
      resolve(imageSrc);
    };

    img.src = imageSrc;
  });
};
