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
		<div className='flex flex-col bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden h-full w-full max-w-full'>
			{/* Image at the top */}
			<div className='w-full overflow-hidden'>
				<AspectRatio ratio={1 / 1} className="bg-gray-200">
					<Image
						src={cardContent.image}
						alt='zenovate unique qualities'
						className='w-full h-full object-position-top object-cover'
					/>
				</AspectRatio>
			</div>

			{/* Card content: heading and description */}
			<div className='flex flex-col gap-3 md:gap-4 p-5 md:p-6 text-center flex-1'>
				<h2 className='text-lg md:text-xl text-gray-800 uppercase font-semibold'>{cardContent.heading}</h2>
				<p className='text-gray-700 text-base md:text-sm text-pretty leading-relaxed'>{cardContent.description}</p>
			</div>
		</div >
	)
}
