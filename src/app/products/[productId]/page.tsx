'use client'

import {
	Carousel,
	CarouselMainContainer,
	// SliderMainItem,
	// CarouselThumbsContainer,
	// SliderThumbItem
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
import { StaticImageData } from 'next/image';
import ProductImagesActiva1 from '@/assets/images/u18nD58H5v2EH.png'
import ProductImagesGloria1 from '@/assets/images/1duXn1s.png'
import ProductImagesImmuna1 from '@/assets/images/2HQyRBbVQmOWWZhM.png'
import ProductImagesEnergia1 from '@/assets/images/6LxAAhJso7Dk.png'
import ProductImagesNadia1 from '@/assets/images/l7lA2QieckkRg.png'
import { CTAButton } from '@/components/common/CTAButton';
import CheckMark from '@/assets/icons/CheckMark';
import styles from '@/styles/ProductId.module.css';
import PillIcon from '@/assets/icons/PillIcon';





export default function ProductDetails({ params }: { params: { productId: string } }) {
	const productId = params.productId
	let product: Product | undefined = undefined

	const {
		data: productData,
		isLoading,
		error
	} = useQuery({
		queryKey: ['product-info'],
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

	type ProductName = 'Energia' | 'Gloria' | 'Nadiva' | 'Immuna' | 'Activa';
	const isValidProductName = (name: string): name is ProductName => {
		return ['Energia', 'Gloria', 'Nadiva', 'Immuna', 'Activa'].includes(name);
	};


	interface ProductImagesType {
		energia: StaticImageData[];
		gloria: StaticImageData[];
		nadiva: StaticImageData[];
		immuna: StaticImageData[];
		activa: StaticImageData[];
		default: StaticImageData[];
	}

	const productImages: ProductImagesType = {
		energia: [
			ProductImagesEnergia1,

		],
		gloria: [
			ProductImagesGloria1,

		],
		nadiva: [
			ProductImagesNadia1,

		],
		immuna: [
			ProductImagesImmuna1,

		],
		activa: [
			ProductImagesActiva1,

		],
		default: [
			ProductImagesActiva1,

		]
	};

	const getProductImages = (productName: string): StaticImageData[] => {
		const normalizedName = productName.toLowerCase();
		const key = isValidProductName(productName) ? normalizedName as keyof ProductImagesType : 'default';
		return productImages[key];
	};

	// const formatPrice = () => {
	// 	if (product.price && Array.isArray(product.price) && product.price.length > 0) {
	// 		const usdPrices = product.price.map(price => price.value);
	// 		const lowestPrice = Math.min(...usdPrices);
	// 		const currency = product.price[0]?.currency || 'USD';
	// 		return `Starting at $${lowestPrice} ${currency}`;
	// 	}
	// 	return null;
	// };

	return (
		<MainLayout>
			<div className='w-[90vw] sm:w-[93vw] lg:w-[94vw] max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10 pt-9 pb-10 md:pt-14  md:pb-16 '>
				{' '}
				<Carousel>
					<CarouselMainContainer className='w-full'>
						{getProductImages(product.name).map((imgSrc: StaticImageData, index: number) => (
							<AspectRatio ratio={1}>
								<div className="rounded-sm">
									<Image
										src={imgSrc.src}
										alt={`${product.name} product view ${index + 1}`}
										className="object-contain object-center"
										fill
										sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
										style={{ objectFit: 'contain' }}
									/>
								</div>
							</AspectRatio>
						))}
					</CarouselMainContainer>
					{/* <CarouselThumbsContainer>
						{getProductImages(product.name).map((imgSrc: StaticImageData, index: number) => (
							<SliderThumbItem key={index} index={index} className='bg-transparent cursor-pointer'>
								<div
									className='size-full overflow-hidden flex items-center justify-center rounded-xl bg-[#F7F7F5]'
								>
									<img
										src={imgSrc.src}
										alt={`${product.name} thumbnail ${index + 1}`}
										className='min-w-full min-h-full object-cover object-center'
									/>
								</div>{' '}
							</SliderThumbItem>
						))}
					</CarouselThumbsContainer> */}
				</Carousel>
				<div className='text-block'>
					<div className='pb-4'>
						<div
							className={`w-6 h-6 rounded-full ${product.name === 'Nadiva' ? 'bg-[#90B9AC]' :
								product.name === 'Gloria' ? 'bg-[#AEA581]' :
									product.name === 'Immuna' ? 'bg-[#6E6D6B]' :
										product.name === 'Energia' ? 'bg-[#DBD7D6]' :
											product.name === 'Activa' ? 'bg-[#CEF3E9]' :
												'bg-gray-500'
								}`}
						/>
					</div>

					<div className='space-y-2'>
						<h2 className='uppercase text-sm text-muted-foreground'>Wellness & Vitality Solution</h2>
						<h1 className=' uppercase text-3xl sm:text-[42px] sm:leading-tight  font-semibold '>{product.name}</h1>
					</div>
					{/* <div className='pt-8 space-y-2 text-base'>
						<p className='text-foreground font-semibold'>
							Your path to enhanced wellness begins here.
						</p>
						<p className='text-muted-foreground'>
							Get a personalized prescription from licensed healthcare professionals delivered discreetly to your door.
						</p>
					</div> */}
					<div className={styles.productDetailsContainer}>
						<h3 className='text-foreground font-semibold'>
							Product Details
						</h3>
						<p>
							Activa is an injectable vitamin and nutrient solution containing B-vitamins (B1, B6, B12),
							L-Carnitine, and essential nutrients designed to support your body's natural processes.

						</p>
						<div className="flex items-center gap-4 pt-4">
							<PillIcon className={styles.pillIcon} />
							<span>Format: 10ml Injectable Solution</span>
						</div>
					</div>

					<div className={styles.productDetailsContainer}>
						<p className='text-foreground font-semibold'>
							Key Benefits
						</p>
						<div className='space-y-3'>
							<div className="flex items-center gap-4">
								<CheckMark className={styles.checkmarkIcon} />
								<span>Supports natural energy production and metabolism</span>
							</div>
							<div className="flex items-center gap-4">
								<CheckMark className={styles.checkmarkIcon} />
								<span>Enhances physical endurance and recovery</span>
							</div>
							<div className="flex items-center gap-4">
								<CheckMark className={styles.checkmarkIcon} />
								<span>Promotes mental clarity and focus</span>
							</div>
							<div className="flex items-center gap-4">
								<CheckMark className={styles.checkmarkIcon} />
								<span>Supports overall metabolic wellness</span>
							</div>
						</div>
					</div>

					{/* <p className='text-base pt-2.5'>{product.description}</p> */}
					{/* <div>
						<hr className='bg-black h-[1px] w-full m-0 p-0 border-none mt-16 mb-4' />
						<div className='flex justify-between flex-wrap gap-5 items-center'>
							{formatPrice() && (
								<p className='text-base leading-4 md:leading-5 md:text-xl font-semibold'>
									{formatPrice()}
								</p>
							)}

						</div>
					</div> */}

					<div className='py-6'>
						<div className='border border-gray-200 w-full border-1' />
					</div>

					<CTAButton
						type='submit'
						onClick={() => redirectToProductForm(product.id)}
						aria-label="Get started"
					>
						GET STARTED
					</CTAButton>

				</div>
			</div>
			<CustomersFeedback />
		</MainLayout>
	)
}
