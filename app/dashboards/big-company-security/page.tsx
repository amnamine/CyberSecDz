'use client';

import { Briefcase, Clock, Building, Users } from 'lucide-react';

export default function BigCompanySecurityDashboard() {
  const missions = [
    { id: 1, title: 'Conduct B2B vendor security compliance audit', priority: 'High', status: 'Pending', time: '2 days ago' },
    { id: 2, title: 'Review ISO 27001 policy drafts for enterprise clients', priority: 'Medium', status: 'Pending', time: '1 week ago' },
  ];

  return (
    <div className="p-8 pb-20 max-w-6xl mx-auto min-h-screen">
      <div className="flex items-center gap-4 mb-10 border-b border-amber-900/30 pb-6">
        <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-900 flex items-center justify-center text-amber-500">
          <Briefcase className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-slate-100">Enterprise Security</h1>
          <p className="text-amber-400/80 text-sm tracking-widest uppercase mt-1">Big Company Defense Unit</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl overflow-hidden backdrop-blur-sm">
            <div className="bg-slate-900/80 px-6 py-4 border-b border-slate-800 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-slate-200 flex items-center gap-2">
                <Clock className="w-5 h-5 text-amber-500" /> Pending Audits / Tasks
              </h2>
            </div>
            <div className="divide-y divide-slate-800">
              {missions.map((mission) => (
                <div key={mission.id} className="p-6 hover:bg-slate-800/30 transition-colors group">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-slate-200 font-medium group-hover:text-amber-400 transition-colors">{mission.title}</h3>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                       <Building className="w-3 h-3 text-slate-500" /> {mission.status}
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
                <Users className="w-5 h-5 text-amber-500" /> Portfolio Metrics
             </h3>
             <ul className="space-y-4 text-sm text-slate-400">
               <li className="flex justify-between items-center border-b border-slate-800 pb-2">
                 <span>Active Client Portfolios</span>
                 <span className="text-slate-200 font-mono">12</span>
               </li>
               <li className="flex justify-between items-center border-b border-slate-800 pb-2">
                 <span>Compliance Rate</span>
                 <span className="text-emerald-400 font-mono">92%</span>
               </li>
             </ul>
           </div>
        </div>
      </div>
    </div>
  );
}
