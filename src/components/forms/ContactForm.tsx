'use client'

import FormInputText from '@/components/common/FormInputText'
import { Form } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FieldValues, useForm } from 'react-hook-form'
import { contactSchema } from '@/schemas/formSchema'
import FormTextArea from '../common/FormTextArea'
import useContactUs from '@/hooks/useContactUs'
import ScaleLoader from 'react-spinners/ScaleLoader'
import { CTAButton } from '../common/CTAButton'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import { useState, useEffect } from 'react'

const ContactForm = () => {
	const form = useForm({
		resolver: zodResolver(contactSchema),
		mode: 'all',
		defaultValues: {
			fullname: '',
			email: '',
			phone: '',
			subject: '',
			message: ''
		}
	})

	const {
		control,
		handleSubmit,
		formState: { errors },
		reset
	} = form

	const { executeRecaptcha } = useGoogleReCaptcha()
	const { mutate, isPending, isSuccess, reset: resetMutation } = useContactUs()
	const [isSubmitting, setIsSubmitting] = useState(false)

	// Reset form when mutation succeeds
	useEffect(() => {
		if (isSuccess) {
			// Reset form with empty values
			reset({
				fullname: '',
				email: '',
				phone: '',
				subject: '',
				message: ''
			}, {
				keepErrors: false,
				keepDirty: false,
				keepIsSubmitted: false,
				keepTouched: false,
				keepIsValid: false,
				keepSubmitCount: false
			})
			// Reset mutation state to allow another submission
			resetMutation()
		}
	}, [isSuccess, reset, resetMutation])

	const onSubmit = async (data: FieldValues) => {
		if (!executeRecaptcha) {
			console.error('reCAPTCHA not loaded')
			return
		}

		setIsSubmitting(true)
		try {
			// Execute reCAPTCHA v3
			const recaptchaToken = await executeRecaptcha('contact_form')

			mutate({
				email: data.email,
				name: data.fullname,
				phone: data.phone,
				subject: data.subject,
				message: data.message,
				recaptcha_token: recaptchaToken
			})
		} catch (error) {
			console.error('reCAPTCHA error:', error)
		} finally {
			setIsSubmitting(false)
		}
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
								placeholder='Enter your full name'
								control={control}
								errors={errors}
								className='1border !border-foreground !h-12 !text-base '
							/>
						</div>
						<div className='col-span-2 md:col-span-1'>
							<FormInputText
								name='email'
								label='Email address'
								placeholder='email@domain.com'
								control={control}
								errors={errors}
								className='1border !border-foreground !h-12 !text-base '
							/>
						</div>
						<div className='col-span-2 md:col-span-1'>
							<FormInputText
								name='phone'
								label='Phone'
								placeholder='+1 234 567 890'
								control={control}
								errors={errors}
								className='1border !border-foreground !h-12 !text-base '
							/>
						</div>
						<div className='col-span-2 md:col-span-1'>
							<FormInputText
								name='subject'
								label='subject'
								placeholder='I have an enquiry'
								control={control}
								errors={errors}
								className='1border !border-foreground !h-12 !text-base '
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
								className='1border !border-foreground !text-base'
							/>
						</div>
					</div>

					<CTAButton
						type='submit'
						size='lg'
						disabled={isPending || isSubmitting}
						className={`bg-Black-100 text-White-100 min-w-[320px]  ${isPending || isSubmitting ? 'justify-center' : 'justify-between'} min-w-[320px]`}
					>
						{isPending || isSubmitting ? (
							<ScaleLoader color='#fafafa' height={18} />
						) : (
							<>
								<span className='uppercase'>send message</span>

							</>
						)}
					</CTAButton>
				</form>
			</Form>
		</div>
	)
}

export default ContactForm
