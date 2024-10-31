import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

const feedback = [
  {
    user: "john doe",
    text: "Zenovate has been a game-changer for my health and productivity. The personalized blends keep me energized and focused throughout my busy workday  ",
    profession: "busy professional",
    age: 45,
  },
  {
    user: "Mr. marco",
    text: "As an athlete, Zenovate has taken my performance to new heights. The targeted nutrition has been crucial for my recovery and overall physical condition.",
    profession: "athlete",
    age: 28,
  },
  {
    user: "Sara T",
    text: "I was skeptical at first, but the personalized approach really works! I've seen significant improvements in my energy levels and overall health.",
    profession: "footballer",
    age: "30",
  },
  {
    user: "Mark R",
    text: "The convenience of having high-quality health products delivered right to my door is a game changer. I can’t imagine going back!",
    profession: "footballer",
    age: "30",
  },
  {
    user: "Mosh O.",
    text: "The customer service is outstanding! They helped me customize my plan, and I’m thrilled with the results. I feel supported every step of the way",
    profession: "footballer",
    age: "30",
  },
  {
    user: "Mosh O.",
    text: "The customer service is outstanding! They helped me customize my plan, and I’m thrilled with the results. I feel supported every step of the way",
    profession: "footballer",
    age: "30",
  },
];
const CustomersFeedback = () => {
  return (
    <section className="bg-OffWhite-100 space-y-24 pb-20 lg:pb-40">
      <div className="w-full max-w-[1550px] mx-auto h-full flex justify-end flex-col  px-2">
        <div className="flex flex-col gap-5 pt-10 lg:pt-32 w-full mx-auto">
          <h2 className="text-2xl md:text-3xl lg:text-5xl uppercase text-Green-300 font-semibold">
            Real Stories, Real Transformations
          </h2>
          <h1 className="text-4xl md:text-5xl lg:text-8xl uppercase  tracking-wider font-bold">
            What our customers are saying
          </h1>
          {/* <h1 className="text-4xl md:text-5xl lg:text-8xl uppercase lg:text-right tracking-wider lg:pr-20 font-bold">
            are saying
          </h1> */}
        </div>
      </div>
      {/* DIVIDER */}
      <div className="border w-full bg-Black-100" />

      <div className="max-w-[1550px] mx-auto px-2">
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full space-y-10"
        >
          <CarouselContent>
            {feedback.map((item, i) => (
              <CarouselItem className="md:basis-1/2 lg:basis-1/3 " key={i}>
                <div className="flex flex-col justify-between gap-10 lg:gap-28 bg-White-100 border border-Black-100  p-8  h-full">
                  <h4 className="text-xl lg:text-2xl font-semibold">
                    {item.text}
                  </h4>
                  <h5 className="text-lg uppercase lg:text-xl font-semibold">
                    {item.user} , {item.age} , {item.profession}
                  </h5>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-end gap-10 items-center max-w-[1550px] mx-auto">
            <CarouselPrevious className="!relative !left-0 !top-0  border-0 shadow-none p-0 translate-y-0" />
            <CarouselNext className="!relative !left-0 !top-0  border-0 shadow-none p-0 translate-y-0" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default CustomersFeedback;
