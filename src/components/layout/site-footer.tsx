import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-black/20">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 md:flex-row md:items-center md:justify-between md:px-6">
        <div>
          <h3 className="text-lg font-semibold text-white">Selliora AI</h3>
          <p className="mt-2 max-w-md text-sm text-white/55">
            AI SEO Product Pack for eCommerce teams that want faster, cleaner,
            and more scalable product content.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-5 text-sm text-white/60">
          <Link href="/features" className="transition hover:text-white">
            Features
          </Link>
          <Link href="/pricing" className="transition hover:text-white">
            Pricing
          </Link>
          <Link href="/login" className="transition hover:text-white">
            Log in
          </Link>
          <Link href="/signup" className="transition hover:text-white">
            Start free
          </Link>
        </div>
      </div>
    </footer>
  );
}