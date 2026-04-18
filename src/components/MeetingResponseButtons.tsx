"use client";

import { useTransition } from "react";
import { respondToMeeting } from "@/actions/meetingActions";
import { Check, X } from "lucide-react";

export default function MeetingResponseButtons({ requestId }: { requestId: string }) {
  const [isPending, startTransition] = useTransition();

  const handleResponse = (status: "Scheduled" | "Declined") => {
    startTransition(() => {
      respondToMeeting(requestId, status);
    });
  };

  return (
    <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
      <button 
        onClick={() => handleResponse("Scheduled")} 
        disabled={isPending}
        className="btn" 
        style={{ flex: 1, backgroundColor: 'rgba(16, 185, 129, 0.1)', color: 'var(--success-color)', border: '1px solid var(--success-color)' }}
      >
        <Check size={16} /> Accept & Schedule
      </button>
      <button 
        onClick={() => handleResponse("Declined")} 
        disabled={isPending}
        className="btn" 
        style={{ flex: 1, backgroundColor: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger-color)', border: '1px solid var(--danger-color)' }}
      >
        <X size={16} /> Decline
      </button>
    </div>
  );
}
