export function AboutTerminal() {
  return (
    <section id="about" className="mx-auto max-w-3xl px-6 py-16">
      <div className="rounded-xl bg-[#16181d] p-5 font-mono text-sm leading-7">
        <div className="text-[#5dcaa5]">$ cat about.md</div>
        <p className="mt-1 text-zinc-200">
          티켓을 쳐내는 사람이 아니라, 프로젝트가 끝까지 안정적으로 굴러가도록
          책임지는 백엔드 개발자입니다.
        </p>
        <p className="mt-2 text-zinc-500">
          // 문제의 원인을 기술로 분석하되, 사용자·운영 흐름까지 함께 봅니다.
        </p>
      </div>
    </section>
  );
}
