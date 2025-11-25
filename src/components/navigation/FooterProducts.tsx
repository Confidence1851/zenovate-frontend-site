'use client'

import Link from 'next/link'
import { productList } from '@/server-actions/api.actions'
import { useQuery } from '@tanstack/react-query'
import { Product } from '@/types'

const FooterProducts = () => {
    const {
        data: products,
        isLoading,
        error
    } = useQuery({
        queryKey: ['footer-products'],
        queryFn: productList
    })

    if (error) {
        return null // Don't show anything if there's an error
    }

    if (isLoading) {
        return (
            <div className="py-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            </div>
        )
    }

    return (
        <>
            {(products?.data ?? []).slice(0, 5).map((item: Product) => (
                <div className="py-2" key={item.id}>
                    <Link
                        href={`/products/${item.slug}`}
                        className='text-foreground text-sm font-medium uppercase hover:text-primary transition-colors block'
                    >
                        {item.name}
                    </Link>
                </div>
            ))}
        </>
    )
}

export default FooterProducts
