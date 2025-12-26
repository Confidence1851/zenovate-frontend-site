'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { getCheckoutInfo } from '@/server-actions/directCheckout.actions'
import Link from 'next/link'
import { CTAButton } from '@/components/common/CTAButton'
import { AlertCircle } from 'lucide-react'
import MainLayout from '@/app/layouts/MainLayout'
import { Suspense } from 'react'

function CheckoutErrorContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const paymentRef = searchParams?.get('ref') || null
  const status = searchParams?.get('status') || null
  const [sourcePath, setSourcePath] = useState<string | null>(null)
  const [isLoadingOrderType, setIsLoadingOrderType] = useState(false)

  // Fetch source path and check if this is an order sheet order to redirect if form data exists
  useEffect(() => {
    if (paymentRef) {
      setIsLoadingOrderType(true)
      getCheckoutInfo(paymentRef)
        .then((data) => {
          const sourcePathValue = data.source_path || '/pinksky/order'
          setSourcePath(sourcePathValue)
          
          const storedData = sessionStorage.getItem('orderSheetFormData')
          if (storedData) {
            // Redirect to order sheet with error flag
            router.replace(`${sourcePathValue}?error=true&ref=${paymentRef}`)
          }
        })
        .catch(() => {
          setSourcePath('/pinksky/order')
        })
        .finally(() => {
          setIsLoadingOrderType(false)
        })
    }
  }, [paymentRef, router])

  const getErrorMessage = () => {
    if (status === 'failed') {
      return 'Your payment could not be processed. Please check your payment details and try again.';
    }
    return 'An error occurred while processing your payment. Please try again or contact support if the problem persists.';
  }

  return (
    <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-4 py-16">
      <div className="w-full max-w-md text-center">
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-red-100 p-4">
            <AlertCircle className="h-16 w-16 text-red-600" />
          </div>
        </div>
        
        <h1 className="mb-4 text-3xl font-bold text-gray-900">
          Payment Error
        </h1>
        
        <p className="mb-2 text-gray-600">
          {getErrorMessage()}
        </p>
        
        {paymentRef && (
          <p className="mb-6 text-sm text-gray-500">
            Reference: <span className="font-mono">{paymentRef}</span>
          </p>
        )}
        
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <CTAButton
            type="button"
            asChild
            size="lg"
          >
            <Link href="/products">
              Continue Shopping
            </Link>
          </CTAButton>
          
          {paymentRef && (
            <CTAButton
              type="button"
              variant="outline"
              asChild
              size="lg"
            >
              <Link href={`${sourcePath || '/pinksky/order'}?error=true&ref=${paymentRef}`}>
                Retry Order
              </Link>
            </CTAButton>
          )}
          
          <CTAButton
            type="button"
            variant="outline"
            asChild
            size="lg"
          >
            <Link href="/contact">
              Contact Support
            </Link>
          </CTAButton>
        </div>
      </div>
    </div>
  )
}

export default function CheckoutErrorPage() {
  return (
    <MainLayout>
      <Suspense fallback={<div className="container mx-auto flex min-h-[60vh] items-center justify-center">Loading...</div>}>
        <CheckoutErrorContent />
      </Suspense>
    </MainLayout>
  )
}

