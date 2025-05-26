import { Card, CardContent } from '@/components/ui/card'
import { ArrowUpRight } from 'lucide-react'
import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'
import { AspectRatio } from '../ui/aspect-ratio'
import { BlogPostWithSlug } from '@/utils/siteConfig'

type ArticleType = {
	content: string
	id: string
	img?: StaticImageData
}
interface ArticleCardProps {
	article?: ArticleType | null | undefined,
	post?: BlogPostWithSlug | null | undefined
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article , post }) => {
	return (
		<Card className=' p-1 border-0 shadow-none'>
			<CardContent className='flex flex-col items-center p-0 gap-4'>
				{article && <Link href={`/blog/${article.id}`}>
					<AspectRatio ratio={16 / 9} className='w-full overflow-hidden'>
						{article.img && (
							<Image
								src={article.img}
								alt={article.content}
								className='object-center object-cover rounded-sm'
							/>
						)}
					</AspectRatio>
					<div className='flex justify-between w-full pt-2'>
						<p className='text-sm max-w-[70%] line-clamp-2'>{article.content}</p>
						<ArrowUpRight size={20} />
					</div>
				</Link>}
				{post && <Link href={`/blog/${post.slug}`}>
					<AspectRatio ratio={16 / 9} className='w-full overflow-hidden'>
						{post.images[0] && (
							<Image
								src={post.images[0]}
								alt={post.title}
								className='object-center object-cover rounded-sm'
							/>
						)}
					</AspectRatio>
					<div className='flex justify-between w-full pt-2'>
						<p className='text-sm max-w-[70%] line-clamp-2'>{post.title}</p>
						<ArrowUpRight size={20} />
					</div>
				</Link>}
			</CardContent>
		</Card>
	)
}

export default ArticleCard