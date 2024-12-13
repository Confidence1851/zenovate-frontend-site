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
										<div
											className={`
												w-6 h-6 rounded-full ${item.name === 'Nadiva' ? 'bg-[#90B9AC]' :
													item.name === 'Gloria' ? 'bg-[#AEA581]' :
														item.name === 'Immuna' ? 'bg-[#6E6D6B]' :
															item.name === 'Energia' ? 'bg-[#DBD7D6]' :
																item.name === 'Activa' ? 'bg-[#CEF3E9]' :
																	'bg-gray-500'
												}`}
										/>
										<div className='space-y-4'>
											<h3 className='text-lg font-semibold text-foreground uppercase'>{item.name}</h3>
											<p className='text-sm text-muted-foreground text-pretty'>{item.subtitle}</p>
										</div>
										<NavigationMenuLink asChild>
											<Link href={`/products/${item.id}`}>
												<Button
													type='button'
													variant='default'
													className='flex justify-between items-center uppercase  h-11 w-fit gap-4 shadow-none border'
												>
													<span>Select</span>
													<ArrowRight size={16} />
												</Button>
											</Link>
										</NavigationMenuLink>
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
