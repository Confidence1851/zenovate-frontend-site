import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion';
import ArrowIcon from '@/assets/icons/ArrowIcon';
import { ButtonProps } from "@/components/ui/button"
import { useState } from 'react';

export const CTAButton = ({ children, className, size = 'lg', ...props }: ButtonProps) => {
    const [isHovered, setIsHovered] = useState(false);

    const getAnimationConfig = (buttonSize: "default" | "sm" | "lg" | "icon" | null) => {
        switch (size) {
            case 'sm':
                return {
                    textMove: "2rem",
                    minWidth: "150px",
                    iconSize: "size-4"
                };
            case 'lg':
                return {
                    textMove: "4rem",
                    minWidth: "240px",
                    iconSize: "size-5"
                };
            default:
                return {
                    textMove: "3rem",
                    minWidth: "180px",
                    iconSize: "size-4"
                };
        }
    };

    const config = getAnimationConfig(size);

    const SPRING_CONFIG = {
        type: "spring",
        stiffness: 400,
        damping: 40,
        mass: 0.8
    };

    return (
        <Button
            size={size}
            variant='withIcon'
            className={`bg-primary text-background inline-flex px-8
                ${size === 'sm' ? 'min-w-[150px] text-sm' : 'min-w-[240px]'} 
                ${className}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            {...props}
        >
            <div className='relative flex items-center justify-between w-full gap-14'>
                <motion.span
                    initial={{ x: 0 }}
                    animate={{ x: isHovered ? config.textMove : 0 }}
                    transition={SPRING_CONFIG}
                    className="absolute left-0 whitespace-nowrap"
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
                    <ArrowIcon className={config.iconSize + ' text-background'} />
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
                    <ArrowIcon className={config.iconSize + ' text-background'} />
                </motion.div>
            </div>
        </Button>
    )
}