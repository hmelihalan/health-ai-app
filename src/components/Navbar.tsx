import Link from "next/link";
import { getSession } from "@/lib/session";
import { User, ShieldAlert, FileText, Bell } from "lucide-react";

export default async function Navbar() {
  const session = await getSession();

  return (
    <nav className="navbar">
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/" className="nav-brand">
          HEALTH AI
        </Link>
        <div className="nav-links">
          <Link href="/posts" className="nav-link">Discover Projects</Link>
          
          {session ? (
            <>
              <Link href="/dashboard" className="nav-link">Dashboard</Link>
              <Link href="/notifications" className="nav-link" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <Bell size={18} />
                <span style={{ position: 'absolute', top: '-4px', right: '-8px', background: 'var(--danger-color)', color: 'white', fontSize: '0.65rem', padding: '0.1rem 0.3rem', borderRadius: '10px', fontWeight: 'bold' }}>1</span>
              </Link>
              {session.role === "Admin" && (
                <Link href="/admin" className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--danger-color)' }}>
                  <ShieldAlert size={16} /> Admin
                </Link>
              )}
              <Link href="/profile" className="btn btn-secondary" style={{ padding: '0.4rem 0.8rem', borderRadius: '50px' }}>
                <User size={16} /> {session.email.split('@')[0]}
              </Link>
            </>
          ) : (
            <>
              <Link href="/login" className="btn btn-secondary">Login</Link>
              <Link href="/register" className="btn btn-primary">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
