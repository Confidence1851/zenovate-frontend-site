import { LEGAL_DOCUMENTS } from '../constants'
import { notFound } from 'next/navigation'
import { LegalLayout } from '@/components/legal/LegalLayout'

type Props = {
    params: {
        document: string
    }
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