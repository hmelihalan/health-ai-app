"use client";

import { useSearchParams } from "next/navigation";
import { verifyAndLogin } from "@/actions/authActions";
import { useEffect, useState, useTransition } from "react";
import { ShieldCheck, Mail } from "lucide-react";

export default function VerifyClient() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const [isPending, startTransition] = useTransition();

  const handleVerify = () => {
    if (email) {
      startTransition(() => {
        verifyAndLogin(email);
      });
    }
  };

  if (!email) {
    return <div style={{ textAlign: "center", marginTop: "2rem" }}>No email provided.</div>;
  }

  return (
    <div style={{ maxWidth: '450px', margin: '4rem auto' }}>
      <div className="card fade-in" style={{ padding: '3rem 2rem', textAlign: 'center' }}>
        <div style={{ background: 'rgba(16, 185, 129, 0.1)', width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
          <Mail size={32} color="var(--success-color)" />
        </div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem' }}>Verify Your Email</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '0.95rem' }}>
          We've sent a verification link to <strong>{email}</strong>. 
          For the purpose of this demonstration, you can bypass the email check and verify directly here:
        </p>

        <button 
          onClick={handleVerify} 
          disabled={isPending} 
          className="btn btn-primary" 
          style={{ width: '100%' }}
        >
          {isPending ? "Verifying..." : "Simulate Email Verification"}
        </button>
      </div>
    </div>
  );
}
