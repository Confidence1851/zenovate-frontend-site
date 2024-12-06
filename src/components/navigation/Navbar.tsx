'use client'

import * as React from 'react'
import Logo from './Logo'
import { Button } from '@/components/ui/button'
import NavCont from './NavCont'
import styles from '@/styles/Navbar.module.css'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu'
import { ChevronRight, Menu } from 'lucide-react'
import ListItem from './ListItem'
import FeaturedArticles from '../blogs/FeaturedArticles'
import NavFeatureProducts from '../products-page/NavFeaturedProducts'
import DropdownCardsCont from './DropdownCardsCont'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

interface NavItemWithDropdown {
	label: string
	items: {
		title: string
		href: string
		image: string
		description: string
	}[]
	type: 'dropdown'
}

interface NavItemCustom {
	label: string
	type: 'custom'
	component: React.ReactNode
}

interface NavItemSimple {
	label: string
	href:
		| string
		| {
				path: string
				scroll: boolean
				onClick?: (e: React.MouseEvent) => void
		  }
	type: 'link'
}

type NavItem = NavItemWithDropdown | NavItemSimple | NavItemCustom

const navLinks: NavItem[] = [
	{
		label: 'How it works',
		href: {
			path: '/#howItWorks',
			scroll: false,
			onClick: (e) => {
				e.preventDefault()
				if (window.location.pathname === '/') {
					window.location.href = '/#howItWorks'
				} else {
					// Let Next.js Link handle the navigation without default scroll
					window.location.href = '/#howItWorks'
					// After navigation, smooth scroll to element
					setTimeout(() => {
						document.getElementById('howItWorks')?.scrollIntoView({
							behavior: 'smooth'
						})
					}, 100)
				}
			}
		},
		type: 'link'
	},
	{
		label: 'Products',
		type: 'custom',
		component: <NavFeatureProducts />
	},
	{
		label: 'Blog',
		type: 'custom',
		component: <FeaturedArticles />
	},
	{
		label: 'About Us',
		type: 'dropdown',
		items: [
			{
				title: 'About',
				href: '/faq',
				image: '/placeholder.png?height=400&width=600',
				description: 'Learn about our mission, values, the team.'
			},
			{
				title: 'FAQ',
				href: '/faq',
				image: '/placeholder.png?height=400&width=600',
				description: 'Find answers to common questions.'
			},
			{
				title: 'Contact Us',
				href: '/contact',
				image: '/placeholder.png?height=400&width=600',
				description: 'Get in touch with our support team.'
			}
		]
	}
]

export default function Navbar() {
	// const [activeImage, setActiveImage] = useState<string | null>(null)
	const { data: session } = useSession()

	return (
		<NavCont>
			<nav className={styles.nav}>
				<div className={styles.navContainer}>
					<Logo className='text-xl lg:text-2xl' />

					<NavigationMenu className='hidden lg:inline-block'>
						<NavigationMenuList>
							{navLinks.map((item) => (
								<NavigationMenuItem key={item.label}>
									{item.type === 'link' ? (
										<Link
											href={typeof item.href === 'string' ? item.href : item.href.path}
											scroll={typeof item.href === 'string' ? true : item.href.scroll}
											onClick={typeof item.href === 'string' ? undefined : item.href.onClick}
											className={`${navigationMenuTriggerStyle()} ${styles.trigggerLabel}`}
										>
											{item.label}
										</Link>
									) : item.type === 'dropdown' ? (
										<>
											{/* about us  */}
											<NavigationMenuTrigger className={`${navigationMenuTriggerStyle()} ${styles.trigggerLabel}`}>
												{item.label}
											</NavigationMenuTrigger>
											<NavigationMenuContent className='md:w-full bg-background md:px-[3vw]'>
												{/* <ul className={`abt-transparent ${styles.listItms} `}> */}
												<ul className='abt-transparent gap-10 py-5 mx-auto w-full max-w-[80rem] flex justify-start items-start'>
													{item.items.map((subItem) => (
														<ListItem
															key={subItem.title}
															href={subItem.href}
															title={subItem.title}
															description={subItem.description}
														/>
													))}
												</ul>
											</NavigationMenuContent>
										</>
									) : (
										<>
											{/* featured articles  */}
											<NavigationMenuTrigger className={styles.trigggerLabel}>{item.label}</NavigationMenuTrigger>
											<NavigationMenuContent className='md:w-full bg-background md:px-[3vw] !focus:bg-background'>
												<DropdownCardsCont >{item.component}</DropdownCardsCont>
											</NavigationMenuContent>
										</>
									)}
								</NavigationMenuItem>
							))}
						</NavigationMenuList>
					</NavigationMenu>

					<div className='flex items-center gap-4'>
						{!session ? (
							<Link href='/auth/login'>
								<Button className='bg-[#1B2B1B] hover:bg-[#2C442C] text-white hidden lg:inline-block'>JOIN NOW</Button>
							</Link>
						) : (
							<Link href='/dashboard/orders'>
								<Button className='bg-[#1B2B1B] hover:bg-[#2C442C] text-white hidden lg:inline-block'>DASHBOARD</Button>
							</Link>
						)}

						<Sheet>
							<SheetTrigger asChild>
								<Button variant='outline' size='icon' className='lg:hidden'>
									<Menu className='h-6 w-6' />
									<span className='sr-only'>Toggle menu</span>
								</Button>
							</SheetTrigger>
							<SheetContent side='right' className='bg-background'>
								<nav className='flex flex-col gap-4'>
									{navLinks.map((item) => (
										<div key={item.label} className='flex flex-col gap-2'>
											<h2 className='text-lg font-semibold'>{item.label}</h2>
											{item.type === 'link' ? (
												<a href={item.href} className='text-sm hover:underline'>
													{item.label}
												</a>
											) : item.type === 'dropdown' ? (
												item.items.map((subItem) => (
													<a key={subItem.title} href={subItem.href} className='text-sm hover:underline'>
														{subItem.title}
													</a>
												))
											) : (
												<a href={`/${item.label.toLowerCase()}`} className='text-sm hover:underline'>
													{item.label}
												</a>
											)}
										</div>
									))}
									<Button className='bg-primary hover:bg-primary-foreground text-background w-fit mt-2'>
										JOIN NOW <ChevronRight className='ml-2 h-4 w-4' />
									</Button>
								</nav>
							</SheetContent>
						</Sheet>
					</div>
				</div>
			</nav>
		</NavCont>
	)
}
