import { LEGAL_DOCUMENTS } from '../../constants'
import { markdownToHtml } from '@/lib/markdown'
import { notFound } from 'next/navigation'
import { FullLegalLayout } from '@/components/legal/FullLegalLayout'

type Props = {
    params: {
        document: string
    }
}

export default async function LegalDocumentRaw({ params }: Props) {
    const document = LEGAL_DOCUMENTS.find((doc) => doc.id === params.document)

    if (!document) {
        notFound()
    }

    // Dynamic import of markdown content
    const htmlContent = markdownToHtml(document.fullVersion.content)


    return (
        <FullLegalLayout
            title={document.title}
            intro={document.fullVersion.intro}
            content={htmlContent}
        />
    )
}