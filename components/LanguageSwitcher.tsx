"use client";

import { useLanguage } from "@/context/LanguageContext";

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="hidden sm:flex items-center gap-2 border-r border-white/10 pr-4">
      <button 
        onClick={() => setLanguage("AR")}
        className={`text-xs font-medium transition-colors ${language === "AR" ? "text-cyan-400" : "text-slate-400 hover:text-cyan-400"}`}
      >
        AR
      </button>
      <span className="text-slate-600 text-[10px] pb-[1px]">/</span>
      <button 
        onClick={() => setLanguage("FR")}
        className={`text-xs font-medium transition-colors ${language === "FR" ? "text-cyan-400" : "text-slate-400 hover:text-cyan-400"}`}
      >
        FR
      </button>
      <span className="text-slate-600 text-[10px] pb-[1px]">/</span>
      <button 
        onClick={() => setLanguage("EN")}
        className={`text-xs font-medium transition-colors ${language === "EN" ? "text-cyan-400" : "text-slate-400 hover:text-cyan-400"}`}
      >
        EN
      </button>
    </div>
  );
}
