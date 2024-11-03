import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import burger from "../../assets/images/hamburger-icon.svg";
import call from "../../assets/images/header-call.png";
// import arrowUp from "../../assets/images/arrow-up.svg";
import navArr from "../../assets/images/nav-arrow.png";
import navMobArr from "../../assets/images/nav-mob-arrow.png";
// import chevron from "../../assets/images/chevron-down.svg";
import cancel from "../../assets/images/cancel.svg";
import { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";

function Header() {
  const [openMenu, setOpenMenu] = useState(false);

  const [hidden, setHidden] = useState(false);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous && latest > 120) {
      if (!openMenu) {
        setHidden(true);
      }
    } else {
      setHidden(false);
    }
  });

  const menuVariants = {
    initial: {
      x: "-100%",
    },
    animate: {
      x: 0,

      transition: {
        ease: "easeInOut",
        duration: 0.5,
      },
    },
    exit: {
      x: "-100%",

      transition: {
        ease: "easeOut",
        duration: 0.5,
      },
    },
  };
  const menuBgVariants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 0.5,

      transition: {
        ease: "easeInOut",
        duration: 0.3,
      },
    },
    exit: {
      opacity: 0,

      transition: {
        ease: "easeOut",
        duration: 0.7,
      },
    },
  };

  const navlinks = [
    {
      name: "Clients",
      link: "/clients",
      type: "navlink",
    },
    {
      name: "Why Africa?",
      link: "/why-africa",
      type: "navlink",
    },

    {
      name: "Talents",
      link: "/talents",
      type: "navlink",
    },
    {
      name: "Products",
      type: "dropdown",
      dropDownLinks: [
        {
          name: "ProDevs AI",
          link: "/proDevsAI",
        },
        {
          name: "ProDevs Core",
          link: "/none",
        },
      ],
    },
    {
      name: "Services",
      type: "dropdown",
      dropDownLinks: [
        {
          name: "Direct Hire",
          link: "/services/direct-hire",
        },
        {
          name: "Outsourcing",
          link: "/services/outsourcing",
        },
        {
          name: "Team assembling",
          link: "/services/team-assembling",
        },
        {
          name: "Managed IT",
          link: "/services/managedit",
        },
        {
          name: "GIG’s and Contract",
          link: "/gigs",
        },
      ],
    },

    {
      name: "Pricing",
      link: "/pricing",
      type: "navlink",
    },
  ];
  return (
    <motion.div
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="z-50 fixed w-full  top-0 bg-transparent"
    >
      <div className="w-full relative py-3 ">
        <AnimatePresence>
          {openMenu && (
            <motion.div
              key="bgcolor"
              variants={menuBgVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              onClick={handleCloseMenu}
              className="w-full h-screen laptop:hidden bg-black opacity-50 absolute top-0 left-0"
            ></motion.div>
          )}
          {openMenu && (
            <motion.div
              key="menu"
              variants={menuVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              className="bg-white w-full tablet:w-[45%] z-[100] laptop:hidden h-[100svh] absolute flex flex-col gap-9 tablet:gap-10 overflow-scroll justify-start items-center pt-[74px] pb-8 tablet:pt-[80px] top-0 left-0 *:font-semibold *:text-xl *:leading-6  *:text-[#0967D2]"
            >
              <button
                onClick={handleCloseMenu}
                className="fixed top-[30px] right-[30px]"
              >
                <img src={cancel} alt="close menu" className="w-7" />
              </button>
              <NavLink onClick={handleCloseMenu} to="/">
                Home
              </NavLink>

              {navlinks.map((item, index) => {
                const openValue =
                  item.name === "Products" ? products : services;
                if (item.type === "dropdown") {
                  return (
                    <div key={index} className="">
                      <div
                        onClick={() => handleProSer(item.name)}
                        className="flex group cursor-pointer justify-center gap-2.5 items-center  relative"
                      >
                        <p>{item.name}</p>
                        <img
                          src={navMobArr}
                          alt={item.name}
                          className={`transition-transform ease-in-out duration-300 transform w-[14px] ${
                            openValue ? "rotate-180" : "rotate-0"
                          } `}
                        />
                      </div>
                      <div
                        className={`  transition-all grid  ease-in-out duration-500   ${
                          openValue
                            ? "grid-rows-[1fr] opacity-100"
                            : "grid-rows-[0fr] opacity-0"
                        } `}
                      >
                        <div className="overflow-hidden flex flex-col justify-center items-center gap-9 tablet:gap-10">
                          {item?.dropDownLinks?.map((item, index) => (
                            <NavLink
                              onClick={handleCloseMenu}
                              key={index}
                              to={item.link}
                              className="first:mt-9 tablet:first:mt-10"
                            >
                              {item.name}
                            </NavLink>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <NavLink
                      onClick={handleCloseMenu}
                      key={index}
                      to={item.link}
                    >
                      {item.name}
                    </NavLink>
                  );
                }
              })}

              <a
                onClick={handleCloseMenu}
                target="_blank"
                rel="noopener noreferrer"
                href="https://calendly.com/prodevs-207/30min"
                className=""
              >
                Talk to us
              </a>

              <button
                onClick={handleCloseMenu}
                className="bg-transparent outline-none border-none"
              >
                Apply as a talent
              </button>
              <a
                onClick={handleCloseMenu}
                target="_blank"
                rel="noopener noreferrer"
                href="https://app.prodevs.io/login"
                className=""
              >
                Sign in
              </a>
            </motion.div>
          )}
        </AnimatePresence>
        <div className=" w-[90vw] bg-white border-[0.5px] border-[#F1F5FA] rounded-[15px] tablet:rounded-[25px] max-w-[1280px] mx-auto flex justify-between items-center py-[11px] px-4 tablet:py-4 tablet:px-[20px] laptop:px-[30px]">
          <div className="flex justify-start items-center gap-5 ">
            <Link to="/">
              <img src={logo} className=" h-9 laptop:h-12" alt="logo" />
            </Link>
            <div className=" hidden laptop:flex justify-start items-center gap-7   *:text-[15px]    *:capitalize">
              {navlinks.map((item, index) => {
                if (item.type === "dropdown") {
                  return (
                    <div
                      key={index}
                      className="flex group cursor-pointer justify-center gap-2.5 items-center text-[#67737E] relative"
                    >
                      <p>{item.name}</p>
                      <img src={navArr} alt={item.name} className="w-[9px]" />
                      <div className="pt-[7px] absolute top-[100%] left-0">
                        <div className="w-[165px]  bg-white shadow-[0_0_21.9px_0_rgba(4,10,51,0.05)]   p-[15px] border-[0.5px] border-[#E9EAF2]  rounded-[9px] divide-y-[0.5px] divide-[#E9EAF2] hidden group-hover:inline-block">
                          {item?.dropDownLinks?.map((item, index) => (
                            <NavLink
                              key={index}
                              to={item.link}
                              className={({ isActive }) =>
                                `transition-all ease-linear duration-200 block py-2 first:pt-0 last:pt-2 last:pb-0 ${
                                  isActive
                                    ? " text-[#0967D2]  "
                                    : " text-[#67737E]"
                                } `
                              }
                            >
                              {item.name}
                            </NavLink>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <NavLink
                      key={index}
                      to={item.link}
                      className={({ isActive }) =>
                        `transition-all ease-linear duration-200 ${
                          isActive ? " text-[#0967D2]  " : " text-[#67737E]"
                        } `
                      }
                    >
                      {item.name}
                    </NavLink>
                  );
                }
              })}
            </div>
          </div>
          <div className=" hidden laptop:flex justify-center items-center gap-5">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://calendly.com/prodevs-207/30min"
              className="border-none outline-none flex justify-center items-center gap-[10px]"
            >
              <p className="text-[#0967D2]  text-[15px] leading-5">
                Talk to us
              </p>
              <img src={call} className="size-[17px]" alt="call" />
            </a>
            <button className="bg-[#0967D2]  text-[15px] leading-5 text-white p-3 w-[154px] rounded-[8px]">
              Apply as a talent
            </button>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://app.prodevs.io/login"
              className="   text-[15px] leading-5 text-[#0967D2] "
            >
              Login
            </a>
            {/* <a href="http://" target="_blank" rel="noopener noreferrer" className="text-[#212121]  font-semiBold text-sm">Talk to Us</a>
          <a href="http://" target="_blank" rel="noopener noreferrer" className="text-[#212121]  font-semiBold text-sm">Sign in</a> */}
          </div>
          <button onClick={() => setOpenMenu(true)} className="laptop:hidden">
            <img src={burger} alt="menu" className="w-[32px] " />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default Header;
