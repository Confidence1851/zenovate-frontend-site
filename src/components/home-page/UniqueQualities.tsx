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
    <section className="bg-Green-200 space-y-24 pb-10 lg:pb-40">
      <div className="w-full max-w-[1550px] mx-auto h-full flex justify-end flex-col  px-2">
        <div className="flex flex-col gap-3 pt-32 w-full max-w-[1500px] mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-8xl uppercase  tracking-wider font-bold text-Green-100">
            discover the
          </h1>
          <h1 className="text-4xl md:text-5xl lg:text-8xl uppercase lg:text-right tracking-wider lg:pr-20 font-bold text-Green-100">
            zenovate differences
          </h1>
        </div>
      </div>
      {/* DIVIDER */}
      <div className="border w-full bg-Green-100" />

      <div className="max-w-[1550px] w-full mx-auto px-2">
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
