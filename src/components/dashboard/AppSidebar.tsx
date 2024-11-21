import * as React from 'react'

import { Sidebar, SidebarContent, SidebarFooter, SidebarRail } from '@/components/ui/sidebar'
import Link from 'next/link'

const sideLinks = [
	{ label: 'profile', url: '' },
	{ label: 'orders', url: '' },
	{ label: 'subscriptions', url: '' }
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar  {...props}>
			<SidebarContent>
				{sideLinks.map((item, index) => (
					<Link href={item.url} key={index}>
						{item.label}
					</Link>
				))}
			</SidebarContent>
			<SidebarFooter>
				<button>Logout</button>
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	)
}
