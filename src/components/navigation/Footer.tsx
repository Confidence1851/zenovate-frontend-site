'use client'

import Logo from './Logo'
import Link from 'next/link'
import { ExIcon, FacebookIcon, InstagramIcon, LinkedinIcon } from '@/assets/icons';
import { usePathname } from 'next/navigation'
import { siteConfig } from '@/utils/siteConfig'
import styles from '@/styles/Footer.module.css'

const socialMedia = [
	{
		name: 'X',
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

// text-foreground
const Footer = () => {
	const pathname = usePathname()
	const keywords = ['dashboard', 'auth']
	const isDashboard = keywords.some((keyword) => pathname?.includes(keyword))

	return (
		<>
			<footer>
				<nav className={styles.SectionTopContainerParent}>
					<div className={styles.SectionContent}>
						<div className={`md-container`}>
							<div className='grid grid-cols-1 lg:grid-cols-12 w-full gap-12 lg:gap-16'>
								{/* Left Column */}
								<div className='lg:col-span-4 flex flex-col justify-between gap-10'>
									<h3 className='text-foreground uppercase text-2xl font-semibold lg:text-4xl xl:text-[2.625rem] xl:leading-[2.75rem] max-w-[294px]'>
										Stay in tune with your health.
									</h3>
									<Logo className='text-xl lg:text-xl' />
								</div>

								{/* Right Columns */}
								<div className='lg:col-span-8 flex flex-col gap-12 md:gap-16'>
									<div className='grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16'>
										{/* Explore More Links */}
										<div className='space-y-6'>
											<h3 className='text-foreground uppercase text-base font-semibold lg:text-xl'>
												Quick Links
											</h3>
											<div className='grid grid-cols-2 gap-x-4 gap-y-4'>
												{siteConfig.footerLinks.map((item) => (
													<Link
														href={item.href}
														className='text-foreground text-sm uppercase hover:text-primary transition-colors'
														key={item.label}
													>
														{item.label}
													</Link>
												))}
											</div>
										</div>

										{/* Trust & Certifications + Social Media */}
										<div className='space-y-12'>
											<div className='space-y-6'>
												<h3 className='text-foreground uppercase text-base font-semibold lg:text-xl'>
													trust & certifications
												</h3>
												<p className='text-foreground text-sm'>
													Your health is our priority. We proudly display{' '}
													<Link href='/privacy-policy' className='text-[#7f1d1d]'>
														our certifications
													</Link>{' '}
													and{' '}
													<Link href='/terms-of-service' className='text-[#7f1d1d]'>
														partnerships with trusted health organizations
													</Link>{' '}
													to ensure you receive only the best.
												</p>
											</div>

											<div className='space-y-6'>
												<h3 className='text-foreground uppercase text-base font-semibold lg:text-xl'>
													follow us on social media
												</h3>
												<div className='flex gap-4 items-center'>
													{socialMedia.map((item) => (
														<Link
															aria-label={`${item.name} icon - Follow us on ${item.name} at ${item.link}`}
															href={item.link}
															key={item.name}
														>
															<item.Icon className="size-6" />
															{/* {item.name} */}
														</Link>
													))}
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</nav>

				{/* Bottom Section - Copyright and Legal Links */}
				<div className={styles.SectionBottomContainerParent}>
					<div className={styles.SectionContent}>
						<div className={`md-container`}>
							<div className="w-full flex flex-col lg:flex-row justify-between items-center gap-6">
								<p className="text-foreground text-[0.725rem] tracking-normal">
									© {new Date().getFullYear()} Zenovate Health. All rights reserved.
								</p>
								<div className="flex flex-wrap gap-6 justify-end">
									{siteConfig.legalLinks.map((link) => (
										<Link
											key={link.label}
											href={link.href}
											className="text-muted-foreground text-[0.725rem] tracking-normal hover:text-primary transition-colors"
										>
											{link.label}
										</Link>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
			</footer>

		</>
	)
}

export default Footer