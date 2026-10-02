import { DELIVERY_AREAS } from "@/lib/constants";

export function AreaTicker() {
  const items = [
    ...DELIVERY_AREAS.map((a) => a.name),
    "Delivered",
    "Installed",
    "Lit",
  ];
  const line = items.join(" · ");

  return (
    <div
      className="border-t border-line bg-paper overflow-hidden py-3"
      aria-hidden="true"
    >
      <div className="area-ticker flex whitespace-nowrap w-max motion-reduce:!animate-none">
        <span className="label px-4 text-mute">{line} · </span>
        <span className="label px-4 text-mute">{line} · </span>
      </div>
    </div>
  );
}
