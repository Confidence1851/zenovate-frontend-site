import Link from 'next/link'

type BottomCtaType = {
	type?: 'signin' | 'signup' | 'back'
}

export default function BottomCta({ type = 'signup' }: BottomCtaType) {
	return (
		<div className='flex justify-center'>
			{type === 'signup' ? (
				<Link className='' href={'/auth/sign-up'}>
					<p className='text-xs text-black font-semibold'>
						Don’t have an account? <span className='text-[#2E522A]'>Sign up</span>
					</p>
				</Link>
			) : type === 'signin' ? (
				<Link className='' href={'/auth/login'}>
					<p className='text-xs text-black font-semibold'>
						Already have an account? <span className='text-[#2E522A]'>Sign in here!</span>
					</p>
				</Link>
			) : (
				<Link className='' href={'/auth/login'}>
					<p className='text-xs text-black font-semibold'>
						<span className='text-[#2E522A]'>Back to sign in</span>
					</p>
				</Link>
			)}
		</div>
	)
}
