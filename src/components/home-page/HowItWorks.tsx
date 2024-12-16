'use client'

import { useRef } from 'react'
import { useTransform, useScroll, motion } from 'framer-motion';
import styles from '@/styles/HomePage.module.css'
import Image from 'next/image'
import step1 from "@/assets/images/step-1.jpg";
import step2 from "@/assets/images/step-2.jpg";
import step3 from "@/assets/images/step-3.jpg";
import step4 from "@/assets/images/step-4.jpg";
import { AspectRatio } from '@/components/ui/aspect-ratio';

const colorOne = '#f3f4f6';
const colorTwo = '#fafafa';

const howItWorks = [
	{
		heading: 'Tell us about yourself',
		description:
			'Take a quick health assessment to help us understand your needs and medical history.',
		bgColor: colorOne,
		color: colorTwo
	},
	{
		heading: 'Get personalized recommendations',
		description:
			"Based on your assessment, we'll suggest the most suitable treatment options for you.",
		bgColor: colorTwo,
		color: colorOne
	},
	{
		heading: 'Choose your treatment',
		description:
			'Select from our recommended treatments and create your personalized healthcare plan.',
		bgColor: colorOne,
		color: colorTwo
	},
	{
		heading: 'Receive ongoing support',
		description:
			'Get your treatments delivered discreetly to your door and access continuous support from our healthcare team.',
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
		<div className={styles.cardContainer}>
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
							<div
								className={styles.inner}
							>
								<Image
									src={stepImages[i]}
									alt={heading}
									fill
									style={{ objectFit: 'cover' }}
								/>
							</div>
						</div>
					</AspectRatio>
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