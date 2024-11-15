const teamMembers = [
	{
		name: 'Marco Anton',
		role: 'founder & CEo'
	},
	{
		name: 'john smith',
		role: 'Head of Product Development'
	},
	{
		name: 'emily clark',
		role: 'Chief Marketing Officer'
	},
	{
		name: 'david lopez',
		role: 'Director of Research & Innovation'
	},
	{
		name: 'sarah johnson',
		role: 'Chief Nutritionist'
	},
	{
		name: 'Michael Tanaka',
		role: 'Head of Customer Experience'
	},
	{
		name: 'Lisa Patel',
		role: 'Sustainability Manager'
	},
	{
		name: 'Rachel Adams ',
		role: 'Lead Wellness Coach'
	},
	{
		name: '',
		role: ''
	}
]

const Team = () => {
	return (
		<section className='bg-OffWhite-100 space-y-24 pb-20 lg:pb-40'>
			<div className='w-full max-w-[1550px] mx-auto h-full flex justify-end flex-col  px-2'>
				<div className='flex flex-col gap-3 pt-8 lg:pt-20 w-full mx-auto max-w-[1200px]'>
					<h1 className='text-4xl md:text-5xl lg:text-8xl uppercase text-center  tracking-wider font-bold'>
						Meet the team
					</h1>
				</div>
			</div>
			{/* DIVIDER */}
			<div className='border w-full bg-Black-100' />

			<div className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-full max-w-[1550px] mx-auto px-2'>
				{teamMembers.map((item, i) => (
					<div className='space-y-7 border border-Black-100 p-2' key={i}>
						<div className='h-[300px] w-full bg-White-100 '></div>
						<div className='space-y-2'>
							<h4 className='uppercase text-Black-100 font-semibold'>{item.name}</h4>
							<h4 className='uppercase text-sm'>{item.role}</h4>
						</div>
					</div>
				))}
			</div>
		</section>
	)
}

export default Team
