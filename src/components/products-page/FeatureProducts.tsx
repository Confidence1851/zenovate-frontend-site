'use client'

import { getProductsByCategories } from '@/server-actions/category.actions'
import { useQuery } from '@tanstack/react-query'
import { Skeleton } from '../ui/skeleton'
import { Product } from '@/types'
import Link from 'next/link'
import { CTAButton } from '../common/CTAButton'
import { ErrorDisplay } from '../common/ErrorDisplay'

const FeatureProducts = () => {
	const {
		data: categoriesData,
		isLoading,
		error
	} = useQuery({
		queryKey: ['products-by-categories'],
		queryFn: getProductsByCategories
	})

	if (error) {
		const errorMessage = error instanceof Error 
			? error.message 
			: 'An unexpected error occurred'
		
		return (
			<section className='bg-White-100-100 py-12 md:py-16 lg:py-16 px-[5vw] sm:px-[3.5vw] lg:px-[3vw]'>
				<div className='xmd-container min-h-[300px]'>
					<ErrorDisplay
						title='Error Loading Products'
						message={errorMessage}
						onRetry={() => window.location.reload()}
						retryLabel='Try Again'
					/>
				</div>
			</section>
		)
	}

	return (
		<section className='bg-White-100-100 space-y-16 py-12 md:py-16 lg:py-16 px-[5vw] sm:px-[3.5vw] lg:px-[3vw]'>
			<div className='xmd-container space-y-16'>
				{/* Header */}
				<div>
					<p className='text-xl md:text-2xl max-w-[700px] font-medium'>
						Zenovate offers a range of personalized wellness shots designed to support specific health goals and
						address individual needs. Our precision-formulated injections are developed by licensed prescribers,
						ensuring safe and effective results.
					</p>
				</div>

				{isLoading ? (
					<div className='grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 *:h-80 *:w-full *:rounded-md'>
						<Skeleton />
						<Skeleton className='hidden md:flex' />
						<Skeleton className='hidden lg:flex' />
						<Skeleton className='hidden xl:flex' />
					</div>
				) : (
					<div className='space-y-16'>
						{(categoriesData ?? []).map((category: any) => (
							<div key={category.slug} className='space-y-6'>
								{/* Category Header */}
								<div className='flex items-center justify-between'>
									<div>
										<h2 className='text-2xl md:text-3xl font-bold text-foreground uppercase'>
											{category.name}
										</h2>
										{category.description && (
											<p className='text-muted-foreground mt-2'>{category.description}</p>
										)}
									</div>
									{category.products_count > 4 && (
										<Link href={`/category/${category.slug}`}>
											<CTAButton
												variant='outline'
												size='sm'
											>
												View All
											</CTAButton>
										</Link>
									)}
								</div>

								{/* Products Grid - 4 per row */}
								<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
									{(category.products ?? []).map((item: Product) => (
										<div
											key={item.id}
											className='border gap-4 h-80 w-full p-8 flex flex-col justify-between'
										>
											<div className='space-y-10'>
												<h3 className='text-lg font-semibold text-foreground uppercase'>{item.name}</h3>
												<p className='text-sm text-muted-foreground text-pretty'>{item.subtitle}</p>
											</div>
											<div className='flex items-end justify-between gap-4'>
												<Link href={`/products/${item.slug}`}>
													<CTAButton size='sm'>
														Select
													</CTAButton>
												</Link>
												<div>
													<div
														className="w-6 h-6 rounded-full bg-gray-500"
														style={{
															backgroundColor: (() => {
																const colors = ['#90B9AC', '#AEA581', '#6E6D6B', '#DBD7D6', '#CEF3E9', '#FF6B6B', '#9CA3AF', '#FBBF24', '#60A5FA', '#A78BFA'];
																const hash = item.id.toString().split('').reduce((acc, char) => {
																	return char.charCodeAt(0) + ((acc << 5) - acc);
																}, 0);
																return colors[Math.abs(hash) % colors.length];
															})()
														}}
													/>
												</div>
											</div>
										</div>
									))}
								</div>
							</div>
						))}

						{/* Show products without categories if any */}
						{categoriesData && categoriesData.length === 0 && (
							<div className='text-center py-12'>
								<p className='text-muted-foreground'>No products available at the moment.</p>
							</div>
						)}
					</div>
				)}
			</div>
		</section>
	)
}

export default FeatureProducts
