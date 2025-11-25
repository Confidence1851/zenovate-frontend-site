'use client'
import copy from '@/assets/svgs/copy.svg'
import ProductTable from '@/components/dashboard/ProductTable'
import { Textarea } from '@/components/ui/textarea'
import { ordersListDetails } from '@/server-actions/api.actions'
import { OrderDetail } from '@/types'
import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useState } from 'react'
import ScaleLoader from 'react-spinners/ScaleLoader'

export default function OrderDetailPage({ params }: { params: { detailsid: string } }) {
	const productId = params.detailsid
	const { data: session } = useSession();
	const [copied, setCopied] = useState(false);

	const { data: orderData, isLoading } = useQuery<OrderDetail>({
		queryKey: ['ordersDetails', productId, session?.accessToken],
		queryFn: async () => {
			{
				if (!session?.accessToken) {
					throw new Error('No access token available')
				}
				return ordersListDetails(session.accessToken, productId)
			}
		}
	})

	const customerInfo = {
		title: 'customer',
		details: [
			{ prefix: 'name', value: orderData?.metadata?.raw?.first_name },
			{ prefix: 'email', value: orderData?.metadata?.raw?.email },
			{ prefix: 'phone', value: orderData?.metadata?.raw?.phone_number }
		]
	}
	const orderInfo = {
		title: 'order info',
		details: orderData?.completed_payment ? [
			{ prefix: 'shipping Address', value: `${orderData?.completed_payment.metadata?.shipping_address?.line1 ?? ''}, ${orderData?.completed_payment.metadata?.shipping_address?.city ?? ''}, ${orderData?.completed_payment.metadata?.shipping_address?.state ?? ''},  ${orderData?.completed_payment.metadata?.shipping_address?.country ?? ''}.` },
			{ prefix: 'Payment method', value: "Stripe" },
			{ prefix: 'status', value: orderData?.status }
		] : []
	}
	const paymentInfo = {
		title: 'payment info',
		details: orderData?.completed_payment ? [
			{
				prefix: `Card Number`,
				value: `**** **** **** ${orderData?.completed_payment.method_info?.last_digits ?? ''}`
			},
			{ prefix: 'Brand', value: orderData?.completed_payment.method_info?.brand ?? '' },
			{
				prefix: 'Expiry Date',
				value: `${orderData?.completed_payment.method_info?.exp_month ?? ''}/${orderData?.completed_payment.method_info?.exp_year ?? ''}`
			},
			...(orderData?.completed_payment?.discount_code ? [
				{ prefix: 'Discount Code', value: orderData.completed_payment.discount_code }
			] : []),
			...(orderData?.completed_payment?.discount_amount ? [
				{ prefix: 'Discount Amount', value: orderData.completed_payment.discount_amount }
			] : []),
		] : []
	}

	const handleCopy = () => {
		const reference = orderData?.reference;
		if (reference) {
			navigator.clipboard.writeText(reference).then(() => {
				setCopied(true);
				setTimeout(() => setCopied(false), 2000); // Reset "copied" state after 2 seconds
			});
		}
	};

	return (
		<div className='max-w-7xl mx-auto w-full'>
			<h2 className='uppercase text-black font-semibold text-2xl sm:text-3xl lg:text-[34px] lg:leading-tight'>
				Order Details
			</h2>
			<div>
				{isLoading ? (
					<div className='w-full flex justify-center mt-7 lg:mt-10'>
						<ScaleLoader />
					</div>
				) : (
					<>
						<div className='mt-7 lg:mt-10 space-y-8 md:space-y-12 lg:space-y-16'>
							<div className='flex justify-between items-start lg:grid grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-8 flex-wrap content-start'>
								<div>
									<h2 className='font-semibold text-lg sm:text-xl text-black'>ORDER ID: #{orderData?.reference}</h2>
									<p className='uppercase font-semibold text-[#94A3B8] text-sm mt-2 mb-2.5'>{orderData?.created_at}</p>
								</div>
								<div className='flex items-center justify-end'>
									<button onClick={handleCopy}
										className='flex items-center justify-center bg-[#F7F7F5] py-1.5 px-4 text-lg uppercase  font-medium gap-2'>
										{copied ? 'Copied!' : 'Copy'}
										<Image src={copy} alt='copy' />
									</button>
								</div>
							</div>
							<div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-x-8 gap-y-8 '>
								<div>
									<OrderInfo data={customerInfo} />
								</div>

								{orderData?.completed_payment && <div>
									<OrderInfo data={orderInfo} />
								</div>
								}
							</div>{orderData?.completed_payment &&
								<div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-x-8 gap-y-8 '>
									<div>
										<OrderInfo data={paymentInfo} />
									</div>

									<div>
										<h2 className='font-semibold text-lg sm:text-xl text-black uppercase'>Comments</h2>
										<Textarea readOnly placeholder='' value={orderData?.comment ?? ''} className='border border-[#CBD5E1] mt-2.5' rows={3} />
									</div>
								</div>
							}
						</div>
						<div className='mt-14 md:mt-16 xl:mt-20'>
							<ProductTable products={orderData?.products ?? []} paymentProducts={orderData?.completed_payment?.products ?? []} />
						</div>
					</>
				)}
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
			value: string | null | undefined
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
