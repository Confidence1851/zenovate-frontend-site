import { UniqueQualitiesCard } from "./UniqueQualitiesCard";

const uniqueQualities = [
  {
    heading: "Expert Medical Guidance",
    description:
      "Our licensed physicians work closely with you to develop a personalized treatment plan tailored to your specific needs and goals.",
  },
  {
    heading: "Science-Backed Formulations",
    description:
      "We leverage the latest research to create precision-targeted nutrient blends that deliver optimal results.",
  },
  {
    heading: "Convenient At-Home Injections",
    description:
      "Our easy-to-use subcutaneous injections allow you to prioritize your health without disrupting your busy lifestyle.",
  },
  {
    heading: "Telemedicine Platform",
    description:
      "Access expert support, track your progress, and manage your personalized therapy through our user-friendly app.",
  },
];
const UniqueQualities = () => {
  return (
    <section className="bg-Green-200 space-y-12 md:space-y-14 xl:space-y-24 pb-12 md:pb-16 lg:pb-20 xl:pb-40">
      <div className="w-full mb-[-8px] md:mb-0 max-w-[1550px] mx-auto h-full flex justify-end flex-col  px-[5vw] sm:px-[3.5vw] lg:px-[3vw]">
        <div className="flex flex-col gap-0 lg:gap-3  pt-12 md:pt-16 lg:pt-20 xl:pt-32 w-full max-w-[1500px] mx-auto">
          <h1 className="text-3xl md:text-[44px] md:leading-tight xl:text-8xl uppercase  tracking-wider font-bold text-Green-100">
            discover the
          </h1>
          <h1 className="text-3xl md:text-[44px] md:leading-tight xl:text-8xl uppercase min-[1400px]:text-right tracking-wider  min-[1400px]:pr-20  font-bold text-Green-100">
            zenovate differences
          </h1>
        </div>
      </div>
      {/* DIVIDER */}
      <div className="border w-full bg-Green-100" />

      <div className="max-w-[1550px] w-full mx-auto px-[5vw] sm:px-[3.5vw] lg:px-[3vw]">
        {/* <div className="w-full overflow-x-scroll grid md:grid-cols-2 lg:flex  gap-6 custom-scrollbar pb-5 "> */}
        <div className="w-full grid md:grid-cols-2 xl:grid-cols-4  gap-8 custom-scrollbar pb-5">
          {uniqueQualities.map((item, i) => (
            <UniqueQualitiesCard cardContent={item} key={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default UniqueQualities;
