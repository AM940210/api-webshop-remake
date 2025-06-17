import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(_: NextRequest, { params }: { params: { articleNumber: string } }) {
  const { articleNumber } = params;

  try {
    const product = await db.product.findUnique({
      where: { articleNumber },
    });

    if (!product) {
      return new NextResponse("Not found", { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("GET /api/product/[articleNumber] error:", error);
    return new NextResponse("Failed to fetch product", { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { articleNumber: string } }) {
  const { articleNumber } = params;
  const body = await req.json();
  const { title, description, price, image, stock  } = body;

  try {
    const updated = await db.product.update({
      where: { articleNumber },
      data: {
        title,
        description,
        price: parseFloat(price),
        image,
        stock: parseInt(stock),
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("PUT /api/product/[articleNumber] error:", error);
    return new NextResponse("Failed to update", { status: 500 });
  }
}

export async function DELETE(_: NextRequest, { params }: { params: { articleNumber: string } }) {
  const { articleNumber } = params;

  try {
    const existing = await db.product.findUnique({
      where: { articleNumber },
    });

    if (!existing) {
      return new NextResponse("Product not found", { status: 404 });
    }

    await db.product.delete({
      where: { articleNumber },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("DELETE /api/product/[articleNumber] error:", error);
    return new NextResponse("Failed to delete product", { status: 500 });
  }
}
