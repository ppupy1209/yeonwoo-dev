import {
  ArrowDefs,
  Arrow,
  Line,
  NodeBox,
  MobileIcon,
  DatabaseIcon,
  LockIcon,
} from "./primitives";

const JAVA = "/logos/java.svg";
const MYSQL = "/logos/mysql.svg";

export function EApprovalArch() {
  return (
    <svg
      viewBox="0 0 760 315"
      className="h-auto w-full"
      role="img"
      aria-label="전자 결재 시스템: Lost Update 발생 전 구조와 record lock으로 해결한 후 구조 비교"
    >
      <ArrowDefs />

      <text x={12} y={22} style={{ fill: "var(--muted)", fontSize: 12, fontWeight: 600 }}>
        Before - Lost Update 상황
      </text>
      <NodeBox x={10} y={42} w={132} h={48} label="모바일 A" sub="승인 요청" icon={MobileIcon} />
      <NodeBox x={10} y={116} w={132} h={48} label="모바일 B" sub="반려 요청" icon={MobileIcon} />
      <Line x1={142} y1={66} x2={158} y2={66} />
      <Line x1={142} y1={140} x2={158} y2={140} />
      <Line x1={158} y1={66} x2={158} y2={140} />
      <Arrow x1={158} y1={103} x2={186} y2={103} />
      <NodeBox x={188} y={78} w={130} h={50} label="결재 API" sub="Java" logo={JAVA} highlight />
      <Arrow x1={318} y1={103} x2={348} y2={103} />
      <NodeBox x={350} y={78} w={145} h={50} label="동시 UPDATE" sub="상태 덮어쓰기" icon={DatabaseIcon} />
      <Arrow x1={495} y1={103} x2={525} y2={103} />
      <NodeBox x={527} y={78} w={150} h={50} label="MySQL" sub="마지막 요청 반영" logo={MYSQL} />
      <text x={700} y={107} textAnchor="middle" style={{ fill: "var(--accent)", fontSize: 12, fontWeight: 600 }}>
        Lost Update
      </text>

      <line x1={10} y1={188} x2={750} y2={188} style={{ stroke: "var(--border)" }} strokeWidth={1} />

      <text x={12} y={220} style={{ fill: "var(--muted)", fontSize: 12, fontWeight: 600 }}>
        After - Update Record Lock 적용
      </text>
      <NodeBox x={10} y={240} w={132} h={48} label="모바일 요청" sub="승인 / 반려" icon={MobileIcon} />
      <Arrow x1={142} y1={264} x2={176} y2={264} />
      <NodeBox x={178} y={239} w={130} h={50} label="결재 API" sub="Java" logo={JAVA} highlight />
      <Arrow x1={308} y1={264} x2={338} y2={264} />
      <NodeBox x={340} y={239} w={165} h={50} label="Record Lock" sub="SELECT ... FOR UPDATE" icon={LockIcon} highlight />
      <Arrow x1={505} y1={264} x2={535} y2={264} />
      <NodeBox x={537} y={239} w={150} h={50} label="MySQL" sub="결재 row 잠금 후 갱신" logo={MYSQL} />
    </svg>
  );
}
