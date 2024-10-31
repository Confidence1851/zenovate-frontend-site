const feedback = [
  {
    user: "john doe",
    text: "Since I started my subscription, I've never felt better! The personalized products have transformed my wellness journey.",
  },
  {
    user: "Mr. marco",
    text: "The quality is unmatched! I love knowing that I’m getting premium health products every month",
  },
  {
    user: "Sara T",
    text: "I was skeptical at first, but the personalized approach really works! I've seen significant improvements in my energy levels and overall health.",
  },
  {
    user: "Mark R",
    text: "The convenience of having high-quality health products delivered right to my door is a game changer. I can’t imagine going back!",
  },
  {
    user: "Mosh O.",
    text: "The customer service is outstanding! They helped me customize my plan, and I’m thrilled with the results. I feel supported every step of the way",
  },
  {
    user: "Mosh O.",
    text: "The customer service is outstanding! They helped me customize my plan, and I’m thrilled with the results. I feel supported every step of the way",
  },
];
const CustomerReviews = () => {
  return (
    <section className="bg-OffWhite-100 space-y-24 pb-20 lg:pb-40">
      <div className="w-full max-w-[1550px] mx-auto h-full flex justify-end flex-col  px-2">
        <div className="flex flex-col gap-3 pt-8 lg:pt-20 w-full mx-auto max-w-[900px]">
          <h1 className="text-4xl md:text-5xl lg:text-8xl uppercase  tracking-wider font-bold">
            customer
          </h1>
          <h1 className="text-4xl md:text-5xl lg:text-8xl uppercase lg:text-right tracking-wider lg:pr-20 font-bold">
            reviews
          </h1>
        </div>
      </div>
      {/* DIVIDER */}
      <div className="border w-full bg-Black-100" />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-[1550px] mx-auto px-2">
        {feedback.map((item, i) => (
          <div
            className="border border-Black-100 p-8 flex flex-col justify-between gap-10 bg-White-100"
            key={i}
          >
            <h4 className="text-xl lg:text-2xl font-semibold">{item.text}</h4>
            <h5 className="text-xl uppercase lg:text-2xl font-semibold">
              {item.user}
            </h5>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CustomerReviews;
