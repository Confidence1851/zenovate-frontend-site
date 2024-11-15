import PageHeroWrapper from '@/components/common/PageHeroWrapper'
import ContactForm from '@/components/forms/ContactForm'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { Facebook, Instagram } from 'iconsax-react'
import { Linkedin, Twitter } from 'lucide-react'
import linkedin from '@/assets/images/linkedin-dark.png'
import facebook from '@/assets/images/facebook-dark.png'
import insta from '@/assets/images/insta-dark.png'
import x from '@/assets/images/x-dark.png'
import Image from 'next/image'

const socialMedia = [
	{
		name: 'X',
		handle: '@ZenovateHealth',
		icon: x
	},
	{
		name: 'instagram',
		handle: '@Zenovate',
		icon: insta
	},
	{
		name: 'facebook',
		handle: '@ZenovateWellness',
		icon: facebook
	},
	{
		name: 'linkedin',
		handle: '@Zenovate',
		icon: linkedin
	}
]

const ContactPage = () => {
	return (
		<main className='bg-White-100'>
			<PageHeroWrapper
				heading='get in touch with zenovate'
				description="Have a question, comment, or concern? We're here to help! Our friendly and knowledgeable team is dedicated to providing you with the support you need on your personalized wellness journey"
			/>

			<section className='bg-White-100   py-10 md:py-16 lg:py-20 px-[5vw] sm:px-[3.5vw] lg:px-[3vw]'>
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
								<div key={item.name} className='flex gap-3 items-center'>
									<Image src={item.icon} alt={item.name} className='size-7' />
									<p className='font-semibold'>{item.handle}</p>
								</div>
							))}
						</div>
					</div>
				</div>

				<div className='md:px-[3.5vw] lg:px-[3vw]'>
					<div className='bg-Green-200 w-full max-w-[1550px] mx-auto '>
						<div className='flex flex-col gap-10 lg:py-20 py-10 px-[5vw] sm:px-[3.5vw] lg:px-4'>
							<h2 className='text-2xl md:text-3xl lg:text-5xl uppercase font-bold text-center'>
								sign up for our newsletter
							</h2>
							<p className='text-center text-base md:text-xl max-w-[650px] mx-auto text-Green-300'>
								Stay up-to-date with the latest news, exclusive offers, and expert insights from Zenovate. 
							</p>
							<div className='flex flex-col md:flex-row  gap-4 w-full  max-w-[550px] mx-auto'>
								<Input placeholder='email@domain.com' className='h-11 border border-Green-100 placeholder:uppercase' />
								<Button className=' w-full sm:w-fit bg-Green-100 text-White-100 h-11 uppercase hover:bg-Green-300'>
									subscribe{' '}
								</Button>
							</div>
						</div>
						<div className='bg-Green-100 p-4'>
							<h3 className='text-base text-White-100 text-center'>
								We look forward to hearing from you and supporting you on your journey to optimal health and well-being!
							</h3>
						</div>
					</div>
				</div>
			</section>
		</main>
	)
}

export default ContactPage
