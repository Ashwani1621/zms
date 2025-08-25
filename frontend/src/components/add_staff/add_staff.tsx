"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface Animal {
  _id: string;
  name: string;
}

interface Staff {
  _id: string;
  name: string;
  role: string;
  staffPhoto?: string;
  assignedAnimal?: Animal | string;
}

export function AddStaffDemo() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [assignedAnimal, setAssignedAnimal] = useState("");
  const [staffPhoto, setStaffPhoto] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [newlyAddedStaff, setNewlyAddedStaff] = useState<Staff | null>(null);

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/animals");
        if (!response.ok) {
          throw new Error("Could not fetch animals for the dropdown.");
        }
        const data = await response.json();
        setAnimals(data);
      } catch (err: any) {
        console.error(err.message);
      }
    };
    fetchAnimals();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(null);
    setNewlyAddedStaff(null);

    const token = localStorage.getItem("token");
    if (!token) {
      setError("You must be logged in to perform this action.");
      setSubmitting(false);
      return;
    }

    const payload = {
      name,
      role,
      assignedAnimal: assignedAnimal || undefined,
      staffPhoto,
    };

    try {
      const response = await fetch("http://localhost:5000/api/staff", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add staff member.");
      }

      const newStaffData: Staff = await response.json();
      setNewlyAddedStaff(newStaffData);
      setSuccess("Staff member added successfully!");

      // Reset form for the next entry
      setName("");
      setRole("");
      setAssignedAnimal("");
      setStaffPhoto("");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleAddAnother = () => {
    setSuccess(null);
    setNewlyAddedStaff(null);
  };

  return (
    <div className="shadow-input mx-auto w-full max-w-md rounded-none bg-white p-4 dark:bg-black md:rounded-2xl md:p-8">
      <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
        Add Staff Member
      </h2>

      {success && newlyAddedStaff ? (
        <div className="my-8 text-center">
          <p className="mb-4 text-lg font-semibold text-green-500">{success}</p>

          <div className="mb-6 space-y-2 rounded-lg border p-4 text-left dark:border-gray-700">
            <img
              src={
                newlyAddedStaff.staffPhoto ||
                "https://placehold.co/600x400?text=No+Photo"
              }
              alt={`Photo of ${newlyAddedStaff.name}`}
              className="mb-2 h-48 w-full rounded-md object-cover"
            />
            <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
              {newlyAddedStaff.name}
            </h3>
            <p className="pb-2 text-md text-neutral-600 dark:text-neutral-400">
              {newlyAddedStaff.role}
            </p>

            <div className="border-t pt-2 dark:border-gray-600">
              <p className="text-sm text-neutral-700 dark:text-neutral-300">
                <strong>Assigned Animal:</strong>{" "}
                {newlyAddedStaff.assignedAnimal
                  ? typeof newlyAddedStaff.assignedAnimal === "object"
                    ? newlyAddedStaff.assignedAnimal.name
                    : "ID assigned"
                  : "None"}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              href="/admin/staff"
              className="group/btn relative flex h-10 w-full items-center justify-center rounded-md bg-gray-200 font-medium text-gray-800 shadow-md transition hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 sm:w-1/2"
            >
              View All Staff
            </Link>
            <button
              onClick={handleAddAnother}
              className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white sm:w-1/2"
            >
              Add Another Staff
              <BottomGradient />
            </button>
          </div>
        </div>
      ) : (
        <>
          <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
            Please fill in the details.
          </p>
          <form className="my-8" onSubmit={handleSubmit}>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="e.g., Priya"
                type="text"
                value={name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setName(e.target.value)
                }
                required
              />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="role">Role</Label>
              <Input
                id="role"
                placeholder="e.g., Zookeeper"
                type="text"
                value={role}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setRole(e.target.value)
                }
                required
              />
            </LabelInputContainer>
            <div className="mb-4 flex flex-col space-y-2">
              <Label htmlFor="assignedAnimal">Assigned Animal</Label>
              <select
                id="assignedAnimal"
                value={assignedAnimal}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setAssignedAnimal(e.target.value)
                }
                className="h-10 w-full rounded-md border border-neutral-300 bg-gray-50 px-3 text-black dark:border-neutral-700 dark:bg-zinc-800 dark:text-white"
              >
                <option value="">-- Optional: Select an Animal --</option>
                {animals.map((animal) => (
                  <option key={animal._id} value={animal._id}>
                    {animal.name}
                  </option>
                ))}
              </select>
            </div>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="staffPhoto">Staff Photo URL</Label>
              <Input
                id="staffPhoto"
                placeholder="https://example.com/photo.jpg"
                type="text"
                value={staffPhoto}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setStaffPhoto(e.target.value)
                }
              />
            </LabelInputContainer>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/admin/staff"
                className="group/btn relative flex h-10 w-full items-center justify-center rounded-md bg-gray-200 font-medium text-gray-800 shadow-md transition hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 sm:w-1/2"
              >
                View All Staff
              </Link>
              <button
                className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white sm:w-1/2"
                type="submit"
                disabled={submitting}
              >
                {submitting ? "Adding..." : "Add Staff Member →"}
                <BottomGradient />
              </button>
            </div>
          </form>
          {error && (
            <p className="mt-4 text-center text-sm text-red-500">{error}</p>
          )}
        </>
      )}
    </div>
  );
}

// Helper components
const BottomGradient = () => <></>;

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={cn("flex w-full flex-col space-y-2", className)}>{children}</div>
);
