import {
  ArrowDefs,
  Arrow,
  ElbowArrow,
  Line,
  GroupBox,
  NodeBox,
  SensorIcon,
  QueueIcon,
  GlobeIcon,
} from "./primitives";

const SPRING = "/logos/spring.svg";

export function RealtimeSensorArch() {
  return (
    <svg
      viewBox="0 0 940 288"
      className="h-auto w-full"
      style={{ minWidth: 760 }}
      role="img"
      aria-label="실시간 센서 데이터 전송 시스템 아키텍처: 센서 → Worker Server(스레드풀 튜닝) → MQTT Broker → 외부 서버"
    >
      <ArrowDefs />

      {/* 센서 3종 */}
      <NodeBox x={16} y={28} w={158} h={46} label="온·습도 센서" icon={SensorIcon} />
      <NodeBox x={16} y={104} w={158} h={46} label="화재 센서" icon={SensorIcon} />
      <NodeBox x={16} y={180} w={158} h={46} label="도어 센서" icon={SensorIcon} />

      {/* 병합 버스 → Worker Server */}
      <Line x1={174} y1={51} x2={210} y2={51} />
      <Line x1={174} y1={127} x2={210} y2={127} />
      <Line x1={174} y1={203} x2={210} y2={203} />
      <Line x1={210} y1={51} x2={210} y2={203} />
      <Arrow x1={210} y1={143} x2={250} y2={143} />

      {/* Worker Server 그룹 (내부 컴포넌트) */}
      <GroupBox x={252} y={18} w={330} h={250} title="Worker Server" logo={SPRING} />
      <NodeBox x={286} y={60} w={262} h={42} label="센서 수신 핸들러" />
      <NodeBox
        x={286}
        y={120}
        w={262}
        h={58}
        label="전용 스레드풀"
        sub="Core 8 · Queue 1 · DiscardOldest"
        highlight
      />
      <NodeBox x={286} y={196} w={262} h={44} label="MQTT Publisher" />
      <Arrow x1={417} y1={102} x2={417} y2={118} />
      <Arrow x1={417} y1={178} x2={417} y2={194} />

      {/* → MQTT Broker → 외부 서버 */}
      <Arrow x1={548} y1={218} x2={624} y2={218} />
      <NodeBox
        x={626}
        y={190}
        w={140}
        h={56}
        label="MQTT Broker"
        sub="경량 Pub/Sub"
        icon={QueueIcon}
      />
      <Arrow x1={766} y1={218} x2={800} y2={218} />
      <NodeBox
        x={802}
        y={190}
        w={130}
        h={56}
        label="외부 서버"
        sub="실시간 수신"
        icon={GlobeIcon}
      />
    </svg>
  );
}
