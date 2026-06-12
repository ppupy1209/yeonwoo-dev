import { ArrowDefs, LockIcon } from "./primitives";

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
        height={438}
        rx={10}
        style={{ fill: "transparent", stroke: "var(--border)" }}
        strokeWidth={1}
        strokeDasharray="5 4"
      />
    </>
  );
}

function PersonIcon({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x - 13} ${y})`} style={{ color: "var(--text)" }}>
      <circle cx={13} cy={7} r={6} fill="currentColor" />
      <path d="M3 25c1.2-7 5-10 10-10s8.8 3 10 10" fill="currentColor" />
    </g>
  );
}

function Lifeline({ x, y, label, logo, person }: { x: number; y: number; label: string; logo?: string; person?: boolean }) {
  return (
    <g>
      {person ? <PersonIcon x={x} y={y} /> : <image href={logo} x={x - 13} y={y} width={26} height={26} />}
      <text x={x} y={y + 44} textAnchor="middle" style={{ fill: "var(--text)", fontSize: 12, fontWeight: 600 }}>
        {label}
      </text>
      <line x1={x} y1={y + 58} x2={x} y2={452} style={{ stroke: "var(--border)" }} strokeWidth={1.2} />
    </g>
  );
}

function Message({ x1, x2, y, label, accent }: {
  x1: number; x2: number; y: number; label: string; accent?: boolean;
}) {
  return (
    <g>
      <line
        x1={x1}
        y1={y}
        x2={x2}
        y2={y}
        style={{ stroke: accent ? "var(--accent)" : MUTED }}
        strokeWidth={1.35}
        markerEnd="url(#arch-arrow)"
      />
      <text
        x={(x1 + x2) / 2}
        y={y - 7}
        textAnchor="middle"
        style={{ fill: accent ? "var(--accent)" : "var(--text)", fontSize: 10.5, fontWeight: 600 }}
      >
        {label}
      </text>
    </g>
  );
}

function LocalStep({ x, y, label }: { x: number; y: number; label: string }) {
  return (
    <g>
      <rect
        x={x - 50}
        y={y - 16}
        width={100}
        height={30}
        rx={8}
        style={{ fill: "var(--surface)", stroke: "var(--border)" }}
        strokeWidth={1}
      />
      <text x={x} y={y + 4} textAnchor="middle" style={{ fill: "var(--text)", fontSize: 10.5, fontWeight: 600 }}>
        {label}
      </text>
    </g>
  );
}

function ResultNote({ x, y, label, sub, accent }: { x: number; y: number; label: string; sub: string; accent?: boolean }) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={180}
        height={44}
        rx={8}
        style={{
          fill: accent ? "var(--accent-soft)" : "var(--surface)",
          stroke: accent ? "var(--accent)" : "var(--border)",
        }}
        strokeWidth={accent ? 1.5 : 1}
      />
      <text x={x + 90} y={y + 18} textAnchor="middle" style={{ fill: "var(--text)", fontSize: 12, fontWeight: 600 }}>
        {label}
      </text>
      <text x={x + 90} y={y + 33} textAnchor="middle" style={{ fill: MUTED, fontSize: 10.5 }}>
        {sub}
      </text>
    </g>
  );
}

export function EApprovalArch() {
  return (
    <svg
      viewBox="0 0 760 500"
      className="h-auto w-full"
      role="img"
      aria-label="전자 결재 시스템: Before는 SELECT와 UPDATE 순서의 Lost Update 발생 흐름, After는 조건부 UPDATE와 MySQL record lock 기반 해결 흐름"
    >
      <ArrowDefs />

      <Panel x={10} title="Before - Lost Update 상황" />
      <Lifeline x={72} y={62} label="Approver A" person />
      <Lifeline x={190} y={62} label="MySQL" logo={MYSQL} />
      <Lifeline x={308} y={62} label="Approver B" person />

      <Message x1={72} x2={190} y={142} label="SELECT 상태 조회" />
      <Message x1={190} x2={72} y={184} label="status: 대기" />
      <Message x1={308} x2={190} y={226} label="SELECT 상태 조회" />
      <Message x1={190} x2={308} y={268} label="status: 대기" />
      <Message x1={72} x2={190} y={328} label="UPDATE 승인" />
      <Message x1={308} x2={190} y={400} label="UPDATE 반려" accent />
      <ResultNote x={100} y={430} label="Lost Update" sub="마지막 요청이 덮어씀" accent />

      <Panel x={390} title="After - 조건부 UPDATE 적용" />
      <Lifeline x={452} y={62} label="Approver A" person />
      <Lifeline x={570} y={62} label="MySQL" logo={MYSQL} />
      <Lifeline x={688} y={62} label="Approver B" person />

      <Message x1={452} x2={570} y={142} label="UPDATE WHERE 상태=대기" />
      <g transform="translate(558 164)" style={{ color: MUTED }}>
        {LockIcon}
      </g>
      <text x={570} y={204} textAnchor="middle" style={{ fill: MUTED, fontSize: 10.5, fontWeight: 600 }}>
        Record Lock
      </text>
      <Message x1={570} x2={452} y={232} label="affected rows: 1" />
      <Message x1={688} x2={570} y={284} label="UPDATE WHERE 상태=대기" />
      <Message x1={570} x2={688} y={336} label="affected rows: 0" accent />
      <LocalStep x={688} y={382} label="충돌 예외 처리" />
      <ResultNote x={480} y={430} label="중복 처리 차단" sub="Lost Update 방지" accent />
    </svg>
  );
}
