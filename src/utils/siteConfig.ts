type SocialPlatform = 'x' | 'instagram' | 'facebook' | 'linkedin';

interface SocialLink {
    url: string;
    handle: string;
}

interface LinkItem {
    label: string;
    href: string;
}

interface HeroSlide {
    title: string;
    description: string;
    buttonText: string;
    videoSrc: string;
    link: string;
}

interface SiteConfig {
    socialLinks: Record<SocialPlatform, SocialLink>;
    legalLinks: LinkItem[];
    footerLinks: LinkItem[];
    heroSlides: HeroSlide[];
}



export const siteConfig: SiteConfig = {
    socialLinks: {
        x: {
            url: 'https://x.com/@zenovate',
            handle: '@zenovate'
        },
        instagram: {
            url: 'https://instagram.com/zenovate',
            handle: '@zenovate'
        },
        facebook: {
            url: 'https://facebook.com/zenovate',
            handle: '@zenovate'
        },
        linkedin: {
            url: 'https://linkedin.com/company/zenovate',
            handle: 'zenovate'
        }
    },
    legalLinks: [
        { label: 'Privacy Policy', href: '/privacy-policy' },
        { label: 'Terms of Service', href: '/terms-of-service' },
        { label: 'Cookie Policy', href: '/cookie-policy' },
        { label: 'Accessibility', href: '/accessibility' }
    ],
    footerLinks: [
        { label: 'How it Works', href: '/how-it-works' },
        { label: 'Products', href: '/products' },
        { label: 'Blog', href: '/blog' },
        { label: 'About', href: '/about' },
        { label: 'FAQ', href: '/faq' },
        { label: 'Contact', href: '/contact' }
    ],
    heroSlides: [
        {
            title: 'Energize',
            description: 'Experience a better, healthier and longer life one shot at a time',
            buttonText: 'Get Started Today',
            videoSrc: '/videos/0762b1e1f802becd8900b5fc0336418b0582d7db2f821df7026c54850283c965.mp4',
            link: 'https://application.zenovate.health'
        },
        {
            title: 'Revitalize',
            description: "Unlock your body's potential with our natural energy boosters",
            buttonText: 'Discover More',
            videoSrc: '/videos/a381fff7e10dd19b9ed4ee.mp4',
            link: 'https://application.zenovate.health'
        },
        {
            title: 'Transform',
            description: 'Embrace a new you with our revolutionary wellness solutions',
            buttonText: 'Start Your Journey',
            videoSrc: '/videos/e10dd19b9ed4eeb5563358b674378dee.mp4',
            link: 'https://application.zenovate.health'
        }
    ]
} as const;