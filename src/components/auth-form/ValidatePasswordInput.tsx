'use client'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import styles from '@/styles/Auth.module.css'

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
			<Label className={styles.inputLabel}>{label}</Label>
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
					className={`border ${errors[name] ? 'border-red-500' : 'border-muted-foreground'} ${styles.inputField}`}
					placeholder={placeholder}
					type={isVisible ? 'text' : 'password'}
				/>
				<button
					className={styles.showPassword}
					type='button'
					onClick={toggleVisibility}
					aria-label={isVisible ? 'Hide password' : 'Show password'}
					aria-pressed={isVisible}
					aria-controls='password'
				>
					{isVisible ? (
						<EyeOff size={16} strokeWidth={2} aria-hidden='true' color='muted-foreground' />
					) : (
						<Eye size={16} strokeWidth={2} aria-hidden='true' color='muted-foreground' />
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
