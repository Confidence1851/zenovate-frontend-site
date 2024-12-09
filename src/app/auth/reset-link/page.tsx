'use client'

import { useState } from 'react'

import SubmitButton from '@/components/auth-form/SubmitButton'
import BottomCta from '@/components/auth-form/BottomCta'
import AuthLayout from '@/app/layouts/AuthLayout'
import Link from 'next/link'
import styles from '@/styles/Auth.module.css'

import LoginImage from '@/assets/images/f35ccf45b3bd9fcfb4b68977aed32fa1.jpg'


export default function SentLink() {
	const [isLoading, setIsloading] = useState<boolean>(false)

	const email = 'email@domain.com'

	const handleClick = async () => {
		setIsloading(false)
	}

	return (
		<>
			<AuthLayout
				customHeading
				backgroundImage={LoginImage}
			>
				<div className='text-center sm:text-left'>
					<h1 className={styles.mainHeader}>
						check your email
					</h1>
					<p className={styles.mainParagraph}>
						We’ve sent a password reset link to <span className='text-foreground'>{email} </span> Please check your inbox
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
			</AuthLayout>
		</>
	)
}
