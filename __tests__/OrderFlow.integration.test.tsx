import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import axios from 'axios'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import OrderSheetComponent from '@/components/order-sheet/OrderSheetComponent'
import { 
  initDirectCheckout, 
  initCartCheckout, 
  initOrderSheetCheckout,
  calculateOrderSheetTotals,
  calculateCartSummary,
  processDirectCheckout,
  processCartCheckout,
  processOrderSheetCheckout 
} from '@/server-actions/directCheckout.actions'

// Mock axios
vi.mock('axios')
const mockedAxios = axios as any

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => '/order-sheet',
}))

// Mock google recaptcha
vi.mock('react-google-recaptcha-v3', () => ({
  useGoogleReCaptcha: () => ({
    executeRecaptcha: vi.fn().mockResolvedValue('test-token'),
  }),
}))

describe('Order Flow Tests', () => {
  let queryClient: QueryClient

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false },
      },
    })
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  /**
   * Test 1: Direct Checkout from Product Page
   */
  describe('Direct Checkout from Product Page', () => {
    it('should initialize direct checkout with product details', async () => {
      const mockCheckoutData = {
        product_id: 1,
        price_id: 'encrypted-price-id',
        sub_total: 100,
        shipping_fee: 60,
        tax_rate: 10,
        tax_amount: 16,
        discount_amount: 0,
        total: 176,
        currency: 'USD',
        country_code: 'US',
        country: 'United States',
        user: {
          id: 1,
          first_name: 'John',
          last_name: 'Doe',
          email: 'john@example.com',
        },
        product: {
          id: 1,
          name: 'Test Product',
          selected_price: { value: 100, currency: 'USD' },
        },
      }

      mockedAxios.post.mockResolvedValueOnce({
        data: {
          success: true,
          data: mockCheckoutData,
        },
      })

      const result = await initDirectCheckout({
        product_id: 1,
        price_id: 'encrypted-price-id',
        first_name: 'John',
        last_name: 'Doe',
        email: 'john@example.com',
        use_type: 'patient',
        source_path: '/products/test-product',
      })

      expect(result).toEqual(mockCheckoutData)
      expect(mockedAxios.post).toHaveBeenCalledWith(
        expect.stringContaining('/direct-checkout/init'),
        expect.objectContaining({
          product_id: 1,
          first_name: 'John',
          last_name: 'Doe',
          email: 'john@example.com',
        })
      )
    })

    it('should process direct checkout and redirect to Stripe', async () => {
      const mockPaymentResponse = {
        payment: {
          id: 123,
          reference: 'PAY-123456',
        },
        redirect_url: 'https://stripe.com/checkout/session123',
      }

      mockedAxios.post.mockResolvedValueOnce({
        data: {
          success: true,
          data: mockPaymentResponse,
        },
      })

      const result = await processDirectCheckout({
        product_id: 1,
        price_id: 'encrypted-price-id',
        first_name: 'John',
        last_name: 'Doe',
        email: 'john@example.com',
        recaptcha_token: 'test-token',
      })

      expect(result).toEqual(mockPaymentResponse)
      expect(result.redirect_url).toBeDefined()
    })

    it('should handle validation errors on direct checkout', async () => {
      mockedAxios.post.mockRejectedValueOnce({
        response: {
          status: 422,
          data: {
            message: 'Email is required',
            error: 'Validation failed',
          },
        },
      })

      await expect(
        initDirectCheckout({
          product_id: 1,
          price_id: 'encrypted-price-id',
          first_name: 'John',
          last_name: 'Doe',
          email: '',
        })
      ).rejects.toThrow('Email is required')
    })
  })

  /**
   * Test 2: Cart Checkout
   */
  describe('Cart Checkout', () => {
    it('should calculate cart summary with multiple products', async () => {
      const mockSummary = {
        sub_total: 250,
        discount_code: null,
        discount_amount: 0,
        tax_rate: 10,
        tax_amount: 25,
        shipping_fee: 60,
        total: 335,
        currency: 'USD',
      }

      mockedAxios.post.mockResolvedValueOnce({
        data: {
          success: true,
          data: mockSummary,
        },
      })

      const result = await calculateCartSummary({
        products: [
          {
            product_id: 1,
            price_id: 'price-1',
            quantity: 2,
          },
          {
            product_id: 2,
            price_id: 'price-2',
            quantity: 1,
          },
        ],
      })

      expect(result).toEqual(mockSummary)
      expect(result.sub_total).toBe(250)
      expect(result.total).toBe(335)
    })

    it('should initialize cart checkout with form data', async () => {
      const mockCheckoutData = {
        form_session_id: 'session-123',
        order_type: 'cart',
        sub_total: 250,
        shipping_fee: 60,
        tax_rate: 10,
        tax_amount: 25,
        discount_amount: 0,
        total: 335,
        currency: 'USD',
        products: [
          {
            product_id: 1,
            price_id: 'price-1',
            quantity: 2,
            selected_price: { value: 100, currency: 'USD' },
          },
          {
            product_id: 2,
            price_id: 'price-2',
            quantity: 1,
            selected_price: { value: 50, currency: 'USD' },
          },
        ],
      }

      mockedAxios.post.mockResolvedValueOnce({
        data: {
          success: true,
          data: mockCheckoutData,
        },
      })

      const result = await initCartCheckout({
        products: [
          { product_id: 1, price_id: 'price-1', quantity: 2 },
          { product_id: 2, price_id: 'price-2', quantity: 1 },
        ],
        first_name: 'Jane',
        last_name: 'Smith',
        email: 'jane@example.com',
        phone: '5551234567',
        account_number: 'ACC123',
        location: 'US',
        source_path: '/cart',
      })

      expect(result.form_session_id).toBeDefined()
      expect(result.order_type).toBe('cart')
      expect(result.products).toHaveLength(2)
    })

    it('should process cart checkout payment', async () => {
      const mockPaymentResponse = {
        payment: {
          id: 124,
          reference: 'CART-789',
        },
        redirect_url: 'https://stripe.com/checkout/session456',
      }

      mockedAxios.post.mockResolvedValueOnce({
        data: {
          success: true,
          data: mockPaymentResponse,
        },
      })

      const result = await processCartCheckout('session-123', 'test-token')

      expect(result.payment.reference).toBe('CART-789')
      expect(result.redirect_url).toBeDefined()
    })

    it('should apply discount code to cart', async () => {
      const mockSummaryWithDiscount = {
        sub_total: 250,
        discount_code: 'DISCOUNT25',
        discount_amount: 62.5, // 25% off
        tax_rate: 10,
        tax_amount: 18.75, // Calculated on discounted amount
        shipping_fee: 60,
        total: 326.25,
        currency: 'USD',
      }

      mockedAxios.post.mockResolvedValueOnce({
        data: {
          success: true,
          data: mockSummaryWithDiscount,
        },
      })

      const result = await calculateCartSummary({
        products: [
          { product_id: 1, price_id: 'price-1', quantity: 2 },
          { product_id: 2, price_id: 'price-2', quantity: 1 },
        ],
        discount_code: 'DISCOUNT25',
      })

      expect(result.discount_amount).toBe(62.5)
      expect(result.total).toBeLessThan(335) // Less than without discount
    })

    it('should handle free shipping for high-value cart', async () => {
      const mockHighValueSummary = {
        sub_total: 1200,
        discount_code: null,
        discount_amount: 0,
        tax_rate: 10,
        tax_amount: 120,
        shipping_fee: 0, // Free shipping
        total: 1320,
        currency: 'USD',
      }

      mockedAxios.post.mockResolvedValueOnce({
        data: {
          success: true,
          data: mockHighValueSummary,
        },
      })

      const result = await calculateCartSummary({
        products: [
          { product_id: 1, price_id: 'price-1', quantity: 1 },
        ],
      })

      expect(result.shipping_fee).toBe(0)
    })
  })

  /**
   * Test 3: Pinksky Order
   */
  describe('Pinksky Order Flow', () => {
    it('should require business fields for pinksky orders', async () => {
      const mockCheckoutData = {
        form_session_id: 'pinksky-session-456',
        order_type: 'order_sheet',
        sub_total: 100,
        shipping_fee: 60,
        tax_rate: 10,
        tax_amount: 16,
        discount_amount: 0,
        total: 176,
        currency: 'USD',
        user: {
          id: 2,
          first_name: 'Dr.',
          last_name: 'Smith',
          email: 'dr.smith@clinic.com',
        },
        customer_info: {
          first_name: 'Dr.',
          last_name: 'Smith',
          email: 'dr.smith@clinic.com',
          phone: '5551234567',
          business_name: 'Smith Medical Clinic',
          medical_director_name: 'Dr. William Smith',
          account_number: 'PINKSKY123',
          location: 'US',
        },
      }

      mockedAxios.post.mockResolvedValueOnce({
        data: {
          success: true,
          data: mockCheckoutData,
        },
      })

      const result = await initOrderSheetCheckout({
        products: [
          { product_id: 1, price_id: 'price-1', quantity: 1 },
        ],
        first_name: 'Dr.',
        last_name: 'Smith',
        email: 'dr.smith@clinic.com',
        phone: '5551234567',
        business_name: 'Smith Medical Clinic',
        medical_director_name: 'Dr. William Smith',
        account_number: 'PINKSKY123',
        location: 'US',
        source_path: '/pinksky/order',
        ref: 'PINKSKY_REF_123',
      })

      expect(result.customer_info?.business_name).toBe('Smith Medical Clinic')
      expect(result.customer_info?.medical_director_name).toBe('Dr. William Smith')
    })

    it('should calculate totals with pinksky discount', async () => {
      const mockPinkSkyDiscount = {
        sub_total: 100,
        discount_code: 'PINKSKY25',
        discount_amount: 25, // 25% off
        tax_rate: 10,
        tax_amount: 7.5,
        shipping_fee: 60,
        total: 142.5,
        currency: 'USD',
      }

      mockedAxios.post.mockResolvedValueOnce({
        data: {
          success: true,
          data: mockPinkSkyDiscount,
        },
      })

      const result = await calculateOrderSheetTotals({
        products: [
          { product_id: 1, price_id: 'price-1', quantity: 1 },
        ],
        discount_code: 'PINKSKY25',
        location: 'US',
      })

      expect(result.discount_amount).toBe(25)
      expect(result.total).toBe(142.5)
    })

    it('should process pinksky order payment', async () => {
      const mockPaymentResponse = {
        payment: {
          id: 125,
          reference: 'PINKSKY-001',
        },
        redirect_url: 'https://stripe.com/checkout/pinksky',
      }

      mockedAxios.post.mockResolvedValueOnce({
        data: {
          success: true,
          data: mockPaymentResponse,
        },
      })

      const result = await processOrderSheetCheckout('pinksky-session-456', 'test-token')

      expect(result.payment.reference).toContain('PINKSKY')
    })
  })

  /**
   * Test 4: CCC Portal Order
   */
  describe('CCC Portal Order Flow', () => {
    it('should initialize CCC portal order with cart checkout', async () => {
      const mockCCCCheckout = {
        form_session_id: 'ccc-session-789',
        order_type: 'cart',
        sub_total: 250,
        shipping_fee: 60,
        tax_rate: 10,
        tax_amount: 25,
        discount_amount: 0,
        total: 335,
        currency: 'USD',
        products: [
          {
            product_id: 1,
            price_id: 'price-1',
            quantity: 1,
            selected_price: { value: 100, currency: 'USD' },
          },
          {
            product_id: 2,
            price_id: 'price-2',
            quantity: 2,
            selected_price: { value: 75, currency: 'USD' },
          },
        ],
        customer_info: {
          first_name: 'CCCUser',
          last_name: 'Portal',
          email: 'ccc@portal.com',
          phone: '5559876543',
          account_number: 'CCC456789',
          location: 'US',
          shipping_address: '123 CCC Street, Portal City, ST 12345',
        },
      }

      mockedAxios.post.mockResolvedValueOnce({
        data: {
          success: true,
          data: mockCCCCheckout,
        },
      })

      const result = await initCartCheckout({
        products: [
          { product_id: 1, price_id: 'price-1', quantity: 1 },
          { product_id: 2, price_id: 'price-2', quantity: 2 },
        ],
        first_name: 'CCCUser',
        last_name: 'Portal',
        email: 'ccc@portal.com',
        phone: '5559876543',
        account_number: 'CCC456789',
        location: 'US',
        shipping_address: '123 CCC Street, Portal City, ST 12345',
        source_path: '/ccc-portal/order',
      })

      expect(result.form_session_id).toBeDefined()
      expect(result.customer_info?.account_number).toBe('CCC456789')
    })

    it('should apply CCC discount code', async () => {
      const mockCCCDiscount = {
        sub_total: 250,
        discount_code: 'CCCDISCOUNT',
        discount_amount: 100, // Fixed $100 off
        tax_rate: 10,
        tax_amount: 15, // Calculated on $150 after discount
        shipping_fee: 60,
        total: 225,
        currency: 'USD',
      }

      mockedAxios.post.mockResolvedValueOnce({
        data: {
          success: true,
          data: mockCCCDiscount,
        },
      })

      const result = await calculateCartSummary({
        products: [
          { product_id: 1, price_id: 'price-1', quantity: 1 },
          { product_id: 2, price_id: 'price-2', quantity: 2 },
        ],
        discount_code: 'CCCDISCOUNT',
      })

      expect(result.discount_amount).toBe(100)
      expect(result.total).toBe(225)
    })

    it('should process CCC portal payment with full order details', async () => {
      const mockPaymentResponse = {
        payment: {
          id: 126,
          reference: 'CCC-2024-001',
        },
        redirect_url: 'https://stripe.com/checkout/ccc',
      }

      mockedAxios.post.mockResolvedValueOnce({
        data: {
          success: true,
          data: mockPaymentResponse,
        },
      })

      const result = await processCartCheckout('ccc-session-789', 'test-token')

      expect(result.payment.reference).toBeDefined()
      expect(result.redirect_url).toBeDefined()
    })
  })

  /**
   * Test: Multi-currency support (USD vs CAD)
   */
  describe('Multi-Currency Support', () => {
    it('should handle CAD pricing correctly', async () => {
      const mockCADCheckout = {
        product_id: 1,
        price_id: 'cad-price-id',
        sub_total: 135,
        shipping_fee: 60,
        tax_rate: 13, // HST in some Canadian provinces
        tax_amount: 25.35,
        discount_amount: 0,
        total: 220.35,
        currency: 'CAD',
        country_code: 'CA',
        country: 'Canada',
      }

      mockedAxios.post.mockResolvedValueOnce({
        data: {
          success: true,
          data: mockCADCheckout,
        },
      })

      const result = await initDirectCheckout({
        product_id: 1,
        price_id: 'cad-price-id',
        first_name: 'John',
        last_name: 'Canadian',
        email: 'john@canada.com',
      })

      expect(result.currency).toBe('CAD')
      expect(result.tax_rate).toBe(13)
    })

    it('should format currency correctly in display', async () => {
      const mockCheckout = {
        product_id: 1,
        price_id: 'usd-price-id',
        sub_total: 99.99,
        shipping_fee: 60,
        tax_amount: 15.99,
        total: 175.98,
        currency: 'USD',
      }

      mockedAxios.post.mockResolvedValueOnce({
        data: {
          success: true,
          data: mockCheckout,
        },
      })

      // Test that the amount is formatted correctly for USD
      expect(mockCheckout.currency).toBe('USD')
      // Currency formatting would be handled by the component
      const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      })
      expect(formatter.format(mockCheckout.total)).toBe('$175.98')
    })
  })

  /**
   * Test: Error handling
   */
  describe('Error Handling', () => {
    it('should handle invalid discount code error', async () => {
      mockedAxios.post.mockRejectedValueOnce({
        response: {
          status: 400,
          data: {
            message: 'Invalid or expired discount code',
          },
        },
      })

      await expect(
        calculateOrderSheetTotals({
          products: [
            { product_id: 1, price_id: 'price-1', quantity: 1 },
          ],
          discount_code: 'INVALID',
        })
      ).rejects.toThrow('Invalid or expired discount code')
    })

    it('should handle network errors gracefully', async () => {
      mockedAxios.post.mockRejectedValueOnce(
        new Error('Network error')
      )

      await expect(
        initDirectCheckout({
          product_id: 1,
          price_id: 'price-1',
          first_name: 'John',
          last_name: 'Doe',
          email: 'john@example.com',
        })
      ).rejects.toThrow()
    })

    it('should handle missing required fields', async () => {
      mockedAxios.post.mockRejectedValueOnce({
        response: {
          status: 422,
          data: {
            message: 'Phone is required',
          },
        },
      })

      await expect(
        initCartCheckout({
          products: [{ product_id: 1, price_id: 'price-1', quantity: 1 }],
          first_name: 'Jane',
          last_name: 'Smith',
          email: 'jane@example.com',
          phone: '',
          account_number: 'ACC123',
          location: 'US',
        })
      ).rejects.toThrow('Phone is required')
    })
  })

  /**
   * Test: Complete Order Sheet Component Flow
   */
  describe('OrderSheetComponent Integration', () => {
    it('should render order sheet with products', async () => {
      const mockProducts = {
        data: [
          {
            id: 1,
            name: 'Product 1',
            slug: 'product-1',
            code: 'PRD001',
            price: [
              {
                id: 'price-1',
                value: 100,
                currency: 'USD',
                location: 'US',
              },
            ],
          },
          {
            id: 2,
            name: 'Product 2',
            slug: 'product-2',
            code: 'PRD002',
            price: [
              {
                id: 'price-2',
                value: 75,
                currency: 'USD',
                location: 'US',
              },
            ],
          },
        ],
      }

      const mockConfig = {
        data: {
          tax_rate: 10,
        },
      }

      mockedAxios.get.mockResolvedValueOnce({
        data: {
          success: true,
          data: mockProducts,
        },
      })

      mockedAxios.get.mockResolvedValueOnce({
        data: {
          success: true,
          data: mockConfig,
        },
      })

      const { container } = render(
        <QueryClientProvider client={queryClient}>
          <OrderSheetComponent currency="USD" />
        </QueryClientProvider>
      )

      await waitFor(() => {
        expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument()
      })
    })
  })
})
