import axios from 'axios';
import { baseUrl } from './api.actions';

export interface OrderSheetProduct {
  product_id: number;
  price_id: string;
  quantity: number;
}

export interface OrderSheetCustomerInfo {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  account_number: string;
  location: string;
  shipping_address?: string;
  additional_information?: string;
}

export interface OrderSheetCheckoutData {
  checkout_id: string;
  form_session_id: string;
  order_type: string;
  products: Array<{
    product_id: number;
    price_id: string;
    quantity: number;
    selected_price: any;
  }>;
  user: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
  };
  customer_info: OrderSheetCustomerInfo;
  sub_total: number;
  discount_code: string | null;
  discount_amount: number;
  tax_rate: number;
  tax_amount: number;
  shipping_fee: number;
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
 * Initialize order sheet checkout
 */
export async function initOrderSheetCheckout(
  products: OrderSheetProduct[],
  customerInfo: OrderSheetCustomerInfo,
  discountCode?: string | null
): Promise<OrderSheetCheckoutData> {
  try {
    const response = await axios.post(
      baseUrl('/direct-checkout/order-sheet/init'),
      {
        products,
        first_name: customerInfo.first_name,
        last_name: customerInfo.last_name,
        email: customerInfo.email,
        phone: customerInfo.phone,
        account_number: customerInfo.account_number,
        location: customerInfo.location,
        shipping_address: customerInfo.shipping_address,
        additional_information: customerInfo.additional_information,
        discount_code: discountCode || null,
      }
    );

    if (response.data.success && response.data.data) {
      return response.data.data;
    }

    throw new Error(response.data.message || 'Failed to initialize order sheet checkout');
  } catch (error: any) {
    // Handle validation/bad request errors
    if (error.response?.status === 422 || error.response?.status === 400) {
      const message = error.response?.data?.message || 'Validation failed';
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

    throw new Error(error.message || 'Failed to initialize order sheet checkout');
  }
}

/**
 * Process order sheet checkout payment
 */
export async function processOrderSheetCheckout(
  checkoutId: string
): Promise<ProcessPaymentResponse> {
  try {
    const response = await axios.post(
      baseUrl('/direct-checkout/order-sheet/process'),
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






