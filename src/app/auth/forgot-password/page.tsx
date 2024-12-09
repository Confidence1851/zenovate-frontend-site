'use client'

import { useState } from 'react'
import AuthLayout from '@/app/layouts/AuthLayout'
import GenericInput from '@/components/auth-form/GenericInput'
import SubmitButton from '@/components/auth-form/SubmitButton'
import BottomCta from '@/components/auth-form/BottomCta'
import useForgotPassword from '@/hooks/useForgotPassword'

import LoginImage from '@/assets/images/f35ccf45b3bd9fcfb4b68977aed32fa1.jpg'


export default function ForgotPassword() {
	const [email, setEmail] = useState<string>('')

	const { mutate, isPending } = useForgotPassword()

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		mutate({
			email: email
		})
	}

	return (
		<>
			<AuthLayout
				heading='forgot your password?'
				mobParagraph='Enter your email address to receive a password reset link'
				backgroundImage={LoginImage}
			>
				<form onSubmit={handleSubmit} className='mt-6 space-y-6'>
					<GenericInput
						type='email'
						value={email}
						setValue={setEmail}
						placeholder='email@domain.com'
						label='Email address'
						required
					/>
					<div className='pt-2'>
						<SubmitButton isLoading={isPending} text='send reset link' />
					</div>
					<BottomCta />
				</form>
			</AuthLayout>
		</>
	)
}
