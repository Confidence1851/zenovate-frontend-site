import React from "react";
import { Button } from "../ui/button";
import { ArrowRight } from "iconsax-react";

const Subscription = () => {
  return (
    <section className=" py-0  lg:py-16 lg:px-[3vw]">
      <div className="w-full max-w-[1400px] mx-auto h-full  bg-Green-200 py-14 md:py-16 lg:py-20 px-[5vw] md:px-[3.5vw]">
        <div className="flex justify-center items-center gap-7 md:gap-10 flex-col max-w-[600px] mx-auto">
          <h1 className="text-3xl md:text-4xl lg:text-[2.625rem] lg:leading-tight  uppercase  tracking-wider font-bold text-center">
            get up to 10% off with an active subscription
          </h1>

          <p className="text-sm lg:text-lg text-center">
            Unlock exclusive savings and never run out of your wellness
            essentials. Subscribe today to enjoy automatic deliveries,
            personalized product recommendations, and up to 20% off every order.
            Take control of your health journey, one month at a time.
          </p>
          <Button
            variant="lemon"
            className="flex justify-between items-center p-4 gap-2 w-full max-w-[300px] border border-Green-100 h-11"
          >
            <span className="uppercase text-xl font-semibold mx-auto">
              subscribe & save
            </span>
            <ArrowRight
              size="24"
              className=" font-bold hidden md:inline-block"
            />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Subscription;
