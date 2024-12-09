import Link from 'next/link'

type BottomCtaType = {
	type?: 'signin' | 'signup' | 'back'
}

export default function BottomCta({ type = 'signup' }: BottomCtaType) {
	return (
		<div className='flex justify-center pt-2'>
			{type === 'signup' ? (
				<Link className='' href={'/auth/sign-up'}>
					<p className='text-xs text-foreground font-regular'>
						Don’t have an account? <span className='font-semibold'>Sign up</span>
					</p>
				</Link>
			) : type === 'signin' ? (
				<Link className='' href={'/auth/login'}>
					<p className='text-xs text-foreground font-regular'>
						Already have an account? <span className='font-semibold'>Sign in here!</span>
					</p>
				</Link>
			) : (
				<Link className='' href={'/auth/login'}>
					<p className='text-xs text-foreground font-regular'>
						<span className='font-semibold'>Back to sign in</span>
					</p>
				</Link>
			)}
		</div>
	)
}
