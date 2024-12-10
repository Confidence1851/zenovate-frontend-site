'use client'
import searchIcon from '@/assets/svgs/search-icon.svg'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious
} from '@/components/ui/pagination'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { OrdersListResponse } from '@/types'
import { ordersList } from '@/server-actions/api.actions'
import { redirectToRecreateSession } from '@/utils/functions'
import Link from 'next/link'

export default function Order() {
	const { data: session } = useSession()
	const [orders, setOrders] = useState<OrdersListResponse | null>(null)
	const [search, setSearch] = useState<string>('')
	const [status, setStatus] = useState<string>('')
	const [currentPage, setCurrentPage] = useState<number>(1)
	const [totalPages, setTotalPages] = useState<number>(1)
	const statuses = ['Pending', 'Processing', 'Awaiting_Review', 'Awaiting_Confirmation', 'Declined', 'Completed']

	// Fetch Orders with Pagination
	const fetchOrders = () => {
		if (!session?.accessToken) {
			return
		}
		ordersList(session?.accessToken ?? '', {
			search,
			status,
			page: currentPage
		}).then((result) => {
			setOrders(result)
			setTotalPages(result?.data?.meta?.total_pages ?? 1)
		})
	}

	useEffect(() => {
		fetchOrders()
	}, [currentPage, search, status, session])

	// Pagination Handlers
	const handlePageChange = (page: number) => {
		if (page >= 1 && page <= totalPages) {
			setCurrentPage(page)
		}
	}

	const handleRecreate = (order_id: number | string) => {
		return redirectToRecreateSession({ id: order_id, token: session?.accessToken ?? '' })
	}

	return (
		<div className='max-w-7xl mx-auto w-full'>
			<div className='w-full grid grid-cols-1 sm:flex sm:justify-end gap-3 sm:items-center'>
				<Input
					className='bg-[#F7F7F5] sm:max-w-[335px] border border-[#94A3B8] !h-[38px] placeholder:text-[#94A3B8]'
					placeholder='SEARCH ORDERS'
					onChange={(e) => setSearch(e.target.value)}
				/>
				<div className='grid grid-cols-2 gap-3 sm:flex sm:justify-start sm:items-center'>
					<Select onValueChange={(e) => setStatus(e)} value={status}>
						<SelectTrigger className='w-full sm:w-[170px] border border-[#94A3B8] h-[38px] bg-[#F7F7F5] [&>span]:uppercase [&>span]:font-medium [&>span]:text-[#162C15]'>
							<SelectValue placeholder='filter' className='uppercase' />
						</SelectTrigger>
						<SelectContent>
							{statuses.map((v) => (
								<SelectItem key={v} value={v}>
									{v.replace('_', ' ')}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					{/* <div className="flex justify-center items-center h-[38px] bg-[#162C15] w-[52px] ml-auto sm:ml-0">
						<Image src={searchIcon} alt="search" />
					</div> */}
				</div>
			</div>
			<div className='grid grid-cols-1 mt-6 md:mt-7'>
				<div className='overflow-x-auto max-w-full'>
					<div className='min-w-[700px]'>
						<Table>
							<TableHeader>
								<TableRow className='*:text-[#94A3B8] *:font-semibold *:uppercase border-[#CBD5E1] *:py-4'>
									<TableHead className='w-[120px]'>Reference</TableHead>
									<TableHead>Date</TableHead>
									<TableHead>Selected Products</TableHead>
									<TableHead>Total Cost</TableHead>
									<TableHead>Status</TableHead>
									<TableHead className='text-right'>Actions</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{orders?.data.data.map((order) => (
									<TableRow
										key={order.id}
										className='*:text-[#000000] *:font-semibold *:uppercase border-[#CBD5E1] *:py-4'
									>
										<TableCell>{order.reference}</TableCell>
										<TableCell>{order.created_at}</TableCell>
										<TableCell>{order.total_products}</TableCell>
										<TableCell>{order.total_cost}</TableCell>
										<TableCell>{order.status.replace('_', ' ')}</TableCell>
										<TableCell className='text-right'>
											<div className='flex justify-end items-center gap-3 *:border *:border-[#CBD5E1] *:px-2.5 *:py-[5px] *:text-[#000000] *:uppercase *:text-sm *:font-semibold'>
												<Link href={`/dashboard/orders/${order.id}`}>View</Link>
												<button onClick={() => handleRecreate(order.id)}>Re-Create</button>
											</div>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</div>
				</div>
			</div>
			<div className='mt-8'>
				<Pagination>
					<PaginationContent>
						<PaginationItem>
							<PaginationPrevious href='#' onClick={() => handlePageChange(currentPage - 1)} />
						</PaginationItem>
						{Array.from({ length: totalPages }, (_, i) => (
							<PaginationItem key={i}>
								<PaginationLink href='#' isActive={currentPage === i + 1} onClick={() => handlePageChange(i + 1)}>
									{i + 1}
								</PaginationLink>
							</PaginationItem>
						))}
						<PaginationItem>
							<PaginationNext href='#' onClick={() => handlePageChange(currentPage + 1)} />
						</PaginationItem>
					</PaginationContent>
				</Pagination>
			</div>
		</div>
	)
}
