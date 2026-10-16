import { redirect } from "next/navigation";

/** /blog is an alias of the Style Journal hub. */
export default function BlogIndexPage() {
  redirect("/journal");
}
