// components/ui/SimpleToast.tsx
"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface SimpleToastProps {
  message: string;
  trigger: boolean;
}

export default function SimpleToast({ message, trigger }: SimpleToastProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (trigger) {
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [trigger]); // Kör om trigger ändras (ex. när du klickar Buy)

  return (
    <div
      className={cn(
        "fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg transition-opacity duration-300 z-50",
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
    >
      {message}
    </div>
  );
}
