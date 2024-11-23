import searchIcon from '@/assets/svgs/search-icon.svg'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow
} from '@/components/ui/table'
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious
} from '@/components/ui/pagination'

export default function Order() {
	return (
		<div className='max-w-7xl mx-auto w-full'>
			<div className='w-full grid grid-cols-1 sm:flex sm:justify-end gap-3 sm:items-center '>
				<Input
					className='bg-[#F7F7F5] sm:max-w-[335px] border border-[#94A3B8] !h-[38px] placeholder:text-[#94A3B8]'
					placeholder='SEARCH ORDERS'
				/>
				<div className='grid grid-cols-2 gap-3 sm:flex sm:justify-start sm:items-center'>
					<div className='flex justify-center items-center h-[38px] bg-[#162C15] w-[52px] ml-auto sm:ml-0'>
						<Image src={searchIcon} alt='seacrh' />
					</div>
					<Select>
						<SelectTrigger className=' w-full sm:w-[170px] border border-[#94A3B8] h-[38px] bg-[#F7F7F5] [&>span]:uppercase [&>span]:font-medium [&>span]:text-[#162C15]'>
							<SelectValue placeholder='filter' className='uppercase ' />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value='apple'>Order 1</SelectItem>
							<SelectItem value='banana'>Order 2</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</div>
			<div className='grid grid-cols-1 mt-6 md:mt-7'>
				<div className='overflow-x-auto max-w-full'>
					<div className=' min-w-[700px] '>
						<Table>
							<TableHeader>
								<TableRow className=' *:text-[#94A3B8] *:font-semibold *:uppercase border-[#CBD5E1] *:py-4'>
									<TableHead className='w-[120px]'>order id</TableHead>
									<TableHead>date</TableHead>
									<TableHead>item summary</TableHead>
									<TableHead>status</TableHead>
									<TableHead className='text-right'>actions</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{invoices.map((invoice) => (
									<TableRow
										key={invoice.orderId}
										className='*:text-[#000000] *:font-semibold *:uppercase border-[#CBD5E1] *:py-4'
									>
										<TableCell>{invoice.orderId}</TableCell>
										<TableCell>{invoice.date}</TableCell>
										<TableCell>{invoice.itemSum}</TableCell>
										<TableCell>{invoice.status}</TableCell>
										<TableCell className='text-right'>
											<div className='flex justify-end items-center gap-3 *:border *:border-[#CBD5E1] *:px-2.5 *:py-[5px] *:text-[#000000] *:uppercase *:text-sm *:font-semibold'>
												<button>view</button>
												<button>cancel</button>
											</div>
										</TableCell>
										{/* <TableCell className='text-right'>{invoice.totalAmount}</TableCell> */}
									</TableRow>
								))}
							</TableBody>
							{/* <TableFooter>
						<TableRow>
							<TableCell colSpan={3}>Total</TableCell>
							<TableCell className='text-right'>$2,500.00</TableCell>
						</TableRow>
					</TableFooter> */}
						</Table>
					</div>
				</div>
			</div>
			<div className='mt-8'>
				<Pagination>
					<PaginationContent>
						<PaginationItem>
							<PaginationPrevious href='#' />
						</PaginationItem>
						<PaginationItem>
							<PaginationLink href='#'>1</PaginationLink>
						</PaginationItem>
						<PaginationItem>
							<PaginationLink href='#' isActive>
								2
							</PaginationLink>
						</PaginationItem>
						<PaginationItem>
							<PaginationLink href='#'>3</PaginationLink>
						</PaginationItem>
						<PaginationItem>
							<PaginationEllipsis />
						</PaginationItem>
						<PaginationItem>
							<PaginationNext href='#' />
						</PaginationItem>
					</PaginationContent>
				</Pagination>
			</div>
		</div>
	)
}

const invoices = [
	{
		orderId: 'INV001',
		date: '2024-07-21',
		itemSum: 'item summary',
		status: 'completed'
	},
	{
		orderId: 'INV002',
		date: '2024-07-21',
		itemSum: 'item summary',
		status: 'completed'
	},
	{
		orderId: 'INV003',
		date: '2024-07-21',
		itemSum: 'item summary',
		status: 'completed'
	},
	{
		orderId: 'INV004',
		date: '2024-07-21',
		itemSum: 'item summary',
		status: 'completed'
	},
	{
		orderId: 'INV005',
		date: '2024-07-21',
		itemSum: 'item summary',
		status: 'completed'
	},
	{
		orderId: 'INV006',
		date: '2024-07-21',
		itemSum: 'item summary',
		status: 'completed'
	},
	{
		orderId: 'INV007',
		date: '2024-07-21',
		itemSum: 'item summary',
		status: 'completed'
	}
]
