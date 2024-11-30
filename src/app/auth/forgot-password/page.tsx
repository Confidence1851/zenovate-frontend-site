'use client' // Required for client-side hooks

import { useState } from 'react'
import Wrapper from '@/components/auth-form/Wrapper'
import GenericInput from '@/components/auth-form/GenericInput'
import SubmitButton from '@/components/auth-form/SubmitButton'
import BottomCta from '@/components/auth-form/BottomCta'
import { forgotPassword } from '@/server-actions/api.actions'
import toast from 'react-hot-toast'

export default function ForgotPassword() {
	const [email, setEmail] = useState<string>('')
	const [isLoading, setIsloading] = useState<boolean>(false)

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		if (email) {
			setIsloading(true)
			try {
				const result = await forgotPassword({
					email: email
				})

				toast.success('Registration successful')
				// router.push('/auth/login')
			} catch (err) {
				console.error(err instanceof Error ? err.message : 'an error occured')
				toast.error(err instanceof Error ? err.message : 'an error occured')
			} finally {
				setIsloading(false)
			}
		}
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
						<SubmitButton isLoading={isLoading} text='send reset link' />
					</div>
					<BottomCta />
				</form>
			</Wrapper>
		</>
	)
}
