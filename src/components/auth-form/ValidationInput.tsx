import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'

type ValidationInputType = {
	type: 'text' | 'number' | 'email'
	name: string
	errorMsg: string
	placeholder?: string
	register: UseFormRegister<FieldValues>
	label: string
	errors: FieldErrors<FieldValues>
}

export default function ValidationInput({
	type = 'text',
	placeholder,
	label,
	name,
	errorMsg,
	register,
	errors
}: ValidationInputType) {
	return (
		<div className='relative'>
			<Label className='text-xs text-[#162C15] uppercase font-semibold'>{label}</Label>
			<Input
				type={type}
				{...register(name, {
					required: `${errorMsg}`
				})}
				className={`border ${errors[name] ? 'border-red-500' : 'border-[#CBD5E1]'}  placeholder:uppercase placeholder:text-sm placeholder:text-[#94A3B8] rounded-none outline-none h-[43px] px-3 mt-2`}
				placeholder={placeholder}
			/>
			{errors[name] && (
				<p className='text-red-500 absolute bottom-[-18px] text-xs first-letter:capitalize '>
					{(errors[name] as { message: string }).message}
				</p>
			)}
		</div>
	)
}
