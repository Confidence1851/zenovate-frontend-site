'use client'

import { useRef } from 'react'
import { useTransform, useScroll, motion } from 'framer-motion';
// import styles from '@/styles/HomePage.module.css'
import styles from '@/styles/HowItWorks.module.css'
import Image from 'next/image'
import step1 from "@/assets/images/step-1.png";
import step2 from "@/assets/images/step-2.png";
import step3 from "@/assets/images/step-3.png";
import step4 from "@/assets/images/step-4.png";
import { AspectRatio } from '@/components/ui/aspect-ratio';

const colorOne = '#f3f4f6';
const colorTwo = '#fafafa';

const howItWorks = [
	{
		heading: 'Tell Us About Yourself',
		description:
			'Take a quick and simple health survey so we can learn about your medical history, lifestyle, and goals. This lets us tailor recommendations specifically to your needs.',
		bgColor: colorOne,
		color: colorTwo
	},
	{
		heading: 'Get Your Personalized Plan',
		description:
			'Based on your answers, our licensed prescribers analyze your profile and recommend a customized wellness plan that best matches your health goals.',
		bgColor: colorTwo,
		color: colorOne
	},
	{
		heading: 'Select & Confirm Your Treatment Plan',
		description:
			'Pick from the recommended therapies (wellness injections, or package options), adjust as needed, and finalize your personalized treatment plan. All online, on your schedule.',
		bgColor: colorOne,
		color: colorTwo
	},
	{
		heading: 'Delivery & Ongoing Support',
		description:
			'Once you confirm your plan, we ship your treatments discreetly to your door. Meanwhile, your licensed provider remains available for follow-up and continuous support. Ensuring safe, effective administration and ongoing care.',
		bgColor: colorTwo,
		color: colorOne
	}
]

interface Section {
	heading: string;
	description: string;
	bgColor: string;
	i: number;
	color: string;
}


interface SectionProps {
	heading: string;
	description: string;
	bgColor: string;
	i: number;
	color: string;
}


const stepImages = [step1, step2, step3, step4];


const Section: React.FC<Section> = ({ heading, description, bgColor, color, i }) => {
	const container = useRef(null)
	const { scrollYProgress } = useScroll({
		target: container,
		offset: ['start end', 'start start']
	})
	const scale = useTransform(scrollYProgress, [0, 1], [2, 1])
	const formatStepNumber = (index: number) => `Step ${String(index + 1)}`;

	return (
		<div ref={container} className={styles.cardContainer}>
			<div
				className={styles.card}
				style={{
					backgroundColor: bgColor,
					top: `calc(-5vh + ${i * 25}px)`
				}}
			>
				<div className={styles.leftSection}>
					<div className="space-y-4 w-full pr-32">
						<div className={styles.stepNumber}>
							{formatStepNumber(i)}
						</div>

						<div className="py-2">
							<div className='border-[0.8px] w-full border-muted-foreground' />
						</div>
					</div>

					<h2 className={styles.heading2}>{heading}</h2>
					<div
						className={styles.description}
					>
						<p>{description}</p>
					</div>
				</div>
				<div className={styles.rightSection}>
					<AspectRatio ratio={16 / 9} >
						<div className={styles.imageContainer}>
							<motion.div
								className={styles.inner}
								style={{ scale }}
							>
								<Image
									src={stepImages[i]}
									alt={heading}
									fill
									style={{ objectFit: 'cover' }}
								/>
							</motion.div>
						</div>
					</AspectRatio>
				</div>
			</div>
		</div>
	)
}

const SectionStatic: React.FC<SectionProps> = ({ heading, description, bgColor, color, i }) => {
	const formatStepNumber = (index: number) => `Step ${String(index + 1)}`;

	return (
		<div className={styles.cardContainerStatic}>
			<div
				className={`$styles.cardStatic`}
				style={{
					backgroundColor: bgColor,
				}}
			>
				<div className="md-container lg:px-12">
					<div className="flex flex-col md:flex-row justify-between relative py-12 gap-x-24">
						<div className={styles.leftSection}>
							<div className="space-y-4 w-full pr-32">
								<div className={styles.stepNumber}>
									{formatStepNumber(i)}
								</div>

								<div className="py-2">
									<div className='border-[0.8px] w-full border-muted-foreground' />
								</div>
							</div>

							<h2 className={styles.heading2}>{heading}</h2>
							<div
								className={styles.description}
							>
								<p>{description}</p>
							</div>
						</div>
						<div className={styles.rightSection}>
							<AspectRatio ratio={16 / 9} >
								<div className={styles.imageContainerStatic}>
									<div
										className={styles.inner}
									>
										<Image
											src={stepImages[i]}
											alt={heading}
											fill
											className='object-fill'
										/>
									</div>
								</div>
							</AspectRatio>
						</div>
					</div>

				</div>

			</div>
		</div>
	)
}

export function HowItWorks() {
	return (
		<main id="howItWorks" className={styles.main}>
			{howItWorks.map((section, i) => (
				<Section key={`section_${i}`} {...section} i={i} />
			))}
		</main>
	)
}

export function HowItWorksStatic() {
	return (
		<main id="howItWorksStatic" className={styles.mainStatic}>
			{howItWorks.map((section, i) => (
				<SectionStatic key={`section_${i}`} {...section} i={i} />
			))}
		</main>
	)
}