'use client';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Product } from '@/types';
export default function ProductTable({products, paymentProducts}: {products: Product[] , paymentProducts: Product[]}) {

	function getLowestPrice(product: Product){
		const lowestPrice = product.price.reduce((min, current) => 
			current.value < min.value ? current : min
		);
		const priceLabel = lowestPrice.display_name || (lowestPrice.frequency && lowestPrice.unit ? `${lowestPrice.frequency} ${lowestPrice.unit}s` : '');
		return `Starts at ${lowestPrice.currency}${lowestPrice.value}${priceLabel ? ` / ${priceLabel}` : ''}`;
	}
	
	return (
		<div>
			<h2 className='text-black font-semibold text-lg md:text-xl'>Products</h2>
			<div className='grid grid-cols-1 mt-4 md:mt-6'>
				<div className='overflow-x-auto max-w-full'>
					<div className=' min-w-[500px] '>
						{products && products.length > 0 && <Table>
							<TableHeader>
								<TableRow className=' *:text-black *:font-semibold *:uppercase hover:bg-[#CBD5E1] bg-[#CBD5E1] border-[#CBD5E1] *:py-4'>
									<TableHead className=' max-[700px]:w-[45%]'>Name</TableHead>
									<TableHead>Pricing</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{products.map((product , index) => {
									return <TableRow
											key={index}
											className='*:text-[#000000] *:font-semibold *:uppercase border-[#CBD5E1] *:py-4'
										>
											<TableCell>{product.name}</TableCell>
											<TableCell>{getLowestPrice(product)}</TableCell>
										</TableRow>
									
								})}
							</TableBody>
						</Table>}
						{paymentProducts && paymentProducts.length > 0 && <Table>
							<TableHeader>
								<TableRow className=' *:text-black *:font-semibold *:uppercase hover:bg-[#CBD5E1] bg-[#CBD5E1] border-[#CBD5E1] *:py-4'>
									<TableHead className=' max-[700px]:w-[45%]'>Name</TableHead>
									<TableHead>Pricing</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{paymentProducts.map((product , index) => {
									return <TableRow
											key={index}
											className='*:text-[#000000] *:font-semibold *:uppercase border-[#CBD5E1] *:py-4'
										>
											<TableCell>{product.name}</TableCell>
											<TableCell>{product.selected_price}</TableCell>
										</TableRow>
									
								})}
							</TableBody>
						</Table>}
					</div>
				</div>
			</div>
		</div>
	)
}
