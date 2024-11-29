'use client' // Required for client-side hooks

import { useState } from 'react'

import GenericInput from '@/components/auth-form/GenericInput'
import PasswordInput from '@/components/auth-form/PasswordInput'
import SubmitButton from '@/components/auth-form/SubmitButton'
import BottomCta from '@/components/auth-form/BottomCta'
import Wrapper from '@/components/auth-form/Wrapper'

export default function SignUp() {
	const [firstName, setFirstName] = useState<string>('')
	const [lastName, setLastName] = useState<string>('')
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [confirmPassword, setConfirmPassword] = useState<string>('')
	const [isLoading, setIsloading] = useState<boolean>(false)
	// const router = useRouter()

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setIsloading(false)
	}

	return (
		<>
			<Wrapper
				heading='create an account'
				mobParagraph='Create your account and start your journey to better health and wellness'
				paragraph="Ready to embark on your Zenovate wellness adventure? Creating an account is the first step towards unlocking your full potential. Fill out the form below, and let's start crafting your personalized nutrient therapy plan together!"
			>
				<form onSubmit={handleSubmit} className='mt-6 space-y-6'>
					<GenericInput
						type='text'
						value={firstName}
						setValue={setFirstName}
						required
						placeholder='john'
						label='first name'
					/>
					<GenericInput
						type='text'
						value={lastName}
						setValue={setLastName}
						required
						placeholder='doe'
						label='last name'
					/>
					<GenericInput
						type='email'
						value={email}
						setValue={setEmail}
						required
						placeholder='email@domain.com'
						label='Email address'
					/>
					<PasswordInput value={password} setValue={setPassword} label='password' />
					<PasswordInput value={confirmPassword} setValue={setConfirmPassword} label=' confirm password' />

					<SubmitButton isLoading={isLoading} text='sign up' />
					<BottomCta type='signin' />
				</form>
			</Wrapper>
		</>
	)
}
