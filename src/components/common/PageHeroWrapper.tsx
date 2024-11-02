import React from "react";
interface PageHeroWrapperProps {
  heading: string;
  description: string;
  coloredHeading?: string;
}
const PageHeroWrapper: React.FC<PageHeroWrapperProps> = ({
  description,
  heading,
  coloredHeading,
}) => {
  return (
    <section className=" h-[calc(65dvh-60px)] min-h-[300px] md:h-[calc(70dvh-60px)] sm:max-h-[400px] lg:max-h-[550px] xl:max-h-fit bg-OffWhite-100 px-[5vw] sm:px-[3.5vw] lg:px-[3vw]">
      <div className="w-full max-w-[1550px] mx-auto h-full flex justify-end flex-col pb-10 sm:pb-16 ">
        <div className="w-full max-w-[750px] flex flex-col gap-3 md:gap-5">
          <h3 className="text-Black-100 text-2xl md:text-4xl lg:text-5xl leading-normal md:leading-[1.3] lg:leading-[1.3]  uppercase font-bold lg:tracking-wider">
            {heading}{" "}
            {coloredHeading && (
              <span className="text-Green-300">{coloredHeading}</span>
            )}
          </h3>
          <p className="text-Black-100 text-base lg:text-xl lg:leading-8">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
};

export default PageHeroWrapper;
