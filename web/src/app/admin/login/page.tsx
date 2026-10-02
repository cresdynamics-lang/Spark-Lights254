import { redirect } from "next/navigation";
import { getAdminSession, verifyAdminLogin, createAdminSession } from "@/lib/admin-auth";

export const metadata = { title: "Admin login" };

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const admin = await getAdminSession();
  if (admin) redirect("/admin");
  const { error } = await searchParams;

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md border border-line bg-paper p-8 rounded-md">
        <p className="label mb-2">Sparklights 254</p>
        <h1 className="font-serif text-3xl mb-2">Admin</h1>
        <p className="text-mute text-sm mb-8">Sign in to manage products and blogs.</p>
        {error ? (
          <p className="mb-4 text-sm text-red-700 bg-red-50 border border-red-100 px-3 py-2 rounded-md">
            Invalid email or password.
          </p>
        ) : null}
        <form action={loginAction} className="space-y-4">
          <div>
            <label htmlFor="email" className="label block mb-2">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="username"
              className="w-full border border-line px-4 py-3 rounded-md outline-none focus:border-ink"
            />
          </div>
          <div>
            <label htmlFor="password" className="label block mb-2">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="w-full border border-line px-4 py-3 rounded-md outline-none focus:border-ink"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-ink text-paper py-3 label tracking-[0.14em] rounded-full"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}

async function loginAction(formData: FormData) {
  "use server";
  const email = String(formData.get("email") || "");
  const password = String(formData.get("password") || "");
  const admin = await verifyAdminLogin(email, password);
  if (!admin) redirect("/admin/login?error=1");
  await createAdminSession(admin.id);
  redirect("/admin");
}
