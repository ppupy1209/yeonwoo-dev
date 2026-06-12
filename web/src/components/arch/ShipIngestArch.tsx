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
      viewBox="0 0 830 250"
      className="h-auto w-full"
      role="img"
      aria-label="선박 운항 데이터 수집 엔진: 선박 센서, Ethernet Converter, Netty, Batch Insert, MySQL 흐름"
    >
      <ArrowDefs />

      <NodeBox x={10} y={28} w={140} h={50} label="선박 위치" sub="GPS 센서" icon={LocationIcon} />
      <NodeBox x={10} y={92} w={140} h={50} label="선박 방향" sub="나침반" icon={CompassIcon} />
      <NodeBox x={10} y={156} w={140} h={50} label="화재 센서" sub="온도 감지" icon={FireIcon} />

      <Line x1={150} y1={53} x2={162} y2={53} />
      <Line x1={150} y1={117} x2={162} y2={117} />
      <Line x1={150} y1={181} x2={162} y2={181} />
      <Line x1={162} y1={53} x2={162} y2={181} />
      <Arrow x1={162} y1={117} x2={184} y2={117} />

      <NodeBox x={186} y={90} w={160} h={58} label="Ethernet Converter" sub="Serial -> TCP" icon={NetworkIcon} />
      <Arrow x1={346} y1={119} x2={370} y2={119} />

      <GroupBox x={368} y={12} w={190} h={228} title="Netty" logo={JAVA} />
      <NodeBox x={386} y={88} w={154} h={44} label="TCP 프레임 디코딩" />
      <NodeBox x={386} y={154} w={154} h={52} label="비동기 I/O 처리" highlight />
      <Arrow x1={463} y1={132} x2={463} y2={153} />

      <Arrow x1={558} y1={180} x2={584} y2={180} />
      <NodeBox x={586} y={155} w={120} h={52} label="Batch Insert" highlight icon={DatabaseIcon} />
      <Arrow x1={706} y1={181} x2={724} y2={181} />
      <NodeBox x={726} y={155} w={95} h={52} label="MySQL" logo={MYSQL} />
    </svg>
  );
}
