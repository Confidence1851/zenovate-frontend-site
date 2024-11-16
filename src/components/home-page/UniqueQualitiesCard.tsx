import Image, { StaticImageData } from 'next/image'
import React from 'react'
interface UniqueQualitiesCardProps {
	cardContent: {
		heading: string
		description: string
		image: StaticImageData
	}
}

export const UniqueQualitiesCard: React.FC<UniqueQualitiesCardProps> = ({ cardContent }) => {
	return (
		<div className='flex flex-col justify-between gap-5 md:gap-6'>
			<div className=' h-[300px] w-full overflow-hidden'>
				<Image src={cardContent.image} alt='health' className='min-w-full min-h-full object-center object-cover' />
			</div>

			<div className='flex-1 flex flex-col gap-1 md:gap-3 md:pr-2'>
				<h2 className='text-lg md:text-xl text-Green-100 uppercase font-semibold'>{cardContent.heading}</h2>
				<p className='text-Black-100 text-base'>{cardContent.description}</p>
			</div>
		</div>
	)
}
