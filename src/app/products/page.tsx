import PageHeroWrapper from '@/components/common/PageHeroWrapper'
import SubscriptionComponent from '@/components/common/SubscriptionComponent'
import CustomersFeedback from '@/components/home-page/CustomersFeedback'
import FeatureProducts from '@/components/products-page/FeatureProducts'
import { ArrowRight } from 'iconsax-react'
import heroImage from "@/assets/images/d703c9c47427018598d7fc12827.png";
import MainLayout from '@/app/layouts/MainLayout'

const ProductsPage = () => {
	return (
		<MainLayout>
			<main>
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

				{/* MORE PRODUCTS */}
				<section className='bg-foreground py-6 px-[5vw] sm:px-[3.5vw] lg:px-[3vw]'>
					<div className='w-full cursor-pointer max-w-[1550px] mx-auto flex justify-between items-center  '>
						<p className='uppercase text-background text-lg md:text-xl'>view all products</p>
						<ArrowRight size={30} className='cursor-pointer text-background hover:text-Green-400' />
					</div>
				</section>

				{/* CUSTOMER REVIEW */}
				<CustomersFeedback />

				<section className='w-full bg-background lg:py-20'>
					<SubscriptionComponent />
				</section>
			</main>
		</MainLayout>

	)
}

export default ProductsPage
