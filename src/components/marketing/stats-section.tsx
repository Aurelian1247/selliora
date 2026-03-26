export function StatsSection() {
  return (
    <section className="pt-6 pb-14 bg-[#050816] text-white">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        
        <div>
          <h3 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            100,000+
          </h3>
          <p className="mt-2 text-gray-400">
            Descriptions generated
          </p>
        </div>

        <div>
          <h3 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            50,000+
          </h3>
          <p className="mt-2 text-gray-400">
            Products created
          </p>
        </div>

        <div>
          <h3 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Global
          </h3>
          <p className="mt-2 text-gray-400">
            Used by eCommerce sellers
          </p>
        </div>

      </div>
    </section>
  );
}