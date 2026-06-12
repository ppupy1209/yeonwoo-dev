import {
  ArrowDefs,
  Arrow,
  NodeBox,
  EdgeLabel,
  KafkaIcon,
  DatabaseIcon,
} from "./primitives";

const SPRING = "/logos/spring.svg";
const REDIS = "/logos/redis.svg";

export function HotArticleKafkaArch() {
  return (
    <svg
      viewBox="0 50 896 130"
      className="h-auto w-full"
      role="img"
      aria-label="실시간 인기글 집계: 이벤트 서비스, Outbox Relay, Kafka, 인기글 Consumer, Redis 흐름"
    >
      <ArrowDefs />

      <NodeBox x={10} y={78} w={148} h={58} label="이벤트 서비스" sub="좋아요/댓글/조회" logo={SPRING} centerContent />
      <EdgeLabel x={175} y={70}>동일 트랜잭션</EdgeLabel>
      <Arrow x1={160} y1={107} x2={188} y2={107} />

      <NodeBox x={192} y={78} w={148} h={58} label="Outbox + Relay" sub="이벤트 발행" icon={DatabaseIcon} centerContent />
      <EdgeLabel x={357} y={70}>발행</EdgeLabel>
      <Arrow x1={342} y1={107} x2={370} y2={107} />

      <NodeBox x={374} y={78} w={148} h={58} label="Kafka" sub="이벤트 스트림" icon={KafkaIcon} highlight centerContent />
      <EdgeLabel x={540} y={70}>구독</EdgeLabel>
      <Arrow x1={524} y1={107} x2={552} y2={107} />

      <NodeBox x={556} y={78} w={148} h={58} label="인기글 Consumer" sub="Lua dedup" logo={SPRING} centerContent />
      <EdgeLabel x={721} y={70}>ZINCRBY</EdgeLabel>
      <Arrow x1={706} y1={107} x2={734} y2={107} />

      <NodeBox x={738} y={78} w={150} h={58} label="Redis" sub="ZSet + TTL" logo={REDIS} centerContent />
    </svg>
  );
}
