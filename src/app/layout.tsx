// import type { Metadata } from 'next'
import './globals.css'
import { Poppins } from 'next/font/google'
import localFont from 'next/font/local'
import Navbar from '@/components/navigation/Navbar'
import Footer from '@/components/navigation/Footer'
import { ReactLenis } from '@/utils/lenis'
import { createMetadata } from '@/lib/metadata'
import { Toaster } from 'react-hot-toast'
import Provider from '@/utils/Providers'
const barlow = Poppins({
	weight: ['400', '100', '200', '300', '500', '900', '700', '400', '600'],
	subsets: ['latin'],
	variable: '--font-barlow'
})
const aerotis = localFont({
	src: '../assets/fonts/Aerotis/Aerotis 400.woff2',
	variable: '--font-aerotis'
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
				<body className={`${barlow.variable} ${aerotis.variable} antialiased`}>
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
