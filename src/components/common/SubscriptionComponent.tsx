import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import bgImage from "@/assets/images/8444c50c5bea09d5b957398fe37cc1e606c138.png";
import Image from 'next/image'

const SubscriptionComponent = () => {
    return (
        <div className='md:px-[3.5vw] lg:px-[3vw]'>
            <div className='bg-Green-200 w-full max-w-[1550px] mx-auto relative'>
                <Image
                    src={bgImage}
                    alt="Sign up Newsletter background image"
                    fill
                    className="object-cover opacity-80 mix-blend-darken"

                />
                <div className='relative flex flex-col gap-10 lg:py-20 py-10 px-[5vw] sm:px-[3.5vw] lg:px-4'>
                    <h2 className='text-2xl md:text-3xl lg:text-5xl uppercase font-bold text-center text-[#fafafa]'>
                        sign up for our newsletter
                    </h2>
                    <p className='text-center text-base md:text-xl max-w-[650px] mx-auto font-bold text-[#fafafa]'>
                        Stay up-to-date with the latest news, exclusive offers, and expert insights from Zenovate.
                    </p>
                    <div className='flex flex-col md:flex-row gap-4 w-full max-w-[550px] mx-auto'>
                        <Input
                            placeholder='email@domain.com'
                            className='h-11 border border-Green-100 placeholder:uppercase'
                        />
                        <Button className='w-full sm:w-fit bg-[#fafafa] text-Green-100 hover:text-Green-100 hover:bg-[#fafafa] h-11 uppercase'>
                            subscribe
                        </Button>
                    </div>
                </div>
                {/* success messge  */}
                {/* <div className='bg-Green-100 p-4'>
                    <h3 className='text-base text-White-100 text-center'>
                        We look forward to hearing from you and supporting you on your journey to optimal health and well-being!
                    </h3>
                </div> */}
            </div>
        </div>
    )
}

export default SubscriptionComponent