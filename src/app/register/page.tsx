import RegisterForm from "@/components/RegisterForm";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div style={{ maxWidth: '450px', margin: '4rem auto' }}>
      <div className="card" style={{ padding: '2rem' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 600, marginBottom: '0.25rem', textAlign: 'center' }}>Create Account</h2>
        <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '2rem', fontSize: '0.9rem' }}>Join the HEALTH AI Co-Creation Platform.</p>
        
        <RegisterForm />
        
        <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          Already have an account? <Link href="/login" style={{ color: 'var(--accent-color)', fontWeight: 500 }}>Log in</Link>
        </p>
      </div>
    </div>
  );
}
