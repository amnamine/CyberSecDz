'use client';

import Link from 'next/link';
import HeroAnimation from '@/components/HeroAnimation';
import { ShieldAlert, Fingerprint, HelpCircle, Building2, UserCircle, Shield, ArrowRight, Lock } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { AnimatedText } from '@/components/AnimatedText';

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-24 lg:pt-24 lg:pb-32">
        <div className="container mx-auto px-4 z-10 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                </span>
                {t('hero.badge')}
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
                <AnimatedText text={t('hero.title.1')} /> <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-emerald-400 to-cyan-500">
                  <AnimatedText text={t('hero.title.2')} />
                </span>
              </h1>
              <p className="text-lg md:text-xl text-slate-400 mb-8 leading-relaxed">
                {t('hero.description')}
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link href="/register" className="inline-flex h-12 items-center justify-center rounded-md bg-cyan-600 px-6 font-medium text-white shadow-lg shadow-cyan-500/20 transition-all hover:bg-cyan-500 hover:scale-105">
                  {t('hero.btn.report')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link href="/services" className="inline-flex h-12 items-center justify-center rounded-md border border-slate-700 bg-slate-900/50 px-6 font-medium text-slate-300 transition-all hover:bg-slate-800 hover:text-white glass-panel">
                  {t('hero.btn.services')}
                </Link>
              </div>
            </div>
            
            <div className="relative hidden lg:block h-[500px]">
              <HeroAnimation />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-slate-900/50 border-y border-white/5 relative">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-white mb-4 neon-text">{t('services.title')}</h2>
            <p className="text-slate-400">{t('services.subtitle')}</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Service 1 */}
            <div className="glass-panel p-6 rounded-2xl border border-slate-800 hover:border-cyan-500/50 transition-all group cursor-pointer hover:-translate-y-1">
              <div className="h-12 w-12 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <ShieldAlert className="h-6 w-6 text-rose-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{t('service1.title')}</h3>
              <p className="text-slate-400 mb-4 text-sm leading-relaxed">
                {t('service1.desc')}
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center text-sm text-slate-300"><div className="w-1.5 h-1.5 rounded-full bg-cyan-500 mr-2"></div>{t('service1.point1')}</li>
                <li className="flex items-center text-sm text-slate-300"><div className="w-1.5 h-1.5 rounded-full bg-cyan-500 mr-2"></div>{t('service1.point2')}</li>
              </ul>
              <Link href="/report?type=personal" className="text-cyan-400 text-sm font-medium flex items-center hover:text-cyan-300">
                {t('service1.link')} <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </div>

            {/* Service 2 */}
            <div className="glass-panel p-6 rounded-2xl border border-slate-800 hover:border-emerald-500/50 transition-all group cursor-pointer hover:-translate-y-1">
              <div className="h-12 w-12 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Building2 className="h-6 w-6 text-emerald-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{t('service2.title')}</h3>
              <p className="text-slate-400 mb-4 text-sm leading-relaxed">
                {t('service2.desc')}
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center text-sm text-slate-300"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2"></div>{t('service2.point1')}</li>
                <li className="flex items-center text-sm text-slate-300"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2"></div>{t('service2.point2')}</li>
              </ul>
              <Link href="/report?type=company" className="text-emerald-400 text-sm font-medium flex items-center hover:text-emerald-300">
                {t('service2.link')} <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </div>

            {/* Service 3 */}
            <div className="glass-panel p-6 rounded-2xl border border-slate-800 hover:border-purple-500/50 transition-all group cursor-pointer hover:-translate-y-1 relative overflow-hidden">
              <div className="h-12 w-12 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <HelpCircle className="h-6 w-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{t('service3.title')}</h3>
              <p className="text-slate-400 mb-4 text-sm leading-relaxed">
                {t('service3.desc')}
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center text-sm text-slate-300"><div className="w-1.5 h-1.5 rounded-full bg-purple-400 mr-2"></div>{t('service3.point1')}</li>
                <li className="flex items-center text-sm text-slate-300"><div className="w-1.5 h-1.5 rounded-full bg-purple-400 mr-2"></div>{t('service3.point2')}</li>
              </ul>
              <Link href="/report?type=consultation" className="text-purple-400 text-sm font-medium flex items-center hover:text-purple-300">
                {t('service3.link')} <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </div>
            
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-4 z-10 relative">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 space-y-8">
              <h2 className="text-3xl font-bold text-white">{t('trust.title')}</h2>
              <p className="text-lg text-slate-400">
                {t('trust.desc')}
              </p>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <div className="h-8 w-8 rounded-full bg-cyan-900/50 flex items-center justify-center border border-cyan-500/30">
                      <Lock className="h-4 w-4 text-cyan-400" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">{t('trust.f1.title')}</h4>
                    <p className="text-slate-400 text-sm">{t('trust.f1.desc')}</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <div className="h-8 w-8 rounded-full bg-cyan-900/50 flex items-center justify-center border border-cyan-500/30">
                      <Fingerprint className="h-4 w-4 text-cyan-400" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">{t('trust.f2.title')}</h4>
                    <p className="text-slate-400 text-sm">{t('trust.f2.desc')}</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <div className="h-8 w-8 rounded-full bg-cyan-900/50 flex items-center justify-center border border-cyan-500/30">
                      <Shield className="h-4 w-4 text-cyan-400" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">{t('trust.f3.title')}</h4>
                    <p className="text-slate-400 text-sm">{t('trust.f3.desc')}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex-1 relative">
              <div className="absolute -inset-4 bg-gradient-to-tr from-cyan-500/10 to-emerald-500/10 blur-2xl rounded-full"></div>
              <div className="relative glass-panel p-8 rounded-2xl border border-slate-700">
                <div className="flex justify-between items-center mb-6 border-b border-slate-700 pb-4">
                  <span className="text-white font-medium">{t('trust.status.title')}</span>
                  <span className="flex items-center text-xs text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5 animate-pulse"></span>
                    {t('trust.status.badge')}
                  </span>
                </div>
                
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-slate-900/50 border border-slate-800">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center">
                          <UserCircle className="h-4 w-4 text-slate-400" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-white">{t('trust.status.case')}{1040 + i}</div>
                          <div className="text-xs text-slate-500">{t('trust.status.time')}</div>
                        </div>
                      </div>
                      <div className="text-xs text-cyan-400 px-2 py-1 rounded-md bg-cyan-400/10 border border-cyan-400/20">
                        {t('trust.status.progress')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
