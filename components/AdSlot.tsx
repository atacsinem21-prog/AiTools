"use client";

import { useEffect } from "react";

type AdSlotProps = {
  slot: string;
  format?: "auto" | "rectangle" | "horizontal";
  className?: string;
};

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

export function AdSlot({ slot, format = "auto", className }: AdSlotProps) {
  useEffect(() => {
    if (!ADSENSE_CLIENT) return;

    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    } catch {
      // Ad blockers can prevent ad script execution.
    }
  }, []);

  if (!ADSENSE_CLIENT) {
    return (
      <div className={`glass-card rounded-2xl border border-slate-800 p-4 text-sm text-slate-400 ${className ?? ""}`}>
        Ad area placeholder. Set `NEXT_PUBLIC_ADSENSE_CLIENT` to enable Google Ads.
      </div>
    );
  }

  return (
    <div className={className}>
      <ins
        className="adsbygoogle block"
        style={{ display: "block" }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
