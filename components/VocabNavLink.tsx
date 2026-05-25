"use client";

import Link from "next/link";
import { useVocab } from "./VocabProvider";

export default function VocabNavLink() {
  const { items, dueCount } = useVocab();
  const label = dueCount > 0 ? `Vocab (${dueCount})` : items.length > 0 ? `Vocab (${items.length})` : "Vocab";
  return (
    <Link href="/vocab" className="hover:opacity-80" title="Your saved vocabulary">
      {label}
    </Link>
  );
}
