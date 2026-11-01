type Props = { className?: string; size?: number };

export default function Logo({ className = "", size = 34 }: Props) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <img
        src="/brand/cloudisoft-mark-96.webp"
        srcSet="/brand/cloudisoft-mark-96.webp 96w, /brand/cloudisoft-mark-192.webp 192w"
        sizes={`${size}px`}
        alt=""
        width={size}
        height={Math.round(size * 0.8)}
        className="shrink-0"
        decoding="async"
      />
      <span className="font-display text-[15px] font-semibold uppercase tracking-[0.24em] text-bone">
        Cloudisoft
      </span>
    </span>
  );
}
