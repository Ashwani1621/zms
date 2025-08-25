"use client";

import { ExpandableCardDemo } from "@/components/staff/staff";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


interface Staff {
  _id: string;
  name: string;
  role: string;
  staffPhoto?: string;
  assignedAnimal?: {
    name: string;
  };
}

export default function StaffPage() {
  const router = useRouter(); 
  const [staff, setStaff] = useState<Staff[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No authorization token found.");
        }
        const response = await fetch("http://localhost:5000/api/staff", {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error("Failed to fetch staff data.");
        }
        const data = await response.json();
        setStaff(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStaff();
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading staff...</div>
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">Error: {error}</div>

  return (
    <div className="items-start h-full w-full px-5 py-20">
      {/* Pass the fetched data to the display component */}
      <ExpandableCardDemo staff={staff} />

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