import Image from 'next/image'
import MainLayout from '@/app/layouts/MainLayout'
import PageHeroWrapper from '@/components/common/PageHeroWrapper'
import SubscriptionComponent from '@/components/common/SubscriptionComponent'
import heroImage from '@/assets/images/ad6e850434c58cfdca5ed066a828ed0c9771e9faf8e15c.png'
import { createMetadata } from '@/lib/metadata'

export const metadata = createMetadata({
  title: 'Peptide Testing & Quality Assurance | Zenovate',
  description: 'Multi layer analytical verification of research peptides using pharmaceutical grade instrumentation.',
  openGraph: {
    title: 'Peptide Testing & Quality Assurance | Zenovate',
    description: 'Multi layer analytical verification of research peptides using pharmaceutical grade instrumentation.',
    url: '/quality-assurance',
  },
})

const testingMethods = [
  {
    number: 1,
    title: 'UPLC / HPLC with PDA Detector',
    subtitle: 'Purity, Identity & Consistency',
    image: '/peptides/image1.png',
    description:
      'Ultra Performance Liquid Chromatography (UPLC) with a Photodiode Array (PDA) detector is the foundation of peptide quality testing.',
    verifies: [
      'HPLC purity – Confirms the percentage of the target peptide',
      'Assay (potency) – Ensures correct concentration',
      'Related substances – Detects peptide fragments and synthesis by-products',
      'Retention time identity – Confirms the peptide behaves exactly as expected',
    ],
    importance:
      'High purity and consistent retention time ensure the peptide is chemically correct and reproducible batch to batch.',
  },
  {
    number: 2,
    title: 'LC–MS (Single Quadrupole, ESI)',
    subtitle: 'Molecular Weight & Intact Mass Confirmation',
    image: '/peptides/image2.png',
    description:
      'Liquid Chromatography–Mass Spectrometry (LC–MS) confirms the exact molecular mass of the peptide.',
    verifies: [
      'Intact mass confirmation',
      'Molecular weight accuracy',
      'Impurity mass detection',
    ],
    importance:
      'Even a single missing or altered amino acid changes the molecular weight. This step confirms the peptide is structurally correct, not just "close enough."',
  },
  {
    number: 3,
    title: 'LC–MS/MS (Triple Quadrupole)',
    subtitle: 'Sequence Confirmation & Fragment Analysis',
    image: '/peptides/image3.png',
    description:
      'Triple quadrupole LC–MS/MS goes deeper, breaking the peptide into fragments and verifying its sequence.',
    verifies: [
      'Sequence confirmation (MS/MS)',
      'Fragment identification',
      'Cross-contamination & carryover detection',
    ],
    importance:
      'This ensures the amino-acid sequence is exact, and that no residual peptides from previous runs contaminate the batch.',
  },
  {
    number: 4,
    title: 'Gas Chromatography with Headspace Sampler',
    subtitle: 'Residual Solvent Safety',
    image: '/peptides/image4.png',
    description:
      'Peptide synthesis involves organic solvents. Gas Chromatography (GC) ensures they\'re gone.',
    verifies: [
      'Residual solvent levels',
      'Compliance with accepted analytical thresholds',
    ],
    importance:
      'Confirms peptides are clean, safe, and free from synthesis solvents.',
  },
  {
    number: 5,
    title: 'Ion Chromatography',
    subtitle: 'Counterion & Inorganic Ion Verification',
    image: '/peptides/image5.png',
    description:
      'Ion Chromatography identifies the counterions paired with peptides.',
    verifies: [
      'Counterions such as TFA, acetate, or chloride',
      'Inorganic ion profile',
    ],
    importance:
      'Counterions affect stability, solubility, and analytical consistency.',
  },
  {
    number: 6,
    title: 'Karl Fischer Titration',
    subtitle: 'Water Content Accuracy',
    image: '/peptides/image6.png',
    description:
      'This test measures precise moisture content in lyophilized peptides.',
    verifies: ['Residual water percentage'],
    importance:
      'Too much moisture can degrade peptides. This ensures stability and shelf-life reliability.',
  },
  {
    number: 7,
    title: 'Amino Acid Analyzer',
    subtitle: 'Peptide Composition & Content',
    image: '/peptides/image7.png',
    description: 'This confirms peptide composition after hydrolysis.',
    verifies: [
      'Amino acid composition',
      'Peptide content determination',
    ],
    importance:
      'It provides independent confirmation that the peptide matches its declared structure.',
  },
  {
    number: 8,
    title: 'ICP–MS',
    subtitle: 'Heavy Metal & Elemental Impurity Testing',
    image: '/peptides/image8.png',
    description:
      'Inductively Coupled Plasma–Mass Spectrometry detects metals at parts-per-billion levels.',
    verifies: [
      'Heavy metals (lead, mercury, cadmium, arsenic)',
      'Trace elemental impurities',
    ],
    importance:
      'Ensures peptides are clean at the elemental level, not just organic purity.',
  },
  {
    number: 9,
    title: 'pH Testing',
    subtitle: 'Chemical Stability Check',
    image: '/peptides/image9.png',
    description:
      'This test measures the pH level of the final peptide solution to ensure proper chemical environment for stability.',
    verifies: ['Final solution pH (when applicable)'],
    importance:
      'pH affects stability, degradation rate, and compatibility in research environments.',
  },
  {
    number: 10,
    title: 'Stability Chambers',
    subtitle: 'Real-World & Accelerated Stability',
    image: '/peptides/image10.png',
    description:
      'Controlled chambers simulate time and temperature exposure.',
    verifies: [
      'Real-time stability',
      'Accelerated stability under stress conditions',
    ],
    importance:
      'Confirms peptides maintain purity and potency over time, not just on release day.',
  },
]

