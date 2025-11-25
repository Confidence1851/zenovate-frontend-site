import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:9802';

export interface DirectCheckoutInitParams {
  product_id: number;
  price_id: string;
  first_name: string;
  last_name: string;
  email: string;
  use_type?: 'patient' | 'clinic';
}

export interface DirectCheckoutData {
  checkout_id: string;
  form_session_id: string;
  product_id: number;
  price_id: string;
  use_type: 'patient' | 'clinic' | null;
  user: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
  };
  product: {
    id: number;
    name: string;
    selected_price: {
      frequency: number;
      unit: string;
      value: number;
      currency: string;
    };
  };
  sub_total: number;
  shipping_fee: number;
  tax_rate: number;
  tax_amount: number;
  discount_code: string | null;
  discount_amount: number;
  total: number;
  currency: string;
  country_code: string;
  country: string;
}

export interface ProcessPaymentResponse {
  payment: {
    id: number;
    reference: string;
  };
  redirect_url: string;
}

/**
 * Initialize direct checkout
 */
export async function initDirectCheckout(
  params: DirectCheckoutInitParams
): Promise<DirectCheckoutData> {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/direct-checkout/init`,
      params
    );

    if (response.data.success && response.data.data) {
      return response.data.data;
    }

    throw new Error(response.data.message || 'Failed to initialize checkout');
  } catch (error: any) {
    // Handle validation errors
    if (error.response?.status === 422 || error.response?.status === 400) {
      const message = error.response?.data?.message || error.response?.data?.error || 'Validation failed';
      throw new Error(message);
    }
    
    // Handle other API errors
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    
    // Handle network errors
    if (axios.isAxiosError(error) && !error.response) {
      throw new Error('Network error. Please check your connection and try again.');
    }
    
    throw new Error(error.message || 'Failed to initialize checkout');
  }
}

/**
 * Apply discount code to checkout
 */
export async function applyDiscountToCheckout(
  checkoutId: string,
  discountCode: string
): Promise<DirectCheckoutData> {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/direct-checkout/apply-discount`,
      {
        checkout_id: checkoutId,
        discount_code: discountCode,
      }
    );

    if (response.data.success && response.data.data) {
      return response.data.data;
    }

    throw new Error(response.data.message || 'Failed to apply discount');
  } catch (error: any) {
    // Handle validation/bad request errors
    if (error.response?.status === 422 || error.response?.status === 400) {
      const message = error.response?.data?.message || 'Invalid discount code';
      throw new Error(message);
    }
    
    // Handle other API errors
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    
    // Handle network errors
    if (axios.isAxiosError(error) && !error.response) {
      throw new Error('Network error. Please check your connection and try again.');
    }
    
    throw new Error(error.message || 'Failed to apply discount');
  }
}

/**
 * Process direct checkout payment
 */
export async function processDirectCheckout(
  checkoutId: string
): Promise<ProcessPaymentResponse> {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/direct-checkout/process`,
      {
        checkout_id: checkoutId,
      }
    );

    if (response.data.success && response.data.data) {
      return response.data.data;
    }

    throw new Error(response.data.message || 'Failed to process payment');
  } catch (error: any) {
    // Handle validation/bad request errors
    if (error.response?.status === 422 || error.response?.status === 400) {
      const message = error.response?.data?.message || 'Payment processing failed';
      throw new Error(message);
    }
    
    // Handle other API errors
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    
    // Handle network errors
    if (axios.isAxiosError(error) && !error.response) {
      throw new Error('Network error. Please check your connection and try again.');
    }
    
    throw new Error(error.message || 'Failed to process payment');
  }
}

