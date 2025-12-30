'use client'

import {
	Carousel,
	CarouselMainContainer,
} from '@/components/mixcnui/Carousel'

import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from 'next/image'
import { redirectToProductForm, formatPrice } from '@/utils/functions'
import { useQuery } from '@tanstack/react-query'
import { productInfo } from '@/server-actions/api.actions'
import { Product, Price } from '@/types'
import { Skeleton } from '@/components/ui/skeleton'
import MainLayout from '@/app/layouts/MainLayout'
import CustomersFeedback from '@/components/home-page/CustomersFeedback'
import { CTAButton } from '@/components/common/CTAButton';
import styles from '@/styles/ProductId.module.css';
import PillIcon from '@/assets/icons/PillIcon';
import { HowItWorksStatic } from '@/components/home-page/HowItWorks';
import { QualityAssuranceSection } from '@/components/products-page/QualityAssuranceSection';
import { CheckoutModal } from '@/components/products-page/CheckoutModal';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ErrorDisplay } from '@/components/common/ErrorDisplay';
import { useCartStore } from '@/stores/cartStore';
import toast from 'react-hot-toast';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';





export default function ProductDetails({ params }: { params: { productId: string } }) {
	const productId = params.productId
	let product: Product | undefined = undefined
	const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false)
	const [selectedPrice, setSelectedPrice] = useState<Price | null>(null)
	const addToCart = useCartStore((state) => state.addToCart)

	const {
		data: productData,
		isLoading,
		error
	} = useQuery({
		queryKey: ['product-info', productId],
		queryFn: () => productInfo(productId)
	})

	if (error) {
		const errorMessage = error instanceof Error
			? error.message
			: 'An unexpected error occurred'

		return (
			<MainLayout>
				<div className='w-full min-h-[50vh] flex items-center justify-center'>
					<ErrorDisplay
						title='Error Loading Product'
						message={errorMessage}
						onRetry={() => window.location.href = '/products'}
						retryLabel='View All Products'
					/>
				</div>
			</MainLayout>
		)
	}

	// console.log(productData)

	if (productData && productData.data) {
		product = productData.data as Product
	}

	if (isLoading) {
		return (
			<div className='w-[90vw] sm:w-[93vw] lg:w-[94vw] max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 pt-9 pb-10 md:pt-14  md:pb-16 '>
				<div>
					<Skeleton className='w-full aspect-square max-h-[480px] rounded-xl' />
					<div className='mt-3 grid grid-cols-3 xl:grid-col-4 gap-3'>
						<Skeleton className='h-[100px] rounded-xl' />
						<Skeleton className='h-[100px] rounded-xl' />
					</div>
				</div>

				<div className='text-blck'>
					<Skeleton className='h-[100px] rounded-xl' />
					<Skeleton className='h-[30px] rounded-xl mt-2' />
				</div>
			</div>
		)
	}

	if (!product) {
		return (
			<MainLayout>
				<div className='w-full min-h-[50vh] flex items-center justify-center'>
					<ErrorDisplay
						title='Product Not Found'
						message="Sorry, we couldn't find the product you're looking for. It may have been removed or the link is incorrect."
						onRetry={() => window.location.href = '/products'}
						retryLabel='View All Products'
					/>
				</div>
			</MainLayout>
		)
	}

	let lowestPrice = null;
	if (product.price && Array.isArray(product.price) && product.price.length > 0) {
		const usdPrices = product.price.map(price => price.value);
		lowestPrice = Math.min(...usdPrices);
	}

	// Filter out prices with frequency === 1 for display
	const displayPrices = product.price && Array.isArray(product.price)
		? product.price.filter(price => price.frequency !== 1)
		: [];

	// Get product images from API
	const getProductImageUrls = (): string[] => {
		if (product?.image_url) {
			// Handle both string and array formats
			if (Array.isArray(product.image_url)) {
				return product.image_url;
			}
			return [product.image_url];
		}
		// Backend should return placeholder, but if not, return empty array
		// The carousel will show placeholder from backend or fallback message
		return [];
	};

	// Use only API data - no hardcoded fallbacks
	const displayDescription = product.description || '';
	const displayTag = product.subtitle || product.key_ingredients || null;
	return (
		<MainLayout>
			<div className='w-[90vw] sm:w-[93vw] lg:w-[94vw] max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10 pt-9 pb-10 md:pt-14  md:pb-16 '>
				{' '}
				<Carousel>
					<CarouselMainContainer className='w-full'>
						{getProductImageUrls().length > 0 ? (
							getProductImageUrls().map((imgUrl: string, index: number) => (
								<AspectRatio ratio={1} key={index}>
									<div className="rounded-sm">
										<Image
											src={imgUrl}
											alt={`${product.name} product view ${index + 1}`}
											className="object-contain object-center"
											fill
											sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
											style={{ objectFit: 'contain' }}
										/>
									</div>
								</AspectRatio>
							))
						) : (
							<AspectRatio ratio={1}>
								<div className="rounded-sm bg-muted flex items-center justify-center">
									<span className="text-muted-foreground text-sm">Loading image...</span>
								</div>
							</AspectRatio>
						)}
					</CarouselMainContainer>
				</Carousel>
				<div className='text-block'>
					{/* <div className='pb-4'>
						<div
							className={`w-6 h-6 rounded-full ${product.name === 'Nadiva' ? 'bg-[#90B9AC]' :
								product.name === 'Gloria' ? 'bg-[#AEA581]' :
									product.name === 'Immuna' ? 'bg-[#6E6D6B]' :
										product.name === 'Energia' ? 'bg-[#DBD7D6]' :
											product.name === 'Activa' ? 'bg-[#CEF3E9]' :
												product.name === 'EpiPen' ? 'bg-[#FF6B6B]' :
												'bg-gray-500'
								}`}
						/>
					</div> */}

					<div className='space-y-2'>
						{displayTag && (
							<h2 className='uppercase text-sm text-muted-foreground break-words'>{displayTag}</h2>
						)}
						<h1 className='uppercase text-3xl sm:text-[42px] sm:leading-tight font-semibold break-words'>{product.name}</h1>
					</div>
					<div className={styles.productDetailsContainer}>
						<h3 className='text-foreground font-semibold'>
							Product Details
						</h3>
						{displayDescription ? (
							<div
								className="prose prose-sm max-w-none [&>div]:mb-3 [&>div:last-child]:mb-0 [&_strong]:font-semibold [&_a]:text-primary [&_a]:underline [&_a:hover]:text-primary/80 break-words [&_a]:break-all"
								style={{ wordWrap: 'break-word', overflowWrap: 'anywhere' }}
								dangerouslySetInnerHTML={{ __html: displayDescription }}
							/>
						) : (
							<p className="text-muted-foreground">No description available.</p>
						)}
					</div>

					{/* Price Selection (for direct checkout) */}
					{product.checkout_type === 'direct' && displayPrices && displayPrices.length > 0 && (
						<div className={styles.productDetailsContainer}>
							{/* Check if this is a peptide product (no frequency/unit on first price) */}
							{displayPrices[0] && !displayPrices[0].frequency && !displayPrices[0].unit && (
								<p className='text-sm text-muted-foreground mb-3 italic break-words' style={{ overflowWrap: 'anywhere' }}>
									This is for pre-order. Shipping takes 2 to 4 weeks.
								</p>
							)}
							<p className='text-foreground font-semibold mb-4'>
								Select Pricing
							</p>
							
							<div className='space-y-4'>
								{/* Select Dropdown */}
								<Select 
									value={selectedPrice?.id.toString() || ''} 
									onValueChange={(priceId) => {
										const selected = displayPrices.find(p => p.id.toString() === priceId);
										if (selected) setSelectedPrice(selected);
									}}
								>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="Choose an option" />
									</SelectTrigger>
									<SelectContent>
										{displayPrices.map((price) => {
											const isPeptide = !price.frequency || !price.unit;
											const label = isPeptide ? 'Price' : (price.display_name || `${price.frequency} ${price.unit}`);
											return (
												<SelectItem key={price.id} value={price.id.toString()}>
													{label}
												</SelectItem>
											);
										})}
									</SelectContent>
								</Select>

								{/* Selected Price Card */}
								{selectedPrice && (
									<div className='border border-border rounded-lg p-5 bg-muted/30'>
										<div className='space-y-3'>
											{/* Option Name */}
											<div className='flex justify-between items-start gap-4'>
												<div>
													<p className='text-sm text-muted-foreground'>Selected Plan</p>
													<p className='text-lg font-semibold text-foreground'>
														{!selectedPrice.frequency || !selectedPrice.unit 
															? 'Price' 
															: (selectedPrice.display_name || `${selectedPrice.frequency} ${selectedPrice.unit}`)}
													</p>
												</div>
												{(() => {
													let discountPercentage = null;
													if (selectedPrice.frequency === 6) {
														discountPercentage = 10;
													} else if (selectedPrice.frequency === 9 || selectedPrice.frequency === 12) {
														discountPercentage = 15;
													}
													return discountPercentage && (
														<span className='inline-flex items-center justify-center px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full whitespace-nowrap'>
															{discountPercentage}% OFF
														</span>
													);
												})()}
											</div>
											
											{/* Price */}
											<div className='border-t border-border pt-3'>
												<p className='text-sm text-muted-foreground mb-1'>Total Price</p>
												<p className='text-3xl font-bold text-foreground'>
													${formatPrice(selectedPrice.value)}
												</p>
											</div>
										</div>
									</div>
								)}
							</div>
						</div>
					)}

					{/* Disclaimer */}
					<div className={styles.productDetailsContainer}>
						<p className='text-xs text-muted-foreground italic break-words' style={{ overflowWrap: 'anywhere' }}>
							Compounded drug products are not FDA or Health Canada approved. FDA or Health Canada does not evaluate compounded products for safety, effectiveness, or quality.
						</p>
					</div>

					<div className='py-6'></div>
					{product.checkout_type === 'direct' ? (
						<>
							<div className='flex flex-col sm:flex-row gap-4'>
								<CTAButton
									type='button'
									onClick={() => {
										if (!selectedPrice && displayPrices && displayPrices.length > 0) {
											// Auto-select first price if none selected
											setSelectedPrice(displayPrices[0])
										}
										setIsCheckoutModalOpen(true)
									}}
									disabled={!selectedPrice && (!displayPrices || displayPrices.length === 0)}
									aria-label="Checkout"
									size='lg'
									className='flex-1'
								>
									CHECKOUT
								</CTAButton>
								<Button
									type='button'
									variant='outline'
									onClick={() => {
										if (!selectedPrice && displayPrices && displayPrices.length > 0) {
											// Auto-select first price if none selected
											setSelectedPrice(displayPrices[0])
											toast.error('Please select a price option first')
											return
										}
										if (!selectedPrice) {
											toast.error('Please select a price option first')
											return
										}
										addToCart(product, selectedPrice, 1)
										toast.success('Product added to cart')
									}}
									disabled={!selectedPrice && (!displayPrices || displayPrices.length === 0)}
									aria-label="Add to Cart"
									size='lg'
									className='flex-1'
								>
									ADD TO CART
								</Button>
							</div>
							{selectedPrice && (
								<CheckoutModal
									open={isCheckoutModalOpen}
									onOpenChange={setIsCheckoutModalOpen}
									product={product}
									selectedPrice={selectedPrice}
								/>
							)}
						</>
					) : (
						<CTAButton
							type='submit'
							onClick={() => redirectToProductForm(product.id)}
							aria-label="Get started"
							size='lg'
						>
							GET STARTED
						</CTAButton>
					)}
				</div>
			</div>
			
			{/* Quality Assurance Section - Only for Peptide Products */}
			{/* {product.checkout_type === 'direct' && displayPrices && displayPrices.length > 0 && !displayPrices[0].frequency && !displayPrices[0].unit && ( */}
				<QualityAssuranceSection showButton={true} />
			{/* )} */}

			<CustomersFeedback />

			<HowItWorksStatic />
		</MainLayout>
	)
}
