"use client";

import { Trash2, UserX } from "lucide-react";

export default function AdminActionsClient({ action, targetId }: { action: "suspend" | "delete_post", targetId: string }) {
  
  const handleAction = () => {
    // For demo purposes only
    alert(`Simulation: Action '${action}' on ID '${targetId}' executed.`);
  };

  return (
    <button onClick={handleAction} style={{ background: 'transparent', border: 'none', color: 'var(--danger-color)', cursor: 'pointer', opacity: 0.8 }} title={action === 'suspend' ? "Suspend User" : "Remove Post"}>
      {action === "suspend" ? <UserX size={16} /> : <Trash2 size={16} />}
    </button>
  );
}
