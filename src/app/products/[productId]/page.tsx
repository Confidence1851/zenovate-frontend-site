'use client'

import {
	Carousel,
	CarouselMainContainer,
	// CarouselNext,
	// CarouselPrevious,
	SliderMainItem,
	CarouselThumbsContainer,
	SliderThumbItem
} from '@/components/mixcnui/Carousel'

import starFilled from '@/assets/svgs/starFilled.svg'
import starEmpty from '@/assets/svgs/starEmpty.svg'
import Image from 'next/image'
import { redirectToProductForm } from '@/utils/functions'
import { useQuery } from '@tanstack/react-query'
import { productInfo } from '@/server-actions/api.actions'
import { Product } from '@/types'
import { Skeleton } from '@/components/ui/skeleton'

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

	console.log(productData)

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

	return (
		<div className='w-[90vw] sm:w-[93vw] lg:w-[94vw] max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10 pt-9 pb-10 md:pt-14  md:pb-16 '>
			{' '}
			<Carousel>
				{/* <CarouselNext className='top-1/3 -translate-y-1/3' />
				<CarouselPrevious className='top-1/3 -translate-y-1/3' /> */}
				<CarouselMainContainer className='w-full aspect-square max-h-[480px]'>
					{Array.from({ length: 5 }).map((_, index) => (
						<SliderMainItem key={index} className='bg-transparent'>
							<div
								className='  size-full overflow-hidden flex items-center justify-center
            rounded-xl bg-[#F7F7F5]'
							>
								Slide {index + 1}
								{/* <img src="" alt="" className='min-w-full min-h-full object-cover object-center' /> */}
							</div>
						</SliderMainItem>
					))}
				</CarouselMainContainer>
				<CarouselThumbsContainer>
					{Array.from({ length: 5 }).map((_, index) => (
						<SliderThumbItem key={index} index={index} className='bg-transparent cursor-pointer'>
							<div
								className='  size-full overflow-hidden flex items-center
            justify-center rounded-xl bg-[#F7F7F5]'
							>
								Slide {index + 1}
								{/* <img src="" alt="" className='min-w-full min-h-full object-cover object-center' /> */}
							</div>{' '}
						</SliderThumbItem>
					))}
				</CarouselThumbsContainer>
			</Carousel>
			<div className='text-blck'>
				<h2 className=' uppercase text-3xl sm:text-[42px] sm:leading-tight  font-semibold '>{product.name}</h2>
				<p className='text-base  pt-2.5'>{product.description}</p>
				<div>
					<hr className='bg-black h-[1px] w-full m-0 p-0 border-none mt-16 mb-4' />
					<div className='flex justify-between flex-wrap gap-5 items-center'>
						<p className=' text-base leading-4 md:leading-5 md:text-xl font-semibold'>{product.price}</p>
						<div className='flex justify-center items-center gap-2'>
							<div className='flex items-center gap-0 md:gap-[0.5px] *:h-[20px] *:md:h-[25px]'>
								<Image src={starFilled} alt='rating' />
								<Image src={starFilled} alt='rating' />
								<Image src={starFilled} alt='rating' />
								<Image src={starFilled} alt='rating' />
								<Image src={starEmpty} alt='rating' />
							</div>
							<p className=' text-base leading-4 md:leading-5 md:text-xl font-semibold'>(20 reviews)</p>
						</div>
					</div>
				</div>
				<button
					type='submit'
					className='h-[43px] bg-black flex justify-center items-center px-4 w-full mt-10'
					onClick={() => redirectToProductForm(product.id)}
				>
					<div className='w-full justify-between items-center flex'>
						<p className='text-white text-base font-semibold uppercase'>order product</p>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth='1.5'
							stroke='currentColor'
							className='size-5 text-white'
						>
							<path strokeLinecap='round' strokeLinejoin='round' d='M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3' />
						</svg>
					</div>
				</button>
			</div>
		</div>
	)
}
