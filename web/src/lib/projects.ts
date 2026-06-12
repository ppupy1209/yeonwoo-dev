import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type ProjectMetric = { label: string; before?: string; after?: string };

export type ProjectCategory = "work" | "study";

export type Project = {
  title: string;
  slug: string;
  order: number;
  category: ProjectCategory;
  summary: string;
  role: string;
  stack: string[];
  metric: ProjectMetric;
  body: string;
};

const PROJECTS_DIR = path.join(process.cwd(), "content", "projects");

export function getAllProjects(): Project[] {
  const files = fs.readdirSync(PROJECTS_DIR).filter((f) => f.endsWith(".mdx"));
  const projects = files.map((file) => {
    const raw = fs.readFileSync(path.join(PROJECTS_DIR, file), "utf8");
    const { data, content } = matter(raw);
    return {
      title: data.title as string,
      slug: data.slug as string,
      order: (data.order as number) ?? 999,
      category: (data.category as ProjectCategory) ?? "work",
      summary: data.summary as string,
      role: (data.role as string) ?? "",
      stack: (data.stack as string[]) ?? [],
      metric: data.metric as ProjectMetric,
      body: content,
    } satisfies Project;
  });
  return projects.sort((a, b) => a.order - b.order);
}

export function getProject(slug: string): Project | undefined {
  return getAllProjects().find((p) => p.slug === slug);
}

export function formatMetric(metric: ProjectMetric): string {
  if (metric.before && metric.after) {
    return `${metric.label} ${metric.before}→${metric.after}`;
  }
  if (metric.before || metric.after) {
    return `${metric.label} ${metric.before ?? metric.after}`;
  }
  return metric.label;
}
