'use client' // Required for client-side hooks

import { useState } from 'react'

import PasswordInput from '@/components/auth-form/PasswordInput'
import SubmitButton from '@/components/auth-form/SubmitButton'
import BottomCta from '@/components/auth-form/BottomCta'
import Wrapper from '@/components/auth-form/Wrapper'

export default function Reset() {
	const [isLoading, setIsloading] = useState<boolean>(false)
	const [password, setPassword] = useState<string>('')
	const [confirmPassword, setConfirmPassword] = useState<string>('')

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setIsloading(false)
	}

	return (
		<>
			<Wrapper
				heading='reset your password'
				mobParagraph='Enter a new password for your account'
				paragraph='Enter a new password for your account'
			>
				<form onSubmit={handleSubmit} className='mt-6 space-y-6'>
					<PasswordInput value={password} setValue={setPassword} label='new password' />
					<PasswordInput value={confirmPassword} setValue={setConfirmPassword} label='new password' />
					<SubmitButton isLoading={isLoading} text='reset password' />
					<BottomCta type='back' />
				</form>
			</Wrapper>
		</>
	)
}
