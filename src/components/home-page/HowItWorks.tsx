const howItWorks = [
	{
		heading: 'sign up',
		description:
			'Begin your journey by signing up for an account. It’s quick and easy—just a few details to get started!'
	},
	{
		heading: 'personalized quiz',
		description:
			"Once you're signed up, you'll take a short quiz designed to understand your unique health needs and preferences. This helps us recommend the best products tailored just for you!"
	},
	{
		heading: 'Cart & Checkout',
		description:
			"Once you've found your perfect products, simply add them to your cart. Our streamlined checkout process is designed for convenience and security, ensuring a smooth experience from start to finish."
	},
	{
		heading: 'Convenient Delivery',
		description:
			'Sit back and relax as we deliver your selected products right to your doorstep! Enjoy premium health support without the stress of shopping.'
	}
]

const HowItWorks = () => {
	return (
		<section className='bg-White-100  py-20 lg:py-32'>
			<div className='max-w-[1550px] mx-auto px-2 space-y-20'>
				<h1 className='text-4xl md:text-5xl lg:text-8xl uppercase  tracking-wider font-bold text-center'>
					how it works
				</h1>
				<div className='grid md:grid-cols-2 gap-10'>
					{howItWorks.map((item, i) => (
						<div className='border border-Black-100 p-8 md:p-10 flex flex-col justify-between gap-10 md:gap-16' key={i}>
							<h2 className='text-2xl lg:text-5xl text-Green-100 uppercase font-semibold'>{item.heading}</h2>
							<p className='text-Black-100 text-base'>{item.description}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}

export default HowItWorks
