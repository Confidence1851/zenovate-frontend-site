import React from 'react'
import styles from '@/styles/PageHeroWrapper.module.css'
import Image, { StaticImageData } from 'next/image'


interface PageHeroWrapperProps {
	heading?: string
	description?: string
	coloredHeading?: string
	variant?: 'black' | 'white'
	image?: {
		src: string | StaticImageData
		alt: string
	};
	size?: 'default' | 'short';
}
const PageHeroWrapper: React.FC<PageHeroWrapperProps> = ({ description, heading, coloredHeading, image, variant = 'black', size = 'default', }) => {

	const textColor = variant === 'white' ? 'text-background' : 'text-foreground'
	const sectionClasses = size === 'short' ? `${styles.section} ${styles.sectionShort}` : styles.section;

	return (
		<section className={sectionClasses}>
			{image && (
				<Image
					src={image.src}
					alt={image.alt}
					fill
					className="object-cover"
					priority
				/>
			)}

			<div className='relative md-container h-full flex justify-end flex-col pb-10 sm:pb-16 '>
				<div className='w-full max-w-[750px] flex flex-col gap-3 md:gap-5'>
					<h1 className={`${textColor} text-2xl md:text-4xl lg:text-5xl leading-normal md:leading-[1.3] lg:leading-[1.3] uppercase font-bold lg:tracking-wider`}>
						{heading} {coloredHeading && <span className='text-Green-300'>{coloredHeading}</span>}
					</h1>
					<p className={`${textColor} text-base lg:text-xl lg:leading-8`}>{description}</p>
				</div>
			</div>


		</section>
	)
}

export default PageHeroWrapper
