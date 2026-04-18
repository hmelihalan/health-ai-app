import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const SECRET = process.env.JWT_SECRET || "SUPER_SECRET_KEY_FOR_DEMO";

export interface SessionPayload {
  userId: string;
  role: string;
  email: string;
}

export async function encrypt(payload: SessionPayload) {
  return jwt.sign(payload, SECRET, { expiresIn: "1d" });
}

export async function decrypt(token: string): Promise<SessionPayload | null> {
  try {
    const payload = jwt.verify(token, SECRET) as SessionPayload;
    return payload;
  } catch (err) {
    return null;
  }
}

export async function createSession(payload: SessionPayload) {
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
  const session = await encrypt(payload);

  const cookieStore = await cookies();
  cookieStore.set("session", session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires,
    sameSite: "lax",
    path: "/",
  });
}

export async function getSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function destroySession() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}
