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
  QueueIcon,
} from "./primitives";

const MYSQL = "/logos/mysql.svg";

export function ShipIngestArch() {
  return (
    <svg
      viewBox="0 0 912 250"
      className="h-auto w-full"
      role="img"
      aria-label="선박 운항 데이터 수집 엔진: 선박 센서, Ethernet Converter, Netty, Batch Insert, MySQL 흐름"
    >
      <ArrowDefs />

      <NodeBox x={10} y={28} w={140} h={50} label="선박 위치" icon={LocationIcon} centerContent />
      <NodeBox x={10} y={92} w={140} h={50} label="선박 방향" icon={CompassIcon} centerContent />
      <NodeBox x={10} y={156} w={140} h={50} label="화재 센서" icon={FireIcon} centerContent />

      <Line x1={150} y1={53} x2={162} y2={53} />
      <Line x1={150} y1={117} x2={162} y2={117} />
      <Line x1={150} y1={181} x2={162} y2={181} />
      <Line x1={162} y1={53} x2={162} y2={181} />
      <Arrow x1={162} y1={117} x2={184} y2={117} />

      <NodeBox x={186} y={90} w={180} h={58} label="Ethernet Converter" sub="Serial -> TCP" icon={NetworkIcon} centerContent />
      <Arrow x1={366} y1={119} x2={390} y2={119} />

      <GroupBox x={390} y={30} w={205} h={198} title="Netty" />
      <NodeBox x={408} y={76} w={170} h={44} label="TCP 프레임 디코딩" icon={NetworkIcon} centerContent />
      <NodeBox x={408} y={144} w={170} h={52} label="비동기 I/O 처리" sub="autoRead 제어" icon={QueueIcon} highlight centerContent />
      <Arrow x1={493} y1={120} x2={493} y2={143} />

      <Arrow x1={595} y1={180} x2={623} y2={180} />
      <NodeBox x={625} y={155} w={140} h={52} label="Batch Insert" sub="300건 / 1초" highlight icon={DatabaseIcon} centerContent />
      <Arrow x1={765} y1={181} x2={802} y2={181} />
      <NodeBox x={804} y={155} w={105} h={52} label="MySQL" logo={MYSQL} centerContent />
    </svg>
  );
}
