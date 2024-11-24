'use client'

import * as React from 'react'

import { Sidebar, SidebarContent, SidebarFooter, SidebarRail } from '@/components/ui/sidebar'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import logOutIcon from '@/assets/svgs/log-out.svg'
import Image from 'next/image'
import {  signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const sideLinks = [
	{ label: 'profile', url: '' },
	{ label: 'orders', url: '/dashboard/orders' },
	{ label: 'subscriptions', url: '' }
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const pathname = usePathname();
	const router = useRouter();

	function handleLogout(){
		signOut();
		router.replace("/");
	}

	return (
		<Sidebar {...props}>
			<SidebarContent className='pt-6 px-5'>
				{sideLinks.map((item, index) => {
					const isActive = pathname === item.url
					return (
						<Link
							href={item.url}
							className={`text-lg font-semibold ${isActive ? 'text-[#000000]' : 'text-gray-500'} uppercase`}
							key={index}
						>
							{item.label}
						</Link>
					)
				})}
			</SidebarContent>
			<SidebarFooter className='pb-6 px-5'>
				<button onClick={handleLogout} className='w-fit flex gap-1 justify-start items-center uppercase text-lg font-semibold text-[#000000]'>
					{' '}
					<Image className='size-5' src={logOutIcon} alt='logout' /> Logout
				</button>
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	)
}
