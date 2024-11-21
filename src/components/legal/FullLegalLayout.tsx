import styles from '@/styles/FullLegalLayout.module.css'

type FullLegalLayoutProps = {
    title: string
    intro: string
    content: string
}


export function FullLegalLayout({ title, intro, content }: FullLegalLayoutProps) {
    return (
        <main>
            <section className={styles.headerSection}>
                <div className='relative w-full max-w-7xl mx-auto px-[5vw] sm:px-[3.5vw] lg:px-[3vw] flex justify-end flex-col pt-10'>
                    <div className='w-full max-w-[750px] flex flex-col gap-3 md:gap-5'>
                        <h3 className={`${styles.titleHeader}`}>
                            {title}
                        </h3>
                        <p className={`text-base lg:text-xl lg:leading-8`}>{intro}</p>
                    </div>
                </div>
            </section>
            <section className={styles.bodySection}>
                <div className='w-full max-w-7xl mx-auto px-[5vw] sm:px-[3.5vw] lg:px-[3vw]'>
                    <div className='-px-[5vw] md:-px-[3.5vw] lg:-px-[3vw]'>
                        <div
                            dangerouslySetInnerHTML={{ __html: content }}
                            className='text-pretty prose prose-lg max-w-none columns-1 lg:columns-2 gap-10
                                prose-headings:font-semibold prose-headings:text-Black-100 
                                prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6
                                prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4
                                prose-p:text-Black-100 prose-p:text-base prose-p:leading-relaxed
                                prose-ul:list-disc prose-ul:pl-6 prose-ul:my-4
                                prose-li:text-Black-100 prose-li:text-base
                                [&>h1]:column-span-all [&>h2]:column-span-all
                            '
                        />

                    </div>
                </div>
            </section>
        </main>
    )
}