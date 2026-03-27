export function ShopifySection() {
  return (
    <section className="relative py-24 px-6">
      <div className="mx-auto max-w-6xl">

        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-semibold text-white">
            Create & publish products to Shopify in seconds
          </h2>

          <p className="mt-4 text-white/60 max-w-2xl mx-auto text-lg">
            Generate SEO-optimized product content and push it directly into your Shopify store — no copy-paste, no manual work.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-center">

          {/* LEFT */}
          <div className="space-y-6">

            <div className="flex items-start gap-3">
              <div className="h-2 w-2 mt-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600" />
              <p className="text-white/80">One-click export to Shopify</p>
            </div>

            <div className="flex items-start gap-3">
              <div className="h-2 w-2 mt-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600" />
              <p className="text-white/80">Bulk product publishing</p>
            </div>

            <div className="flex items-start gap-3">
              <div className="h-2 w-2 mt-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600" />
              <p className="text-white/80">AI-generated SEO descriptions</p>
            </div>

            <div className="flex items-start gap-3">
              <div className="h-2 w-2 mt-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600" />
              <p className="text-white/80">Works with images & CSV uploads</p>
            </div>

          </div>

          {/* RIGHT */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">

            <div className="text-white/80 text-sm mb-4">
              Example flow
            </div>

            <div className="space-y-4">

              <div className="rounded-xl bg-black/30 border border-white/10 p-4">
                <p className="text-white text-sm">Upload product or image</p>
              </div>

              <div className="text-center text-white/30">↓</div>

              <div className="rounded-xl bg-black/30 border border-white/10 p-4">
                <p className="text-white text-sm">Generate with AI</p>
              </div>

              <div className="text-center text-white/30">↓</div>

              <div className="rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 p-4">
                <p className="text-white text-sm font-medium">
                  Export directly to Shopify 
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}