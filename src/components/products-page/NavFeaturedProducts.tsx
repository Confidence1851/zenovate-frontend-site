'use client'

import { ArrowRight } from 'iconsax-react'
import { Button } from '../ui/button'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel'
// import { useEffect, useState } from 'react'
import { productList } from '@/server-actions/api.actions'
import BlogSectionWrapper from '../blogs/BlogSectionWrapper'
import { useQuery } from '@tanstack/react-query'
import { Skeleton } from '../ui/skeleton'
import Autoplay from 'embla-carousel-autoplay'
import Link from 'next/link'
import { Product } from '@/types'
import { NavigationMenuLink } from '../ui/navigation-menu'
import PixelatedImage from '@/assets/svgs/VialPixalated.svg'
import Image from 'next/image'
import { CTAButton } from '../common/CTAButton'


const NavFeatureProducts = (zz: any) => {
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
		<BlogSectionWrapper heading=''>
			<div className='max-w-[80rem] px-0'>
				{isLoading ? (
					<div className='grid w-[90vw] pb-12 max-w-[80rem] grid-cols-3 xl:grid-cols-4 gap-4 *:h-80 *:w-full *:rounded-md'>
						<Skeleton />
						<Skeleton />
						<Skeleton />
						<Skeleton className='hidden xl:flex' />
					</div>
				) : (
					<Carousel
						opts={{
							align: 'start'
						}}
						plugins={[Autoplay({ delay: 5000, stopOnMouseEnter: true })]}
						className='w-full '
					>
						<CarouselContent>
							{(products.data ?? []).map((item: Product, i: number) => (
								<CarouselItem key={i} className='md:basis-1/2 lg:basis-1/3 xl:basis-1/4  '>
									<div
										className='border gap-4 h-80 w-full p-8 flex flex-col justify-between flex-shrink-0'
										key={item.name}
									>
										<div className='space-y-4'>
											<h3 className='text-lg font-semibold text-foreground uppercase'>{item.name}</h3>
											<p className='text-sm text-muted-foreground text-pretty'>{item.subtitle}</p>
										</div>
										<div className='flex items-end justify-between gap-4'>
											<NavigationMenuLink asChild>
												<Link href={`/products/${item.slug}`}>
													<CTAButton
														type='submit'
														aria-label="Select"
														size='sm'
													>
														Select
													</CTAButton>
												</Link>
											</NavigationMenuLink>
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

												{/* <div className='w-[30px]'>
													<Image
														src={PixelatedImage}
														alt="pixelated image"
														className='object-contain h-full w-full'
													/>
												</div> */}
											</div>
										</div>
									</div>
								</CarouselItem>
							))}
						</CarouselContent>

						<div className='flex justify-end gap-10 items-center mt-4'>
							<CarouselPrevious
								variant='outline'
								className='text-primary !relative !left-0 !top-0  border-0 shadow-none p-0 translate-y-0 '
							/>
							<CarouselNext
								variant='outline'
								className='text-primary !relative !left-0 !top-0  border-0 shadow-none p-0 translate-y-0 '
							/>
						</div>
					</Carousel>
				)}
			</div>
		</BlogSectionWrapper>
	)
}

export default NavFeatureProducts
