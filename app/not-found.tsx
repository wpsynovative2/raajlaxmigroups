import Link from "next/link";
import BrandMark from "@/components/loading/BrandMark";

export default function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center bg-navy-950 px-4 text-center text-white">
      <BrandMark className="h-14 w-9" />
      <p className="mt-8 font-display text-7xl text-gold-400">404</p>
      <h1 className="mt-4 font-display text-3xl">This page isn’t built yet</h1>
      <p className="mt-3 max-w-md text-white/70">
        The page you’re looking for may have moved. Let’s get you back to solid ground.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn-gold">
          Go to home
        </Link>
        <Link href="/on-going-projects/" className="btn-outline-light">
          View projects
        </Link>
      </div>
    </main>
  );
}
