'use client' // Required for client-side hooks

import { useState } from 'react'

import GenericInput from '@/components/auth-form/GenericInput'
import PasswordInput from '@/components/auth-form/PasswordInput'
import SubmitButton from '@/components/auth-form/SubmitButton'
import BottomCta from '@/components/auth-form/BottomCta'
import Wrapper from '@/components/auth-form/Wrapper'
import { FieldValues, useForm } from 'react-hook-form'
import ValidationInput from '@/components/auth-form/ValidationInput'
import ValidatePasswordInput from '@/components/auth-form/ValidatePasswordInput'
import { registerUser } from '@/server-actions/api.actions'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

export default function SignUp() {
	const {
		register,
		handleSubmit,
		formState: { errors },
		getValues,
		reset
	} = useForm()
	const [isLoading, setIsloading] = useState<boolean>(false)
	const router = useRouter()

	const onSubmit = async (data: FieldValues) => {
		setIsloading(true)
		try {
			const result = await registerUser({
				first_name: data.firstName,
				last_name: data.lastName,
				email: data.email,
				password: data.password
			})

			toast.success('Registration successful')
			router.push('/auth/login')
			reset()

			// Store token
			// if (result.token) {
			// 	localStorage.setItem('token', result.token)
			// }
		} catch (err) {
			console.error(err instanceof Error ? err.message : 'Registration failed')
			toast.error(err instanceof Error ? err.message : 'Registration failed')
		} finally {
			setIsloading(false)
		}
	}

	return (
		<>
			<Wrapper
				heading='create an account'
				mobParagraph='Create your account and start your journey to better health and wellness'
				paragraph="Ready to embark on your Zenovate wellness adventure? Creating an account is the first step towards unlocking your full potential. Fill out the form below, and let's start crafting your personalized nutrient therapy plan together!"
			>
				<form onSubmit={handleSubmit(onSubmit)} className='mt-6 space-y-6'>
					<ValidationInput
						name='firstName'
						errors={errors}
						register={register}
						errorMsg='first name is required'
						type='text'
						placeholder='john'
						label='first name'
					/>
					<ValidationInput
						name='lastName'
						errors={errors}
						register={register}
						errorMsg='last name is required'
						type='text'
						placeholder='doe'
						label='last name'
					/>
					<ValidationInput
						name='email'
						errors={errors}
						register={register}
						errorMsg='email address is required'
						type='email'
						placeholder='email@domain.com'
						label='Email address'
					/>

					<ValidatePasswordInput
						getValues={getValues}
						errors={errors}
						register={register}
						label='password'
						name='password'
					/>
					<ValidatePasswordInput
						getValues={getValues}
						errors={errors}
						register={register}
						label='confirm password'
						name='confirmPassword'
						confirmPasswordInput
						nameToConfirm='password'
					/>

					<div className='pt-2'>
						<SubmitButton isLoading={isLoading} text='sign up' />
					</div>
					<BottomCta type='signin' />
				</form>
			</Wrapper>
		</>
	)
}
