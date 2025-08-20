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
import { StaticImageData } from 'next/image';
import ProductImagesActiva1 from '@/assets/images/u18nD58H5v2EH1.png'
import ProductImagesGloria1 from '@/assets/images/1duXn1s1.png'
import ProductImagesImmuna1 from '@/assets/images/2HQyRBbVQmOWWZhM1.png'
import ProductImagesEnergia1 from '@/assets/images/6LxAAhJso7Dk1.png'
import ProductImagesNadia1 from '@/assets/images/l7lA2QieckkRg1.png'
import ProductImagesEpipen1 from '@/assets/images/epipen1.jpg'
import ProductImagesEpipen2 from '@/assets/images/epipen2.jpg'
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

	type ProductName = 'Energia' | 'Gloria' | 'Nadiva' | 'Immuna' | 'Activa' | 'EpiPen';
	const isValidProductName = (name: string): name is ProductName => {
		return ['Energia', 'Gloria', 'Nadiva', 'Immuna', 'Activa', 'EpiPen'].includes(name);
	};


	interface ProductImagesType {
		energia: StaticImageData[];
		gloria: StaticImageData[];
		nadiva: StaticImageData[];
		immuna: StaticImageData[];
		activa: StaticImageData[];
		epipen: StaticImageData[];
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
		epipen: [
			ProductImagesEpipen1,
			ProductImagesEpipen2,
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

	interface ProductDetailsType {
		energia: ProductDetail;
		gloria: ProductDetail;
		nadiva: ProductDetail;
		immuna: ProductDetail;
		activa: ProductDetail;
		epipen: ProductDetail;
		default: ProductDetail;
	}

	interface ProductDetail {
		tag: string;
		description: string;
		format: string;
		keyBenefits: string[];
		howToUse?: string[];
	}

	const productDetails: ProductDetailsType = {
		energia: {
			tag: "B12 Energy & Nerve Support",
			description: "Energia is a high-potency injectable methylcobalamin solution (10mg/mL) designed to support energy production, neurological health, and optimal B12 levels.",
			format: "10ml Injectable Solution",
			keyBenefits: [
				"Boosts natural energy production and vitality",
				"Supports neurological health and function",
				"Enhances cognitive performance and mental clarity",
				"Helps maintain healthy B12 levels for vegetarians/vegans",
			],
		},
		gloria: {
			tag: "Antioxidant & Skin Brightening Solution",
			description: "Gloria is a premium injectable solution containing 200mg/ml of pharmaceutical-grade glutathione designed to support antioxidant defense, skin health, and cellular detoxification.",
			format: "10ml Injectable Solution",
			keyBenefits: [
				"Powerful antioxidant protection against free radicals",
				"Supports natural detoxification and liver function",
				"Promotes skin brightening and even tone",
				"Enhances cellular health and anti-aging benefits",
			],
		},
		nadiva: {
			tag: "Cellular Regeneration & Anti-Aging",
			description: "NADiva is a premium injectable NAD+ solution designed to support cellular repair, metabolic function, and age-management processes.",
			format: "10ml Injectable Solution",
			keyBenefits: [
				"Supports DNA repair and cellular regeneration",
				"Enhances metabolic health and energy production",
				"Promotes neuroprotection and cognitive function",
				"Aids in biological age management",
			],
		},
		immuna: {
			tag: "Immune Defense Complex",
			description: "Immuna is a premium injectable solution combining Glutathione, Ascorbic Acid, and Zinc Sulfate designed to provide comprehensive immune support and antioxidant protection.",
			format: "10ml Injectable Solution",
			keyBenefits: [
				"Enhances immune system function and defense",
				"Provides powerful antioxidant protection",
				"Promotes skin health and radiance",
				"Supports natural detoxification processes",
				"Improves cognitive function and mood stability"
			],
		},
		activa: {
			tag: "Wellness & Vitality Solution",
			description: "Activa is an injectable vitamin and nutrient solution containing B-vitamins (B1, B6, B12), L-Carnitine, and essential nutrients designed to support your body's natural processes.",
			format: "10ml Injectable Solution",
			keyBenefits: [
				"Supports natural energy production and metabolism",
				"Enhances physical endurance and recovery",
				"Promotes mental clarity and focus",
				"Supports overall metabolic wellness",
			],
		},
		epipen: {
			tag: "Epinephrine Auto-Injector",
			description: "The EpiPen® auto-injector is a pre-filled, single-use device designed to deliver a fast, accurate dose of epinephrine during a severe allergic reaction, also known as anaphylaxis. Its compact, portable design makes it easy to carry in a purse, backpack, or pocket, ensuring it's always within reach. This design makes it ideal for situations where every second matters.",
			format: "Single-use, preloaded auto-injector (0.3 mg for adults, 0.15 mg for children)",
			keyBenefits: [
				"Active Ingredient: Epinephrine",
				"Indication: Emergency treatment of severe allergic reactions caused by insect stings or bites, foods, medications or other allergens",
				"Onset of Action: Works within minutes to help open airways and improve breathing",
				"Device Design: Simple, one-handed activation with audible click confirmation",
				"Supplied As: Single-use, preloaded auto-injector (0.3 mg for adults, 0.15 mg for children)",
			],
			howToUse: [
				"Use immediately at the first signs of a severe allergic reaction.",
				"Remove the EpiPen® from its carrier tube.",
				"Grip the device in your fist (orange tip pointing downward).",
				"Remove the blue safety release by pulling straight up.",
				"Press the orange tip firmly against the outer thigh at a right angle until you hear a click.",
				"Hold in place for 3 seconds.",
				"Call 911 (or local emergency number) and seek medical attention immediately.",
				"Dispose of the used device safely.",
			],
		},
		default: {
			tag: "",
			description: "Default product description. Please specify a valid product name.",
			format: "10ml Injectable Solution",
			keyBenefits: [
				"Default benefit 1",
				"Default benefit 2",
				"Default benefit 3",
			],
		},
	};

	const getProductDetails = (productName: string): ProductDetail => {
		const normalizedName = productName.toLowerCase();
		const key = isValidProductName(productName) ? normalizedName as keyof ProductDetailsType : 'default';
		return productDetails[key];
	};

	const productDetail = getProductDetails(product.name);
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
						<h2 className='uppercase text-sm text-muted-foreground'>{productDetail.tag}</h2>
						<h1 className=' uppercase text-3xl sm:text-[42px] sm:leading-tight  font-semibold '>{product.name}</h1>
					</div>
					<div className={styles.productDetailsContainer}>
						<h3 className='text-foreground font-semibold'>
							Product Details
						</h3>
						<p>
							{productDetail.description}
						</p>
						<div className="flex items-center gap-4 pt-4">
							<PillIcon className={styles.pillIcon} />
							<span>Format: {productDetail.format}</span>
						</div>
					</div>

					<div className={styles.productDetailsContainer}>
						<p className='text-foreground font-semibold'>
							Key Benefits
						</p>
						<div className='space-y-3'>
							{productDetail.keyBenefits.map((benefit, index) => (
								<div key={index} className="flex items-center gap-4">
									<CheckMark className={styles.checkmarkIcon} />
									<span>{benefit}</span>
								</div>
							))}
						</div>
					</div>

					{productDetail.howToUse && (
						<div className={styles.productDetailsContainer}>
							<p className='text-foreground font-semibold'>
								How to Use (Emergency Quick Guide)
							</p>
							<div className='space-y-3'>
								{productDetail.howToUse.map((step, index) => (
									<div key={index} className="flex items-start gap-4">
										<span className="flex-shrink-0 w-6 h-6 bg-foreground text-background rounded-full flex items-center justify-center text-sm font-semibold">
											{index + 1}
										</span>
										<span>{step}</span>
									</div>
								))}
							</div>
							<div className="mt-4 p-3 bg-muted rounded-lg">
								<p className="text-sm font-medium">Note: The EpiPen® may be injected through clothing if necessary.</p>
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
