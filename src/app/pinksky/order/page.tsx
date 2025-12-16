import { Suspense } from 'react'
import PageHeroWrapper from '@/components/common/PageHeroWrapper'
import { createMetadata } from '@/lib/metadata'
import MainLayout from '@/app/layouts/MainLayout'
import heroImage from "@/assets/images/pinksky.jpeg";
import OrderSheetComponent from '@/components/order-sheet/OrderSheetComponent'

export const metadata = createMetadata({
	title: 'Order Sheet | Zenovate Health - Personalized Wellness, Elevated',
	description: 'Browse and order our premium wellness products. Select quantities and place your order with ease.',
	openGraph: {
		title: 'Order Sheet | Zenovate Health - Personalized Wellness, Elevated',
		description: 'Browse and order our premium wellness products. Select quantities and place your order with ease.',
		url: '/pinksky/order',
	},
})

const OrderSheetPage = () => {
	return (
		<MainLayout>
			<main className='bg-background'>
				<PageHeroWrapper
					heading='order sheet'
					description="Browse our complete selection of premium wellness products. Select the quantities you need and place your order with ease."
					image={{
						src: heroImage,
						alt: "Order sheet page hero image"
					}}
					variant='white'
					size='short'
				/>

				<section className='py-10 md:py-16 lg:py-20'>
					<div className='xmd-container'>
						<Suspense fallback={<div className="text-center py-10">Loading...</div>}>
							<OrderSheetComponent />
						</Suspense>
					</div>
				</section>
			</main>
		</MainLayout>
	)
}

export default OrderSheetPage


