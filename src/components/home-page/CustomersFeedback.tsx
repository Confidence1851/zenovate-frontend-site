import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel'
import styles from '@/styles/CustomersFeedback.module.css'

const feedback = [
	{
		user: 'john doe',
		text: 'Zenovate has been a game-changer for my health and productivity. The personalized blends keep me energized and focused throughout my busy workday  ',
		profession: 'busy professional',
		age: 45
	},
	{
		user: 'Mr. marco',
		text: 'As an athlete, Zenovate has taken my performance to new heights. The targeted nutrition has been crucial for my recovery and overall physical condition.',
		profession: 'athlete',
		age: 28
	},
	{
		user: 'Sara T',
		text: "I was skeptical at first, but the personalized approach really works! I've seen significant improvements in my energy levels and overall health.",
		profession: 'footballer',
		age: '30'
	},
	{
		user: 'Mark R',
		text: 'The convenience of having high-quality health products delivered right to my door is a game changer. I can’t imagine going back!',
		profession: 'footballer',
		age: '30'
	},
	{
		user: 'Mosh O.',
		text: 'The customer service is outstanding! They helped me customize my plan, and I’m thrilled with the results. I feel supported every step of the way',
		profession: 'footballer',
		age: '30'
	},
	{
		user: 'Mosh O.',
		text: 'The customer service is outstanding! They helped me customize my plan, and I’m thrilled with the results. I feel supported every step of the way',
		profession: 'footballer',
		age: '30'
	}
]
const CustomersFeedback = () => {
	return (
		<section className={styles.section}>
			<div className='w-full max-w-[1550px] mx-auto h-full flex justify-end flex-col'>
				<div className='flex flex-col gap-1.5 md:gap-3 xl:gap-5 pt-12 md:pt-16 lg:pt-20  w-full mx-auto px-[5vw] sm:px-[3.5vw] lg:px-[3vw]'>
					<h2 className={styles.headerTwo}>Real Stories, Real Transformations</h2>
					<h1 className={styles.headerOne}>What our customers are saying</h1>
					{/* <h1 className="text-4xl md:text-5xl xl:text-8xl uppercase xl:text-right tracking-wider lg:pr-20 font-bold">
            are saying
          </h1> */}
				</div>
			</div>
			{/* DIVIDER */}
			<div className='border w-full bg-Black-100' />

			<div className='max-w-[1550px] mx-auto px-[5vw] sm:px-[3.5vw] lg:px-[3vw] '>
				<Carousel
					opts={{
						align: 'start'
					}}
					className='w-full space-y-10'
				>
					<CarouselContent>
						{feedback.map((item, i) => (
							<CarouselItem className='md:basis-1/2 lg:basis-1/3 ' key={i}>
								<div className='flex flex-col justify-between gap-10 lg:gap-20 bg-White-100 border border-Black-100 p-5 sm:p-8  h-full'>
									<h4 className='text-lg lg:text-xl font-semibold'>{item.text}</h4>
									<h5 className='text-base uppercase lg:text-lg font-semibold'>
										{item.user} , {item.age} , {item.profession}
									</h5>
								</div>
							</CarouselItem>
						))}
					</CarouselContent>
					<div className='flex justify-end gap-10 items-center max-w-[1550px] mx-auto'>
						<CarouselPrevious className='!relative !left-0 !top-0  border-0 shadow-none p-0 translate-y-0' />
						<CarouselNext className='!relative !left-0 !top-0  border-0 shadow-none p-0 translate-y-0' />
					</div>
				</Carousel>
			</div>
		</section>
	)
}

export default CustomersFeedback
