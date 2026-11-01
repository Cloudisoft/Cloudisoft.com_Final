import { useCallback, useEffect, useRef, useState } from "react";
import samples from "../data/voiceSamples.json";
import { Check, Pause, Play, ArrowUpRight } from "./Icons";
import { LINKS } from "../lib/site";

type Segment = { speaker: "agent" | "caller"; name: string; text: string; startMs: number; endMs: number };
type Sample = {
  id: string;
  label: string;
  blurb: string;
  business: string;
  agentName: string;
  callerName: string;
  src: string;
  durationMs: number;
  segments: Segment[];
  events: { atMs: number; label: string }[];
  peaks: { agent: number[]; caller: number[] };
};

const SAMPLES = samples as Sample[];

const fmt = (ms: number) => {
  const s = Math.max(0, Math.floor(ms / 1000));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
};

export default function VoiceDemo() {
  const [idx, setIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  const [t, setT] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const [error, setError] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);
  const rafRef = useRef(0);
  const listRef = useRef<HTMLOListElement>(null);

  const s = SAMPLES[idx];
  const dur = s.durationMs;

  const tick = useCallback(() => {
    const a = audioRef.current;
    if (a) setT(a.currentTime * 1000);
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    if (playing) rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [playing, tick]);

  // Let other parts of the page ("Hear a sample call" in the hero) start the demo.
  useEffect(() => {
    const start = () => {
      const a = audioRef.current;
      if (a && a.paused) toggle();
    };
    window.addEventListener("cloudi:play-demo", start);
    return () => window.removeEventListener("cloudi:play-demo", start);
  });

  const select = (i: number) => {
    if (i === idx) return;
    audioRef.current?.pause();
    setPlaying(false);
    setStarted(false);
    setT(0);
    setError(false);
    setIdx(i);
  };

  const toggle = async () => {
    const a = audioRef.current;
    if (!a) return;
    if (!a.paused) {
      a.pause();
      return;
    }
    if (a.ended || a.currentTime * 1000 >= dur - 50) a.currentTime = 0;
    try {
      setStarted(true);
      await a.play();
      setError(false);
    } catch {
      setError(true);
    }
  };

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const a = audioRef.current;
    if (!a) return;
    const r = e.currentTarget.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
    a.currentTime = (ratio * dur) / 1000;
    setT(ratio * dur);
    setStarted(true);
  };

  const onSeekKey = (e: React.KeyboardEvent) => {
    const a = audioRef.current;
    if (!a) return;
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      const next = Math.min(dur, Math.max(0, t + (e.key === "ArrowRight" ? 5000 : -5000)));
      a.currentTime = next / 1000;
      setT(next);
      setStarted(true);
    }
  };

  const visible = showAll ? s.segments : started ? s.segments.filter((g) => g.startMs <= t) : [];
  const activeIdx = s.segments.findIndex((g) => t >= g.startMs && t < g.endMs);

  useEffect(() => {
    const el = listRef.current;
    if (el && !showAll) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [visible.length, showAll]);

  const progress = Math.min(1, t / dur);
  const bars = s.peaks.agent.length;
  const W = bars * 4;

  return (
    <div
      className={`relative overflow-hidden rounded-[22px] border hairline bg-ink-800/80 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)] backdrop-blur ${
        playing ? "is-playing" : ""
      }`}
      role="region"
      aria-label="CloudiVoice sample call"
    >
      {/* header */}
      <div className="flex items-center justify-between border-b hairline px-5 py-3.5">
        <div className="flex items-center gap-2.5">
          <span className={`h-2 w-2 rounded-full ${playing ? "bg-ember shadow-[0_0_10px_#ff5a1f]" : "bg-mute/50"}`} />
          <span className="font-mono text-[11.5px] text-mute">cloudivoice / call-scope</span>
        </div>
        <span className="font-mono text-[11px] text-mute/70">{playing ? "on call" : "sample · EN"}</span>
      </div>

      {/* scenario tabs */}
      <div role="tablist" aria-label="Choose a sample call" className="flex gap-1 overflow-x-auto border-b hairline px-3 py-2.5">
        {SAMPLES.map((x, i) => (
          <button
            key={x.id}
            role="tab"
            aria-selected={i === idx}
            onClick={() => select(i)}
            className={`whitespace-nowrap rounded-full px-3.5 py-1.5 text-[12.5px] transition ${
              i === idx ? "bg-bone text-ink" : "text-mute hover:bg-white/5 hover:text-bone"
            }`}
          >
            {x.label}
          </button>
        ))}
      </div>

      {/* agent + player */}
      <div className="px-5 pb-4 pt-5">
        <div className="flex items-start gap-4">
          <button
            type="button"
            onClick={toggle}
            aria-label={playing ? "Pause sample call" : `Play sample call: ${s.label}`}
            className="play-btn grid h-14 w-14 shrink-0 place-items-center rounded-full text-ink transition hover:scale-105"
            style={{ background: "var(--brand-grad)" }}
          >
            {playing ? <Pause /> : <Play className="ml-0.5 h-5 w-5" />}
          </button>
          <div className="min-w-0">
            <p className="font-display text-lg leading-tight">
              {s.agentName} <span className="text-mute">· {s.business}</span>
            </p>
            <p className="mt-1 text-[13px] text-mute">{s.blurb}</p>
          </div>
        </div>

        {/* waveform */}
        <div
          className="group relative mt-5 cursor-pointer select-none"
          onClick={seek}
          onKeyDown={onSeekKey}
          role="slider"
          tabIndex={0}
          aria-label="Seek"
          aria-valuemin={0}
          aria-valuemax={Math.round(dur / 1000)}
          aria-valuenow={Math.round(t / 1000)}
          aria-valuetext={`${fmt(t)} of ${fmt(dur)}`}
        >
          <svg viewBox={`0 0 ${W} 64`} preserveAspectRatio="none" className="block h-16 w-full" aria-hidden="true">
            <defs>
              <linearGradient id="wf-grad" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0" stopColor="#ff4d1a" />
                <stop offset=".55" stopColor="#ff9f1c" />
                <stop offset="1" stopColor="#ffe14d" />
              </linearGradient>
            </defs>
            {s.peaks.agent.map((p, i) => {
              const h = Math.max(1, p * 28);
              const on = i / bars < progress;
              return (
                <rect key={`a${i}`} x={i * 4 + 0.6} y={32 - h} width="2.4" height={h} rx="1" fill={on ? "url(#wf-grad)" : "rgba(244,239,230,0.16)"} />
              );
            })}
            {s.peaks.caller.map((p, i) => {
              const h = Math.max(1, p * 28);
              const on = i / bars < progress;
              return (
                <rect key={`c${i}`} x={i * 4 + 0.6} y={33} width="2.4" height={h} rx="1" fill={on ? "#f4efe6" : "rgba(244,239,230,0.1)"} />
              );
            })}
          </svg>
          <div className="pointer-events-none absolute inset-y-0 w-px bg-sun/80" style={{ left: `${progress * 100}%` }} />
        </div>

        <div className="mt-2 flex items-center justify-between font-mono text-[11px] text-mute">
          <span className="flex items-center gap-3">
            <span className="flex items-center gap-1.5"><i className="h-1.5 w-1.5 rounded-full bg-amber" />agent</span>
            <span className="flex items-center gap-1.5"><i className="h-1.5 w-1.5 rounded-full bg-bone" />caller</span>
          </span>
          <span>
            {fmt(t)} / {fmt(dur)}
          </span>
        </div>
      </div>

      {/* transcript */}
      <div className="border-t hairline">
        <ol ref={listRef} className="transcript h-[232px] space-y-3 overflow-y-auto px-5 py-4" aria-live="polite">
          {visible.length === 0 && (
            <li className="flex h-full flex-col items-center justify-center gap-2 text-center text-[13px] text-mute">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-mute/60">ready</span>
              Press play to hear {s.agentName}, an AI agent, handle a call from {s.callerName}.
            </li>
          )}
          {visible.map((g) => {
            const i = s.segments.indexOf(g);
            const isActive = !showAll && i === activeIdx;
            let text = g.text;
            if (isActive) {
              const words = g.text.split(" ");
              const n = Math.max(1, Math.ceil(words.length * ((t - g.startMs) / (g.endMs - g.startMs))));
              text = words.slice(0, n).join(" ");
            }
            return (
              <li key={i} className={`chip-in flex gap-3 text-[13.5px] leading-relaxed ${g.speaker === "agent" ? "" : "pl-6"}`}>
                <span
                  className={`mt-[3px] shrink-0 font-mono text-[10.5px] uppercase tracking-wider ${
                    g.speaker === "agent" ? "text-amber" : "text-mute"
                  }`}
                >
                  {g.name}
                </span>
                <span className={isActive ? "text-bone" : "text-bone/75"}>
                  {text}
                  {isActive && <span className="ml-0.5 inline-block h-3.5 w-[2px] translate-y-0.5 animate-pulse bg-amber" />}
                </span>
              </li>
            );
          })}
          {s.events
            .filter((ev) => showAll || (started && t >= ev.atMs))
            .map((ev) => (
              <li key={ev.label} className="chip-in">
                <span className="inline-flex items-center gap-2 rounded-lg border border-amber/30 bg-amber/[0.07] px-3 py-1.5 font-mono text-[11px] text-sun">
                  <Check /> {ev.label}
                </span>
              </li>
            ))}
        </ol>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t hairline px-5 py-3.5">
        <button type="button" onClick={() => setShowAll((v) => !v)} className="text-[12.5px] text-mute underline-offset-4 hover:text-bone hover:underline">
          {showAll ? "Hide" : "Show"} full transcript
        </button>
        <a
          href={LINKS.cloudivoice}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-[12.5px] font-medium text-amber hover:text-sun"
        >
          Build yours on CloudiVoice <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      </div>
      <p className="px-5 pb-3 font-mono text-[10.5px] text-mute/60">
        {error ? "Your browser blocked audio playback — tap play again." : "Synthesized sample call · fictional business and people"}
      </p>

      <audio
        ref={audioRef}
        key={s.id}
        src={s.src}
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => {
          setPlaying(false);
          setT(dur);
        }}
      />
    </div>
  );
}
