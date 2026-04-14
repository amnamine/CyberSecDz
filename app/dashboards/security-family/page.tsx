'use client';

import { Shield, Clock, AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function SecurityFamilyDashboard() {
  const missions = [
    { id: 1, title: 'Investigate IP spoofing on Subnet A', priority: 'High', status: 'Pending', time: '10 mins ago' },
    { id: 2, title: 'Update firewall rules for perimeter defense', priority: 'Medium', status: 'In Progress', time: '2 hours ago' },
    { id: 3, title: 'Analyze suspicious login patterns', priority: 'Critical', status: 'Pending', time: 'Just now' },
  ];

  return (
    <div className="p-8 pb-20 max-w-6xl mx-auto min-h-screen">
      <div className="flex items-center gap-4 mb-10 border-b border-red-900/30 pb-6">
        <div className="p-4 rounded-xl bg-red-950/40 border border-red-900 flex items-center justify-center text-red-500">
          <Shield className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-slate-100">Security Family Division</h1>
          <p className="text-red-400/80 text-sm tracking-widest uppercase mt-1">Authorized Personnel Only</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl overflow-hidden backdrop-blur-sm">
            <div className="bg-slate-900/80 px-6 py-4 border-b border-slate-800 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-slate-200 flex items-center gap-2">
                <Clock className="w-5 h-5 text-red-500" /> Pending Missions / Tasks Queue
              </h2>
              <span className="bg-red-500/10 text-red-500 text-xs px-3 py-1 rounded-full border border-red-500/20">
                {missions.filter(m => m.status === 'Pending').length} Active
              </span>
            </div>
            <div className="divide-y divide-slate-800">
              {missions.map((mission) => (
                <div key={mission.id} className="p-6 hover:bg-slate-800/30 transition-colors group">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-slate-200 font-medium group-hover:text-red-400 transition-colors">{mission.title}</h3>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded ${
                      mission.priority === 'Critical' ? 'bg-red-900/50 text-red-400 border border-red-500/30' :
                      mission.priority === 'High' ? 'bg-orange-900/50 text-orange-400 border border-orange-500/30' :
                      'bg-slate-800 text-slate-400 border border-slate-700'
                    }`}>
                      {mission.priority}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                       <AlertTriangle className="w-3 h-3" /> {mission.status}
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
                <CheckCircle2 className="w-5 h-5 text-emerald-500" /> Division Status
             </h3>
             <ul className="space-y-4 text-sm text-slate-400">
               <li className="flex justify-between items-center border-b border-slate-800 pb-2">
                 <span>Active Threats</span>
                 <span className="text-slate-200 font-mono">1</span>
               </li>
               <li className="flex justify-between items-center border-b border-slate-800 pb-2">
                 <span>System Integrity</span>
                 <span className="text-emerald-400 font-mono">98%</span>
               </li>
               <li className="flex justify-between items-center border-b border-slate-800 pb-2">
                 <span>Agents Online</span>
                 <span className="text-cyan-400 font-mono">24</span>
               </li>
             </ul>
           </div>
        </div>
      </div>
    </div>
  );
}
