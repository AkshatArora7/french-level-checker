"use client";

import { useEffect, useRef } from "react";

const CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "";

type AdSlotProps = {
  slot: string;
  format?: string;
  responsive?: boolean;
  className?: string;
  style?: React.CSSProperties;
  label?: string;
};

/**
 * Google AdSense slot. Renders nothing unless NEXT_PUBLIC_ADSENSE_CLIENT is set.
 * The publisher script itself is injected once from app/layout.tsx.
 */
export default function AdSlot({
  slot,
  format = "auto",
  responsive = true,
  className,
  style,
  label = "Advertisement",
}: AdSlotProps) {
  const pushed = useRef(false);

  useEffect(() => {
    if (!CLIENT || pushed.current) return;
    try {
      // @ts-expect-error – injected globally by AdSense
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch {
      // ignore – AdSense may not be loaded yet (e.g. blocked)
    }
  }, []);

  if (!CLIENT) return null;

  return (
    <aside
      className={className}
      aria-label={label}
      style={{ display: "block", textAlign: "center", margin: "2rem 0", ...style }}
    >
      <span
        className="block text-[10px] uppercase tracking-widest ink-faint mb-1"
        style={{ opacity: 0.6 }}
      >
        {label}
      </span>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={CLIENT}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? "true" : "false"}
      />
    </aside>
  );
}
