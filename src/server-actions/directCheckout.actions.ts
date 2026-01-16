import axios from 'axios';
import { baseUrl } from './api.actions';

export interface DirectCheckoutInitParams {
  product_id: number;
  price_id: string;
  first_name: string;
  last_name: string;
  email: string;
  use_type?: 'patient' | 'clinic';
  source_path?: string;
}

export interface CalculateTotalsParams {
  product_id?: number;
  price_id?: string;
  products?: OrderSheetProductPayload[];
  discount_code?: string;
  location?: string;
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
  business_name: string;
  medical_director_name: string;
  account_number: string;
  location: string;
  shipping_address?: string;
  additional_information?: string;
  discount_code?: string;
  currency?: 'USD' | 'CAD';
  source_path?: string;
  ref?: string;
}

export interface CartCheckoutInitParams {
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
  currency?: 'USD' | 'CAD';
  source_path?: string;
  ref?: string;
}

export interface OrderSheetCalculateTotalsParams {
  products: OrderSheetProductPayload[];
  discount_code?: string;
  currency?: 'USD' | 'CAD';
  location?: string;
}

export interface DirectCheckoutData {
  form_session_id?: number | string;
  order_type?: 'regular' | 'order_sheet' | 'cart';
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
      frequency?: number;
      unit?: string;
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
  source_path?: string;
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
 * Calculate order sheet totals with discount (no side effects)
 * Pure calculation endpoint for discount preview
 */
export async function calculateOrderSheetTotals(
  params: OrderSheetCalculateTotalsParams
): Promise<DirectCheckoutData> {
  try {
    const response = await axios.post(
      baseUrl('/direct-checkout/order-sheet/calculate-totals'),
      params
    );

    if (response.data.success && response.data.data) {
      return response.data.data;
    }

    throw new Error(response.data.message || 'Failed to calculate totals');
  } catch (error: any) {
    if (error.response?.status === 422 || error.response?.status === 400) {
      const message = error.response?.data?.message || 'Validation failed';
      throw new Error(message);
    }

    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }

    if (axios.isAxiosError(error) && !error.response) {
      throw new Error('Network error. Please check your connection and try again.');
    }

    throw new Error(error.message || 'Failed to calculate totals');
  }
}

/**
 * Initialize cart checkout
 */
export async function initCartCheckout(
  params: CartCheckoutInitParams
): Promise<DirectCheckoutData> {
  try {
    const response = await axios.post(
      baseUrl('/direct-checkout/cart/init'),
      params
    );

    if (response.data.success && response.data.data) {
      return response.data.data;
    }

    throw new Error(response.data.message || 'Failed to initialize cart checkout');
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

    throw new Error(error.message || 'Failed to initialize cart checkout');
  }
}

export interface ProcessDirectCheckoutParams {
  product_id: number;
  price_id: string;
  first_name: string;
  last_name: string;
  email: string;
  use_type?: 'patient' | 'clinic';
  discount_code?: string;
  source_path?: string;
  recaptcha_token?: string;
}

/**
 * Process direct checkout payment (single product)
 * Creates form session and processes payment in one call
 */
export async function processDirectCheckout(
  params: ProcessDirectCheckoutParams
): Promise<ProcessPaymentResponse> {
  try {
    const response = await axios.post(
      baseUrl('/direct-checkout/process'),
      params
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
 * Process cart checkout payment (backward compatibility)
 * TODO: Update cart checkout to use new flow
 */
export async function processCartCheckout(
  sessionId: string,
  recaptchaToken?: string
): Promise<ProcessPaymentResponse> {
  try {
    const response = await axios.post(
      baseUrl('/direct-checkout/cart/process'),
      {
        session_id: sessionId,
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
 * Process order sheet checkout payment (backward compatibility)
 * TODO: Update order sheet checkout to use new flow
 */
export async function processOrderSheetCheckout(
  sessionId: string,
  recaptchaToken?: string
): Promise<ProcessPaymentResponse> {
  try {
    const response = await axios.post(
      baseUrl('/direct-checkout/order-sheet/process'),
      {
        session_id: sessionId,
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
  source_path?: string
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

/**
 * Calculate totals for direct checkout, cart, or order sheet (pure calculation, no side effects)
 */
export async function calculateTotals(
  params: CalculateTotalsParams
): Promise<DirectCheckoutData | CartSummary> {
  try {
    const response = await axios.post(
      baseUrl('/direct-checkout/calculate-totals'),
      params
    );

    if (response.data.success && response.data.data) {
      return response.data.data;
    }

    throw new Error(response.data.message || 'Failed to calculate totals');
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

    throw new Error(error.message || 'Failed to calculate totals');
  }
}

