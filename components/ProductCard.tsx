// app/components/ProductCard.tsx
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Product {
  productName: string;
  productImage: string;
  affiliateLink: string;
  description: string;
}

interface Props {
  product: Product;
}

export function ProductCard({ product }: Props) {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="text-lg">{product.productName}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col flex-grow">
        {/* The image component would go here if needed, or just text */}
        <p className="text-gray-600 flex-grow mb-4">{product.description}</p>
        <Button asChild className="mt-auto">
          <Link
            href={product.affiliateLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            Check Price
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
