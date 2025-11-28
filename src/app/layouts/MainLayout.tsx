import Navbar from '@/components/navigation/Navbar'
import Footer from '@/components/navigation/Footer'

/**
 * MainLayout Component
 * 
 * Standard layout component used platform-wide for all public pages.
 * Includes:
 * - Navbar (navigation header)
 * - Main content area
 * - Footer (reusable footer component)
 * 
 * This ensures consistent footer usage across all pages including:
 * - Category pages (/category/[categorySlug])
 * - Product pages (/products, /products/[productId])
 * - All other public pages
 */
export default function MainLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <>
            <Navbar />
            <main className='main-layout'>
                {children}
            </main>
            <Footer />
        </>
    )
}