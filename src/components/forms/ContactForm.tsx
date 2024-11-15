'use client'

import FormInputText from '@/components/common/FormInputText'
import { Form } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { ArrowRight } from 'iconsax-react'
import { contactSchema } from '@/schemas/formSchema'
import FormTextArea from '../common/FormTextArea'

const ContactForm = () => {
	const form = useForm({
		resolver: zodResolver(contactSchema),
		mode: 'all'
	})

	const {
		control,
		handleSubmit,
		formState: { errors }
	} = form
	const onSubmit = async () => {
		console.log('submitted')
	}
	return (
		<div>
			<Form {...form}>
				<form onSubmit={handleSubmit(onSubmit)} className=' space-y-8 md:space-y-11 py-4 max-w-[1200px]'>
					<div className='grid lg:grid-cols-2 gap-4 md:gap-5 lg:gap-6'>
						<div className='col-span-2 md:col-span-1'>
							<FormInputText
								name='fullname'
								label='full name'
								placeholder='email@domain.com'
								control={control}
								errors={errors}
								className='1border !border-[#162C15] !h-12 !text-base '
							/>
						</div>
						<div className='col-span-2 md:col-span-1'>
							<FormInputText
								name='email'
								label='Email address'
								placeholder='email@domain.com'
								control={control}
								errors={errors}
								className='1border !border-[#162C15] !h-12 !text-base '
							/>
						</div>
						<div className='col-span-2 md:col-span-1'>
							<FormInputText
								name='phone'
								label='Phone'
								placeholder='+1 234 567 890'
								control={control}
								errors={errors}
								className='1border !border-[#162C15] !h-12 !text-base '
							/>
						</div>
						<div className='col-span-2 md:col-span-1'>
							<FormInputText
								name='subject'
								label='subject'
								placeholder='I have an enquiry'
								control={control}
								errors={errors}
								className='1border !border-[#162C15] !h-12 !text-base '
							/>
						</div>
						<div className='col-span-2'>
							<FormTextArea
								rows={5}
								name='message'
								label='MESSAGE'
								placeholder='your message goes here....'
								control={control}
								errors={errors}
								className='1border !border-[#162C15] !text-base'
							/>
						</div>
					</div>

					<button
						type='submit'
						className='w-full bg-Black-100 text-White-100 h-11 flex justify-between items-center p-4 max-w-[250px]'
					>
						<span className='uppercase'>send message</span>
						<ArrowRight size='24' className='text-secondary-foreground' />
					</button>
				</form>
			</Form>
		</div>
	)
}

export default ContactForm
