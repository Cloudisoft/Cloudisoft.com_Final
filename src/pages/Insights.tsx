import Layout from "../components/Layout";
import PageHero from "../components/PageHero";
import CtaBand from "../components/CtaBand";
import { ArticleCard } from "../components/InsightsSection";
import { ARTICLES } from "../content/articles";

export default function Insights() {
  const cats = Array.from(new Set(ARTICLES.map((a) => a.category)));
  return (
    <Layout>
      <PageHero
        crumbs={[{ name: "Home", to: "/" }, { name: "Insights" }]}
        eyebrow="Insights"
        title={
          <>
            Practical answers on websites, automation, <span className="gradient-text">AI voice and security.</span>
          </>
        }
      >
        <p>Plain-English guides from the team that builds this work every day — what things cost, how they work and what to do first.</p>
        <ul className="mt-8 flex flex-wrap gap-2">
          {cats.map((c) => (
            <li key={c} className="rounded-full border hairline px-4 py-2 text-[13px] text-bone/80">
              {c}
            </li>
          ))}
        </ul>
      </PageHero>
      <section className="border-t hairline py-20">
        <ul className="section grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ARTICLES.map((a, i) => (
            <li key={a.slug} className="reveal" style={{ ["--d" as any]: `${(i % 3) * 90}ms` }}>
              <ArticleCard a={a} />
            </li>
          ))}
        </ul>
      </section>
      <CtaBand />
    </Layout>
  );
}
