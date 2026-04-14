'use client';

import { motion } from 'framer-motion';
import { ShieldAlert, ShieldCheck, Lock, Search, Fingerprint, Server } from 'lucide-react';

export default function HeroAnimation() {
  return (
    <div className="relative w-full h-full min-h-[400px] flex items-center justify-center">
      {/* Central Shield */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 flex h-32 w-32 items-center justify-center rounded-2xl glass-panel neon-border bg-slate-900/50"
      >
        <ShieldCheck className="h-16 w-16 text-cyan-400 drop-shadow-[0_0_15px_rgba(6,182,212,0.8)]" />
      </motion.div>

      {/* Orbiting Elements */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 z-0 flex items-center justify-center"
      >
        <div className="relative h-64 w-64 rounded-full border border-cyan-500/20 shadow-[0_0_30px_rgba(6,182,212,0.1)]">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-slate-900 p-2 border border-cyan-500/30">
            <Lock className="h-5 w-5 text-cyan-500" />
          </div>
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-slate-900 p-2 border border-emerald-500/30">
            <Fingerprint className="h-5 w-5 text-emerald-500" />
          </div>
          <div className="absolute top-1/2 -left-4 -translate-y-1/2 rounded-full bg-slate-900 p-2 border border-rose-500/30">
            <ShieldAlert className="h-5 w-5 text-rose-500" />
          </div>
        </div>
      </motion.div>
      
      {/* Outer Orbit */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 z-0 flex items-center justify-center"
      >
        <div className="relative h-96 w-96 rounded-full border border-emerald-500/10 border-dashed">
          <div className="absolute top-1/4 -right-2 rounded-full bg-slate-900 p-2 border border-slate-700">
            <Search className="h-4 w-4 text-slate-400" />
          </div>
          <div className="absolute bottom-1/4 -left-2 rounded-full bg-slate-900 p-2 border border-slate-700">
            <Server className="h-4 w-4 text-slate-400" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
