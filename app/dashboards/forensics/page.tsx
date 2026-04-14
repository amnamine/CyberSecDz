'use client';

import { Search, Clock, FileWarning, SearchCode } from 'lucide-react';

export default function ForensicsDashboard() {
  const missions = [
    { id: 1, title: 'Extract memory dump from Compromised Server #42', priority: 'High', status: 'Pending', time: '1 hr ago' },
    { id: 2, title: 'Analyze malware signature from phishing campaign', priority: 'Critical', status: 'In Progress', time: '5 hours ago' },
  ];

  return (
    <div className="p-8 pb-20 max-w-6xl mx-auto min-h-screen">
      <div className="flex items-center gap-4 mb-10 border-b border-indigo-900/30 pb-6">
        <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-900 flex items-center justify-center text-indigo-500">
          <Search className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-slate-100">Forensics Division</h1>
          <p className="text-indigo-400/80 text-sm tracking-widest uppercase mt-1">Digital Investigations Unit</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl overflow-hidden backdrop-blur-sm">
            <div className="bg-slate-900/80 px-6 py-4 border-b border-slate-800 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-slate-200 flex items-center gap-2">
                <Clock className="w-5 h-5 text-indigo-500" /> Pending Case Queues
              </h2>
            </div>
            <div className="divide-y divide-slate-800">
              {missions.map((mission) => (
                <div key={mission.id} className="p-6 hover:bg-slate-800/30 transition-colors group">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-slate-200 font-medium group-hover:text-indigo-400 transition-colors">{mission.title}</h3>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                       <FileWarning className="w-3 h-3 text-yellow-500" /> {mission.status}
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
                <SearchCode className="w-5 h-5 text-purple-500" /> Lab Environment Status
             </h3>
             <ul className="space-y-4 text-sm text-slate-400">
               <li className="flex justify-between items-center border-b border-slate-800 pb-2">
                 <span>Active Sandboxes</span>
                 <span className="text-purple-400 font-mono">4 / 10</span>
               </li>
               <li className="flex justify-between items-center border-b border-slate-800 pb-2">
                 <span>Cases Solved (Month)</span>
                 <span className="text-slate-200 font-mono">14</span>
               </li>
             </ul>
           </div>
        </div>
      </div>
    </div>
  );
}
