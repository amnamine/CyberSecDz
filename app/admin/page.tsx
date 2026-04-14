'use client';

import { ShieldAlert, Users, AlertTriangle, Search, Activity, Filter, CheckCircle2, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function AdminDashboard() {
  const { t } = useLanguage();

  const mockQueue = [
    { id: 'DZ-1045', user: 'Mohammed Ali', type: 'Hacked Social Media', risk: 'High', status: 'pending', time: '10 mins ago' },
    { id: 'DZ-1044', user: 'TechCorp Dz', type: 'Server Audit', risk: 'Medium', status: 'pending', time: '1 hour ago' },
    { id: 'DZ-1042', user: 'Amina B.', type: 'Online Blackmail', risk: 'Critical', status: 'investigating', time: '3 hours ago' },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1 flex items-center">
            <span className="bg-rose-500 text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded mr-3 tracking-wider">{t('admin.title')}</span>
            {t('admin.subtitle')}
          </h1>
          <p className="text-slate-400 text-sm">{t('admin.region')}</p>
        </div>
        <div className="flex gap-3">
          <div className="flex items-center bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-3 py-1.5 rounded-lg text-sm font-medium">
            <div className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></div>
            {t('admin.status.online')}
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <div className="glass-panel p-5 rounded-xl border border-slate-700 flex items-center justify-between">
          <div>
            <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">{t('admin.stat.queue')}</p>
            <h3 className="text-2xl font-bold text-white">24</h3>
          </div>
          <div className="h-10 w-10 rounded-full bg-cyan-900/30 flex items-center justify-center border border-cyan-500/30">
            <Activity className="h-5 w-5 text-cyan-400" />
          </div>
        </div>
        <div className="glass-panel p-5 rounded-xl border border-rose-500/30 bg-rose-500/5 flex items-center justify-between">
          <div>
            <p className="text-rose-400/80 text-xs font-semibold uppercase tracking-wider mb-1">{t('admin.stat.critical')}</p>
            <h3 className="text-2xl font-bold text-rose-400">3</h3>
          </div>
          <div className="h-10 w-10 rounded-full bg-rose-900/30 flex items-center justify-center border border-rose-500/30">
            <AlertTriangle className="h-5 w-5 text-rose-400" />
          </div>
        </div>
        <div className="glass-panel p-5 rounded-xl border border-slate-700 flex items-center justify-between">
          <div>
            <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">{t('admin.stat.active')}</p>
            <h3 className="text-2xl font-bold text-white">12</h3>
          </div>
          <div className="h-10 w-10 rounded-full bg-purple-900/30 flex items-center justify-center border border-purple-500/30">
            <Search className="h-5 w-5 text-purple-400" />
          </div>
        </div>
        <div className="glass-panel p-5 rounded-xl border border-slate-700 flex items-center justify-between">
          <div>
            <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">{t('admin.stat.resolved')}</p>
            <h3 className="text-2xl font-bold text-white">8</h3>
          </div>
          <div className="h-10 w-10 rounded-full bg-emerald-900/30 flex items-center justify-center border border-emerald-500/30">
            <CheckCircle2 className="h-5 w-5 text-emerald-400" />
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-bold text-white">{t('admin.queue.title')}</h2>
            <button className="text-sm flex items-center text-slate-400 hover:text-cyan-400 transition-colors">
              <Filter className="h-4 w-4 mr-2" /> {t('admin.queue.filter')}
            </button>
          </div>
          
          {mockQueue.map((c) => (
            <div key={c.id} className="glass-panel p-5 rounded-xl border border-slate-700 hover:border-cyan-500/50 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    c.risk === 'Critical' ? 'bg-rose-500/10' : 
                    c.risk === 'High' ? 'bg-orange-500/10' : 
                    'bg-cyan-500/10'
                  }`}>
                    <ShieldAlert className={`h-5 w-5 ${
                      c.risk === 'Critical' ? 'text-rose-500' : 
                      c.risk === 'High' ? 'text-orange-500' : 
                      'text-cyan-500'
                    }`} />
                  </div>
                  <div>
                    <h3 className="text-white font-bold">{c.type}</h3>
                    <p className="text-slate-400 text-xs font-mono">{c.id} • {c.time}</p>
                  </div>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                  c.status === 'investigating' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' : 
                  'bg-slate-800 text-slate-300 border border-slate-700'
                }`}>
                  {t(`dashboard.status.${c.status}` as Parameters<typeof t>[0]).toUpperCase()}
                </span>
              </div>
              
              <div className="flex items-center justify-between border-t border-slate-800 pt-4">
                <div className="flex items-center text-sm text-slate-400">
                  <Users className="h-4 w-4 mr-2" />
                  {c.user} <span className="ml-2 text-emerald-400 text-xs bg-emerald-400/10 px-1.5 py-0.5 rounded">{t('dashboard.stat.verified')}</span>
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium transition-colors border border-slate-700">
                    {t('admin.btn.view')}
                  </button>
                  <button className="px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-medium transition-colors">
                    {t('admin.btn.assign')}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-xl border border-slate-700">
            <h2 className="text-lg font-bold text-white mb-4">{t('admin.actions.title')}</h2>
            <div className="space-y-2">
              <button className="w-full text-left px-4 py-3 rounded-lg bg-slate-800/50 hover:bg-slate-800 text-sm text-slate-300 transition-colors border border-slate-700 flex items-center justify-between">
                {t('admin.actions.escalate')} <ArrowRight className="h-4 w-4" />
              </button>
              <button className="w-full text-left px-4 py-3 rounded-lg bg-slate-800/50 hover:bg-slate-800 text-sm text-slate-300 transition-colors border border-slate-700 flex items-center justify-between">
                {t('admin.actions.broadcast')} <ArrowRight className="h-4 w-4" />
              </button>
              <button className="w-full text-left px-4 py-3 rounded-lg bg-slate-800/50 hover:bg-slate-800 text-sm text-slate-300 transition-colors border border-slate-700 flex items-center justify-between">
                {t('admin.actions.manage')} <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          <div className="glass-panel p-6 rounded-xl border border-slate-700">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">{t('admin.escalations.title')}</h2>
            <div className="space-y-4">
              <div className="border-l-2 border-rose-500 pl-3">
                <p className="text-sm text-white font-medium">Cyber Fraud Syndicate</p>
                <p className="text-xs text-slate-400">Escalated to Cyber Police 2 hrs ago</p>
              </div>
              <div className="border-l-2 border-orange-500 pl-3">
                <p className="text-sm text-white font-medium">Corporate Ransomware</p>
                <p className="text-xs text-slate-400">Escalated to CERIST 5 hrs ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
