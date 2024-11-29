'use client'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

type PasswordInputType = {
	value: string | number
	placeholder?: string
	setValue: React.Dispatch<React.SetStateAction<string>> | React.Dispatch<React.SetStateAction<string | number>>
	label: string
}

export default function PasswordInput({
	value,
	placeholder = '*******************',
	setValue,
	label = 'Password'
}: PasswordInputType) {
	const [isVisible, setIsVisible] = useState<boolean>(false)
	const toggleVisibility = () => setIsVisible((prevState) => !prevState)

	return (
		<div>
			<Label className='text-xs text-[#162C15] uppercase font-semibold'>{label}</Label>
			<div className='relative'>
				<Input
					value={value}
					onChange={(e) => setValue(e.target.value)}
					required
					className='border border-[#CBD5E1] placeholder:uppercase placeholder:text-sm placeholder:text-[#94A3B8] rounded-none outline-none h-[43px] px-3 mt-2'
					placeholder={placeholder}
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
	)
}
