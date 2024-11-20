type DropdownCardsContProps = {
	children: React.ReactNode
}

function DropdownCardsCont({ children }: DropdownCardsContProps) {
	return (
		<div>
			<ul className='gap-10 py-5 mx-auto w-full max-w-[80rem] flex justify-start items-start'>{children}</ul>
		</div>
	)
}

export default DropdownCardsCont
