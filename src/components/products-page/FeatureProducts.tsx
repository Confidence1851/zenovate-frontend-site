'use client';

import { ArrowRight } from 'iconsax-react'
import { Button } from '../ui/button'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel'
import { useEffect, useState } from 'react';
import { productList } from '@/server-actions/api.actions';


const FeatureProducts = () => {

	const [products, setProducts] = useState<Product[]>([]);
	useEffect(() => {
		function list() {
			productList().then((v) => {
				setProducts(v.data);
			});
		}
		list();
	}, []);


	return (
		<section className='bg-White-100-100 space-y-16 py-12 md:py-16 lg:py-16 px-[5vw] sm:px-[3.5vw] lg:px-[3vw]'>
			<div className='w-full max-w-[1550px] mx-auto  space-y-20'>
				<div className='max-w-[1550px] mx-auto'>
					<Carousel
						opts={{
							align: 'start'
						}}
						className='w-full flex flex-col gap-10 md:gap-20'
					>
						<div className='flex  justify-between items-end'>
							<p className='text-xl md:text-2xl max-w-[700px] font-semibold'>
								Zenovate offers a range of personalized wellness shots designed to support specific health goals and
								address individual needs. Our precision-formulated injections are developed by licensed prescribers,
								ensuring safe and effective results.
							</p>
							<div className='lg:flex justify-end gap-10 items-center hidden'>
								<CarouselPrevious className='!relative !left-0 !top-0  border-0 shadow-none p-0 translate-y-0' />
								<CarouselNext className='!relative !left-0 !top-0  border-0 shadow-none p-0 translate-y-0' />
							</div>
						</div>

						<CarouselContent>
							{products.map((item, i) => (
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

						<div className='flex justify-end gap-10 items-center lg:hidden'>
							<CarouselPrevious className='!relative !left-0 !top-0  border-0 shadow-none p-0 translate-y-0' />
							<CarouselNext className='!relative !left-0 !top-0  border-0 shadow-none p-0 translate-y-0' />
						</div>
					</Carousel>
				</div>
			</div>
		</section>
	)
}

export default FeatureProducts
