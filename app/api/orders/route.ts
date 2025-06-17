import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "@/lib/session/get-server-session";
import { Description } from "@radix-ui/react-dialog";
import Email from "next-auth/providers/email";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod"

// Zod-schema för ordervalidering
const orderSchema = z.object({
  customer: z.object({
    name: z.string().min(2, "Name must be att least 2 characters"),
    email: z.string().email("Invalid email address"),
    address: z.string().min(5, "Address must be att least 5 characters"),
    zipcode: z.string().regex(/^\d{5}$/, "Postal code must be exactly 5 digits"),
    city: z.string().min(2, "City must be att least 2 characters"),
    phone: z.string().min(6, "Phone number must be at least 6 characters"),
  }),
  items: z.array(
    z.object({
      title: z.string().min(1),
      description: z.string().min(1),
      price: z.number().positive(),
      quantity: z.number().int().positive(),
      image: z.string().optional(),
      articleNumber: z.string().optional(),
    })
  ).min(1, "At least on item is required"),
});

export async function POST(req: NextRequest) {
  try {
    const session = await getAuthSession();
    const userId = session?.user?.id ?? null;

    const body = await req.json();
    const parsed = orderSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid data", details: parsed.error.errors },
        { status: 400}
      );
    }

    const { customer, items } = parsed.data;

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
