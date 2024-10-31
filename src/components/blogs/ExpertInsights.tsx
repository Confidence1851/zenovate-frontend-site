import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import ArticleCard from "./ArticleCard";
import BlogSectionWrapper from "./BlogSectionWrapper";

const expertInsights = [
  {
    id: "1",
    content:
      "Q&A with Dr. Olivia Thompson: The Role of Nutrient Therapy in Immune Function",
  },
  {
    id: "2",
    content:
      "The Science of Cellular Health: An Interview with Dr. Peter Attia",
  },
  {
    id: "3",
    content:
      "Fueling Peak Performance: How Zenovate Helped Alex Take His Athletic Career to the Next Level ",
  },
];

const ExpertInsights = async () => {
  const insights = await new Promise<typeof expertInsights>((resolve) => {
    setTimeout(() => {
      resolve(expertInsights);
    }, 3000); // logic for api call
  });
  return (
    <BlogSectionWrapper heading="expert insights">
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent>
          {insights.map((item, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <ArticleCard article={item} />
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* <div className="flex justify-end gap-10 items-center">
              <CarouselPrevious className="!relative !left-0 !top-0  border-0 shadow-none p-0 translate-y-0" />
              <CarouselNext className="!relative !left-0 !top-0  border-0 shadow-none p-0 translate-y-0" />
            </div> */}
      </Carousel>
    </BlogSectionWrapper>
  );
};

export default ExpertInsights;
