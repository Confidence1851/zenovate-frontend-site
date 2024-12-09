import Link from 'next/link'
import styles from '@/styles/Error.module.css'
import MainLayout from '@/app/layouts/MainLayout'


const NotFoundPage = () => {
	return (
		<MainLayout>
			<div className={styles.mainParent}>
				<div className={styles.container}>
					{/* right side  */}
					<div className='space-y-10'>
						<div className='space-y-3'>
							<h1 className='text-lg md:text-xl lg:text-2xl uppercase font-semibold tracking-wider'>
								oops! page not found
							</h1>
							<p className='text-base text-Gray-100 font-normal text-pretty'>
								We can’t seem to find the page you’re looking for. <br /> It might have been moved or doesn’t exist anymore.
							</p>
						</div>
						{/* button  */}
						<Link
							href="/"
							className="inline-block px-6 py-3 bg-Green-100 text-white uppercase font-medium rounded-md hover:bg-Green-300 transition-colors"
						>
							Back to Home
						</Link>
					</div>
					{/* left side  */}
					{/* 
				<div className='w-full flex justify-center items-center'>
					<h1 className='text-2xl md:text-4xl lg:text-8xl font-bold text-center'>IMAGE HERE</h1>
				</div> */}
				</div>
			</div>
		</MainLayout>
	)
}

export default NotFoundPage
