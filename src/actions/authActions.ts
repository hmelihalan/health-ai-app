"use server";

import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { createSession, destroySession, getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export async function registerUser(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const role = formData.get("role") as string;
  const city = formData.get("city") as string;
  const institution = formData.get("institution") as string;

  if (!email.endsWith(".edu")) {
    return { error: "Registration is restricted to institutional .edu email addresses only." };
  }

  const existing = await db.user.findUnique({ where: { email } });
  if (existing) {
    return { error: "User already exists with this email." };
  }

  const passwordHash = await bcrypt.hash(password, 10);
  
  const user = await db.user.create({
    data: {
      email,
      passwordHash,
      role,
      city,
      institution
    }
  });

  await db.activityLog.create({
    data: {
      userId: user.id,
      actionType: "REGISTER",
      resultStatus: "SUCCESS",
    }
  });

  // Instead of redirecting immediately to dashboard, redirect to mock verification page
  redirect(`/verify?email=${encodeURIComponent(email)}`);
}

export async function verifyAndLogin(email: string) {
  const user = await db.user.findUnique({ where: { email } });
  if (!user) return { error: "User not found" };

  await createSession({ userId: user.id, role: user.role, email: user.email });
  
  await db.activityLog.create({
    data: {
      userId: user.id,
      actionType: "LOGIN_AFTER_VERIFY",
      resultStatus: "SUCCESS",
    }
  });

  redirect("/dashboard");
}

export async function loginUser(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const user = await db.user.findUnique({ where: { email } });
  
  if (!user) {
    return { error: "Invalid credentials" };
  }

  const isValid = await bcrypt.compare(password, user.passwordHash);

  if (!isValid) {
    await db.activityLog.create({
      data: {
        userId: user.id,
        actionType: "LOGIN",
        resultStatus: "FAILED",
      }
    });
    return { error: "Invalid credentials" };
  }

  await createSession({ userId: user.id, role: user.role, email: user.email });

  await db.activityLog.create({
    data: {
      userId: user.id,
      actionType: "LOGIN",
      resultStatus: "SUCCESS",
    }
  });

  redirect("/dashboard");
}

export async function logoutUser() {
  await destroySession();
  redirect("/login");
}

export async function updateProfile(formData: FormData) {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

  const city = formData.get("city") as string;
  const institution = formData.get("institution") as string;

  await db.user.update({
    where: { id: session.userId },
    data: { city, institution }
  });

  await db.activityLog.create({
    data: {
      userId: session.userId,
      actionType: "UPDATE_PROFILE",
      resultStatus: "SUCCESS",
    }
  });

  redirect("/profile");
}
