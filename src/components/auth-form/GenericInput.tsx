import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

type GenericInputType = {
	type: 'text' | 'number' | 'email'
	value: string | number
	placeholder?: string
	setValue: React.Dispatch<React.SetStateAction<string>> | React.Dispatch<React.SetStateAction<string | number>>
	required: boolean
	label: string
}

export default function GenericInput({
	type = 'text',
	value,
	placeholder,
	setValue,
	required = false,
	label
}: GenericInputType) {
	return (
		<div>
			<Label className='text-xs text-[#162C15] uppercase font-semibold'>{label}</Label>
			<Input
				type={type}
				value={value}
				onChange={(e) => setValue(e.target.value)}
				required={required}
				className='border border-[#CBD5E1] placeholder:uppercase placeholder:text-sm placeholder:text-[#94A3B8] rounded-none outline-none h-[43px] px-3 mt-2'
				placeholder={placeholder}
			/>
		</div>
	)
}
