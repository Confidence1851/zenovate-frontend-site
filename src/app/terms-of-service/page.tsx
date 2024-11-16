import PageHeroWrapper from '@/components/common/PageHeroWrapper'

const TermsOfServicePage = () => {
	return (
		<main>
			<PageHeroWrapper
				heading='Zenovate Terms of service'
				description='At Zenovate, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, disclose, and safeguard your data when you visit our website or use our services.'
			/>

			<section className='py-10 md:py-20 lg:py-32'>
				<div className='w-full max-w-[1550px] mx-auto px-[5vw] sm:px-[3.5vw] lg:px-[3vw]'>
					<div className='grid lg:grid-cols-2 gap-10 max-w-[1100px]'>
						<div className='max-w-[700px] space-y-6'>
							<h3 className='text-lg md:text-xl font-semibold text-Black-100'>Acceptance of Terms</h3>
							<p className='text-Black-100 text-base'>
								By using Zenovate&apos;s website and services, you signify your agreement to these Terms of Service and
								our Privacy Policy. If you do not agree to these terms, please do not use our platform.
							</p>
						</div>
						<div className='max-w-[700px] space-y-6'>
							<h3 className='text-lg md:text-xl font-semibold text-Black-100'>Use of Services</h3>
							<p className='text-Black-100 text-base'>
								Zenovate&apos;s personalized wellness services are intended for individuals aged 18 and over. By
								using our services, you represent that you are of legal age and that the information you provide is
								accurate and complete
							</p>
						</div>
					</div>
				</div>
			</section>
		</main>
	)
}

export default TermsOfServicePage
