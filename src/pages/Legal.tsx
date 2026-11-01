import type { ReactNode } from "react";
import Layout from "../components/Layout";

export const EFFECTIVE = "November 1, 2026";

export default function Legal({ title, intro, children }: { title: string; intro: string; children: ReactNode }) {
  return (
    <Layout>
      <section className="relative isolate overflow-hidden pb-10 pt-36 sm:pt-44">
        <div aria-hidden="true" className="glow left-[-10%] top-[-30%] -z-10 h-[420px] w-[420px] bg-ember/15" />
        <div className="section max-w-3xl">
          <p className="reveal eyebrow">Legal · Effective {EFFECTIVE}</p>
          <h1 className="reveal mt-6 font-display text-5xl font-semibold leading-[1.05] sm:text-6xl" style={{ ["--d" as any]: "80ms" }}>
            {title}
          </h1>
          <p className="reveal mt-6 text-[17px] leading-relaxed text-bone/70" style={{ ["--d" as any]: "160ms" }}>
            {intro}
          </p>
        </div>
      </section>
      <article className="section prose-legal max-w-3xl border-t hairline pb-28 pt-6">{children}</article>
    </Layout>
  );
}
