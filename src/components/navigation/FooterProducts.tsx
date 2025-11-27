'use client'

import Link from 'next/link'
import { getCategories, Category } from '@/server-actions/category.actions'
import { useQuery } from '@tanstack/react-query'

const FooterProducts = () => {
    const {
        data: categories,
        isLoading,
        error
    } = useQuery({
        queryKey: ['footer-categories'],
        queryFn: getCategories
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

    // Filter categories with products, sort by order, limit to 5
    const displayCategories = (categories ?? [])
        .filter((cat: Category) => (cat.products_count ?? 0) > 0)
        .sort((a: Category, b: Category) => {
            // Sort by order if available, otherwise by name
            const orderA = a.order ?? 999;
            const orderB = b.order ?? 999;
            return orderA - orderB;
        })
        .slice(0, 5);

    return (
        <>
            {displayCategories.map((category: Category) => (
                <div className="py-2" key={category.slug}>
                    <Link
                        href={`/category/${category.slug}`}
                        className='text-foreground text-sm font-medium uppercase hover:text-primary transition-colors block'
                    >
                        {category.name}
                    </Link>
                </div>
            ))}
        </>
    )
}

export default FooterProducts
