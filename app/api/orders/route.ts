import { db } from "@/prisma/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { customer, items } = body;

    if (!customer || !items || items.length === 0) {
      return new NextResponse("Missing customer or items data", {
        status: 400,
      });
    }

    const order = await db.order.create({
      data: {
        customerName: customer.name,
        customerEmail: customer.email,
        customerAddress: customer.address,
        customerZipcode: customer.zipcode,
        customerCity: customer.city,
        customerPhone: customer.phone,
        items: {
          create: items.map((item: any) => ({
            title: item.title,
            description: item.description,
            price: item.price,
            quantity: item.quantity,
            image: item.image,
            articleNumber: item.articleNumber,
          })),
        },
      },
      include: { items: true },
    });

    return NextResponse.json(order);
  } catch (error) {
    console.error("❌ Order creation failed:", error);
    return new NextResponse("Failed to create order", { status: 500 });
  }
}
