type SocialPlatform = 'x' | 'instagram' | 'facebook' | 'linkedin';
import { StaticImageData } from 'next/image';

interface SocialLink {
    url: string;
    handle: string;
}

interface LinkItem {
    label: string;
    href: string;
    category?: string;
}

interface HeroSlide {
    title: string;
    description: string;
    buttonText: string;
    videoSrc: string;
    link: string;
}


interface BlogPost {
    id: string;
    title: string;
    description?: string;
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
import image3 from '@/assets/images/546fdgfre454.png'
import image4 from '@/assets/images/article-4.jpeg'
import image5 from '@/assets/images/b4e2284fb44e5bf1aa285e70.jpg'
import image6 from '@/assets/images/nutrition.jpg'
import image7 from '@/assets/images/872403ab7663d45c41506034f0f9d52d.jpg'
import image8 from '@/assets/images/b9459467ea83927edd7f56d0f789b1c5.jpg'
import image9 from '@/assets/images/9d8a1c9e601a49672320e617247848bf.jpg'
import image10 from '@/assets/images/f35ccf45b3bd9fcfb4b68977aed32fa1.jpg'
import image11 from '@/assets/images/mental.jpg'
import image12 from '@/assets/images/nuts.jpg'
import content1 from '@/assets/blogs/article-1.md'
import content2 from '@/assets/blogs/article-2.md'
import content3 from '@/assets/blogs/article-3.md'
import content4 from '@/assets/blogs/article-4.md'
import content5 from '@/assets/blogs/article-5.md'
import content6 from '@/assets/blogs/article-6.md'
import content7 from '@/assets/blogs/article-7.md'
import content8 from '@/assets/blogs/article-8.md'
import content9 from '@/assets/blogs/article-9.md'
import content10 from '@/assets/blogs/article-10.md'
import content11 from '@/assets/blogs/article-11.md'
import content12 from '@/assets/blogs/article-12.md'

export const siteConfig: SiteConfig = {
    socialLinks: {
        x: {
            url: 'https://x.com/ZenovateInfo',
            handle: 'ZenovateInfo'
        },
        instagram: {
            url: 'https://instagram.com/zenovatehealth',
            handle: 'zenovatehealth'
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
        { label: 'Privacy Policy', href: '/legal/privacy-policy' },
        // { label: 'Terms of Service', href: '/legal/terms-of-service' },
        // { label: 'Cookie Policy', href: '/legal/cookie-policy' },
        { label: 'Website Disclaimer', href: '/legal/website-disclaimer' },
        { label: 'Legal Disclaimer', href: '/legal/legal-disclaimer' }
    ],
    footerLinks: [
        { label: 'FAQ', href: '/faq', category: 'Company' },
        { label: 'Blog', href: '/blog', category: 'Company' },
        { label: 'Contact', href: '/contact', category: 'Company' },
    ],
    heroSlides: [
        {
            title: 'Energize',
            description: 'Experience a better, healthier and longer life one shot at a time',
            buttonText: 'Get Started',
            videoSrc: '/videos/0762b1e1f802becd8900b5fc0336418b0582d7db2f821df7026c54850283c965.mp4',
            link: '/category/peptides'
        },
        {
            title: 'Revitalize',
            description: "Unlock your body's potential with our natural energy boosters",
            buttonText: 'Discover More',
            videoSrc: '/videos/a381fff7e10dd19b9ed4ee.mp4',
            link: '/category/peptides'
        },
        {
            title: 'Transform',
            description: 'Embrace a new you with our revolutionary wellness solutions',
            buttonText: 'Learn More',
            videoSrc: '/videos/e10dd19b9ed4eeb5563358b674378dee.mp4',
            link: '/category/peptides'
        }
    ],
    blogPosts: [
        addSlugToBlogPost({
            id: '1',
            title: 'The Power of NAD+: Your Key to Better Aging and Cellular Health',
            description: 'The Power of NAD+: Your Key to Better Aging and Cellular Health',
            date: '2024-12-02',
            images: [image1],
            content: content1,
            tags: ['nutrition', 'health', 'wellness'],
            featured: true
        }),
        addSlugToBlogPost({
            id: '2',
            title: 'The Wonders of Glutathione: Your Secret Weapon for Wellness and Radiance',
            description: 'The Power of NAD+: Your Key to Better Aging and Cellular Health',
            date: '2024-12-02',
            images: [image2],
            content: content2,
            tags: ['nutrition', 'health', 'wellness'],
            featured: true
        }),
        addSlugToBlogPost({
            id: '3',
            title: 'Fighting for Your Healthspan After 55: The New Era of Personalized Longevity',
            description: 'Introduction: A New Chapter in Aging',
            date: '2025-04-24',
            images: [image3],
            content: content3,
            tags: ['nutrition', 'health', 'wellness'],
            featured: true
        }),
        addSlugToBlogPost({
            id: '4',
            title: 'The Rise of At-Home Vitamin Injections: Is It for You?',
            description: 'What Are At-Home Vitamin Injections?',
            date: '2025-05-31',
            images: [image4],
            content: content4,
            tags: ['nutrition', 'health', 'wellness'],
            featured: true
        }),
        // Blogs from 2025-11-25 - commented out
        // addSlugToBlogPost({
        //     id: '5',
        //     title: 'BPC-157 & TB-500 — The Regeneration Peptide Duo the World Is Talking About',
        //     description: 'BPC-157 & TB-500 — The Regeneration Peptide Duo the World Is Talking About',
        //     date: '2025-11-25',
        //     images: [image5],
        //     content: content5,
        //     tags: ['peptides', 'health', 'wellness'],
        //     featured: true
        // }),
        // addSlugToBlogPost({
        //     id: '6',
        //     title: 'The Science Behind Ipamorelin & CJC-1295: A Modern Approach to GH Optimization',
        //     description: 'The Science Behind Ipamorelin & CJC-1295: A Modern Approach to GH Optimization',
        //     date: '2025-11-25',
        //     images: [image6],
        //     content: content6,
        //     tags: ['peptides', 'health', 'wellness'],
        //     featured: true
        // }),
        // addSlugToBlogPost({
        //     id: '7',
        //     title: 'Tesamorelin — The Visceral Fat-Targeting Peptide With Clinical Evidence',
        //     description: 'Tesamorelin — The Visceral Fat-Targeting Peptide With Clinical Evidence',
        //     date: '2025-11-25',
        //     images: [image7],
        //     content: content7,
        //     tags: ['peptides', 'health', 'wellness'],
        //     featured: true
        // }),
        // addSlugToBlogPost({
        //     id: '8',
        //     title: 'MOTS-c — The Mitochondrial Peptide Redefining Metabolic Wellness',
        //     description: 'MOTS-c — The Mitochondrial Peptide Redefining Metabolic Wellness',
        //     date: '2025-11-25',
        //     images: [image8],
        //     content: content8,
        //     tags: ['peptides', 'health', 'wellness'],
        //     featured: true
        // }),
        // addSlugToBlogPost({
        //     id: '9',
        //     title: 'Retatrutide — The Triple-Agonist Weight-Loss Peptide the World Is Watching',
        //     description: 'Retatrutide — The Triple-Agonist Weight-Loss Peptide the World Is Watching',
        //     date: '2025-11-25',
        //     images: [image9],
        //     content: content9,
        //     tags: ['peptides', 'health', 'wellness'],
        //     featured: true
        // }),
        // addSlugToBlogPost({
        //     id: '10',
        //     title: 'GHK-Cu — The Skin & Tissue Regeneration Peptide with 40+ Years of Research',
        //     description: 'GHK-Cu — The Skin & Tissue Regeneration Peptide with 40+ Years of Research',
        //     date: '2025-11-25',
        //     images: [image10],
        //     content: content10,
        //     tags: ['peptides', 'health', 'wellness'],
        //     featured: true
        // }),
        // addSlugToBlogPost({
        //     id: '11',
        //     title: 'Thymosin Alpha-1 — The Immune-Modulating Peptide Used Worldwide',
        //     description: 'Thymosin Alpha-1 — The Immune-Modulating Peptide Used Worldwide',
        //     date: '2025-11-25',
        //     images: [image11],
        //     content: content11,
        //     tags: ['peptides', 'health', 'wellness'],
        //     featured: true
        // }),
        // addSlugToBlogPost({
        //     id: '12',
        //     title: 'NAD+ — The Cellular Energy Peptide Fueling Longevity Research Worldwide',
        //     description: 'NAD+ — The Cellular Energy Peptide Fueling Longevity Research Worldwide',
        //     date: '2025-11-25',
        //     images: [image12],
        //     content: content12,
        //     tags: ['peptides', 'health', 'wellness'],
        //     featured: true
        // }),
    ]
} as const;
export type { BlogPost, BlogPostWithSlug };