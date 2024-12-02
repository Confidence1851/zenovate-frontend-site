type SocialPlatform = 'x' | 'instagram' | 'facebook' | 'linkedin';
import { StaticImageData } from 'next/image';

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

// declare module '*.jpg' {
//     const content: string;
//     export default content;
// }

// declare module '*.md' {
//     const content: string;
//     export default content;
// }

interface BlogPost {
    id: string;
    title: string;
    subtitle?: string;
    images: StaticImageData[];
    date: string;
    content: string;
    author?: string;
    readTime?: string;
    tags?: string[];
    featured?: boolean;
}

function createSlug(title: string): string {
    return title
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
}

type BlogPostWithSlug = BlogPost & {
    slug: string;
};

function addSlugToBlogPost(post: BlogPost): BlogPostWithSlug {
    return {
        ...post,
        slug: createSlug(post.title)
    };
}

export function getRelatedArticles(currentPost: BlogPostWithSlug, allPosts: BlogPostWithSlug[], limit: number = 4) {
    return allPosts
        .filter(post =>
            post.id !== currentPost.id &&
            post.tags?.some(tag => currentPost.tags?.includes(tag))
        )
        .slice(0, limit);
}



interface SiteConfig {
    socialLinks: Record<SocialPlatform, SocialLink>;
    legalLinks: LinkItem[];
    footerLinks: LinkItem[];
    heroSlides: HeroSlide[];
    blogPosts: BlogPostWithSlug[];
}




import image1 from '@/assets/images/101589e1a6decdc226f18a128678c504.jpg'
import image2 from '@/assets/images/1c2f243cdf51a73f0c1d326159aaa492.jpg'
import content1 from '@/assets/blogs/article-1.md'
import content2 from '@/assets/blogs/article-2.md'

export const siteConfig: SiteConfig = {
    socialLinks: {
        x: {
            url: 'https://x.com/ZenovateInfo',
            handle: 'ZenovateInfo'
        },
        instagram: {
            url: 'https://instagram.com/zenovate.health',
            handle: 'zenovate.health'
        },
        facebook: {
            url: 'https://www.facebook.com/profile.php?id=61569482751880&sk=about',
            handle: 'zenovate-health'
        },
        linkedin: {
            url: 'https://www.linkedin.com/in/zenovate-health-913b54339',
            handle: 'zenovate-health'
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
    ],
    blogPosts: [
        addSlugToBlogPost({
            id: '1',
            title: 'The Power of NAD+: Your Key to Better Aging and Cellular Health',
            date: '2024-12-02',
            images: [image1],
            content: content1,
            tags: ['nutrition', 'health', 'wellness'],
            featured: true
        }),
        addSlugToBlogPost({
            id: '2',
            title: 'The Wonders of Glutathione: Your Secret Weapon for Wellness and Radiance',
            date: '2024-12-02',
            images: [image2],
            content: content2,
            tags: ['nutrition', 'health', 'wellness'],
            featured: true
        }),
    ]
} as const;
export type { BlogPost, BlogPostWithSlug };