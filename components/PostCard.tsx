import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// This is the structure of the data we expect for a single post
export interface Post {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  mainImage: {
    asset: {
      url: string;
    };
  };
  excerpt: string;
}

interface Props {
  post: Post;
}

export function PostCard({ post }: Props) {
  return (
    <Link href={`/blog/${post.slug.current}`}>
      <Card className="flex flex-col h-full hover:shadow-lg transition-shadow duration-300">
        <div className="relative w-full h-48">
          {post.mainImage?.asset?.url && (
            <Image
              src={post.mainImage.asset.url}
              alt={post.title}
              layout="fill"
              objectFit="cover"
              className="rounded-t-lg"
            />
          )}
        </div>
        <CardHeader>
          <CardTitle>{post.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">{post.excerpt}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
