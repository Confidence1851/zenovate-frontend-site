'use client'

import { useEffect, useState } from 'react';
import { Product } from '@/types';
import { getProductThemeColor } from '@/utils/getImageThemeColor';

interface ProductColorIndicatorProps {
  product: Product;
  className?: string;
}

export function ProductColorIndicator({ product, className = "w-6 h-6 rounded-full bg-gray-500" }: ProductColorIndicatorProps) {
  const [color, setColor] = useState<string>('#FFFFFF'); // Start with white

  useEffect(() => {
    getProductThemeColor(product).then((themeColor) => {
      setColor(themeColor);
    });
  }, [product.id, product.image_url]);

  return (
    <div
      className={className}
      style={{
        backgroundColor: color,
        border: color === '#FFFFFF' ? '1px solid #E5E7EB' : 'none', // Add border when white for visibility
      }}
    />
  );
}
