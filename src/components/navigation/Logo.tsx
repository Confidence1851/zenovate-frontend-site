import { cn } from "@/lib/utils";
import { Raleway } from "next/font/google";
import Link from "next/link";
import React from "react";
const raleway = Raleway({
  weight: [
    "400",
    "100",
    "200",
    "300",
    "500",
    "900",
    "800",
    "700",
    "400",
    "600",
  ],
  subsets: ["latin"],
});

interface LogoProps {
  className?: string;
}
const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <Link href="/">
      <h4
        className={cn(
          className,
          `font-extrabold text-secondary tracking-wider capitalize ${raleway.className}`
        )}
      >
        Zenovate
      </h4>
    </Link>
  );
};

export default Logo;
