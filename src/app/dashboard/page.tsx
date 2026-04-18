import { getSession } from "@/lib/session";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import Link from "next/link";
import { PlusCircle, ExternalLink, ShieldCheck } from "lucide-react";

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  const posts = await db.post.findMany({
    where: { ownerId: session.userId },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="fade-in" style={{ padding: '1rem 0' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 600 }}>Dashboard</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Welcome back, {session.email} <span className="badge badge-draft" style={{ marginLeft: '0.5rem' }}>{session.role}</span></p>
        </div>
        <Link href="/dashboard/create" className="btn btn-primary">
          <PlusCircle size={18} /> New Post
        </Link>
      </header>

      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem', borderBottom: '1px solid var(--surface-border)', paddingBottom: '0.5rem' }}>Your Announcements</h2>
        {posts.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: '3rem 1rem' }}>
            <p style={{ color: 'var(--text-secondary)' }}>You haven't posted any projects or requests yet.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {posts.map(post => (
              <div key={post.id} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>{post.title}</h3>
                  <span className={`badge badge-${post.status.toLowerCase().split(' ')[0]}`}>{post.status}</span>
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                  <strong>Domain:</strong> {post.domain}
                </p>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                  <strong>Stage:</strong> {post.projectStage}
                </p>
                <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--surface-border)', display: 'flex', gap: '0.5rem', justifyContent: 'space-between' }}>
                   <Link href={`/posts/${post.id}`} className="btn btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem', flex: 1 }}>
                     View Post <ExternalLink size={14} />
                   </Link>
                   <Link href={`/dashboard/posts/${post.id}/edit`} className="btn btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem', flex: 1 }}>
                     Edit
                   </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

    </div>
  );
}
