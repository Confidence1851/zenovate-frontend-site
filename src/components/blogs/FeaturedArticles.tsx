'use client'

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import ArticleCard from './ArticleCard'
import BlogSectionWrapper from './BlogSectionWrapper'
import mental from '@/assets/images/mental.jpg'
import nuts from '@/assets/images/nuts.jpg'
import covid from '@/assets/images/covid.jpg'
import drugs from '@/assets/images/drugs.jpg'
import Autoplay from 'embla-carousel-autoplay'

const featuredArticles = [
	{
		id: '1',
		content: 'The Power of Personalized Nutrition: How Targeted Nutrient Therapy Can Transform Your Health',
		img: nuts
	},
	{
		id: '2',
		content: 'Navigating the Supplement Landscape: What You Need to Know',
		img: drugs
	},
	{
		id: '3',
		content: 'Nutrient Deficiencies and Chronic Disease: Exploring the Connection',
		img: covid
	},
	{
		id: '4',
		content: 'The Gut-Brain Axis: How Your Microbiome Influences Mental Health',
		img: mental
	},
	{
		id: '5',
		content: 'Revolutionizing Wellness: The Future of Telemedicine and Personalized Care',
		img: nuts
	}
]

const FeaturedArticles = () => {
	// const articles = await new Promise<typeof featuredArticles>((resolve) => {
	// 	setTimeout(() => {
	// 		resolve(featuredArticles)
	// 	}, 3000) // logic for api call
	// })
	return (
		<BlogSectionWrapper heading='featured articles'>
			<Carousel
				opts={{
					align: 'start'
				}}
				plugins={[Autoplay({ delay: 5000, stopOnMouseEnter: true })]}
				className='w-full'
			>
				<CarouselContent>
					{featuredArticles.map((item, index) => (
						<CarouselItem key={index} className='md:basis-1/2 lg:basis-1/3 xl:basis-1/4 '>
							<ArticleCard article={item} />
						</CarouselItem>
					))}
				</CarouselContent>
				<div className='flex justify-end gap-10 items-center mt-4'>
					<CarouselPrevious className='!relative !left-0 !top-0  border-0 shadow-none p-0 translate-y-0' />
					<CarouselNext className='!relative !left-0 !top-0  border-0 shadow-none p-0 translate-y-0' />
				</div>
			</Carousel>
		</BlogSectionWrapper>
	)
}

export default FeaturedArticles
