import { useState, useEffect } from 'react';
import { getProductThemeColor } from '@/utils/getImageThemeColor';
import { Product } from '@/types';

export function useProductThemeColor(product: Product | null | undefined): string {
  const [color, setColor] = useState<string>('#9CA3AF'); // Default gray

  useEffect(() => {
    if (!product) return;

    getProductThemeColor(product).then((themeColor) => {
      setColor(themeColor);
    });
  }, [product?.id, product?.image_url]);

  return color;
}
