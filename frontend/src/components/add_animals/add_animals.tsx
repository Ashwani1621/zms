"use client";
import React, { useState } from "react";
import { Label } from "../ui/label1";
import { Input } from "../ui/input1";
import { cn } from "@/lib/utils";

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(null);

    const payload = {
      name,
      species,
      age,
      healthStatus,
      enclosure,
      url,
    };

    try {
      const response = await fetch("http://localhost:5000/api/animals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add animal.");
      }

      setSuccess("Animal added successfully!");

      // reset form
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

  return (
    <div className="shadow-input mx-auto w-full max-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black">
      <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
        Add Animal to Zoological Park
      </h2>

      {success ? (
        <div className="my-8 text-center">
          <p className="mb-4 text-green-500">{success}</p>
          <button
            onClick={() => setSuccess(null)}
            className="group/btn relative mt-6 block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white"
          >
            Add Another Animal
            <BottomGradient />
          </button>
        </div>
      ) : (
        <>
          <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
            Please fill in the details to add an animal to the zoo.
          </p>

          <form className="my-8" onSubmit={handleSubmit}>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="e.g., Sheru"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </LabelInputContainer>

            <LabelInputContainer className="mb-4">
              <Label htmlFor="species">Species</Label>
              <Input
                id="species"
                placeholder="e.g., Tiger"
                type="text"
                value={species}
                onChange={(e) => setSpecies(e.target.value)}
                required
              />
            </LabelInputContainer>

            <LabelInputContainer className="mb-4">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                value={age}
                onChange={(e) => setAge(Math.max(0, parseInt(e.target.value) || 0))}
                required
                min="0"
              />
            </LabelInputContainer>

            <div className="mb-4 flex flex-col space-y-2">
              <Label htmlFor="enclosure">Enclosure Needed</Label>
              <select
                id="enclosure"
                value={enclosure}
                onChange={(e) => setEnclosure(e.target.value)}
                className="h-10 w-full rounded-md border border-neutral-300 bg-gray-50 px-3 text-black dark:border-neutral-700 dark:bg-zinc-800 dark:text-white"
              >
                <option>Yes</option>
                <option>No</option>
              </select>
            </div>

            <div className="mb-4 flex flex-col space-y-2">
              <Label htmlFor="healthStatus">Health Status</Label>
              <select
                id="healthStatus"
                value={healthStatus}
                onChange={(e) => setHealthStatus(e.target.value)}
                className="h-10 w-full rounded-md border border-neutral-300 bg-gray-50 px-3 text-black dark:border-neutral-700 dark:bg-zinc-800 dark:text-white"
              >
                <option>Healthy</option>
                <option>Not Healthy</option>
              </select>
            </div>

            <LabelInputContainer className="mb-4">
              <Label htmlFor="url">Image URL</Label>
              <Input
                id="url"
                placeholder="https://example.com/tiger.jpg"
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </LabelInputContainer>

            <button
              className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white"
              type="submit"
              disabled={submitting}
            >
              {submitting ? "Adding..." : "Add Animal →"}
              <BottomGradient />
            </button>
          </form>

          {error && (
            <p className="mt-4 text-center text-sm text-red-500">{error}</p>
          )}
        </>
      )}
    </div>
  );
}

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
