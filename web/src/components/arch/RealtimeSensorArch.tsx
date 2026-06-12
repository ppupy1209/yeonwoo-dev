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
} from "./primitives";

const SPRING = "/logos/spring.svg";

export function RealtimeSensorArch() {
  return (
    <svg
      viewBox="0 0 700 268"
      className="h-auto w-full"
      role="img"
      aria-label="실시간 센서 데이터 전송: 3종 센서에서 Worker Server 수신 핸들러, 전용 스레드풀, MQTT Publisher를 거쳐 MQTT Broker와 관제 서버로 전달"
    >
      <ArrowDefs />

      <NodeBox x={10} y={28} w={155} h={50} label="온습도 센서" icon={ThermometerIcon} />
      <NodeBox x={10} y={92} w={155} h={50} label="화재 센서" icon={FireIcon} />
      <NodeBox x={10} y={156} w={155} h={50} label="도어 센서" icon={DoorIcon} />

      <Line x1={165} y1={53} x2={175} y2={53} />
      <Line x1={165} y1={117} x2={175} y2={117} />
      <Line x1={165} y1={181} x2={175} y2={181} />
      <Line x1={175} y1={53} x2={175} y2={181} />
      <Arrow x1={175} y1={117} x2={206} y2={117} />

      <GroupBox x={204} y={12} w={250} h={248} title="Worker Server" logo={SPRING} />
      <NodeBox x={224} y={78} w={210} h={42} label="센서 수신 핸들러" />
      <NodeBox x={224} y={138} w={210} h={48} label="전용 스레드풀" highlight />
      <NodeBox x={224} y={206} w={210} h={42} label="MQTT Publisher" />
      <Arrow x1={329} y1={120} x2={329} y2={137} />
      <Arrow x1={329} y1={186} x2={329} y2={205} />

      <Arrow x1={434} y1={227} x2={476} y2={227} />
      <NodeBox x={478} y={204} w={130} h={46} label="MQTT Broker" icon={BroadcastIcon} />
      <Arrow x1={608} y1={227} x2={632} y2={227} />
      <NodeBox x={634} y={204} w={58} h={46} label="관제" />
    </svg>
  );
}
