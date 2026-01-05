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
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { CartIconButton } from '@/components/cart/CartIconButton'
import { CartSidebar } from '@/components/cart/CartSidebar'
import { useState } from 'react'

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
				href: '/about',
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
			},
			{
				title: 'Quality Assurance',
				href: '/quality-assurance',
				image: '/placeholder.png?height=400&width=600',
				description: 'Learn about our quality standards and assurance processes.'
			}
		]
	}
]

export default function Navbar() {
	// const [activeImage, setActiveImage] = useState<string | null>(null)
	const { data: session } = useSession()
	const [isCartOpen, setIsCartOpen] = useState(false)

	function handleLogout() {
		signOut({
			callbackUrl: '/' // Redirect the user after logout
		})
	}

	return (
		<NavCont>
			<nav className={styles.nav}>
				<div className={`xmd-container ${styles.navContainer}`}>
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
						<CartIconButton onClick={() => setIsCartOpen(true)} />
						<CartSidebar open={isCartOpen} onOpenChange={setIsCartOpen} />
						{!session ? (
							<>
								{/* <Link href='https://application.zenovate.health'>
									<Button className='bg-primary hover:bg-primary-foreground text-background hidden lg:inline-block px-8'>
										JOIN
									</Button>
								</Link> */}

								<Link href='/auth/login'>
									<Button className='bg-primary hover:bg-primary-foreground text-background hidden lg:inline-block px-8'>
										LOGIN
									</Button>
								</Link>
							</>

						) : (
							<>
								<Link href='/dashboard/orders'>
									<Button className='bg-primary hover:bg-primary-foreground text-background hidden lg:inline-block'>
										ORDERS
									</Button>
								</Link>
								<Button
									onClick={handleLogout}
									className='bg-primary hover:bg-primary-foreground text-background hidden lg:inline-block'>
									SIGN OUT
								</Button>
							</>

						)}

						<Sheet>
							<SheetTrigger asChild>
								<Button variant='outline' size='icon' className='lg:hidden'>
									<Menu className='h-6 w-6' />
									<span className='sr-only'>Toggle menu</span>
								</Button>
							</SheetTrigger>
							<SheetContent side='right' className='bg-background'>
								<nav className='flex flex-col gap-3'>
									{navLinks.map((item) => (
										<div key={item.label} className='flex flex-col gap-3'>
											{item.type === 'link' ? (
												<Link
													href={
														(typeof item.href === 'string' ? item.href : item.href.path) as any
													}
													className='text-base font-semibold text-foreground hover:text-primary transition-colors py-2'>
													{item.label}
												</Link>
											) : item.type === 'dropdown' ? (
												<>
													<h3 className='text-base font-semibold text-foreground py-2'>{item.label}</h3>
													<div className='flex flex-col gap-2'>
														{item.items.map((subItem) => (
															<a key={subItem.title} href={subItem.href} className='text-sm text-muted-foreground hover:text-primary transition-colors pl-4 py-1'>
																{subItem.title}
															</a>
														))}
													</div>
												</>
											) : (
												<Link href={`/${item.label.toLowerCase()}`} className='text-base font-semibold text-foreground hover:text-primary transition-colors py-2'>
													{item.label}
												</Link>
											)}
										</div>
									))}
									{session && (
										<Link href='/dashboard/orders' className='mt-2'>
											<Button className='bg-primary hover:bg-primary-foreground text-background w-full'>
												DASHBOARD <ChevronRight className='ml-2 h-4 w-4' />
											</Button>
										</Link>
									)}
								</nav>
							</SheetContent>
						</Sheet>
					</div>
				</div>
			</nav>
		</NavCont>
	)
}
