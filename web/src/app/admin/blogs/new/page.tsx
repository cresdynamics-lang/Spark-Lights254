import { AdminChrome } from "@/components/admin/AdminChrome";
import { BlogForm } from "@/components/admin/BlogForm";
import { createBlog } from "../actions";

export const metadata = { title: "Admin · New blog" };

export default function NewBlogPage() {
  return (
    <AdminChrome title="New blog">
      <h1 className="font-serif text-3xl sm:text-4xl mb-2">New blog post</h1>
      <p className="text-mute mb-8">Published posts appear on /journal.</p>
      <BlogForm action={createBlog} submitLabel="Publish post" />
    </AdminChrome>
  );
}
