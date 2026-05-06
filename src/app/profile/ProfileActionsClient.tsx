"use client";

import { useState, useTransition } from "react";
import { Trash2, KeyRound } from "lucide-react";
import { deleteAccount, changePassword } from "@/actions/authActions";

export default function ProfileActionsClient() {
  const [showWarning, setShowWarning] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [isPending, startTransition] = useTransition();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");

  const [deletePassword, setDeletePassword] = useState("");
  const [deleteError, setDeleteError] = useState("");

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    setDeleteError("");
    if (!deletePassword) {
      setDeleteError("Password is required to delete your account.");
      return;
    }
    const formData = new FormData();
    formData.append("password", deletePassword);
    
    startTransition(async () => {
      const res = await deleteAccount(formData);
      if (res?.error) {
        setDeleteError(res.error);
      }
    });
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");
    setPasswordSuccess("");

    if (!oldPassword || !newPassword) {
      setPasswordError("Both fields are required.");
      return;
    }

    const formData = new FormData();
    formData.append("oldPassword", oldPassword);
    formData.append("newPassword", newPassword);

    const res = await changePassword(formData);
    if (res?.error) {
      setPasswordError(res.error);
    } else {
      setPasswordSuccess("Password successfully changed!");
      setOldPassword("");
      setNewPassword("");
      setTimeout(() => setShowPasswordForm(false), 2000);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '2rem' }}>
      {/* Change Password Section */}
      <div>
        {!showPasswordForm ? (
          <button onClick={() => setShowPasswordForm(true)} className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <KeyRound size={16} /> Change Password
          </button>
        ) : (
          <div className="card" style={{ padding: '1.5rem', background: 'var(--bg-color)' }}>
            <h3 style={{ marginBottom: '1rem', fontWeight: 600 }}>Change Password</h3>
            {passwordError && <p style={{ color: 'var(--danger-color)', marginBottom: '1rem', fontSize: '0.9rem' }}>{passwordError}</p>}
            {passwordSuccess && <p style={{ color: 'var(--success-color)', marginBottom: '1rem', fontSize: '0.9rem' }}>{passwordSuccess}</p>}
            
            <form onSubmit={handlePasswordChange} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <input 
                type="password" 
                placeholder="Current Password" 
                className="form-input" 
                value={oldPassword}
                onChange={e => setOldPassword(e.target.value)}
              />
              <input 
                type="password" 
                placeholder="New Password" 
                className="form-input" 
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
              />
              <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                <button type="submit" className="btn btn-primary" disabled={isPending}>Save New Password</button>
                <button type="button" onClick={() => setShowPasswordForm(false)} className="btn btn-secondary">Cancel</button>
              </div>
            </form>
          </div>
        )}
      </div>

      <hr style={{ border: 'none', borderTop: '1px solid var(--surface-border)' }} />

      {/* Delete Account Section */}
      <div>
        {!showWarning ? (
          <button onClick={() => setShowWarning(true)} className="btn btn-danger" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Trash2 size={16} /> Delete Account
          </button>
        ) : (
          <div style={{ background: 'var(--bg-color)', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--danger-color)' }}>
            <h3 style={{ color: 'var(--danger-color)', marginBottom: '0.5rem', fontWeight: 600 }}>Are you absolutely sure?</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              This action cannot be undone. This will permanently delete your account, posts, and meeting requests.
            </p>
            {deleteError && <p style={{ color: 'var(--danger-color)', marginBottom: '1rem', fontSize: '0.9rem' }}>{deleteError}</p>}
            
            <form onSubmit={handleDelete} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <input 
                type="password" 
                placeholder="Enter your password to confirm" 
                className="form-input" 
                value={deletePassword}
                onChange={e => setDeletePassword(e.target.value)}
              />
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button type="submit" className="btn btn-danger" disabled={isPending}>
                  {isPending ? "Deleting..." : "Yes, delete my account"}
                </button>
                <button type="button" onClick={() => setShowWarning(false)} className="btn btn-secondary" disabled={isPending}>Cancel</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
