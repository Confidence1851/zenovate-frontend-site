// import type { Metadata } from 'next'
import './globals.css'
import { Barlow, Raleway } from 'next/font/google'
import Navbar from '@/components/navigation/Navbar'
import Footer from '@/components/navigation/Footer'
import { ReactLenis } from '@/utils/lenis'
import { createMetadata } from '@/lib/metadata'
import { Toaster } from 'react-hot-toast'
import Provider from '@/utils/Providers'
const barlow = Barlow({
	weight: ['400', '100', '200', '300', '500', '900', '700', '400', '600'],
	subsets: ['latin'],
	variable: '--font-barlow'
})
const raleway = Raleway({
	weight: ['400', '100', '200', '300', '500', '900'],
	subsets: ['latin'],
	variable: '--font-raleway'
})

export const metadata = createMetadata()

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<ReactLenis root>
				<head>
					<script defer data-domain='zenovate.health' src='https://analytics.aes-studio.com/js/script.js'></script>
				</head>
				<body className={`${barlow.variable} ${raleway.variable} antialiased`}>
					<Toaster />
					<Provider>
						<Navbar />
						<main>{children}</main>
						<Footer />
					</Provider>
				</body>
			</ReactLenis>
		</html>
	)
}
