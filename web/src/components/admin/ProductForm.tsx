import Link from "next/link";

const field =
  "w-full border border-line px-4 py-3 rounded-md outline-none focus:border-ink bg-paper text-sm";
const label = "label block mb-2";

type CategoryOption = { id: string; name: string; slug: string };
type RoomOption = { slug: string; name: string };

type ProductValues = {
  name?: string;
  slug?: string;
  type?: string;
  price?: number;
  categorySlugs?: string[];
  image?: string;
  hoverImage?: string | null;
  badge?: string | null;
  description?: string;
  styles?: string[];
  rooms?: string[];
  finish?: string[];
  sizes?: string[];
  signature?: boolean;
  published?: boolean;
  specs?: { label: string; value: string }[];
};

export function ProductForm({
  action,
  categories,
  rooms,
  values,
  submitLabel,
}: {
  action: (formData: FormData) => void | Promise<void>;
  categories: CategoryOption[];
  rooms: RoomOption[];
  values?: ProductValues;
  submitLabel: string;
}) {
  const specsText = (values?.specs || [])
    .map((s) => `${s.label}: ${s.value}`)
    .join("\n");
  const selectedRooms = new Set(values?.rooms || []);
  const selectedCategories = new Set(values?.categorySlugs || []);

  return (
    <form action={action} className="space-y-6 max-w-3xl">
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label className={label} htmlFor="name">
            Name
          </label>
          <input id="name" name="name" required defaultValue={values?.name || ""} className={field} />
        </div>
        <div>
          <label className={label} htmlFor="slug">
            Slug
          </label>
          <input
            id="slug"
            name="slug"
            defaultValue={values?.slug || ""}
            placeholder="auto from name if blank"
            className={field}
          />
        </div>
        <div>
          <label className={label} htmlFor="type">
            Type label
          </label>
          <input id="type" name="type" defaultValue={values?.type || ""} className={field} />
        </div>
        <div>
          <label className={label} htmlFor="price">
            Price (KES)
          </label>
          <input
            id="price"
            name="price"
            type="number"
            min={0}
            required
            defaultValue={values?.price ?? ""}
            className={field}
          />
        </div>
        <div>
          <label className={label} htmlFor="badge">
            Badge
          </label>
          <select id="badge" name="badge" defaultValue={values?.badge || ""} className={field}>
            <option value="">None</option>
            <option value="New">New</option>
            <option value="Popular">Popular</option>
            <option value="Signature">Signature</option>
          </select>
        </div>

        <div className="sm:col-span-2 border border-line rounded-md p-4 sm:p-5 bg-paper">
          <p className={label}>Where this light applies</p>
          <p className="text-sm text-mute mb-5">
            Tick every shop category and room this fixture can appear in.
          </p>

          <p className="text-sm font-medium text-ink mb-3">Categories</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
            {categories.map((c) => (
              <label
                key={c.id}
                className="flex items-center gap-3 border border-line rounded-md px-3 py-2.5 text-sm cursor-pointer hover:bg-mist has-[:checked]:border-ink has-[:checked]:bg-mist"
              >
                <input
                  type="checkbox"
                  name="categories"
                  value={c.slug}
                  defaultChecked={selectedCategories.has(c.slug)}
                  className="accent-ink"
                />
                <span>{c.name}</span>
              </label>
            ))}
          </div>

          <p className="text-sm font-medium text-ink mb-3">Rooms</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {rooms.map((r) => (
              <label
                key={r.slug}
                className="flex items-center gap-3 border border-line rounded-md px-3 py-2.5 text-sm cursor-pointer hover:bg-mist has-[:checked]:border-ink has-[:checked]:bg-mist"
              >
                <input
                  type="checkbox"
                  name="rooms"
                  value={r.slug}
                  defaultChecked={selectedRooms.has(r.slug)}
                  className="accent-ink"
                />
                <span>{r.name}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="sm:col-span-2">
          <label className={label} htmlFor="image">
            Image path
          </label>
          <input
            id="image"
            name="image"
            required
            defaultValue={values?.image || ""}
            placeholder="/images/products/example.jpeg"
            className={field}
          />
        </div>
        <div>
          <label className={label} htmlFor="hoverImage">
            Hover image (optional)
          </label>
          <input
            id="hoverImage"
            name="hoverImage"
            defaultValue={values?.hoverImage || ""}
            className={field}
          />
        </div>
        <div className="sm:col-span-2">
          <label className={label} htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            required
            defaultValue={values?.description || ""}
            className={field}
          />
        </div>
        <div>
          <label className={label} htmlFor="styles">
            Styles (comma-separated)
          </label>
          <input
            id="styles"
            name="styles"
            defaultValue={(values?.styles || []).join(", ")}
            className={field}
          />
        </div>
        <div>
          <label className={label} htmlFor="finish">
            Finish (comma-separated)
          </label>
          <input
            id="finish"
            name="finish"
            defaultValue={(values?.finish || []).join(", ")}
            className={field}
          />
        </div>
        <div className="sm:col-span-2">
          <label className={label} htmlFor="sizes">
            Sizes (comma-separated)
          </label>
          <input
            id="sizes"
            name="sizes"
            defaultValue={(values?.sizes || []).join(", ")}
            className={field}
          />
        </div>
        <div className="sm:col-span-2">
          <label className={label} htmlFor="specs">
            Specs (one per line: Label: Value)
          </label>
          <textarea
            id="specs"
            name="specs"
            rows={4}
            defaultValue={specsText}
            placeholder={"Bulbs: 6 × E14\nDiameter: 60 cm"}
            className={field}
          />
        </div>
        <div className="flex flex-wrap gap-6 sm:col-span-2">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="published" defaultChecked={values?.published ?? true} />
            Published
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="signature" defaultChecked={values?.signature ?? false} />
            Signature collection
          </label>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <button type="submit" className="bg-ink text-paper px-5 py-2.5 label rounded-full">
          {submitLabel}
        </button>
        <Link href="/admin/products" className="border border-line px-5 py-2.5 label rounded-full">
          Cancel
        </Link>
      </div>
    </form>
  );
}
