"use server";

import { db } from "@/lib/db";
import { getSession } from "@/lib/session";
import { revalidatePath } from "next/cache";

export async function createPost(formData: FormData) {
  const session = await getSession();
  if (!session) return { error: "Unauthorized" };

  const title = formData.get("title") as string;
  const domain = formData.get("domain") as string;
  const requiredExpertise = formData.get("requiredExpertise") as string;
  const projectStage = formData.get("projectStage") as string;
  const confidentialityLevel = formData.get("confidentialityLevel") as string;
  const city = formData.get("city") as string;
  const description = formData.get("description") as string;
  const status = formData.get("status") as string || "Active"; // default active if publish immediately, or Draft

  const post = await db.post.create({
    data: {
      title,
      domain,
      requiredExpertise,
      projectStage,
      confidentialityLevel,
      city,
      description,
      status,
      ownerId: session.userId,
    }
  });

  await db.activityLog.create({
    data: {
      userId: session.userId,
      actionType: "CREATE_POST",
      targetEntity: post.id,
      resultStatus: "SUCCESS",
    }
  });

  revalidatePath("/dashboard");
  revalidatePath("/posts");
  return { success: true };
}

export async function updatePostStatus(postId: string, status: string) {
  const session = await getSession();
  if (!session) return { error: "Unauthorized" };

  const post = await db.post.update({
    where: { id: postId, ownerId: session.userId },
    data: { status }
  });

  await db.activityLog.create({
    data: {
      userId: session.userId,
      actionType: "UPDATE_POST_STATUS",
      targetEntity: postId,
      resultStatus: status,
    }
  });

  revalidatePath("/dashboard");
  revalidatePath("/posts");
  return { success: true };
}

export async function updatePost(formData: FormData) {
  const session = await getSession();
  if (!session) return { error: "Unauthorized" };

  const postId = formData.get("postId") as string;
  const title = formData.get("title") as string;
  const domain = formData.get("domain") as string;
  const requiredExpertise = formData.get("requiredExpertise") as string;
  const projectStage = formData.get("projectStage") as string;
  const confidentialityLevel = formData.get("confidentialityLevel") as string;
  const city = formData.get("city") as string;
  const description = formData.get("description") as string;
  const status = formData.get("status") as string;

  const existingPost = await db.post.findUnique({ where: { id: postId } });
  if (!existingPost) return { error: "Not found" };
  if (existingPost.ownerId !== session.userId) return { error: "Unauthorized" };

  await db.post.update({
    where: { id: postId },
    data: {
      title,
      domain,
      requiredExpertise,
      projectStage,
      confidentialityLevel,
      city,
      description,
      ...(status ? { status } : {}), // Update status only if provided
    }
  });

  await db.activityLog.create({
    data: {
      userId: session.userId,
      actionType: "UPDATE_POST",
      targetEntity: postId,
      resultStatus: "SUCCESS",
    }
  });

  revalidatePath("/dashboard");
  revalidatePath(`/posts/${postId}`);
  return { success: true };
}
