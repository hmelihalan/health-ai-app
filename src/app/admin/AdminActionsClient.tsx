"use client";

import { Trash2, UserX, UserMinus } from "lucide-react";
import { useTransition } from "react";
import { suspendUser, adminDeleteUser } from "@/actions/adminActions";
import { deletePost } from "@/actions/postActions";

export default function AdminActionsClient({ action, targetId }: { action: "suspend" | "delete_user" | "delete_post", targetId: string }) {
  const [isPending, startTransition] = useTransition();

  const handleAction = () => {
    let confirmMsg = "";
    if (action === "suspend") confirmMsg = "Are you sure you want to toggle suspension for this user?";
    if (action === "delete_user") confirmMsg = "CRITICAL: Are you sure you want to PERMANENTLY DELETE this user and all their data? This cannot be undone.";
    if (action === "delete_post") confirmMsg = "Are you sure you want to delete this post?";

    if (!confirm(confirmMsg)) return;

    startTransition(async () => {
      let res;
      if (action === "suspend") {
        res = await suspendUser(targetId);
      } else if (action === "delete_user") {
        res = await adminDeleteUser(targetId);
      } else if (action === "delete_post") {
        res = await deletePost(targetId);
      }
      
      if (res?.error) {
        alert(res.error);
      }
    });
  };

  const getIcon = () => {
    if (action === "suspend") return <UserX size={16} />;
    if (action === "delete_user") return <UserMinus size={16} />;
    return <Trash2 size={16} />;
  };

  const getTitle = () => {
    if (action === "suspend") return "Suspend/Unsuspend User";
    if (action === "delete_user") return "Permanently Delete User";
    return "Remove Post";
  };

  return (
    <button 
      onClick={handleAction} 
      disabled={isPending}
      style={{ 
        background: 'transparent', 
        border: 'none', 
        color: action === 'suspend' ? 'var(--warning-color, #f59e0b)' : 'var(--danger-color)', 
        cursor: isPending ? 'wait' : 'pointer', 
        opacity: isPending ? 0.5 : 0.8,
        display: 'flex',
        alignItems: 'center',
        padding: '0.25rem'
      }} 
      title={getTitle()}
    >
      {getIcon()}
    </button>
  );
}
