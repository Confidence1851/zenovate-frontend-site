'use client'

import { usePathname } from 'next/navigation'

export default function ActiveLink() {
	const pathname = usePathname()
	const lastSegment = pathname?.split('/').filter(Boolean).pop()
	return <>{lastSegment}</>
}
