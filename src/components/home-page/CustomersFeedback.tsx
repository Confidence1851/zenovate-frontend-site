'use client'

import Autoplay from 'embla-carousel-autoplay'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel'
import styles from '@/styles/CustomersFeedback.module.css'

import starFilled from '@/assets/svgs/starFilled.svg'
import Image from 'next/image'

const feedback = [
	{
		user: 'Michael',
		text: `Zenovate has changed my life. Coming to terms with getting older has been difficult
especially as someone who’s always led an active lifestyle. Recovery started to take longer,
dropping a couple of pounds became a herculean task but zenovate has changed all that. I
feel 25 and my body moves like it’s 25! I feel great!`,
		profession: 'Busy Professional',
		age: 45
	},
	{
		user: 'Sarah',
		text: `Zenovate has taken my performance to new heights. It’s helped balance my hormones and
boy, the difference that makes. I just ran the NY marathon and finished in record time and a
new PB. I’ve told everyone i know about them`,
		profession: 'Athlete',
		age: 28
	},
	{
		user: 'Dani',
		text: `I’ve never experienced such swift delivery, it blew my mind. The process was super fast and
seamless. I’m in my first month and I see visible changes already`,
		profession: 'New Mom',
		age: '33'
	}
]
const CustomersFeedback = () => {
	return (
		<section className={styles.section}>
			<div className='w-full max-w-container-md mx-auto h-full flex justify-end flex-col'>
				<h1 className={styles.headerOne}>Voices of Change</h1>
			</div>
			<div className='max-w-container-md mx-auto w-full'>
				<Carousel
					opts={{
						align: 'start'
					}}
					plugins={[Autoplay({ delay: 5000, stopOnMouseEnter: true })]}
					className='w-full space-y-10'
				>
					<CarouselContent>
						{feedback.map((item, i) => (
							<CarouselItem className='md:basis-1/2 lg:basis-1/3 ' key={i}>
								<div className={styles.carouselItem}>

									<h4 className={styles.carouselHeader}>{item.text}</h4>
									<div>
										<div className='flex items-center gap-0 md:gap-[0.5px]'>
											<Image src={starFilled} alt='rating star' />
											<Image src={starFilled} alt='rating star' />
											<Image src={starFilled} alt='rating star' />
											<Image src={starFilled} alt='rating star' />
											<Image src={starFilled} alt='rating star' />
										</div>
										<h5 className={styles.carouselText}>
											{item.user} , {item.age} <br />
											<span className='font-medium text-foreground'>{item.profession}</span>
										</h5>
									</div>

								</div>
							</CarouselItem>
						))}
					</CarouselContent>
					<div className='flex justify-end gap-10 items-center max-w-[1550px] mx-auto'>
						<CarouselPrevious className='text-primary !relative !left-0 !top-0  border-0 shadow-none p-0 translate-y-0' />
						<CarouselNext className='text-primary !relative !left-0 !top-0  border-0 shadow-none p-0 translate-y-0' />
					</div>
				</Carousel>
			</div>
		</section>
	)
}

export default CustomersFeedback
