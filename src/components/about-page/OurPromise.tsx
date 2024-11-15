const promises = [
	'Personalized, science-backed nutrient therapy formulations',
	'Expert medical guidance and support',
	'Convenient, at-home delivery and administration',
	'A commitment to your success and satisfaction'
]
const OurPromise = () => {
	return (
		<section className='bg-OffWhite-100 py-10 lg:py-16 px-[5vw] sm:px-[3.5vw] lg:px-[3vw]'>
			<div className='w-full max-w-[1550px] mx-auto flex gap-6 lg:gap-16 flex-col xl:flex-row items-center'>
				<div className='flex flex-col gap-4 lg:gap-10'>
					<h1 className='text-4xl md:text-5xl lg:text-7xl uppercase  tracking-wider font-bold'>our promise</h1>
					<div>
						{' '}
						<p className='text-base md:text-lg mb-6'>
							At Zenovate, we&apos;re dedicated to helping you achieve your highest potential for health and well-being.
							We promise to provide you with:
						</p>
						<ul className='flex flex-col gap-2 md:gap-4'>
							{promises.map((item, i) => (
								<li
									key={i}
									className='flex gap-2 items-start text-base leading-normal md:text-lg font-semibold uppercase'
								>
									{item}
								</li>
							))}
						</ul>
					</div>
				</div>
				<div className='w-full h-[500px] bg-Green-300'></div>
			</div>
		</section>
	)
}

export default OurPromise
