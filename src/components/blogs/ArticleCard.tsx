import { Card, CardContent } from '@/components/ui/card'
import { ArrowUpRight } from 'lucide-react'
import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'
import { AspectRatio } from '../ui/aspect-ratio'

type ArticleType = {
	content: string
	id: string
	img?: StaticImageData
}
interface ArticleCardProps {
	article: ArticleType
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
	return (
		<Card className=' p-1 border-0 shadow-none'>
			<CardContent className='flex flex-col items-center p-0 gap-4'>
				<AspectRatio ratio={16 / 9} className='w-full overflow-hidden'>
					<Image
						src={article.img}
						alt={article.content}
						className='object-center object-cover rounded-sm'
					/>
				</AspectRatio>
				<div className='flex justify-between w-full'>
					<p className='text-sm max-w-[70%] line-clamp-2'>{article.content}</p>
					<Link href={`/blog/${article.id}`}>
						<ArrowUpRight size={20} />
					</Link>
				</div>
			</CardContent>
		</Card>
	)
}

export default ArticleCard