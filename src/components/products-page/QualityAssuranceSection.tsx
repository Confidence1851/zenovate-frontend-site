import Link from 'next/link'
import { ArrowRight } from 'iconsax-react'

interface QualityAssuranceSectionProps {
  showButton?: boolean
}

export const QualityAssuranceSection = ({
  showButton = true,
}: QualityAssuranceSectionProps) => {
  return (
    <section className='w-full py-16 md:py-20 lg:py-24 bg-white'>
      <div className='xmd-container'>
        <div className='max-w-4xl mx-auto'>
          {/* Header */}
          <div className='mb-12'>
            <h2 className='text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-wider mb-8'>
              Quality Assurance & Testing
            </h2>
          </div>

          {/* Content Grid */}
          <div className='grid md:grid-cols-2 gap-8 md:gap-12 items-start mb-12'>
            {/* Left Column - Text Content */}
            <div className='space-y-6'>
              <p className='text-base md:text-lg leading-relaxed text-foreground'>
                Every research peptide we supply undergoes multi-layer analytical
                verification using advanced pharmaceutical-grade instrumentation.
              </p>
              <p className='text-base md:text-lg leading-relaxed text-foreground'>
                This ensures identity, purity, potency, and consistency not just
                on paper, but at the molecular level.
              </p>
              <p className='text-base md:text-lg leading-relaxed text-foreground'>
                Our testing strategy is designed to answer one question with
                certainty:
              </p>
            </div>

            {/* Right Column - Highlight Box */}
            <div className='bg-background-accent p-8 md:p-10 rounded-lg border-l-4 border-[#4a8a7e] flex items-center'>
              <p className='text-lg md:text-xl font-semibold italic text-[#4a8a7e]'>
                Is this peptide exactly what it claims to be, clean, accurate,
                and reproducible?
              </p>
            </div>
          </div>

          {/* Button */}
          {showButton && (
            <div>
              <Link href='/quality-assurance'>
                <button className='inline-flex items-center justify-between gap-6 bg-black text-white uppercase font-bold text-sm md:text-base px-8 py-4 hover:bg-black/90 transition-colors'>
                  <span>Learn About Our Testing Protocol</span>
                  <ArrowRight size='20' className='flex-shrink-0' />
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
