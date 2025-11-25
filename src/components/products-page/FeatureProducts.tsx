'use client'

import { ArrowRight } from 'iconsax-react'
import { Button } from '../ui/button'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel'
// import { useEffect, useState } from 'react'
import { productList } from '@/server-actions/api.actions'
import { useQuery } from '@tanstack/react-query'
import { Skeleton } from '../ui/skeleton'
import { redirectToProductForm } from '@/utils/functions'
import { Product } from '@/types'
import Link from 'next/link'
import { CTAButton } from '../common/CTAButton'
import Image from 'next/image'
import PixelatedImage from '@/assets/svgs/VialPixalated.svg'


const FeatureProducts = () => {
	const {
		data: products,
		isLoading,
		error
	} = useQuery({
		queryKey: ['nav-featured-products'],
		queryFn: productList
	})

	if (error) {
		return <h2>An error occured</h2>
	}
	return (
		<section className='bg-White-100-100 space-y-16 py-12 md:py-16 lg:py-16 px-[5vw] sm:px-[3.5vw] lg:px-[3vw]'>
			<div className='xmd-container'>
				<Carousel
					opts={{
						align: 'start'
					}}
					className='w-full flex flex-col gap-10 md:gap-20'
				>
					<div className='flex justify-between items-end'>
						<p className='text-xl md:text-2xl max-w-[700px] font-medium'>
							Zenovate offers a range of personalized wellness shots designed to support specific health goals and
							address individual needs. Our precision-formulated injections are developed by licensed prescribers,
							ensuring safe and effective results.
						</p>
						<div className='lg:flex justify-end gap-10 items-center hidden'>
							<CarouselPrevious className='!relative !left-0 !top-0  border-0 shadow-none p-0 translate-y-0' />
							<CarouselNext className='!relative !left-0 !top-0  border-0 shadow-none p-0 translate-y-0' />
						</div>
					</div>

					{isLoading ? (
						<div className='grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 *:h-80 *:w-full *:rounded-md'>
							<Skeleton />
							<Skeleton className='hidden md:flex' />
							<Skeleton className='hidden lg:flex' />
							<Skeleton className='hidden xl:flex' />
						</div>
					) : (
						<CarouselContent>
							{(products.data ?? []).map((item: Product, i: number) => (
								<CarouselItem key={i} className='md:basis-1/2 lg:basis-1/3'>
									<div
										className='border gap-4 h-80 w-full p-8 flex flex-col justify-between flex-shrink-0'
										key={item.name}
									>
										<div className='space-y-10'>
											<h3 className='text-lg font-semibold text-foreground uppercase'>{item.name}</h3>
											<p className='text-sm text-muted-foreground text-pretty'>{item.subtitle}</p>
										</div>
										<div className='flex items-end justify-between gap-4'>
											<Link href={`/products/${item.slug}`}>
												<CTAButton
													size='sm'
												>
													Select
												</CTAButton>
											</Link>
											<div className="flex flex-row items-end justify-between space-x-4">
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
												<div className='w-[30px]'>
													<Image
														src={PixelatedImage}
														alt="pixelated image"
														className='object-contain h-full w-full'
													/>
												</div>
											</div>

										</div>

										{/* <div className='space-y-10'>
											<div>
												<h3 className='text-lg font-semibold text-Black-100 uppercase'>{item.name}</h3>
												<h4 className='text-base text-Gray-100 uppercase'>{item.subtitle}</h4>
											</div>
										</div> */}

									</div>
								</CarouselItem>
							))}
						</CarouselContent>
					)}

					<div className='flex justify-end gap-10 items-center lg:hidden'>
						<CarouselPrevious className='!relative !left-0 !top-0  border-0 shadow-none p-0 translate-y-0' />
						<CarouselNext className='!relative !left-0 !top-0  border-0 shadow-none p-0 translate-y-0' />
					</div>
				</Carousel>
			</div>

		</section>
	)
}

export default FeatureProducts
