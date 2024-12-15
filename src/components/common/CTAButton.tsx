import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion';
import ArrowIcon from '@/assets/icons/ArrowIcon';
import { ButtonProps } from "@/components/ui/button"
import { useState } from 'react';

export const CTAButton = ({ children, className, ...props }: ButtonProps) => {
    const [isHovered, setIsHovered] = useState(false);

    const SPRING_CONFIG = {
        type: "spring",
        stiffness: 400,
        damping: 40,
        mass: 0.8
    };

    return (
        <Button
            variant='withIcon'
            size='lg'
            className={`bg-primary hover:bg-primary-foreground text-background hidden lg:inline-block px-8 ${className}`}
            {...props}
        >
            <div
                className='relative flex items-center justify-between w-full gap-24 min-w-full'
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{ minHeight: '40px', minWidth: '200px' }}
            >
                <motion.span
                    initial={{ x: 0 }}
                    animate={{ x: isHovered ? "4rem" : 0 }}
                    transition={SPRING_CONFIG}
                    className="absolute left-0"
                >
                    {children}
                </motion.span>

                {/* Initial arrow on the right */}
                <motion.div
                    initial={{ opacity: 1, scale: 1, x: '100%' }}
                    animate={{
                        opacity: isHovered ? 0 : 1,
                        scale: isHovered ? 0 : 1,
                        x: isHovered ? '50%' : '100%'
                    }}
                    transition={SPRING_CONFIG}
                    className="absolute right-0"
                >
                    <ArrowIcon className='size-5 text-background' />
                </motion.div>

                {/* Arrow that appears from the left */}
                <motion.div
                    initial={{ opacity: 0, scale: 0, x: '-100%' }}
                    animate={{
                        opacity: isHovered ? 1 : 0,
                        scale: isHovered ? 1 : 0,
                        x: isHovered ? 0 : '-100%'
                    }}
                    transition={SPRING_CONFIG}
                    className="absolute left-0"
                >
                    <ArrowIcon className='size-5 text-background' />
                </motion.div>
            </div>
        </Button>
    )
}