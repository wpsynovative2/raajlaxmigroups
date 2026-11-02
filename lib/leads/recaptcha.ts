// Server-only: reads RECAPTCHA_SECRET_KEY. Imported solely by the submitLead server action.
const VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";

type VerifyResponse = {
  success: boolean;
  score?: number;
  action?: string;
  hostname?: string;
  "error-codes"?: string[];
};

/**
 * Verifies a reCAPTCHA v3 token for the given action. Returns true when the visitor looks human.
 * Verification is skipped (with a warning) if RECAPTCHA_SECRET_KEY is not configured,
 * so a missing key never silently drops real leads.
 */
export async function verifyRecaptcha(token: string, expectedAction: string) {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) {
    console.warn("[recaptcha] RECAPTCHA_SECRET_KEY is not set; skipping bot check.");
    return true;
  }
  if (!token) return false;

  const minScore = Number(process.env.RECAPTCHA_MIN_SCORE ?? 0.5);

  try {
    const res = await fetch(VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token }),
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    });
    const body = (await res.json()) as VerifyResponse;
    if (!body.success) {
      console.warn("[recaptcha] Token rejected:", body["error-codes"]);
      return false;
    }
    if (body.action !== expectedAction) {
      console.warn("[recaptcha] Action mismatch:", body.action, "expected", expectedAction);
      return false;
    }
    if ((body.score ?? 0) < minScore) {
      console.warn("[recaptcha] Low score:", body.score);
      return false;
    }
    return true;
  } catch (error) {
    console.error("[recaptcha] Verification request failed:", error);
    return false;
  }
}
