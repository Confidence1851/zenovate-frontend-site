'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import Autoplay from 'embla-carousel-autoplay'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { Overlay } from '@/components/common/Overlay';
import styles from '@/styles/HeroCarousel.module.css'
import Link from 'next/link'
import { siteConfig } from '@/utils/siteConfig';

export default function HeroCarousel() {
    const { heroSlides } = siteConfig;

    return (
        <Carousel
            className='w-full relative'
            opts={{
                align: 'start'
                // duration: 5000,
                // dragFree: true,
            }}
            plugins={[Autoplay({ delay: 16000 })]}
        >
            <CarouselContent className='gap-0 !ml-0'>
                {heroSlides.map((slide, index) => (
                    <CarouselItem key={index} className='!pl-0'>
                        <section className='relative px-[5vw] sm:px-[3.5vw] lg:px-[3vw] h-[calc(92dvh-60px)]  sm:max-h-[600px] xl:max-h-fit bg-Gray-200'>
                            <Overlay />
                            <div className={styles['hero-content']}>
                                {/* content of hero  */}
                                <div className='w-full max-w-[600px] flex flex-col gap-1 md:gap-2'>
                                    <h3 className='text-OffWhite-100 text-2xl md:text-4xl lg:text-5xl leading-[44px] uppercase font-bold'>
                                        {slide.title}
                                    </h3>
                                    <p className='text-OffWhite-100 text-lg md:text-xl'>{slide.description}</p>
                                </div>
                                <Link href={slide.link}>
                                    <Button className='flex justify-between mt-5 sm:mt-6 py-3 items-center flex-wrap px-8 md:py-4 h-fit gap-x-6 gap-y-3 transition-colors duration-300 ease-in-out text-White-100 w-fit'>
                                        <span className='uppercase mx-auto text-wrap text-sm md:text-base xl:text-xl self-center font-semibold'>
                                            {slide.buttonText}
                                        </span>
                                    </Button>
                                </Link>
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
            <div className='absolute top-1/2 hidden md:inline-block left-[7vw]'>
                <CarouselPrevious variant='carousel-nav' className='text-white hover:text-white size-11' />
            </div>
            <div className='absolute top-1/2 hidden md:inline-block right-[7vw]'>
                <CarouselNext variant='carousel-nav' className='text-white hover:text-white size-11' />
            </div>
        </Carousel>
    )
}
