'use client'

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import ArticleCard from './ArticleCard'
import BlogSectionWrapper from './BlogSectionWrapper'
import Autoplay from 'embla-carousel-autoplay'
import { siteConfig } from '@/utils/siteConfig'

const parseDate = (dateStr: string) => new Date(dateStr);
const featuredArticles = siteConfig.blogPosts
	.filter(post => post.featured)
	.sort((a, b) => parseDate(b.date).getTime() - parseDate(a.date).getTime())
	.slice(0, 12)
	.map(post => ({
		id: post.slug,
		content: post.title,
		img: post.images[0]
	}));

const FeaturedArticles = () => {
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
