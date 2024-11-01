import CustomersFeedback from "@/components/home-page/CustomersFeedback";
import UniqueQualities from "@/components/home-page/UniqueQualities";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "iconsax-react";

const HomePage = () => {
  return (
    <main className="mb-6 lg:mb-0">
      {/* HERO */}
      <section className="h-[calc(100dvh-60px)] sm:max-h-[600px] xl:max-h-fit  bg-Gray-200 px-[5vw] sm:px-[3.5vw] lg:px-[3vw]">
        <div className="w-full max-w-[1550px] mx-auto h-full flex justify-end flex-col pb-16 md:pb-[6rem] lg:pb-40 ">
          <div className="w-full max-w-[600px] flex flex-col gap-1 md:gap-4 lg:gap-6">
            <h3 className="text-OffWhite-100 text-2xl md:text-4xl lg:text-5xl leading-[44px] uppercase font-bold">
              energize
            </h3>
            <p className="text-OffWhite-100 text-lg md:text-xl">
              Experience enhanced energy, faster metabolism, improved exercise
              performance, and reinforced cellular defenses.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-White-100 px-[5vw] sm:px-[3.5vw] lg:px-[3vw]  py-10 md:py-16 lg:py-24">
        <div className="w-full max-w-[800px] mx-auto flex flex-col gap-5 lg:gap-10">
          <p className="text-Black-100  text-lg sm:text-xl font-medium leading-6 md:text-2xl">
            Welcome to Zenovate, your partner in precision nutrition and
            wellness. We understand that achieving optimal health can be
            challenging amidst the demands of modern life.
          </p>
          <p className="text-Black-100 text-lg sm:text-xl font-medium leading-6 md:text-2xl">
            That&apos;s why we&apos;ve revolutionized nutrient therapy,
            combining cutting-edge science with the convenience of at-home
            delivery to support your unique health journey.
          </p>
        </div>
      </section>

      {/* CUSTOMER FEEDBACK */}
      <CustomersFeedback />

      {/* ENDORSEMENT */}
      {/* <Endorsement /> */}

      {/* UNIQUENESS */}
      <UniqueQualities />

      <section className="bg-[#D9D9D9] h-[300px] md:h-[400px] xl:h-[600px] px-[5vw] sm:px-[3.5vw] lg:px-[3vw]">
        <div className="flex flex-col gap-3 justify-center w-full max-w-[1100px] mx-auto h-full px-2">
          <h1 className="text-4xl md:text-5xl lg:text-6xl text-center  tracking-wider font-bold text-Green-100 lowercase">
            Your Journey to Optimal Health
          </h1>
          <h1 className="text-4xl md:text-5xl lg:text-6xl text-center lg:text-right tracking-wider lg:pr-20 font-bold text-Green-100 italic lowercase">
            starts here
          </h1>
        </div>
      </section>

      <section className="bg-White-100 border-t border-Black-100 py-12 md:py-16 xl:py-0 ">
        <div className="w-full max-w-[1550px] mx-auto grid  xl:grid-cols-2  md:items-center">
          <div className=" xl:border-r xl:py-20  space-y-6 px-[5vw] sm:px-[3.5vw] xl:pr-20 xl:pl-[3vw]">
            <p className="text-lg md:text-xl leading-8">
              Whether you&apos;re a busy professional, an athlete, a wellness
              enthusiast, or anyone seeking to optimize their health, Zenovate
              is here to support you. Our personalized nutrient therapy,
              delivered right to your doorstep, makes prioritizing your
              well-being simple and effective.
            </p>
            <p className="text-lg md:text-xl">
              Take the First Step Towards Your Healthiest Self
            </p>
          </div>

          <div className="px-[5vw] sm:px-[3.5vw] xl:pl-20 xl:pr-[3vw] border-t mt-10 pt-10 md:mt-16 md:pt-16 xl:mt-0 xl:pt-0 xl:border-none">
            <Button className="flex justify-between items-center flex-wrap p-4 gap-x-6 gap-y-3 w-full sm:w-fit xl:w-full md:gap-x-20  min-h-12 h-fit bg-Black-100 text-White-100 hover:bg-Black-100 sm:mx-auto">
              <span className="uppercase mx-auto text-wrap text-sm md:text-base xl:text-xl self-center font-semibold">
                Start Your Zenovate Journey Today
              </span>
              <ArrowRight
                size="24"
                className="text-secondary-foreground mx-auto font-bold"
              />
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
