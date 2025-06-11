import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
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
    const body: OrderBody = await req.json();
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

    const order = await db.order.create({
      data: {
        customerName: customer.name,
        customerEmail: customer.email,
        customerAddress: customer.address,
        customerZipcode: customer.zipcode,
        customerCity: customer.city,
        customerPhone: customer.phone,
        items: {
          create: items.map((item) => ({
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

// Hämta alla ordrar för en kund (GET /api/orders?email=kund@mail.se)
export async function GET(req: NextRequest) {
  const session = await auth.api.session(req);
  const email = session?.user?.email;

  if (!email) {
    return new NextResponse("Not authenticated", { status: 401 });
  }

  try {
    const orders = await db.order.findMany({
      where: { customerEmail: email },
      include: { items: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(orders);
  } catch (error) {
    console.error("❌ Order creation failed:", error);
    return new NextResponse("Failed to fetch orders", { status: 500 });
  }
}
