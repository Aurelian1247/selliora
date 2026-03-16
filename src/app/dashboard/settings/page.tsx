export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-[32px] border border-white/10 bg-white/5 p-6">
        <p className="text-sm uppercase tracking-[0.22em] text-violet-300/80">
          Settings
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">
          Account settings
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-white/65">
          Manage your profile, default language preferences, and future workspace settings.
        </p>
      </section>

      <div className="rounded-[30px] border border-white/10 bg-white/5 p-6">
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-xs uppercase tracking-[0.22em] text-white/40">
              Full name
            </label>
            <input
              className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="mb-2 block text-xs uppercase tracking-[0.22em] text-white/40">
              Email
            </label>
            <input
              className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none"
              placeholder="you@example.com"
            />
          </div>
        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-xs uppercase tracking-[0.22em] text-white/40">
              Default language
            </label>
            <input
              className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none"
              placeholder="English"
            />
          </div>

          <div>
            <label className="mb-2 block text-xs uppercase tracking-[0.22em] text-white/40">
              Brand tone
            </label>
            <input
              className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none"
              placeholder="Premium, clean, conversion-focused"
            />
          </div>
        </div>

        <button className="mt-6 rounded-2xl bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-white/90">
          Save changes
        </button>
      </div>
    </div>
  );
}