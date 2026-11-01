import { Link } from "react-router-dom";
import { ARTICLES, articleUrl, type Article } from "../content/articles";
import { ArrowRight } from "./Icons";

/** Article cards — used on the home page (latest) and on service pages (related). */
export default function InsightsSection({
  items = ARTICLES.slice(0, 3),
  eyebrow = "Insights",
  title = "Straight answers to the questions we hear most.",
}: {
  items?: Article[];
  eyebrow?: string;
  title?: string;
}) {
  if (!items.length) return null;
  return (
    <section aria-labelledby="insights-title" className="border-t hairline py-24 lg:py-32">
      <div className="section">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="reveal eyebrow">{eyebrow}</p>
            <h2 id="insights-title" className="reveal mt-5 text-3xl font-semibold leading-tight sm:text-4xl" style={{ ["--d" as any]: "80ms" }}>
              {title}
            </h2>
          </div>
          <Link to="/insights" className="reveal btn-secondary self-start lg:self-auto">
            All insights <ArrowRight />
          </Link>
        </div>
        <ul className="mt-12 grid gap-4 md:grid-cols-3">
          {items.map((a, i) => (
            <li key={a.slug} className="reveal" style={{ ["--d" as any]: `${i * 90}ms` }}>
              <ArticleCard a={a} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function ArticleCard({ a }: { a: Article }) {
  return (
    <Link
      to={articleUrl(a.slug)}
      className="spotlight tilt group flex h-full flex-col rounded-2xl border hairline bg-ink-800/50 p-6 hover:border-amber/30"
    >
      <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-amber">
        {a.category} · {a.readMins} min read
      </span>
      <h3 className="mt-4 text-xl font-semibold leading-snug transition group-hover:text-sun">{a.title}</h3>
      <p className="mt-3 line-clamp-3 text-[14.5px] leading-relaxed text-bone/60">{a.description}</p>
      <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-[13px] text-mute transition group-hover:text-sun">
        Read the answer <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
