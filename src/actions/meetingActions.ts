"use server";

import { db } from "@/lib/db";
import { getSession } from "@/lib/session";
import { revalidatePath } from "next/cache";

export async function requestMeeting(formData: FormData) {
  const session = await getSession();
  if (!session) return { error: "Unauthorized" };

  const postId = formData.get("postId") as string;
  const timeSlots = formData.get("timeSlots") as string;
  const message = formData.get("message") as string;
  const ndaAccepted = formData.get("ndaAccepted") === "on";

  if (!ndaAccepted) {
    return { error: "You must accept the NDA to request a meeting." };
  }

  // check if already requested
  const existing = await db.meetingRequest.findFirst({
    where: { postId, requesterId: session.userId }
  });

  if (existing) {
    return { error: "You have already requested a meeting for this post." };
  }

  const mr = await db.meetingRequest.create({
    data: {
      postId,
      requesterId: session.userId,
      timeSlots,
      message,
      ndaAccepted: true,
      status: "Pending"
    }
  });

  // Log activity
  await db.activityLog.create({
    data: {
      userId: session.userId,
      actionType: "REQUEST_MEETING",
      targetEntity: mr.id,
      resultStatus: "SUCCESS",
    }
  });

  revalidatePath(`/posts/${postId}`);
  return { success: true };
}

export async function respondToMeeting(requestId: string, status: "Scheduled" | "Declined") {
  const session = await getSession();
  if (!session) return { error: "Unauthorized" };

  const mr = await db.meetingRequest.findUnique({
    where: { id: requestId },
    include: { post: true }
  });

  if (!mr || mr.post.ownerId !== session.userId) {
    return { error: "Not authorized to respond to this request." };
  }

  await db.meetingRequest.update({
    where: { id: requestId },
    data: { status }
  });

  // if scheduled, maybe update post status to "Meeting Scheduled" if it's currently active.
  if (status === "Scheduled" && mr.post.status === "Active") {
    await db.post.update({
      where: { id: mr.postId },
      data: { status: "Meeting Scheduled" }
    });
  }

  await db.activityLog.create({
    data: {
      userId: session.userId,
      actionType: `RESPOND_MEETING_${status.toUpperCase()}`,
      targetEntity: requestId,
      resultStatus: "SUCCESS",
    }
  });

  revalidatePath(`/posts/${mr.postId}`);
  revalidatePath(`/dashboard`);
  return { success: true };
}

