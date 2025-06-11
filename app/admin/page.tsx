import AdminGate from "@/components/AdminGate";

export default function AdminPage() {
  return (
    <AdminGate>
      <div className="p-8">
        <h1 className="text-2xl font-bold">Adminpanel</h1>
        {/* 👇 Admininnehåll här */}
      </div>
    </AdminGate>
  );
}
