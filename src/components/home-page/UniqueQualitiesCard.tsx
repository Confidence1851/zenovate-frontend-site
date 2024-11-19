import Image, { StaticImageData } from 'next/image'
import React from 'react'
import { AspectRatio } from "@/components/ui/aspect-ratio"

interface UniqueQualitiesCardProps {
	cardContent: {
		heading: string
		description: string
		image: StaticImageData
	}
}

export const UniqueQualitiesCard: React.FC<UniqueQualitiesCardProps> = ({ cardContent }) => {
	return (
		<div className='flex flex-col items-center justify-between gap-5 md:gap-6'>
			<div className='w-[15vw] overflow-hidden'>
				<AspectRatio ratio={1 / 1} className="bg-muted">
					<Image src={cardContent.image} alt='zenovate unique qualities' className='w-full h-full object-position-top object-cover' />
				</AspectRatio>
			</div>

			<div className='flex-1 flex flex-col items-center gap-1 md:gap-3 md:pr-2 text-center'>
				<h2 className='text-lg md:text-xl text-Green-100 uppercase font-semibold'>{cardContent.heading}</h2>
				<p className='text-Black-100 text-base text-pretty'>{cardContent.description}</p>
			</div>
		</div >
	)
}
