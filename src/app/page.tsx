import CustomersFeedback from '@/components/home-page/CustomersFeedback'
import UniqueQualities from '@/components/home-page/UniqueQualities'
import styles from '@/styles/HomePage.module.css'
import HeroCarousel from '@/components/home-page/Hero'
import { HowItWorks } from '@/components/home-page/HowItWorks'
import { createMetadata } from '@/lib/metadata'
import MainLayout from '@/app/layouts/MainLayout'
import FirstSteps from '@/components/home-page/FirstStep'

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
			<div className='pt-12 md:pt-20 lg:pt-24'>
				<CustomersFeedback />
			</div>


			{/* HOW IT WORKS */}
			<div className='mt-[-12rem] lg:mt-[-20rem] mb-[-12rem] lg:mb-[-20rem]'>
				<HowItWorks />
			</div>

			<FirstSteps />
		</MainLayout>

	)
}

export default HomePage
