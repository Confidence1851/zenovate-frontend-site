'use client'

// import { useState } from 'react'
import * as React from 'react'
import Logo from './Logo'
// import Link from 'next/link'
import { Button } from '@/components/ui/button'
// import { cn } from '@/lib/utils'
// import { ArrowRight, HambergerMenu } from 'iconsax-react'
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
import Link from 'next/link'
import ListItem from './ListItem'
import FeaturedArticles from '../blogs/FeaturedArticles'
// import Test from './DropdownCardsCont'
import NavFeatureProducts from '../products-page/NavFeaturedProducts'
import DropdownCardsCont from './DropdownCardsCont'

interface NavItem {
	title: string
	href: string
	image: string
	description: string
}

interface NavSection {
	label: string
	items: NavItem[]
}

const navLinks: NavSection[] = [
	{
		label: 'Plans',
		items: [
			{
				title: 'Subscriptions',
				href: '/subscriptions',
				image: '/placeholder.png?height=400&width=600',
				description: 'Choose from our flexible subscription plans.'
			},
			{
				title: 'How It Works',
				href: '/how-it-works',
				image: '/placeholder.png?height=400&width=600',
				description: 'Learn about our service and process.'
			}
		]
	},
	{
		label: 'Support',
		items: [
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
	},
	{
		label: 'Company',
		items: [
			{
				title: 'About Us',
				href: '/about',
				image: '/placeholder.png?height=400&width=600',
				description: 'Learn more about our company and mission.'
			},
			{
				title: 'Products',
				href: '/products',
				image: '/placeholder.png?height=400&width=600',
				description: 'Shop our range of personalized wellness shots '
			},
			{
				title: 'Blog',
				href: '/blog',
				image: '/placeholder.png?height=400&width=600',
				description: 'Read our latest news and articles.'
			}
		]
	}
]

export default function Navbar() {
	// const [activeImage, setActiveImage] = useState<string | null>(null)

	return (
		<NavCont>
			<nav className={styles.nav}>
				<div className={styles.navContainer}>
					<Logo className='text-xl lg:text-2xl' />

					<NavigationMenu className='hidden lg:inline-block'>
						<NavigationMenuList>
							{navLinks.map((item) => (
								<NavigationMenuItem key={item.label}>
									<NavigationMenuTrigger className={navigationMenuTriggerStyle()}>{item.label}</NavigationMenuTrigger>
									<NavigationMenuContent className='md:w-full bg-white md:px-[3vw]'>
										<ul className=' gap-10 py-5 mx-auto w-full max-w-[80rem] flex justify-start items-start'>
											{item.items.map((subItem) => {
												// const hrefValue = `${subItem.href}`
												// console.log('Mapping subItem:', {
												// 	raw: subItem.href,
												// 	processed: hrefValue,
												// 	type: typeof subItem.href,
												// 	fullItem: subItem
												// })
												return (
													<ListItem
														key={subItem.title}
														href={subItem.href}
														title={subItem.title}
														description={subItem.description}
														// onMouseEnter={() => setActiveImage(subItem.image)}
														// onMouseLeave={() => setActiveImage(null)}
													/>
												)
											})}
										</ul>
									</NavigationMenuContent>
								</NavigationMenuItem>
							))}
							<NavigationMenuItem>
								<NavigationMenuTrigger>Blog</NavigationMenuTrigger>
								<NavigationMenuContent className='md:w-full bg-white md:px-[3vw]'>
									<DropdownCardsCont>
										<FeaturedArticles />
									</DropdownCardsCont>
								</NavigationMenuContent>
							</NavigationMenuItem>
							<NavigationMenuItem>
								<NavigationMenuTrigger>Products</NavigationMenuTrigger>
								<NavigationMenuContent className='md:w-full bg-white md:px-[3vw]'>
									<DropdownCardsCont>
										<NavFeatureProducts />
									</DropdownCardsCont>
								</NavigationMenuContent>
							</NavigationMenuItem>
						</NavigationMenuList>
					</NavigationMenu>

					<div className='flex items-center gap-4'>
						<Button className='bg-[#1B2B1B] hover:bg-[#2C442C] text-white hidden lg:inline-block'>
							JOIN NOW <ChevronRight className='ml-2 h-4 w-4' />
						</Button>

						<Sheet>
							<SheetTrigger asChild>
								<Button variant='outline' size='icon' className='lg:hidden'>
									<Menu className='h-6 w-6' />
									<span className='sr-only'>Toggle menu</span>
								</Button>
							</SheetTrigger>
							<SheetContent side='right' className='bg-white'>
								<nav className='flex flex-col gap-4'>
									{navLinks.map((item) => (
										<div key={item.label} className='flex flex-col gap-2'>
											<h2 className='text-lg font-semibold'>{item.label}</h2>
											{item.items.map((subItem) => (
												<Link key={subItem.title} href={subItem.href} className='text-sm hover:underline'>
													{subItem.title}
												</Link>
											))}
											{/* <Link key={'Blog'} href={'/blog'} className='text-sm hover:underline'>
												{'Blog'}
											</Link> */}
										</div>
									))}
								</nav>
							</SheetContent>
						</Sheet>
					</div>
				</div>
			</nav>
		</NavCont>
	)
}
