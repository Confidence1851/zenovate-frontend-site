
import PageHeroWrapper from '@/components/common/PageHeroWrapper'
import heroImage from "@/assets/images/8625c8212b0d703c9c47427018598d7fc12827.png";
import { createMetadata } from '@/lib/metadata'
import SubscriptionComponent from '@/components/common/SubscriptionComponent';
import MainLayout from '../layouts/MainLayout';
import FAQSection from '@/components/faq-page/FAQSection';

export const metadata = createMetadata({
	title: 'FAQ | Zenovate Health - Personalized Wellness, Elevated',
	description: 'A world of aesthetics that believes in a client-centric approach that empowers people to shape their unique aesthetic and wellness journey.',
	openGraph: {
		title: 'FAQ | Zenovate Health - Personalized Wellness, Elevated',
		description: 'A world of aesthetics that believes in a client-centric approach that empowers people to shape their unique aesthetic and wellness journey.',
		url: '/faq',
	},
})


const FAQPage = () => {

	return (
		<MainLayout>
			<main>
				<PageHeroWrapper
					description='Find answers to common questions about our products, services, and more.'
					heading='Frequently Asked Questions'
					variant='white'
					image={{
						src: heroImage,
						alt: "FAQ page hero image"
					}}
				/>

				<div className='py-10 md:py-20 lg:py-24 pb-0 space-y-20 md:space-y-24'>
					<FAQSection />
				</div>

				<section className='pt-12 md:py-16 lg:py-20 space-y-10 md:space-y-16 lg:space-y-20 '>
					<SubscriptionComponent />
				</section>
			</main>
		</MainLayout>

	)
}

export default FAQPage
