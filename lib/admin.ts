// lib/admin.ts
export function verifyAdminSecret(
  providedSecret: string | null | undefined
): boolean {
  const adminSecret = process.env.ADMIN_SECRET;

  console.log("========= ADMIN DEBUG =========");
  console.log("Header:", providedSecret);
  console.log("Env:", adminSecret);
  console.log("=================================")

  if (!adminSecret) {
    throw new Error(
      "ADMIN_SECRET is missing. Add it to your .env.local file."
    );
  }

  if (!providedSecret) {
    return false;
  }

  return providedSecret === adminSecret;
}