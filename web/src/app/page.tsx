import { Hero } from "@/components/Hero";
import { ProjectCard } from "@/components/ProjectCard";
import { AboutTerminal } from "@/components/AboutTerminal";
import { getAllProjects } from "@/lib/projects";

export default function Home() {
  const projects = getAllProjects();

  return (
    <>
      <Hero />
      <section id="work" className="mx-auto max-w-3xl px-6 pb-8">
        <h2 className="text-xl font-semibold">Selected work</h2>
        <p className="mt-1 text-sm text-muted">
          문제 → 해결 → 결과 구조로 정리한 {projects.length}개 프로젝트
        </p>
        <div className="mt-6 grid gap-4">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>
      <AboutTerminal />
    </>
  );
}
