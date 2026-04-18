"use client";

import { useActionState } from "react";
import { updatePost } from "@/actions/postActions";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type ActionState = {
  success: boolean;
  error: string;
};

// We define the type structure the component expects without referencing Prisma types directly on the client to avoid issues
type PostProps = {
  id: string;
  title: string;
  domain: string;
  requiredExpertise: string;
  projectStage: string;
  confidentialityLevel: string;
  city: string;
  description: string;
  status: string;
};

export default function EditPostForm({ post }: { post: PostProps }) {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(
    async (prevState: ActionState, formData: FormData): Promise<ActionState> => {
      const res = await updatePost(formData);
      if (res.success) {
        return { success: true, error: "" };
      }
      return { success: false, error: res.error || "Failed to update post" };
    },
    { success: false, error: "" }
  );

  useEffect(() => {
    if (state?.success) {
      router.push("/dashboard");
    }
  }, [state?.success, router]);

  return (
    <div className="fade-in">
      <Link href="/dashboard" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
        <ArrowLeft size={16} /> Back to Dashboard
      </Link>
      
      <div className="card">
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1.5rem' }}>Edit Announcement</h2>
        
        <form action={formAction} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {state?.error && (
            <div style={{ padding: '0.75rem', background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger-color)', borderRadius: '8px', border: '1px solid var(--danger-color)' }}>
              {state.error}
            </div>
          )}

          <input type="hidden" name="postId" value={post.id} />

          <div className="form-group">
            <label className="form-label">Post Title</label>
            <input type="text" name="title" defaultValue={post.title} required className="input-field" placeholder="e.g., Cardiology Imaging AI Model Validation" />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Working Domain</label>
              <input type="text" name="domain" defaultValue={post.domain} required className="input-field" placeholder="e.g., Cardiology Imaging" />
            </div>
            <div className="form-group">
              <label className="form-label">Required Expertise</label>
              <input type="text" name="requiredExpertise" defaultValue={post.requiredExpertise} required className="input-field" placeholder="e.g., Machine Learning, Computer Vision" />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Project Stage</label>
              <select name="projectStage" defaultValue={post.projectStage} required className="input-field" style={{ appearance: 'none' }}>
                <option value="Idea">Idea</option>
                <option value="Concept Validation">Concept Validation</option>
                <option value="Prototype Developed">Prototype Developed</option>
                <option value="Pilot Testing">Pilot Testing</option>
                <option value="Pre-deployment">Pre-deployment</option>
              </select>
            </div>
            
            <div className="form-group">
              <label className="form-label">Confidentiality Level</label>
              <select name="confidentialityLevel" defaultValue={post.confidentialityLevel} required className="input-field" style={{ appearance: 'none' }}>
                <option value="Public short pitch">Public short pitch</option>
                <option value="Details discussed in meeting only">Details discussed in meeting only</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">City</label>
              <input type="text" name="city" defaultValue={post.city} required className="input-field" placeholder="e.g., Munich" />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Description & High-level idea</label>
            <textarea name="description" defaultValue={post.description} required className="input-field" rows={5} placeholder="Describe the gap, what you have, and what kind of partnership you are looking for..." style={{ resize: 'vertical' }}></textarea>
          </div>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
            <div>
              <span className="badge badge-draft" style={{ marginRight: '0.5rem' }}>Current Status: {post.status}</span>
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button type="submit" name="status" value="Draft" disabled={isPending} className="btn btn-secondary">
                Save as Draft
              </button>
              <button type="submit" name="status" value="Active" disabled={isPending} className="btn btn-primary">
                Publish Active
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
