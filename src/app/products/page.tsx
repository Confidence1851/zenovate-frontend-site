import PageHeroWrapper from '@/components/common/PageHeroWrapper'
import SubscriptionComponent from '@/components/common/SubscriptionComponent'
import CustomersFeedback from '@/components/home-page/CustomersFeedback'
import FeatureProducts from '@/components/products-page/FeatureProducts'
// import { ArrowRight } from 'iconsax-react'
import heroImage from "@/assets/images/d703c9c47427018598d7fc12827.png";
import MainLayout from '@/app/layouts/MainLayout'

const ProductsPage = () => {
	return (
		<MainLayout>
			{/* HERO */}
			<PageHeroWrapper
				heading='your journey to a healthier you starts here'
				description=' Discover premium wellness products designed to nourish your body, mind, and spirit. From natural supplements to holistic self-care essentials, we’ve got everything you need to thrive'
				variant='white'
				image={{
					src: heroImage,
					alt: "Product page hero image"
				}}
			/>

			{/* FEATURED PRODUTCS */}
			<FeatureProducts />

			{/* CUSTOMER REVIEW */}
			<CustomersFeedback />

			<section className='w-full bg-background lg:py-20'>
				<SubscriptionComponent />
			</section>
		</MainLayout>

	)
}

export default ProductsPage
