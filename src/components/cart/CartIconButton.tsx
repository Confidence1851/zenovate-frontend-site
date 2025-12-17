'use client';

import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/stores/cartStore';
import { useEffect, useState } from 'react';

interface CartIconButtonProps {
  onClick: () => void;
}

export function CartIconButton({ onClick }: CartIconButtonProps) {
  const [mounted, setMounted] = useState(false);
  const itemCount = useCartStore((state) => state.getCartItemCount());

  // Handle hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="relative hidden lg:inline-flex"
        onClick={onClick}
        aria-label="Shopping cart"
      >
        <ShoppingCart className="h-5 w-5" />
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className="relative hidden lg:inline-flex"
      onClick={onClick}
      aria-label="Shopping cart"
    >
      <ShoppingCart className="h-5 w-5" />
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
          {itemCount > 99 ? '99+' : itemCount}
        </span>
      )}
    </Button>
  );
}



