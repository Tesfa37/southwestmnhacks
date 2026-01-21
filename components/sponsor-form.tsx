export function SponsorForm() {
  return (
    <section id="sponsor-form" className="py-16 px-4 bg-muted/30">
      <div className="container max-w-3xl mx-auto">
        <div className="bg-card border border-border rounded-3xl p-8 md:p-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Ready to Sponsor?</h2>
            <p className="text-lg text-muted-foreground text-balance">Fill out the form below or reach out directly</p>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl overflow-hidden">
              <iframe
                src="https://docs.google.com/forms/d/e/1FAIpQLScpiEIxwC0Y2NjZbl23eLVdvtgWELmJcpBp_DXaJ71jxK_0sg/viewform?embedded=true"
                width="100%"
                height="800"
                frameBorder="0"
                marginHeight={0}
                marginWidth={0}
              >
                Loading…
              </iframe>
            </div>

            <div className="text-center pt-4">
              <p className="text-sm text-muted-foreground mb-2">Or email us directly:</p>
              <a href="mailto:sponsors@southwestmnhacks.org" className="text-orange-600 font-medium hover:underline">
                sponsors@southwestmnhacks.org
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
