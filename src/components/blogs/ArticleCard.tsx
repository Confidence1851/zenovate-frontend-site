import { Card, CardContent } from "@/components/ui/card";
import { MoveUpRight } from "lucide-react";
import Link from "next/link";

type ArticleType = {
  content: string;
  id: string;
};
interface ArticleCardProps {
  article: ArticleType;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  return (
    <Card className=" p-1 border-0 shadow-none">
      <CardContent className="flex flex-col items-center p-0 gap-4">
        <div className="h-[300px] w-full bg-OffWhite-100" />
        <div className="flex justify-between w-full">
          <p className="text-sm font-semibold max-w-[70%]">{article.content}</p>
          <Link href={`/blog/${article.id}`}>
            <MoveUpRight size={16} />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default ArticleCard;
