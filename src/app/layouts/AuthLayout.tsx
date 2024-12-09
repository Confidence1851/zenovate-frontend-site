import styles from '@/styles/Auth.module.css'
import { StaticImageData } from 'next/image'
import Logo from '@/components/navigation/Logo'

export default function AuthLayout({
    children,
    heading,
    mobParagraph,
    paragraph,
    customHeading = false,
    backgroundImage
}: Readonly<{
    children: React.ReactNode
    heading?: string
    mobParagraph?: string
    paragraph?: string
    customHeading?: boolean
    backgroundImage?: string | StaticImageData
}>) {

    const imageUrl = typeof backgroundImage === 'string'
        ? backgroundImage
        : backgroundImage?.src

    return (
        <main className={styles.main}>
            <div className={styles.wrapperLeft}>
                <div className="space-y-8 w-full max-w-[600px] mx-auto">
                    {!customHeading && (
                        <div className="space-y-2 text-center lg:text-left">
                            <h1 className={styles.mainHeader}>
                                {heading}
                            </h1>
                            <p className={styles.mainParagraph}>
                                {paragraph || mobParagraph}
                            </p>
                        </div>
                    )}
                    <div>
                        {children}
                    </div>
                    <div className="block text-center pt-4">
                        <Logo className='text-xl lg:text-2xl' />
                    </div>
                </div>
            </div>
            <div className={styles.wrapperRight}>
                <div
                    className={`h-full w-full rounded-sm ${!imageUrl ? 'bg-muted-foreground' : ''}`}
                    style={imageUrl ? {
                        backgroundImage: `url(${imageUrl})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        backgroundPosition: 'right'
                    } : undefined}
                />
            </div>
        </main >
    )
}