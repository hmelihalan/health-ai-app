import { db } from "@/lib/db";
import { MessageSquareText, User } from "lucide-react";

export default async function AdminFeedbackPage() {
  const feedbacks = await db.feedback.findMany({
    include: {
      user: { select: { email: true, role: true } }
    },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div>
      <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <MessageSquareText size={20} /> User Feedback
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {feedbacks.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
            No feedback received yet.
          </div>
        ) : (
          feedbacks.map(fb => (
            <div key={fb.id} className="card" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  <User size={14} />
                  <span>{fb.user ? `${fb.user.email} (${fb.user.role})` : "Guest User"}</span>
                </div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  {fb.createdAt.toLocaleString()}
                </span>
              </div>
              <p style={{ lineHeight: 1.6, fontSize: '0.95rem', whiteSpace: 'pre-wrap' }}>
                {fb.message}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
