import Link from "next/link";
import { ArrowRight, ShieldCheck, Users, Search } from "lucide-react";

export default function Home() {
  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '4rem', padding: '2rem 0' }}>
      {/* Hero Section */}
      <section style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 700, marginBottom: '1.5rem', lineHeight: 1.1 }}>
          Bridge the Gap Between <br />
          <span style={{ 
            background: 'linear-gradient(to right, #60a5fa, #c084fc)', 
            WebkitBackgroundClip: 'text', 
            WebkitTextFillColor: 'transparent' 
          }}>
            Medicine and Engineering
          </span>
        </h1>
        <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', marginBottom: '2.5rem' }}>
          A secure, GDPR-compliant co-creation platform connecting healthcare professionals with innovative engineers to transform clinical ideas into viable technologies.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Link href="/register" className="btn btn-primary" style={{ padding: '0.8rem 1.8rem', fontSize: '1.05rem' }}>
            Join the Platform <ArrowRight size={18} />
          </Link>
          <Link href="/posts" className="btn btn-secondary" style={{ padding: '0.8rem 1.8rem', fontSize: '1.05rem' }}>
            Browse Projects
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
        <div className="card">
          <div style={{ background: 'var(--accent-light)', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
            <Users size={24} color="var(--accent-color)" />
          </div>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>Structured Matching</h3>
          <p style={{ color: 'var(--text-secondary)' }}>Find complimentary expertise quickly. Post your technical needs or clinical ideas and let the community respond.</p>
        </div>
        
        <div className="card">
          <div style={{ background: 'rgba(16, 185, 129, 0.15)', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
            <ShieldCheck size={24} color="var(--success-color)" />
          </div>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>Secure & Compliant</h3>
          <p style={{ color: 'var(--text-secondary)' }}>No patient data stored. NDA flows built-in for safe interdisciplinary collaboration and controlled idea disclosure.</p>
        </div>

        <div className="card">
          <div style={{ background: 'rgba(139, 92, 246, 0.15)', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
            <Search size={24} color="#8b5cf6" />
          </div>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>Targeted Discovery</h3>
          <p style={{ color: 'var(--text-secondary)' }}>Filter by clinical domain, project stage, and city. Initiate meaningful first contact without relying on coincidence.</p>
        </div>
      </section>

      {/* Demo Credentials */}
      <section style={{ maxWidth: '700px', margin: '0 auto', width: '100%' }}>
        <div className="card" style={{ 
          background: 'linear-gradient(135deg, rgba(96, 165, 250, 0.08), rgba(192, 132, 252, 0.08))',
          border: '1px solid rgba(96, 165, 250, 0.25)',
          padding: '2rem'
        }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem', textAlign: 'center' }}>
            🧪 Demo Accounts
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', textAlign: 'center', marginBottom: '1.5rem' }}>
            Use these pre-seeded accounts to explore the platform. Password for all: <code style={{ background: 'rgba(255,255,255,0.1)', padding: '0.15rem 0.4rem', borderRadius: '4px', fontWeight: 600 }}>password123</code>
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
            <div style={{ padding: '1rem', background: 'rgba(239, 68, 68, 0.08)', borderRadius: '10px', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
              <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#ef4444', fontWeight: 700, marginBottom: '0.4rem', letterSpacing: '0.05em' }}>Admin</p>
              <p style={{ fontSize: '0.9rem', fontWeight: 500 }}>admin@healthai.edu</p>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>Full platform control</p>
            </div>
            <div style={{ padding: '1rem', background: 'rgba(59, 130, 246, 0.08)', borderRadius: '10px', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
              <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#3b82f6', fontWeight: 700, marginBottom: '0.4rem', letterSpacing: '0.05em' }}>Doctor</p>
              <p style={{ fontSize: '0.9rem', fontWeight: 500 }}>dr.smith@med.edu</p>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>Healthcare Professional</p>
            </div>
            <div style={{ padding: '1rem', background: 'rgba(16, 185, 129, 0.08)', borderRadius: '10px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
              <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#10b981', fontWeight: 700, marginBottom: '0.4rem', letterSpacing: '0.05em' }}>Engineer</p>
              <p style={{ fontSize: '0.9rem', fontWeight: 500 }}>dev.jones@tech.edu</p>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>Tech University Munich</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
