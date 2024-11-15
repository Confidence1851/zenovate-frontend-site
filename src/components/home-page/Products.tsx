import { ArrowRight } from 'iconsax-react'
import { Button } from '../ui/button'

const products = [
	{
		name: 'tripleDefense',
		description: 'Enhanced defense system',
		content: 'Optimized protection through a triple-component strategy.',
		items: ['Calcium', 'Magnesium', 'Glucosamine'],
		price: 39.99
	},
	{
		name: 'shapeup',
		description: 'Fitness and health conditioning',
		content: 'A holistic approach to improving physical fitness and overall well-being.',
		items: ['Personalized Workout Plans', 'Nutritional Guidance', 'Progress Tracking'],
		price: 49.99
	},
	{
		name: 'phoslim',
		description: 'Metabolic & weight management',
		content: 'Designed to support a healthy metabolism and assist in weight control.',
		price: 34.99
	},
	{
		name: 'methylB12',
		description: 'Brain & nerve function',
		content: 'Vitamin B12 in its most bioavailable form to support neurological health.',
		price: 29.99
	},
	{
		name: 'nadCreation',
		description: 'Boosts cellular energy and repair',
		content: 'Critical for energy metabolism and cellular health.',
		price: 44.99
	},
	{
		name: 'biotinLixer',
		description: 'Biotin to strengthen hair & skin',
		content: 'A rich blend of biotin to strengthen and beautify hair, skin, and nails.',
		price: 24.99
	},
	{
		name: 'glutathione',
		description: 'Powerful antioxidant for detoxification and immune support',
		content: 'Supports detox processes and enhances antioxidant defenses.',
		price: 54.99
	},
	{
		name: 'vitaminD3',
		description: 'Essential for bone health and immune function',
		content: 'Critical for maintaining bone density and supporting immune system health.',
		price: 19.99
	}
]

const Products = () => {
	return (
		<section className='bg-White-100-100 space-y-24 pb-20 lg:pb-40'>
			<div className='w-full max-w-[1550px] mx-auto px-2 space-y-20'>
				<div className='flex justify-between items-end pt-20'>
					<div>
						<h1 className='text-4xl md:text-5xl lg:text-8xl uppercase  tracking-wider font-bold'>Crafted</h1>
						<h1 className='text-4xl md:text-5xl lg:text-8xl uppercase tracking-wider text-Green-300 font-bold'>
							just for you
						</h1>
					</div>
					<ArrowRight size={40} className='text-Green-300' />
				</div>

				<p className='text-base lg:text-xl text-Black-100'>
					Explore our selection of premium health products that have been carefully curated to support your wellness
					journey. Each item is chosen for its quality and effectiveness, ensuring you receive the best possible support
					for your health goals.
				</p>

				{/* PRODUCTS */}

				<div className='relative flex min-w-0 flex-grow gap-8 overflow-x-scroll py-8 custom-scrollbar items-stretch justify-stretch'>
					{products.map((item) => (
						<div
							className=' gap-16 w-[350px] p-8 flex flex-col justify-between border border-Black-100 flex-shrink-0'
							key={item.name}
						>
							<div className='space-y-10'>
								<div>
									<h3 className='text-lg font-semibold text-Black-100 uppercase'>{item.name}</h3>
									<h4 className='text-base text-Gray-100 uppercase'>{item.description}</h4>
								</div>
								<p className='text-base text-Gray-100'>{item.content}</p>
								<p className='text-base font-semibold text-Green-100'>$ {item.price} / month</p>
							</div>

							<div className='flex justify-between items-center'>
								<Button
									type='button'
									className={`
                   flex justify-between items-center uppercase  h-11`}
								>
									<span>Select</span>
									<ArrowRight size={16} />
								</Button>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}

export default Products
