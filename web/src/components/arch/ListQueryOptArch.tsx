import {
  ArrowDefs,
  Arrow,
  NodeBox,
  EdgeLabel,
  Caption,
  ClientIcon,
  DatabaseIcon,
} from "./primitives";

const JAVA = "/logos/java.svg";
const MYSQL = "/logos/mysql.svg";
const REDIS = "/logos/redis.svg";

export function ListQueryOptArch() {
  return (
    <svg
      viewBox="0 30 780 230"
      className="h-auto w-full"
      role="img"
      aria-label="대용량 목록 조회 최적화: 클라이언트가 목록 API를 호출하면 최신 페이지는 Redis 캐시에서 응답하고 깊은 페이지는 MySQL 커버링 인덱스 쿼리로 조회"
    >
      <ArrowDefs />

      <NodeBox x={12} y={98} w={132} h={52} label="Client" sub="게시글 목록 요청" icon={ClientIcon} />
      <Arrow x1={144} y1={124} x2={178} y2={124} />

      <NodeBox x={180} y={98} w={145} h={52} label="목록 API" sub="page / size" logo={JAVA} highlight />
      <Arrow x1={325} y1={124} x2={365} y2={82} />
      <Arrow x1={325} y1={124} x2={365} y2={166} />

      <EdgeLabel x={380} y={54}>최신 페이지</EdgeLabel>
      <NodeBox x={368} y={52} w={150} h={52} label="Redis Cache" sub="최근 목록" logo={REDIS} />
      <Arrow x1={518} y1={78} x2={578} y2={78} />
      <NodeBox x={580} y={52} w={178} h={52} label="즉시 응답" sub="반복 조회 부하 감소" icon={DatabaseIcon} />

      <EdgeLabel x={382} y={200}>깊은 페이지</EdgeLabel>
      <NodeBox x={368} y={146} w={150} h={52} label="Covering Index" sub="ID 먼저 조회" logo={MYSQL} highlight />
      <Arrow x1={518} y1={172} x2={578} y2={172} />
      <NodeBox x={580} y={146} w={178} h={52} label="Article Table" sub="ID 기준 본문 JOIN" logo={MYSQL} />

      <Caption x={390} y={240}>1,400만 건 게시글 목록 조회 흐름</Caption>
    </svg>
  );
}
