import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ArticleCard from "./ArticleCard";
import BlogSectionWrapper from "./BlogSectionWrapper";

const successStories = [
  {
    id: "1",
    content:
      "From Burnout to Balance: How Sarah Reclaimed Her Health with Zenovate",
  },
  {
    id: "2",
    content: "Defying Age: Tom's Journey to Optimal Vitality in His 60s",
  },
  {
    id: "3",
    content:
      "Fueling Peak Performance: How Zenovate Helped Alex Take His Athletic Career to the Next Level ",
  },
  {
    id: "4",
    content:
      "Fueling Peak Performance: How Zenovate Helped Alex Take His Athletic Career to the Next Level ",
  },
  {
    id: "5",
    content:
      "Fueling Peak Performance: How Zenovate Helped Alex Take His Athletic Career to the Next Level ",
  },
];

const SuccessStories = async () => {
  const stories = await new Promise<typeof successStories>((resolve) => {
    setTimeout(() => {
      resolve(successStories);
    }, 3000); // logic for api call
  });
  return (
    <BlogSectionWrapper heading="success stories">
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent>
          {stories.map((item, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <ArticleCard article={item} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex justify-end gap-10 items-center mt-4">
          <CarouselPrevious className="!relative !left-0 !top-0  border-0 shadow-none p-0 translate-y-0" />
          <CarouselNext className="!relative !left-0 !top-0  border-0 shadow-none p-0 translate-y-0" />
        </div>
      </Carousel>
    </BlogSectionWrapper>
  );
};

export default SuccessStories;
