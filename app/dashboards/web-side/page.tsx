'use client';

import { Globe, Clock, ShieldCheck, Activity } from 'lucide-react';

export default function WebSideDashboard() {
  const missions = [
    { id: 1, title: 'Patch Cross-Site Scripting (XSS) vulnerability on public portal', priority: 'Critical', status: 'Pending', time: '15 mins ago' },
    { id: 2, title: 'Review WAF logs for SQL injection attempts', priority: 'Medium', status: 'Pending', time: '3 hours ago' },
  ];

  return (
    <div className="p-8 pb-20 max-w-6xl mx-auto min-h-screen">
      <div className="flex items-center gap-4 mb-10 border-b border-cyan-900/30 pb-6">
        <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-900 flex items-center justify-center text-cyan-500">
          <Globe className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-slate-100">Web Side Security</h1>
          <p className="text-cyan-400/80 text-sm tracking-widest uppercase mt-1">Application Defense Unit</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl overflow-hidden backdrop-blur-sm">
            <div className="bg-slate-900/80 px-6 py-4 border-b border-slate-800 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-slate-200 flex items-center gap-2">
                <Clock className="w-5 h-5 text-cyan-500" /> Pending Web Exploits / Tasks
              </h2>
            </div>
            <div className="divide-y divide-slate-800">
              {missions.map((mission) => (
                <div key={mission.id} className="p-6 hover:bg-slate-800/30 transition-colors group">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-slate-200 font-medium group-hover:text-cyan-400 transition-colors">{mission.title}</h3>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                       <Activity className="w-3 h-3 text-cyan-500" /> {mission.status}
                    </span>
                    <span>•</span>
                    <span>{mission.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
           <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm">
             <h3 className="text-slate-300 font-medium mb-4 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-500" /> WAF Metrics
             </h3>
             <ul className="space-y-4 text-sm text-slate-400">
               <li className="flex justify-between items-center border-b border-slate-800 pb-2">
                 <span>Requests Blocked (24h)</span>
                 <span className="text-slate-200 font-mono">1,304</span>
               </li>
               <li className="flex justify-between items-center border-b border-slate-800 pb-2">
                 <span>Uptime</span>
                 <span className="text-emerald-400 font-mono">99.99%</span>
               </li>
             </ul>
           </div>
        </div>
      </div>
    </div>
  );
}
