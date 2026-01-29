import './globals.css'
import { Poppins } from 'next/font/google'
import localFont from 'next/font/local'
import { ReactLenis } from '@/utils/lenis'
import { createMetadata } from '@/lib/metadata'
import { Toaster } from 'react-hot-toast'
import Provider from '@/utils/Providers'
import { Suspense } from 'react'
import InformlyWidget from '@/components/common/InformlyWidget'
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
					<style>{`.grecaptcha-badge { visibility: hidden; }`}</style>
				</head>
				<Suspense fallback={null}>
					<InformlyWidget />
				</Suspense>
				<body className={`${barlow.variable} ${aerotis.variable} antialiased`}>
					<Provider>
						<Toaster />
						<main>{children}</main>
					</Provider>
				</body>
			</ReactLenis>
		</html>
	)
}
