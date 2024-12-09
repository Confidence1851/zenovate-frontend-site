import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import styles from '@/styles/Auth.module.css'

type GenericInputType = {
	type: 'text' | 'number' | 'email'
	value: string | number
	placeholder?: string
	setValue: React.Dispatch<React.SetStateAction<string>> | React.Dispatch<React.SetStateAction<string | number>>
	required: boolean
	label: string
	autoComplete?: string;
}

export default function GenericInput({
	type = 'text',
	value,
	placeholder,
	setValue,
	required = false,
	label,
	autoComplete
}: GenericInputType) {
	return (
		<div>
			<Label className={styles.inputLabel}>{label}</Label>
			<Input
				type={type}
				value={value}
				onChange={(e) => setValue(e.target.value)}
				required={required}
				className={styles.inputField}
				placeholder={placeholder}
				autoComplete={autoComplete}
			/>
		</div>
	)
}
