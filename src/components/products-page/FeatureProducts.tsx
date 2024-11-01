import { ArrowRight } from "iconsax-react";
import { Button } from "../ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
const products = [
  {
    name: "tripleDefense",
    description: "Enhanced defense system",
    content: "Optimized protection through a triple-component strategy.",
    items: ["Calcium", "Magnesium", "Glucosamine"],
    price: 39.99,
  },
  {
    name: "shapeup",
    description: "Fitness and health conditioning",
    content:
      "A holistic approach to improving physical fitness and overall well-being.",
    items: [
      "Personalized Workout Plans",
      "Nutritional Guidance",
      "Progress Tracking",
    ],
    price: 49.99,
  },
  {
    name: "phoslim",
    description: "Metabolic & weight management",
    content:
      "Designed to support a healthy metabolism and assist in weight control.",
    price: 34.99,
  },
  {
    name: "methylB12",
    description: "Brain & nerve function",
    content:
      "Vitamin B12 in its most bioavailable form to support neurological health.",
    price: 29.99,
  },
  {
    name: "nadCreation",
    description: "Boosts cellular energy and repair",
    content: "Critical for energy metabolism and cellular health.",
    price: 44.99,
  },
  {
    name: "biotinLixer",
    description: "Biotin to strengthen hair & skin",
    content:
      "A rich blend of biotin to strengthen and beautify hair, skin, and nails.",
    price: 24.99,
  },
  {
    name: "glutathione",
    description: "Powerful antioxidant for detoxification and immune support",
    content: "Supports detox processes and enhances antioxidant defenses.",
    price: 54.99,
  },
  {
    name: "vitaminD3",
    description: "Essential for bone health and immune function",
    content:
      "Critical for maintaining bone density and supporting immune system health.",
    price: 19.99,
  },
];

const FeatureProducts = () => {
  return (
    <section className="bg-White-100-100 space-y-24 py-12 md:py-16 lg:py-24 px-[5vw] sm:px-[3.5vw] lg:px-[3vw]">
      <div className="w-full max-w-[1550px] mx-auto  space-y-20">
        <div className="max-w-[1550px] mx-auto">
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full flex flex-col gap-10 md:gap-20"
          >
            <div className="flex  justify-between items-end">
              <p className="text-xl md:text-2xl max-w-[700px] font-semibold">
                Zenovate offers a range of personalized nutrient therapies
                designed to support specific health goals and address individual
                needs. Our precision-formulated injections are developed by
                licensed physicians and nutrition experts, ensuring safe and
                effective results.
              </p>
              <div className="lg:flex justify-end gap-10 items-center hidden">
                <CarouselPrevious className="!relative !left-0 !top-0  border-0 shadow-none p-0 translate-y-0" />
                <CarouselNext className="!relative !left-0 !top-0  border-0 shadow-none p-0 translate-y-0" />
              </div>
            </div>

            <CarouselContent>
              {products.map((item, i) => (
                <CarouselItem
                  key={i}
                  className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4  "
                >
                  <div
                    className="border gap-4 h-80 w-full p-8 flex flex-col justify-between flex-shrink-0"
                    key={item.name}
                  >
                    <div className="space-y-10">
                      <div>
                        <h3 className="text-lg font-semibold text-Black-100 uppercase">
                          {item.name}
                        </h3>
                        <h4 className="text-base text-Gray-100 uppercase">
                          {item.description}
                        </h4>
                      </div>
                      <p className="text-base text-Gray-100">{item.content}</p>
                    </div>

                    <Button
                      type="button"
                      className="flex justify-between items-center uppercase  h-11 w-fit gap-4 shadow-none border"
                    >
                      <span>Select</span>
                      <ArrowRight size={16} />
                    </Button>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <div className="flex justify-end gap-10 items-center lg:hidden">
              <CarouselPrevious className="!relative !left-0 !top-0  border-0 shadow-none p-0 translate-y-0" />
              <CarouselNext className="!relative !left-0 !top-0  border-0 shadow-none p-0 translate-y-0" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default FeatureProducts;
