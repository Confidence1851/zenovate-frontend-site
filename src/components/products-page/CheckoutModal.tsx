'use client'

import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useDirectCheckout } from '@/hooks/useDirectCheckout'
import { Product, Price } from '@/types'
import { CTAButton } from '@/components/common/CTAButton'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'

interface CheckoutModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  product: Product
  selectedPrice: Price | null
  mode?: 'single' | 'order-sheet'
  orderSheetProducts?: Array<{ product: Product; price: Price; quantity: number }>
  orderSheetCustomerInfo?: {
    firstName: string
    lastName: string
    email: string
    phone: string
    shippingAddress?: string
    additionalInformation?: string
  }
  onCheckoutSuccess?: () => void
}

type UseType = 'patient' | 'clinic' | null

interface CustomerInfo {
  firstName: string
  lastName: string
  email: string
}

export function CheckoutModal({
  open,
  onOpenChange,
  product,
  selectedPrice,
  mode = 'single',
  orderSheetProducts,
  orderSheetCustomerInfo,
  onCheckoutSuccess
}: CheckoutModalProps) {
  const {
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
  } = useDirectCheckout()

  const [useType, setUseType] = useState<UseType>(null)
  const [discountCode, setDiscountCode] = useState('')
  const [isApplyingDiscount, setIsApplyingDiscount] = useState(false)
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    firstName: '',
    lastName: '',
    email: '',
  })
  const [formErrors, setFormErrors] = useState<Partial<CustomerInfo>>({})
  const { executeRecaptcha } = useGoogleReCaptcha()

  const isOrderSheet = mode === 'order-sheet'
  const requiresSelection = !isOrderSheet && (product.requires_patient_clinic_selection ?? false)

  // Reset state when modal closes
  useEffect(() => {
    if (!open) {
      setUseType(null)
      setDiscountCode('')
      setCustomerInfo({ firstName: '', lastName: '', email: '' })
      setFormErrors({})
      resetCheckout()
    }
  }, [open, resetCheckout])

  // Update discount code input when discount is applied
  useEffect(() => {
    if (checkoutData?.discount_code) {
      setDiscountCode(checkoutData.discount_code)
    }
  }, [checkoutData?.discount_code])

  // Note: onCheckoutSuccess will be called when payment is processed (in handleProceedToCheckout)

  const validateForm = (): boolean => {
    const errors: Partial<CustomerInfo> = {}

    if (!customerInfo.firstName.trim()) {
      errors.firstName = 'First name is required'
    }

    if (!customerInfo.lastName.trim()) {
      errors.lastName = 'Last name is required'
    }

    if (!customerInfo.email.trim()) {
      errors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerInfo.email)) {
      errors.email = 'Please enter a valid email address'
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleContinue = async () => {
    if (isOrderSheet) {
      if (!orderSheetProducts || orderSheetProducts.length === 0) return
      if (!orderSheetCustomerInfo) return

      await initializeOrderSheetCheckout({
        products: orderSheetProducts.map((item) => ({
          product_id: item.product.id,
          price_id: item.price.id,
          quantity: item.quantity,
        })),
        first_name: orderSheetCustomerInfo.firstName,
        last_name: orderSheetCustomerInfo.lastName,
        email: orderSheetCustomerInfo.email,
        phone: orderSheetCustomerInfo.phone,
        account_number: '',
        location: '',
        shipping_address: undefined,
        additional_information: orderSheetCustomerInfo.additionalInformation,
      })
      return
    }

    if (!validateForm()) return
    if (!selectedPrice) return
    if (requiresSelection && !useType) return

    await initializeCheckout(
      product.id,
      selectedPrice.id,
      customerInfo.firstName.trim(),
      customerInfo.lastName.trim(),
      customerInfo.email.trim().toLowerCase(),
      useType || undefined,
      typeof window !== 'undefined' ? window.location.pathname : undefined
    )
  }

  const handleApplyDiscount = async () => {
    if (!discountCode.trim()) return

    setIsApplyingDiscount(true)
    clearError()
    try {
      await applyDiscount(discountCode.trim().toUpperCase())
    } catch (err) {
      // Error is handled by hook
    } finally {
      setIsApplyingDiscount(false)
    }
  }

  const handleRemoveDiscount = async () => {
    setIsApplyingDiscount(true)
    clearError()
    try {
      await removeDiscount()
      setDiscountCode('')
    } catch (err) {
      // Error is handled by hook
    } finally {
      setIsApplyingDiscount(false)
    }
  }

  const handleProceedToCheckout = async () => {
    if (!checkoutData) return

    if (!executeRecaptcha) {
      // If reCAPTCHA is not loaded, proceed without it (for development/fallback)
      console.warn('reCAPTCHA not loaded, proceeding without verification');
    }

    try {
      let recaptchaToken: string | undefined;
      if (executeRecaptcha) {
        recaptchaToken = await executeRecaptcha('checkout_submission');
      }

      const result = await processPayment(recaptchaToken);
      console.log('Payment processing result:', result);
      
      // Call onCheckoutSuccess before redirect (cart will be cleared)
      if (onCheckoutSuccess && result.redirect_url) {
        onCheckoutSuccess();
      }
      // Redirect to Stripe checkout in same window
      if (result.redirect_url) {
        window.location.href = result.redirect_url
      } else {
        console.error('No redirect URL returned from payment processing:', result);
        // Error should be set by hook, but log for debugging
      }
    } catch (err: any) {
      console.error('Error in handleProceedToCheckout:', err);
      // Error is handled by hook, but log for debugging
    }
  }

  // Can proceed to payment step (after checkout is initialized)
  const canProceedToPayment =
    checkoutData &&
    (!requiresSelection || useType) &&
    !isLoading

  const formatCurrency = (amount: number) => {
    // Format as USD with dollar sign only (no currency code prefix)
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount)
  }

  const handleInputChange = (field: keyof CustomerInfo, value: string) => {
    setCustomerInfo((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  // Show the checkout form step (name/email) or the payment step
  const showCheckoutForm = !checkoutData

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Checkout</DialogTitle>
          <DialogDescription>
            {isOrderSheet
              ? 'Order Sheet Checkout'
              : `${product.name} ${selectedPrice?.display_name || (selectedPrice?.frequency && selectedPrice?.unit ? `- ${selectedPrice.frequency} ${selectedPrice.unit}` : '')}`}
          </DialogDescription>
        </DialogHeader>

        {/* Pre-order disclaimer for peptides */}
        {selectedPrice && !selectedPrice.frequency && !selectedPrice.unit && (
          <div className="rounded-lg bg-muted p-3 text-sm text-center">
            <p className="text-muted-foreground italic">
              This is for pre-order. Shipping takes 2 to 4 weeks.
            </p>
          </div>
        )}

        <div className="space-y-6 py-4">
          {/* Individual/Clinic Selection (for peptides) */}
          {!isOrderSheet && requiresSelection && (
            <div className="space-y-3">
              <Label>Select Use Type</Label>
              <div className="flex gap-4">
                <Button
                  type="button"
                  variant={useType === 'patient' ? 'default' : 'outline'}
                  className="flex-1"
                  onClick={() => setUseType('patient')}
                >
                  Individual
                </Button>
                <Button
                  type="button"
                  variant={useType === 'clinic' ? 'default' : 'outline'}
                  className="flex-1"
                  onClick={() => setUseType('clinic')}
                >
                  Clinic
                </Button>
              </div>
              {useType === 'clinic' && (
                <div className="rounded-lg bg-muted p-4 text-sm">
                  <p className="font-medium">Clinic Purchase</p>
                  <p className="mt-1 text-muted-foreground">
                    Please email{' '}
                    <a
                      href="mailto:info@zenovate.health"
                      className="text-primary underline"
                    >
                      info@zenovate.health
                    </a>{' '}
                    to get a discount code.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Customer Information Form (Step 1 - before checkout initialization) */}
          {showCheckoutForm && (!requiresSelection || useType || isOrderSheet) && (
            <div className="space-y-4">
              {!isOrderSheet && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      placeholder="Enter your first name"
                      value={customerInfo.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      disabled={isLoading}
                      className={formErrors.firstName ? 'border-destructive' : ''}
                    />
                    {formErrors.firstName && (
                      <p className="text-sm text-destructive">{formErrors.firstName}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      placeholder="Enter your last name"
                      value={customerInfo.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      disabled={isLoading}
                      className={formErrors.lastName ? 'border-destructive' : ''}
                    />
                    {formErrors.lastName && (
                      <p className="text-sm text-destructive">{formErrors.lastName}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={customerInfo.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      disabled={isLoading}
                      className={formErrors.email ? 'border-destructive' : ''}
                    />
                    {formErrors.email && (
                      <p className="text-sm text-destructive">{formErrors.email}</p>
                    )}
                  </div>
                </>
              )}

              {isOrderSheet && orderSheetCustomerInfo && (
                <div className="space-y-2 rounded-lg border p-4 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium">Name</span>
                    <span>{orderSheetCustomerInfo.firstName} {orderSheetCustomerInfo.lastName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Email</span>
                    <span>{orderSheetCustomerInfo.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Phone</span>
                    <span>{orderSheetCustomerInfo.phone}</span>
                  </div>
                </div>
              )}

              {isOrderSheet && orderSheetProducts && (
                <div className="space-y-2 rounded-lg border p-4 text-sm">
                  <p className="font-semibold">Products</p>
                  {orderSheetProducts.map((item) => (
                    <div key={`${item.product.id}-${item.price.id}`} className="flex justify-between">
                      <span>{item.product.name} × {item.quantity}</span>
                      <span>
                        ${item.price.value.toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              <CTAButton
                type="button"
                onClick={handleContinue}
                disabled={isLoading}
                size="lg"
                className="w-full"
              >
                {isLoading ? 'Processing...' : 'Continue'}
              </CTAButton>
            </div>
          )}

          {/* Checkout Summary (Step 2 - after checkout initialization) */}
          {checkoutData && (
            <>
              {/* User Info Display */}
              <div className="rounded-lg bg-muted p-3 text-sm">
                <p className="font-medium">
                  {checkoutData.user.first_name} {checkoutData.user.last_name}
                </p>
                <p className="text-muted-foreground">{checkoutData.user.email}</p>
              </div>

              {/* Discount Code Input */}
              {(isOrderSheet || !requiresSelection || useType) && (
                <div className="space-y-2">
                  <Label htmlFor="discount-code">Discount Code (Optional)</Label>
                  <div className="flex gap-2">
                    <Input
                      id="discount-code"
                      placeholder="Enter discount code"
                      value={discountCode}
                      onChange={(e) => setDiscountCode(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && discountCode.trim()) {
                          // If discount is already applied and code changed, apply new one
                          // Otherwise, if no discount, apply it
                          if (checkoutData.discount_code && discountCode.trim().toUpperCase() !== checkoutData.discount_code) {
                            handleApplyDiscount()
                          } else if (!checkoutData.discount_code) {
                            handleApplyDiscount()
                          }
                        }
                      }}
                      disabled={isApplyingDiscount || isLoading}
                    />
                    {checkoutData.discount_code && discountCode.trim().toUpperCase() === checkoutData.discount_code ? (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleRemoveDiscount}
                        disabled={isApplyingDiscount || isLoading}
                      >
                        Remove
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        onClick={handleApplyDiscount}
                        disabled={!discountCode.trim() || isApplyingDiscount || isLoading}
                      >
                        {checkoutData.discount_code ? 'Change' : 'Apply'}
                      </Button>
                    )}
                  </div>
                  {checkoutData.discount_code && (
                    <p className="text-sm text-green-600">
                      Discount applied: {checkoutData.discount_code} (-
                      {formatCurrency(checkoutData.discount_amount)})
                    </p>
                  )}
                </div>
              )}

              {/* Price Summary */}
              <div className="space-y-2 rounded-lg border p-4">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>{formatCurrency(checkoutData.sub_total)}</span>
                </div>
                {checkoutData.discount_amount > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Discount ({checkoutData.discount_code})</span>
                    <span>-{formatCurrency(checkoutData.discount_amount)}</span>
                  </div>
                )}
                {checkoutData.shipping_fee > 0 && (
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span>{formatCurrency(checkoutData.shipping_fee)}</span>
                  </div>
                )}
                {checkoutData.tax_amount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span>HST</span>
                    <span>{formatCurrency(checkoutData.tax_amount)}</span>
                  </div>
                )}
                <div className="flex justify-between border-t pt-2 font-semibold">
                  <span>Total</span>
                  <span>{formatCurrency(checkoutData.total)}</span>
                </div>
              </div>

              {/* Disclaimer for peptides */}
              <div className="rounded-lg bg-yellow-50 border border-yellow-200 p-3 text-sm">
                <p className="text-yellow-800 font-medium">
                  ⚠️ Sterile - For Research Use Only
                </p>
              </div>

              {/* Proceed Button */}
              <CTAButton
                type="button"
                onClick={handleProceedToCheckout}
                disabled={!canProceedToPayment || isLoading}
                size="lg"
                className="w-full"
              >
                {isLoading ? 'Processing...' : 'Proceed to Checkout'}
              </CTAButton>
            </>
          )}

          {/* Error Message */}
          {error && (
            <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
