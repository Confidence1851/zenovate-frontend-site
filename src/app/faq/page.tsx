import PageHeroWrapper from "@/components/common/PageHeroWrapper";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "iconsax-react";

const accordionData = [
  {
    heading: "What is Zenovate?",
    description:
      "Zenovate is a revolutionary nutrient therapy platform that combines personalized, science-backed formulations with the convenience of telemedicine and at-home delivery. Our mission is to empower individuals to achieve optimal health and well-being through precision nutrition and expert medical guidance.",
  },
  {
    heading: "How does Zenovate work?",
    description: "Zenovate works in three simple steps:",
    list: [
      " Complete a comprehensive online health assessment and consultation with a licensed physician.",
      "Receive your personalized nutrient therapy, delivered right to your doorstep.",
      "Access ongoing support, progress tracking, and treatment plan adjustments through our telemedicine platform.",
    ],
  },
  {
    heading: "Is Zenovate right for me?",
    description:
      "Zenovate's personalized nutrient therapy is designed to support a wide range of individuals, from busy professionals and athletes to wellness enthusiasts and those managing chronic health conditions. Our expert team will work with you to determine if Zenovate is the right fit for your unique health needs and goals.",
  },
  {
    heading: "Are Zenovate's nutrient therapies safe?",
    description:
      "Yes, all of Zenovate's nutrient therapy formulations are developed by licensed physicians and nutrition experts, using only the highest quality, scientifically-backed ingredients. Our team works closely with you to ensure that your personalized treatment plan is safe and effective.",
  },
  {
    heading: "How long does it take to see results with Zenovate?",
    description:
      "Individual results may vary, but many of our clients report experiencing the benefits of Zenovate's personalized nutrient therapy within the first few weeks of treatment. Our team will monitor your progress and make any necessary adjustments to optimize your results.",
  },
  {
    heading: "Is Zenovate covered by insurance?",
    description:
      "At this time, Zenovate's services are not typically covered by insurance. However, we strive to make our personalized nutrient therapy as accessible and affordable as possible. Please contact our team to discuss pricing and payment options.",
  },
  {
    heading: "How do I get started with Zenovate?",
    description:
      "Getting started with Zenovate is easy! Simply visit our website and click on the 'Get Started' button to begin your comprehensive online health assessment and consultation with a licensed physician. From there, our team will work with you to develop your personalized nutrient therapy plan and arrange for convenient at-home delivery.",
  },
];
const FAQPage = () => {
  return (
    <main>
      <PageHeroWrapper
        description="Find answers to common questions about our products, services, and more."
        heading="Frequently Asked Questions"
      />

      <div className="bg-White-100 py-10 md:py-20 lg:py-32 pb-0 space-y-20 md:space-y-32">
        {/* ACCORDDION */}
        <div className=" max-w-[900px] mx-auto  w-full px-2">
          <Accordion type="multiple" className="gap-5 flex flex-col  w-full ">
            {accordionData.map((item, i) => (
              <AccordionItem
                value={item.heading}
                className="border-Gray-100 border "
                key={i}
              >
                <AccordionTrigger className="uppercase transition-transform duration-500 text-[14px] md:text-base px-2 font-semibold border-b-0 data-[state=open]:bg-Black-100 data-[state=open]:text-White-100 data-[state=open]:no-underline  ">
                  {item.heading}
                </AccordionTrigger>
                <AccordionContent className="p-4 leading-4 md:leading-6 text-base md:text-lg">
                  <p>{item.description}</p>
                  {item.list && (
                    <ul>
                      {item.list.map((item, i) => (
                        <li className="list-decimal list-inside" key={i}>
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <section className="w-full">
          <div className="w-full max-w-[1400px] mx-auto h-full flex justify-center items-center gap-10 flex-col bg-Green-200 p-10 md:p-28">
            <h1 className="text-3xl md:text-4xl uppercase  tracking-wider font-bold text-center">
              Ready to Optimize Your Health?
            </h1>

            <Button
              variant="lemon"
              className="flex justify-between items-center p-4 gap-2 w-fit border border-Green-100 h-11"
            >
              <span className="uppercase text-base lg:text-xl font-semibold">
                start your zenovate journey today
              </span>
              <ArrowRight size="24" className=" font-bold" />
            </Button>
          </div>
        </section>
      </div>
    </main>
  );
};

export default FAQPage;
