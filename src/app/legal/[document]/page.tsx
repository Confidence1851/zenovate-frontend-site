import { LEGAL_DOCUMENTS } from '../constants'
import { notFound } from 'next/navigation'
import { LegalLayout } from '@/components/legal/LegalLayout'
import { createMetadata } from '@/lib/metadata'
import { Metadata } from 'next'

type Props = {
    params: {
        document: string
    }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const document = LEGAL_DOCUMENTS.find((doc) => doc.id === params.document)

    if (!document) {
        return createMetadata()
    }

    return createMetadata({
        title: document.title,
        description: document.summary.intro.slice(0, 160),
        openGraph: {
            title: `${document.title} | Summary`,
            description: document.summary.intro.slice(0, 160),
            url: `/legal/${document.id}`,
            type: 'article',
        },
        twitter: {
            card: 'summary',
            title: `${document.title} | Summary`,
            description: document.summary.intro.slice(0, 160),
        },
    })
}


export function generateStaticParams() {
    return LEGAL_DOCUMENTS.map((doc) => ({
        document: doc.id,
    }))
}

export default function LegalDocument({ params }: Props) {
    const document = LEGAL_DOCUMENTS.find((doc) => doc.id === params.document)

    if (!document) {
        notFound()
    }

    return (
        <LegalLayout
            title={document.title}
            intro={document.summary.intro}
            sections={document.summary.sections}
            fullVersionLink={`/legal/${params.document}/raw`}
        />
    )
}