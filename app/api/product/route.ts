import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const products = await db.product.findMany();
    return NextResponse.json(products);
  } catch (error) {
    console.error("GET /api/product error:", error);
    return new NextResponse("Failed to fetch products", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, description, price, image, stock  } = body;

    const newProduct = await db.product.create({
      data: {
        title,
        description,
        price: parseFloat(price),
        image,
        stock: parseInt(stock) || 0,
        articleNumber: `A${Math.floor(1000 + Math.random() * 9000)}`,
        articleColorSize: "",
      },
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error("POST /api/product error:", error);
    return new NextResponse("Failed to create product", { status: 500 });
  }
}
