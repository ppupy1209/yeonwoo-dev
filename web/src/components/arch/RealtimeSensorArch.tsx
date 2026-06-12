import {
  ArrowDefs,
  Arrow,
  Line,
  GroupBox,
  NodeBox,
  ThermometerIcon,
  FireIcon,
  DoorIcon,
  BroadcastIcon,
  GlobeIcon,
} from "./primitives";

const SPRING = "/logos/spring.svg";

export function RealtimeSensorArch() {
  return (
    <svg
      viewBox="0 0 780 268"
      className="h-auto w-full"
      role="img"
      aria-label="실시간 센서 데이터 전송: 3종 센서 → Worker Server(수신 핸들러·전용 스레드풀·MQTT Publisher) → MQTT Broker → 외부 서버"
    >
      <ArrowDefs />

      {/* 센서 3종 */}
      <NodeBox x={10} y={28}  w={155} h={50} label="온·습도 센서" icon={ThermometerIcon} />
      <NodeBox x={10} y={92}  w={155} h={50} label="화재 센서"   icon={FireIcon}        />
      <NodeBox x={10} y={156} w={155} h={50} label="도어 센서"   icon={DoorIcon}        />

      {/* 팬-인 버스 */}
      <Line  x1={165} y1={53}  x2={175} y2={53}  />
      <Line  x1={165} y1={117} x2={175} y2={117} />
      <Line  x1={165} y1={181} x2={175} y2={181} />
      <Line  x1={175} y1={53}  x2={175} y2={181} />
      <Arrow x1={175} y1={117} x2={225} y2={117} />

      {/* Worker Server 그룹 */}
      <GroupBox x={206} y={12} w={300} h={248} title="Worker Server" logo={SPRING} />
      <NodeBox x={228} y={96}  w={256} h={42} label="센서 수신 핸들러" />
      <NodeBox x={228} y={148} w={256} h={52} label="전용 스레드풀" sub="DiscardOldest 정책" highlight />
      <NodeBox x={228} y={210} w={256} h={42} label="MQTT Publisher" />
      <Arrow x1={356} y1={138} x2={356} y2={147} />
      <Arrow x1={356} y1={200} x2={356} y2={209} />

      {/* MQTT Publisher 출구 */}
      <Arrow x1={484} y1={231} x2={528} y2={231} />

      {/* MQTT Broker */}
      <NodeBox x={530} y={208} w={145} h={46} label="MQTT Broker" icon={BroadcastIcon} />
      <Arrow x1={675} y1={231} x2={697} y2={231} />

      {/* 외부 서버 (아이콘 없이 중앙 텍스트) */}
      <NodeBox x={699} y={208} w={73}  h={46} label="외부 서버" />
    </svg>
  );
}
