'use client' // Required for client-side hooks

import { useState } from 'react'
import Wrapper from '@/components/auth-form/Wrapper'
import GenericInput from '@/components/auth-form/GenericInput'
import SubmitButton from '@/components/auth-form/SubmitButton'
import BottomCta from '@/components/auth-form/BottomCta'
import useForgotPassword from '@/hooks/useForgotPassword'

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
			<Wrapper
				heading='forgot your password?'
				paragraph="Oops! Did your password go on a vacation without you? No worries! Just enter your email below, and we'll
								send a reset link to help you get back into your account. Let's make sure your wellness journey doesn't
								miss a beat!"
				mobParagraph='Enter your email address to receive a password reset link'
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
			</Wrapper>
		</>
	)
}
