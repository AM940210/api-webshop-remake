"use client";

import { Item } from "@radix-ui/react-dropdown-menu";
import { useEffect, useState } from "react";

type Order = {
    id: string;
    createdAt: string;
    status: "pending" | "shipped";
    items: { title: string; quantity: number }[];
};

export default function OrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/orders", { credentials: "include" })
        .then((res) => {
            if (!res.ok) throw new Error("Not authenticated");
            return res.json();
        })
        .then((data) => setOrders(data))
        .catch(() => setOrders([]))
        .finally(() => setLoading(false));
    }, []);

    if (loading) return <div className="text-center mt-20">Laddar Order...</div>

    return (
        <div className="max-w-2xl mx-auto mt-20 p-4">
            <h1 className="text-2xl font-bold mb-6">Mina ordrar</h1>
            {orders.length === 0 ? (
                <p>Du har inga ordrar.</p>
            ) : (
                <ul className="space-y-6">
                    {orders.map((order) => (
                        <li key={order.id} className="border rounded p-4">
                            <div className="flex justify-between mb-2">
                                <span className="font-semibold">Order #{order.id}</span>
                                <span 
                                    className={
                                        order.status === "pending"
                                        ? "text-yellow-600"
                                        : "text-green-600"
                                    }
                                >
                                    {order.status === "pending" ? "Pending" : "Shipped"}
                                </span>
                            </div>
                            <div className="text-sm text-gray-500 mb-2">
                                {new Date(order.createdAt).toLocaleString()}
                            </div>
                            <ul className="mb-2">
                                {order.items.map((item, idx) => (
                                    <li key={idx}>
                                        {item.title} x {item.quantity}
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}