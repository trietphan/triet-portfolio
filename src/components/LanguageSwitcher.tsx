"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export default function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { locale, setLocale, t } = useLanguage();

  return (
    <div className={`inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] p-1 ${compact ? "" : "gap-1"}`}>
      {!compact && (
        <span className="px-2 text-[10px] uppercase tracking-widest text-white/30">
          {t.nav.language}
        </span>
      )}
      <button
        onClick={() => setLocale("en")}
        className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
          locale === "en" ? "bg-[#ff6b2b] text-black" : "text-white/50 hover:text-white/80"
        }`}
        aria-label="Switch to English"
      >
        {t.nav.english}
      </button>
      <button
        onClick={() => setLocale("vi")}
        className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
          locale === "vi" ? "bg-[#ffaa33] text-black" : "text-white/50 hover:text-white/80"
        }`}
        aria-label="Switch to Vietnamese"
      >
        {t.nav.vietnamese}
      </button>
    </div>
  );
}
