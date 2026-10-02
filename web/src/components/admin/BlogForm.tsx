import Link from "next/link";

const field =
  "w-full border border-line px-4 py-3 rounded-md outline-none focus:border-ink bg-paper text-sm";
const label = "label block mb-2";

type BlogValues = {
  title?: string;
  slug?: string;
  topic?: string;
  excerpt?: string;
  body?: string;
  author?: string;
  minutes?: number;
  audienceHref?: string | null;
  image?: string | null;
  featured?: boolean;
  published?: boolean;
};

export function BlogForm({
  action,
  values,
  submitLabel,
}: {
  action: (formData: FormData) => void | Promise<void>;
  values?: BlogValues;
  submitLabel: string;
}) {
  return (
    <form action={action} className="space-y-6 max-w-3xl">
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label className={label} htmlFor="title">
            Title
          </label>
          <input id="title" name="title" required defaultValue={values?.title || ""} className={field} />
        </div>
        <div>
          <label className={label} htmlFor="slug">
            Slug
          </label>
          <input
            id="slug"
            name="slug"
            defaultValue={values?.slug || ""}
            placeholder="auto from title if blank"
            className={field}
          />
        </div>
        <div>
          <label className={label} htmlFor="topic">
            Topic
          </label>
          <input id="topic" name="topic" required defaultValue={values?.topic || ""} className={field} />
        </div>
        <div>
          <label className={label} htmlFor="author">
            Author
          </label>
          <input
            id="author"
            name="author"
            defaultValue={values?.author || "Sparklights 254"}
            className={field}
          />
        </div>
        <div>
          <label className={label} htmlFor="minutes">
            Read time (minutes)
          </label>
          <input
            id="minutes"
            name="minutes"
            type="number"
            min={1}
            defaultValue={values?.minutes ?? 5}
            className={field}
          />
        </div>
        <div className="sm:col-span-2">
          <label className={label} htmlFor="excerpt">
            Excerpt
          </label>
          <textarea
            id="excerpt"
            name="excerpt"
            rows={2}
            required
            defaultValue={values?.excerpt || ""}
            className={field}
          />
        </div>
        <div className="sm:col-span-2">
          <label className={label} htmlFor="body">
            Body
          </label>
          <textarea
            id="body"
            name="body"
            rows={12}
            required
            defaultValue={values?.body || ""}
            placeholder={"Intro paragraph.\n\n## Section heading\n\nMore copy…"}
            className={field}
          />
          <p className="text-xs text-mute mt-2">
            Use blank lines between paragraphs. Start a line with ## for a heading.
          </p>
        </div>
        <div>
          <label className={label} htmlFor="audienceHref">
            Related page URL (optional)
          </label>
          <input
            id="audienceHref"
            name="audienceHref"
            defaultValue={values?.audienceHref || ""}
            placeholder="/podcast-studio-lighting-nairobi"
            className={field}
          />
        </div>
        <div>
          <label className={label} htmlFor="image">
            Image path (optional)
          </label>
          <input id="image" name="image" defaultValue={values?.image || ""} className={field} />
        </div>
        <div className="flex flex-wrap gap-6 sm:col-span-2">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="published" defaultChecked={values?.published ?? true} />
            Published
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="featured" defaultChecked={values?.featured ?? false} />
            Featured on journal hub
          </label>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <button type="submit" className="bg-ink text-paper px-5 py-2.5 label rounded-full">
          {submitLabel}
        </button>
        <Link href="/admin/blogs" className="border border-line px-5 py-2.5 label rounded-full">
          Cancel
        </Link>
      </div>
    </form>
  );
}
