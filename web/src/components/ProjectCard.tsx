import Link from "next/link";
import type { Project } from "@/lib/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="group block rounded-xl border border-border p-5 transition-colors hover:border-accent hover:bg-surface"
    >
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-base font-medium transition-colors group-hover:text-accent">
          {project.title}
        </h3>
        <span className="shrink-0 rounded-md bg-accent-soft px-2.5 py-1 text-xs text-accent">
          {project.metric.label} {project.metric.before}→{project.metric.after}
        </span>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-muted">{project.summary}</p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {project.stack.map((item) => (
          <span
            key={item}
            className="rounded border border-border px-2 py-0.5 text-[11px] text-muted"
          >
            {item}
          </span>
        ))}
      </div>
    </Link>
  );
}
