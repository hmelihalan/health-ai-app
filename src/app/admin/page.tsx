import { getSession } from "@/lib/session";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { Download, ShieldAlert, Trash2, Users } from "lucide-react";
import AdminActionsClient from "./AdminActionsClient";

export default async function AdminDashboardPage() {
  const session = await getSession();
  if (!session || session.role !== "Admin") {
    redirect("/dashboard");
  }

  const usersCount = await db.user.count();
  const postsCount = await db.post.count();
  const matchesCount = await db.post.count({ where: { status: "Partner Found" } });

  const recentUsers = await db.user.findMany({
    take: 10,
    orderBy: { createdAt: 'desc' }
  });

  const recentPosts = await db.post.findMany({
    take: 10,
    orderBy: { createdAt: 'desc' },
    include: { owner: { select: { email: true } } }
  });

  const recentLogs = await db.activityLog.findMany({
    take: 15,
    orderBy: { timestamp: 'desc' },
    include: { user: { select: { email: true } } }
  });

  return (
    <div className="fade-in" style={{ padding: '1rem 0' }}>
      <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 600, color: 'var(--danger-color)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShieldAlert size={28} /> Admin Console
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>System overview, moderation, and audit logs.</p>
        </div>
      </header>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        <div className="card" style={{ textAlign: 'center' }}>
          <h3 style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--accent-color)' }}>{usersCount}</h3>
          <p style={{ color: 'var(--text-secondary)', textTransform: 'uppercase', fontSize: '0.85rem', fontWeight: 600 }}>Total Users</p>
        </div>
        <div className="card" style={{ textAlign: 'center' }}>
          <h3 style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--accent-color)' }}>{postsCount}</h3>
          <p style={{ color: 'var(--text-secondary)', textTransform: 'uppercase', fontSize: '0.85rem', fontWeight: 600 }}>Announcements</p>
        </div>
        <div className="card" style={{ textAlign: 'center' }}>
          <h3 style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--success-color)' }}>{matchesCount}</h3>
          <p style={{ color: 'var(--text-secondary)', textTransform: 'uppercase', fontSize: '0.85rem', fontWeight: 600 }}>Successful Matches</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '3rem' }}>
        {/* Users */}
        <div className="card">
          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem', borderBottom: '1px solid var(--surface-border)', paddingBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Users size={18} /> User Management
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {recentUsers.map(u => (
              <div key={u.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem', background: 'var(--bg-color)', borderRadius: '6px' }}>
                <div>
                  <p style={{ fontSize: '0.9rem', fontWeight: 500 }}>{u.email}</p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>ROLE: {u.role}</p>
                </div>
                <AdminActionsClient action="suspend" targetId={u.id} />
              </div>
            ))}
          </div>
        </div>

        {/* Posts */}
        <div className="card">
          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem', borderBottom: '1px solid var(--surface-border)', paddingBottom: '0.5rem' }}>
            Post Moderation
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {recentPosts.map(p => (
              <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem', background: 'var(--bg-color)', borderRadius: '6px' }}>
                <div style={{ maxWidth: '70%' }}>
                  <p style={{ fontSize: '0.9rem', fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.title}</p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>by {p.owner.email}</p>
                </div>
                <AdminActionsClient action="delete_post" targetId={p.id} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Logs */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--surface-border)', paddingBottom: '0.75rem', marginBottom: '1rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Activity Logs & Audit Trail</h2>
          <a href="/api/admin/export-logs" target="_blank" className="btn btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}>
            <Download size={14} /> Export CSV
          </a>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ color: 'var(--text-secondary)', borderBottom: '1px solid var(--surface-border)' }}>
                <th style={{ padding: '0.75rem 0' }}>Timestamp</th>
                <th style={{ padding: '0.75rem 0' }}>User</th>
                <th style={{ padding: '0.75rem 0' }}>Action</th>
                <th style={{ padding: '0.75rem 0' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentLogs.map(log => (
                <tr key={log.id} style={{ borderBottom: '1px solid rgba(51, 65, 85, 0.5)' }}>
                  <td style={{ padding: '0.75rem 0', color: 'var(--text-secondary)' }}>{log.timestamp.toLocaleString()}</td>
                  <td style={{ padding: '0.75rem 0' }}>{log.user.email}</td>
                  <td style={{ padding: '0.75rem 0', fontWeight: 500 }}>{log.actionType}</td>
                  <td style={{ padding: '0.75rem 0' }}>
                    <span style={{ color: log.resultStatus === 'SUCCESS' ? 'var(--success-color)' : 'inherit' }}>{log.resultStatus}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
