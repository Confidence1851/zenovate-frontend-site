import PageHeroWrapper from '@/components/common/PageHeroWrapper'
import ContactForm from '@/components/forms/ContactForm'
import { siteConfig } from '@/utils/siteConfig'
import { ExIcon, FacebookIcon, InstagramIcon, LinkedinIcon } from '@/assets/icons';
import Link from 'next/link'
import heroImage from "@/assets/images/ad6e850434c58cfdca5ed066a828ed0c9771e9faf8e15c.png";
import SubscriptionComponent from '@/components/common/SubscriptionComponent'
import { createMetadata } from '@/lib/metadata'
import MainLayout from '@/app/layouts/MainLayout'

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
		name: 'x.com',
		link: siteConfig.socialLinks.x.url,
		handle: siteConfig.socialLinks.x.handle,
		Icon: ExIcon,
	},
	{
		name: 'Instagram',
		link: siteConfig.socialLinks.instagram.url,
		handle: siteConfig.socialLinks.instagram.handle,
		Icon: InstagramIcon,
	},
	{
		name: 'Facebook',
		link: siteConfig.socialLinks.facebook.url,
		handle: siteConfig.socialLinks.facebook.handle,
		Icon: FacebookIcon,
	},
	{
		name: 'Linkedin',
		link: siteConfig.socialLinks.linkedin.url,
		handle: siteConfig.socialLinks.linkedin.handle,
		Icon: LinkedinIcon,
	}
]

const ContactPage = () => {
	return (
		<MainLayout>
			<main className='bg-background'>
				<PageHeroWrapper
					heading='get in touch with zenovate'
					description="Have a question, comment, or concern? We're here to help! Our friendly and knowledgeable team is dedicated to providing you with the support you need on your personalized wellness journey"
					image={{
						src: heroImage,
						alt: "Contact page hero image"
					}}
					size='short'
				/>

				<section className='py-10 md:py-16 lg:py-20'>
					<div className='xmd-container space-y-4 md:space-y-8 lg:space-y-14'>
						<h2 className='text-2xl  md:text-3xl lg:text-5xl font-bold uppercase'>contact information</h2>

						<div className='flex flex-col md:flex-row md:justify-between w-full max-w-[1000px] gap-6'>
							<div className=' space-y-3 md:space-y-5'>
								<h3 className='uppercase text-lg md:text-xl font-bold'>customer support</h3>

								<ul className='space-y-2 md:space-y-3 *:text-sm *:md:text-base'>
									<li className='uppercase'>
										phone: <Link href="tel:+12492060416">+1 (249) 206 0416</Link>
									</li>
									<li className='uppercase'>
										email: <Link href="info@zenovate.health">info@zenovate.health</Link>
									</li>
									<li className='uppercase'>
										address: 157 Queen St E, Brampton, ON L6W 3X4, Canada
									</li>
								</ul>

								{/* GMP Compliance Statement */}
								<p className='text-sm text-muted-foreground pt-2'>
									Offering is made in a GMP-compliant, ISO Class 5 cleanroom in accordance with USP &lt;797&gt; standards.
								</p>
							</div>

							<div className='space-y-3 md:space-y-5'>
								<h3 className='uppercase text-lg md:text-xl font-bold'>hours of operation</h3>
								<div className='space-y-2 uppercase text-sm md:text-base'>
									<p>Monday - Friday: 9:00 AM - 5:00 PM EST</p>
									<p>Saturday - Sunday: 10:00 AM - 2:00 PM EST</p>
								</div>
							</div>
						</div>
					</div>
				</section>

				<section className='bg-background-accent py-10 md:py-16 lg:py-20 space-y-3 md:space-y-5 lg:space-y-14'>
					<div className='xmd-container'>
						<h3 className='title'>
							send a message
						</h3>
						<ContactForm />
					</div>
				</section>

				<section className='pt-12 md:py-16 lg:py-20 space-y-10 md:space-y-16  lg:space-y-20 '>
					<div className='xmd-container'>
						<div className='space-y-6 md:space-y-10 px-[5vw] sm:px-[3.5vw] lg:px-[3vw]'>
							<h1 className='title'>connect with us</h1>
							<div className=' grid grid-cols-2 gap-y-6 gap-x-10 md:flex md:gap-10 md:flex-wrap'>
								{socialMedia.map((item) => (
									<Link
										key={item.name}
										href={item.link}
										aria-label={`${item.name} icon - Follow us on ${item.name} at ${item.link}`}
									>
										<div className='flex gap-3 items-center'>
											<item.Icon aria-label={item.name} className="size-7" />
											<p className='font-medium uppercase'>{item.name}</p>
										</div>
									</Link>
								))}
							</div>
						</div>
					</div>
					<SubscriptionComponent />
				</section>
			</main>
		</MainLayout>

	)
}

export default ContactPage
