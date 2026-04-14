'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Clock, ShieldAlert, ArrowRight, UserCircle, Search } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function UserDashboard() {
  const { t } = useLanguage();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    router.push('/login');
  };

  const mockCases = [
    { id: 'DZ-1044', type: 'Hacked Social Media', date: 'Today', status: 'pending', risk: 'High' },
    { id: 'DZ-0982', type: 'Phishing Email', date: 'Oct 12, 2026', status: 'investigating', risk: 'Medium' },
    { id: 'DZ-0811', type: 'Identity Theft', date: 'Sep 05, 2026', status: 'resolved', risk: 'Critical' },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 neon-text">{t('dashboard.title')}</h1>
          <p className="text-slate-400">{t('dashboard.desc')}</p>
        </div>
        <div className="flex gap-2">
          <Link href="/report" className="h-10 inline-flex items-center justify-center rounded-lg bg-cyan-600 px-4 font-medium text-white shadow transition-all hover:bg-cyan-500">
            <ShieldAlert className="mr-2 h-4 w-4" /> {t('dashboard.btn.new')}
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="h-10 inline-flex items-center justify-center rounded-lg border border-slate-700 bg-slate-900/50 px-4 font-medium text-slate-200 transition-all hover:bg-slate-800"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="glass-panel p-6 rounded-2xl border border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-400 font-medium">{t('dashboard.stat.active')}</h3>
            <div className="h-10 w-10 rounded-full bg-cyan-900/30 flex items-center justify-center border border-cyan-500/30">
              <Clock className="h-5 w-5 text-cyan-400" />
            </div>
          </div>
          <div className="text-3xl font-bold text-white">2</div>
        </div>
        
        <div className="glass-panel p-6 rounded-2xl border border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-400 font-medium">{t('dashboard.stat.resolved')}</h3>
            <div className="h-10 w-10 rounded-full bg-emerald-900/30 flex items-center justify-center border border-emerald-500/30">
              <ShieldCheck className="h-5 w-5 text-emerald-400" />
            </div>
          </div>
          <div className="text-3xl font-bold text-white">1</div>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-400 font-medium">{t('dashboard.stat.account')}</h3>
            <div className="h-10 w-10 rounded-full bg-cyan-900/30 flex items-center justify-center border border-cyan-500/30">
              <UserCircle className="h-5 w-5 text-cyan-400" />
            </div>
          </div>
          <div className="flex items-center text-emerald-400 font-medium bg-emerald-400/10 px-3 py-1 rounded-full w-fit">
            <ShieldCheck className="mr-2 h-4 w-4" /> {t('dashboard.stat.verified')}
          </div>
        </div>
      </div>

      <div className="glass-panel rounded-2xl border border-slate-700 overflow-hidden">
        <div className="p-6 border-b border-slate-700 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">{t('dashboard.history.title')}</h2>
          <div className="relative">
            <Search className="h-4 w-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input type="text" placeholder={t('dashboard.history.search')} className="pl-9 pr-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900/50 border-b border-slate-700 text-sm font-medium text-slate-400">
                <th className="p-4 pl-6">{t('dashboard.table.id')}</th>
                <th className="p-4">{t('dashboard.table.type')}</th>
                <th className="p-4">{t('dashboard.table.date')}</th>
                <th className="p-4">{t('dashboard.table.risk')}</th>
                <th className="p-4">{t('dashboard.table.status')}</th>
                <th className="p-4 pr-6">{t('dashboard.table.action')}</th>
              </tr>
            </thead>
            <tbody>
              {mockCases.map((c) => (
                <tr key={c.id} className="border-b border-slate-800 hover:bg-slate-800/30 transition-colors group">
                  <td className="p-4 pl-6 font-mono text-cyan-400 text-sm">{c.id}</td>
                  <td className="p-4 text-white text-sm font-medium">{c.type}</td>
                  <td className="p-4 text-slate-400 text-sm">{c.date}</td>
                  <td className="p-4">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      c.risk === 'Critical' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : 
                      c.risk === 'High' ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20' : 
                      'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    }`}>
                      {t(`dashboard.risk.${c.risk.toLowerCase()}` as Parameters<typeof t>[0])}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      c.status === 'resolved' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 
                      c.status === 'investigating' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' : 
                      'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                    }`}>
                      {t(`dashboard.status.${c.status}` as Parameters<typeof t>[0])}
                    </span>
                  </td>
                  <td className="p-4 pr-6">
                    <button className="text-slate-400 hover:text-cyan-400 p-2 rounded-lg hover:bg-cyan-900/20 transition-colors">
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
