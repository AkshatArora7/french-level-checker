import Link from "next/link";

export type RelatedItem = { href: string; label: string; sub?: string };

export default function RelatedLinks({
  title = "Related",
  items,
}: {
  title?: string;
  items: RelatedItem[];
}) {
  if (!items.length) return null;
  return (
    <section className="tactile-card p-6">
      <h2 className="text-xs uppercase tracking-wider ink-faint mb-3">{title}</h2>
      <ul className="grid sm:grid-cols-2 gap-2">
        {items.map((it) => (
          <li key={it.href}>
            <Link
              href={it.href}
              className="block px-3 py-2 rounded-md hover:underline ink-strong"
            >
              <span className="font-medium">{it.label}</span>
              {it.sub && <span className="ink-soft text-xs block">{it.sub}</span>}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
