'use client'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

import { FieldErrors, FieldValues, UseFormRegister, UseFormGetValues } from 'react-hook-form'

type ValidatePasswordInputType = {
	name: string
	placeholder?: string
	register: UseFormRegister<FieldValues>
	label: string
	errors: FieldErrors<FieldValues>
	confirmPasswordInput?: boolean
	nameToConfirm?: string
	getValues: UseFormGetValues<FieldValues>
}

export default function ValidatePasswordInput({
	placeholder = '*******************',
	name,
	register,
	errors,
	label = 'Password',
	confirmPasswordInput = false,
	nameToConfirm,
	getValues
}: ValidatePasswordInputType) {
	const [isVisible, setIsVisible] = useState<boolean>(false)
	const toggleVisibility = () => setIsVisible((prevState) => !prevState)

	return (
		<div>
			<Label className='text-xs text-[#162C15] uppercase font-semibold'>{label}</Label>
			<div className='relative'>
				<Input
					{...(!confirmPasswordInput
						? {
								...register(name, {
									required: 'password is required',
									minLength: {
										value: 8,
										message: 'Password must be at least 8 characters long'
									},
									pattern: {
										value: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
										message: 'Password must contain a capital letter, a number, and a special character'
									}
								})
							}
						: {
								...register(name, {
									required: 'confirm your password',
									validate: (value) => value === getValues(nameToConfirm as string) || 'passwords must match'
								})
							})}
					className={`border ${errors[name] ? 'border-red-500' : 'border-[#CBD5E1]'} placeholder:uppercase placeholder:text-sm placeholder:text-[#94A3B8] rounded-none outline-none h-[43px] px-3 mt-2`}
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
				{errors[name] && (
					<p className='text-red-500 absolute bottom-[-18px] text-xs first-letter:capitalize '>
						{(errors[name] as { message: string }).message}
					</p>
				)}
			</div>
		</div>
	)
}
