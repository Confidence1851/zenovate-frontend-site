'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CTAButton } from '@/components/common/CTAButton'
import { XCircle } from 'lucide-react'
import MainLayout from '@/app/layouts/MainLayout'
import { Suspense } from 'react'

function CheckoutCancelledContent() {
  const searchParams = useSearchParams()
  const paymentRef = searchParams?.get('ref') || null

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
          <CTAButton
            type="button"
            asChild
            size="lg"
          >
            <Link href="/products">
              Continue Shopping
            </Link>
          </CTAButton>
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

