'use client'
import copy from '@/assets/svgs/copy.svg'
import ProductTable from '@/components/dashboard/ProductTable'
import { Textarea } from '@/components/ui/textarea'
import Image from 'next/image'

export default function ProductDetails({ params }: { params: { productId: string } }) {
	const productId = params.productId
	console.log(productId)

	const customerInfo = {
		title: 'customer',
		details: [
			{ prefix: 'name', value: 'Jane doe' },
			{ prefix: 'email', value: 'email@domain.net' },
			{ prefix: 'phone', value: '+1 234 567 890' }
		]
	}
	const orderInfo = {
		title: 'order info',
		details: [
			{ prefix: 'shipping', value: 'Random shipping company' },
			{ prefix: 'Payment method', value: 'stripe' },
			{ prefix: 'status', value: 'approved' }
		]
	}
	const paymentInfo = {
		title: 'payment info',
		details: [
			{ prefix: 'visa card', value: '**** **** **** 7890' },
			{ prefix: 'Business name', value: 'jane doe' },
			{ prefix: 'phone', value: '+1 234 567 890' }
		]
	}

	return (
		<div className='max-w-7xl mx-auto w-full'>
			<h2 className='uppercase text-black font-semibold text-2xl sm:text-3xl lg:text-[34px] lg:leading-tight'>
				order details
			</h2>
			<div className='mt-7 lg:mt-10 space-y-8 md:space-y-12 lg:space-y-16'>
				<div className='flex justify-between items-start lg:grid grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-8 flex-wrap content-start'>
					<div>
						<h2 className='font-semibold text-lg sm:text-xl text-black'>ORDER ID: #000000</h2>
						<p className='uppercase font-semibold text-[#94A3B8] text-sm mt-2 mb-2.5'>tue, october 13, 2024</p>
						<span className='bg-[#F7F7F5] py-1 px-2.5 text-xs text-[#2E522A] font-semibold'>COMPLETED</span>
					</div>
					<div className='flex items-center justify-end'>
						<button className='flex items-center justify-center bg-[#F7F7F5] py-1.5 px-4 text-lg uppercase text-black font-medium gap-2'>
							copy
							<Image src={copy} alt='copy' />
						</button>
					</div>
				</div>
				<div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-8 '>
					<div>
						<OrderInfo data={customerInfo} />
					</div>
					<div>
						<OrderInfo data={orderInfo} />
					</div>
				</div>
				<div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-8 '>
					<div>
						<OrderInfo data={paymentInfo} />
					</div>
					<div>
						<h2 className='font-semibold text-lg sm:text-xl text-black uppercase'>Notes</h2>
						<Textarea placeholder='TYPE A NOTE..' className='border border-[#CBD5E1] mt-2.5' rows={3} />
					</div>
				</div>
				<div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-5 '>
					<div></div>
					<div className='flex justify-end'>
						<button
							type='submit'
							className='h-[43px] bg-transparent border border-[#CBD5E1] flex justify-center items-center px-4 w-[120px]'
						>
							<div className='w-full justify-between items-center flex'>
								<p className='text-dark text-lg font-semibold uppercase'>save</p>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 24 24'
									strokeWidth='1.5'
									stroke='currentColor'
									className='size-6 text-dark'
								>
									<path strokeLinecap='round' strokeLinejoin='round' d='M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3' />
								</svg>
							</div>
						</button>
					</div>
				</div>
			</div>
			<div className='mt-14 md:mt-16 xl:mt-20'>
				<ProductTable />
			</div>
		</div>
	)
}

function OrderInfo({
	data
}: {
	data: {
		title: string
		details: {
			prefix: string
			value: string
		}[]
	}
}) {
	return (
		<>
			<h2 className='font-semibold text-lg sm:text-xl text-black uppercase'>{data.title}</h2>
			<div className='mt-2 space-y-2 *:capitalize *:text-black *:font-semibold *:text-sm *:*:text-[#94A3B8]'>
				{data.details.map((item, index) => (
					<p key={index}>
						<span>{item.prefix}: </span>
						{item.value}
					</p>
				))}
			</div>
		</>
	)
}
