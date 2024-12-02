'use client'

import { useRef } from 'react'
import { useTransform, useScroll, motion } from 'framer-motion';
import styles from '@/styles/HomePage.module.css'
import Image from 'next/image'
import step1 from "@/assets/images/step-1.jpg";
import step2 from "@/assets/images/step-2.jpg";
import step3 from "@/assets/images/step-3.jpg";
import step4 from "@/assets/images/step-4.jpg";
import { Button } from '../ui/button';

const colorOne = '#c8cfd0';
const colorTwo = '#fafafa';

const howItWorks = [
	{
		heading: 'sign up',
		description:
			'Begin your journey by signing up for an account. It’s quick and easy—just a few details to get started!',
		bgColor: colorOne,
		color: colorTwo
	},
	{
		heading: 'personalized quiz',
		description:
			"Once you're signed up, you'll take a short quiz designed to understand your unique health needs and preferences. This helps us recommend the best products tailored just for you!",
		bgColor: colorTwo,
		color: colorOne
	},
	{
		heading: 'Cart & Checkout',
		description:
			"Once you've found your perfect products, simply add them to your cart. Our streamlined checkout process is designed for convenience and security, ensuring a smooth experience from start to finish.",
		bgColor: colorOne,
		color: colorTwo
	},
	{
		heading: 'Convenient Delivery',
		description:
			'Sit back and relax as we deliver your selected products right to your doorstep! Enjoy premium health support without the stress of shopping.',
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

const stepImages = [step1, step2, step3, step4];


const Section: React.FC<Section> = ({ heading, description, bgColor, color, i }) => {
	const container = useRef(null)
	const { scrollYProgress } = useScroll({
		target: container,
		offset: ['start end', 'start start']
	})
	const scale = useTransform(scrollYProgress, [0, 1], [2, 1])

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
					<div style={{ color: color, }} className={styles.stepNumber}>
						{String(i + 1).padStart(2, '0')}
					</div>
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
				</div>
				<div className={styles.rightSection}>
					<h2
						style={{ color: color, }}
						className={styles.heading2}>{heading}</h2>
					<div style={{ color: color, }} className={styles.description}>
						<p>{description}</p>
					</div>
					<Button size="lg" className={styles.learnMore}>
						LEARN MORE
					</Button>
				</div>

			</div>
		</div>
	)
}

export default function HowItWorks() {
	return (
		<main id="howItWorks" className={styles.main}>
			{howItWorks.map((section, i) => (
				<Section key={`section_${i}`} {...section} i={i} />
			))}
		</main>
	)
}
