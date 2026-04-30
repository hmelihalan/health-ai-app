"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";

export default function ProfileActionsClient() {
  const [showWarning, setShowWarning] = useState(false);

  const handleDelete = () => {
    // For demo purposes, we do not actually delete to avoid breaking the seed data.
    alert("Simulation: Account successfully deleted.");
    setShowWarning(false);
  };

  return (
    <>
      {!showWarning ? (
        <button onClick={() => setShowWarning(true)} className="btn btn-danger">
          <Trash2 size={16} /> Delete Account
        </button>
      ) : (
        <div style={{ background: 'var(--bg-color)', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--danger-color)', marginTop: '1rem' }}>
          <h3 style={{ color: 'var(--danger-color)', marginBottom: '0.5rem', fontWeight: 600 }}>Are you absolutely sure?</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
            This action cannot be undone. This will permanently delete your account, posts, and meeting requests.
          </p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button onClick={handleDelete} className="btn btn-danger">Yes, delete my account</button>
            <button onClick={() => setShowWarning(false)} className="btn btn-secondary">Cancel</button>
          </div>
        </div>
      )}
    </>
  );
}
