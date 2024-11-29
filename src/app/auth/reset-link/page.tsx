'use client' // Required for client-side hooks

import { useState } from 'react'

import PasswordInput from '@/components/auth-form/PasswordInput'
import SubmitButton from '@/components/auth-form/SubmitButton'
import BottomCta from '@/components/auth-form/BottomCta'
import Wrapper from '@/components/auth-form/Wrapper'
import Link from 'next/link'

export default function SentLink() {
	const [isLoading, setIsloading] = useState<boolean>(false)

	const email = 'email@domain.com'

	const handleClick = async () => {
		setIsloading(false)
	}

	return (
		<>
			<Wrapper customHeading>
				<div className='text-center sm:text-left'>
					<h1 className='text-black uppercase text-3xl sm:text-[42px] sm:leading-tight  font-semibold '>
						check your email
					</h1>
					<p className='text-sm mt-[5px] uppercase  text-[#94A3B8] sm:text-base max-w-[70%] xl:max-w-full mx-auto'>
						We’ve sent a password reset link to <span className='text-[#162C15]'>{email} </span> Please check your inbox
					</p>
				</div>
				<div className='mt-6 space-y-6'>
					<div className=''>
						<button
							onClick={handleClick}
							className='h-[43px] px-4 mb-3 text-left bg-transparent text-xs font-semibold border border-[#CBD5E1] w-full uppercase text-black'
						>
							resend link
						</button>
						<Link href='/auth/reset-password'>
							<SubmitButton isLoading={isLoading} text='continue to reset password' />
						</Link>
					</div>
					<BottomCta type='signup' />
				</div>
			</Wrapper>
		</>
	)
}
