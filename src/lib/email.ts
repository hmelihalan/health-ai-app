import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "Health AI <onboarding@resend.dev>";

export async function sendVerificationEmail(to: string, token: string) {
  if (resend) {
    try {
      await resend.emails.send({
        from: FROM_EMAIL,
        to,
        subject: "Verify your Health AI Account",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 2rem; background: #0f172a; color: #e2e8f0; border-radius: 12px;">
            <h2 style="text-align: center; color: #60a5fa; margin-bottom: 0.5rem;">HEALTH AI</h2>
            <p style="text-align: center; color: #94a3b8; font-size: 0.9rem;">Co-Creation & Innovation Platform</p>
            <hr style="border: none; border-top: 1px solid #1e293b; margin: 1.5rem 0;" />
            <p style="margin-bottom: 1rem;">Your verification code is:</p>
            <div style="text-align: center; background: #1e293b; padding: 1.25rem; border-radius: 8px; margin-bottom: 1.5rem;">
              <span style="font-size: 2rem; font-weight: 700; letter-spacing: 0.3em; color: #60a5fa;">${token}</span>
            </div>
            <p style="font-size: 0.85rem; color: #94a3b8;">Enter this code on the verification page to activate your account. This code will expire shortly.</p>
          </div>
        `,
      });
      return;
    } catch (error) {
      console.error("Failed to send email via Resend:", error);
    }
  }

  // Fallback to console for local development
  console.log(`\n\n=== MOCK EMAIL ===\nTo: ${to}\nSubject: Verify your Health AI Account\nToken: ${token}\n==================\n\n`);
}

export async function sendPasswordResetEmail(to: string, token: string) {
  if (resend) {
    try {
      await resend.emails.send({
        from: FROM_EMAIL,
        to,
        subject: "Reset your Health AI Password",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 2rem; background: #0f172a; color: #e2e8f0; border-radius: 12px;">
            <h2 style="text-align: center; color: #60a5fa; margin-bottom: 0.5rem;">HEALTH AI</h2>
            <p style="text-align: center; color: #94a3b8; font-size: 0.9rem;">Password Reset Request</p>
            <hr style="border: none; border-top: 1px solid #1e293b; margin: 1.5rem 0;" />
            <p style="margin-bottom: 1rem;">Your password reset code is:</p>
            <div style="text-align: center; background: #1e293b; padding: 1.25rem; border-radius: 8px; margin-bottom: 1.5rem;">
              <span style="font-size: 2rem; font-weight: 700; letter-spacing: 0.3em; color: #f59e0b;">${token}</span>
            </div>
            <p style="font-size: 0.85rem; color: #94a3b8;">If you didn't request this, you can safely ignore this email.</p>
          </div>
        `,
      });
      return;
    } catch (error) {
      console.error("Failed to send reset email via Resend:", error);
    }
  }

  // Fallback to console for local development
  console.log(`\n\n=== MOCK EMAIL ===\nTo: ${to}\nSubject: Reset your Health AI Password\nToken: ${token}\n==================\n\n`);
}
