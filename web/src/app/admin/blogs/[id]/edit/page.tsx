import { notFound } from "next/navigation";
import { AdminChrome } from "@/components/admin/AdminChrome";
import { BlogForm } from "@/components/admin/BlogForm";
import { prisma } from "@/lib/db";
import { updateBlog, deleteBlog } from "../../actions";

export const metadata = { title: "Admin · Edit blog" };

type Props = { params: Promise<{ id: string }> };

export default async function EditBlogPage({ params }: Props) {
  const { id } = await params;
  const blog = await prisma.blog.findUnique({ where: { id } });
  if (!blog) notFound();

  return (
    <AdminChrome title="Edit blog">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl sm:text-4xl mb-2">Edit blog post</h1>
          <p className="text-mute">{blog.title}</p>
        </div>
        <form action={deleteBlog.bind(null, blog.id)}>
          <button type="submit" className="label border border-red-300 text-red-700 px-4 py-2 rounded-full">
            Delete post
          </button>
        </form>
      </div>
      <BlogForm
        action={updateBlog.bind(null, blog.id)}
        submitLabel="Save changes"
        values={{
          title: blog.title,
          slug: blog.slug,
          topic: blog.topic,
          excerpt: blog.excerpt,
          body: blog.body,
          author: blog.author,
          minutes: blog.minutes,
          audienceHref: blog.audienceHref,
          image: blog.image,
          featured: blog.featured,
          published: blog.published,
        }}
      />
    </AdminChrome>
  );
}
