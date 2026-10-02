import Link from "next/link";
import { AdminChrome } from "@/components/admin/AdminChrome";
import { listAdminBlogs } from "@/lib/blogs";
import { toggleBlogPublished, deleteBlog } from "./actions";

export const metadata = { title: "Admin · Blogs" };

export default async function AdminBlogsPage() {
  let blogs: Awaited<ReturnType<typeof listAdminBlogs>> = [];
  try {
    blogs = await listAdminBlogs();
  } catch {
    blogs = [];
  }

  return (
    <AdminChrome title="Blogs">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl sm:text-4xl mb-2">Blogs</h1>
          <p className="text-mute">
            {blogs.length} posts · published posts appear on the Lighting Journal.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href="/journal" className="label border border-ink px-4 py-2 rounded-full">
            View journal
          </Link>
          <Link href="/admin/blogs/new" className="label bg-ink text-paper px-4 py-2 rounded-full">
            + New post
          </Link>
        </div>
      </div>

      {blogs.length === 0 ? (
        <div className="border border-line bg-paper p-8 rounded-md">
          <p className="font-serif text-2xl mb-2">No blog posts yet</p>
          <p className="text-mute mb-4">Write your first guide for the journal.</p>
          <Link href="/admin/blogs/new" className="label bg-ink text-paper px-4 py-2 rounded-full inline-block">
            + New post
          </Link>
        </div>
      ) : (
        <div className="border border-line bg-paper rounded-md overflow-hidden">
          <div className="hidden sm:grid grid-cols-[1.5fr_120px_80px_100px_140px] gap-3 px-4 py-3 label border-b border-line bg-mist">
            <span>Post</span>
            <span>Topic</span>
            <span>Min</span>
            <span>Status</span>
            <span>Actions</span>
          </div>
          <ul className="divide-y divide-line">
            {blogs.map((b) => (
              <li
                key={b.id}
                className="grid grid-cols-1 sm:grid-cols-[1.5fr_120px_80px_100px_140px] gap-3 px-4 py-3 items-center"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{b.title}</p>
                  <p className="label mt-0.5 truncate">/{b.slug}</p>
                  <div className="sm:hidden flex flex-wrap gap-3 mt-2">
                    <form action={toggleBlogPublished.bind(null, b.id, !b.published)}>
                      <button type="submit" className="label">
                        {b.published ? "Live" : "Draft"}
                      </button>
                    </form>
                    <Link href={`/admin/blogs/${b.id}/edit`} className="label">
                      Edit
                    </Link>
                    <form action={deleteBlog.bind(null, b.id)}>
                      <button type="submit" className="label text-red-700">
                        Delete
                      </button>
                    </form>
                  </div>
                </div>
                <p className="hidden sm:block text-sm text-mute">{b.topic}</p>
                <p className="hidden sm:block text-sm text-mute">{b.minutes}</p>
                <form
                  action={toggleBlogPublished.bind(null, b.id, !b.published)}
                  className="hidden sm:block"
                >
                  <button
                    type="submit"
                    className={`label px-3 py-1.5 rounded-full border ${
                      b.published ? "border-ink bg-ink text-paper" : "border-line text-mute"
                    }`}
                  >
                    {b.published ? "Live" : "Draft"}
                  </button>
                </form>
                <div className="hidden sm:flex items-center gap-3">
                  <Link href={`/admin/blogs/${b.id}/edit`} className="label">
                    Edit
                  </Link>
                  <form action={deleteBlog.bind(null, b.id)}>
                    <button type="submit" className="label text-red-700">
                      Delete
                    </button>
                  </form>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </AdminChrome>
  );
}
