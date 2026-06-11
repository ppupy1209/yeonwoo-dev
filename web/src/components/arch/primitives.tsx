import type { ReactNode } from "react";

const MUTED = "var(--muted)";

export function ArrowDefs() {
  return (
    <defs>
      <marker
        id="arch-arrow"
        markerWidth="9"
        markerHeight="9"
        refX="6.5"
        refY="4"
        orient="auto"
      >
        <path
          d="M1 1 L6.5 4 L1 7"
          fill="none"
          style={{ stroke: MUTED }}
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </marker>
    </defs>
  );
}

export function Line({
  x1,
  y1,
  x2,
  y2,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}) {
  return (
    <line x1={x1} y1={y1} x2={x2} y2={y2} style={{ stroke: MUTED }} strokeWidth={1.2} />
  );
}

export function Arrow({
  x1,
  y1,
  x2,
  y2,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}) {
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      style={{ stroke: MUTED }}
      strokeWidth={1.3}
      markerEnd="url(#arch-arrow)"
    />
  );
}

export function ElbowArrow({ d }: { d: string }) {
  return (
    <path
      d={d}
      fill="none"
      style={{ stroke: MUTED }}
      strokeWidth={1.3}
      markerEnd="url(#arch-arrow)"
    />
  );
}

export function GroupBox({
  x,
  y,
  w,
  h,
  title,
  logo,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  title: string;
  logo?: string;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={10}
        style={{ fill: "transparent", stroke: "var(--border)" }}
        strokeWidth={1}
        strokeDasharray="5 4"
      />
      {logo && <image href={logo} x={x + 14} y={y + 11} width={20} height={20} />}
      <text
        x={logo ? x + 40 : x + 16}
        y={y + 26}
        style={{ fill: MUTED, fontSize: 12, fontWeight: 500 }}
      >
        {title}
      </text>
    </g>
  );
}

export function NodeBox({
  x,
  y,
  w,
  h,
  label,
  sub,
  highlight,
  logo,
  icon,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  sub?: string;
  highlight?: boolean;
  logo?: string;
  icon?: ReactNode;
}) {
  const hasLeft = Boolean(logo || icon);
  const textX = hasLeft ? x + 44 : x + w / 2;
  const anchor = hasLeft ? "start" : "middle";
  const cy = y + h / 2;
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={8}
        style={{
          fill: highlight ? "var(--accent-soft)" : "var(--surface)",
          stroke: highlight ? "var(--accent)" : "var(--border)",
        }}
        strokeWidth={highlight ? 1.5 : 1}
      />
      {logo && <image href={logo} x={x + 12} y={cy - 11} width={22} height={22} />}
      {icon && (
        <g transform={`translate(${x + 13}, ${cy - 11})`} style={{ color: MUTED }}>
          {icon}
        </g>
      )}
      <text
        x={textX}
        y={sub ? cy - 2 : cy + 4}
        textAnchor={anchor}
        style={{ fill: "var(--text)", fontSize: 13, fontWeight: 500 }}
      >
        {label}
      </text>
      {sub && (
        <text
          x={textX}
          y={cy + 14}
          textAnchor={anchor}
          style={{ fill: MUTED, fontSize: 10.5 }}
        >
          {sub}
        </text>
      )}
    </g>
  );
}

/* 간단한 인라인 아이콘 (stroke = currentColor, 부모 g의 color를 따름) */
export const SensorIcon = (
  <>
    <rect
      x="3"
      y="3"
      width="16"
      height="16"
      rx="3"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
    />
    <circle cx="11" cy="11" r="2.4" fill="currentColor" />
  </>
);

export const QueueIcon = (
  <>
    <rect x="3" y="4" width="16" height="4" rx="1.2" fill="none" stroke="currentColor" strokeWidth="1.4" />
    <rect x="3" y="10" width="16" height="4" rx="1.2" fill="none" stroke="currentColor" strokeWidth="1.4" />
    <rect x="3" y="16" width="16" height="3" rx="1" fill="none" stroke="currentColor" strokeWidth="1.4" />
  </>
);

export const GlobeIcon = (
  <>
    <circle cx="11" cy="11" r="8" fill="none" stroke="currentColor" strokeWidth="1.4" />
    <path
      d="M3 11 H19 M11 3 C7 6 7 16 11 19 M11 3 C15 6 15 16 11 19"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
    />
  </>
);
