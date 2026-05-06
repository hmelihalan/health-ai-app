"use server";

import { db } from "@/lib/db";
import { getSession } from "@/lib/session";
import { revalidatePath } from "next/cache";

export async function submitFeedback(formData: FormData) {
  const message = formData.get("message") as string;
  if (!message) return { error: "Message is required" };

  const session = await getSession();

  await db.feedback.create({
    data: {
      message,
      userId: session?.userId || null
    }
  });

  if (session?.userId) {
    await db.activityLog.create({
      data: { userId: session.userId, actionType: "SUBMIT_FEEDBACK", resultStatus: "SUCCESS" }
    });
  }

  revalidatePath("/admin/feedback");
  return { success: true };
}
