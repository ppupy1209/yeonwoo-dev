import {
  ArrowDefs,
  Arrow,
  NodeBox,
  EdgeLabel,
  Caption,
  DatabaseIcon,
} from "./primitives";

const MYSQL = "/logos/mysql.svg";
const MUTED = "var(--muted)";

function Panel({ x, title }: { x: number; title: string }) {
  return (
    <>
      <text x={x + 10} y={28} style={{ fill: MUTED, fontSize: 12, fontWeight: 600 }}>
        {title}
      </text>
      <rect
        x={x}
        y={42}
        width={360}
        height={244}
        rx={10}
        style={{ fill: "transparent", stroke: "var(--border)" }}
        strokeWidth={1}
        strokeDasharray="5 4"
      />
    </>
  );
}

function ScanMeter({ x, y, w, label, accent }: { x: number; y: number; w: number; label: string; accent?: boolean }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={10} rx={5} style={{ fill: "var(--surface)", stroke: "var(--border)" }} />
      <rect
        x={x}
        y={y}
        width={accent ? w * 0.22 : w * 0.86}
        height={10}
        rx={5}
        style={{ fill: accent ? "var(--accent)" : MUTED }}
        opacity={accent ? 0.9 : 0.45}
      />
      <text x={x + w / 2} y={y + 28} textAnchor="middle" style={{ fill: MUTED, fontSize: 10.5 }}>
        {label}
      </text>
    </g>
  );
}

export function ListQueryOptArch() {
  return (
    <svg
      viewBox="0 0 760 310"
      className="h-auto w-full"
      role="img"
      aria-label="대용량 목록 조회 최적화: Before는 깊은 페이지 OFFSET 조회로 실제 테이블 접근이 크게 발생하고, After는 지연 조인과 커버링 인덱스로 ID를 먼저 조회한 뒤 필요한 row만 Article Table에 접근"
    >
      <ArrowDefs />

      <Panel x={10} title="Before - OFFSET 기반 깊은 페이지 조회" />
      <NodeBox x={42} y={72} w={132} h={52} label="목록 쿼리" sub="LIMIT/OFFSET" icon={DatabaseIcon} centerContent />
      <Arrow x1={174} y1={98} x2={196} y2={98} />
      <NodeBox x={198} y={72} w={150} h={52} label="Article Table" sub="전체 row 접근" logo={MYSQL} centerContent contentNudgeX={8.5} />

      <Arrow x1={273} y1={124} x2={273} y2={158} />
      <NodeBox x={192} y={160} w={162} h={52} label="OFFSET 스캔" sub="앞 구간 읽고 버림" highlight centerContent />
      <Arrow x1={273} y1={212} x2={273} y2={238} />
      <NodeBox x={192} y={240} w={162} h={38} label="실제 테이블 Access 증가" centerContent />
      <ScanMeter x={46} y={246} w={120} label="본문 row 접근 많음" />

      <Panel x={390} title="After - Deferred Join 적용" />
      <NodeBox x={418} y={72} w={132} h={52} label="목록 쿼리" sub="board_id 기준" icon={DatabaseIcon} centerContent />
      <Arrow x1={550} y1={98} x2={580} y2={98} />
      <NodeBox x={582} y={72} w={154} h={52} label="Covering Index" sub="ID 먼저 조회" logo={MYSQL} highlight centerContent contentNudgeX={2} />

      <Arrow x1={659} y1={124} x2={659} y2={158} />
      <NodeBox x={578} y={160} w={162} h={52} label="ID 목록 추출" sub="인덱스만 스캔" highlight centerContent />
      <Arrow x1={659} y1={212} x2={659} y2={238} />
      <NodeBox x={578} y={240} w={162} h={38} label="필요 row만 JOIN" logo={MYSQL} centerContent contentNudgeX={5} />
      <ScanMeter x={426} y={246} w={120} label="본문 row 접근 축소" accent />

      <EdgeLabel x={380} y={154}>전 / 후</EdgeLabel>
      <Caption x={380} y={304}>OFFSET 스캔은 유지, 본문 테이블 접근 범위 축소</Caption>
    </svg>
  );
}
