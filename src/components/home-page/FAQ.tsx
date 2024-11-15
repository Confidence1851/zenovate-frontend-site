import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

const accordionData = [
	{
		id: '1',
		title: 'less painful',
		content:
			'Remember the pain of intramuscular injections? 1 in 3 patients complain of prolonged soreness after IM injections. On the other hand, subcutaneous injections are way less painful, enabling you to become a healthier version of yourself without the pain.'
	},
	{
		id: '2',
		title: 'ease of use',
		content:
			'Remember the pain of intramuscular injections? 1 in 3 patients complain of prolonged soreness after IM injections. On the other hand, subcutaneous injections are way less painful, enabling you to become a healthier version of yourself without the pain.'
	},
	{
		id: '3',
		title: 'long shelf life',
		content:
			'Remember the pain of intramuscular injections? 1 in 3 patients complain of prolonged soreness after IM injections. On the other hand, subcutaneous injections are way less painful, enabling you to become a healthier version of yourself without the pain.'
	},
	{
		id: '4',
		title: 'delivered to your door',
		content:
			'Remember the pain of intramuscular injections? 1 in 3 patients complain of prolonged soreness after IM injections. On the other hand, subcutaneous injections are way less painful, enabling you to become a healthier version of yourself without the pain.'
	},
	{
		id: '5',
		title: 'optimized absorption',
		content:
			'Remember the pain of intramuscular injections? 1 in 3 patients complain of prolonged soreness after IM injections. On the other hand, subcutaneous injections are way less painful, enabling you to become a healthier version of yourself without the pain.'
	},
	{
		id: '6',
		title: 'convenience at home',
		content:
			'Remember the pain of intramuscular injections? 1 in 3 patients complain of prolonged soreness after IM injections. On the other hand, subcutaneous injections are way less painful, enabling you to become a healthier version of yourself without the pain.'
	}
]

const FAQ = () => {
	return (
		<section className='bg-White-100 space-y-24 pb-20 lg:pb-40'>
			<div className='w-full max-w-[1550px] mx-auto px-2'>
				<div className='hidden lg:flex flex-col gap-3 pt-8 lg:pt-20 w-full mx-auto max-w-[1100px]'>
					<h1 className='text-4xl md:text-5xl lg:text-8xl uppercase  tracking-wider font-bold'>Frequently</h1>
					<h1 className='text-4xl md:text-5xl lg:text-8xl uppercase lg:text-center tracking-wider lg:pr-20 font-bold'>
						asked
					</h1>
					<h1 className='text-4xl md:text-5xl lg:text-8xl uppercase lg:text-right tracking-wider lg:pr-20 font-bold'>
						questions
					</h1>
				</div>
				<div className='lg:hidden'>
					<h1 className='text-4xl md:text-5xl lg:text-8xl uppercase  tracking-wider font-bold text-center'>
						Frequently asked questions
					</h1>
				</div>
			</div>

			<div className='flex lg:border border-t-2 flex-col xl:flex-row px-2 pt-10 lg:pt-0'>
				{/* ACCORDION */}
				<div className='flex-1 lg:p-20'>
					<Accordion type='single' collapsible className='gap-5 flex flex-col '>
						{accordionData.map((item) => (
							<AccordionItem value={item.id} className='border-Gray-100 border ' key={item.id}>
								<AccordionTrigger className='uppercase transition-transform duration-500 text-[14px] md:text-base px-2 font-semibold border-b-0 data-[state=open]:bg-Black-100 data-[state=open]:text-White-100 data-[state=open]:no-underline  '>
									{item.title}
								</AccordionTrigger>
								<AccordionContent className='p-3 leading-4 md:leading-6 text-base md:text-lg'>
									{item.content}
								</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				</div>

				<div className='bg-Gray-100 h-max w-[700px] border hidden xl:block'></div>
			</div>
		</section>
	)
}

export default FAQ
