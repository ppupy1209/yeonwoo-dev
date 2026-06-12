import {
  ArrowDefs,
  Arrow,
  Line,
  NodeBox,
  BroadcastIcon,
} from "./primitives";

const SPRING = "/logos/spring.svg";
const REDIS  = "/logos/redis.svg";

export function PhaseAutoCloseArch() {
  return (
    <svg
      viewBox="0 0 720 210"
      className="h-auto w-full"
      role="img"
      aria-label="국면전환 자동종료: 복수 Spring 인스턴스 → Redis 분산 락 경쟁 → 단일 인스턴스 실행 → WebSocket 알림"
    >
      <ArrowDefs />

      {/* 3개 인스턴스 (팬-인) */}
      <NodeBox x={10} y={14}  w={155} h={52} label="인스턴스 ①" sub="스케줄러 실행 중" logo={SPRING} />
      <NodeBox x={10} y={78}  w={155} h={52} label="인스턴스 ②" sub="스케줄러 실행 중" logo={SPRING} />
      <NodeBox x={10} y={142} w={155} h={52} label="인스턴스 ③" sub="스케줄러 실행 중" logo={SPRING} />

      {/* 버스 → Redis */}
      <Line x1={165} y1={40}  x2={175} y2={40}  />
      <Line x1={165} y1={104} x2={175} y2={104} />
      <Line x1={165} y1={168} x2={175} y2={168} />
      <Line x1={175} y1={40}  x2={175} y2={168} />
      <Arrow x1={175} y1={104} x2={197} y2={104} />

      {/* Redis 분산 락 */}
      <NodeBox x={199} y={78} w={155} h={52} label="Redis 분산 락" sub="AOP @ScheduleLock" logo={REDIS} highlight />
      <Arrow x1={354} y1={104} x2={376} y2={104} />

      {/* 단일 인스턴스 실행 */}
      <NodeBox x={378} y={78} w={155} h={52} label="단일 실행" sub="락 획득 인스턴스" logo={SPRING} highlight />
      <Arrow x1={533} y1={104} x2={557} y2={104} />

      {/* WebSocket 알림 */}
      <NodeBox x={559} y={78} w={153} h={52} label="WebSocket" sub="클라이언트 알림" icon={BroadcastIcon} />
    </svg>
  );
}
