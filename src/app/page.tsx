import CustomersFeedback from '@/components/home-page/CustomersFeedback'
import UniqueQualities from '@/components/home-page/UniqueQualities'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'iconsax-react'
import styles from '@/styles/HomePage.module.css'
import HeroCarousel from '@/components/home-page/Hero'
import Image from 'next/image'
import nutritionImg from '@/assets/images/25fb59cf13000745b76aeef34030a78ac99dea2b6.png'
import { Overlay } from '@/components/common/Overlay';
import HowItWorks from '@/components/home-page/HowItWorks'
import { createMetadata } from '@/lib/metadata'
import Link from 'next/link';
import MainLayout from '@/app/layouts/MainLayout'

export const metadata = createMetadata({
	title: 'Zenovate Health - Personalized Wellness, Elevated',
	description: 'A world of aesthetics that believes in a client-centric approach that empowers people to shape their unique aesthetic and wellness journey.',
	openGraph: {
		title: 'Zenovate Health - Personalized Wellness, Elevated',
		description: 'A world of aesthetics that believes in a client-centric approach that empowers people to shape their unique aesthetic and wellness journey.',
		url: '/',
	},
})


const HomePage = () => {

	return (
		<MainLayout>
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

				{/* UNIQUENESS */}
				<UniqueQualities />

				{/* CUSTOMER FEEDBACK */}
				<CustomersFeedback />
				<HowItWorks />
				{/* ENDORSEMENT */}
				{/* <Endorsement /> */}

				<section className='relative h-[300px] md:h-[400px] xl:h-[600px] px-[5vw] sm:px-[3.5vw] lg:px-[3vw]'>
					<Overlay />
					<div className='flex flex-col gap-3 justify-center w-full max-w-[1100px] mx-auto h-full px-2'>
						<h1
							className={`text-4xl relative z-30 md:text-5xl lg:text-6xl lg:leading-[1.1] text-center tracking-normal text-background`}
						>
							Your Journey to Optimal Health
						</h1>
						<Image
							src={nutritionImg}
							alt='healthy food'
							className='w-full z-10 h-full object-cover absolute top-0 left-0'
						/>
						<h1 className='text-4xl relative z-30 md:text-5xl lg:text-6xl text-center tracking-normal lg:text-right lg:pr-20 text-background'>
							Starts Here
						</h1>
					</div>
				</section>

				<section className='bg-background border-t border-foreground py-12 md:py-16 xl:py-0 '>
					<div className='w-full max-w-7xl mx-auto grid  lg:grid-cols-2  md:items-center'>
						<div className={styles.GetStartedLeft}>
							<p className='text-lg md:text-xl leading-8'>
								Whether you&apos;re a busy professional, an athlete, a wellness enthusiast, or anyone seeking to optimize
								their health, Zenovate is here to support you. Our personalized wellness shots, delivered right to your
								doorstep, makes prioritizing your well-being simple and effective.
							</p>
							<p className='text-lg md:text-xl'>Take the First Step Towards Your Healthiest Self</p>
						</div>

						<div className={styles.GetStartedRight}>
							<Link href="https://application.zenovate.health">
								<Button size="lg" className={styles.GetStartedButton}>
									<span className='uppercase mx-auto text-wrap text-sm md:text-base xl:text-xl self-center font-semibold'>
										Get Started
									</span>
									<ArrowRight size='24' className='text-background mx-auto hidden md:inline-block font-bold' />
								</Button>
							</Link>

						</div>
					</div>
				</section>
			</main>
		</MainLayout>

	)
}

export default HomePage
