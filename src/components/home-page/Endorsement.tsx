const Endorsement = () => {
  return (
    <section className="bg-White-100 space-y-10">
      <div className="w-full max-w-[1550px] mx-auto h-full flex justify-end flex-col  px-2">
        <div className="flex flex-col gap-3 py-8 lg:py-20 w-full max-w-[1000px] mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-8xl uppercase  tracking-wider text-Black-100 font-bold">
            expert
          </h1>
          <h1 className="text-4xl md:text-5xl lg:text-8xl uppercase lg:text-right tracking-wider lg:pr-20 text-Black-100 font-bold">
            endorsement
          </h1>
        </div>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  px-2">
        <div className="border p-14 flex justify-center">
          <h1 className="text-5xl font-bold text-Gray-100 uppercase">
            Logo 01
          </h1>
        </div>
        <div className="border p-14 flex justify-center">
          <h1 className="text-5xl font-bold text-Gray-100 uppercase">
            Logo 01
          </h1>
        </div>
        <div className="border p-14 flex justify-center">
          <h1 className="text-5xl font-bold text-Gray-100 uppercase">
            Logo 01
          </h1>
        </div>
        <div className="border p-14 flex justify-center">
          <h1 className="text-5xl font-bold text-Gray-100 uppercase">
            Logo 01
          </h1>
        </div>
      </div>
    </section>
  );
};

export default Endorsement;
