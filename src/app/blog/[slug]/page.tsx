import ArticleCard from '@/components/blogs/ArticleCard'
import BlogSectionWrapper from '@/components/blogs/BlogSectionWrapper'
import { siteConfig, getRelatedArticles, type BlogPostWithSlug } from '@/utils/siteConfig';
import { markdownToHtml } from '@/lib/markdown';
import { notFound } from 'next/navigation';
import { createMetadata } from '@/lib/metadata'
import { Metadata } from 'next'
// import PageHeroWrapper from '@/components/common/PageHeroWrapper';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import MainLayout from '@/app/layouts/MainLayout';

type Props = {
	params: {
		slug: string
	}
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const post = siteConfig.blogPosts.find((post) => post.slug === params.slug)
	if (!post) {
		return createMetadata()
	}
	return createMetadata({
		title: post.title,
		description: post.description || `Read about ${post.title} on Zenovate Health`,
		openGraph: {
			title: post.title,
			description: post.description || `Read about ${post.title} on Zenovate Health`,
			url: `/blog/${post.slug}`,
			images: post.images.map(image => ({
				url: image.src,
				width: 1200,
				height: 630,
				alt: post.title,
			})),
		},
		twitter: {
			card: 'summary_large_image',
			title: post.title,
			description: post.subtitle || `Read about ${post.title} on Zenovate Health`,
			images: post.images.map(image => image.src),
		},
	})
}


export async function generateStaticParams() {
	return siteConfig.blogPosts.map((post) => ({
		slug: post.slug,
	}))
}


export default async function BlogInfoPage({ params }: Props) {
	const post = siteConfig.blogPosts.find((post) => post.slug === params.slug);

	if (!post) {
		notFound();
	}
	const htmlContent = await markdownToHtml(post.content);
	const relatedArticles = getRelatedArticles(post, siteConfig.blogPosts);

	return (
		<MainLayout>
			<main>
				{/* <PageHeroWrapper
					image={post.images[0] ? {
						src: post.images[0],
						alt: post.title
					} : undefined}
					size='short'
				/> */}

				<article className='py-10 md:py-16 lg:pt-24'>
					<div className='w-full max-w-[800px] mx-auto space-y-14'>
						<div className='space-y-4 lg:space-y-8 md-container'>
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

						<div className='space-y-6 md-container'>
							<div
								className='prose max-w-none text-foreground'
								dangerouslySetInnerHTML={{ __html: htmlContent }}
							/>
						</div>
					</div>
				</article>

				{/* similar articles */}
				<section className='py-10 md:py-20 md-container'>
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
											post={article}
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
		</MainLayout>

	)
}
