import { cn } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'


interface LogoProps {
	className?: string
}
const Logo: React.FC<LogoProps> = ({ className }) => {
	return (
		<Link href='/'>
			<h4 className={cn(className, `font-semibold text-muted-foreground tracking-wider capitalize font-barlow`)}>
				Zenovate
			</h4>
		</Link>
	)
}

export default Logo
