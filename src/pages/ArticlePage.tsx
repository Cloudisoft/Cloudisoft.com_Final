import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import Breadcrumbs from "../components/Breadcrumbs";
import FAQ from "../components/FAQ";
import CtaBand from "../components/CtaBand";
import InsightsSection from "../components/InsightsSection";
import { ArrowRight, Check, WhatsApp } from "../components/Icons";
import { ARTICLES, type Article, type Block } from "../content/articles";
import { SERVICES, serviceUrl, usd, waLink } from "../lib/site";

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
const fmtDate = (d: string) => new Date(d + "T00:00:00Z").toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });

function BlockView({ b }: { b: Block }) {
  if ("p" in b) return <p>{b.p}</p>;
  if ("callout" in b)
    return <p className="!mt-8 rounded-2xl border border-amber/30 bg-amber/[0.06] p-5 text-bone/85">{b.callout}</p>;
  if ("table" in b)
    return (
      <div className="!mt-6 overflow-x-auto rounded-2xl border hairline">
        <table className="w-full min-w-[520px] text-left text-[14px]">
          <thead className="bg-white/[0.03] font-mono text-[11px] uppercase tracking-wider text-mute">
            <tr>{b.table.head.map((h) => <th key={h} className="px-4 py-3 font-medium">{h}</th>)}</tr>
          </thead>
          <tbody className="divide-y divide-white/[0.07]">
            {b.table.rows.map((r, i) => (
              <tr key={i}>{r.map((c, k) => <td key={k} className={`px-4 py-3 align-top ${k === 0 ? "font-medium text-bone" : "text-bone/70"}`}>{c}</td>)}</tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  const L = b.ordered ? "ol" : "ul";
  return (
    <L className={b.ordered ? "list-decimal" : ""}>
      {b.list.map((x) => <li key={x}>{x}</li>)}
    </L>
  );
}

export default function ArticlePage({ a }: { a: Article }) {
  const svc = SERVICES.find((s) => s.id === a.service)!;
  const related = ARTICLES.filter((x) => x.slug !== a.slug).sort((x, y) => Number(y.service === a.service) - Number(x.service === a.service)).slice(0, 3);

  return (
    <Layout>
      <article>
        <header className="relative isolate overflow-hidden pb-12 pt-36 sm:pt-44">
          <div aria-hidden="true" data-parallax="0.25" className="absolute inset-0 -z-10">
            <div className="glow left-[-10%] top-[-30%] h-[460px] w-[460px] bg-ember/15" />
          </div>
          <div className="section max-w-3xl">
            <Breadcrumbs items={[{ name: "Home", to: "/" }, { name: "Insights", to: "/insights" }, { name: a.category }]} />
            <p className="reveal font-mono text-[11.5px] uppercase tracking-[0.16em] text-amber">
              {a.category} · {a.readMins} min read
            </p>
            <h1 className="reveal mt-5 font-display text-4xl font-semibold leading-[1.06] sm:text-5xl" style={{ ["--d" as any]: "80ms" }}>
              {a.title}
            </h1>
            <p className="reveal mt-5 text-[13.5px] text-mute" style={{ ["--d" as any]: "140ms" }}>
              By the Cloudisoft team · Updated <time dateTime={a.updated}>{fmtDate(a.updated)}</time>
            </p>

            {/* The direct answer — first thing readers and answer engines see */}
            <div className="reveal mt-10 rounded-2xl border border-amber/30 bg-amber/[0.06] p-6" style={{ ["--d" as any]: "200ms" }}>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-sun">Short answer</p>
              <p className="mt-3 text-[17px] leading-relaxed text-bone/90">{a.answer}</p>
            </div>

            <nav aria-label="On this page" className="reveal mt-10 rounded-2xl border hairline p-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-mute">On this page</p>
              <ol className="mt-4 space-y-2 text-[14.5px]">
                {a.sections.map((s) => (
                  <li key={s.h}>
                    <a href={`#${slugify(s.h)}`} className="text-bone/75 transition hover:text-sun">{s.h}</a>
                  </li>
                ))}
              </ol>
            </nav>
          </div>
        </header>

        <div className="section prose-legal max-w-3xl pb-16">
          {a.sections.map((s) => (
            <section key={s.h} id={slugify(s.h)} className="scroll-mt-28">
              <h2>{s.h}</h2>
              {s.blocks.map((b, i) => <BlockView key={i} b={b} />)}
            </section>
          ))}

          <aside className="spotlight mt-14 rounded-[22px] border hairline bg-ink-800/60 p-7">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-amber">
              Cloudisoft · {svc.name}{svc.from ? ` · from ${usd(svc.from)}` : ""}
            </p>
            <p className="!mt-3 font-display text-2xl font-semibold text-bone">Want this done for your business?</p>
            <ul className="!mt-4 !list-none !pl-0">
              {svc.deliverables.map((d) => (
                <li key={d} className="flex items-start gap-2.5">
                  <span className="mt-1 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-amber/15 text-sun"><Check className="h-2.5 w-2.5" /></span>
                  {d}
                </li>
              ))}
            </ul>
            <div className="!mt-6 flex flex-wrap gap-3 not-prose">
              <a href={waLink(`Hi Cloudisoft, I read "${a.title}" and I'd like a quote for ${svc.name}.`)} target="_blank" rel="noopener noreferrer" className="btn-primary !no-underline !text-ink">
                <WhatsApp /> Get a quote on WhatsApp
              </a>
              <Link to={serviceUrl(svc.id)} className="btn-secondary !no-underline">
                About {svc.name.toLowerCase()} <ArrowRight />
              </Link>
            </div>
          </aside>
        </div>
      </article>

      <FAQ items={a.faqs} title="Related questions" />
      <InsightsSection items={related} eyebrow="Keep reading" title="More from Cloudisoft Insights" />
      <CtaBand />
    </Layout>
  );
}
