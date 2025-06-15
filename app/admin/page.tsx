// /admin/page.tsx
import AdminGate from "@/components/AdminGate";
import Admin from "./AdminClient"; // Justera sökvägen om filen ligger någon annanstans

export default function AdminPage() {
  return (
    <AdminGate>
      <Admin />
    </AdminGate>
  );
}
