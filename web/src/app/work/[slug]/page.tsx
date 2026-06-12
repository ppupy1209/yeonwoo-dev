import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { formatMetric, getAllProjects, getProject } from "@/lib/projects";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";

export function generateStaticParams() {
  return getAllProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return { title: `${project.title} — 김연우`, description: project.summary };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const backHref = project.category === "study" ? "/#studies" : "/#work";
  const backLabel = project.category === "study" ? "Studies" : "Work";

  return (
    <article className="relative mx-auto max-w-3xl px-6 py-12">
      {/* 상단 블루 글로우 */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-20 left-1/2 -z-10 h-64 w-[40rem] max-w-[92vw] -translate-x-1/2 rounded-full opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, color-mix(in srgb, var(--accent) 20%, transparent), transparent)",
        }}
      />
      <Link
        href={backHref}
        className="inline-flex items-center gap-1 text-sm text-accent transition-opacity hover:opacity-70"
      >
        ← {backLabel}
      </Link>
      <div className="mt-4 flex items-start justify-between gap-4">
        <h1 className="text-3xl font-semibold tracking-tight">{project.title}</h1>
        <span className="shrink-0 rounded-md bg-accent-soft px-3 py-1 text-sm font-medium text-accent">
          {formatMetric(project.metric)}
        </span>
      </div>
      <p className="mt-3 text-muted">{project.summary}</p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.stack.map((item) => (
          <span
            key={item}
            className="rounded border border-border px-2 py-0.5 text-xs text-muted transition-colors hover:border-accent hover:text-accent"
          >
            {item}
          </span>
        ))}
      </div>
      <ArchitectureDiagram slug={project.slug} />
      <div className="prose-portfolio mt-10">
        <Markdown remarkPlugins={[remarkGfm]}>{project.body}</Markdown>
      </div>
    </article>
  );
}
