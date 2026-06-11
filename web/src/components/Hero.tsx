import { profile, stackTags } from "@/lib/profile";

export function Hero() {
  return (
    <section className="mx-auto max-w-3xl px-6 pt-20 pb-10">
      <p className="text-xs uppercase tracking-[0.15em] text-muted">
        {profile.role} · {profile.years}
      </p>
      <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
        {profile.tagline}
      </h1>
      <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
        {profile.summary}
      </p>
      <div className="mt-7 flex flex-wrap gap-2">
        {stackTags.map((tag) => (
          <span
            key={tag}
            className="rounded-md border border-border px-3 py-1 text-xs text-muted"
          >
            {tag}
          </span>
        ))}
      </div>
    </section>
  );
}
