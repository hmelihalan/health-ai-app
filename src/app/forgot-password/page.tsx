"use client";

import { useState } from "react";
import { forgotPassword } from "@/actions/authActions";
import Link from "next/link";
import { ArrowLeft, Mail } from "lucide-react";

export default function ForgotPasswordPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setError("");

    const formData = new FormData(e.currentTarget);
    const res = await forgotPassword(formData);

    if (res?.error) {
      setError(res.error);
      setStatus("idle");
    } else {
      setStatus("success");
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '4rem auto' }}>
      <div className="card" style={{ padding: '2rem' }}>
        <Link href="/login" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
          <ArrowLeft size={14} /> Back to Login
        </Link>

        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.5rem' }}>Forgot Password</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
          Enter your .edu email and we&apos;ll send you a 6-digit reset token.
        </p>

        {status === "success" ? (
          <div style={{ textAlign: 'center' }}>
            <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '1rem', borderRadius: '8px', color: 'var(--success-color)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
              If an account exists for that email, we&apos;ve sent a reset token.
            </div>
            <Link href="/reset-password" className="btn btn-primary" style={{ width: '100%' }}>
              Continue to Reset Password
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {error && <p style={{ color: 'var(--danger-color)', fontSize: '0.85rem' }}>{error}</p>}
            
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                <input 
                  type="email" 
                  name="email" 
                  required 
                  className="form-input" 
                  style={{ paddingLeft: '2.5rem' }}
                  placeholder="name@university.edu"
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary" disabled={status === "loading"}>
              {status === "loading" ? "Sending..." : "Send Reset Token"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
