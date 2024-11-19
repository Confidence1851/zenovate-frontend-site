import PageHeroWrapper from '@/components/common/PageHeroWrapper'
import ContactForm from '@/components/forms/ContactForm'
import linkedin from '@/assets/images/linkedin-dark.png'
import facebook from '@/assets/images/facebook-dark.png'
import insta from '@/assets/images/insta-dark.png'
import x from '@/assets/images/x-dark.png'
import Image from 'next/image'
import heroImage from "@/assets/images/ad6e850434c58cfdca5ed066a828ed0c9771e9faf8e15c.png";
import SubscriptionComponent from '@/components/common/SubscriptionComponent'

import { createMetadata } from '@/lib/metadata'

export const metadata = createMetadata({
	title: 'Contact | Zenovate Health - Personalized Wellness, Elevated',
	description: 'A world of aesthetics that believes in a client-centric approach that empowers people to shape their unique aesthetic and wellness journey.',
	openGraph: {
		title: 'Contact | Zenovate Health - Personalized Wellness, Elevated',
		description: 'A world of aesthetics that believes in a client-centric approach that empowers people to shape their unique aesthetic and wellness journey.',
		url: '/',
	},
})

const socialMedia = [
	{
		name: 'X',
		handle: '@zenovateHealth',
		icon: x,
		url: 'https://twitter.com/zenovateHealth'
	},
	{
		name: 'instagram',
		handle: '@zenovate',
		icon: insta,
		url: 'https://instagram.com/zenovate'
	},
	{
		name: 'facebook',
		handle: '@zenovatewellness',
		icon: facebook,
		url: 'https://facebook.com/zenovatewellness'
	},
	{
		name: 'linkedin',
		handle: '@zenovate',
		icon: linkedin,
		url: 'https://linkedin.com/company/zenovate'
	}
]

const ContactPage = () => {
	return (
		<main className='bg-White-100'>
			<PageHeroWrapper
				heading='get in touch with zenovate'
				description="Have a question, comment, or concern? We're here to help! Our friendly and knowledgeable team is dedicated to providing you with the support you need on your personalized wellness journey"
				image={{
					src: heroImage,
					alt: "Contact page hero image"
				}}
			/>

			<section className='bg-White-100 py-10 md:py-16 lg:py-20 px-[5vw] sm:px-[3.5vw] lg:px-[3vw]'>
				<div className='w-full max-w-[1550px] mx-auto  space-y-4 md:space-y-8 lg:space-y-14'>
					<h2 className='text-2xl  md:text-3xl lg:text-5xl font-bold uppercase'>contact information</h2>

					<div className='flex flex-col md:flex-row md:justify-between w-full max-w-[1000px] gap-6'>
						<div className=' space-y-3 md:space-y-5'>
							<h3 className='uppercase text-lg md:text-xl font-bold'>customer support</h3>

							<ul className='space-y-2 md:space-y-3 *:text-sm *:md:text-base'>
								<li className='uppercase'>
									phone: <span>+234 4449 990</span>
								</li>
								<li className='uppercase'>
									email: <span>+support@zenovate.com</span>
								</li>
								<li className='uppercase'>
									address: <span>+support@zenovate.com</span>
								</li>
							</ul>
						</div>

						<div className='space-y-3 md:space-y-5'>
							<h3 className='uppercase text-lg md:text-xl font-bold'>hours of operation</h3>
							<p className='uppercase text-sm md:text-base'>Monday - Friday: 9:00 AM - 5:00 PM EST </p>
						</div>
					</div>
				</div>
			</section>

			<section className=' bg-OffWhite-100 py-10 md:py-16 lg:py-20 space-y-3 md:space-y-5 lg:space-y-14 px-[5vw] sm:px-[3.5vw] lg:px-[3vw]'>
				<h3 className='text-Black-100 text-2xl lg:text-5xl lg:leading-tight uppercase font-bold  w-full max-w-[1550px] mx-auto '>
					send a message
				</h3>
				<div className='w-full max-w-[1550px] mx-auto'>
					<ContactForm />
				</div>
			</section>

			<section className='bg-White-100 pt-12 md:py-16 lg:py-20 space-y-10 md:space-y-16  lg:space-y-20 '>
				<div className='w-full max-w-[1550px] mx-auto '>
					<div className='space-y-6 md:space-y-10 px-[5vw] sm:px-[3.5vw] lg:px-[3vw]'>
						<h1 className='text-2xl md:text-3xl xl:text-5xl uppercase font-bold'>connect with us on social media </h1>
						<div className=' grid grid-cols-2 gap-y-6 gap-x-10 md:flex md:gap-10 md:flex-wrap'>
							{socialMedia.map((item) => (
								<a
									key={item.name}
									href={item.url}
									target="_blank"
									rel="noopener noreferrer"
									className="hover:opacity-80 transition-opacity"
								>
									<div className='flex gap-3 items-center'>
										<Image src={item.icon} alt={item.name} className='size-7' />
										<p className='font-semibold'>{item.handle}</p>
									</div>
								</a>
							))}
						</div>
					</div>
				</div>

				<SubscriptionComponent />
			</section>
		</main>
	)
}

export default ContactPage
