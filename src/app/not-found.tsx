import Link from 'next/link'

const shortcutLinks = [
	{
		name: 'home',
		label: 'return to home',
		link: '/'
	},
	{
		name: 'products',
		label: 'explore our products',
		link: '/products'
	},
	{
		name: 'contact',
		label: 'contact us',
		link: '/contact'
	}
]

const NotFoundPage = () => {
	return (
		<main className='h-[70vh] md:h-[80vh] flex justify-center items-center'>
			<div className='w-full max-w-[1550px] mx-auto flex flex-col lg:flex-row px-2 gap-10'>
				<div className='space-y-10 w-full'>
					<div className='space-y-6'>
						<h1 className='text-2xl md:text-4xl lg:text-5xl uppercase font-bold tracking-wider'>
							oops! page not found
						</h1>
						<p className='text-xl md:text-2xl text-Gray-100 uppercase font-medium'>
							We can’t seem to find the page you’re looking for. It might have been moved or doesn’t exist anymore.
						</p>
					</div>

					<div className='border w-full bg-Green-100' />

					<div className='space-y-6'>
						<h2 className='uppercase text-lg md:text-xl text-Black-100 font-semibold'>
							what would you like to do next?
						</h2>
						<div>
							<ul className='flex flex-col gap-5'>
								{shortcutLinks.map((item) => (
									<Link
										href={item.link}
										key={item.name}
										className='uppercase text-Gray-100 hover:text-Green-300 font-semibold'
									>
										{item.label}
									</Link>
								))}
							</ul>
						</div>
					</div>
				</div>

				<div className='w-full flex justify-center items-center'>
					<h1 className='text-2xl md:text-4xl lg:text-8xl font-bold text-center'>IMAGE HERE</h1>
				</div>
			</div>
		</main>
	)
}

export default NotFoundPage
