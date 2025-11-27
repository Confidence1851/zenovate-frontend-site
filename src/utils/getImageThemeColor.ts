/**
 * Extract the dominant color from an image URL
 * Returns a hex color string
 */
export async function getImageThemeColor(imageUrl: string | string[] | null | undefined): Promise<string | null> {
  if (!imageUrl) return null;

  // If it's an array, use the first image
  const url = Array.isArray(imageUrl) ? imageUrl[0] : imageUrl;

  if (!url || typeof url !== 'string') return null;

  try {
    return new Promise((resolve) => {
      const img = new Image();
      // Try to set CORS, but handle cases where it might not work
      img.crossOrigin = 'anonymous';

      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

          if (!ctx) {
            resolve(null);
            return;
          }

          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);

          // Get image data
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imageData.data;

          // Calculate dominant color using a simple approach
          // Sample pixels (every 10th pixel for performance)
          const colorCounts: { [key: string]: number } = {};
          const sampleRate = 10;

          for (let i = 0; i < data.length; i += 4 * sampleRate) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            const a = data[i + 3];

            // Skip transparent pixels
            if (a < 128) continue;

            // Quantize colors to reduce noise (round to nearest 10)
            const qr = Math.round(r / 10) * 10;
            const qg = Math.round(g / 10) * 10;
            const qb = Math.round(b / 10) * 10;

            const colorKey = `${qr},${qg},${qb}`;
            colorCounts[colorKey] = (colorCounts[colorKey] || 0) + 1;
          }

          // Find the most common color
          let maxCount = 0;
          let dominantColor = '';

          for (const [color, count] of Object.entries(colorCounts)) {
            if (count > maxCount) {
              maxCount = count;
              dominantColor = color;
            }
          }

          if (dominantColor) {
            const [r, g, b] = dominantColor.split(',').map(Number);
            const hex = `#${[r, g, b].map(x => {
              const hex = x.toString(16);
              return hex.length === 1 ? '0' + hex : hex;
            }).join('')}`;
            resolve(hex);
          } else {
            resolve(null);
          }
        } catch (error) {
          console.error('Error extracting color:', error);
          resolve(null);
        }
      };

      img.onerror = () => {
        // If CORS fails, try without crossOrigin
        if (img.crossOrigin === 'anonymous') {
          const img2 = new Image();
          img2.onload = () => {
            try {
              const canvas = document.createElement('canvas');
              const ctx = canvas.getContext('2d');

              if (!ctx) {
                resolve(null);
                return;
              }

              canvas.width = img2.width;
              canvas.height = img2.height;
              ctx.drawImage(img2, 0, 0);

              const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
              const data = imageData.data;

              const colorCounts: { [key: string]: number } = {};
              const sampleRate = 10;

              for (let i = 0; i < data.length; i += 4 * sampleRate) {
                const r = data[i];
                const g = data[i + 1];
                const b = data[i + 2];
                const a = data[i + 3];

                if (a < 128) continue;

                const qr = Math.round(r / 10) * 10;
                const qg = Math.round(g / 10) * 10;
                const qb = Math.round(b / 10) * 10;

                const colorKey = `${qr},${qg},${qb}`;
                colorCounts[colorKey] = (colorCounts[colorKey] || 0) + 1;
              }

              let maxCount = 0;
              let dominantColor = '';

              for (const [color, count] of Object.entries(colorCounts)) {
                if (count > maxCount) {
                  maxCount = count;
                  dominantColor = color;
                }
              }

              if (dominantColor) {
                const [r, g, b] = dominantColor.split(',').map(Number);
                const hex = `#${[r, g, b].map(x => {
                  const hex = x.toString(16);
                  return hex.length === 1 ? '0' + hex : hex;
                }).join('')}`;
                resolve(hex);
              } else {
                resolve(null);
              }
            } catch (error) {
              resolve(null);
            }
          };
          img2.onerror = () => resolve(null);
          img2.src = url;
        } else {
          resolve(null);
        }
      };

      img.src = url;
    });
  } catch (error) {
    console.error('Error loading image for color extraction:', error);
    return null;
  }
}

/**
 * Get theme color for a product, with fallback
 */
export async function getProductThemeColor(
  product: { image_url?: string | string[] | null; id: number; name?: string }
): Promise<string> {
  // Try to extract from image
  const extractedColor = await getImageThemeColor(product.image_url);
  if (extractedColor) {
    return extractedColor;
  }

  // Fallback to hash-based color selection
  const fallbackColors = ['#90B9AC', '#AEA581', '#6E6D6B', '#DBD7D6', '#CEF3E9', '#FF6B6B', '#9CA3AF', '#FBBF24', '#60A5FA', '#A78BFA'];
  const hash = product.id.toString().split('').reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);
  return fallbackColors[Math.abs(hash) % fallbackColors.length];
}
