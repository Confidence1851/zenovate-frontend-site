import ScaleLoader from 'react-spinners/ScaleLoader'

type SubmitButtonType = {
	isLoading: boolean
	text: string
}

export default function SubmitButton({ isLoading, text }: SubmitButtonType) {
	return (
		<button type='submit' className='h-[43px] bg-black flex justify-center items-center px-4 w-full'>
			{isLoading ? (
				<ScaleLoader color='#FFFFFF' height={18} />
			) : (
				<div className='w-full justify-between items-center flex'>
					<p className='text-white text-xs font-semibold uppercase'>{text}</p>
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
	)
}
