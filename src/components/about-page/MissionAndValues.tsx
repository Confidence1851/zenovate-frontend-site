import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

const values = [
  {
    heading: "Personalization",
    content:
      "We understand that each individual&apos;s health journey is unique. That's why we work closely with you to develop a tailored treatment plan that addresses your specific needs and goals",
  },
  {
    heading: "Scientific Experitse",
    content:
      "Our team of licensed physicians and nutrition experts stays at the forefront of the latest research to ensure that our formulations are both safe and effective.",
  },
  {
    heading: "Convenience",
    content:
      "We believe that prioritizing your health shouldn't come at the cost of your busy lifestyle. With our at-home injections and telemedicine platform, you can experience the benefits of personalized nutrient therapy without disrupting your daily routine",
  },
  {
    heading: "Empowerment",
    content:
      "We&apos;re committed to empowering you with the knowledge and tools you need to take control of your health. Our team is here to support you every step of the way, from initial consultation to ongoing progress tracking and optimization.",
  },
];

const MissionAndValues = () => {
  return (
    <section className="bg-White-100 space-y-24 pb-20 lg:pb-40">
      <div className="w-full max-w-[1550px] mx-auto h-full flex justify-end flex-col  px-2">
        <div className="flex flex-col gap-3 pt-8 lg:pt-20 w-full mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-8xl uppercase  tracking-wider font-bold">
            our approach
          </h1>
          <h1 className="text-4xl md:text-5xl lg:text-8xl uppercase lg:text-right tracking-wider lg:pr-20 font-bold text-Green-300">
            what makes us different
          </h1>
        </div>
      </div>
      {/* DIVIDER */}
      <div className="border w-full bg-Black-100" />

      <div className=" w-full max-w-[1550px] mx-auto px-2 xl:px-0">
        <Carousel className="flex flex-col gap-10">
          <CarouselContent className="gap-8 ml-4">
            {values.map((item, i) => (
              <CarouselItem
                className="md:basis-1/2 lg:basis-1/3 flex flex-col justify-between gap-10 lg:gap-28 bg-White-100  pl-0 md:pl-4"
                key={i}
              >
                <div
                  className=" gap-4 w-full flex flex-col justify-between flex-shrink-0"
                  key={i}
                >
                  <h1 className="text-3xl uppercase font-bold">
                    Title goes here
                  </h1>
                  <h3>
                    We understand that each individual&apos;s health journey is
                    unique. That&apos;s why we work closely with you to develop
                    a tailored treatment plan that addresses your specific needs
                    and goals.
                  </h3>
                  <div className="w-full h-[300px] bg-Green-200"></div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-end gap-10 items-center">
            <CarouselPrevious className="!relative !left-0 !top-0  border-0 shadow-none p-0 translate-y-0" />
            <CarouselNext className="!relative !left-0 !top-0  border-0 shadow-none p-0 translate-y-0" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default MissionAndValues;
