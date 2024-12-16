import Team from '@/components/about-page/Team'
import MainLayout from '../layouts/MainLayout'
import SubscriptionComponent from '@/components/common/SubscriptionComponent'
import styles from '@/styles/About.module.css'
import image1 from '@/assets/images/872403ab7663d45c41506034f0f9d52d.jpg'
import Image from 'next/image'

const values = [
	{
		heading: 'Medical Excellence',
		content: 'Our team of board-certified physicians combines clinical expertise with cutting-edge technology to deliver outstanding results.',
		iconName: 'ShieldCheckIcon'
	},
	{
		heading: 'Seamless Experience',
		content: 'Access premium healthcare from the comfort of your home, with straightforward scheduling and dedicated support.',
		iconName: 'SparklesIcon'
	},
	{
		heading: 'Personal Journey',
		content: 'We create a welcoming environment where your individual health goals are understood, respected, and supported.',
		iconName: 'HeartIcon'
	}
]

const promises = [
	'Treatments matched to your needs',
	'Licensed medical team',
	'Everything delivered to you',
	'Straightforward process'
]

const AboutPage = () => {

	return (
		<MainLayout>


			<section className={styles.sectionShort}>
				<div className='relative md-container h-full flex justify-end flex-col pb-10 sm:pb-16 '>
					<div className='w-full flex flex-col gap-3 md:gap-5'>
						<p className={styles.subheader}>We're on a mission</p>
						<h1 className={styles.header}>
							Empowering health through personalized wellness shots
						</h1>
					</div>
				</div>


			</section>

			{/* Mission and values */}
			<section className='bg-White-100 py-12 md:py-16 lg:py-20'>
				<div className='md-container'>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
						{values.map((item, i) => (
							<div key={i} className="flex flex-col gap-4">
								{/* <div className="text-3xl mb-2">{item.iconName}</div> */}
								<h2 className='text-2xl font-bold'>{item.heading}</h2>
								<p className='text-muted-foreground'>{item.content}</p>
							</div>
						))}
					</div>
				</div>
			</section>
			<section className='bg-OffWhite-100 py-12 md:py-16 lg:py-20'>
				<div className='xmd-container'>
					<div className='grid grid-cols-1 md:grid-cols-1 gap-8'>
						<p className='text-muted-foreground text-lg'>
							At Zenovate, we believe that everyone deserves access to cutting-edge wellness solutions that fit
							seamlessly into their unique lifestyle. Our mission is to revolutionize the way individuals approach their
							health by providing personalized, science-backed wellness plans that delivers transformative results.
						</p>
					</div>
				</div>
			</section>


			{/* Our promise */}
			<section className='bg-White-100 py-10 lg:py-16 px-[5vw] sm:px-[3.5vw] lg:px-[3vw]'>
				<div className='md-container flex gap-6 lg:gap-16 flex-col xl:flex-row items-center'>
					<div className='flex flex-col gap-4 lg:gap-10'>
						<h1 className={styles.header}>
							Direct, quality healthcare without the hassle:
						</h1>
						<div>
							{' '}
							<p className='text-muted-foreground text-base md:text-lg mb-6'>
								Founded by healthcare experts who believe in better delivery, we combine medical expertise with modern convenience to provide effective, personalized wellness treatments.

							</p>
							<ul className='flex flex-col gap-2 md:gap-4'>
								{promises.map((item, i) => (
									<li
										key={i}
										className='text-foreground gap-2 items-start text-base leading-normal md:text-lg'
									>
										{item}
									</li>
								))}
							</ul>
						</div>
					</div>
					<div className='w-full '>
						<Image
							src={image1}
							alt="about page image"
							className="object-contain w-full h-full"
						/>
					</div>
				</div>
			</section>
			{/* THE team */}
			{/* <Team /> */}

			<section className='bg-White-100 pt-12 md:py-16 lg:py-20 space-y-10 md:space-y-16 lg:space-y-20 '>
				<SubscriptionComponent />
			</section>

		</MainLayout >

	)
}

export default AboutPage
