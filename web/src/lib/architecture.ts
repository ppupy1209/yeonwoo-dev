export type TechLogo = "spring" | "mysql" | "redis" | "java";

export type ArchNode = {
  label: string;
  sub?: string;
  tech?: TechLogo;
  highlight?: boolean;
};

export type Architecture = {
  nodes: ArchNode[];
  caption?: string;
};

export const architectures: Record<string, Architecture> = {
  "realtime-sensor-pipeline": {
    nodes: [
      { label: "선박 센서", sub: "온·습도·화재·도어" },
      { label: "Worker Server", sub: "수신 → MQTT 변환", tech: "spring", highlight: true },
      { label: "MQTT Broker", sub: "경량 Pub/Sub" },
      { label: "외부 서버", sub: "실시간 수신" },
    ],
    caption:
      "전용 스레드풀 분리 · CorePoolSize 100→8 · Queue 1 · DiscardOldest → CPU 90%→60%",
  },
  "ship-ingest-engine": {
    nodes: [
      { label: "Ethernet Converter", sub: "Serial → TCP" },
      { label: "수집 엔진", sub: "Netty · 비동기 I/O", tech: "java", highlight: true },
      { label: "Batch Insert", sub: "주기·크기 기반" },
      { label: "MySQL", sub: "HDD 환경", tech: "mysql" },
    ],
    caption: "단건 Insert → Batch Insert로 랜덤 Write 감소 → DB I/O Wait 18%→3%",
  },
  "phase-auto-close": {
    nodes: [
      { label: "App 인스턴스 ×N", sub: "스케줄러 동일 주기", tech: "spring" },
      { label: "Redis", sub: "분산 락", tech: "redis", highlight: true },
      { label: "단일 인스턴스", sub: "국면 종료 실행" },
      { label: "WebSocket 알림", sub: "중복 없이 1회" },
    ],
    caption: "@ScheduleLock + AOP로 락 제어 공통화 → 중복 실행·중복 알림 차단",
  },
  "e-approval": {
    nodes: [
      { label: "모바일 앱", sub: "승인 · 반려" },
      { label: "결재 API", sub: "Spring", tech: "spring", highlight: true },
      { label: "조건부 UPDATE", sub: "affected rows 검증" },
      { label: "MySQL", sub: "결재 상태", tech: "mysql" },
    ],
    caption: "WHERE에 상태 조건을 결합한 원자적 UPDATE → Lost Update 원천 차단",
  },
};
