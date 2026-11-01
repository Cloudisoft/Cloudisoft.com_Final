/**
 * Site-wide ambient motion: slow glowing orbs and small particles drifting upward.
 * Values are fixed (not random) so server and client render identically.
 */
const PARTICLES = Array.from({ length: 22 }, (_, i) => {
  const left = (i * 37 + 11) % 100;
  const size = 2 + (i % 4);
  const dur = 16 + ((i * 7) % 14);
  const delay = -((i * 5.3) % dur);
  const color = ["#ff9f1c", "#ffd93d", "#ff5a1f", "#f4efe6"][i % 4];
  const o = [0.55, 0.45, 0.4, 0.25][i % 4];
  const dx = ((i % 5) - 2) * 18;
  return { left, size, dur, delay, color, o, dx };
});

export default function Ambient() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-0 overflow-hidden">
      <div
        className="orb glow left-[8%] top-[30%] h-[340px] w-[340px] bg-ember/[0.07]"
        style={{ ["--dur" as any]: "26s", ["--ox" as any]: "120px", ["--oy" as any]: "-80px" }}
      />
      <div
        className="orb glow right-[6%] top-[60%] h-[300px] w-[300px] bg-amber/[0.07]"
        style={{ ["--dur" as any]: "32s", ["--ox" as any]: "-100px", ["--oy" as any]: "60px" }}
      />
      {PARTICLES.map((p, i) => (
        <span
          key={i}
          className="particle"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            background: p.color,
            boxShadow: `0 0 ${p.size * 4}px ${p.color}`,
            ["--dur" as any]: `${p.dur}s`,
            ["--delay" as any]: `${p.delay}s`,
            ["--o" as any]: p.o,
            ["--dx" as any]: `${p.dx}px`,
          }}
        />
      ))}
    </div>
  );
}
