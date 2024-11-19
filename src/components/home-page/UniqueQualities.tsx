import { UniqueQualitiesCard } from './UniqueQualitiesCard'
import styles from '@/styles/UniqueQualities.module.css'
import doctor from '@/assets/images/doctor.png'
import tube from '@/assets/images/tube.png'
import needle from '@/assets/images/needle.png'
import phone from '@/assets/images/phone.png'

const uniqueQualities = [
	{
		heading: '🩺 Expert Medical Guidance',
		description:
			'Our licensed prescribers work closely with you to develop a personalized optimized plan tailored to your specific needs and goals.',
		image: doctor
	},
	{
		heading: '🔬 Science-Backed Formulations',
		description: 'We leverage the latest research to create precision-targeted wellness shots blends that deliver optimal results.',
		image: tube
	},
	{
		heading: '💉 Convenient At-Home Injections',
		description: 'Our easy-to-use shots allow you to prioritize your health without disrupting your busy lifestyle.',
		image: needle
	},
	{
		heading: '📱 Telemedicine Platform',
		description:
			'Access expert support, track your progress, and manage your personalized therapy through our user-friendly website.',
		image: phone
	}
]
const UniqueQualities = () => {
	return (
		<section className='bg-Green-200 space-y-12 md:space-y-14 px-[5vw] sm:px-[3.5vw] lg:px-[3vw] xl:space-y-16 pb-12 md:pb-16 lg:pb-20 '>
			<div className='w-full mb-[-8px] md:mb-0 max-w-7xl mx-auto h-full flex justify-end flex-col  '>
				<div className='flex flex-col gap-0 lg:gap-3  pt-12 md:pt-16 lg:pt-20  w-full max-w-[1500px] mx-auto '>
					<h1 className={`${styles.header}`}>discover the</h1>
					<h1 className={`${styles.header} ${styles.headerLeft}`}>zenovate difference</h1>
				</div>
			</div>

			<div className='max-w-7xl w-full mx-auto '>
				{/* <div className="w-full overflow-x-scroll grid md:grid-cols-2 lg:flex  gap-6 custom-scrollbar pb-5 "> */}
				<div className={styles.gridContainer}>
					{uniqueQualities.map((item, i) => (
						<UniqueQualitiesCard cardContent={item} key={i} />
					))}
				</div>
			</div>
		</section>
	)
}

export default UniqueQualities
