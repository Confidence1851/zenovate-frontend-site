import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
export default function ProductTable() {
	const productdata = [
		{ name: 'product name #1', price: '100', quantity: '2' },
		{ name: 'product name #2', price: '100', quantity: '2' },
		{ name: 'product name #3', price: '100', quantity: '2' },
		{ name: 'product name #4', price: '100', quantity: '2' },
		{ name: 'product name #5', price: '100', quantity: '2' }
	]
	return (
		<div>
			<h2 className='text-black font-semibold text-lg md:text-xl'>Products</h2>
			<div className='grid grid-cols-1 mt-4 md:mt-6'>
				<div className='overflow-x-auto max-w-full'>
					<div className=' min-w-[500px] '>
						<Table>
							<TableHeader>
								<TableRow className=' *:text-black *:font-semibold *:uppercase hover:bg-[#CBD5E1] bg-[#CBD5E1] border-[#CBD5E1] *:py-4'>
									<TableHead className=' max-[700px]:w-[45%]'>name</TableHead>
									<TableHead>unit price</TableHead>

									<TableHead className=''>quantity</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{productdata.map((product, index) => (
									<TableRow
										key={index}
										className='*:text-[#000000] *:font-semibold *:uppercase border-[#CBD5E1] *:py-4'
									>
										<TableCell>{product.name}</TableCell>
										<TableCell>${product.price}</TableCell>
										<TableCell>{product.quantity}</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</div>
				</div>
			</div>
		</div>
	)
}
