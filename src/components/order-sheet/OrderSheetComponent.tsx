'use client'

import { useMemo, useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { orderSheetProducts } from '@/server-actions/api.actions'
import { Product, Price } from '@/types'
import { getCheckoutInfo, initOrderSheetCheckout, processDirectCheckout } from '@/server-actions/directCheckout.actions'
import { ErrorDisplay } from '../common/ErrorDisplay'
import { Skeleton } from '../ui/skeleton'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { Label } from '../ui/label'
import { Button } from '../ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { useSearchParams } from 'next/navigation'

interface ProductQuantity {
    productId: number
    quantity: number
    selected: boolean
}

const OrderSheetComponent = () => {
    const [quantities, setQuantities] = useState<Record<number, ProductQuantity>>({})
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        accountNumber: '',
        location: '',
        useShippingAddress: false,
        shippingAddress: '',
        additionalInformation: ''
    })
    const [formErrors, setFormErrors] = useState<Record<string, string>>({})
    const [touched, setTouched] = useState<Record<string, boolean>>({})
    const [discountCode, setDiscountCode] = useState('')
    const [discountAmount, setDiscountAmount] = useState(0)
    const [discountError, setDiscountError] = useState<string | null>(null)
    const [discountNotice, setDiscountNotice] = useState<string | null>(null)
    const [submitError, setSubmitError] = useState<string | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isApplyingDiscount, setIsApplyingDiscount] = useState(false)
    const [prefillLoading, setPrefillLoading] = useState(false)
    const [prefillDone, setPrefillDone] = useState(false)
    const [storedCheckoutData, setStoredCheckoutData] = useState<any>(null)
    const [quantitiesApplied, setQuantitiesApplied] = useState(false)
    const searchParams = useSearchParams()!

    const {
        data: productsData,
        isLoading,
        error
    } = useQuery({
        queryKey: ['order-sheet-products'],
        queryFn: orderSheetProducts
    })

    const products: Product[] = productsData?.data || []
    const quantityOptions = [0, 1, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50]

    const getUsdPrice = (product: Product): Price | null => {
        if (!product.price || product.price.length === 0) return null
        const usd = product.price.find(p => p.currency === 'USD')
        return usd || product.price[0]
    }

    const selectedProducts = useMemo(() => {
        return products
            .map((product) => {
                const pq = quantities[product.id]
                const quantity = pq?.quantity || 0
                if (!pq?.selected || quantity <= 0) return null
                const price = getUsdPrice(product)
                if (!price) return null
                return { product, price, quantity }
            })
            .filter(Boolean) as Array<{ product: Product; price: Price; quantity: number }>
    }, [products, quantities])

    const handleQuantityChange = (productId: number, quantity: number) => {
        const newQuantity = Math.max(0, quantity)
        setQuantities(prev => ({
            ...prev,
            [productId]: {
                productId,
                quantity: newQuantity,
                selected: newQuantity > 0
            }
        }))
    }

    const handleCheckboxChange = (productId: number, checked: boolean) => {
        setQuantities(prev => {
            const currentQuantity = prev[productId]?.quantity || 0
            return {
                ...prev,
                [productId]: {
                    productId,
                    quantity: checked ? (currentQuantity === 0 ? 1 : currentQuantity) : 0,
                    selected: checked
                }
            }
        })
    }

    const getProductCode = (product: Product): string => {
        // Use code field if available, otherwise fall back to slug-based generation
        if (product.code) {
            return product.code;
        }
        return product.slug.toUpperCase().replace(/-/g, '') || `PRD${product.id}`
    }

    const formatCurrency = (amount: number): string => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(amount)
    }

    const getProductPrice = (product: Product): string => {
        const price = getUsdPrice(product)
        if (!price) return '$0.00'
        return formatCurrency(price.value)
    }

    const getProductPriceValue = (product: Product): number => {
        const price = getUsdPrice(product)
        return price ? price.value : 0
    }

    const getTaxRate = (_product: Product): number => 13

    const calculatePricing = () => {
        let subtotal = 0
        const defaultShippingFee = 60
        const freeShippingThreshold = 1000
        const taxRate = 13 // 13% tax rate

        // Calculate subtotal first
        selectedProducts.forEach(({ product, quantity }) => {
            const price = getProductPriceValue(product)
            const lineTotal = price * quantity
            subtotal += lineTotal
        })

        // Calculate shipping
        const shippingFee = subtotal >= freeShippingThreshold ? 0 : defaultShippingFee

        // Calculate subtotal + shipping (before discount)
        const subtotalWithShipping = subtotal + shippingFee

        // Apply discount to subtotal + shipping
        const appliedDiscount = Math.min(discountAmount, subtotalWithShipping)
        const discountedAmount = Math.max(0, subtotalWithShipping - appliedDiscount)

        // Calculate tax on discounted amount
        const taxAmount = discountedAmount * (taxRate / 100)

        // Calculate grand total
        const grandTotal = discountedAmount + taxAmount

        return {
            subtotal,
            taxAmount,
            shippingFee,
            discountAmount: appliedDiscount,
            grandTotal,
            taxRate,
        }
    }

    const pricing = calculatePricing()

    const validateEmail = (email: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

    const validatePhone = (phone: string): boolean => {
        const digitsOnly = phone.replace(/\D/g, '')
        return digitsOnly.length >= 10
    }

    const fieldValidators: Record<string, (value: string | boolean) => string | undefined> = {
        firstName: (v) => !String(v).trim() ? 'First name is required' : undefined,
        lastName: (v) => !String(v).trim() ? 'Last name is required' : undefined,
        email: (v) => {
            const value = String(v).trim()
            if (!value) return 'Email is required'
            if (!validateEmail(value)) return 'Please enter a valid email address'
            return undefined
        },
        phone: (v) => {
            const value = String(v).trim()
            if (!value) return 'Phone is required'
            if (!validatePhone(value)) return 'Please enter a valid phone number'
            return undefined
        },
        accountNumber: (v) => !String(v).trim() ? 'Account number is required' : undefined,
        location: (v) => !String(v).trim() ? 'Location is required' : undefined,
        shippingAddress: (v) => {
            if (formData.useShippingAddress && !String(v).trim()) {
                return 'Shipping address is required'
            }
            return undefined
        },
    }

    const handleFieldChange = (field: string, value: string | boolean) => {
        setFormData(prev => ({ ...prev, [field]: value }))
        if (formErrors[field]) {
            setFormErrors(prev => {
                const next = { ...prev }
                delete next[field]
                return next
            })
        }
        if (touched[field] && fieldValidators[field]) {
            const error = fieldValidators[field](value)
            if (error) {
                setFormErrors(prev => ({ ...prev, [field]: error }))
            }
        }
    }

    const handleFieldBlur = (field: string) => {
        setTouched(prev => ({ ...prev, [field]: true }))
        if (fieldValidators[field]) {
            const error = fieldValidators[field](formData[field as keyof typeof formData])
            if (error) {
                setFormErrors(prev => ({ ...prev, [field]: error }))
            }
        }
    }

    const validateForm = () => {
        const errors: Record<string, string> = {}
        Object.keys(fieldValidators).forEach(key => {
            const validator = fieldValidators[key]
            const error = validator(formData[key as keyof typeof formData])
            if (error) {
                errors[key] = error
            }
        })
        if (selectedProducts.length === 0) errors.products = 'Select at least one product with quantity'
        setFormErrors(errors)
        return Object.keys(errors).length === 0
    }

    const openCheckout = () => {
        if (!validateForm()) return
        submitOrderSheet()
    }

    const submitOrderSheet = async () => {
        if (selectedProducts.length === 0) return
        setSubmitError(null)
        setIsSubmitting(true)
        try {
            const payload = {
                products: selectedProducts.map(item => ({
                    product_id: item.product.id,
                    price_id: item.price.id,
                    quantity: item.quantity,
                })),
                first_name: formData.firstName,
                last_name: formData.lastName,
                email: formData.email,
                phone: formData.phone,
                account_number: formData.accountNumber,
                location: formData.location,
                shipping_address: formData.useShippingAddress ? formData.shippingAddress : formData.location,
                additional_information: formData.additionalInformation,
                discount_code: discountCode ? discountCode.trim().toUpperCase() : undefined,
            }

            const checkout = await initOrderSheetCheckout(payload)
            setDiscountAmount(Number(checkout.discount_amount) || 0)

            const result = await processDirectCheckout(checkout.checkout_id)

            if (result.redirect_url) {
                window.location.href = result.redirect_url
            } else {
                setSubmitError('Checkout initialized, but no redirect URL was returned.')
            }
        } catch (err: any) {
            setSubmitError(err?.message || 'Failed to proceed to checkout')
        } finally {
            setIsSubmitting(false)
        }
    }

    // Prefill when returning from cancelled order-sheet checkout
    useEffect(() => {
        if (!searchParams) return
        const cancelled = searchParams.get('cancelled')
        const ref = searchParams.get('ref')
        if (!cancelled || !ref || prefillDone || isLoading) return

        setPrefillLoading(true)
        getCheckoutInfo(ref)
            .then((data) => {
                if (data.order_type !== 'order_sheet') {
                    setPrefillDone(true)
                    setPrefillLoading(false)
                    return
                }

                console.log('[Order Sheet Prefill] Fetched checkout data:', {
                    products: data.products,
                    customer: data.customer,
                    productsLoaded: products.length,
                    isLoading
                })

                // Store checkout data for applying quantities when products load
                setStoredCheckoutData(data)
                setQuantitiesApplied(false) // Reset flag to allow applying quantities

                const customer = data.customer || {}
                setFormData((prev) => ({
                    ...prev,
                    firstName: customer.first_name || '',
                    lastName: customer.last_name || '',
                    email: customer.email || '',
                    phone: customer.phone || '',
                    accountNumber: customer.account_number || '',
                    location: customer.location || '',
                    useShippingAddress: !!customer.shipping_address,
                    shippingAddress: customer.shipping_address || '',
                    additionalInformation: customer.additional_information || '',
                }))

                if (data.totals?.discount_code) {
                    setDiscountCode(data.totals.discount_code)
                    setDiscountAmount(Number(data.totals.discount_amount) || 0)
                }

                setPrefillDone(true)
            })
            .catch(() => {
                // ignore prefill failure
                setPrefillDone(true)
            })
            .finally(() => {
                setPrefillLoading(false)
            })
    }, [searchParams, prefillDone, isLoading])

    // Apply product quantities when products are loaded and we have checkout data
    useEffect(() => {
        // Wait for products to finish loading
        if (isLoading || !storedCheckoutData || !storedCheckoutData.products || quantitiesApplied) return

        // Wait for products to be available
        if (products.length === 0) return

        const nextQuantities: Record<number, ProductQuantity> = {}
        let hasMatches = false

        storedCheckoutData.products.forEach((p: any) => {
            const pid = p.product_id
            if (!pid) return

            const match = products.find((prod) => prod.id === pid)
            if (!match) {
                // Product not found in current list - might not be enabled for order sheet
                console.warn(`[Order Sheet Prefill] Product ${pid} (${p.name || 'unknown'}) not found in available products. Available IDs:`, products.map(pr => pr.id))
                return
            }

            hasMatches = true
            const qty = p.quantity && p.quantity > 0 ? p.quantity : 1
            nextQuantities[pid] = {
                productId: pid,
                quantity: qty,
                selected: true,
            }
        })

        if (hasMatches && Object.keys(nextQuantities).length > 0) {
            console.log('[Order Sheet Prefill] Applying quantities:', nextQuantities)
            setQuantities((prev) => {
                const updated = { ...prev }
                Object.keys(nextQuantities).forEach((pid) => {
                    const numPid = Number(pid)
                    // Always apply prefill quantities if not already set by user
                    if (!updated[numPid]) {
                        updated[numPid] = nextQuantities[numPid]
                    }
                })
                return updated
            })
            setQuantitiesApplied(true)
            // Clear stored data after applying to prevent re-running
            setStoredCheckoutData(null)
        } else if (storedCheckoutData.products.length > 0) {
            console.warn('[Order Sheet Prefill] No product matches found.', {
                checkoutProducts: storedCheckoutData.products.map((p: any) => ({ id: p.product_id, name: p.name })),
                availableProducts: products.map(p => ({ id: p.id, name: p.name, enabled: true }))
            })
            setQuantitiesApplied(true) // Mark as applied even if no matches to prevent retrying
            setStoredCheckoutData(null)
        }
    }, [storedCheckoutData, products, isLoading, quantitiesApplied])

    if (error) {
        const errorMessage = error instanceof Error
            ? error.message
            : 'An unexpected error occurred'

        return (
            <div className='min-h-[300px]'>
                <ErrorDisplay
                    title='Error Loading Products'
                    message={errorMessage}
                    onRetry={() => window.location.reload()}
                    retryLabel='Try Again'
                />
            </div>
        )
    }

    return (
        <div className='space-y-8'>
            {isLoading ? (
                <div className='space-y-4'>
                    <Skeleton className='h-12 w-full' />
                    <Skeleton className='h-32 w-full' />
                    <Skeleton className='h-32 w-full' />
                    <Skeleton className='h-32 w-full' />
                </div>
            ) : (
                <>
                    <div className='space-y-4 rounded-md border p-4'>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <div className='space-y-1'>
                                <Label className='text-sm'>First name *</Label>
                                <Input
                                    placeholder='First name'
                                    value={formData.firstName}
                                    onChange={(e) => handleFieldChange('firstName', e.target.value)}
                                    onBlur={() => handleFieldBlur('firstName')}
                                />
                                {formErrors.firstName && <p className='text-sm text-red-500'>{formErrors.firstName}</p>}
                            </div>
                            <div className='space-y-1'>
                                <Label className='text-sm'>Last name *</Label>
                                <Input
                                    placeholder='Last name'
                                    value={formData.lastName}
                                    onChange={(e) => handleFieldChange('lastName', e.target.value)}
                                    onBlur={() => handleFieldBlur('lastName')}
                                />
                                {formErrors.lastName && <p className='text-sm text-red-500'>{formErrors.lastName}</p>}
                            </div>
                        </div>

                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <div className='space-y-1'>
                                <Label className='text-sm'>Email *</Label>
                                <Input
                                    placeholder='email@domain.com'
                                    value={formData.email}
                                    onChange={(e) => handleFieldChange('email', e.target.value)}
                                    onBlur={() => handleFieldBlur('email')}
                                />
                                {formErrors.email && <p className='text-sm text-red-500'>{formErrors.email}</p>}
                            </div>
                            <div className='space-y-1'>
                                <Label className='text-sm'>Phone *</Label>
                                <Input
                                    placeholder='+1 234 567 890'
                                    value={formData.phone}
                                    onChange={(e) => handleFieldChange('phone', e.target.value)}
                                    onBlur={() => handleFieldBlur('phone')}
                                />
                                {formErrors.phone && <p className='text-sm text-red-500'>{formErrors.phone}</p>}
                            </div>
                        </div>

                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <div className='space-y-1'>
                                <Label className='text-sm'>Account number *</Label>
                                <Input
                                    placeholder='Account number'
                                    value={formData.accountNumber}
                                    onChange={(e) => handleFieldChange('accountNumber', e.target.value)}
                                    onBlur={() => handleFieldBlur('accountNumber')}
                                />
                                {formErrors.accountNumber && <p className='text-sm text-red-500'>{formErrors.accountNumber}</p>}
                            </div>
                            <div className='space-y-1'>
                                <Label className='text-sm'>Location *</Label>
                                <Input
                                    placeholder='25 ABC Street'
                                    value={formData.location}
                                    onChange={(e) => handleFieldChange('location', e.target.value)}
                                    onBlur={() => handleFieldBlur('location')}
                                />
                                {formErrors.location && <p className='text-sm text-red-500'>{formErrors.location}</p>}
                            </div>
                        </div>

                        <div className='space-y-2'>
                            <div className='flex items-center gap-2'>
                                <input
                                    id='ship-different'
                                    type='checkbox'
                                    checked={formData.useShippingAddress}
                                    onChange={(e) => handleFieldChange('useShippingAddress', e.target.checked)}
                                    className='h-4 w-4'
                                />
                                <Label htmlFor='ship-different' className='text-sm font-medium'>Ship to a different address</Label>
                            </div>
                            {formData.useShippingAddress && (
                                <div className='space-y-1'>
                                    <Label className='text-sm'>Shipping Address *</Label>
                                    <Input
                                        placeholder='Shipping address'
                                        value={formData.shippingAddress}
                                        onChange={(e) => handleFieldChange('shippingAddress', e.target.value)}
                                        onBlur={() => handleFieldBlur('shippingAddress')}
                                    />
                                    {formErrors.shippingAddress && <p className='text-sm text-red-500'>{formErrors.shippingAddress}</p>}
                                </div>
                            )}
                        </div>

                        <div className='space-y-1'>
                            <Label className='text-sm'>Additional Information</Label>
                            <Textarea
                                placeholder='Leave us a message...'
                                value={formData.additionalInformation}
                                onChange={(e) => handleFieldChange('additionalInformation', e.target.value)}
                            />
                        </div>
                    </div>

                    <div className='overflow-x-auto'>
                        {formErrors.products && (
                            <p className='text-sm text-red-500 mb-2'>{formErrors.products}</p>
                        )}
                        <table className='w-full border-collapse'>
                            <thead>
                                <tr className='bg-gray-100 border-b'>
                                    <th className='text-left p-4 font-semibold uppercase text-sm'>
                                        <input
                                            type='checkbox'
                                            className='cursor-pointer'
                                            onChange={(e) => {
                                                products.forEach(product => {
                                                    handleCheckboxChange(product.id, e.target.checked)
                                                })
                                            }}
                                        />
                                    </th>
                                    <th className='text-left p-4 font-semibold uppercase text-sm'>Product</th>
                                    <th className='text-left p-4 font-semibold uppercase text-sm'>Code</th>
                                    <th className='text-left p-4 font-semibold uppercase text-sm'>Price</th>
                                    <th className='text-left p-4 font-semibold uppercase text-sm'>Quantity</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className='p-8 text-center text-muted-foreground'>
                                            No products available for order sheet at the moment.
                                        </td>
                                    </tr>
                                ) : (
                                    products.map((product, index) => {
                                        const productQuantity = quantities[product.id] || { productId: product.id, quantity: 0, selected: false }
                                        const isEven = index % 2 === 0

                                        return (
                                            <tr
                                                key={product.id}
                                                className={`border-b ${isEven ? 'bg-gray-50' : 'bg-white'}`}
                                            >
                                                <td className='p-4'>
                                                    <input
                                                        type='checkbox'
                                                        checked={productQuantity.selected}
                                                        onChange={(e) => handleCheckboxChange(product.id, e.target.checked)}
                                                        className='cursor-pointer w-4 h-4'
                                                    />
                                                </td>
                                                <td className='p-4'>
                                                    <div className='space-y-1'>
                                                        <p className='font-medium text-foreground'>
                                                            {product.name}
                                                        </p>
                                                        {product.subtitle && (
                                                            <p className='text-sm text-muted-foreground'>{product.subtitle}</p>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className='p-4'>
                                                    <span className='text-sm font-mono'>{getProductCode(product)}</span>
                                                </td>
                                                <td className='p-4'>
                                                    <span className='font-semibold'>{getProductPrice(product)}</span>
                                                </td>
                                                <td className='p-4'>
                                                    <Select
                                                        value={productQuantity.quantity.toString()}
                                                        onValueChange={(value) => {
                                                            const qty = parseInt(value) || 0
                                                            handleQuantityChange(product.id, qty)
                                                        }}
                                                    >
                                                        <SelectTrigger className='w-24'>
                                                            <SelectValue placeholder='0' />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {quantityOptions.map((qty) => (
                                                                <SelectItem key={qty} value={qty.toString()}>
                                                                    {qty}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </td>
                                            </tr>
                                        )
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Discount Code */}
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <div className='space-y-1'>
                            <Label className='text-sm'>Discount code</Label>
                            <div className='flex gap-2'>
                                <Input
                                    placeholder='DISCOUNT2025'
                                    value={discountCode}
                                    onChange={(e) => setDiscountCode(e.target.value.toUpperCase())}
                                />
                                <Button
                                    variant='outline'
                                    onClick={async () => {
                                        if (!discountCode.trim()) {
                                            setDiscountError('Enter a discount code')
                                            return
                                        }
                                        if (!selectedProducts.length) {
                                            setFormErrors(prev => ({ ...prev, products: 'Select at least one product with quantity' }))
                                            setDiscountError('Select products before applying a code')
                                            return
                                        }
                                        if (!validateForm()) {
                                            setDiscountError('Fill required fields before applying a code')
                                            return
                                        }
                                        if (selectedProducts.length === 0) {
                                            setFormErrors(prev => ({ ...prev, products: 'Select at least one product with quantity' }))
                                            return
                                        }
                                        setDiscountError(null)
                                        setDiscountNotice(null)
                                        setIsApplyingDiscount(true)
                                        try {
                                            const payload = {
                                                products: selectedProducts.map(item => ({
                                                    product_id: item.product.id,
                                                    price_id: item.price.id,
                                                    quantity: item.quantity,
                                                })),
                                                first_name: formData.firstName,
                                                last_name: formData.lastName,
                                                email: formData.email,
                                                phone: formData.phone,
                                                account_number: formData.accountNumber,
                                                location: formData.location,
                                                shipping_address: formData.useShippingAddress ? formData.shippingAddress : formData.location,
                                                additional_information: formData.additionalInformation,
                                                discount_code: discountCode.trim().toUpperCase(),
                                            }
                                            const checkout = await initOrderSheetCheckout(payload)
                                            setDiscountAmount(Number(checkout.discount_amount) || 0)
                                            setDiscountNotice('Discount applied.')
                                        } catch (err: any) {
                                            setDiscountAmount(0)
                                            setDiscountError(err?.message || 'Failed to apply discount code')
                                        } finally {
                                            setIsApplyingDiscount(false)
                                        }
                                    }}
                                    disabled={isApplyingDiscount}
                                >
                                    {isApplyingDiscount ? 'Applying...' : 'Apply'}
                                </Button>
                                {discountCode && (
                                    <Button
                                        variant='ghost'
                                        onClick={() => {
                                            setDiscountAmount(0)
                                            setDiscountCode('')
                                            setDiscountError(null)
                                            setDiscountNotice(null)
                                        }}
                                    >
                                        Remove
                                    </Button>
                                )}
                            </div>
                            {discountError && <p className='text-sm text-red-500'>{discountError}</p>}
                            {discountNotice && <p className='text-sm text-green-600'>{discountNotice}</p>}
                        </div>
                    </div>

                    {/* Pricing Summary */}
                    <div className='flex justify-end'>
                        <div className='w-full max-w-md space-y-2'>
                            <div className='flex justify-between items-center'>
                                <span className='font-medium'>Subtotal:</span>
                                <span className='font-medium'>{formatCurrency(pricing.subtotal)} USD</span>
                            </div>
                            <div className='flex justify-between items-center'>
                                <span className='font-medium'>Tax ({pricing.taxRate}%):</span>
                                <span className='font-medium'>{formatCurrency(pricing.taxAmount)} USD</span>
                            </div>
                            <div className='flex justify-between items-center'>
                                <span className='font-medium'>Shipping:</span>
                                <span className='font-medium'>
                                    {pricing.shippingFee === 0 ? (
                                        <span className='text-green-600'>FREE</span>
                                    ) : (
                                        `${formatCurrency(pricing.shippingFee)} USD`
                                    )}
                                </span>
                            </div>
                            {pricing.discountAmount > 0 && (
                                <div className='flex justify-between items-center'>
                                    <span className='font-medium'>Discount:</span>
                                    <span className='font-medium text-green-700'>-{formatCurrency(pricing.discountAmount)} USD</span>
                                </div>
                            )}
                            {pricing.subtotal >= 1000 && (
                                <div className='text-sm text-green-600 italic'>
                                    Free shipping on orders over $1000
                                </div>
                            )}
                            <div className='flex justify-between items-center border-t pt-2 mt-2'>
                                <span className='font-bold text-lg'>Grand Total:</span>
                                <span className='font-bold text-lg'>{formatCurrency(pricing.grandTotal)} USD</span>
                            </div>
                        </div>
                    </div>

                    <div className='flex justify-end'>
                        <button
                            onClick={openCheckout}
                            className='mt-4 inline-flex items-center justify-center rounded-md bg-black px-6 py-3 text-white font-semibold disabled:opacity-50'
                            disabled={isLoading || isSubmitting}
                        >
                            {isSubmitting ? 'Redirecting...' : 'Proceed to Checkout'}
                        </button>
                    </div>

                    <p className='text-sm text-muted-foreground italic text-right'>
                        An automated email confirmation is sent after your order is completed.
                    </p>

                    {submitError && (
                        <p className='text-sm text-red-500 text-right'>{submitError}</p>
                    )}

                    {/* Disclaimers Section */}
                    <div className='space-y-4 pt-6 border-t'>
                        <h2 className='text-xl md:text-2xl font-bold uppercase'>Disclaimers</h2>
                        <ul className='space-y-3 text-sm md:text-base'>
                            <li className='flex items-start'>
                                <span className='mr-2'>•</span>
                                <span>This is for pre-order. Shipping takes 2 to 4 weeks.</span>
                            </li>
                            <li className='flex items-start'>
                                <span className='mr-2'>•</span>
                                <span>Sterile - For Research Use Only.</span>
                            </li>
                            <li className='flex items-start'>
                                <span className='mr-2'>•</span>
                                <span>Compounded drug products are not FDA or Health Canada approved. FDA or Health Canada does not evaluate compounded products for safety, effectiveness, or quality.</span>
                            </li>
                            <li className='flex items-start'>
                                <span className='mr-2'>•</span>
                                <span>Orders over $1000 ship free; orders under $1000 have a flat $60 shipping fee (USD).</span>
                            </li>
                            <li className='flex items-start'>
                                <span className='mr-2'>•</span>
                                <span>We use third-party shippers; unexpected delays can occur.</span>
                            </li>
                            <li className='flex items-start'>
                                <span className='mr-2'>•</span>
                                <span>Please report any package issues within 24 hours of receipt.</span>
                            </li>
                        </ul>

                        {/* Contact Information */}
                        <div className='pt-4 space-y-2 text-sm md:text-base'>
                            <p>
                                <strong>For general and order related information, please send an email to</strong>{' '}
                                <a href='mailto:info@zenovate.health' className='text-blue-600 underline'>info@zenovate.health</a>
                            </p>
                        </div>
                    </div>
                </>
            )}

        </div>
    )
}

export default OrderSheetComponent

