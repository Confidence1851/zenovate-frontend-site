import PageHeroWrapper from "@/components/common/PageHeroWrapper";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "iconsax-react";

const data = [
  {
    heading: "Sign Up",
    description: "",
  },
  {
    heading: "Personalized Consultation",
    description:
      "Begin your Zenovate journey with a comprehensive online health assessment and consultation with one of our licensed physicians. We'll take the time to understand your unique health history, lifestyle, and wellness goals to create a personalized treatment plan tailored to your needs.",
  },
  {
    heading: "Convenient At-Home Delivery",
    description:
      "Once your personalized nutrient therapy plan is developed, we'll deliver your precision-formulated injections right to your doorstep. Our easy-to-use subcutaneous injections come with clear instructions and all the necessary supplies for safe and effective administration in the comfort of your own home.",
  },
  {
    heading: "Ongoing Support and Optimization",
    description:
      "Your Zenovate journey doesn't end with delivery. Our team of licensed physicians and nutrition experts is here to support you every step of the way. Access expert guidance, track your progress, and adjust your treatment plan as needed through our user-friendly telemedicine platform.",
  },
];

const faq = [
  {
    heading: "How do I know if Zenovate is right for me?",
    description:
      " Zenovate's personalized nutrient therapy is designed to support individuals from all walks of life in achieving optimal health and well-being. Whether you're a busy professional, an athlete, a wellness enthusiast, or anyone seeking to elevate their health, Zenovate can help you reach your goals.",
  },
  {
    heading: " Is Zenovate safe?",
    description:
      "   Absolutely. All of our nutrient therapy formulations are developed by licensed physicians and nutrition experts, using only the highest quality, scientifically-backed ingredients. Our team works closely with you to ensure that your treatment plan is safe and effective for your unique needs.",
  },
  {
    heading: "How long does it take to see results?",
    description:
      "   While individual results may vary, many of our clients report feeling the benefits of Zenovate's personalized nutrient therapy within the first few weeks of treatment. Our team will work with you to monitor your progress and make any necessary adjustments to optimize your results.",
  },
];
const HowItWorksPage = () => {
  return (
    <main>
      <PageHeroWrapper
        description="At Zenovate, we've made personalized nutrient therapy easy and accessible. Here's how it works:"
        heading="ACHIEVE OPTIMAL HEALTH IN 3 Simple Steps"
      />
      <section className="bg-White-100 py-10 lg:py-20">
        <div className="w-full max-w-[1550px] mx-auto px-2">
          <div className="grid lg:grid-cols-2 gap-10 w-full max-w-[500px] lg:max-w-[1000px] mx-auto">
            {data.map((Item, i) => (
              <div className="flex gap-4 lg:even:pt-16 min-h-[250px]" key={i}>
                <h1 className="text-Gray-100 text-8xl font-bold">{i + 1}</h1>
                <div className="pt-6">
                  <h2 className="font-bold uppercase text-[42px]">
                    {Item.heading}
                  </h2>
                  <p className="text-base">{Item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-OffWhite-100 space-y-24 pb-10 lg:pb-40">
        <div className="w-full max-w-[1550px] mx-auto h-full flex justify-end flex-col  px-2">
          <div className="flex flex-col gap-3 pt-32 w-full max-w-[1200px] mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-8xl uppercase  tracking-wider font-bold text-Black-100">
              frequently
            </h1>
            <h1 className="text-4xl md:text-5xl lg:text-8xl uppercase lg:text-right tracking-wider lg:pr-20 font-bold text-Black-100">
              asked questions
            </h1>
          </div>
        </div>
        {/* DIVIDER */}
        <div className="border w-full bg-Green-100" />

        <div className=" max-w-[900px] mx-auto  w-full px-2">
          <Accordion type="single" className="gap-5 flex flex-col  w-full ">
            {faq.map((item, i) => (
              <AccordionItem
                value={item.heading}
                className="border-Gray-100 border "
                key={i}
              >
                <AccordionTrigger className="uppercase transition-transform duration-500 text-[14px] md:text-base px-4 font-semibold border-b-0 data-[state=open]:bg-Black-100 data-[state=open]:text-White-100 data-[state=open]:no-underline   bg-White-100">
                  {item.heading}
                </AccordionTrigger>
                <AccordionContent className="p-4 leading-4 md:leading-6 text-base md:text-lg bg-White-100">
                  {item.description}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="w-full bg-White-100 lg:py-32">
        <div className="w-full max-w-[1400px] mx-auto h-full  bg-Green-200 p-10 md:p-28">
          <div className="flex justify-center items-center gap-10 flex-col w-full max-w-[600px] mx-auto">
            <h1 className="text-3xl md:text-5xl uppercase  tracking-wider font-bold text-center">
              Ready to Start Your Zenovate Journey?
            </h1>

            <Button
              variant="lemon"
              className="flex justify-between items-center p-4 gap-2 w-fit border border-Green-100 h-11"
            >
              <span className="uppercase text-base lg:text-xl font-semibold">
                Book Your Personalized Consultation Now
              </span>
              <ArrowRight size="24" className=" font-bold" />
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HowItWorksPage;
