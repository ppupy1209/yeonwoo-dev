import type { ReactNode } from "react";

const MUTED = "var(--muted)";

export function ArrowDefs() {
  return (
    <defs>
      <marker id="arch-arrow" markerWidth="9" markerHeight="9" refX="6.5" refY="4" orient="auto">
        <path d="M1 1 L6.5 4 L1 7" fill="none" style={{ stroke: MUTED }}
          strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      </marker>
    </defs>
  );
}

export function Line({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) {
  return <line x1={x1} y1={y1} x2={x2} y2={y2} style={{ stroke: MUTED }} strokeWidth={1.2} />;
}

export function Arrow({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) {
  return (
    <line x1={x1} y1={y1} x2={x2} y2={y2}
      style={{ stroke: MUTED }} strokeWidth={1.3} markerEnd="url(#arch-arrow)" />
  );
}

export function ElbowArrow({ d }: { d: string }) {
  return <path d={d} fill="none" style={{ stroke: MUTED }} strokeWidth={1.3} markerEnd="url(#arch-arrow)" />;
}

export function EdgeLabel({ x, y, children, accent }: {
  x: number; y: number; children: string; accent?: boolean;
}) {
  return (
    <text x={x} y={y} textAnchor="middle"
      style={{ fill: accent ? "var(--accent)" : MUTED, fontSize: 10.5, fontWeight: 500 }}>
      {children}
    </text>
  );
}

export function Caption({ x, y, children }: { x: number; y: number; children: string }) {
  return (
    <text x={x} y={y} textAnchor="middle" style={{ fill: MUTED, fontSize: 11 }}>
      {children}
    </text>
  );
}

export function GroupBox({ x, y, w, h, title, logo }: {
  x: number; y: number; w: number; h: number; title: string; logo?: string;
}) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={10}
        style={{ fill: "transparent", stroke: "var(--border)" }}
        strokeWidth={1} strokeDasharray="5 4" />
      {logo && <image href={logo} x={x + 14} y={y + 11} width={20} height={20} />}
      <text x={logo ? x + 40 : x + 16} y={y + 26}
        style={{ fill: MUTED, fontSize: 12, fontWeight: 500 }}>{title}</text>
    </g>
  );
}

export function NodeBox({ x, y, w, h, label, sub, highlight, logo, icon }: {
  x: number; y: number; w: number; h: number;
  label: string; sub?: string; highlight?: boolean; logo?: string; icon?: ReactNode;
}) {
  const hasLeft = Boolean(logo || icon);
  const textX = hasLeft ? x + 44 : x + w / 2;
  const anchor = hasLeft ? "start" : "middle";
  const cy = y + h / 2;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={8}
        style={{
          fill: highlight ? "var(--accent-soft)" : "var(--surface)",
          stroke: highlight ? "var(--accent)" : "var(--border)",
        }}
        strokeWidth={highlight ? 1.5 : 1} />
      {logo && <image href={logo} x={x + 12} y={cy - 11} width={22} height={22} />}
      {icon && (
        <g transform={`translate(${x + 13}, ${cy - 11})`} style={{ color: MUTED }}>{icon}</g>
      )}
      <text x={textX} y={sub ? cy - 2 : cy + 4} textAnchor={anchor}
        style={{ fill: "var(--text)", fontSize: 13, fontWeight: 500 }}>{label}</text>
      {sub && (
        <text x={textX} y={cy + 14} textAnchor={anchor} style={{ fill: MUTED, fontSize: 11 }}>{sub}</text>
      )}
    </g>
  );
}

/* ── 아이콘 (22×22 좌표, stroke = currentColor) ── */

export const ThermometerIcon = (
  <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <rect x="8.5" y="3" width="5" height="12" rx="2.5" />
    <circle cx="11" cy="17.5" r="3" fill="currentColor" stroke="none" />
    <line x1="11" y1="15" x2="11" y2="9" />
  </g>
);

