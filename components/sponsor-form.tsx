export function SponsorForm() {
  return (
    <section id="sponsor-form" className="py-16 px-4">
      <div className="container max-w-3xl mx-auto">
        <div className="bg-card border border-border rounded-3xl p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Ready to sponsor?</h2>
          <p className="text-lg text-muted-foreground text-balance mb-8">
            To sponsor, or to talk through which level fits your organization, email us.
          </p>
          <a
            href="mailto:sponsors@southwestmnhacks.org"
            className="inline-flex items-center justify-center bg-gradient-to-r from-orange-500 to-pink-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg transition-all"
          >
            Email sponsors@southwestmnhacks.org
          </a>
        </div>
      </div>
    </section>
  )
}
