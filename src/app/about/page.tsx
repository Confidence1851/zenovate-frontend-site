import MissionAndValues from '@/components/about-page/MissionAndValues'
import OurPromise from '@/components/about-page/OurPromise'
import PageHeroWrapper from '@/components/common/PageHeroWrapper'
import MainLayout from '../layouts/MainLayout'
import HeroImage from '@/assets/images/5c23607bf90d411a649.png'
import SubscriptionComponent from '@/components/common/SubscriptionComponent'

const AboutPage = () => {
	return (
		<MainLayout>
			<main>
				{/* HERO */}
				<PageHeroWrapper
					heading="About Us"
					description="We're a team of healthcare pros and wellness experts on a mission to make precision nutrition simple. Through telehealth and home delivery, we're bringing personalized wellness shots right to your door."
					image={{
						src: HeroImage,
						alt: "About page hero image"
					}}
					size='short'
					variant='white'
				/>

				{/* Mission and values */}
				<MissionAndValues />

				{/* Our Mission */}
				<section className='bg-OffWhite-100 py-10 lg:py-16 px-[5vw] sm:px-[3.5vw] lg:px-[3vw]'>
					<div className='w-full max-w-[1550px] mx-auto gap-6 lg:gap-16 '>
						<div className=''>
							<h1 className='text-[28px] leading-9 md:text-[44px] md:leading-none xl:text-7xl uppercase  tracking-wider font-bold'>
								our mission
							</h1>
							<h2 className='text-lg mt-1 md:mt-2 xl:mt-3 md:text-[28px] md:leading-9 xl:text-4xl uppercase text-Green-300 font-semibold'>
								Empowering Optimal Health Through Personalized wellness shots
							</h2>
							<p className='mt-3 md:mt-5 xl:mt-9 text-foreground text-base md:text-lg xl:text-xl'>
								At Zenovate, we believe that everyone deserves access to cutting-edge wellness solutions that fit
								seamlessly into their unique lifestyle. Our mission is to revolutionize the way individuals approach their
								health by providing personalized, science-backed wellness plans that delivers transformative results.
							</p>
						</div>
					</div>
				</section>
				{/* Our promise */}
				<OurPromise />
				{/* THE team */}
				{/* <Team /> */}

				<section className='bg-White-100 pt-12 md:py-16 lg:py-20 space-y-10 md:space-y-16 lg:space-y-20 '>
					<SubscriptionComponent />
				</section>
			</main>
		</MainLayout>

	)
}

export default AboutPage
