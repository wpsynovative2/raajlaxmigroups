import BrandMark from "./BrandMark";

/** Shown by loading.tsx while a route segment streams in. */
export default function RouteLoader({ tone = "light" }: { tone?: "light" | "olive" }) {
  const palette =
    tone === "olive" ? "bg-olive-50 text-olive-800" : "bg-cream-50 text-navy-900";
  return (
    <div
      role="status"
      aria-label="Loading page"
      className={`flex min-h-[70vh] flex-col items-center justify-center gap-4 ${palette}`}
    >
      <BrandMark animated className="h-12 w-8" />
      <p className="eyebrow opacity-70">Loading</p>
    </div>
  );
}
