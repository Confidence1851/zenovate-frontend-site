import { Button } from '@/components/ui/button'
import { ArrowRight } from 'iconsax-react'
import Link from 'next/link'
import styles from '@/styles/LegalLayout.module.css'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

type LegalLayoutProps = {
    title: string
    intro: string
    sections: {
        heading: string
        list: string[]
    }[]
    fullVersionLink?: string
}

export function LegalLayout({ title, intro, sections, fullVersionLink }: LegalLayoutProps) {
    return (
        <main>
            <section className={styles.headerSection}>
                <div className='w-full max-w-7xl mx-auto'>
                    <div className='w-full space-y-5 md:space-y-6 lg:space-y-8'>
                        <h1 className={styles.headerTwo}>{title}</h1>
                        <h3 className={styles.headerOne}>{intro}</h3>
                        {/* <div className='w-full pt-1'>
                            <div className='w-full bg-Green-100 border-[0.5px] border-opacity-80' />
                        </div> */}
                    </div>
                </div>
            </section>

            <section className={styles.bodySection}>
                <div className='w-full max-w-7xl mx-auto'>
                    <div className='flex flex-col gap-10 lg:gap-16 lg:flex-row max-w-7xl mx-auto'>
                        {/* left side  */}
                        <div className='w-full space-y-10 md:space-y-14 px-[5vw] sm:px-[3.5vw] lg:px-0'>
                            <Accordion type="single" collapsible>
                                {sections.map((item, i) => (
                                    <AccordionItem value={`item-${i}`} key={i}>
                                        <AccordionTrigger className='text-lg md:text-xl uppercase'>
                                            {item.heading}
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <div className='space-y-5 md:space-y-8'>
                                                <div>
                                                    <ul className='flex flex-col gap-2.5 md:gap-3 pl-0 ml-[1.0625rem]'>
                                                        {item.list.map((list, i) => (
                                                            <li className='list-disc text-base md:text-lg' key={i}>
                                                                {list}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </div>

                        {/* right side  */}
                        {fullVersionLink && (
                            <div className={styles.rightContainerBox}>
                                <h3 className='text-lg uppercase font-semibold text-center max-w-[600px]'>
                                    For more detailed information about our data practices and your rights under applicable laws, please
                                    review our full {title}.
                                </h3>

                                <Link href={fullVersionLink}>
                                    <Button
                                        variant='lemon'
                                        className='flex justify-between items-center p-4 md:gap-20 gap-3 w-fit border border-Green-100 h-11'

                                    >
                                        <span className='uppercase text-sm font-semibold'>read full {title}</span>
                                        <ArrowRight size='24' className='font-bold hidden md:inline-block' />
                                    </Button>
                                </Link>

                            </div>
                        )}
                    </div>
                </div>
            </section>
        </main>
    )
}