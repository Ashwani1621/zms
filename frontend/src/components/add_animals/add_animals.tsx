"use client";

import Link from "next/link";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";


interface Animal {
  _id: string;
  name: string;
  species: string;
  age: number;
  healthStatus: string;
  enclosure: string;
  url?: string;
}

export function AddAnimalsDemo() {
  const [name, setName] = useState("");
  const [species, setSpecies] = useState("");
  const [age, setAge] = useState<number>(0);
  const [healthStatus, setHealthStatus] = useState("Healthy");
  const [enclosure, setEnclosure] = useState("Yes");
  const [url, setUrl] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [newlyAddedAnimal, setNewlyAddedAnimal] = useState<Animal | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(null);
    setNewlyAddedAnimal(null);

    const token = localStorage.getItem("token");
    if (!token) {
      setError("You must be logged in to add an animal.");
      setSubmitting(false);
      return;
    }

    const payload = { name, species, age, healthStatus, enclosure, url };

    try {
      const response = await fetch("http://localhost:5000/api/animals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add animal.");
      }

      const newAnimalData = await response.json();
      setNewlyAddedAnimal(newAnimalData);
      setSuccess("Animal added successfully!");

      setName("");
      setSpecies("");
      setAge(0);
      setHealthStatus("Healthy");
      setEnclosure("Yes");
      setUrl("");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleAddAnother = () => {
    setSuccess(null);
    setNewlyAddedAnimal(null);
  };

  return (
    <div className="shadow-input mx-auto w-full max-w-md rounded-none bg-white p-4 dark:bg-black md:rounded-2xl md:p-8">
      <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
        Add Animal to Zoological Park
      </h2>

      {success && newlyAddedAnimal ? (
        // --- SUCCESS SCREEN ---
        <div className="my-8 text-center">
          <p className="mb-4 text-lg font-semibold text-green-500">{success}</p>

          
          <div className="mb-6 space-y-2 rounded-lg border p-4 text-left dark:border-gray-700">
            
            <img
              src={newlyAddedAnimal.url || 'https://placehold.co/600x400?text=No+Image'}
              alt={`Image of ${newlyAddedAnimal.name}`}
              className="mb-2 h-48 w-full rounded-md object-cover"
            />
            <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
              {newlyAddedAnimal.name}
            </h3>
            <p className="pb-2 text-md text-neutral-600 dark:text-neutral-400">
              {newlyAddedAnimal.species}
            </p>
            
            <div className="border-t pt-2 dark:border-gray-600">
                <p className="text-sm text-neutral-700 dark:text-neutral-300">
                    <strong>Age:</strong> {newlyAddedAnimal.age}
                </p>
                <p className="text-sm text-neutral-700 dark:text-neutral-300">
                    <strong>Health Status:</strong> {newlyAddedAnimal.healthStatus}
                </p>
                <p className="text-sm text-neutral-700 dark:text-neutral-300">
                    <strong>Enclosure Needed:</strong> {newlyAddedAnimal.enclosure}
                </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              href="/admin/animals"
              className="group/btn relative flex h-10 w-full items-center justify-center rounded-md bg-gray-200 font-medium text-gray-800 shadow-md transition hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 sm:w-1/2"
            >
              View All Animals
            </Link>
            <button
              onClick={handleAddAnother}
              className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white sm:w-1/2"
            >
              Add Another Animal
              <BottomGradient />
            </button>
          </div>
        </div>
      ) : (
        // --- FORM SCREEN ---
        <>
          <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
            Please fill in the details to add an animal to the zoo.
          </p>
          <form className="my-8" onSubmit={handleSubmit}>
            {/* Form inputs... */}
            <LabelInputContainer className="mb-4">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="e.g., Sheru" type="text" value={name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} required />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="species">Species</Label>
              <Input id="species" placeholder="e.g., Tiger" type="text" value={species} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSpecies(e.target.value)} required />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="age">Age</Label>
              <Input id="age" type="number" value={age} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAge(Math.max(0, parseInt(e.target.value) || 0))} required min="0" />
            </LabelInputContainer>
            <div className="mb-4 flex flex-col space-y-2">
              <Label htmlFor="enclosure">Enclosure Needed</Label>
              <select id="enclosure" value={enclosure} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setEnclosure(e.target.value)} className="h-10 w-full rounded-md border border-neutral-300 bg-gray-50 px-3 text-black dark:border-neutral-700 dark:bg-zinc-800 dark:text-white">
                <option>Yes</option>
                <option>No</option>
              </select>
            </div>
            <div className="mb-4 flex flex-col space-y-2">
              <Label htmlFor="healthStatus">Health Status</Label>
              <select id="healthStatus" value={healthStatus} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setHealthStatus(e.target.value)} className="h-10 w-full rounded-md border border-neutral-300 bg-gray-50 px-3 text-black dark:border-neutral-700 dark:bg-zinc-800 dark:text-white">
                <option>Healthy</option>
                <option>Not Healthy</option>
              </select>
            </div>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="url">Image URL</Label>
              <Input id="url" placeholder="https://example.com/tiger.jpg" type="text" value={url} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUrl(e.target.value)} />
            </LabelInputContainer>
            
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/admin/animals"
                className="group/btn relative flex h-10 w-full items-center justify-center rounded-md bg-gray-200 font-medium text-gray-800 shadow-md transition hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 sm:w-1/2"
              >
                View All Animals
              </Link>
              <button
                className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white sm:w-1/2"
                type="submit"
                disabled={submitting}
              >
                {submitting ? "Adding..." : "Add Animal →"}
                <BottomGradient />
              </button>
            </div>
          </form>
          {error && <p className="mt-4 text-center text-sm text-red-500">{error}</p>}
        </>
      )}
    </div>
  );
}

// --- Helper Components ---
const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};