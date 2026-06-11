import { headlineMetrics } from "@/lib/profile";

export function MetricStrip() {
  return (
    <section className="mx-auto max-w-3xl px-6 pb-16">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {headlineMetrics.map((metric) => (
          <div key={metric.label} className="rounded-lg bg-surface p-4">
            <div className="text-xs text-muted">{metric.label}</div>
            <div className="mt-1 text-2xl font-semibold tabular-nums">
              {metric.value}
              <span className="text-sm font-normal text-muted">{metric.unit}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
