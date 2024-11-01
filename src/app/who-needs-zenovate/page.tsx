import PageHeroWrapper from "@/components/common/PageHeroWrapper";
import { ArrowRight } from "iconsax-react";

const cardDetails = [
  {
    heading: "Busy Professionals",
    description:
      "Enhance your energy, focus, and resilience to excel in your demanding career",
  },
  {
    heading: "Athletes",
    description:
      "Fuel your performance, speed up recovery, and maintain peak physical condition.",
  },
  {
    heading: "Wellness Enthusiasts",
    description:
      "Elevate your wellness routine with science-backed, personalized nutrient blends.",
  },
  {
    heading: "Chronic Illness Warriors",
    description:
      "Support your unique health needs and improve your quality of life with targeted nutrition.",
  },
  {
    heading: "Shift Workers",
    description:
      "Optimize your well-being and performance, no matter your work schedule.",
  },
  {
    heading: "Students and Young Adults",
    description:
      "Maintain optimal health and excel academically during this crucial time of growth and development.",
  },
  {
    heading: "Vegan and Vegetarian Community",
    description:
      "Ensure adequate nutrient intake and support your plant-based lifestyle with expert-formulated blends.",
  },
  {
    heading: "Elderly Individuals",
    description:
      "Age gracefully and maintain vitality, cognitive function, and overall health.",
  },
  {
    heading: "Busy Moms",
    description:
      "Prioritize your well-being to show up as your best self for your loved ones.",
  },
  {
    heading: "Postmenopausal Women",
    description:
      "Alleviate symptoms, promote hormone balance, and optimize health during this transformative life stage.",
  },
];

const WhoNeedsZenovatePage = () => {
  return (
    <main>
      <PageHeroWrapper
        description="Zenovate&lsquo;s personalized nutrient therapy is designed to support individuals from all walks of life in achieving optimal health and well-being."
        heading="Personalized Nutrient Therapy for Every Lifestyle"
      />
      <section className="py-12 md:py-16 lg:py-24 px-[5vw] sm:px-[3.5vw] lg:px-[3vw]">
        <div className="w-full max-w-[1550px] mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1200px] mx-auto">
            {cardDetails.map((item, i) => (
              <div
                className="h-[450px] bg-OffWhite-100 flex flex-col justify-end"
                key={i}
              >
                {/* <div className="flex justify-center items-center flex-1">
                  <h1 className="uppercase font-bold text-2xl">image here</h1>
                </div> */}
                <div className="bg-gradient-to-t  from-Black-100 to-OffWhite-100 gap-2.5 lg:gap-1.5 p-6 flex flex-col justify-between md:min-h-[182px] lg:min-h-[200px]">
                  <h3 className="text-2xl lg:text-4xl uppercase text-White-100">
                    {item.heading}
                  </h3>
                  <p className="text-OffWhite-100 text-sm uppercase">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-Green-200 py-6 px-[5vw] sm:px-[3.5vw] lg:px-[3vw]">
        <div className="w-full max-w-[1550px] mx-auto flex justify-between items-center  px-2">
          <p className="uppercase text-Green-100 text-lg md:text-xl font-semibold">
            Discover Your Personalized Nutrient Therapy Plan
          </p>
          <ArrowRight
            size={30}
            className="cursor-pointer text-Green-100 hover:text-Green-400"
          />
        </div>
      </section>
    </main>
  );
};

export default WhoNeedsZenovatePage;
