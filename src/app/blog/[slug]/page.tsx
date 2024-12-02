import ArticleCard from '@/components/blogs/ArticleCard'
import BlogSectionWrapper from '@/components/blogs/BlogSectionWrapper'
import { siteConfig, getRelatedArticles, type BlogPostWithSlug } from '@/utils/siteConfig';
import { markdownToHtml } from '@/lib/markdown';
import { notFound } from 'next/navigation';
import { createMetadata } from '@/lib/metadata'
import PageHeroWrapper from '@/components/common/PageHeroWrapper';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

export const metadata = createMetadata({
	title: 'FAQ | Zenovate Health - Personalized Wellness, Elevated',
	description: 'A world of aesthetics that believes in a client-centric approach that empowers people to shape their unique aesthetic and wellness journey.',
	openGraph: {
		title: 'FAQ | Zenovate Health - Personalized Wellness, Elevated',
		description: 'A world of aesthetics that believes in a client-centric approach that empowers people to shape their unique aesthetic and wellness journey.',
		url: '/',
	},
})

type Props = {
	params: {
		slug: string
	}
}


export default async function BlogInfoPage({ params }: Props) {
	const post = siteConfig.blogPosts.find((post) => post.slug === params.slug);

	if (!post) {
		notFound();
	}
	const htmlContent = await markdownToHtml(post.content);
	const relatedArticles = getRelatedArticles(post, siteConfig.blogPosts);

	return (
		<main>
			<PageHeroWrapper
				image={post.images[0] ? {
					src: post.images[0],
					alt: post.title
				} : undefined}
			/>

			<section className='bg-background py-10 md:py-16 lg:pt-24 px-[5vw] sm:px-[3vw] lg:px-[3.5vw] '>
				<div className='w-full max-w-[800px] mx-auto space-y-14'>
					<div className='space-y-4 lg:space-y-8'>
						<h1 className='text-2xl md:text-3xl lg:text-5xl lg:leading-tight font-semibold'>
							{post.title}
						</h1>
						<div className="flex gap-4 text-sm text-foreground">
							<span>{post.date}</span>
							{post.tags && (
								<span>{post.tags.join(', ')}</span>
							)}
						</div>
					</div>

					<div className='space-y-6'>
						<div
							className='prose max-w-none text-foreground'
							dangerouslySetInnerHTML={{ __html: htmlContent }}
						/>
					</div>
				</div>
			</section>

			{/* similar articles */}
			<section className='py-10 md:py-20 px-[5vw] sm:px-[3vw] lg:px-[3.5vw]'>
				<BlogSectionWrapper heading='read more of our articles'>
					<Carousel
						opts={{
							align: 'start'
						}}
						className='w-full'
					>
						<CarouselContent>
							{relatedArticles.map((article) => (
								<CarouselItem
									key={article.id}
									className='md:basis-1/2 lg:basis-1/3 xl:basis-1/4'
								>
									<ArticleCard
										article={{
											id: article.id,
											content: article.title,
											img: article.images[0]
										}}
									/>
								</CarouselItem>
							))}
						</CarouselContent>
						<div className='flex justify-end gap-10 items-center mt-4'>
							<CarouselPrevious className='!relative !left-0 !top-0  border-0 shadow-none p-0 translate-y-0' />
							<CarouselNext className='!relative !left-0 !top-0  border-0 shadow-none p-0 translate-y-0' />
						</div>
					</Carousel>
				</BlogSectionWrapper>
			</section>
		</main>
	)
}


export async function generateStaticParams() {
	return siteConfig.blogPosts.map((post) => ({
		slug: post.slug,
	}));
}