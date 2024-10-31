import React from "react";
import { Button } from "../ui/button";
import { ArrowRight } from "iconsax-react";

const Subscription = () => {
  return (
    <section className=" lg:p-32">
      <div className="w-full max-w-[1400px] mx-auto h-full  bg-Green-200 p-10 md:p-28">
        <div className="flex justify-center items-center gap-10 flex-col max-w-[500px] mx-auto">
          <h1 className="text-3xl md:text-4xl uppercase  tracking-wider font-bold text-center">
            get up to 10% off with an active subscription
          </h1>

          <p className="text-base lg:text-lg text-center">
            Unlock exclusive savings and never run out of your wellness
            essentials. Subscribe today to enjoy automatic deliveries,
            personalized product recommendations, and up to 20% off every order.
            Take control of your health journey, one month at a time.
          </p>
          <Button
            variant="lemon"
            className="flex justify-between items-center p-4 gap-2 w-full max-w-[300px] border border-Green-100 h-11"
          >
            <span className="uppercase text-xl font-semibold">
              subscribe & save
            </span>
            <ArrowRight size="24" className=" font-bold" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Subscription;
