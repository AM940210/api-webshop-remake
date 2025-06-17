import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "@/lib/session/get-server-session";
import { NextRequest, NextResponse } from "next/server";

type OrderItem = {
  title: string;
  description: string;
  price: number;
  quantity: number;
  image?: string;
  articleNumber?: string;
};

type Customer = {
  name: string;
  email: string;
  address: string;
  zipcode: string;
  city: string;
  phone: string;
};

type OrderBody = {
  customer: Customer;
  items: OrderItem[];
};

export async function POST(req: NextRequest) {
  try {
    const session = await getAuthSession();
    const userId = session?.user?.id ?? null;

    const body = await req.json();
    const { customer, items } = body;

    if (
      !customer ||
      !customer.name ||
      !customer.email ||
      !items ||
      items.length === 0
    ) {
      return new NextResponse("Missing customer or items data", {
        status: 400,
      });
    }

    const orderData: any = {
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
    };

    if (userId) {
      orderData.userId = userId;
    }

    const order = await db.order.create({
      data: orderData,
      include: { items: true },
    });

    for (const item of items) {
      if (!item.articleNumber) continue;
      await db.product.update({
        where: { articleNumber: item.articleNumber },
        data: {
          stock: {
            decrement: item.quantity,
          },
        },
      });
    }

    return NextResponse.json(order);
  } catch (error) {
    console.error(
      "Order creation failed:",
      error instanceof Error ? error.message : error
    );
    return new NextResponse("Failed to create order", { status: 500 });
  }
}


export async function GET(req: NextRequest) {
  const session = await getAuthSession();
  const userId = session?.user?.id;

  if (!userId) {
    return new NextResponse("Not authenticated", { status: 401 });
  }

  try {
    const orders = await db.order.findMany({
      where: { userId },
      include: { items: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(orders);
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    return new NextResponse("Failed to fetch orders", { status: 500 });
  }
}
