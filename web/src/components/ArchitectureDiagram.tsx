import { Fragment, type ComponentType } from "react";
import { architectures, type ArchNode, type TechLogo } from "@/lib/architecture";
import { RealtimeSensorArch } from "./arch/RealtimeSensorArch";
import { ShipIngestArch } from "./arch/ShipIngestArch";
import { PhaseAutoCloseArch } from "./arch/PhaseAutoCloseArch";
import { EApprovalArch } from "./arch/EApprovalArch";

const DIAGRAMS: Record<string, ComponentType> = {
  "realtime-sensor-pipeline": RealtimeSensorArch,
  "ship-ingest-engine": ShipIngestArch,
  "phase-auto-close": PhaseAutoCloseArch,
  "e-approval": EApprovalArch,
};

const LOGOS: Record<TechLogo, string> = {
  spring: "/logos/spring.svg",
  mysql: "/logos/mysql.svg",
  redis: "/logos/redis.svg",
  java: "/logos/java.svg",
};

function Node({ node }: { node: ArchNode }) {
  return (
    <div
      className={`flex min-w-[116px] flex-1 flex-col items-center justify-center gap-1.5 rounded-lg border px-3 py-3 text-center ${
        node.highlight ? "border-accent bg-accent-soft" : "border-border bg-surface"
      }`}
    >
      {node.tech && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={LOGOS[node.tech]} alt={node.tech} className="h-6 w-6" />
      )}
      <div className="text-sm font-medium leading-tight">{node.label}</div>
      {node.sub && <div className="text-[11px] leading-tight text-muted">{node.sub}</div>}
    </div>
  );
}

export function ArchitectureDiagram({ slug }: { slug: string }) {
  const arch = architectures[slug];
  if (!arch) return null;

  const Diagram = DIAGRAMS[slug];

  return (
    <section className="mt-10">
      <h2 className="text-[1.15rem] font-semibold">아키텍처</h2>
      {Diagram ? (
        <div className="mt-4 rounded-xl border border-border p-4">
          <Diagram />
        </div>
      ) : (
        <div className="mt-4 flex flex-wrap items-stretch gap-2">
          {arch.nodes.map((node, index) => (
            <Fragment key={node.label}>
              <Node node={node} />
              {index < arch.nodes.length - 1 && (
                <span className="shrink-0 self-center text-muted" aria-hidden="true">
                  →
                </span>
              )}
            </Fragment>
          ))}
        </div>
      )}
    </section>
  );
}
