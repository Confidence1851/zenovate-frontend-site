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
    <section className="h-[calc(70dvh-60px)] bg-OffWhite-100">
      <div className="w-full max-w-[1550px] mx-auto h-full flex justify-end flex-col pb-20 lg:pb-30 px-2">
        <div className="w-full max-w-[750px] flex flex-col gap-6">
          <h3 className="text-Black-100 text-2xl md:text-4xl lg:text-5xl leading-loose uppercase font-bold lg:tracking-wider">
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
