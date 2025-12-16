import axios from 'axios';
import { baseUrl } from './api.actions';

export interface DirectCheckoutInitParams {
  product_id: number;
  price_id: string;
  first_name: string;
  last_name: string;
  email: string;
  use_type?: 'patient' | 'clinic';
}

export interface OrderSheetProductPayload {
  product_id: number;
  price_id: string;
  quantity: number;
}

export interface OrderSheetInitParams {
  products: OrderSheetProductPayload[];
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  account_number: string;
  location: string;
  shipping_address?: string;
  additional_information?: string;
  discount_code?: string;
}

export interface DirectCheckoutData {
  checkout_id: string;
  form_session_id: string;
  order_type?: 'regular' | 'order_sheet';
  product_id?: number;
  price_id?: string;
  use_type?: 'patient' | 'clinic' | null;
  products?: Array<{
    product_id: number;
    price_id: string;
    quantity: number;
    selected_price: {
      value: number;
      currency: string;
      frequency?: number;
      unit?: string;
    };
  }>;
  user: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
  };
  product?: {
    id: number;
    name: string;
    selected_price: {
      frequency: number;
      unit: string;
      value: number;
      currency: string;
    };
  };
  customer_info?: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    account_number: string;
    location: string;
    shipping_address?: string | null;
    additional_information?: string | null;
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
      baseUrl('/direct-checkout/init'),
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
 * Initialize order sheet checkout
 */
export async function initOrderSheetCheckout(
  params: OrderSheetInitParams
): Promise<DirectCheckoutData> {
  try {
    const response = await axios.post(
      baseUrl('/direct-checkout/order-sheet/init'),
      params
    );

    if (response.data.success && response.data.data) {
      return response.data.data;
    }

    throw new Error(response.data.message || 'Failed to initialize order sheet checkout');
  } catch (error: any) {
    if (error.response?.status === 422 || error.response?.status === 400) {
      const message = error.response?.data?.message || error.response?.data?.error || 'Validation failed';
      throw new Error(message);
    }

    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }

    if (axios.isAxiosError(error) && !error.response) {
      throw new Error('Network error. Please check your connection and try again.');
    }

    throw new Error(error.message || 'Failed to initialize order sheet checkout');
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
      baseUrl('/direct-checkout/apply-discount'),
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
  checkoutId: string,
  recaptchaToken?: string
): Promise<ProcessPaymentResponse> {
  try {
    const response = await axios.post(
      baseUrl('/direct-checkout/process'),
      {
        checkout_id: checkoutId,
        recaptcha_token: recaptchaToken,
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

/**
 * Get checkout info (order type, products, totals, customer) by reference
 */
export async function getCheckoutInfo(
  reference: string
): Promise<{
  order_type: string
  reference: string
  status: string
  products: Array<{
    product_id: number
    product_slug?: string | null
    name?: string | null
    selected_price?: any
    quantity?: number
  }>
  totals: {
    sub_total: number
    shipping_fee: number
    tax_rate: number
    tax_amount: number
    discount_code?: string | null
    discount_amount: number
    total: number
    currency: string
  }
  customer?: any
}> {
  try {
    const response = await axios.get(
      baseUrl('/direct-checkout/checkout/info'),
      {
        params: { reference },
      }
    );

    if (response.data.success && response.data.data) {
      return response.data.data;
    }

    throw new Error(response.data.message || 'Failed to get payment information');
  } catch (error: any) {
    // Handle not found errors
    if (error.response?.status === 404) {
      throw new Error('Payment not found');
    }

    // Handle other API errors
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }

    // Handle network errors
    if (axios.isAxiosError(error) && !error.response) {
      throw new Error('Network error. Please check your connection and try again.');
    }

    throw new Error(error.message || 'Failed to get payment information');
  }
}

export interface CartSummaryParams {
  products: Array<{
    product_id: number
    price_id: string
    quantity: number
  }>
  discount_code?: string | null
}

export interface CartSummary {
  sub_total: number
  discount_code: string | null
  discount_amount: number
  tax_rate: number
  tax_amount: number
  shipping_fee: number
  total: number
  currency: string
}

/**
 * Calculate cart summary without creating a checkout
 */
export async function calculateCartSummary(
  params: CartSummaryParams
): Promise<CartSummary> {
  try {
    const response = await axios.post(
      baseUrl('/direct-checkout/cart/summary'),
      params
    );

    if (response.data.success && response.data.data) {
      return response.data.data;
    }

    throw new Error(response.data.message || 'Failed to calculate cart summary');
  } catch (error: any) {
    if (error.response?.status === 422 || error.response?.status === 400) {
      const message = error.response?.data?.message || error.response?.data?.error || 'Validation failed';
      throw new Error(message);
    }

    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }

    if (axios.isAxiosError(error) && !error.response) {
      throw new Error('Network error. Please check your connection and try again.');
    }

    throw new Error(error.message || 'Failed to calculate cart summary');
  }
}

