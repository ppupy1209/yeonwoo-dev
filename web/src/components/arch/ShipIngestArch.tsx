import {
  ArrowDefs,
  Arrow,
  Line,
  GroupBox,
  NodeBox,
  LocationIcon,
  CompassIcon,
  FireIcon,
  NetworkIcon,
  DatabaseIcon,
} from "./primitives";

const JAVA = "/logos/java.svg";
const MYSQL = "/logos/mysql.svg";

export function ShipIngestArch() {
  return (
    <svg
      viewBox="0 0 850 250"
      className="h-auto w-full"
      role="img"
      aria-label="선박 운항 데이터 수집 엔진: 3종 센서 → Ethernet Converter → Netty 수집 엔진(TCP 디코딩 + 비동기 I/O) → Batch Insert → MySQL"
    >
      <ArrowDefs />

      {/* 센서 3종 (fan-in) */}
      <NodeBox x={10} y={28}  w={140} h={50} label="선박 위치" sub="GPS 센서"  icon={LocationIcon} />
      <NodeBox x={10} y={92}  w={140} h={50} label="선박 방향" sub="나침반"     icon={CompassIcon}  />
      <NodeBox x={10} y={156} w={140} h={50} label="화재 센서" sub="온도 감지"  icon={FireIcon}     />

      {/* 팬-인 버스 */}
      <Line x1={150} y1={53}  x2={162} y2={53}  />
      <Line x1={150} y1={117} x2={162} y2={117} />
      <Line x1={150} y1={181} x2={162} y2={181} />
      <Line x1={162} y1={53}  x2={162} y2={181} />
      <Arrow x1={162} y1={117} x2={186} y2={117} />

      {/* Ethernet Converter */}
      <NodeBox x={188} y={93} w={148} h={50} label="Ethernet" sub="Converter" icon={NetworkIcon} />
      <Arrow x1={336} y1={118} x2={358} y2={118} />

      {/* Netty 수집 엔진 그룹 */}
      <GroupBox x={360} y={12} w={220} h={228} title="Netty 수집 엔진" logo={JAVA} />
      <NodeBox x={380} y={96}  w={180} h={44} label="TCP 프레임 디코딩" />
      <NodeBox x={380} y={154} w={180} h={52} label="비동기 I/O 처리" highlight />
      <Arrow x1={470} y1={140} x2={470} y2={153} />

      <Arrow x1={580} y1={180} x2={604} y2={180} />

      {/* Batch Insert */}
      <NodeBox x={606} y={155} w={130} h={52} label="Batch Insert" highlight icon={DatabaseIcon} />
      <Arrow x1={736} y1={181} x2={758} y2={181} />

      {/* MySQL */}
      <NodeBox x={760} y={155} w={82} h={52} label="MySQL" logo={MYSQL} />
    </svg>
  );
}
