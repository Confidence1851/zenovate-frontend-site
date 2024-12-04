'use client' // Required for client-side hooks
import SubmitButton from '@/components/auth-form/SubmitButton'
import BottomCta from '@/components/auth-form/BottomCta'
import Wrapper from '@/components/auth-form/Wrapper'
import { FieldValues, useForm } from 'react-hook-form'
import ValidationInput from '@/components/auth-form/ValidationInput'
import ValidatePasswordInput from '@/components/auth-form/ValidatePasswordInput'
import useRegisterUser from '@/hooks/useRegister'

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
						<SubmitButton isLoading={isPending} text='sign up' />
					</div>
					<BottomCta type='signin' />
				</form>
			</Wrapper>
		</>
	)
}
