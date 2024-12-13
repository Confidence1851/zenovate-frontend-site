'use client'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import bgImage from '@/assets/images/67ea83927edd7f56d0f7.png'
import Image from 'next/image'
import axios from 'axios'
import ScaleLoader from 'react-spinners/ScaleLoader'
import toast from 'react-hot-toast'

const SubscriptionComponent = () => {
	const [email, setEmail] = useState<string>('')
	const [loading, setLoading] = useState<boolean>(false)
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		setLoading(true)

		try {
			const response = await axios.post(process.env.NEXT_PUBLIC_SERVER_URL + '/website/newsletter-subscribe', {
				email: email
			})
			toast.success(response.data.message)
		} catch (error) {
			if (axios.isAxiosError(error)) {
				if (error.response?.data?.message) {
					toast.error(error.response.data.message)
				} else {
					toast.error('An error occured')
				}
			} else {
				toast.error('An error occured')
			}
			console.error('Error making POST request:', error)
		} finally {
			setLoading(false)
		}
	}
	return (
		<div className='md:px-[3.5vw] lg:px-[3vw]'>
			<div className='w-full max-w-[1550px] mx-auto relative'>
				<Image src={bgImage} alt='Sign up Newsletter background image' fill className='object-cover' />
				<div className='relative flex flex-col gap-10 lg:py-20 py-10 px-[5vw] sm:px-[3.5vw] lg:px-4'>
					<h2 className='text-2xl md:text-3xl lg:text-5xl uppercase font-bold text-center text-[#fafafa]'>
						sign up for our newsletter
					</h2>
					<p className='text-center text-base md:text-xl max-w-[650px] mx-auto font-bold text-[#fafafa]'>
						Stay up-to-date with the latest news, exclusive offers, and expert insights from Zenovate.
					</p>
					<form onSubmit={handleSubmit} className='flex flex-col md:flex-row gap-4 w-full max-w-[550px] mx-auto'>
						<Input
							type='email'
							required
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder='email@domain.com'
							className='h-11 border border-White-100 placeholder:uppercase placeholder:text-White-100 text-White-100'
						/>
						<Button className='w-full sm:max-w-[107px] bg-[#fafafa] text-Green-100 hover:text-Green-100 hover:bg-[#fafafa] h-11 uppercase flex justify-center items-center'>
							{loading ? <ScaleLoader color='#48696E' height={18} /> : 'subscribe'}
						</Button>
					</form>
				</div>
				{/* success messge  */}
				{/* <div className='bg-Green-100 p-4'>
                    <h3 className='text-base text-White-100 text-center'>
                        We look forward to hearing from you and supporting you on your journey to optimal health and well-being!
                    </h3>
                </div> */}
			</div>
		</div>
	)
}

export default SubscriptionComponent
