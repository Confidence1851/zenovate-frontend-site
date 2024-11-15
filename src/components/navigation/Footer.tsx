import { navLinks } from '@/utils/navigation'
import Logo from './Logo'
import Link from 'next/link'
import { Call, Location } from 'iconsax-react'
import linkedinLogo from '@/assets/images/linkedin.png'
import instaLogo from '@/assets/images/instagram.png'
import facebookLogo from '@/assets/images/facebook.png'
import xLogo from '@/assets/images/x.png'
import Image from 'next/image'

// (
//   <Instagram size={30} className="text-White-100 hover:text-Green-400" />
// ),

const socialMedia = [
	{
		name: 'X',
		link: '#',
		icon: xLogo
		// icon: <X size={30} className="text-Green-400" />,
	},
	{
		name: 'instagram',
		link: '#',
		icon: instaLogo
	},
	{
		name: 'facebook',
		link: '#',
		icon: facebookLogo
	},
	{
		name: 'linkedin',
		link: '#',
		icon: linkedinLogo
	}
]

const Footer = () => {
	return (
		<>
			<nav className='bg-Green-100 py-10 md:pt-16 md:pb-16 px-[5vw] sm:px-[3.5vw] lg:px-[3vw] '>
				<div className='xl:grid grid-cols-2 w-full max-w-[1550px] mx-auto space-y-12 md:space-y-16 lg:space-y-20 xl:space-y-0'>
					<div className='flex justify-between flex-col gap-10'>
						<h3 className='text-White-100 uppercase text-2xl font-semibold lg:text-4xl xl:text-[2.625rem] xl:leading-[2.75rem] max-w-[240px] lg:max-w-[254px] xl:max-w-[294px]'>
							Stay in tune with your health.
						</h3>
						<Logo className='!text-White-100 text-xl lg:text-2xl !font-extrabold !lowercase' />
					</div>

					<div className='space-y-12 md:space-y-16 lg:space-y-20'>
						<div className='flex flex-col md:flex-row gap-16  md:gap-x-[10rem]'>
							{/* explore more */}
							<div className='space-y-6'>
								<h3 className='text-White-100 uppercase text-base font-semibold lg:text-xl'>explore more</h3>
								<div className='flex flex-col gap-4'>
									{navLinks.map((item) => (
										<Link
											href={item.link}
											className='text-White-100 text-sm uppercase hover:text-Green-400'
											key={item.label}
										>
											{item.label}
										</Link>
									))}
								</div>
							</div>

							<div className='space-y-12 flex-1 lg:flex lg:flex-col lg:justify-between'>
								{/* Community */}
								<div className='space-y-6'>
									<h3 className='text-White-100 uppercase text-base font-semibold lg:text-xl'>join our community</h3>
									<p className='text-White-100 text-sm'>
										Sign up today to receive exclusive offers, health tips, and updates on our latest products.
									</p>
								</div>

								{/* Social media */}
								<div className='space-y-6'>
									<h3 className='text-White-100 uppercase text-base font-semibold lg:text-xl'>
										follow us on social media
									</h3>
									<div className='flex gap-4 items-center'>
										{socialMedia.map((item) => (
											<Link href={item.link} key={item.name}>
												<Image src={item.icon} alt={item.name} className='size-6' />
											</Link>
										))}
									</div>
								</div>
							</div>
						</div>

						{/* trust and cert */}
						<div className='space-y-6'>
							<h3 className='text-White-100 uppercase text-base font-semibold lg:text-xl'>trust & certifications</h3>
							<p className='text-White-100 text-sm max-w-[70%] xl:max-w-[85%]'>
								Your health is our priority. We proudly display our certifications and partnerships with trusted health
								organizations to ensure you receive only the best.
							</p>
						</div>
					</div>
				</div>
			</nav>

			{/* <div className="bg-Black-100 px-[5vw] sm:px-[3.5vw] lg:px-[3vw] py-8 ">
        <div className="w-full max-w-[1550px] mx-auto flex flex-col lg:flex-row justify-between gap-6">
          <div className="flex gap-4 items-center">
            <Call size="32" className="text-Green-400" />
            <p className="text-base text-White-100">(123) 456-7890</p>
          </div>
          <div className="flex gap-4 items-center">
            <Location size="32" className="text-Green-400" />
            <p className="text-base text-White-100">
              123 Random St. Wellness City, ST 12345
            </p>
          </div>
        </div>
      </div> */}
		</>
	)
}

export default Footer
