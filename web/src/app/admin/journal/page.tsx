import { redirect } from "next/navigation";

/** Journal posts are managed via the Blogs CRUD (Prisma Blog → /journal). */
export default function Page() {
  redirect("/admin/blogs");
}