export default function QualityAssurancePage() {
  return (
    <MainLayout>
      <main className='bg-white'>
        <PageHeroWrapper
          heading='Peptide Testing & Quality Assurance'
          description='Every research peptide we supply undergoes multi layer analytical verification using advanced pharmaceutical grade instrumentation.'
          image={{
            src: heroImage,
            alt: 'Testing and quality assurance',
          }}
          variant='white'
          size='short'
        />

        {/* Overview Section */}
        <section className='py-16 md:py-20 lg:py-24 bg-white'>
          <div className='xmd-container'>
            <div className='max-w-3xl mx-auto text-center space-y-6'>
              <p className='text-lg md:text-xl text-muted-foreground leading-relaxed'>
                This ensures identity, purity, potency, and consistency not just
                on paper, but at the molecular level.
              </p>
              <div className='bg-background-accent p-8 md:p-12 rounded-lg'>
                <h2 className='text-2xl md:text-3xl font-bold uppercase tracking-wide mb-4'>
                  Our Testing Question
                </h2>
                <p className='text-lg md:text-xl font-semibold text-foreground'>
                  Is this peptide exactly what it claims to be, clean, accurate,
                  and reproducible?
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testing Methods Grid */}
        <div className='space-y-0'>
          {testingMethods.map((method, index) => (
            <section
              key={method.number}
              className={`py-16 md:py-20 lg:py-24 w-full ${
                index % 2 === 0 ? 'bg-white' : 'bg-background-accent'
              }`}
            >
              <div className='xmd-container'>
                {index === 0 && (
                  <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold uppercase mb-16 text-center'>
                    Our 10-Step Testing Protocol
                  </h2>
                )}
                <div
                  className={`grid md:grid-cols-2 gap-8 md:gap-12 items-start ${
                    index % 2 === 1 ? 'md:direction-rtl' : ''
                  }`}
                >
                  {/* Image Side */}
                  <div
                    className={`flex justify-center items-center ${
                      index % 2 === 1 ? 'md:order-2' : ''
                    }`}
                  >
                    {method.image ? (
                      <div className='relative w-full'>
                        <Image
                          src={method.image}
                          alt={method.title}
                          width={600}
                          height={500}
                          className='w-full h-auto rounded-lg shadow-lg'
                        />
                      </div>
                    ) : (
                      <div className='w-full min-h-96 bg-background rounded-lg flex items-center justify-center'>
                        <p className='text-muted-foreground font-medium'>
                          No image available
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Content Side */}
                  <div
                    className={`space-y-6 ${index % 2 === 1 ? 'md:order-1' : ''}`}
                  >
                    {/* Number Badge */}
                    <div className='inline-block'>
                      <span className='inline-block bg-Green-200 text-black font-bold text-sm md:text-base px-4 py-2 rounded-full'>
                        Step {method.number}
                      </span>
                    </div>

                    {/* Title */}
                    <div>
                      <h3 className='text-2xl md:text-3xl font-bold uppercase mb-2'>
                        {method.title}
                      </h3>
                      <p className='text-lg md:text-xl font-semibold text-emerald-700'>
                        {method.subtitle}
                      </p>
                    </div>

                    {/* Description */}
                    {method.description && (
                      <p className='text-base md:text-lg text-foreground leading-relaxed'>
                        {method.description}
                      </p>
                    )}

                    {/* What it Verifies */}
                    <div>
                      <h4 className='font-bold text-foreground mb-4 uppercase text-sm tracking-wide'>
                        What it verifies
                      </h4>
                      <ul className='space-y-3'>
                        {method.verifies.map((item, idx) => (
                          <li
                            key={idx}
                            className='flex gap-3 text-foreground text-sm md:text-base'
                          >
                            <span className='text-emerald-700 font-bold flex-shrink-0'>
                              ✓
                            </span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Why It Matters */}
                    <div className='pt-4 border-t border-border'>
                      <h4 className='font-bold text-foreground mb-3 uppercase text-sm tracking-wide'>
                        Why this matters
                      </h4>
                      <p className='text-foreground text-sm md:text-base leading-relaxed italic'>
                        {method.importance}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>

        {/* CTA Section */}
        <section className='w-full bg-White-100 lg:py-20'>
          <div className='w-full max-w-[1400px] mx-auto h-full bg-Green-200 p-10 md:p-20 rounded-lg'>
            <div className='flex justify-center items-center gap-10 flex-col w-full max-w-[650px] mx-auto'>
              <h2 className='text-2xl md:text-3xl lg:text-4xl md:leading-tight uppercase tracking-wider font-bold text-center text-black'>
                Guaranteed Quality. Verified Results.
              </h2>
              <p className='text-center text-black text-lg'>
                Every batch tested. Every molecule verified. Your confidence,
                our commitment.
              </p>
            </div>
          </div>
        </section>

        {/* Subscription */}
        <section className='w-full bg-background lg:py-20'>
          <SubscriptionComponent />
        </section>
      </main>
    </MainLayout>
  )
}
