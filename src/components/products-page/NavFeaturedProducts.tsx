'use client'

import { ArrowRight } from 'iconsax-react'
import { Button } from '../ui/button'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel'
import { useEffect, useState } from 'react'
import { productList } from '@/server-actions/api.actions'
import BlogSectionWrapper from '../blogs/BlogSectionWrapper'
const productCache: Record<string, any> = {}
const NavFeatureProducts = () => {
	const [products, setProducts] = useState<Product[]>([])
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		async function fetchProducts() {
			if (productCache.featuredProducts) {
				// Use cached data
				setProducts(productCache.featuredProducts)
			} else {
				// Fetch new data and cache it
				setIsLoading(true)
				const result = await productList()
				productCache.featuredProducts = result.data
				setProducts(result.data)
				setIsLoading(false)
			}
		}
		fetchProducts()
	}, [])

	return (
		<BlogSectionWrapper heading='featured products'>
			<div className='max-w-[80rem] px-0'>
				<Carousel
					opts={{
						align: 'start'
					}}
					className='w-full'
				>
					<CarouselContent>
						{(products ?? []).map((item, i) => (
							<CarouselItem key={i} className='md:basis-1/2 lg:basis-1/3 xl:basis-1/4'>
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
			</div>
		</BlogSectionWrapper>
	)
}

export default NavFeatureProducts
