'use client'
import SubmitButton from '@/components/auth-form/SubmitButton'
import BottomCta from '@/components/auth-form/BottomCta'
import AuthLayout from '@/app/layouts/AuthLayout'
import { useForm } from 'react-hook-form'
import type { FieldValues } from 'react-hook-form'
import ValidationInput from '@/components/auth-form/ValidationInput'
import ValidatePasswordInput from '@/components/auth-form/ValidatePasswordInput'
import useRegisterUser from '@/hooks/useRegister'

import LoginImage from '@/assets/images/f35ccf45b3bd9fcfb4b68977aed32fa1.jpg'

export default function SignUp() {
	const {
		register,
		handleSubmit,
		formState: { errors },
		getValues,
		reset
	} = useForm()

	const { mutate, isPending } = useRegisterUser(reset)

	const onSubmit = async (data: FieldValues) => {
		mutate({
			first_name: data.firstName,
			last_name: data.lastName,
			email: data.email,
			password: data.password
		})
	}

	return (
		<>
			<AuthLayout
				heading='create an account'
				backgroundImage={LoginImage}
				paragraph="Ready to embark? Fill out the form below, and let's start your plan together!"
			>
				<form onSubmit={handleSubmit(onSubmit)} className='mt-6 space-y-2'>
					<div className='flex gap-2'>
						<div className='flex-1'>
							<ValidationInput
								name='firstName'
								errors={errors}
								register={register}
								errorMsg='first name is required'
								type='text'
								placeholder='John'
								label='first name'
							/>
						</div>
						<div className='flex-1'>
							<ValidationInput
								name='lastName'
								errors={errors}
								register={register}
								errorMsg='last name is required'
								type='text'
								placeholder='Doe'
								label='last name'
							/>
						</div>
					</div>
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
						<SubmitButton isLoading={isPending} text='sign up' />
					</div>
					<BottomCta type='signin' />
				</form>
			</AuthLayout>
		</>
	)
}
