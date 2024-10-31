const promises = [
  "Personalized, science-backed nutrient therapy formulations",
  "Expert medical guidance and support",
  "Convenient, at-home delivery and administration",
  "A commitment to your success and satisfaction",
];
const OurPromise = () => {
  return (
    <section className="bg-OffWhite-100 py-10 lg:py-20">
      <div className="w-full max-w-[1550px] mx-auto px-2 flex gap-4 flex-col lg:flex-row items-center">
        <div className="flex flex-col gap-10 lg:gap-6">
          <h1 className="text-4xl md:text-5xl lg:text-8xl uppercase  tracking-wider font-bold">
            our promise
          </h1>
          <p className="text-base md:text-lg">
            At Zenovate, we&apos;re dedicated to helping you achieve your
            highest potential for health and well-being. We promise to provide
            you with:
          </p>

          <ul className="flex flex-col gap-3">
            {promises.map((item, i) => (
              <li
                key={i}
                className="flex gap-2 items-start text-base font-semibold uppercase"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full h-[500px] bg-Green-300"></div>
      </div>
    </section>
  );
};

export default OurPromise;
