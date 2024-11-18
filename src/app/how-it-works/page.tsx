import PageHeroWrapper from '@/components/common/PageHeroWrapper'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import SubscriptionComponent from '@/components/common/SubscriptionComponent'
import heroImage from "@/assets/images/8625c8212b0d703c9c47427018598d7fc12827.png";

const data = [
	{
		heading: 'Sign Up',
		description: ''
	},
	{
		heading: 'Personalized Consultation',
		description:
			"Begin your Zenovate journey with a comprehensive online health assessment and consultation with one of our licensed physicians. We'll take the time to understand your unique health history, lifestyle, and wellness goals to create a personalized treatment plan tailored to your needs."
	},
	{
		heading: 'Convenient At-Home Delivery',
		description:
			"Once your personalized plan is developed, we'll deliver your precision-formulated injections right to your doorstep. Our easy-to-use subcutaneous injections come with clear instructions and all the necessary supplies for safe and effective administration in the comfort of your own home."
	},
	{
		heading: 'Ongoing Support and Optimization',
		description:
			"Your Zenovate journey doesn't end with delivery. Our team of licensed physicians and nutrition experts is here to support you every step of the way. Access expert guidance, track your progress, and adjust your treatment plan as needed through our user-friendly telemedicine platform."
	}
]

const faq = [
	{
		heading: 'How do I know if Zenovate is right for me?',
		description:
			" Zenovate's personalized plans is designed to support individuals from all walks of life in achieving optimal health and well-being. Whether you're a busy professional, an athlete, a wellness enthusiast, or anyone seeking to elevate their health, Zenovate can help you reach your goals."
	},
	{
		heading: ' Is Zenovate safe?',
		description:
			'Absolutely. All of our formulations are developed by licensed prescribers, using only the highest quality, scientifically-backed ingredients. Our team works closely with you to ensure that your wellness plan is safe and effective for your unique needs.'
	},
	{
		heading: 'How long does it take to see results?',
		description:
			'While individual results may vary, many of our clients report feeling the benefits within the first few weeks of starting their wellness plan. Our team will work with you to monitor your progress and make any necessary adjustments to optimize your results.'
	}
]

const HowItWorksPage = () => {
	return (
		<main>
			<PageHeroWrapper
				description="At Zenovate, we've made personalized wellness easy and accessible. Here's how it works:"
				heading='ACHIEVE OPTIMAL HEALTH IN 4 Simple Steps'
				image={{
					src: heroImage,
					alt: "How it works page hero image"
				}}
			/>
			<section className='bg-White-100 py-10 lg:py-20'>
				<div className='w-full max-w-[1550px] mx-auto px-[5vw] sm:px-[3.5vw]'>
					<div className='grid xl:grid-cols-2 gap-y-6 md:gap-y-8 xl:gap-y-10 gap-x-20 w-full max-w-[800px] lg:max-w-[1100px] mx-auto'>
						{data.map((Item, i) => (
							<div
								className={`flex gap-4 md:gap-8 lg:even:pt-16 ${i === 0 ? 'min-h-[100px] xl:min-h-[250px]' : ' min-h-[100px] xl:min-h-[250px]'
									}`}
								key={i}
							>
								<h1 className={`text-Gray-100 text-7xl md:text-7xl xl:text-8xl font-bold`}>{i + 1}</h1>
								<div className='pt-6'>
									<h2 className='font-bold uppercase text-[28px] leading-9 md:text-3xl xl:text-[44px] xl:leading-tight '>
										{Item.heading}
									</h2>
									<p className='text-base mt-2'>{Item.description}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			<section className='bg-OffWhite-100 space-y-10 md:space-y-16 pb-12 lg:pb-16'>
				<div className='w-full max-w-[1550px] mx-auto h-full flex justify-end flex-col  px-[5vw] sm:px-[3.5vw] lg:px-[3vw]'>
					<div className='flex flex-col gap-3 pt-12 md:pt-16 w-full max-w-[1020px] mx-auto'>
						<h1 className='text-4xl md:text-5xl lg:text-7xl uppercase  tracking-wider font-bold text-Black-100'>
							frequently
						</h1>
						<h1 className='text-4xl md:text-5xl lg:text-7xl uppercase lg:text-right tracking-wider lg:pr-20 font-bold text-Black-100'>
							asked questions
						</h1>
					</div>
				</div>
				{/* DIVIDER */}
				<div className='border w-full bg-Green-100' />
				<div className=' max-w-[900px] mx-auto  w-full px-[5vw] sm:px-[3.5vw] lg:px-[3vw]'>
					<Accordion type='multiple' className='gap-5 flex flex-col  w-full '>
						{faq.map((item, i) => (
							<AccordionItem value={item.heading} className='border-Gray-100 border' key={i}>
								<AccordionTrigger className='uppercase hover:no-underline text-left  transition-colors duration-300 text-[14px] md:text-base px-4 font-semibold border-b-0 data-[state=open]:bg-Black-100 data-[state=open]:text-White-100 data-[state=open]:no-underline  '>
									{item.heading}
								</AccordionTrigger>
								<AccordionContent className='p-4 leading-4 md:leading-6 text-base md:text-lg bg-White-100'>
									{item.description}
								</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				</div>
			</section>

			<section className='w-full bg-White-100 lg:py-20'>
				<SubscriptionComponent />
			</section>

		</main >
	)
}

export default HowItWorksPage
