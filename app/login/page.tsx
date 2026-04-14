'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Lock, User, ArrowRight, ShieldAlert } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function LoginPage() {
  const { t } = useLanguage();
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      
      if (res.ok) {
        localStorage.setItem('auth_token', data.token);
        router.push('/dashboard');
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      console.error(err);
      setError('An unexpected error occurred');
    }
  };

  const handleGoogleLogin = async () => {
    // OAuth Mock Flow
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ oauth: 'google' })
    });
    const data = await res.json();
    if (res.ok) {
      localStorage.setItem('auth_token', data.token);
      router.push('/dashboard');
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 relative">
      <div className="w-full max-w-md z-10">
        <div className="glass-panel p-8 rounded-2xl border border-slate-700 relative overflow-hidden text-center shadow-2xl bg-slate-900/80 backdrop-blur-md">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-emerald-400"></div>
          
          <div className="flex justify-center mb-6">
            <div className="h-16 w-16 rounded-full bg-cyan-900/30 flex items-center justify-center border border-cyan-500/30">
              <Lock className="h-8 w-8 text-cyan-400" />
            </div>
          </div>
          
          <h1 className="text-2xl font-bold text-white mb-2 neon-text">{t('auth.login.title')}</h1>
          <p className="text-slate-400 text-sm mb-6">{t('auth.login.desc')}</p>
          
          {error && <div className="mb-4 text-red-400 text-sm">{error}</div>}

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <User className="h-5 w-5 text-slate-500" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-slate-900/50 border border-slate-700 text-white text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full pl-10 p-3 outline-none transition-colors"
                  placeholder="Enter your username"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-500" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-slate-900/50 border border-slate-700 text-white text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full pl-10 p-3 outline-none transition-colors"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>
            
            <button
              type="submit"
              className="w-full flex justify-center items-center h-12 rounded-lg bg-cyan-600 px-6 font-medium text-white shadow-lg transition-all hover:bg-cyan-500 focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-slate-900 mt-2"
            >
              Sign In <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </form>
          
          <div className="mt-4">
            <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-slate-700"></div>
                <span className="flex-shrink-0 mx-4 text-slate-500 text-xs uppercase tracking-wider">Or</span>
                <div className="flex-grow border-t border-slate-700"></div>
            </div>
            
            <button
              onClick={handleGoogleLogin}
              type="button"
              className="w-full flex justify-center items-center h-12 rounded-lg bg-white/5 border border-slate-700 px-6 font-medium text-white shadow-sm transition-all hover:bg-white/10 mt-2"
            >
              <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>
          </div>
          
          <div className="mt-6 text-sm text-slate-400">
            {t('auth.login.noAccount')}{' '}
            <Link href="/register" className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors">
              {t('auth.login.createAccount')}
            </Link>
          </div>
        </div>
      </div>
      
      {/* Admin Dashboard Access */}
      <div className="absolute bottom-6 w-full flex justify-center z-10">
        <Link href="/admin-auth" className="inline-flex items-center justify-center space-x-2 text-sm text-slate-400 hover:text-cyan-400 font-medium transition-colors bg-slate-900/60 py-2 px-5 rounded-full border border-slate-700 hover:border-cyan-500/50 backdrop-blur-sm shadow-lg">
          <ShieldAlert className="h-4 w-4" />
          <span>Admin Access</span>
        </Link>
      </div>
    </div>
  );
}
