'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CTAButton } from '@/components/common/CTAButton'
import { Button } from '@/components/ui/button'
import { CheckCircle2 } from 'lucide-react'
import MainLayout from '@/app/layouts/MainLayout'
import { Suspense } from 'react'
import { useSession } from 'next-auth/react'

function CheckoutSuccessContent() {
  const searchParams = useSearchParams()
  const paymentRef = searchParams?.get('ref') || null
  const { data: session } = useSession()
  const isLoggedIn = !!session

  return (
    <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-4 py-16">
      <div className="w-full max-w-md text-center">
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-green-100 p-4">
            <CheckCircle2 className="h-16 w-16 text-green-600" />
          </div>
        </div>
        
        <h1 className="mb-4 text-3xl font-bold text-gray-900">
          Payment Successful!
        </h1>
        
        <p className="mb-2 text-gray-600">
          Thank you for your purchase. Your order has been confirmed.
        </p>
        
        {paymentRef && (
          <p className="mb-6 text-sm text-gray-500">
            Reference: <span className="font-mono">{paymentRef}</span>
          </p>
        )}
        
        <p className="mb-8 text-gray-600">
          You will receive an email confirmation shortly with your order details.
        </p>
        
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
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
          
          {isLoggedIn && (
            <Button
              type="button"
              variant="outline"
              size="lg"
              asChild
              className="min-w-[240px] px-8"
            >
              <Link href="/dashboard/orders">
                View Orders
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default function CheckoutSuccessPage() {
  return (
    <MainLayout>
      <Suspense fallback={<div className="container mx-auto flex min-h-[60vh] items-center justify-center">Loading...</div>}>
        <CheckoutSuccessContent />
      </Suspense>
    </MainLayout>
  )
}

