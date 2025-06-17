import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { orderId: string } }
) {
  const { orderId } = params;

  try {
    const updatedOrder = await db.order.update({
      where: { id: orderId },
      data: { status: "shipped" },
    });

    return NextResponse.json(updatedOrder);
  } catch (error) {
    console.error("Failed to update order status:", error);
    return new NextResponse("Order not found or update failed", {
      status: 404,
    });
  }
}
