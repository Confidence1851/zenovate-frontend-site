import ArticleCard from '@/components/blogs/ArticleCard'
import BlogSectionWrapper from '@/components/blogs/BlogSectionWrapper'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'

const featuredArticles = [
	{
		id: '1',
		content: 'The Power of Personalized Nutrition: How Targeted Nutrient Therapy Can Transform Your Health'
	},
	{
		id: '2',
		content: 'Navigating the Supplement Landscape: What You Need to Know'
	},
	{
		id: '3',
		content: 'Nutrient Deficiencies and Chronic Disease: Exploring the Connection'
	},
	{
		id: '4',
		content: 'The Gut-Brain Axis: How Your Microbiome Influences Mental Health'
	},
	{
		id: '5',
		content: 'Revolutionizing Wellness: The Future of Telemedicine and Personalized Care'
	}
]
const BlogInfoPage = ({ params }: { params: { id: string } }) => {
	const id = params.id //used to fetch individual articles
	console.log(id)

	return (
		<main>
			<section className='w-full h-[300px] md:h-[500px] xl:h-[60dvh] xl:min-h-[500px] bg-OffWhite-100 flex justify-center items-center'>
				<h1 className='text-2xl md:text-4xl lg:text-8xl font-bold'>IMAGE HERE</h1>
			</section>

			<section className='bg-White-100 py-10 md:py-16 lg:pt-24 px-[5vw] sm:px-[3vw] lg:px-[3.5vw] '>
				<div className='w-full max-w-[800px] mx-auto space-y-14'>
					<div className='space-y-4 lg:space-y-8'>
						<h1 className='text-2xl md:text-3xl lg:text-5xl lg:leading-tight font-semibold'>
							The Power of Personalized Nutrition: How Targeted Nutrient Therapy Can Transform Your Health
						</h1>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
							dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
							ea commodo consequat.
						</p>
					</div>

					<div className='space-y-6'>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
							dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
							ea commodo consequat.
						</p>
						<p>
							Felis placerat pulvinar accumsan tellus est tempor finibus odio. Pellentesque ligula habitasse sem fusce
							auctor cursus rhoncus ad. Vehicula molestie phasellus duis montes facilisis ligula auctor magna. Hac
							iaculis eleifend lectus nostra elementum diam nascetur sollicitudin dolor. Class malesuada inceptos
							molestie etiam consectetur eu ornare. Sem semper felis vulputate sagittis nisi ornare! Elementum tellus
							purus himenaeos euismod elit ac nunc cursus. Tempor eu feugiat phasellus tellus in conubia cras. Hendrerit
							cursus leo cras penatibus ad elit nascetur. Maximus cubilia facilisi amet libero dolor posuere.
						</p>

						<p>
							Fames mollis nascetur justo interdum proin. Felis eleifend ridiculus faucibus varius dis morbi ante
							sagittis. Sodales cursus platea nisl ex elit ultricies. Nam id elementum hac velit maximus, mattis
							vehicula dui. Sit facilisi tortor justo mollis vulputate ultricies ullamcorper torquent. Ad suscipit
							feugiat efficitur pellentesque blandit etiam. Dis neque tincidunt elit blandit semper nisl blandit
							consectetur lobortis?
						</p>

						<p>
							Habitasse class conubia per vestibulum ut porttitor senectus aliquam. Ullamcorper luctus sodales nullam
							massa curabitur. Quisque diam mi cubilia; hendrerit fermentum dapibus litora. Finibus maecenas mi dui
							nascetur natoque. Ac et hac blandit orci facilisi penatibus eros. Vehicula per mauris class urna augue at
							dolor consectetur. Eu lacus tincidunt auctor mauris vehicula suscipit ac. Erat consequat eleifend cras
							nibh aliquet habitasse donec.
						</p>
					</div>
				</div>
			</section>

			<section className='py-10 md:py-20 px-[5vw] sm:px-[3vw] lg:px-[3.5vw]'>
				<BlogSectionWrapper heading='read more of our articles'>
					<Carousel
						opts={{
							align: 'start'
						}}
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
			</section>
		</main>
	)
}

export default BlogInfoPage
