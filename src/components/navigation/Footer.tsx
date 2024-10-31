import { navLinks } from "@/utils/navigation";
import Logo from "./Logo";
import Link from "next/link";
import { Call, Facebook, Instagram, Location } from "iconsax-react";
import { Linkedin, Twitter } from "lucide-react";

const socialMedia = [
  {
    name: "X",
    link: "#",
    icon: <Twitter size={30} className="text-White-100 hover:text-Green-400" />,
    // icon: <X size={30} className="text-Green-400" />,
  },
  {
    name: "instagram",
    link: "#",
    icon: (
      <Instagram size={30} className="text-White-100 hover:text-Green-400" />
    ),
  },
  {
    name: "facebook",
    link: "#",
    icon: (
      <Facebook size={30} className="text-White-100 hover:text-Green-400" />
    ),
  },
  {
    name: "linkedin",
    link: "#",
    icon: (
      <Linkedin size={30} className="text-White-100 hover:text-Green-400" />
    ),
  },
];

const Footer = () => {
  return (
    <>
      <nav className="bg-Green-100 py-10 px-4 ">
        <div className="lg:grid grid-cols-2 w-full max-w-[1550px] mx-auto space-y-12 lg:space-y-0">
          <div className="flex justify-between flex-col gap-10">
            <h3 className="text-White-100 uppercase text-xl font-semibold lg:text-4xl">
              Stay in tune with your health.
            </h3>
            <Logo className="!text-White-100 text-xl lg:text-2xl" />
          </div>

          <div className="space-y-12">
            <div className="flex flex-col lg:flex-row gap-16">
              {/* explore more */}
              <div className="space-y-6">
                <h3 className="text-White-100 uppercase text-base font-semibold lg:text-xl">
                  explore more
                </h3>
                <div className="flex flex-col gap-4">
                  {navLinks.map((item) => (
                    <Link
                      href={item.link}
                      className="text-White-100 text-base uppercase hover:text-Green-400"
                      key={item.label}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="space-y-12 flex-1">
                {/* Community */}
                <div className="space-y-6">
                  <h3 className="text-White-100 uppercase text-base font-semibold lg:text-xl">
                    join our community
                  </h3>
                  <p className="text-White-100">
                    Sign up today to receive exclusive offers, health tips, and
                    updates on our latest products.
                  </p>
                </div>

                {/* Social media */}
                <div className="space-y-6">
                  <h3 className="text-White-100 uppercase text-base font-semibold lg:text-xl">
                    follow us on social media
                  </h3>
                  <div className="flex gap-4 items-center">
                    {socialMedia.map((item) => (
                      <Link href={item.link} key={item.name}>
                        {item.icon}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* trust and cert */}
            <div className="space-y-6">
              <h3 className="text-White-100 uppercase text-base font-semibold lg:text-xl">
                trust & certifications
              </h3>
              <p className="text-White-100">
                Your health is our priority. We proudly display our
                certifications and partnerships with trusted health
                organizations to ensure you receive only the best.
              </p>
            </div>
          </div>
        </div>
      </nav>

      <div className="bg-Black-100 px-4 py-10 ">
        <div className="w-full max-w-[1550px] mx-auto flex flex-col lg:flex-row justify-between gap-6">
          <div className="flex gap-4 items-center">
            <Call size="32" className="text-Green-400" />
            <p className="text-base text-White-100">(123) 456-7890</p>
          </div>
          <div className="flex gap-4 items-center">
            <Location size="32" className="text-Green-400" />
            <p className="text-base text-White-100">
              123 Random St. Wellness City, ST 12345
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
