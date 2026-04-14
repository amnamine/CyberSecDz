import type { Metadata } from 'next';
import './globals.css';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { LanguageProvider } from '@/context/LanguageContext';

export const metadata: Metadata = {
  title: 'Algerian Security Platform | Trusted Intermediary',
  description: 'A trusted cybersecurity intermediary for Algerian citizens and companies.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="dark">
      <body className="min-h-screen bg-cyber-darker text-slate-200 antialiased selection:bg-cyan-500/30 selection:text-cyan-200">
        <LanguageProvider>
          {/* Background Ambient Glow */}
          <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
            <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-cyan-900/20 blur-[120px]" />
            <div className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] rounded-full bg-emerald-900/10 blur-[120px]" />
          </div>
          
          <div className="relative flex min-h-screen flex-col">
            <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-slate-950/50 backdrop-blur-xl supports-[backdrop-filter]:bg-slate-950/20">
              <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-cyan-500/10 border border-cyan-500/20">
                    <span className="text-xl font-bold text-cyan-400">DZ</span>
                  </div>
                  <span className="text-lg font-bold tracking-tight text-white neon-text">CyberSec</span>
                </div>
                <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                  <a href="/" className="text-slate-300 hover:text-cyan-400 transition-colors">Home</a>
                  <a href="/services" className="text-slate-300 hover:text-cyan-400 transition-colors">Services</a>
                  <a href="/report" className="text-slate-300 hover:text-cyan-400 transition-colors">Report Issue</a>
                </nav>
                <div className="flex items-center gap-4">
                  <LanguageSwitcher />
                  <a href="/login" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Sign In</a>
                  <a href="/register" className="inline-flex h-9 items-center justify-center rounded-md bg-cyan-600 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-cyan-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-500">
                    Get Protected
                  </a>
                </div>
              </div>
            </header>
            
            <main className="flex-1">
              {children}
            </main>
            
            <footer className="border-t border-white/5 py-6 md:py-0 bg-slate-950/80">
              <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row px-4">
                <p className="text-center text-sm leading-loose text-slate-400 md:text-left">
                  Built for Algeria. Connecting citizens, companies, and security professionals.
                </p>
                <div className="flex items-center gap-4 text-sm text-slate-400">
                  <a href="#" className="hover:text-cyan-400 transition-colors">Privacy</a>
                  <a href="#" className="hover:text-cyan-400 transition-colors">Terms</a>
                </div>
              </div>
            </footer>
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
