'use client' // Required for client-side hooks

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import toast from 'react-hot-toast'
import GenericInput from '@/components/auth-form/GenericInput'
import PasswordInput from '@/components/auth-form/PasswordInput'
import SubmitButton from '@/components/auth-form/SubmitButton'
import BottomCta from '@/components/auth-form/BottomCta'
import Wrapper from '@/components/auth-form/Wrapper'

export default function LoginPage() {
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [isLoading, setIsloading] = useState<boolean>(false)
	const router = useRouter()

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		if (email && password) {
			setIsloading(true)

			const result = await signIn('credentials', {
				email,
				password,
				redirect: false
			})

			console.log(result)

			if (result?.error) {
				setIsloading(false)
				const errorData = JSON.parse(result.error)
				if (errorData?.message) {
					toast.error(errorData.message)
				} else {
					toast.error('An error occured')
				}
			} else {
				router.push('/dashboard/orders')
				setIsloading(false)
			}
		} else {
			toast.error('All fields are required!')
		}
	}

	return (
		<>
			<Wrapper
				heading='welcome back!'
				mobParagraph='sign in to continue your health journey with us'
				paragraph="Welcome back, wellness warrior! Please enter your email and password below to access your personalized
								nutrient therapy dashboard. Let's pick up where you left off on your journey to optimal health!"
			>
				<form onSubmit={handleSubmit} className='mt-6 space-y-6'>
					<GenericInput
						type='email'
						value={email}
						setValue={setEmail}
						required
						placeholder='email@domain.com'
						label='Email address'
					/>
					<PasswordInput value={password} setValue={setPassword} placeholder='password' label='password' />
					<div className='flex justify-end'>
						<p className='text-xs text-[#2E522A] font-semibold'>
							Forgot your password?{' '}
							<span>
								<Link className='underline' href={'/auth/forgot-password'}>
									Reset it here
								</Link>
							</span>
						</p>
					</div>
					<div className='pt-2'>
						<SubmitButton isLoading={isLoading} text='sign in' />
					</div>
					<BottomCta />
				</form>
			</Wrapper>
		</>
	)
}
