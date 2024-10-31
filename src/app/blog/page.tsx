import ExpertInsights from "@/components/blogs/ExpertInsights";
import FeaturedArticles from "@/components/blogs/FeaturedArticles";
import SuccessStories from "@/components/blogs/SuccessStories";
import ZenovateNews from "@/components/blogs/ZenovateNews";
import PageHeroWrapper from "@/components/common/PageHeroWrapper";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "iconsax-react";

const BlogPage = () => {
  return (
    <main>
      <PageHeroWrapper
        description="Welcome to the Zenovate Blog & Resource Center, your go-to destination for expert insights, inspiring stories, and the latest advances in personalized nutrition and wellness."
        heading="Stay Informed, Stay Inspired: The Zenovate Blog & Resource Center"
      />
      <div className="px-2 space-y-10 md:space-y-20 py-20">
        <FeaturedArticles />
        <SuccessStories />
        <ExpertInsights />
        <ZenovateNews />
        <Button className="text-sm md:text-xl bg-Green-100 hover:bg-Green-300 text-White-100 h-10 flex justify-between items-center p-4 gap-8 mx-auto">
          <span className="uppercase">Explore the Blog & Resource Center</span>
          <ArrowRight size="24" className="text-secondary-foreground" />
        </Button>
      </div>
    </main>
  );
};

export default BlogPage;
