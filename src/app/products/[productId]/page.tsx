'use client'

import {
	Carousel,
	CarouselMainContainer,
} from '@/components/mixcnui/Carousel'

import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from 'next/image'
import { redirectToProductForm } from '@/utils/functions'
import { useQuery } from '@tanstack/react-query'
import { productInfo } from '@/server-actions/api.actions'
import { Product } from '@/types'
import { Skeleton } from '@/components/ui/skeleton'
import MainLayout from '@/app/layouts/MainLayout'
import CustomersFeedback from '@/components/home-page/CustomersFeedback'
import { CTAButton } from '@/components/common/CTAButton';
import CheckMark from '@/assets/icons/CheckMark';
import styles from '@/styles/ProductId.module.css';
import PillIcon from '@/assets/icons/PillIcon';
import { HowItWorksStatic } from '@/components/home-page/HowItWorks';





export default function ProductDetails({ params }: { params: { productId: string } }) {
	const productId = params.productId
	let product: Product | undefined = undefined

	const {
		data: productData,
		isLoading,
		error
	} = useQuery({
		queryKey: ['product-info', productId],
		queryFn: () => productInfo(productId)
	})

	if (error) {
		return <h2>An error occured</h2>
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
			<div className='w-full h-[50vh] min-h-[300px] flex justify-center items-center'>
				<h2 className='text-2xl font-bold'>No product found</h2>
			</div>
		)
	}

	let lowestPrice = null;
	if (product.price && Array.isArray(product.price) && product.price.length > 0) {
		const usdPrices = product.price.map(price => price.value);
		lowestPrice = Math.min(...usdPrices);
	}

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
	
	// Parse benefits from API (split by newlines or commas)
	let displayBenefits: string[] = [];
	if (product.benefits) {
		// Try splitting by newlines first
		const byNewlines = product.benefits
			.split(/\n+/)
			.map(b => b.trim())
			.filter(b => b.length > 0);
		
		// If multiple items found via newlines, use those
		if (byNewlines.length > 1) {
			displayBenefits = byNewlines;
		} else {
			// Otherwise, try splitting by commas
			const byCommas = product.benefits
				.split(',')
				.map(b => b.trim())
				.filter(b => b.length > 0);
			
			// If multiple items found via commas, use those; otherwise use the single benefit
			displayBenefits = byCommas.length > 1 ? byCommas : [product.benefits.trim()];
		}
	}
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
							<h2 className='uppercase text-sm text-muted-foreground'>{displayTag}</h2>
						)}
						<h1 className=' uppercase text-3xl sm:text-[42px] sm:leading-tight  font-semibold '>{product.name}</h1>
					</div>
					<div className={styles.productDetailsContainer}>
						<h3 className='text-foreground font-semibold'>
							Product Details
						</h3>
						{displayDescription ? (
							<div 
								className="prose prose-sm max-w-none [&>div]:mb-3 [&>div:last-child]:mb-0 [&_strong]:font-semibold [&_a]:text-primary [&_a]:underline [&_a:hover]:text-primary/80"
								dangerouslySetInnerHTML={{ __html: displayDescription }}
							/>
						) : (
							<p className="text-muted-foreground">No description available.</p>
						)}
					</div>

					{displayBenefits.length > 0 && (
						<div className={styles.productDetailsContainer}>
							<p className='text-foreground font-semibold'>
								Key Benefits
							</p>
							<div className='space-y-3'>
								{displayBenefits.map((benefit, index) => (
									<div key={index} className="flex items-center gap-4">
										<CheckMark className={styles.checkmarkIcon} />
										<span>{benefit}</span>
									</div>
								))}
							</div>
						</div>
					)}

					<div className='py-6'></div>
					<CTAButton
						type='submit'
						onClick={() => redirectToProductForm(product.id)}
						aria-label="Get started"
						size='lg'
					>
						GET STARTED
					</CTAButton>
				</div>
			</div>
			<CustomersFeedback />

			<HowItWorksStatic />
		</MainLayout>
	)
}
