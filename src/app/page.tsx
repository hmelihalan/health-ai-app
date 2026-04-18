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
    </div>
  );
}
