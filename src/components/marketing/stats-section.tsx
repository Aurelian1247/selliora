export function StatsSection() {
  return (
    <section className="pt-10 pb-16 bg-[#050816] text-white">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 text-center">
        
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            100,000+
          </h3>
          <p className="mt-2 text-white/60 text-sm sm:text-base">
            Descriptions generated
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            50,000+
          </h3>
          <p className="mt-2 text-white/60 text-sm sm:text-base">
            Products created
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Global
          </h3>
          <p className="mt-2 text-white/60 text-sm sm:text-base">
            Used by eCommerce sellers
          </p>
        </div>

      </div>
    </section>
  );
}