"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminGate({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const res = await fetch("/api/session", {
          credentials: "include", // 🧠 för att skicka med cookies
        });

        const data = await res.json();

        if (data?.user?.isAdmin) {
          setIsAdmin(true);
        } else {
          router.push("/"); // 🚫 om inte admin → redirect
        }
      } catch (error) {
        console.error("Fel vid hämtning av session:", error);
        router.push("/");
      } finally {
        setLoading(false);
      }
    };

    checkAdmin();
  }, [router]);

  if (loading) return <p>Laddar...</p>;

  return <>{isAdmin && children}</>;
}
