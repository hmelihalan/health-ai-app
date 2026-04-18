import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { Bell, CheckCircle, Info } from "lucide-react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function NotificationsPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  return (
    <div className="fade-in" style={{ padding: '1rem 0', maxWidth: '800px', margin: '0 auto' }}>
      <Link href="/dashboard" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
        <ArrowLeft size={16} /> Back to Dashboard
      </Link>
      
      <header style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <Bell size={28} color="var(--accent-color)" />
        <h1 style={{ fontSize: '2rem', fontWeight: 600 }}>Notifications</h1>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {/* Mock Notification 1 */}
        <div className="card" style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', borderLeft: '4px solid var(--accent-color)' }}>
          <div style={{ background: 'var(--accent-light)', padding: '0.5rem', borderRadius: '50%' }}>
            <Info size={20} color="var(--accent-color)" />
          </div>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.25rem' }}>Welcome to HEALTH AI</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Your institutional email has been verified. You can now browse posts or create your own announcement!</p>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', marginTop: '0.5rem' }}>2 hours ago</p>
          </div>
        </div>

        {/* Mock Notification 2 */}
        <div className="card" style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', borderLeft: '4px solid var(--success-color)' }}>
          <div style={{ background: 'rgba(16, 185, 129, 0.15)', padding: '0.5rem', borderRadius: '50%' }}>
            <CheckCircle size={20} color="var(--success-color)" />
          </div>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.25rem' }}>Profile Updated</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Your profile visibility and GDPR settings have been successfully saved.</p>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', marginTop: '0.5rem' }}>1 day ago</p>
          </div>
        </div>

      </div>
    </div>
  );
}
