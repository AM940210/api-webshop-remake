export type Order = {
  id: string;
  customerName: string;
  status: "pending" | "shipped";
};

export async function fetchAllOrders(): Promise<Order[]> {
  const res = await fetch("/api/orders");
  if (!res.ok) throw new Error("Failed to fetch orders");
  return res.json();
}

export async function markOrderAsShipped(orderId: string): Promise<void> {
  const res = await fetch(`/api/orders/${orderId}/ship`, {
    method: "PATCH",
  });
  if (!res.ok) throw new Error("Failed to mark order as shipped");
}

