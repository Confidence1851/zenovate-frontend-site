'use client'

import { useState } from 'react'

import PasswordInput from '@/components/auth-form/PasswordInput'
import SubmitButton from '@/components/auth-form/SubmitButton'
import BottomCta from '@/components/auth-form/BottomCta'
import AuthLayout from '@/app/layouts/AuthLayout'
import { useParams } from 'next/navigation'

export default function Reset() {
	const [isLoading, setIsloading] = useState<boolean>(false)
	const [password, setPassword] = useState<string>('')
	const [confirmPassword, setConfirmPassword] = useState<string>('')
	const params = useParams();
	const hash = params?.hash ?? "";

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setIsloading(false)
	}

	return (
		<>
			<AuthLayout
				heading='reset your password'
				mobParagraph='Enter a new password for your account'
				paragraph='Enter a new password for your account'
			>
				<form onSubmit={handleSubmit} className='mt-6 space-y-6'>
					<input type="hidden" name="hash" value={hash} />
					<PasswordInput value={password} setValue={setPassword} label='new password' />
					<PasswordInput value={confirmPassword} setValue={setConfirmPassword} label='new password' />
					<div className='pt-2'>
						<SubmitButton isLoading={isLoading} text='reset password' />
					</div>
					<BottomCta type='back' />
				</form>
			</AuthLayout>
		</>
	)
}
