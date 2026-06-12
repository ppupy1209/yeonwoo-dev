import {
  ArrowDefs,
  Arrow,
  ElbowArrow,
  NodeBox,
  EdgeLabel,
  Caption,
  ClientIcon,
  CircuitBreakerIcon,
} from "./primitives";

const REDIS = "/logos/redis.svg";
const MYSQL = "/logos/mysql.svg";

export function CircuitBreakerArch() {
  return (
    <svg
      viewBox="0 13 642 217"
      className="h-auto w-full"
      role="img"
      aria-label="Circuit Breaker 장애 전파 차단: 클라이언트 조회를 받은 조회 서비스가 Circuit이 Closed면 Redis 캐시로, Open이면 Redis를 건너뛰고 원본 RDB(MySQL)로 폴백"
    >
      <ArrowDefs />

      <NodeBox x={10} y={84} w={140} h={56} label="Client" sub="조회 요청" icon={ClientIcon} centerContent />
      <EdgeLabel x={169} y={106}>조회</EdgeLabel>
      <Arrow x1={152} y1={112} x2={186} y2={112} />

      <NodeBox x={188} y={70} w={180} h={84} label="조회 서비스" sub="Circuit + Bulkhead" icon={CircuitBreakerIcon} highlight centerContent />

      {/* Closed → Redis */}
      <ElbowArrow d="M368 96 L420 96 L420 50 L466 50" />
      <EdgeLabel x={432} y={40} accent>Closed · Hit</EdgeLabel>
      <NodeBox x={468} y={24} w={160} h={52} label="Redis" sub="Sorted Set" logo={REDIS} centerContent />

      {/* Open → RDB fallback */}
      <ElbowArrow d="M368 128 L420 128 L420 174 L466 174" />
      <EdgeLabel x={432} y={198} accent>Open · 폴백</EdgeLabel>
      <NodeBox x={468} y={148} w={160} h={52} label="원본 RDB" sub="MySQL 보호" logo={MYSQL} centerContent />

      <Caption x={250} y={216}>Circuit Open 시 Redis 생략, fallback 동시 실행 수 제한</Caption>
    </svg>
  );
}
