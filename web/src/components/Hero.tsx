import { profile, stackTags } from "@/lib/profile";

export function Hero() {
  return (
    <section className="relative mx-auto max-w-3xl px-6 pt-20 pb-12">
      {/* 상단 블루 글로우 */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-72 w-[44rem] max-w-[92vw] -translate-x-1/2 rounded-full opacity-70 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, color-mix(in srgb, var(--accent) 24%, transparent), transparent)",
        }}
      />
      <p className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.15em] text-accent">
        <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
        {profile.role} · {profile.years}
      </p>
      <h1 className="mt-4 text-5xl font-semibold tracking-tight sm:text-6xl">
        {profile.name}
      </h1>

      <div className="mt-12 flex items-center gap-2.5">
        <span className="h-5 w-1 rounded-full bg-accent" aria-hidden />
        <h2 className="text-xl font-semibold">Skills</h2>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {stackTags.map((tag) => (
          <span
            key={tag}
            className="rounded-md border border-border px-3 py-1 text-xs text-muted transition-colors hover:border-accent hover:text-accent"
          >
            {tag}
          </span>
        ))}
      </div>
    </section>
  );
}
