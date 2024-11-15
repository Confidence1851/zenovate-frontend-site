import { ReactNode } from 'react'

interface BlogSectionWrapperProps {
	heading: string
	children: ReactNode
}

const BlogSectionWrapper: React.FC<BlogSectionWrapperProps> = ({ children, heading }) => {
	return (
		<section className='bg-White-100 '>
			<div className='w-full max-w-[1550px] mx-auto space-y-3 md:space-y-6'>
				<h1 className='text-base md:text-[19px] md:leading-7 text-Black-100 uppercase font-semibold'>{heading}</h1>
				<div>{children}</div>
			</div>
		</section>
	)
}

export default BlogSectionWrapper
