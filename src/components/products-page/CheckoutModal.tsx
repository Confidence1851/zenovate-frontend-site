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

interface CheckoutModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  product: Product
  selectedPrice: Price | null
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
}: CheckoutModalProps) {
  const {
    checkoutData,
    isLoading,
    error,
    initializeCheckout,
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

  const requiresSelection = product.requires_patient_clinic_selection ?? false

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
    if (!validateForm()) return
    if (!selectedPrice) return
    if (requiresSelection && !useType) return

    await initializeCheckout(
      product.id,
      selectedPrice.id,
      customerInfo.firstName.trim(),
      customerInfo.lastName.trim(),
      customerInfo.email.trim().toLowerCase(),
      useType || undefined
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

    try {
      const result = await processPayment()
      // Redirect to Stripe checkout
      if (result.redirect_url) {
        window.location.href = result.redirect_url
      }
    } catch (err) {
      // Error is handled by hook
    }
  }

  // Can proceed to payment step (after checkout is initialized)
  const canProceedToPayment =
    checkoutData &&
    (!requiresSelection || useType === 'patient') &&
    !isLoading

  const formatCurrency = (amount: number) => {
    const currency = checkoutData?.currency || 'USD'
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
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
            {product.name} - {selectedPrice?.frequency} {selectedPrice?.unit}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Patient/Clinic Selection (for peptides) */}
          {requiresSelection && (
            <div className="space-y-3">
              <Label>Select Use Type</Label>
              <div className="flex gap-4">
                <Button
                  type="button"
                  variant={useType === 'patient' ? 'default' : 'outline'}
                  className="flex-1"
                  onClick={() => setUseType('patient')}
                >
                  Patient
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
          {showCheckoutForm && (!requiresSelection || useType === 'patient') && (
            <div className="space-y-4">
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

              {/* Discount Code Input (only for Patient or non-selection required) */}
              {(!requiresSelection || useType === 'patient') && (
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
