import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { HeroSearch } from "@/components/home/hero-search";
import { NeedsGrid } from "@/components/shared/needs-grid";
import { FEATURED_CITIES } from "@/lib/constants";

export const metadata = buildMetadata({
  title: "Fashion Directory — Designers, Brands, Stylists & Schools | STYLEATLAS",
  description:
    "Search Nigeria's largest verified fashion directory: designers, brands, stylists, tailors, schools, makeup artists, and more — by city, category, and budget.",
  path: "/directory",
});

export default function DirectoryLandingPage() {
  return (
    <div>
      <section className="bg-charcoal-900 py-16 text-center">
        <div className="section-container">
          <h1 className="font-serif text-3xl font-semibold text-white sm:text-4xl">The STYLEATLAS Directory</h1>
          <p className="mx-auto mt-3 max-w-xl text-charcoal-300">
            Every verified fashion professional in Nigeria, searchable by category, city, and budget.
          </p>
          <div className="mt-8">
            <HeroSearch />
          </div>
        </div>
      </section>

      <section className="section-container py-14">
        <h2 className="font-serif text-2xl font-semibold text-charcoal-900">What Are You Looking For?</h2>
        <p className="mb-6 mt-2 max-w-xl text-charcoal-500">
          Start with what you need, then discover trusted fashion professionals who can help.
        </p>
        <NeedsGrid />
      </section>

      <section className="section-container pb-16">
        <h2 className="mb-6 font-serif text-2xl font-semibold text-charcoal-900">Browse by City</h2>
        <div className="flex flex-wrap gap-2.5">
          {FEATURED_CITIES.map((city) => (
            <Link
              key={city.slug}
              href={`/directory/fashion-designers/${city.slug}`}
              className="rounded-full border border-charcoal-200 px-4 py-2 text-sm font-medium text-charcoal-700 hover:border-gold-300 hover:text-gold-600"
            >
              {city.name}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
