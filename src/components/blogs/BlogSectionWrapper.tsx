import { ReactNode } from 'react'

interface BlogSectionWrapperProps {
	heading: string
	children: ReactNode
}

const BlogSectionWrapper: React.FC<BlogSectionWrapperProps> = ({ children, heading }) => {
	return (
		<section className='bg-background'>
			<div className='w-full max-w-7xl mx-auto space-y-3 md:space-y-6'>
				<h1 className='text-base md:text-[19px] md:leading-7 text-foreground uppercase font-semibold'>{heading}</h1>
				<div>{children}</div>
			</div>
		</section>
	)
}

export default BlogSectionWrapper
