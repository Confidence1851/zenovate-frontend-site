import { Suspense } from 'react'
import PageHeroWrapper from '@/components/common/PageHeroWrapper'
import { createMetadata } from '@/lib/metadata'
import MainLayout from '@/app/layouts/MainLayout'
// import heroImage from "@/assets/images/pinksky.jpeg";
import OrderSheetComponent from '@/components/order-sheet/OrderSheetComponent'

export const metadata = createMetadata({
	title: 'Order Sheet | Zenovate Professional - Personalized Wellness, Elevated',
	description: 'Browse and order our premium wellness products. Select quantities and place your order with ease.',
	openGraph: {
		title: 'Order Sheet | Zenovate Professional - Personalized Wellness, Elevated',
		description: 'Browse and order our premium wellness products. Select quantities and place your order with ease.',
		url: '/professional/order',
	},
})

const OrderSheetPage = () => {
	return (
		<MainLayout>
			<main className='bg-background'>
				{/* <PageHeroWrapper
					image={{
						src: heroImage,
						alt: "Order sheet page hero image"
					}}
					variant='white'
					size='short'
				/> */}

				<section className='bg-background py-10 md:py-16 lg:py-20'>
					<div className='xmd-container'>
						<div className='flex flex-col gap-3 md:gap-5 mb-8 md:mb-12'>
							<h1 className='text-foreground text-2xl md:text-4xl lg:text-5xl leading-normal md:leading-[1.3] lg:leading-[1.3] uppercase font-bold lg:tracking-wider'>
								Zenovate Professional
							</h1>
							<p className='text-foreground text-base lg:text-xl lg:leading-8'>
								Explore our premium wellness collection; offered in single-packed, self-injection multi-dose pens for convenience and precision. Select what you need and order in just a few clicks.
							</p>
						</div>
						<Suspense fallback={<div className="text-center py-10">Loading...</div>}>
							<OrderSheetComponent currency="CAD" brand="professional" />
						</Suspense>
					</div>
				</section>
			</main>
		</MainLayout>
	)
}

export default OrderSheetPage
