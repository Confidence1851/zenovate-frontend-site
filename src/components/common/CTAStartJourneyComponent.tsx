import React from 'react'
import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import bgImage from "@/assets/images/8444c50c5bea09d5b957398fe37cc1e606c138.png";
// import Image from 'next/image'
import { ArrowRight } from 'iconsax-react'

const CTAStartJourneyComponent = () => {
    return (
        <section className='w-full bg-White-100 lg:py-20'>
            <div className='w-full max-w-[1400px] mx-auto h-full  bg-Green-200 p-10 md:p-20'>
                <div className='flex justify-center items-center gap-10 flex-col w-full max-w-[650px] mx-auto'>
                    <h1 className='text-3xl md:text-4xl lg:text-5xl md:leading-tight uppercase  tracking-wider font-bold text-center'>
                        Ready to Start Your Zenovate Journey?
                    </h1>

                    <Button
                        variant='lemon'
                        className='flex justify-between items-center flex-wrap p-4 gap-x-6 gap-y-3 w-full sm:w-fit  md:gap-x-16 md:gap-20 gap-3  border border-Green-100 min-h-11 h-fit '
                    >
                        <span className='uppercase mx-auto text-wrap text-sm md:text-xl font-semibold'>
                            Book Your Personalized Consultation Now
                        </span>
                        <ArrowRight size='24' className=' mx-auto font-bold hidden md:inline-block' />
                    </Button>
                </div>
            </div>
        </section>
    )
}

export default CTAStartJourneyComponent