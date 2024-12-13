import { ReactNode } from 'react'

interface BlogSectionWrapperProps {
	heading: string
	children: ReactNode
}

const BlogSectionWrapper: React.FC<BlogSectionWrapperProps> = ({ children, heading }) => {
	return (
		<section className='space-y-3 md:space-y-6'>
			<h3 className='smaller-title'>{heading}</h3>
			<div>{children}</div>
		</section>
	)
}

export default BlogSectionWrapper
