
import { legalContent } from './content'


type PolicySection = {
    heading: string
    list: string[]
}

type LegalDocument = {
    id: string
    title: string
    shortTitle: string
    summary: {
        intro: string
        sections: PolicySection[]
    }
    fullContent?: string
    fullVersion: {
        intro: string
        content: string
    }
}

export const LEGAL_DOCUMENTS: LegalDocument[] = [
    {
        id: 'privacy-policy',
        title: 'Privacy Policy',
        shortTitle: 'Privacy',
        summary: {
            intro:
                `
                We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, disclose, and safeguard your data when you visit our website or use our services. By accessing our website, you agree to the terms outlined in this policy.
                `,
            sections: [
                {
                    heading: 'Information We Collect',
                    list: [
                        'Personal Information: Information you provide during the health assessment and consultation process, including name, contact details, and other identifying information.',
                        'Demographic Information: Such as age, gender, and location to tailor services and content.',
                        'Health Information: Medical history, lifestyle factors, and other health-related details you share to enable accurate telehealth consultations.',
                        'Website Usage Data: Collected through cookies and analytics tools to understand user behavior and improve the functionality of our website.',
                        'This information is collected in compliance with relevant privacy laws, including HIPAA (U.S.), PHIPA (Canada), and PIPEDA (Canada).'
                    ]
                },
                {
                    heading: 'How We Use Your Information',
                    list: [
                        'Health Services: To facilitate personalized health consultations with licensed healthcare providers.',
                        'Order Fulfillment: To process and deliver products like vitamin supplements, prescriptions, and other services.',
                        'Analytics and Improvement: To understand how users interact with the website and improve overall user experience.',
                        'Regulatory Compliance: To meet legal obligations under applicable privacy and healthcare laws.',
                        'Promotional Activities: With your consent, we may use your information for marketing communications, promotions, and product updates.'
                    ]
                },
                {
                    heading: 'How We Protect Your Information',
                    list: [
                        'Data Encryption: All personal and health-related information is encrypted both in transit and at rest.',
                        'Access Restrictions: Only authorized personnel have access to sensitive data, and they are bound by confidentiality agreements.',
                        'Regular Security Audits: We conduct frequent assessments of our systems to ensure compliance with privacy standards like HIPAA, PHIPA, and PIPEDA.',
                        'Third-Party Protections: When using third-party providers for services such as prescription fulfillment or product delivery, we ensure these partners follow strict data protection standards.'
                    ]
                },
                {
                    heading: 'Your Rights and Choices',
                    list: [
                        'Access and Correction: You have the right to access the personal information we hold about you and request corrections if necessary.',
                        'Data Deletion: You can request the deletion of your personal information, subject to legal and regulatory requirements.',
                        'Marketing Opt-Out: You may opt out of receiving promotional emails or messages at any time by contacting us.',
                        'Consent Withdrawal: If you’ve previously provided consent for data collection or use, you can withdraw your consent.',
                        'Telehealth Limitations: By using our telehealth services, you acknowledge the limitations of virtual healthcare, such as the inability to conduct a physical exam.'
                    ]
                }

            ]
        },
        fullVersion: {
            intro: `
                Last updated: November 20, 2024
            `,
            content: legalContent['privacy-policy']
        }
    },
    {
        id: 'terms-of-service',
        title: 'Terms of Service',
        shortTitle: 'Terms',
        summary: {
            intro: 'At Zenovate, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, disclose, and safeguard your data when you visit our website or use our services.',
            sections: [
                {
                    heading: 'Information We Collect',
                    list: [
                        '2Personal information you provide during the health assessment and consultation process',
                        'Demographic information such as age, gender, and location',
                        'Health information, including medical history and lifestyle factors',
                        'Website usage data collected through cookies and analytics tools'
                    ]
                },
                {
                    heading: 'How We Use Your Information',
                    list: [
                        'To provide you with personalized wellness plan recommendations and services',
                        'To communicate with you about your treatment plan and progress',
                        'To improve our products, services, and website experience  ',
                        'To send you relevant information, updates, and promotional offers (with your consent)',
                        'To comply with legal obligations and protect our rights'
                    ]
                },
                {
                    heading: 'How We Protect Your Information',
                    list: [
                        '2We implement strict security measures to safeguard your personal and health data ',
                        'We limit access to your information to authorized personnel only',
                        'We use encryption and secure storage technologies to protect your data',
                        'We do not sell, rent, or lease your personal information to third parties'
                    ]
                },
                {
                    heading: 'Your Rights and Choices  ',
                    list: [
                        'You have the right to access, update, and correct your personal information',
                        'You can opt-out of promotional communications at any time',
                        'You can request the deletion of your personal data, subject to legal requirements',
                        'You can contact us with any questions or concerns regarding your privacy'
                    ]
                }

            ]
        },
        fullVersion: {
            intro: 'At Zenovate, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, disclose, and safeguard your data when you visit our website or use our services.',
            content: legalContent['terms-of-service']
        }
    },
    {
        id: 'legal-disclaimer',
        title: 'Legal Disclaimer',
        shortTitle: 'Legal Disclaimer',
        summary: {
            intro: 'At Zenovate, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, disclose, and safeguard your data when you visit our website or use our services.',
            sections: [
                {
                    heading: 'Information We Collect',
                    list: [
                        '2Personal information you provide during the health assessment and consultation process',
                        'Demographic information such as age, gender, and location',
                        'Health information, including medical history and lifestyle factors',
                        'Website usage data collected through cookies and analytics tools'
                    ]
                },
                {
                    heading: 'How We Use Your Information',
                    list: [
                        'To provide you with personalized wellness plan recommendations and services',
                        'To communicate with you about your treatment plan and progress',
                        'To improve our products, services, and website experience  ',
                        'To send you relevant information, updates, and promotional offers (with your consent)',
                        'To comply with legal obligations and protect our rights'
                    ]
                },
                {
                    heading: 'How We Protect Your Information',
                    list: [
                        '2We implement strict security measures to safeguard your personal and health data ',
                        'We limit access to your information to authorized personnel only',
                        'We use encryption and secure storage technologies to protect your data',
                        'We do not sell, rent, or lease your personal information to third parties'
                    ]
                },
                {
                    heading: 'Your Rights and Choices  ',
                    list: [
                        'You have the right to access, update, and correct your personal information',
                        'You can opt-out of promotional communications at any time',
                        'You can request the deletion of your personal data, subject to legal requirements',
                        'You can contact us with any questions or concerns regarding your privacy'
                    ]
                }

            ]
        },
        fullVersion: {
            intro: 'At Zenovate, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, disclose, and safeguard your data when you visit our website or use our services.',
            content: legalContent['terms-of-service']
        }
    }
] as const;

export type LegalDocumentId = typeof LEGAL_DOCUMENTS[number]['id'];