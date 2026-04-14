'use client';

import { ShieldCheck, MailWarning, UserX, Search, MessageSquareShare, FileLock2, GlobeLock, ServerCrash } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function ServicesPage() {
  const { t } = useLanguage();

  const citizenServices = [
    { icon: <UserX className="h-6 w-6 text-cyan-400" />, title: t('service1.point1'), desc: t('service1.desc') },
    { icon: <MailWarning className="h-6 w-6 text-orange-400" />, title: t('service1.point2'), desc: t('service1.desc') },
    { icon: <MessageSquareShare className="h-6 w-6 text-purple-400" />, title: t('service3.point2'), desc: t('service3.desc') },
    { icon: <Search className="h-6 w-6 text-emerald-400" />, title: t('service3.point1'), desc: t('service3.desc') }
  ];

  const companyServices = [
    { icon: <ServerCrash className="h-6 w-6 text-rose-400" />, title: t('service3.point2'), desc: t('service3.desc') },
    { icon: <GlobeLock className="h-6 w-6 text-cyan-400" />, title: t('service2.point2'), desc: t('service2.desc') },
    { icon: <ShieldCheck className="h-6 w-6 text-emerald-400" />, title: t('service2.point1'), desc: t('service2.desc') },
    { icon: <FileLock2 className="h-6 w-6 text-blue-400" />, title: t('service2.desc'), desc: t('service2.desc') }
  ];

  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl">
      <div className="text-center mb-16 max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 neon-text">{t('services.coverage.title')}</h1>
        <p className="text-lg text-slate-400">
          {t('services.coverage.desc')}
        </p>
      </div>

      <div className="mb-20">
        <div className="flex items-center gap-4 mb-8">
          <h2 className="text-2xl font-bold text-white">{t('services.forCitizens')}</h2>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-cyan-500/50 to-transparent"></div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {citizenServices.map((s, i) => (
            <div key={i} className="glass-panel p-6 rounded-2xl border border-slate-700 hover:border-cyan-500/50 transition-all hover:-translate-y-1">
              <div className="h-12 w-12 rounded-lg bg-slate-800 flex items-center justify-center mb-4 border border-slate-700">
                {s.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{s.title}</h3>
              <p className="text-sm text-slate-400 line-clamp-3">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-16">
        <div className="flex items-center gap-4 mb-8">
          <h2 className="text-2xl font-bold text-white">{t('services.forCompanies')}</h2>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-emerald-500/50 to-transparent"></div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {companyServices.map((s, i) => (
            <div key={i} className="glass-panel p-6 rounded-2xl border border-slate-700 hover:border-emerald-500/50 transition-all hover:-translate-y-1">
              <div className="h-12 w-12 rounded-lg bg-slate-800 flex items-center justify-center mb-4 border border-slate-700">
                {s.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{s.title}</h3>
              <p className="text-sm text-slate-400 line-clamp-3">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="glass-panel rounded-2xl border border-slate-700 p-8 md:p-12 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 to-purple-900/20 pointer-events-none"></div>
        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-4">{t('services.custom.title')}</h2>
          <p className="text-slate-300 mb-8">
            {t('services.custom.desc')}
          </p>
          <Link href="/report?type=consultation" className="inline-flex h-12 items-center justify-center rounded-lg bg-cyan-600 px-8 font-medium text-white shadow-lg transition-all hover:bg-cyan-500">
            {t('services.custom.btn')}
          </Link>
        </div>
      </div>
    </div>
  );
}
