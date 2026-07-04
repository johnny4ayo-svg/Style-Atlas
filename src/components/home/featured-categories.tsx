import Link from "next/link";
import { NeedsGrid } from "@/components/shared/needs-grid";

export function FeaturedCategories() {
  return (
    <section className="section-container py-16 sm:py-20">
      <div className="mb-10 flex items-end justify-between">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold-600">Explore</p>
          <h2 className="font-serif text-3xl font-semibold text-charcoal-900 sm:text-4xl">
            What Are You Looking For?
          </h2>
          <p className="mt-2 max-w-md text-charcoal-500">
            Start with what you need, then discover trusted fashion professionals who can help.
          </p>
        </div>
        <Link href="/directory" className="hidden text-sm font-medium text-gold-600 hover:underline sm:block">
          Explore all categories →
        </Link>
      </div>

      <NeedsGrid />
    </section>
  );
}
