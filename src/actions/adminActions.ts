"use server";

import { db } from "@/lib/db";
import { getSession } from "@/lib/session";
import { revalidatePath } from "next/cache";

export async function suspendUser(userId: string) {
  const session = await getSession();
  if (!session || session.role !== "Admin") {
    return { error: "Unauthorized" };
  }

  const user = await db.user.findUnique({ where: { id: userId } });
  if (!user) return { error: "User not found" };

  await db.user.update({
    where: { id: userId },
    data: { isActive: !user.isActive } // toggles suspension
  });

  await db.activityLog.create({
    data: { 
      userId: session.userId, 
      actionType: user.isActive ? "SUSPEND_USER" : "UNSUSPEND_USER", 
      targetEntity: userId, 
      resultStatus: "SUCCESS" 
    }
  });

  revalidatePath("/admin");
  return { success: true };
}

export async function adminDeletePost(postId: string) {
  const session = await getSession();
  if (!session || session.role !== "Admin") {
    return { error: "Unauthorized" };
  }

  // Delete related meeting requests first
  await db.meetingRequest.deleteMany({ where: { postId } });
  await db.post.delete({ where: { id: postId } });

  await db.activityLog.create({
    data: { userId: session.userId, actionType: "ADMIN_DELETE_POST", targetEntity: postId, resultStatus: "SUCCESS" }
  });

  revalidatePath("/admin");
  revalidatePath("/dashboard");
  revalidatePath("/posts");
  return { success: true };
}

export async function adminDeleteUser(userId: string) {
  const session = await getSession();
  if (!session || session.role !== "Admin") {
    return { error: "Unauthorized" };
  }

  // Prevent admin from deleting themselves
  if (session.userId === userId) {
    return { error: "You cannot delete your own admin account from here." };
  }

  // Delete all related records
  await db.notification.deleteMany({ where: { userId } });
  await db.activityLog.deleteMany({ where: { userId } });
  
  const userPosts = await db.post.findMany({ where: { ownerId: userId } });
  const postIds = userPosts.map(p => p.id);
  
  await db.meetingRequest.deleteMany({ 
    where: { OR: [{ requesterId: userId }, { postId: { in: postIds } }] } 
  });
  await db.post.deleteMany({ where: { ownerId: userId } });
  
  // Delete the user
  await db.user.delete({ where: { id: userId } });

  revalidatePath("/admin");
  return { success: true };
}
