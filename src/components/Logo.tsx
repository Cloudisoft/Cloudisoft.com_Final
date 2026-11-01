type Props = { className?: string; size?: number };

export default function Logo({ className = "", size = 34 }: Props) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <img
        src="/brand/cloudisoft-mark.png"
        alt=""
        width={size}
        height={Math.round(size * 0.84)}
        className="shrink-0"
        decoding="async"
      />
      <span className="font-display text-[15px] font-semibold uppercase tracking-[0.24em] text-bone">
        Cloudisoft
      </span>
    </span>
  );
}
