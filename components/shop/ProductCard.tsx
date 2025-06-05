import { AddToCartButton } from "@/components/ui/AddToCartButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardOverlay,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  Product: Product;
  onAddToCartLink?: string;
}
export interface Product {
  id: string;
  articleNumber: string;
  articleColorSize: string;
  image: string;
  title: string;
  description: string;
  price: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  Product,
  onAddToCartLink,
}) => {
  return (
    
      <Card
        data-cy="product"
        className="w-72 h-[420px] relative overflow-hidden rounded-xl border border-gray-200 shadow-lg"
      >
        <p data-cy="product-id" style={{ visibility: "hidden" }}>
          {Product.id}
        </p>
        {/* Bild som bakgrund */}
        <Image
          src={Product.image}
          alt={Product.title}
          fill
          className="object-cover"
        />

        {/* Transparent overlay */}
        <CardOverlay className="absolute bottom-0 left-0 w-full bg-white/70 p-4">
          <div className="flex justify-between items-end w-full">
            {/* Vänster del: Titel, färg, pris */}
            <div className="space-y-1">
              <CardHeader className="p-0 space-y-1">
                <CardTitle data-cy="product-title" className="text-base">
                  {Product.title}
                </CardTitle>
                <CardDescription
                  data-cy="product-description"
                  className="text-sm"
                >
                  {Product.articleColorSize}
                </CardDescription>
              </CardHeader>
              <p
                data-cy="product-price"
                className="text-xl font-bold text-gray-900"
              >
                {Product.price} kr
              </p>
            </div>

            {/* Höger del: Knappar vertikalt */}
            <div className="flex flex-col space-y-2">
              <Button
                asChild
                className="flex items-center justify-center px-4 py-1 bg-pink-400 hover:bg-pink-500 text-black rounded-full"
                data-cy="product-description"
              ></Button>
              <AddToCartButton
                product={Product}
                className="flex items-center justify-center px-4 py-1 bg-pink-400 hover:bg-pink-500 text-black rounded-full"
                data-cy="product-buy-button"
              >
                Buy
              </AddToCartButton>
              <Button className="flex items-center justify-center px-4 py-1 bg-pink-400 hover:bg-pink-500 text-black rounded-full">
                Detail
              </Button>
            </div>
          </div>
        </CardOverlay>
      </Card>

  );
};

export default ProductCard;
