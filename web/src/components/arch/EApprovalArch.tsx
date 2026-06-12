import {
  ArrowDefs,
  Arrow,
  Line,
  NodeBox,
  MobileIcon,
  DatabaseIcon,
} from "./primitives";

const SPRING = "/logos/spring.svg";
const MYSQL  = "/logos/mysql.svg";

export function EApprovalArch() {
  return (
    <svg
      viewBox="0 0 720 185"
      className="h-auto w-full"
      role="img"
      aria-label="전자 결재: 동시 결재 요청(승인/반려) → 결재 API → 조건부 UPDATE → MySQL"
    >
      <ArrowDefs />

      {/* 2개 모바일 (동시 요청, 팬-인) */}
      <NodeBox x={10} y={22}  w={148} h={50} label="모바일 앱" sub="승인 요청"           icon={MobileIcon} />
      <NodeBox x={10} y={114} w={148} h={50} label="모바일 앱" sub="반려 요청 (동시)"    icon={MobileIcon} />

      {/* 팬-인 버스 */}
      <Line x1={158} y1={47}  x2={168} y2={47}  />
      <Line x1={158} y1={139} x2={168} y2={139} />
      <Line x1={168} y1={47}  x2={168} y2={139} />
      <Arrow x1={168} y1={93} x2={190} y2={93} />

      {/* 결재 API */}
      <NodeBox x={192} y={68} w={155} h={50} label="결재 API" sub="Spring Boot" logo={SPRING} highlight />
      <Arrow x1={347} y1={93} x2={371} y2={93} />

      {/* 조건부 UPDATE */}
      <NodeBox x={373} y={68} w={168} h={50} label="조건부 UPDATE" sub="WHERE 상태 조건" icon={DatabaseIcon} highlight />
      <Arrow x1={541} y1={93} x2={563} y2={93} />

      {/* MySQL */}
      <NodeBox x={565} y={68} w={143} h={50} label="MySQL" sub="결재 상태" logo={MYSQL} />
    </svg>
  );
}
