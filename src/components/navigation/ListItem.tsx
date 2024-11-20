import React from 'react'
import { NavigationMenuLink } from '@/components/ui/navigation-menu'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface ListItemProps {
	title: string
	description?: string
	href: string
	className?: string
	// onMouseEnter?: () => void
	// onMouseLeave?: () => void
}

const ListItem = React.forwardRef<React.ElementRef<typeof Link>, ListItemProps>(
	({ className, title, description, href, ...props }, ref) => {
		// console.log('ListItem received props:', {
		// 	href,
		// 	hrefType: typeof href,
		// 	allProps: { className, title, description, href, ...props }
		// })

		return (
			<li>
				<NavigationMenuLink asChild>
					<Link
						href={href}
						ref={ref}
						className={cn(
							'block select-none space-y-1 rounded-md py-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
							className
						)}
						{...props}
					>
						<div className='text-sm font-medium leading-none'>{title}</div>
						{description && <p className='line-clamp-2 text-sm leading-snug text-muted-foreground'>{description}</p>}
					</Link>
				</NavigationMenuLink>
			</li>
		)
	}
)

ListItem.displayName = 'ListItem'

export default ListItem
