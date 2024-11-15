import MissionAndValues from "@/components/about-page/MissionAndValues";
import OurPromise from "@/components/about-page/OurPromise";
import PageHeroWrapper from "@/components/common/PageHeroWrapper";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "iconsax-react";

const AboutPage = () => {
  return (
    <main>
      {/* HERO */}
      {/* <section className=" bg-White-100 pb-10 lg:pb-20">
        <div className="w-full max-w-[1550px] mx-auto px-2">
          <h3 className="text-4xl md:text-5xl lg:text-8xl uppercase  tracking-wider font-bold py-10 lg:py-20 md:text-center">
            The Zenovate <span className="text-Green-300">Story</span>
          </h3>

          <div className="w-full flex flex-col lg:flex-row gap-10 ">
            <p className="text-Black-100 text-base md:text-lg lg:text-xl leading-loose text-balance flex-1 text-justify">
              Founded by a team of passionate healthcare professionals and
              wellness enthusiasts, Zenovate was born out of a shared vision: to
              make personalized, effective nutrient therapy accessible to all.
              We saw a need for a solution that combines the power of precision
              nutrition with the convenience of telehealth and at-home delivery.
              <span>
                From humble beginnings to a global wellness brand, our journey
                started with a simple belief: everyone deserves access to clean,
                natural, and effective health solutions. It all began in a small
                kitchen where our founder, Jane Doe, started creating homemade
                remedies from organic herbs and natural ingredients to support
                her own wellness journey.
              </span>
              <span>
                What started as a passion for natural healing quickly grew into
                something much bigger. Friends and family began noticing the
                benefits and soon asked for their own remedies. Fueled by a deep
                desire to help others achieve optimal health, Jane decided to
                turn her kitchen creations into a brand that could make a real
                impact.
              </span>
              <span>
                Today, we’re proud to offer a full line of health and wellness
                products, trusted by thousands of people across the globe. Our
                commitment to quality, transparency, and sustainability remains
                at the core of everything we do, as we continue to innovate and
                bring you products that nourish your body and mind.
              </span>
            </p>

            <div className="grid gap-4 border lg:w-[700px] h-[450px] ">
              <div className="flex gap-4">
                <div className="h-full w-full bg-Green-100"></div>
                <div className="h-full w-full bg-Green-200"></div>
              </div>
              <div className="bg-Green-300"></div>
            </div>
          </div>
        </div>
      </section> */}

      <PageHeroWrapper
        heading="The Zenovate Story"
        description=" Founded by a team of passionate healthcare professionals and wellness enthusiasts, Zenovate was born out of a shared vision: to make personalized, effective nutrient therapy accessible to all. We saw a need for a solution that combines the power of precision nutrition with the convenience of telehealth and at-home delivery"
      />

      {/* Mission and values */}
      <MissionAndValues />

      {/* Our Mission */}
      <section className="bg-OffWhite-100 py-10 lg:py-16 px-[5vw] sm:px-[3.5vw] lg:px-[3vw]">
        <div className="w-full max-w-[1550px] mx-auto gap-6 lg:gap-16 ">
          <div className="">
            <h1 className="text-[28px] leading-9 md:text-[44px] md:leading-none xl:text-7xl uppercase  tracking-wider font-bold">
              our mission
            </h1>
            <h2 className="text-lg mt-1 md:mt-2 xl:mt-3 md:text-[28px] md:leading-9 xl:text-4xl uppercase text-Green-300 font-semibold">
              Empowering Optimal Health Through Personalized wellness shots
            </h2>
            <p className="mt-3 md:mt-5 xl:mt-9 text-black text-base md:text-lg xl:text-xl">
              At Zenovate, we believe that everyone deserves access to
              cutting-edge wellness solutions that fit seamlessly into their
              unique lifestyle. Our mission is to revolutionize the way
              individuals approach their health by providing personalized,
              science-backed wellness plans that delivers transformative
              results.
            </p>
          </div>
        </div>
      </section>
      {/* Our promise */}
      <OurPromise />
      {/* THE team */}
      {/* <Team /> */}

      <section className=" py-0  lg:py-16 lg:px-[3vw]">
        <div className="w-full max-w-[1400px] mx-auto h-full flex justify-center items-center gap-10 flex-col bg-Green-200 py-14 md:py-16 lg:py-20 px-[5vw] md:px-[3.5vw]">
          <div className="flex justify-center items-center gap-10 flex-col max-w-[800px] mx-auto">
            <h1 className="text-3xl md:text-4xl lg:text-[2.625rem] lg:leading-tight  uppercase  tracking-wider font-bold text-center">
              Join the Zenovate community today and experience the
              transformative power of personalized nutrient therapy.
            </h1>

            <Button
              variant="lemon"
              className="flex justify-between items-center flex-wrap p-4 gap-x-6 gap-y-3 w-full sm:w-fit  md:gap-x-16 md:gap-20 gap-3  border border-Green-100 min-h-11 h-fit "
            >
              <span className="uppercase mx-auto text-sm md:text-xl font-semibold">
                Start Your Journey to Optimal Health Now
              </span>
              <ArrowRight
                size="24"
                className=" mx-auto font-bold hidden md:inline-block"
              />
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;
