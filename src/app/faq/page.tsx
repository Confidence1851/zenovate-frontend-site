import PageHeroWrapper from '@/components/common/PageHeroWrapper'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'iconsax-react'
import heroImage from "@/assets/images/8625c8212b0d703c9c47427018598d7fc12827.png";
import { createMetadata } from '@/lib/metadata'
import SubscriptionComponent from '@/components/common/SubscriptionComponent';

export const metadata = createMetadata({
	title: 'FAQ | Zenovate Health - Personalized Wellness, Elevated',
	description: 'A world of aesthetics that believes in a client-centric approach that empowers people to shape their unique aesthetic and wellness journey.',
	openGraph: {
		title: 'FAQ | Zenovate Health - Personalized Wellness, Elevated',
		description: 'A world of aesthetics that believes in a client-centric approach that empowers people to shape their unique aesthetic and wellness journey.',
		url: '/',
	},
})


const accordionData = [
	{
		heading: 'What is Zenovate?',
		description:
			'Zenovate is a revolutionary wellness platform that combines personalized, science-backed formulations with the convenience of telemedicine and at-home delivery. Our mission is to empower individuals to achieve optimal health and well-being through precision wellness shots and expert medical guidance.'
	},
	{
		heading: 'How does Zenovate work?',
		description: 'Zenovate works in three simple steps:',
		list: [
			' Complete a comprehensive online health assessment and consultation with a licensed physician.',
			'Receive your personalized wellness shots therapy, delivered right to your doorstep.',
			'Access ongoing support, progress tracking, and treatment plan adjustments through our telemedicine platform.'
		]
	},
	{
		heading: 'Is Zenovate right for me?',
		description:
			"Zenovate's personalized plan is designed to support a wide range of individuals, from busy professionals and athletes to wellness enthusiasts and those managing chronic health conditions. Our expert team will work with you to determine if Zenovate is the right fit for your unique health needs and goals."
	},
	{
		heading: "Are Zenovate's nutrient therapies safe?",
		description:
			"Yes, all of Zenovate's formulations are developed by licensed prescribers, using only the highest quality, scientifically-backed ingredients. Our team works closely with you to ensure that your personalized treatment plan is safe and effective."
	},
	{
		heading: 'How long does it take to see results with Zenovate?',
		description:
			"Individual results may vary, but many of our clients report experiencing the benefits of Zenovate's personalized plans within the first few weeks. Our team will monitor your progress and make any necessary adjustments to optimize your results."
	},
	{
		heading: 'Is Zenovate covered by insurance?',
		description:
			"At this time, Zenovate's services are not typically covered by insurance. However, we strive to make our products as accessible and affordable as possible. Please contact our team to discuss pricing and payment options."
	},
	{
		heading: 'How do I get started with Zenovate?',
		description:
			'Getting started with Zenovate is easy! Simply visit our website and click on the "Get Started" button to begin your comprehensive online health assessment and consultation with a licensed prescriber. From there, our team will work with you to develop your personalized plan and arrange for convenient at-home delivery.'
	}
]
const FAQPage = () => {
	return (
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

			<div className='bg-White-100 py-10 md:py-20 lg:py-24 pb-0 space-y-20 md:space-y-24'>
				{/* ACCORDDION */}
				<div className=' max-w-[900px] mx-auto  w-full px-[5vw] sm:px-[3.5vw] lg:px-[3vw]'>
					<Accordion type='multiple' className='gap-5 flex flex-col  w-full '>
						{accordionData.map((item, i) => (
							<AccordionItem value={item.heading} className='border-Gray-100 border ' key={i}>
								<AccordionTrigger className='uppercase hover:no-underline text-left  transition-colors duration-300 text-[14px] md:text-base px-4 font-semibold border-b-0 data-[state=open]:bg-Black-100 data-[state=open]:text-White-100 data-[state=open]:no-underline  '>
									{item.heading}
								</AccordionTrigger>
								<AccordionContent className='p-4 leading-4 md:leading-6 text-base md:text-lg'>
									<p>{item.description}</p>
									{item.list && (
										<ul className='flex flex-col gap-1.5 pl-0 ml-[1.0625rem] mt-2'>
											{item.list.map((item, i) => (
												<li className='list-decimal ' key={i}>
													{item}
												</li>
											))}
										</ul>
									)}
								</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				</div>
			</div>
			<section className='bg-White-100 pt-12 md:py-16 lg:py-20 space-y-10 md:space-y-16  lg:space-y-20 '>
				<SubscriptionComponent />
			</section>
		</main>
	)
}

export default FAQPage
