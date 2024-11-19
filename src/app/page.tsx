import CustomersFeedback from '@/components/home-page/CustomersFeedback'
import UniqueQualities from '@/components/home-page/UniqueQualities'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'iconsax-react'
import styles from '@/styles/HomePage.module.css'
import HeroCarousel from '@/components/home-page/Hero'
import Image from 'next/image'
import nutritionImg from '@/assets/images/25fb59cf13000745b76aeef34030a78ac99dea2b6.png'
import { Overlay } from '@/components/common/Overlay';


const HomePage = () => {
	return (
		<main className='mb-6 lg:mb-0'>
			{/* HERO */}
			<HeroCarousel />

			<section className={styles.section}>
				<div className='w-full max-w-7xl mx-auto flex flex-col gap-5 lg:gap-12'>
					<p className={styles.paragraph}>
						Welcome to Zenovate, your partner in precision nutrition and wellness. We understand that
						achieving optimal health can be challenging amidst the demands of modern life. That's why
						we've revolutionized wellness shots, combining cutting-edge science with the convenience of
						at-home delivery to support your unique health journey.
					</p>
				</div>
			</section>

			{/* CUSTOMER FEEDBACK */}
			<CustomersFeedback />

			{/* ENDORSEMENT */}
			{/* <Endorsement /> */}

			{/* UNIQUENESS */}
			<UniqueQualities />

			<section className='relative h-[300px] md:h-[400px] xl:h-[600px] px-[5vw] sm:px-[3.5vw] lg:px-[3vw]'>
				<Overlay />
				<div className='flex flex-col gap-3 justify-center w-full max-w-[1100px] mx-auto h-full px-2'>
					<h1
						className={`text-4xl relative z-30 md:text-5xl lg:text-6xl lg:leading-[1.1] text-center tracking-wider text-white`}
					>
						Your Journey to Optimal Health
					</h1>
					<Image
						src={nutritionImg}
						alt='healthy food'
						className='w-full z-10 h-full object-cover absolute top-0 left-0'
					/>
					<h1 className='text-4xl relative z-30 md:text-5xl lg:text-6xl text-center lg:text-right tracking-wider lg:pr-20 text-white italic'>
						Starts Here
					</h1>
				</div>
			</section>

			<section className='bg-White-100 border-t border-Black-100 py-12 md:py-16 xl:py-0 '>
				<div className='w-full max-w-7xl mx-auto grid  xl:grid-cols-2  md:items-center'>
					<div className=' xl:border-r xl:py-16  space-y-6 px-[5vw] sm:px-[3.5vw] xl:pr-16 xl:pl-[3vw]'>
						<p className='text-lg md:text-xl leading-8'>
							Whether you&apos;re a busy professional, an athlete, a wellness enthusiast, or anyone seeking to optimize
							their health, Zenovate is here to support you. Our personalized wellness shots, delivered right to your
							doorstep, makes prioritizing your well-being simple and effective.
						</p>
						<p className='text-lg md:text-xl'>Take the First Step Towards Your Healthiest Self</p>
					</div>

					<div className='px-[5vw] sm:px-[3.5vw] xl:pl-16 xl:pr-[3vw] border-t mt-10 pt-10 md:mt-16 md:pt-16 xl:mt-0 xl:pt-0 xl:border-none'>
						<Button className='flex justify-between items-center flex-wrap p-4 gap-x-6 gap-y-3 w-full sm:w-fit xl:w-full md:gap-x-16  min-h-12 h-fit bg-Green-100 transition-colors duration-300 ease-in-out text-White-100 hover:bg-Green-300 sm:mx-auto'>
							<span className='uppercase mx-auto text-wrap text-sm md:text-base xl:text-xl self-center font-semibold'>
								Start Your Zenovate Journey Today
							</span>
							<ArrowRight size='24' className='text-secondary-foreground mx-auto hidden md:inline-block font-bold' />
						</Button>
					</div>
				</div>
			</section>
		</main>
	)
}

export default HomePage
