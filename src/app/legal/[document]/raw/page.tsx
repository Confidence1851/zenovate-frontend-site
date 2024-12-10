import { LEGAL_DOCUMENTS } from '../../constants'
import { markdownToHtml } from '@/lib/markdown'
import { notFound } from 'next/navigation'
import { FullLegalLayout } from '@/components/legal/FullLegalLayout'
import { createMetadata } from '@/lib/metadata'
import { Metadata } from 'next'
import MainLayout from '@/app/layouts/MainLayout'

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
        title: `${document.title} | Full Document`,
        description: document.fullVersion.intro,
        openGraph: {
            title: `${document.title} | Full Legal Document`,
            description: document.fullVersion.intro,
            url: `/legal/${document.id}/raw`,
            type: 'article',
        },
        twitter: {
            card: 'summary',
            title: `${document.title} | Full Legal Document`,
            description: document.fullVersion.intro,
        },
    })
}

export function generateStaticParams() {
    return LEGAL_DOCUMENTS.map((doc) => ({
        document: doc.id,
    }))
}


export default async function LegalDocumentRaw({ params }: Props) {
    const document = LEGAL_DOCUMENTS.find((doc) => doc.id === params.document)

    if (!document) {
        notFound()
    }

    const htmlContent = markdownToHtml(document.fullVersion.content)


    return (
        <>
            <MainLayout>
                <FullLegalLayout
                    title={document.title}
                    intro={document.fullVersion.intro}
                    content={htmlContent}
                />
            </MainLayout>

        </>

    )
}