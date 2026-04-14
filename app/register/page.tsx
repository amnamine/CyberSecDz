'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CreditCard, User, Lock, ArrowRight, ArrowLeft } from 'lucide-react';

export default function RegisterWizard() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  
  // Step 1 State
  const [basicInfo, setBasicInfo] = useState({ fullName: '', email: '' });
  const [cardInfo, setCardInfo] = useState({ face: '', number: '' });
  
  // Step 2 State
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const nextStep = () => {
    if (!basicInfo.fullName || !basicInfo.email || !cardInfo.face || !cardInfo.number) {
      setError('Please fill out all fields before proceeding.');
      return;
    }
    setError('');
    setStep(2);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Please choose a username and password.');
      return;
    }
    setError('');
    
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ basicInfo, username, password, cardInfo })
      });
      const data = await res.json();
      
      if (res.ok) {
        // Automatically log them in after registration by calling login
        const loginRes = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        const loginData = await loginRes.json();
        if (loginRes.ok) {
            localStorage.setItem('auth_token', loginData.token);
            router.push('/dashboard/user');
        } else {
            router.push('/login');
        }
      } else {
        setError(data.error || 'Registration failed');
      }
    } catch (err) {
      console.error(err);
      setError('System error occurred during registration.');
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="glass-panel p-8 rounded-2xl border border-slate-700 relative overflow-hidden text-left shadow-2xl bg-slate-900/80 backdrop-blur-md">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-cyan-400"></div>
          
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold text-white neon-text">
                {step === 1 ? 'Personal Information' : 'Account Setup'}
            </h1>
            <div className="text-xs font-mono text-cyan-400 border border-cyan-400/30 px-2 py-1 rounded bg-cyan-900/20">
                Step {step} / 2
            </div>
          </div>
          
          {error && <div className="mb-4 text-red-400 text-sm bg-red-900/10 p-2 rounded">{error}</div>}

          {step === 1 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={basicInfo.fullName}
                    onChange={(e) => setBasicInfo({...basicInfo, fullName: e.target.value})}
                    className="bg-slate-900/50 border border-slate-700 text-white text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 outline-none"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Email</label>
                  <input
                    type="email"
                    value={basicInfo.email}
                    onChange={(e) => setBasicInfo({...basicInfo, email: e.target.value})}
                    className="bg-slate-900/50 border border-slate-700 text-white text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 outline-none"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="mt-6 border-t border-slate-700 pt-4">
                  <h3 className="text-sm font-semibold text-slate-200 mb-4 flex items-center">
                    <CreditCard className="w-4 h-4 mr-2 text-emerald-400" /> Identity / Card Details
                  </h3>
                  
                  <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-medium text-slate-400 mb-1">Card Face / ID Title</label>
                        <input
                            type="text"
                            value={cardInfo.face}
                            onChange={(e) => setCardInfo({...cardInfo, face: e.target.value})}
                            className="bg-slate-900/50 border border-slate-700 text-white text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 outline-none"
                            placeholder="National ID Front"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-400 mb-1">Card Number (Securely Isolated)</label>
                        <input
                            type="text"
                            value={cardInfo.number}
                            onChange={(e) => setCardInfo({...cardInfo, number: e.target.value})}
                            className="bg-slate-900/50 border border-slate-700 text-white text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 outline-none"
                            placeholder="XXXX-XXXX-XXXX-XXXX"
                        />
                      </div>
                  </div>
              </div>
              
              <button
                type="button"
                onClick={nextStep}
                className="w-full flex justify-center items-center h-12 rounded-lg bg-emerald-600 px-6 font-medium text-white shadow-lg transition-all hover:bg-emerald-500 mt-6"
              >
                Proceed to Credentials <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          )}

          {step === 2 && (
            <form onSubmit={handleRegister} className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
               <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Choose Username</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <User className="h-4 w-4 text-slate-500" />
                    </div>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="bg-slate-900/50 border border-slate-700 text-white text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full pl-10 p-3 outline-none"
                      placeholder="Unique Username"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Create Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Lock className="h-4 w-4 text-slate-500" />
                    </div>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-slate-900/50 border border-slate-700 text-white text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full pl-10 p-3 outline-none"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <div className="flex gap-4 mt-6">
                    <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="flex items-center justify-center h-12 w-16 rounded-lg bg-slate-800 text-white hover:bg-slate-700 transition"
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </button>
                    <button
                        type="submit"
                        className="flex-1 flex justify-center items-center h-12 rounded-lg bg-cyan-600 px-6 font-medium text-white shadow-lg transition-all hover:bg-cyan-500 focus:ring-2"
                    >
                        Complete Registration <ArrowRight className="ml-2 h-4 w-4" />
                    </button>
                </div>
            </form>
          )}
          
          <div className="mt-6 text-center text-sm text-slate-400">
            Already have an account?{' '}
            <Link href="/login" className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
