'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CTAButton } from '@/components/common/CTAButton'
import { Button } from '@/components/ui/button'
import { XCircle } from 'lucide-react'
import MainLayout from '@/app/layouts/MainLayout'
import { Suspense, useEffect, useState } from 'react'
import { getCheckoutInfo } from '@/server-actions/directCheckout.actions'

function CheckoutCancelledContent() {
  const searchParams = useSearchParams()
  const paymentRef = searchParams?.get('ref') || null
  const [productSlug, setProductSlug] = useState<string | null>(null)
  const [isLoadingProduct, setIsLoadingProduct] = useState(false)
  const [orderType, setOrderType] = useState<string | null>(null)
  const [sourcePath, setSourcePath] = useState<string | null>(null)
  const [isLoadingOrderType, setIsLoadingOrderType] = useState(false)

  useEffect(() => {
    if (paymentRef) {
      setIsLoadingOrderType(true)
      getCheckoutInfo(paymentRef)
        .then((data) => {
          const orderTypeValue = data.order_type || 'regular'
          const sourcePathValue = data.source_path || '/products'
          setOrderType(orderTypeValue)
          setSourcePath(sourcePathValue)

          // For regular orders, try to get product slug from products[0]
          if (orderTypeValue !== 'order_sheet') {
            const firstProduct = data.products?.[0]
            setIsLoadingProduct(true)
            if (firstProduct?.product_slug) {
              setProductSlug(firstProduct.product_slug)
            } else {
              setProductSlug(null)
            }
            setIsLoadingProduct(false)
          }
        })
        .catch(() => {
          setOrderType('regular')
          setSourcePath('/products')
          setProductSlug(null)
        })
        .finally(() => {
          setIsLoadingOrderType(false)
        })
    }
  }, [paymentRef])

  const isOrderSheet = orderType === 'order_sheet'

  return (
    <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-4 py-16">
      <div className="w-full max-w-md text-center">
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-orange-100 p-4">
            <XCircle className="h-16 w-16 text-orange-600" />
          </div>
        </div>

        <h1 className="mb-4 text-3xl font-bold text-gray-900">
          Payment Cancelled
        </h1>

        <p className="mb-2 text-gray-600">
          Your payment was cancelled. No charges were made to your account.
        </p>

        {paymentRef && (
          <p className="mb-6 text-sm text-gray-500">
            Reference: <span className="font-mono">{paymentRef}</span>
          </p>
        )}

        <p className="mb-8 text-gray-600">
          If you'd like to complete your purchase, please try again.
        </p>

        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          {!isLoadingOrderType && isOrderSheet && (
            <Link href={`${sourcePath || '/pinksky/order'}?cancelled=true&ref=${paymentRef || ''}`}>
              <CTAButton
                size="lg"
                className="py-3 h-14 w-full sm:w-auto sm:min-w-[320px]"
              >
                <span className="uppercase mx-auto text-wrap text-sm md:text-base xl:text-xl self-center font-semibold">
                  Return to Order Sheet
                </span>
              </CTAButton>
            </Link>
          )}

          {!isLoadingOrderType && !isOrderSheet && (
            <>
              <Link href="/products">
                <CTAButton
                  size="lg"
                  className="py-3 h-14 w-full sm:w-auto sm:min-w-[320px]"
                >
                  <span className="uppercase mx-auto text-wrap text-sm md:text-base xl:text-xl self-center font-semibold">
                    Continue Shopping
                  </span>
                </CTAButton>
              </Link>

              {productSlug && !isLoadingProduct && (
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  asChild
                  className="py-3 h-14 w-full sm:w-auto sm:min-w-[320px]"
                >
                  <Link href={`/products/${productSlug}`}>
                    <span className="uppercase mx-auto text-wrap text-sm md:text-base xl:text-xl self-center font-semibold">
                      Return to Product
                    </span>
                  </Link>
                </Button>
              )}
            </>
          )}

          {isLoadingOrderType && (
            <CTAButton
              size="lg"
              className="py-3 h-14 w-full sm:w-auto sm:min-w-[320px]"
              disabled
            >
              <span className="uppercase mx-auto text-wrap text-sm md:text-base xl:text-xl self-center font-semibold">
                Loading...
              </span>
            </CTAButton>
          )}
        </div>
      </div>
    </div>
  )
}

export default function CheckoutCancelledPage() {
  return (
    <MainLayout>
      <Suspense fallback={<div className="container mx-auto flex min-h-[60vh] items-center justify-center">Loading...</div>}>
        <CheckoutCancelledContent />
      </Suspense>
    </MainLayout>
  )
}

