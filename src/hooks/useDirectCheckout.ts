import { useState, useCallback } from 'react';
import {
  initDirectCheckout,
  processDirectCheckout,
  initOrderSheetCheckout,
  DirectCheckoutData,
  ProcessPaymentResponse,
  OrderSheetInitParams,
} from '@/server-actions/directCheckout.actions';

interface UseDirectCheckoutReturn {
  checkoutData: DirectCheckoutData | null;
  isLoading: boolean;
  error: string | null;
  initializeCheckout: (
    productId: number,
    priceId: string,
    firstName: string,
    lastName: string,
    email: string,
    useType?: 'patient' | 'clinic'
  ) => Promise<void>;
  initializeOrderSheetCheckout: (
    params: OrderSheetInitParams
  ) => Promise<void>;
  applyDiscount: (discountCode: string) => Promise<void>;
  removeDiscount: () => Promise<void>;
  processPayment: (recaptchaToken?: string) => Promise<ProcessPaymentResponse>;
  clearError: () => void;
  resetCheckout: () => void;
}

export function useDirectCheckout(): UseDirectCheckoutReturn {
  const [checkoutData, setCheckoutData] = useState<DirectCheckoutData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const initializeCheckout = useCallback(
    async (
      productId: number,
      priceId: string,
      firstName: string,
      lastName: string,
      email: string,
      useType?: 'patient' | 'clinic'
    ) => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await initDirectCheckout({
          product_id: productId,
          price_id: priceId,
          first_name: firstName,
          last_name: lastName,
          email: email,
          use_type: useType,
        });
        setCheckoutData(data);
      } catch (err: any) {
        setError(err.message || 'Failed to initialize checkout');
        setCheckoutData(null);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const initializeOrderSheetCheckout = useCallback(
    async (params: OrderSheetInitParams) => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await initOrderSheetCheckout(params);
        setCheckoutData(data);
      } catch (err: any) {
        setError(err.message || 'Failed to initialize checkout');
        setCheckoutData(null);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const applyDiscount = useCallback(
    async (discountCode: string) => {
      if (!checkoutData) {
        setError('Checkout not initialized');
        return;
      }

      // Discount application is only supported for order sheets and cart checkouts
      // For regular direct checkouts, discounts are not supported at this time
      if (checkoutData.order_type === 'regular' || (!checkoutData.order_type && checkoutData.product_id)) {
        setError('Discount codes are not supported for this checkout type');
        return;
      }

      setError('Discount application not implemented for this checkout type');
    },
    [checkoutData]
  );

  const removeDiscount = useCallback(
    async () => {
      if (!checkoutData) {
        setError('Checkout not initialized');
        return;
      }

      // For order sheets, discount removal should be handled differently
      // This function only works for regular direct checkouts
      if (checkoutData.order_type === 'order_sheet' || !checkoutData.product_id || !checkoutData.price_id) {
        setError('Discount removal not supported for this checkout type');
        return;
      }

      setIsLoading(true);
      setError(null);
      try {
        // Re-initialize checkout without discount by calling init again
        // We need to extract the original params from checkoutData
        const updatedData = await initDirectCheckout({
          product_id: checkoutData.product_id,
          price_id: checkoutData.price_id,
          first_name: checkoutData.user.first_name,
          last_name: checkoutData.user.last_name,
          email: checkoutData.user.email,
          use_type: checkoutData.use_type || undefined,
        });
        setCheckoutData(updatedData);
      } catch (err: any) {
        setError(err.message || 'Failed to remove discount');
      } finally {
        setIsLoading(false);
      }
    },
    [checkoutData]
  );

  const processPayment = useCallback(async (recaptchaToken?: string) => {
    if (!checkoutData) {
      throw new Error('Checkout not initialized');
    }

    setIsLoading(true);
    setError(null);
    try {
      const result = await processDirectCheckout(checkoutData.checkout_id, recaptchaToken);
      return result;
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to process payment';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [checkoutData]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const resetCheckout = useCallback(() => {
    setCheckoutData(null);
    setError(null);
  }, []);

  return {
    checkoutData,
    isLoading,
    error,
    initializeCheckout,
    initializeOrderSheetCheckout,
    applyDiscount,
    removeDiscount,
    processPayment,
    clearError,
    resetCheckout,
  };
}

