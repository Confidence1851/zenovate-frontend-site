'use client'

import { ArrowRight } from 'iconsax-react'
import { Button } from '../ui/button'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel'
// import { useEffect, useState } from 'react'
import { productList } from '@/server-actions/api.actions'
import BlogSectionWrapper from '../blogs/BlogSectionWrapper'
import { useQuery } from '@tanstack/react-query'
import { Skeleton } from '../ui/skeleton'

const NavFeatureProducts = () => {
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
		<BlogSectionWrapper heading='featured products'>
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
						className='w-full '
					>
						<CarouselContent>
							{(products.data ?? []).map((item, i) => (
								<CarouselItem key={i} className='md:basis-1/2 lg:basis-1/3 xl:basis-1/4  '>
									<div
										className='border gap-4 h-80 w-full p-8 flex flex-col justify-between flex-shrink-0'
										key={item.name}
									>
										<div className='space-y-10'>
											<div>
												<h3 className='text-lg font-semibold text-Black-100 uppercase'>{item.name}</h3>
												<h4 className='text-base text-Gray-100 uppercase'>{item.description}</h4>
											</div>
											<p className='text-base text-Gray-100'>{item.description}</p>
										</div>

										<Button
											type='button'
											className='flex justify-between items-center uppercase  h-11 w-fit gap-4 shadow-none border'
										>
											<span>Select</span>
											<ArrowRight size={16} />
										</Button>
									</div>
								</CarouselItem>
							))}
						</CarouselContent>

						<div className='flex justify-end gap-10 items-center mt-4'>
							<CarouselPrevious className='!relative !left-0 !top-0  border-0 shadow-none p-0 translate-y-0' />
							<CarouselNext className='!relative !left-0 !top-0  border-0 shadow-none p-0 translate-y-0' />
						</div>
					</Carousel>
				)}
			</div>
		</BlogSectionWrapper>
	)
}

export default NavFeatureProducts
