"use client";

import { FocusCardsDemo } from "@/components/animals/animalsFocus";
import { useEffect, useState } from "react";


interface Animal {
  _id: string;
  name: string;
  species: string;
  url?: string;
}

export default function AnimalsPage() {
 
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/animals");
        if (!response.ok) {
          throw new Error("Could not fetch animals from the server.");
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
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>;
  }

  if (error) {
    return <div className="flex min-h-screen items-center justify-center text-red-500">Error: {error}</div>;
  }

  
  return (
    <div className="min-h-screen items-start h-full w-full px-5 py-20">
      <FocusCardsDemo animals={animals} />
    </div>
  );
}