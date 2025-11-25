'use client'

import { CTAButton } from '@/components/common/CTAButton'
import styles from '@/styles/HomePage.module.css'
import Link from 'next/link'
import Image from 'next/image'
import nutritionImg from '@/assets/images/25fb59cf13000745b76aeef34030a78ac99dea2b6.png'
import { Overlay } from '@/components/common/Overlay';

const FirstSteps = () => {

    return (
        <>
            <section className={styles.journeySection}>
                <Overlay />
                <div className="flex flex-col items-center justify-center w-full h-full relative">
                    <Image
                        src={nutritionImg}
                        alt="healthy food"
                        className="w-full h-full object-cover absolute top-0 left-0 z-10"
                    />
                    <div className="relative z-30 md-container flex justify-between items-center">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl lg:leading-[1.1] tracking-normal text-background lg:text-left">
                            Optimal Health
                        </h1>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl tracking-normal text-background lg:text-right lg:pr-20">
                            Starts Here
                        </h1>
                    </div>
                </div>
            </section>

            <section className='xmd-container py-12 md:py-16'>
                <div className='grid lg:grid-cols-2 md:items-center'>
                    <div className={styles.GetStartedLeft}>
                        <p className='text-lg md:text-xl leading-8'>
                            Whether you&apos;re a busy professional, an athlete, a wellness enthusiast our personalized wellness shots, delivered right to your
                            doorstep, makes prioritizing your well-being simple and effective.
                        </p>
                        <p className='text-lg md:text-xl'>Take the First Step Towards Your Healthiest Self</p>
                    </div>

                    <div className={styles.GetStartedRight}>
                        <Link href="/category/peptides">
                            <CTAButton size="lg" className={styles.GetStartedButton}>
                                Get Started
                            </CTAButton>
                        </Link>
                    </div>
                </div>
            </section>
        </>

    )
}

export default FirstSteps