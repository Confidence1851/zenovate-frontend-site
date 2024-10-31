import CustomersFeedback from "@/components/home-page/CustomersFeedback";
import UniqueQualities from "@/components/home-page/UniqueQualities";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "iconsax-react";

const HomePage = () => {
  return (
    <main>
      {/* HERO */}
      <section className="h-[calc(100dvh-60px)] bg-Gray-200">
        <div className="w-full max-w-[1550px] mx-auto h-full flex justify-end flex-col pb-40 px-2">
          <div className="w-full max-w-[600px] flex flex-col gap-6">
            <h3 className="text-OffWhite-100 text-2xl lg:text-5xl leading-[44px] uppercase font-bold">
              energize
            </h3>
            <p className="text-OffWhite-100 text-xl lg:text-2xl leading-[44px]">
              Experience enhanced energy, faster metabolism, improved exercise
              performance, and reinforced cellular defenses.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-White-100  p-10 lg:p-24">
        <div className="w-full max-w-[800px] mx-auto flex flex-col gap-5 lg:gap-10">
          <p className="text-Black-100  text-xl font-medium leading-6 md:text-2xl">
            Welcome to Zenovate, your partner in precision nutrition and
            wellness. We understand that achieving optimal health can be
            challenging amidst the demands of modern life.
          </p>
          <p className="text-Black-100 text-xl font-medium leading-6 md:text-2xl">
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

      <section className="bg-[#D9D9D9] h-[400px] lg:h-[700px]">
        <div className="flex flex-col gap-3 justify-center w-full max-w-[1100px] mx-auto h-full px-2">
          <h1 className="text-4xl md:text-5xl lg:text-6xl  tracking-wider font-bold text-Green-100 lowercase">
            Your Journey to Optimal Health
          </h1>
          <h1 className="text-4xl md:text-5xl lg:text-6xl uppercase lg:text-right tracking-wider lg:pr-20 font-bold text-Green-100 italic lowercase">
            starts here
          </h1>
        </div>
      </section>

      <section className="bg-White-100 border-t border-Black-100 py-20 lg:py-0">
        <div className="w-full max-w-[1550px] mx-auto grid gap-20 lg:grid-cols-2 px-2 md:items-center">
          <div className="lg:border-r lg:p-10 xl:p-20 space-y-6">
            <p className="text-base md:text-xl leading-8">
              Whether you&apos;re a busy professional, an athlete, a wellness
              enthusiast, or anyone seeking to optimize their health, Zenovate
              is here to support you. Our personalized nutrient therapy,
              delivered right to your doorstep, makes prioritizing your
              well-being simple and effective.
            </p>
            <p className="text-base md:text-xl">
              Take the First Step Towards Your Healthiest Self
            </p>
          </div>

          <Button className="flex justify-between items-center p-4 gap-6 md:gap-20  h-12 bg-Black-100 text-White-100 hover:bg-Black-100 w-fit lg:mx-auto">
            <span className="uppercase text-base xl:text-xl font-semibold">
              Start Your Zenovate Journey Today
            </span>
            <ArrowRight
              size="24"
              className="text-secondary-foreground font-bold"
            />
          </Button>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
