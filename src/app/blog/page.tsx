import FeaturedArticles from '@/components/blogs/FeaturedArticles'
import PageHeroWrapper from '@/components/common/PageHeroWrapper'
import heroImage from "@/assets/images/b4e2284fb44e5bf1aa285e70.jpg";
import { createMetadata } from '@/lib/metadata'

export const metadata = createMetadata({
	title: 'Contact | Zenovate Health - Personalized Wellness, Elevated',
	description: 'A world of aesthetics that believes in a client-centric approach that empowers people to shape their unique aesthetic and wellness journey.',
	openGraph: {
		title: 'Contact | Zenovate Health - Personalized Wellness, Elevated',
		description: 'A world of aesthetics that believes in a client-centric approach that empowers people to shape their unique aesthetic and wellness journey.',
		url: '/',
	},
})


const BlogPage = () => {
	return (
		<main>
			<PageHeroWrapper
				heading='Blog & Resource Center'
				description='Expert insights, inspiring stories, and the latest advances in personalized nutrition and wellness.'
				variant='white'
				image={{
					src: heroImage,
					alt: 'blog hero image'
				}}
			/>
			<div className='px-[5vw] sm:px-[3vw] lg:px-[3.5vw]'>
				<div className='space-y-10 md:space-y-16 py-12 md:py-16 lg:py-[4.5rem] '>
					<FeaturedArticles />
					{/* <SuccessStories />
					<ExpertInsights />
					<ZenovateNews /> */}
				</div>
			</div>
		</main>
	)
}

export default BlogPage
