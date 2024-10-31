import PageHeroWrapper from "@/components/common/PageHeroWrapper";
import CustomerReviews from "@/components/products-page/CustomerReviews";
import FeatureProducts from "@/components/products-page/FeatureProducts";
import Subscription from "@/components/products-page/Subscription";
import { ArrowRight } from "iconsax-react";

const ProductsPage = () => {
  return (
    <main>
      {/* HERO */}

      <PageHeroWrapper
        heading="your journey to a healthier you"
        description=" Discover premium wellness products designed to nourish your body,
              mind, and spirit. From natural supplements to holistic self-care
              essentials, we’ve got everything you need to thrive"
        coloredHeading="starts here"
      />

      {/* FEATURED PRODUTCS */}
      <FeatureProducts />

      {/* MORE PRODUCTS */}
      <section className="bg-Black-100 py-6">
        <div className="w-full max-w-[1550px] mx-auto flex justify-between items-center  px-2">
          <p className="uppercase text-White-100 text-xl">view all products</p>
          <ArrowRight
            size={30}
            className="cursor-pointer text-White-100 hover:text-Green-400"
          />
        </div>
      </section>

      {/* CUSTOMER REVIEW */}
      <CustomerReviews />

      {/* SUBSCRIPTION */}
      <Subscription />
    </main>
  );
};

export default ProductsPage;
