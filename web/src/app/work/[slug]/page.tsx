import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getAllProjects, getProject } from "@/lib/projects";
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

  return (
    <article className="mx-auto max-w-3xl px-6 py-12">
      <Link href="/#work" className="text-sm text-muted transition-colors hover:text-text">
        ← Work
      </Link>
      <div className="mt-4 flex items-start justify-between gap-4">
        <h1 className="text-3xl font-semibold tracking-tight">{project.title}</h1>
        <span className="shrink-0 rounded-md bg-accent-soft px-3 py-1 text-sm text-accent">
          {project.metric.label} {project.metric.before}→{project.metric.after}
        </span>
      </div>
      <p className="mt-3 text-muted">{project.summary}</p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.stack.map((item) => (
          <span
            key={item}
            className="rounded border border-border px-2 py-0.5 text-xs text-muted"
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
