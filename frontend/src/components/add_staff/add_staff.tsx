"use client";
import React, { useState } from "react";
import { Label } from "../ui/label1";
import { Input } from "../ui/input1";
import { cn } from "@/lib/utils";

export function AddStaffDemo() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [assignedAnimal, setAssignedAnimal] = useState("");
  const [staffPhoto, setStaffPhoto] = useState("");

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
      role,
      assignedAnimal, // assuming it's Animal's ObjectId string
      staffPhoto,
    };

    try {
      const response = await fetch("http://localhost:5000/api/staff", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add staff member.");
      }

      setSuccess("Staff member added successfully!");

      // reset form
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

  return (
    <div className="shadow-input mx-auto w-full max-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black">
      <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
        Add Staff Member
      </h2>
      {success ? (
        <div className="my-8 text-center">
          <p className="mb-4 text-green-500">{success}</p>
          <button
            onClick={() => setSuccess(null)}
            className="group/btn relative mt-6 block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white"
          >
            Add Another Staff Member
            <BottomGradient />
          </button>
        </div>
      ) : (
        <>
          <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
            Please fill in the details to add a staff member to the zoo.
          </p>
          <form className="my-8" onSubmit={handleSubmit}>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="e.g., Priya"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                onChange={(e) => setRole(e.target.value)}
                required
              />
            </LabelInputContainer>

            <LabelInputContainer className="mb-4">
              <Label htmlFor="assignedAnimal">Assigned Animal (ID)</Label>
              <Input
                id="assignedAnimal"
                placeholder="e.g., 64e8b5d9f5..."
                type="text"
                value={assignedAnimal}
                onChange={(e) => setAssignedAnimal(e.target.value)}
              />
            </LabelInputContainer>

            <LabelInputContainer className="mb-4">
              <Label htmlFor="staffPhoto">Staff Photo URL</Label>
              <Input
                id="staffPhoto"
                placeholder="https://example.com/photo.jpg"
                type="text"
                value={staffPhoto}
                onChange={(e) => setStaffPhoto(e.target.value)}
              />
            </LabelInputContainer>

            <button
              className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white"
              type="submit"
              disabled={submitting}
            >
              {submitting ? "Adding..." : "Add Staff Member →"}
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

const BottomGradient = () => (
  <>
    <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
    <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
  </>
);

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={cn("flex w-full flex-col space-y-2", className)}>
    {children}
  </div>
);
