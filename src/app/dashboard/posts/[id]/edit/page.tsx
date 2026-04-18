import { db } from "@/lib/db";
import { getSession } from "@/lib/session";
import { notFound, redirect } from "next/navigation";
import EditPostForm from "@/components/EditPostForm";

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) redirect("/login");

  const { id } = await params;
  
  const post = await db.post.findUnique({
    where: { id }
  });

  if (!post) notFound();
  if (post.ownerId !== session.userId) redirect("/dashboard");

  return (
    <div style={{ padding: '1rem 0' }}>
      <EditPostForm post={post} />
    </div>
  );
}
