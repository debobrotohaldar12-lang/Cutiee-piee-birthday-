/**
 * Helper to compress user uploaded images using HTML5 Canvas
 * Ensures images fit within localStorage quota (typically < 100KB each)
 */
export const compressImageFile = (file: File): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (!result) {
        resolve("");
        return;
      }

      const img = new Image();
      img.onload = () => {
        try {
          const canvas = document.createElement("canvas");
          let width = img.width;
          let height = img.height;
          const maxDimension = 800;

          if (width > maxDimension || height > maxDimension) {
            if (width > height) {
              height = Math.round((height * maxDimension) / width);
              width = maxDimension;
            } else {
              width = Math.round((width * maxDimension) / height);
              height = maxDimension;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            // Compress as JPEG at 0.78 quality
            const compressed = canvas.toDataURL("image/jpeg", 0.78);
            resolve(compressed);
            return;
          }
        } catch {
          // fallback to original
        }
        resolve(result);
      };

      img.onerror = () => resolve(result);
      img.src = result;
    };

    reader.onerror = () => resolve("");
    reader.readAsDataURL(file);
  });
};
