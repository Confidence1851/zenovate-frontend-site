'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import Autoplay from 'embla-carousel-autoplay'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'

export default function HeroCarousel() {
	const slides = [
		{
			title: 'Energize',
			description: 'Experience a better, healthier and longer life one shot at a time',
			buttonText: 'Get Started Today',
			videoSrc: '/videos/energy3.mp4'
		},
		{
			title: 'Revitalize',
			description: "Unlock your body's potential with our natural energy boosters",
			buttonText: 'Discover More',
			videoSrc: '/videos/energy3.mp4'
		},
		{
			title: 'Transform',
			description: 'Embrace a new you with our revolutionary wellness solutions',
			buttonText: 'Start Your Journey',
			videoSrc: '/videos/energy3.mp4'
		}
	]

	return (
		<Carousel
			className='w-full relative'
			opts={{
				align: 'start'
				// duration: 5000,
				// dragFree: true,
			}}
			plugins={[Autoplay({ delay: 8000 })]}
		>
			<CarouselContent className='gap-0 !ml-0'>
				{slides.map((slide, index) => (
					<CarouselItem key={index} className='!pl-0'>
						<section className='relative px-[5vw] sm:px-[3.5vw] lg:px-[3vw] h-[calc(100dvh-60px)]  sm:max-h-[600px] xl:max-h-fit bg-Gray-200'>
							<div className='absolute z-20 top-0 left-0 h-full w-full bg-Green-100 opacity-10'></div>

							<div className='w-full relative z-30 max-w-7xl mx-auto h-full flex justify-end flex-col pb-16 md:pb-[6rem] lg:pb-40 '>
								<div className='w-full max-w-[600px] flex flex-col gap-1 md:gap-2'>
									<h3 className='text-OffWhite-100 text-2xl md:text-4xl lg:text-5xl leading-[44px] uppercase font-bold'>
										{slide.title}
									</h3>
									<p className='text-OffWhite-100 text-lg md:text-xl'>{slide.description}</p>
								</div>
								<Button className='flex justify-between mt-5 sm:mt-6 py-3 items-center flex-wrap px-8 md:py-4 h-fit gap-x-6 gap-y-3 transition-colors duration-300 ease-in-out bg-Green-100 text-White-100 hover:bg-Green-300 w-fit'>
									<span className='uppercase mx-auto text-wrap text-sm md:text-base xl:text-xl self-center font-semibold'>
										{slide.buttonText}
									</span>
								</Button>
							</div>

							<video
								src={slide.videoSrc}
								autoPlay
								loop
								muted
								className='w-full z-10 h-full object-cover absolute top-0 left-0'
							/>
						</section>
					</CarouselItem>
				))}
			</CarouselContent>
			{/* <CarouselPrevious /> */}
			<div className='absolute top-1/2 hidden md:inline-block right-[7vw]'>
				<CarouselNext className='text-white hover:text-white size-11' />
			</div>
		</Carousel>
	)
}
