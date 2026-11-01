import { Link } from "react-router-dom";

export type Crumb = { name: string; to?: string };

/** Visible breadcrumb trail (the matching BreadcrumbList JSON-LD is emitted at prerender). */
export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="reveal mb-8">
      <ol className="flex flex-wrap items-center gap-2 font-mono text-[11.5px] text-mute">
        {items.map((c, i) => (
          <li key={c.name} className="flex items-center gap-2">
            {c.to ? (
              <Link to={c.to} className="transition hover:text-sun">
                {c.name}
              </Link>
            ) : (
              <span aria-current="page" className="text-bone/80">
                {c.name}
              </span>
            )}
            {i < items.length - 1 && <span aria-hidden="true">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
