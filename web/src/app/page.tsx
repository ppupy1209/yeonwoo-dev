import { Hero } from "@/components/Hero";
import { ProjectCard } from "@/components/ProjectCard";
import { getAllProjects } from "@/lib/projects";

export default function Home() {
  const projects = getAllProjects();
  const work = projects.filter((p) => p.category === "work");
  const study = projects.filter((p) => p.category === "study");

  return (
    <>
      <Hero />

      <section id="work" className="mx-auto max-w-3xl px-6 pb-8">
        <div className="flex items-center gap-2.5">
          <span className="h-5 w-1 rounded-full bg-accent" aria-hidden />
          <h2 className="text-xl font-semibold">Selected work</h2>
        </div>
        <p className="mt-1.5 text-sm text-muted">
          문제 → 해결 → 결과 구조로 정리한 실무 프로젝트 {work.length}개
        </p>
        <div className="mt-6 grid gap-4">
          {work.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <section id="studies" className="mx-auto max-w-3xl px-6 pb-16 pt-8">
        <div className="flex items-center gap-2.5">
          <span className="h-5 w-1 rounded-full bg-accent" aria-hidden />
          <h2 className="text-xl font-semibold">Studies</h2>
        </div>
        <p className="mt-1.5 text-sm text-muted">
          대규모 트래픽·분산 환경을 직접 구현하며 검증한 학습 프로젝트 {study.length}개
        </p>
        <div className="mt-6 grid gap-4">
          {study.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>
    </>
  );
}
