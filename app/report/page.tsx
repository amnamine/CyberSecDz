'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ShieldAlert, Paperclip, Send, AlertTriangle, Info, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

function ReportPageContent() {
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const defaultType = searchParams.get('type') || 'personal';
  
  const [reportType, setReportType] = useState(defaultType);
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
        <div className="glass-panel p-8 rounded-2xl border border-emerald-500/50 text-center max-w-md w-full">
          <div className="flex justify-center mb-6">
            <div className="h-20 w-20 rounded-full bg-emerald-900/30 flex items-center justify-center border border-emerald-500/30">
              <CheckCircle2 className="h-10 w-10 text-emerald-400" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">{t('report.success.title')}</h2>
          <p className="text-slate-400 mb-6">
            {t('report.success.desc')}
            <br />
            Case ID: <span className="text-cyan-400 font-mono">#DZ-1044</span>
          </p>
          <a href="/dashboard" className="inline-flex h-12 w-full items-center justify-center rounded-lg bg-cyan-600 px-6 font-medium text-white shadow-lg transition-all hover:bg-cyan-500">
            {t('report.success.btn')}
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2 neon-text flex items-center">
          <ShieldAlert className="mr-3 h-8 w-8 text-cyan-400" />
          {t('report.title')}
        </h1>
        <p className="text-slate-400">
          {t('report.desc')}
        </p>
      </div>

      <div className="glass-panel p-6 md:p-8 rounded-2xl border border-slate-700">
        <div className="flex gap-4 mb-8">
          <button 
            onClick={() => setReportType('personal')}
            className={`flex-1 py-3 px-4 rounded-lg font-medium text-sm transition-all ${reportType === 'personal' ? 'bg-cyan-600 text-white shadow-[0_0_15px_rgba(6,182,212,0.4)]' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
          >
            {t('report.type.personal')}
          </button>
          <button 
            onClick={() => setReportType('company')}
            className={`flex-1 py-3 px-4 rounded-lg font-medium text-sm transition-all ${reportType === 'company' ? 'bg-emerald-600 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)]' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
          >
            {t('report.type.company')}
          </button>
        </div>

        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
          
          {reportType === 'personal' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">{t('report.label.category')}</label>
                <select className="bg-slate-900/50 border border-slate-700 text-white text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-3 outline-none appearance-none">
                  <option>Hacked Social Media Account</option>
                  <option>Stolen Email Address</option>
                  <option>Online Blackmail / Extortion</option>
                  <option>Identity Theft</option>
                  <option>Digital Fraud</option>
                  <option>Other Consultation</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">{t('report.label.risk')}</label>
                <div className="grid grid-cols-3 gap-3">
                  <label className="flex items-center p-3 rounded-lg border border-slate-700 bg-slate-800/50 cursor-pointer hover:bg-slate-700 transition-colors">
                    <input type="radio" name="risk" className="text-cyan-500 focus:ring-cyan-500 bg-slate-900 border-slate-600" />
                    <span className="ml-2 text-sm text-slate-300">Low</span>
                  </label>
                  <label className="flex items-center p-3 rounded-lg border border-orange-500/30 bg-orange-500/10 cursor-pointer hover:bg-orange-500/20 transition-colors">
                    <input type="radio" name="risk" className="text-orange-500 focus:ring-orange-500 bg-slate-900 border-slate-600" />
                    <span className="ml-2 text-sm text-orange-200">Medium</span>
                  </label>
                  <label className="flex items-center p-3 rounded-lg border border-rose-500/30 bg-rose-500/10 cursor-pointer hover:bg-rose-500/20 transition-colors">
                    <input type="radio" name="risk" defaultChecked className="text-rose-500 focus:ring-rose-500 bg-slate-900 border-slate-600" />
                    <span className="ml-2 text-sm text-rose-200">High / Critical</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {reportType === 'company' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">{t('report.label.company')}</label>
                <input type="text" required className="bg-slate-900/50 border border-slate-700 text-white text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-3 outline-none" placeholder="Enter your company name" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">{t('report.label.service')}</label>
                <select className="bg-slate-900/50 border border-slate-700 text-white text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-3 outline-none appearance-none">
                  <option>Server Security Audit</option>
                  <option>Web Application Penetration Testing</option>
                  <option>Network Vulnerability Assessment</option>
                  <option>Data Protection Consultation</option>
                  <option>Incident Response (Active Attack)</option>
                </select>
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              {t('report.label.description')}
              <span className="ml-2 text-xs text-slate-500 font-normal">{t('report.label.description_hint')}</span>
            </label>
            <textarea 
              rows={5} 
              required
              className="bg-slate-900/50 border border-slate-700 text-white text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-3 outline-none resize-y" 
              placeholder={t('report.placeholder.description')}
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">{t('report.label.evidence')}</label>
            <div className="border-2 border-dashed border-slate-700 rounded-xl p-6 bg-slate-900/30 flex flex-col items-center justify-center cursor-pointer hover:border-cyan-500/50 transition-colors">
              <Paperclip className="h-8 w-8 text-slate-500 mb-2" />
              <p className="text-sm text-slate-400">Click to upload screenshots or logs</p>
              <p className="text-xs text-slate-500 mt-1">Up to 5 files, 10MB each</p>
            </div>
          </div>

          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 flex gap-3 text-sm text-slate-300">
            <Info className="h-5 w-5 text-cyan-500 shrink-0" />
            <p>
              {t('report.info')}
            </p>
          </div>

          <button 
            type="submit"
            className={`w-full flex justify-center items-center h-12 rounded-lg font-medium text-white shadow-lg transition-all ${reportType === 'company' ? 'bg-emerald-600 hover:bg-emerald-500' : 'bg-cyan-600 hover:bg-cyan-500'}`}
          >
            <Send className="mr-2 h-4 w-4" /> 
            {t('report.btn.submit')}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function ReportPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-cyan-500">Loading secure form...</div>}>
      <ReportPageContent />
    </Suspense>
  );
}
