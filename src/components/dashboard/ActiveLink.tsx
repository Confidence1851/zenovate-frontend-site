'use client'

import { usePathname } from 'next/navigation'

export default function ActiveLink() {
	const pathname = usePathname()

	const segments = pathname?.split('/').filter(Boolean)
	const lastSegment = segments?.pop()

	const isOrderDetailsPage = segments?.[0] === 'dashboard' && segments[1] === 'orders' && lastSegment

	return <>{isOrderDetailsPage ? `order - ${lastSegment}` : lastSegment}</>
}
