"use client";

import { useEffect, useState } from "react";
import type { Locale } from "@/data/tools";

type IntroGateProps = {
  locale: Locale;
};

const STORAGE_KEY = "intro_seen_v1";
const INTRO_IMAGE_URL = "https://i.hizliresim.com/n3jpyvd.png";

export function IntroGate({ locale }: IntroGateProps) {
  const [visible, setVisible] = useState(false);
  const [ready, setReady] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);

  useEffect(() => {
    const seen = window.localStorage.getItem(STORAGE_KEY) === "1";
    setVisible(!seen);
    setReady(true);
  }, []);

  if (!ready || !visible) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-slate-950">
      <div className="absolute inset-0 flex items-center justify-center">
        {!videoFailed && (
          <video
            className="h-[96vh] w-[100vw] max-h-[1400px] max-w-[2600px] object-contain object-center"
            autoPlay
            muted
            loop
            playsInline
            poster={INTRO_IMAGE_URL || "/intro/intro.png"}
            onError={() => setVideoFailed(true)}
          >
            <source src="/intro/intro.webm" type="video/webm" />
            <source src="/intro/intro.mp4" type="video/mp4" />
          </video>
        )}
        <div
          className={`h-[96vh] w-[100vw] max-h-[1400px] max-w-[2600px] bg-contain bg-center bg-no-repeat ${videoFailed ? "block" : "hidden"}`}
          style={{ backgroundImage: `url(${INTRO_IMAGE_URL || "/intro/intro.png"})` }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/30 via-slate-950/55 to-slate-950/90" />
      </div>

      <div className="relative z-10 mx-auto flex h-full w-full max-w-6xl items-end px-6 pb-14 md:pb-20">
        <div className="max-w-2xl space-y-4">
          <p className="text-xs uppercase tracking-[0.26em] text-cyan-300">
            {locale === "tr" ? "Hoş geldin" : "Welcome"}
          </p>
          <h2 className="text-3xl font-bold text-white md:text-5xl">
            {locale === "tr" ? "Global AI Araçları" : "Global AI Tools"}
          </h2>
          <p className="text-sm leading-7 text-slate-200 md:text-base">
            {locale === "tr"
              ? "Bu platform; en iyi AI araçlarını keşfetmen, fiyat ve özellikleri karşılaştırman, iş akışına en uygun çözümleri hızla seçmen için tasarlandı."
              : "This platform helps you discover top AI tools, compare pricing and features, and quickly choose the best fit for your workflow."}
          </p>
          <button
            type="button"
            className="rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 hover:from-indigo-400 hover:to-cyan-300"
            onClick={() => {
              window.localStorage.setItem(STORAGE_KEY, "1");
              setVisible(false);
            }}
          >
            {locale === "tr" ? "Devam et ve siteye gir" : "Continue to website"}
          </button>
        </div>
      </div>
    </div>
  );
}
