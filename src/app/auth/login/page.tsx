'use client' // Required for client-side hooks

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'
import toast from 'react-hot-toast'
import ScaleLoader from 'react-spinners/ScaleLoader'

export default function LoginPage() {
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [isLoading, setIsloading] = useState<boolean>(false)
	const router = useRouter()
	const [isVisible, setIsVisible] = useState<boolean>(false)

	const toggleVisibility = () => setIsVisible((prevState) => !prevState)

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setIsloading(true)

		// const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/login`, {
		//   method: "POST",
		//   headers: { "Content-Type": "application/json" },
		//   body: JSON.stringify({
		//     email: email,
		//     password: password,
		//   }),
		// });

		// console.log(res);

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
	}

	return (
		<>
			{/* <div className='flex min-h-[calc(100svh-73px)] items-center justify-center bg-gray-100'>
				<form onSubmit={handleSubmit} className='bg-white p-8 rounded shadow-md w-96'>
					<h1 className='text-2xl font-bold mb-6'>Sign In</h1>

					{error && <p className='text-red-500 mb-4'>{error}</p>}

					<div className='mb-4'>
						<label className='block text-gray-700 mb-2'>Email</label>
						<input
							type='email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
							className='w-full px-3 py-2 border rounded'
						/>
					</div>

					<div className='mb-4'>
						<label className='block text-gray-700 mb-2'>Password</label>
						<input
							type='password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
							className='w-full px-3 py-2 border rounded'
						/>
					</div>

					<button type='submit' className='w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600'>
						Sign In
					</button>
				</form>
			</div> */}
			<div className='grid min-h-[calc(100svh-73px)] px-[5vw] sm:px-[3vw] xl:px-0 grid-cols-1 xl:grid-cols-[58%,42%]'>
				<div className='hide-scrollbar py-6 flex items-center justify-start'>
					<div className='w-full max-w-[454px] mx-auto'>
						<div className='text-center sm:text-left'>
							<h1 className='text-black text-2xl sm:text-[42px] sm:leading-tight capitalize font-semibold '>
								welcome back!
							</h1>
							<p className='text-sm mt-1 uppercase  text-[#94A3B8] sm:hidden max-w-[70%] mx-auto'>
								sign in to continue your health journey with us
							</p>
							<p className='text-base mt-1 text-[#94A3B8] hidden sm:inline-block'>
								Welcome back, wellness warrior! Please enter your email and password below to access your personalized
								nutrient therapy dashboard. Let's pick up where you left off on your journey to optimal health!
							</p>
						</div>
						<form onSubmit={handleSubmit} className='mt-6 space-y-6'>
							<div>
								<Label className='text-xs text-[#162C15] uppercase font-semibold'>Email address</Label>
								<Input
									type='email'
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required
									className='border border-[#CBD5E1] placeholder:uppercase placeholder:text-[#94A3B8] rounded-none outline-none h-[43px] px-3 mt-2'
									placeholder='email@domain.com'
								/>
							</div>
							<div>
								<Label className='text-xs text-[#162C15] uppercase font-semibold'>Password</Label>
								<div className='relative'>
									<Input
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										required
										className='border border-[#CBD5E1] placeholder:uppercase placeholder:text-[#94A3B8] rounded-none outline-none h-[43px] px-3 mt-2'
										placeholder='Password'
										type={isVisible ? 'text' : 'password'}
									/>
									<button
										className='absolute inset-y-0 end-0 flex h-full w-10 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50'
										type='button'
										onClick={toggleVisibility}
										aria-label={isVisible ? 'Hide password' : 'Show password'}
										aria-pressed={isVisible}
										aria-controls='password'
									>
										{isVisible ? (
											<EyeOff size={16} strokeWidth={2} aria-hidden='true' color='#94A3B8' />
										) : (
											<Eye size={16} strokeWidth={2} aria-hidden='true' color='#94A3B8' />
										)}
									</button>
								</div>
							</div>
							<div className='flex justify-end'>
								<p className='text-xs text-[#2E522A] font-semibold'>
									Forgot your password?{' '}
									<span>
										<Link className='underline' href={'/'}>
											Reset it here
										</Link>
									</span>
								</p>
							</div>
							<button type='submit' className='h-[43px] bg-black flex justify-center items-center px-4 w-full'>
								{isLoading ? (
									<ScaleLoader color='#FFFFFF' height={18} />
								) : (
									<div className='w-full justify-between items-center flex'>
										<p className='text-white text-xs font-semibold uppercase'>sign in</p>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											fill='none'
											viewBox='0 0 24 24'
											stroke-width='1.5'
											stroke='currentColor'
											className='size-5 text-white'
										>
											<path stroke-linecap='round' stroke-linejoin='round' d='M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3' />
										</svg>
									</div>
								)}
							</button>
							<div className='flex justify-center'>
								<Link className='' href={'/'}>
									<p className='text-xs text-black font-semibold'>
										Don’t have an account? <span className='text-[#2E522A]'>Sign up</span>
									</p>
								</Link>
							</div>
						</form>
					</div>
				</div>
				<div className='bg-[#D9D9D9] hidden xl:inline-block h-full'></div>
			</div>
		</>
	)
}
