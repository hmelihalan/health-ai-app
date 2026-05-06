"use client";

import { useState } from "react";
import { submitFeedback } from "@/actions/feedbackActions";
import { MessageSquareText, Send } from "lucide-react";

export default function FeedbackForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setStatus("loading");
    const formData = new FormData();
    formData.append("message", message);

    const res = await submitFeedback(formData);
    if (res.success) {
      setStatus("success");
      setMessage("");
      setTimeout(() => {
        setStatus("idle");
        setIsOpen(false);
      }, 2000);
    } else {
      setStatus("idle");
    }
  };

  return (
    <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 100 }}>
      {isOpen ? (
        <div className="card fade-in" style={{ width: '300px', padding: '1.5rem', boxShadow: '0 10px 25px rgba(0,0,0,0.3)', border: '1px solid var(--surface-border)' }}>
          <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', fontSize: '1rem' }}>
            <MessageSquareText size={18} color="var(--accent-color)" /> Send Feedback
          </h4>
          
          {status === "success" ? (
            <p style={{ color: 'var(--success-color)', fontSize: '0.9rem', textAlign: 'center', padding: '1rem 0' }}>
              Thank you for your feedback!
            </p>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <textarea 
                className="form-input" 
                placeholder="What can we improve?" 
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                style={{ resize: 'none', fontSize: '0.9rem' }}
                disabled={status === "loading"}
              />
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button 
                  type="submit" 
                  className="btn btn-primary" 
                  style={{ flex: 1, padding: '0.5rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                  disabled={status === "loading" || !message.trim()}
                >
                  <Send size={14} /> {status === "loading" ? "Sending..." : "Submit"}
                </button>
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => setIsOpen(false)}
                  style={{ padding: '0.5rem', fontSize: '0.85rem' }}
                  disabled={status === "loading"}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="btn btn-primary"
          style={{ 
            borderRadius: '50px', 
            padding: '0.75rem 1.25rem', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            boxShadow: '0 4px 12px rgba(99, 102, 241, 0.4)' 
          }}
        >
          <MessageSquareText size={20} />
          <span>Feedback</span>
        </button>
      )}
    </div>
  );
}
