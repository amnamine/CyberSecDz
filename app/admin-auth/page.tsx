'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldAlert, User, Lock, ArrowRight } from 'lucide-react';

export default function AdminAuthPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      const res = await fetch('/api/auth/admin-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      
      if (res.ok) {
        localStorage.setItem('admin_token', data.token);
        
        // Role-based routing
        if (data.role === 'admin') router.push('/admin');
        else if (data.role === 'security_family') router.push('/dashboards/security-family');
        else if (data.role === 'forensic') router.push('/dashboards/forensics');
        else if (data.role === 'web_side') router.push('/dashboards/web-side');
        else if (data.role === 'big_company_security') router.push('/dashboards/big-company-security');
        else router.push('/dashboards/general');
      } else {
        setError(data.error || 'Admin Authentication Failed');
      }
    } catch (err) {
      console.error(err);
      setError('System Error');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-950">
      <div className="w-full max-w-sm">
        <div className="border border-red-900/50 p-8 rounded-md bg-black shadow-2xl">
          <div className="flex justify-center mb-6">
            <ShieldAlert className="h-10 w-10 text-red-600" />
          </div>
          
          <h1 className="text-xl font-bold text-red-500 mb-6 text-center tracking-widest uppercase">System Access</h1>
          
          {error && <div className="mb-4 text-red-500 text-xs text-center">{error}</div>}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <User className="h-4 w-4 text-red-900" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-zinc-900 border border-red-900/30 text-red-100 text-sm rounded focus:ring-red-600 focus:border-red-600 block w-full pl-10 p-2.5 outline-none"
                  placeholder="Identification"
                  required
                />
              </div>
            </div>
            
            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Lock className="h-4 w-4 text-red-900" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-zinc-900 border border-red-900/30 text-red-100 text-sm rounded focus:ring-red-600 focus:border-red-600 block w-full pl-10 p-2.5 outline-none"
                  placeholder="Passcode"
                  required
                />
              </div>
            </div>
            
            <button
              type="submit"
              className="w-full flex justify-center items-center h-10 rounded bg-red-900 hover:bg-red-800 text-red-100 font-semibold uppercase tracking-wider text-sm transition-colors mt-4"
            >
              Initialize <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
