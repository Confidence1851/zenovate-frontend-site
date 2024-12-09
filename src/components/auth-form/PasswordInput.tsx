'use client'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import styles from '@/styles/Auth.module.css'

type PasswordInputType = {
	value: string | number
	placeholder?: string
	setValue: React.Dispatch<React.SetStateAction<string>> | React.Dispatch<React.SetStateAction<string | number>>
	label: string
	autoComplete?: string;
}

export default function PasswordInput({
	value,
	placeholder = '*******************',
	setValue,
	autoComplete,
	label = 'Password'
}: PasswordInputType) {
	const [isVisible, setIsVisible] = useState<boolean>(false)
	const toggleVisibility = () => setIsVisible((prevState) => !prevState)

	return (
		<div>
			<Label className={styles.inputLabel}>{label}</Label>
			<div className='relative'>
				<Input
					value={value}
					onChange={(e) => setValue(e.target.value)}
					required
					className={styles.inputField}
					placeholder={placeholder}
					autoComplete={autoComplete}
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
			</div>
		</div>
	)
}
