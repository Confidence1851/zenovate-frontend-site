'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
    SheetFooter,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useCartStore } from '@/stores/cartStore';
import { Trash2, Plus, Minus, ShoppingCart, ArrowLeft } from 'lucide-react';
import { Product, Price } from '@/types';
import toast from 'react-hot-toast';
import { calculateCartSummary, CartSummary, initCartCheckout, processDirectCheckout, processCartCheckout } from '@/server-actions/directCheckout.actions';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

interface CartSidebarProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function CartSidebar({ open, onOpenChange }: CartSidebarProps) {
    const items = useCartStore((state) => state.items);
    const removeFromCart = useCartStore((state) => state.removeFromCart);
    const updateQuantity = useCartStore((state) => state.updateQuantity);
    const clearCart = useCartStore((state) => state.clearCart);
    const getCartTotal = useCartStore((state) => state.getCartTotal);

    const [showCustomerForm, setShowCustomerForm] = useState(false);
    const [isProcessingCheckout, setIsProcessingCheckout] = useState(false);
    const { executeRecaptcha } = useGoogleReCaptcha();
    const [customerInfo, setCustomerInfo] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        additionalInformation: '',
    });
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});
    const [cartSummary, setCartSummary] = useState<CartSummary | null>(null);
    const [isLoadingSummary, setIsLoadingSummary] = useState(false);
    const [discountCode, setDiscountCode] = useState('');
    const [discountInput, setDiscountInput] = useState('');
    const [discountError, setDiscountError] = useState<string | null>(null);

    const formatCurrency = (amount: number): string => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(amount);
    };

    // Fetch cart summary from backend
    useEffect(() => {
        if (items.length === 0) {
            setCartSummary(null);
            return;
        }

        const fetchSummary = async () => {
            setIsLoadingSummary(true);
            setDiscountError(null);
            try {
                const products = items.map(item => ({
                    product_id: item.productId,
                    price_id: item.priceId,
                    quantity: item.quantity,
                }));

                const summary = await calculateCartSummary({
                    products,
                    discount_code: discountCode || null,
                });
                setCartSummary(summary);
                // Clear any previous errors on success
                setDiscountError(null);
            } catch (error: any) {
                console.error('Failed to calculate cart summary:', error);
                // If we have a discount code and got an error, it's likely invalid
                if (discountCode) {
                    const errorMessage = error.message || 'Invalid or expired discount code';
                    setDiscountError(errorMessage);
                    // Clear the discount code on error
                    setDiscountCode('');
                    setDiscountInput('');
                    // Try to recalculate without discount
                    try {
                        const products = items.map(item => ({
                            product_id: item.productId,
                            price_id: item.priceId,
                            quantity: item.quantity,
                        }));
                        const summary = await calculateCartSummary({
                            products,
                            discount_code: null,
                        });
                        setCartSummary(summary);
                    } catch (fallbackError) {
                        // If fallback also fails, just show null
                        setCartSummary(null);
                    }
                } else {
                    // On error without discount code, fall back to simple subtotal calculation
                    setCartSummary(null);
                }
            } finally {
                setIsLoadingSummary(false);
            }
        };

        fetchSummary();
    }, [items, discountCode]);

    const handleApplyDiscount = () => {
        if (!discountInput.trim()) {
            setDiscountError('Please enter a discount code');
            return;
        }

        setDiscountError(null);

        // Update discount code - this will trigger the useEffect to recalculate
        // The useEffect will handle the calculation and validation
        const codeToApply = discountInput.trim().toUpperCase();
        setDiscountCode(codeToApply);
    };

    const handleRemoveDiscount = () => {
        setDiscountCode('');
        setDiscountInput('');
        setDiscountError(null);
    };

    const getProductImageUrl = (product: Product): string | null => {
        if (!product.image_url) return null;
        if (Array.isArray(product.image_url) && product.image_url.length > 0) {
            return product.image_url[0];
        }
        if (typeof product.image_url === 'string') {
            return product.image_url;
        }
        return null;
    };

    const handleQuantityChange = (productId: number, priceId: string, newQuantity: number) => {
        if (newQuantity < 1) {
            removeFromCart(productId, priceId);
            toast.success('Item removed from cart');
            return;
        }
        updateQuantity(productId, priceId, newQuantity);
    };

    const handleRemove = (productId: number, priceId: string) => {
        removeFromCart(productId, priceId);
        toast.success('Item removed from cart');
    };

    const handleIncrement = (productId: number, priceId: string, currentQuantity: number) => {
        handleQuantityChange(productId, priceId, currentQuantity + 1);
    };

    const handleDecrement = (productId: number, priceId: string, currentQuantity: number) => {
        handleQuantityChange(productId, priceId, currentQuantity - 1);
    };

    const validateCustomerForm = (): boolean => {
        const errors: Record<string, string> = {};

        if (!customerInfo.firstName.trim()) {
            errors.firstName = 'First name is required';
        }
        if (!customerInfo.lastName.trim()) {
            errors.lastName = 'Last name is required';
        }
        if (!customerInfo.email.trim()) {
            errors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerInfo.email)) {
            errors.email = 'Please enter a valid email address';
        }
        if (!customerInfo.phone.trim()) {
            errors.phone = 'Phone is required';
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleCheckout = () => {
        if (items.length === 0) {
            toast.error('Your cart is empty');
            return;
        }

        // Show customer info form first
        setShowCustomerForm(true);
    };

    const handleCustomerFormSubmit = async () => {
        if (!validateCustomerForm()) {
            return;
        }

        if (items.length === 0) {
            toast.error('Your cart is empty');
            return;
        }

        setIsProcessingCheckout(true);
        try {
            // Prepare products for checkout
            const products = items.map(item => ({
                product_id: item.productId,
                price_id: item.priceId,
                quantity: item.quantity,
            }));

            // Initialize cart checkout
            const checkout = await initCartCheckout({
                products,
                first_name: customerInfo.firstName.trim(),
                last_name: customerInfo.lastName.trim(),
                email: customerInfo.email.trim().toLowerCase(),
                phone: customerInfo.phone.trim(),
                account_number: '',
                location: '',
                shipping_address: undefined,
                additional_information: customerInfo.additionalInformation.trim() || undefined,
                discount_code: discountCode || undefined,
            });

            // Execute reCAPTCHA before processing payment
            let recaptchaToken: string | undefined;
            if (executeRecaptcha) {
                recaptchaToken = await executeRecaptcha('checkout_submission');
            } else {
                console.warn('reCAPTCHA not loaded, proceeding without verification');
            }

            // Process payment and redirect to Stripe
             if (!checkout.form_session_id) {
                 toast.error('Failed to initialize cart checkout');
                 return;
             }
             const result = await processCartCheckout(checkout.form_session_id, recaptchaToken);

            if (result.redirect_url) {
                // Close sidebar and reset form (but don't clear cart yet - only on success)
                onOpenChange(false);
                setShowCustomerForm(false);
                setCustomerInfo({
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    additionalInformation: '',
                });
                // Redirect to Stripe - cart will be cleared on successful payment return
                window.location.href = result.redirect_url;
            } else {
                toast.error('Checkout initialized, but no redirect URL was returned.');
            }
        } catch (error: any) {
            console.error('Checkout error:', error);
            toast.error(error?.message || 'Failed to proceed to checkout. Please try again.');
        } finally {
            setIsProcessingCheckout(false);
        }
    };

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent side="right" className="w-full sm:max-w-lg flex flex-col p-0">
                <SheetHeader className="px-6 pt-6 pb-4 border-b">
                    <SheetTitle>Shopping Cart</SheetTitle>
                    <SheetDescription>
                        {items.length === 0
                            ? 'Your cart is empty'
                            : `${items.length} ${items.length === 1 ? 'item' : 'items'} in your cart`}
                    </SheetDescription>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto px-6 py-4">
                    {showCustomerForm ? (
                        <div className="space-y-4">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setShowCustomerForm(false)}
                                className="mb-4"
                            >
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back to Cart
                            </Button>

                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="firstName">First Name *</Label>
                                        <Input
                                            id="firstName"
                                            value={customerInfo.firstName}
                                            onChange={(e) =>
                                                setCustomerInfo({ ...customerInfo, firstName: e.target.value })
                                            }
                                            className={formErrors.firstName ? 'border-destructive' : ''}
                                        />
                                        {formErrors.firstName && (
                                            <p className="text-sm text-destructive">{formErrors.firstName}</p>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="lastName">Last Name *</Label>
                                        <Input
                                            id="lastName"
                                            value={customerInfo.lastName}
                                            onChange={(e) =>
                                                setCustomerInfo({ ...customerInfo, lastName: e.target.value })
                                            }
                                            className={formErrors.lastName ? 'border-destructive' : ''}
                                        />
                                        {formErrors.lastName && (
                                            <p className="text-sm text-destructive">{formErrors.lastName}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Email *</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={customerInfo.email}
                                        onChange={(e) =>
                                            setCustomerInfo({ ...customerInfo, email: e.target.value })
                                        }
                                        className={formErrors.email ? 'border-destructive' : ''}
                                    />
                                    {formErrors.email && (
                                        <p className="text-sm text-destructive">{formErrors.email}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone *</Label>
                                    <Input
                                        id="phone"
                                        value={customerInfo.phone}
                                        onChange={(e) =>
                                            setCustomerInfo({ ...customerInfo, phone: e.target.value })
                                        }
                                        className={formErrors.phone ? 'border-destructive' : ''}
                                    />
                                    {formErrors.phone && (
                                        <p className="text-sm text-destructive">{formErrors.phone}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="additionalInformation">Additional Information</Label>
                                    <Textarea
                                        id="additionalInformation"
                                        value={customerInfo.additionalInformation}
                                        onChange={(e) =>
                                            setCustomerInfo({
                                                ...customerInfo,
                                                additionalInformation: e.target.value,
                                            })
                                        }
                                        rows={3}
                                    />
                                </div>
                            </div>
                        </div>
                    ) : items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-12 text-center">
                            <ShoppingCart className="h-16 w-16 text-muted-foreground mb-4" />
                            <p className="text-lg font-medium text-muted-foreground">Your cart is empty</p>
                            <p className="text-sm text-muted-foreground mt-2">
                                Add products to your cart to get started
                            </p>
                        </div>
                    ) : (
                        <>
                            <div className="space-y-4">
                                {items.map((item) => {
                                    const imageUrl = getProductImageUrl(item.product);
                                    return (
                                        <div
                                            key={`${item.productId}-${item.priceId}`}
                                            className="flex gap-4 border rounded-lg p-4"
                                        >
                                            {imageUrl && (
                                                <div className="relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden bg-muted">
                                                    <Image
                                                        src={imageUrl}
                                                        alt={item.product.name}
                                                        fill
                                                        className="object-cover"
                                                        sizes="80px"
                                                    />
                                                </div>
                                            )}
                                            <div className="flex-1 space-y-2 min-w-0">
                                                <div>
                                                    <Link href={`/products/${item.product.slug}`}>
                                                        <h3 className="font-semibold text-sm hover:text-primary transition-colors cursor-pointer">{item.product.name}</h3>
                                                    </Link>
                                                    {item.product.subtitle && (
                                                        <p className="text-xs text-muted-foreground">{item.product.subtitle}</p>
                                                    )}
                                                    {item.selectedPrice.frequency && item.selectedPrice.unit && (
                                                        <p className="text-xs text-muted-foreground">
                                                            {item.selectedPrice.display_name || `${item.selectedPrice.frequency} ${item.selectedPrice.unit}`}
                                                        </p>
                                                    )}
                                                </div>
                                                <div className="flex items-center justify-between gap-2">
                                                    <div className="flex items-center gap-2">
                                                        <Button
                                                            variant="outline"
                                                            size="icon"
                                                            className="h-8 w-8"
                                                            onClick={() => handleDecrement(item.productId, item.priceId, item.quantity)}
                                                        >
                                                            <Minus className="h-4 w-4" />
                                                        </Button>
                                                        <Input
                                                            type="number"
                                                            min="1"
                                                            value={item.quantity}
                                                            onChange={(e) => {
                                                                const newQty = parseInt(e.target.value) || 1;
                                                                handleQuantityChange(item.productId, item.priceId, newQty);
                                                            }}
                                                            className="w-16 h-8 text-center"
                                                        />
                                                        <Button
                                                            variant="outline"
                                                            size="icon"
                                                            className="h-8 w-8"
                                                            onClick={() => handleIncrement(item.productId, item.priceId, item.quantity)}
                                                        >
                                                            <Plus className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                    <div className="text-right flex-shrink-0">
                                                        <p className="font-semibold">
                                                            {formatCurrency(item.selectedPrice.value * item.quantity)}
                                                        </p>
                                                        <p className="text-xs text-muted-foreground">
                                                            {formatCurrency(item.selectedPrice.value)} each
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 text-destructive hover:text-destructive flex-shrink-0"
                                                onClick={() => handleRemove(item.productId, item.priceId)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    );
                                })}
                            </div>
                        </>
                    )}
                </div>

                {/* Fixed Footer with Pricing and Checkout Button */}
                {items.length > 0 && (
                    <SheetFooter className="px-6 py-4 border-t bg-background">
                        <div className="w-full flex flex-col gap-4">
                            {showCustomerForm ? (
                                /* Continue to Checkout Button when form is shown */
                                <div className="w-full">
                                    <Button
                                        onClick={handleCustomerFormSubmit}
                                        className="w-full"
                                        size="lg"
                                        disabled={isProcessingCheckout}
                                    >
                                        {isProcessingCheckout ? 'Processing...' : 'Continue to Checkout'}
                                    </Button>
                                </div>
                            ) : (
                                <>
                                    {/* Discount Code Section */}
                                    <div className="w-full space-y-2">
                                        <Label htmlFor="discountCode" className="text-sm font-medium">
                                            Discount Code
                                        </Label>
                                        {cartSummary?.discount_code ? (
                                            <div className="flex items-center gap-2">
                                                <div className="flex-1 px-3 py-2 border rounded-md bg-green-50 border-green-200">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-sm font-medium text-green-800">
                                                            {cartSummary.discount_code} applied
                                                        </span>
                                                        <span className="text-sm text-green-700">
                                                            -{formatCurrency(cartSummary.discount_amount)}
                                                        </span>
                                                    </div>
                                                </div>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={handleRemoveDiscount}
                                                    className="flex-shrink-0"
                                                >
                                                    Remove
                                                </Button>
                                            </div>
                                        ) : (
                                            <div className="flex gap-2">
                                                <Input
                                                    id="discountCode"
                                                    placeholder="Enter discount code"
                                                    value={discountInput}
                                                    onChange={(e) => {
                                                        setDiscountInput(e.target.value.toUpperCase());
                                                        setDiscountError(null);
                                                    }}
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter') {
                                                            handleApplyDiscount();
                                                        }
                                                    }}
                                                    className={discountError ? 'border-destructive' : ''}
                                                    disabled={isLoadingSummary}
                                                />
                                                <Button
                                                    variant="outline"
                                                    onClick={handleApplyDiscount}
                                                    disabled={isLoadingSummary || !discountInput.trim()}
                                                    className="flex-shrink-0"
                                                >
                                                    {isLoadingSummary ? 'Applying...' : 'Apply'}
                                                </Button>
                                            </div>
                                        )}
                                        {discountError && (
                                            <p className="text-sm text-destructive">{discountError}</p>
                                        )}
                                    </div>
                                    {/* Cart Summary */}
                                    <div className="w-full space-y-2">
                                        {isLoadingSummary ? (
                                            <div className="text-sm text-muted-foreground">Calculating...</div>
                                        ) : cartSummary ? (
                                            <>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-sm">Subtotal</span>
                                                    <span className="text-sm font-medium">{formatCurrency(cartSummary.sub_total)}</span>
                                                </div>
                                                {cartSummary.discount_amount > 0 && (
                                                    <div className="flex justify-between items-center text-green-600">
                                                        <span className="text-sm">
                                                            Discount{cartSummary.discount_code ? ` (${cartSummary.discount_code})` : ''}
                                                        </span>
                                                        <span className="text-sm font-medium">-{formatCurrency(cartSummary.discount_amount)}</span>
                                                    </div>
                                                )}
                                                <div className="flex justify-between items-center">
                                                    <span className="text-sm">Tax ({cartSummary.tax_rate.toFixed(1)}%)</span>
                                                    <span className="text-sm font-medium">{formatCurrency(cartSummary.tax_amount)}</span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-sm">Shipping</span>
                                                    <span className="text-sm font-medium">
                                                        {cartSummary.shipping_fee === 0 ? (
                                                            <span className="text-green-600">FREE</span>
                                                        ) : (
                                                            formatCurrency(cartSummary.shipping_fee)
                                                        )}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between items-center border-t pt-2 mt-2">
                                                    <span className="font-semibold">Total</span>
                                                    <span className="font-semibold">{formatCurrency(cartSummary.total)}</span>
                                                </div>
                                            </>
                                        ) : (
                                            <div className="flex justify-between items-center">
                                                <span className="font-semibold">Subtotal</span>
                                                <span className="font-semibold">{formatCurrency(getCartTotal())}</span>
                                            </div>
                                        )}
                                    </div>
                                    {/* Checkout Button on its own row */}
                                    <div className="w-full">
                                        <Button
                                            onClick={handleCheckout}
                                            className="w-full"
                                            size="lg"
                                        >
                                            Proceed to Checkout
                                        </Button>
                                    </div>
                                </>
                            )}
                        </div>
                    </SheetFooter>
                )}
            </SheetContent>
        </Sheet>
    );
}

