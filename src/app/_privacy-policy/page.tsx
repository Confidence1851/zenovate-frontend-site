import { Button } from '@/components/ui/button'
import { ArrowRight } from 'iconsax-react'

const policies = [
	{
		heading: 'Information We Collect',
		list: [
			'Personal information you provide during the health assessment and consultation process',
			'Demographic information such as age, gender, and location',
			'Health information, including medical history and lifestyle factors',
			'Website usage data collected through cookies and analytics tools'
		]
	},
	{
		heading: 'How We Use Your Information',
		list: [
			'To provide you with personalized wellness plan recommendations and services',
			'To communicate with you about your treatment plan and progress',
			'To improve our products, services, and website experience  ',
			'To send you relevant information, updates, and promotional offers (with your consent)',
			'To comply with legal obligations and protect our rights'
		]
	},
	{
		heading: 'How We Protect Your Information',
		list: [
			'We implement strict security measures to safeguard your personal and health data ',
			'We limit access to your information to authorized personnel only',
			'We use encryption and secure storage technologies to protect your data',
			'We do not sell, rent, or lease your personal information to third parties'
		]
	},
	{
		heading: 'Your Rights and Choices  ',
		list: [
			'You have the right to access, update, and correct your personal information',
			'You can opt-out of promotional communications at any time',
			'You can request the deletion of your personal data, subject to legal requirements',
			'You can contact us with any questions or concerns regarding your privacy'
		]
	}
]
const PrivacyPolicyPage = () => {
	return (
		<main>
			<section className='pt-9 pb-10 md:py-16 lg:py-20 px-[5vw] sm:px-[3.5vw] lg:px-[3vw]'>
				<div className='w-full max-w-[1550px] mx-auto '>
					<div className='w-full max-w-[1000px] space-y-5 md:space-y-6 lg:space-y-8'>
						<h1 className='text-lg md:text-2xl uppercase font-bold'>Privacy policy</h1>
						<h3 className='text-lg md:text-2xl lg:text-3xl uppercase'>
							At Zenovate, we are committed to protecting your privacy and ensuring the security of your personal
							information. This Privacy Policy outlines how we collect, use, disclose, and safeguard your data when you
							visit our website or use our services.
						</h3>
						<div className='w-full pt-2 md:pt-3 lg:pt-3.5'>
							<div className='border w-full bg-Green-100' />
						</div>
					</div>
				</div>
			</section>

			<section className='lg:pb-20'>
				<div className='w-full  max-w-[1550px] mx-auto'>
					<div className='flex flex-col gap-10 lg:gap-16 lg:flex-row lg:px-[3vw] max-w-[1400px] mx-auto'>
						<div className=' space-y-10 md:space-y-14 px-[5vw] sm:px-[3.5vw] lg:px-0'>
							{policies.map((item, i) => (
								<div className=' space-y-5 md:space-y-8' key={i}>
									<h2 className='text-lg md:text-xl uppercase font-semibold'>{item.heading}</h2>
									<div>
										<ul className='flex flex-col gap-2.5 md:gap-3 pl-0 ml-[1.0625rem]'>
											{item.list.map((list, i) => (
												<li className=' list-disc text-base md:text-lg' key={i}>
													{list}
												</li>
											))}
										</ul>
									</div>
								</div>
							))}
						</div>

						<div className='bg-Green-200 mt-5 md:mt-8 lg:mt-0 h-fit w-full lg:max-w-[400px] mx-auto py-12 md:py-16 lg:py-20 px-5 flex items-center flex-col gap-8 md:gap-10'>
							<h3 className='text-lg uppercase font-semibold text-center max-w-[600px]'>
								For more detailed information about our data practices and your rights under applicable laws, please
								review our full Privacy Policy.
							</h3>

							<Button
								variant='lemon'
								className='flex justify-between items-center p-4 md:gap-20 gap-3 w-fit border border-Green-100 h-11'
							>
								<span className='uppercase text-sm font-semibold'>read full privacy policy</span>
								<ArrowRight size='24' className=' font-bold hidden md:inline-block' />
							</Button>
						</div>
					</div>
				</div>
			</section>
		</main>
	)
}

export default PrivacyPolicyPage
