"use client";

import { useActionState } from "react";
import { loginUser } from "@/actions/authActions";

type ActionState = {
  error: string;
};

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(
    async (prevState: ActionState, formData: FormData): Promise<ActionState> => {
      const res = await loginUser(formData);
      return { error: res?.error || "" };
    },
    { error: "" }
  );

  return (
    <form action={formAction} className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {state?.error && (
        <div style={{ padding: '0.75rem', background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger-color)', borderRadius: '8px', border: '1px solid var(--danger-color)' }}>
          {state.error}
        </div>
      )}
      
      <div className="form-group">
        <label className="form-label">Email</label>
        <input type="email" name="email" required className="input-field" placeholder="your.name@university.edu" />
      </div>

      <div className="form-group">
        <label className="form-label">Password</label>
        <input type="password" name="password" required className="input-field" />
      </div>

      <button type="submit" disabled={isPending} className="btn btn-primary" style={{ marginTop: '0.5rem', width: '100%' }}>
        {isPending ? "Logging in..." : "Log In"}
      </button>
    </form>
  );
}
