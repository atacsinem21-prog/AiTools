type NewsletterSignupProps = {
  locale: "tr" | "en";
};

export function NewsletterSignup({ locale }: NewsletterSignupProps) {
  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="text-2xl font-semibold text-slate-100">
        {locale === "tr" ? "Haftalık trend bülteni" : "Weekly trend newsletter"}
      </h2>
      <p className="mt-2 text-sm text-slate-300">
        {locale === "tr"
          ? "Yeni AI araçları ve compare güncellemelerini e-posta ile al."
          : "Get weekly updates for new tools and comparison pages."}
      </p>
      <form action="/api/subscribe" method="post" className="mt-4 flex flex-col gap-3 sm:flex-row">
        <input
          type="email"
          name="email"
          required
          placeholder="you@example.com"
          className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 placeholder:text-slate-500"
        />
        <input type="hidden" name="locale" value={locale} />
        <button className="rounded-lg bg-cyan-500 px-4 py-2 font-medium text-slate-950 hover:bg-cyan-400" type="submit">
          {locale === "tr" ? "Abone Ol" : "Subscribe"}
        </button>
      </form>
    </section>
  );
}
