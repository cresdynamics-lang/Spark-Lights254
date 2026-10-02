import { AdminChrome } from "@/components/admin/AdminChrome";
import { MediaUploadForm } from "@/components/admin/MediaUploadForm";

export const metadata = { title: "Admin · Media" };

export default function MediaPage() {
  return (
    <AdminChrome title="Media">
      <div className="mb-8 max-w-2xl">
        <h1 className="font-serif text-3xl sm:text-4xl mb-2">Media</h1>
        <p className="text-mute">
          Uploads are compressed automatically (max 1200px, high-quality JPEG) so the shop stays fast
          without a visible quality drop. Use the returned path in product or journal image fields.
        </p>
      </div>
      <MediaUploadForm />
    </AdminChrome>
  );
}
