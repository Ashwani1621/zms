"use client";

import { FocusCardsDemo } from "@/components/animals/animalsFocus";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
interface Animal {
  _id: string;
  name: string;
  species: string;
  age: number;
  healthStatus: string;
  enclosure: string;
  url?: string; 
}

export default function Page() {
  const router = useRouter();
  
  
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
   
    const fetchAnimals = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/animals");
        if (!response.ok) {
          throw new Error("Failed to fetch animals from the server.");
        }
        const data = await response.json();
        setAnimals(data);
      } catch (err: any) {
        setError(err.message); 
      } finally {
        setLoading(false); 
      }
    };

    fetchAnimals(); 
  }, []); 
 
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading animals...</div>;
  }
  
  
  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="min-h-screen items-start h-full w-full px-5 py-20">
      
      <FocusCardsDemo animals={animals} />

      {/* Plus Button */}
      <div className="flex justify-center mt-6">
        <button
          onClick={() => router.push("/admin/add_animals")}
          className="flex items-center justify-center w-14 h-14 rounded-full bg-blue-500 text-white shadow-lg hover:bg-blue-600 transition hover:scale-110 active:scale-95"
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}