type WrapperType = {
	children: React.ReactNode
	heading: string
	mobParagraph: string
	paragraph: string
	customHeading?: boolean
}

export default function Wrapper({ children, heading, mobParagraph, paragraph, customHeading = false }: WrapperType) {
	return (
		<div className='grid min-h-[calc(100svh-73px)] px-[5vw] sm:px-[3vw] xl:px-0 grid-cols-1 xl:grid-cols-[58%,42%]'>
			<div className='hide-scrollbar py-6 flex items-center justify-start'>
				<div className='w-full max-w-[454px] mx-auto'>
					{!customHeading && (
						<div className='text-center sm:text-left'>
							<h1 className='text-black text-3xl sm:text-[42px] sm:leading-tight capitalize font-semibold '>
								{heading}
							</h1>
							<p className='text-sm mt-[5px] uppercase  text-[#94A3B8] sm:hidden max-w-[70%] mx-auto'>{mobParagraph}</p>
							<p className='text-base mt-1 text-[#94A3B8] hidden sm:inline-block'>{paragraph}</p>
						</div>
					)}
					{children}
				</div>
			</div>
			<div className='bg-[#D9D9D9] hidden xl:inline-block h-full'></div>
		</div>
	)
}
