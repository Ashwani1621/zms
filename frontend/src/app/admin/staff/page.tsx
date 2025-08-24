"use client";

import { ExpandableCardDemo } from "@/components/staff/staff";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function StaffPage() {
  const router = useRouter(); // ✅ must call this

  return (
    <div className="items-start h-full w-full px-5 py-20">
      <ExpandableCardDemo />

      <div className="flex justify-center mt-6">
        <button
          onClick={() => router.push("/admin/add_staff")}
          className="flex items-center justify-center w-14 h-14 rounded-full bg-blue-500 text-white shadow-lg hover:bg-blue-600 transition hover:scale-110 active:scale-95"
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
