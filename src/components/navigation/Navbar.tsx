import { navLinks } from "@/utils/navigation";
import Logo from "./Logo";
import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowRight, HambergerMenu } from "iconsax-react";
import NavCont from "./NavCont";

const Navbar = () => {
  return (
    <NavCont>
      <nav className="py-4 bg-white  px-[5vw] sm:px-[3.5vw] lg:px-[3vw]">
        <div className="flex justify-between w-full max-w-[1550px] mx-auto items-center">
          <Logo className="text-xl lg:text-2xl" />
          {/* Navlinks */}
          <div className="xl:flex gap-6 hidden">
            {navLinks.map((item) => (
              <Link
                href={item.link}
                className="uppercase text-[17px] leading-6 font-semibold"
                key={item.label}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <Button className="hidden text-xl bg-Green-100 hover:bg-Green-300 text-White-100 h-10 xl:flex justify-between items-center p-4 gap-2">
            <span className="uppercase">sign up</span>
            <ArrowRight size="24" className="text-secondary-foreground" />
          </Button>
          <HambergerMenu
            className="xl:hidden text-Black-100  cursor-pointer"
            size={30}
          />
        </div>
      </nav>
    </NavCont>
  );
};

export default Navbar;