export const FireIcon = (
  <path
    d="M12 3C10 6 9 9 11 11C9 11 7.5 9 8 6.5C6 9 5 12 5 14A7 7 0 0 0 19 14C19 9 15 4 12 3Z"
    fill="currentColor" stroke="none"
  />
);

export const DoorIcon = (
  <g fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="4" y="2" width="14" height="19" rx="1.5" />
    <line x1="4" y1="2" x2="4" y2="21" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="15.5" cy="11.5" r="1.3" fill="currentColor" stroke="none" />
  </g>
);

export const LocationIcon = (
  <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <path d="M11 21S5 14 5 8.5a6 6 0 0 1 12 0C17 14 11 21 11 21z" />
    <circle cx="11" cy="8.5" r="2.2" fill="currentColor" stroke="none" />
  </g>
);

export const CompassIcon = (
  <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <circle cx="11" cy="11" r="8" />
    <polygon points="11,5 13,11 11,9 9,11" fill="currentColor" stroke="none" />
    <polygon points="11,17 9,11 11,13 13,11" fill={MUTED} stroke="none" />
  </g>
);

export const MobileIcon = (
  <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <rect x="6" y="2" width="10" height="18" rx="2" />
    <line x1="9" y1="5.5" x2="13" y2="5.5" />
    <circle cx="11" cy="17" r="1.2" fill="currentColor" stroke="none" />
  </g>
);

export const NetworkIcon = (
  <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="8" width="7" height="5" rx="1" />
    <rect x="14" y="8" width="7" height="5" rx="1" />
    <line x1="8" y1="10.5" x2="14" y2="10.5" />
    <line x1="11" y1="8" x2="11" y2="5" />
    <line x1="8" y1="5" x2="14" y2="5" />
  </g>
);

export const DatabaseIcon = (
  <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <ellipse cx="11" cy="5" rx="7" ry="2.5" />
    <path d="M4 5v4.5c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5V5" />
    <path d="M4 9.5v4.5c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5V9.5" />
  </g>
);

export const BroadcastIcon = (
  <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <circle cx="11" cy="11" r="2" fill="currentColor" stroke="none" />
    <path d="M7.5 7.5a5 5 0 0 0 0 7.1" />
    <path d="M14.5 7.5a5 5 0 0 1 0 7.1" />
    <path d="M4.9 4.9a9 9 0 0 0 0 12.7" />
    <path d="M17.1 4.9a9 9 0 0 1 0 12.7" />
  </g>
);

export const LockIcon = (
  <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <rect x="4" y="10" width="14" height="10" rx="2" />
    <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    <circle cx="12" cy="15" r="1.5" fill="currentColor" stroke="none" />
  </g>
);

export const ClientIcon = (
  <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="16" height="11" rx="1.5" />
    <line x1="8" y1="19" x2="14" y2="19" />
    <line x1="11" y1="15" x2="11" y2="19" />
  </g>
);

export const KafkaIcon = (
  <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <circle cx="6" cy="11" r="2" />
    <circle cx="15.5" cy="5" r="2" />
    <circle cx="15.5" cy="17" r="2" />
    <path d="M7.7 9.9 13.8 6.1" />
    <path d="M7.7 12.1 13.8 15.9" />
  </g>
);

export const CircuitBreakerIcon = (
  <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <circle cx="5" cy="16" r="1.6" fill="currentColor" stroke="none" />
    <circle cx="17" cy="16" r="1.6" fill="currentColor" stroke="none" />
    <line x1="13.5" y1="16" x2="17" y2="16" />
    <line x1="5" y1="16" x2="14" y2="7" />
  </g>
);

/* 하위 호환 */
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
    <path d="M3 11 H19 M11 3 C7 6 7 16 11 19 M11 3 C15 6 15 16 11 19"
      fill="none" stroke="currentColor" strokeWidth="1.4" />
  </>
);

export const SensorIcon = (
  <>
    <rect x="3" y="3" width="16" height="16" rx="3" fill="none" stroke="currentColor" strokeWidth="1.4" />
    <circle cx="11" cy="11" r="2.4" fill="currentColor" />
  </>
);
