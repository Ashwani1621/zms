"use client";
import React, { useState } from "react";
import { Label } from "../ui/label1";
import { Input } from "../ui/input1";
import { cn } from "@/lib/utils";


import { Calendar24 } from "./date";

export function SignupFormDemo() {
  const MAX_TICKETS = 10;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [ticketCount, setTicketCount] = useState(2);
  const [timeSlot, setTimeSlot] = useState("Morning");
  const [visitDate, setVisitDate] = useState<Date | undefined>(new Date());

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [bookedTicket, setBookedTicket] = useState<any>(null);


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(null);
    setBookedTicket(null);

    const payload = {
      visitorName: `${firstName} ${lastName}`,
      email,
      ticketCount,
      visitDate,
      timeSlot,
    };

    console.log("Submitting payload from frontend:", payload);

    try {
      const response = await fetch("http://localhost:5000/api/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Booking failed.");
      }

      const result = await response.json();
      setSuccess(`Ticket booked! Your Ticket ID is ${result.ticketId}`);
      setBookedTicket(result);

      
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleNewBooking = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setTicketCount(1); 
    setSuccess(null);
    setBookedTicket(null);
    setError(null);
  };

  return (
    <div className="shadow-input mx-auto w-full max-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black">
      <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
        Welcome to Banglore Zoological Park
      </h2>
      
      {success && bookedTicket ? (
        // --- TICKET VIEW ---
        <div className="my-8 text-center">
          <p className="mb-4 text-green-500">{success}</p>
          <div className="flex flex-col items-center gap-4 rounded-lg border p-4">
            <img src={bookedTicket.qrCode} alt="Ticket QR Code" className="h-48 w-48 rounded-md" />
            <div className="text-left">
              <p><strong>Name:</strong> {bookedTicket.visitorName}</p>
              <p><strong>Ticket ID:</strong> {bookedTicket.ticketId}</p>
              <p><strong>Date:</strong> {new Date(bookedTicket.visitDate).toLocaleDateString()}</p>
              <p><strong>Time Slot:</strong> {bookedTicket.timeSlot}</p>
              <p><strong>No. of People:</strong> {bookedTicket.ticketCount}</p>
            </div>
          </div>
          <button onClick={handleNewBooking}  className="group/btn relative mt-6 block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#2727a_inset,0px_-1px_0px_0px_#2727a_inset]">
            Book Another Ticket
          </button>
        </div>
      ) : (
        <>
      <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
        Please fill in the details to book your ticket.
      </p>

      <form className="my-8" onSubmit={handleSubmit}>
        <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
          <LabelInputContainer>
            <Label htmlFor="firstname">First name</Label>
            <Input
              id="firstname"
              placeholder="First name"
              type="text"
              value={firstName}
              onChange={(e) => {
                console.log("First name changing:", e.target.value);
                setFirstName(e.target.value);
              }}
              required
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastname">Last name</Label>
            <Input
              id="lastname"
              placeholder="Last name"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            placeholder="xyz@gmail.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="number">Number of Tickets</Label>
          <Input
            id="ticketCount"
            type="number"
            value={ticketCount}
            onChange={(e) => {
              const count = Math.max(0, parseInt(e.target.value) || 0);
              setTicketCount(count);
            }}
            required
            min="1"
            max={MAX_TICKETS}
          />
        </LabelInputContainer>

        <div className="mb-8 flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
          {/* Date Picker Column */}
          <div className="flex w-full flex-col space-y-2">
            <Label>Visit Date</Label>
            <Calendar24 onDateChange={setVisitDate} />
          </div>

          {/* Time Slot Column */}
          <div className="flex w-full flex-col space-y-2">
            <Label htmlFor="timeSlot">Time Slot</Label>
            <select
              id="timeSlot"
              value={timeSlot}
              onChange={(e) => setTimeSlot(e.target.value)}
              className="h-10 w-full rounded-md border border-neutral-300 bg-gray-50 px-3 text-black dark:border-neutral-700 dark:bg-zinc-800 dark:text-white"
            >
              <option>Morning</option>
              <option>Afternoon</option>
            </select>
          </div>
        </div>

        <button
          className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
          type="submit"
          disabled={submitting}
        >
          {submitting ? "Booking..." : "Book Ticket →"}
          <BottomGradient />
        </button>

        {success && (
          <p className="mt-4 text-center text-sm text-green-500">{success}</p>
        )}
        {error && (
          <p className="mt-4 text-center text-sm text-red-500">{error}</p>
        )}

        <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />

      
      </form>
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
