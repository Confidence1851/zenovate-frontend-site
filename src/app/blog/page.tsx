import ExpertInsights from '@/components/blogs/ExpertInsights'
import FeaturedArticles from '@/components/blogs/FeaturedArticles'
import SuccessStories from '@/components/blogs/SuccessStories'
import ZenovateNews from '@/components/blogs/ZenovateNews'
import PageHeroWrapper from '@/components/common/PageHeroWrapper'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'iconsax-react'

const BlogPage = () => {
	return (
		<main>
			<PageHeroWrapper
				description='Welcome to the Zenovate Blog & Resource Center, your go-to destination for expert insights, inspiring stories, and the latest advances in personalized nutrition and wellness.'
				heading='Stay Informed, Stay Inspired: The Zenovate Blog & Resource Center'
			/>
			<div className='px-[5vw] sm:px-[3vw] lg:px-[3.5vw]'>
				<div className='space-y-10 md:space-y-16 py-12 md:py-16 lg:py-[4.5rem] '>
					<FeaturedArticles />
					<SuccessStories />
					<ExpertInsights />
					<ZenovateNews />
					<Button className='text-sm md:text-xl bg-Green-100 hover:bg-Green-300 text-White-100 h-12 flex justify-between items-center p-4 gap-12 mx-auto'>
						<span className='uppercase text-wrap'>Explore the Blog & Resource Center</span>
						<ArrowRight size='24' className='text-secondary-foreground hidden md:inline-block' />
					</Button>
				</div>
			</div>
		</main>
	)
}

export default BlogPage
