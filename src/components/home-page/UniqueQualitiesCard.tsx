import React from "react";
interface UniqueQualitiesCardProps {
  cardContent: {
    heading: string;
    description: string;
  };
}

export const UniqueQualitiesCard: React.FC<UniqueQualitiesCardProps> = ({
  cardContent,
}) => {
  return (
    <div className="flex flex-col justify-between gap-5 md:gap-8">
      <div className="bg-Green-300 h-[300px] w-full"></div>

      <div className="flex-1 flex flex-col gap-1 md:gap-4">
        <h2 className="text-lg md:text-xl text-Green-100 uppercase font-semibold">
          {cardContent.heading}
        </h2>
        <p className="text-Black-100 text-base">{cardContent.description}</p>
      </div>
    </div>
  );
};
