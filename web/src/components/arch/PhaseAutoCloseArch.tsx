import { ArrowDefs, Arrow, Line, NodeBox, CheckFlowIcon } from "./primitives";

const SPRING = "/logos/spring.svg";
const REDIS = "/logos/redis.svg";

export function PhaseAutoCloseArch() {
  return (
    <svg
      viewBox="0 0 720 210"
      className="h-auto w-full"
      role="img"
      aria-label="국면 전환 자동 종료: 여러 인스턴스가 Redis 분산락을 획득한 단일 실행 인스턴스를 통해 종료 로직을 수행"
    >
      <ArrowDefs />

      <NodeBox x={10} y={14} w={155} h={52} label="인스턴스 A" sub="스케줄러 실행 중" logo={SPRING} centerContent contentNudgeX={9} />
      <NodeBox x={10} y={78} w={155} h={52} label="인스턴스 B" sub="스케줄러 실행 중" logo={SPRING} centerContent contentNudgeX={9} />
      <NodeBox x={10} y={142} w={155} h={52} label="인스턴스 C" sub="스케줄러 실행 중" logo={SPRING} centerContent contentNudgeX={9} />

      <Line x1={165} y1={40} x2={175} y2={40} />
      <Line x1={165} y1={104} x2={175} y2={104} />
      <Line x1={165} y1={168} x2={175} y2={168} />
      <Line x1={175} y1={40} x2={175} y2={168} />
      <Arrow x1={175} y1={104} x2={197} y2={104} />

      <NodeBox x={199} y={78} w={155} h={52} label="Redis 분산락" logo={REDIS} highlight centerContent contentNudgeX={5.5} />
      <Arrow x1={354} y1={104} x2={376} y2={104} />

      <NodeBox x={378} y={78} w={155} h={52} label="단일 실행" sub="락 획득 인스턴스" logo={SPRING} highlight centerContent contentNudgeX={9} />
      <Arrow x1={533} y1={104} x2={557} y2={104} />

      <NodeBox x={559} y={78} w={153} h={52} label="조건부 종료 UPDATE" sub="멱등 처리" icon={CheckFlowIcon} centerContent contentNudgeX={4.5} />
    </svg>
  );
}
