'use client'

import { useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { getCategory, getCategoryProducts } from '@/server-actions/category.actions'
import { Product } from '@/types'
import Link from 'next/link'
import { CTAButton } from '@/components/common/CTAButton'
import { Skeleton } from '@/components/ui/skeleton'
import { ErrorDisplay } from '@/components/common/ErrorDisplay'
import MainLayout from '@/app/layouts/MainLayout'
import Image from 'next/image'
import { AlertTriangle } from 'lucide-react'
import { ProductColorIndicator } from '@/components/products-page/ProductColorIndicator'

export default function CategoryDetailPage() {
  const params = useParams()
  const categorySlug = (params?.categorySlug as string) || ''

  const {
    data: categoryData,
    isLoading: isLoadingCategory,
    error: categoryError
  } = useQuery({
    queryKey: ['category', categorySlug],
    queryFn: () => getCategory(categorySlug),
    enabled: !!categorySlug
  })

  const {
    data: productsData,
    isLoading: isLoadingProducts,
    error: productsError
  } = useQuery({
    queryKey: ['category-products', categorySlug],
    queryFn: () => getCategoryProducts(categorySlug),
    enabled: !!categorySlug
  })

  const isLoading = isLoadingCategory || isLoadingProducts
  const error = categoryError || productsError

  if (error) {
    const errorMessage = error instanceof Error
      ? error.message
      : 'An unexpected error occurred'

    return (
      <MainLayout>
        <div className='w-full min-h-[50vh] flex items-center justify-center px-4'>
          <ErrorDisplay
            title='Error Loading Category'
            message={errorMessage}
            onRetry={() => window.location.reload()}
            retryLabel='Try Again'
          />
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <div className='w-full py-12 md:py-16 lg:py-20 px-[5vw] sm:px-[3.5vw] lg:px-[3vw]'>
        <div className='xmd-container space-y-12'>
          {/* Category Header */}
          {isLoading ? (
            <div className='space-y-4'>
              <Skeleton className='h-10 w-64' />
              <Skeleton className='h-6 w-full max-w-2xl' />
            </div>
          ) : categoryData ? (
            <div className='space-y-4'>
              <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold text-foreground uppercase'>
                {categoryData.name}
              </h1>
              {categoryData.description && (
                <p className='text-lg text-muted-foreground max-w-3xl'>
                  {categoryData.description}
                </p>
              )}
              {categoryData.image_url && (
                <div className='mt-6'>
                  <Image
                    src={categoryData.image_url}
                    alt={categoryData.name}
                    width={800}
                    height={400}
                    className='rounded-lg object-cover w-full h-64 md:h-96'
                  />
                </div>
              )}
            </div>
          ) : null}

          {/* Products Grid - 4 per row */}
          {isLoading ? (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 *:h-80 *:w-full *:rounded-md'>
              <Skeleton />
              <Skeleton className='hidden md:flex' />
              <Skeleton className='hidden lg:flex' />
              <Skeleton className='hidden xl:flex' />
            </div>
          ) : productsData && Array.isArray(productsData) && productsData.length > 0 ? (
            <div className='space-y-6'>
              <div className='flex items-center justify-between'>
                <h2 className='text-2xl font-semibold'>
                  All Products ({productsData.length})
                </h2>
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
                {productsData.map((item: Product) => {
                  // Get first price
                  const firstPrice = item.price && item.price.length > 0 ? item.price[0] : null;

                  return (
                    <div
                      key={item.id}
                      className='border gap-4 h-auto w-full p-8 flex flex-col justify-between'
                    >
                      <div className='space-y-3'>
                        <h3 className='text-lg font-semibold text-foreground uppercase'>{item.name}</h3>
                        <p className='text-sm text-muted-foreground text-pretty'>{item.subtitle}</p>

                        {/* Potency Information */}
                        {item.potency && (
                          <p className='text-xs text-muted-foreground'>{item.potency}</p>
                        )}
                      </div>

                      <div className='flex items-end justify-between gap-4 mt-4'>
                        <div className='flex flex-col gap-2'>
                          {/* First Price */}
                          {firstPrice && (
                            <p className='text-sm font-semibold text-foreground'>
                              ${firstPrice.value.toFixed(2)}
                            </p>
                          )}
                          <Link href={`/products/${item.slug}`}>
                            <CTAButton size='sm'>
                              Select
                            </CTAButton>
                          </Link>
                        </div>
                        <div>
                          <ProductColorIndicator product={item} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className='text-center py-12'>
              <p className='text-muted-foreground'>No products found in this category.</p>
              <Link href='/products' className='mt-4 inline-block'>
                <CTAButton variant='outline' size='lg'>
                  View All Products
                </CTAButton>
              </Link>
            </div>
          )}

          {/* Disclaimer */}
          <div className='pt-8'>
            <div className='flex items-start gap-3 p-4 bg-gray-50/50 border border-gray-200/50 rounded-lg'>
              <AlertTriangle className='h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5' />
              <p className='text-sm text-muted-foreground'>
                Compounded drug products are not FDA or Health Canada approved. FDA or Health Canada does not evaluate compounded products for safety, effectiveness, or quality.
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}


