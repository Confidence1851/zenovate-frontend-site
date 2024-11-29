'use client' // Required for client-side hooks

import { useState } from 'react'
import Wrapper from '@/components/auth-form/Wrapper'
import GenericInput from '@/components/auth-form/GenericInput'
import SubmitButton from '@/components/auth-form/SubmitButton'
import BottomCta from '@/components/auth-form/BottomCta'

export default function ForgotPassword() {
	const [email, setEmail] = useState<string>('')

	// tempoary until functionality for page is worked on
	const isLoading = false

	return (
		<>
			<Wrapper
				heading='forgot your password?'
				paragraph="Oops! Did your password go on a vacation without you? No worries! Just enter your email below, and we'll
								send a reset link to help you get back into your account. Let's make sure your wellness journey doesn't
								miss a beat!"
				mobParagraph='Enter your email address to receive a password reset link'
			>
				<form className='mt-6 space-y-6'>
					<GenericInput
						type='email'
						value={email}
						setValue={setEmail}
						placeholder='email@domain.com'
						label='Email address'
						required
					/>

					<SubmitButton isLoading={isLoading} text='send reset link' />
					<BottomCta />
				</form>
			</Wrapper>
		</>
	)
}
