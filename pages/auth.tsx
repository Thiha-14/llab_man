'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/app/AuthContext';
import { User, UserRole, UserStatus } from '@/types';
import { Mail, Lock, Eye, EyeOff, User as UserIcon } from 'lucide-react';

export default function Auth() {
  const pathname = usePathname();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  const router = useRouter();
  const { handleLogin } = useAuth();

  React.useEffect(() => {
    router.prefetch('/dashboard');
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (pathname === '/login') {
      if (!email || !password) {
        alert('Please fill in all fields');
        return;
      }
      
      const mockUser: User = {
        id: '1',
        firstName: 'Admin',
        lastName: 'User',
        studentId: 'MASTER-001',
        email: email,
        phone: '+1 800 LAB ADMIN',
        registrationDate: new Date().toISOString(),
        effectiveFrom: new Date().toISOString(),
        effectiveTo: '2030-01-01',
        status: UserStatus.ACTIVE,
        role: UserRole.MASTER
      };
      
      handleLogin(mockUser);
      setTimeout(() => {
        router.push('/dashboard');
      }, 100);
    } else {
      if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
      }
      if (!name || !email || !password) {
        alert('Please fill in all fields');
        return;
      }
      
      const newUser: User = {
        id: Date.now().toString(),
        firstName: name.split(' ')[0],
        lastName: name.split(' ')[1] || '',
        studentId: 'USER-' + Date.now(),
        email: email,
        phone: '',
        registrationDate: new Date().toISOString(),
        effectiveFrom: new Date().toISOString(),
        effectiveTo: '2030-01-01',
        status: UserStatus.ACTIVE,
        role: UserRole.USER
      };
      
      handleLogin(newUser);
      setTimeout(() => {
        router.push('/dashboard');
      }, 100);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black flex items-center justify-center p-6">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-0 bg-white/10 backdrop-blur-2xl rounded-[40px] shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] overflow-hidden border border-white/20">
        
        <div className="p-12 lg:p-16 flex flex-col justify-center bg-gradient-to-br from-white/95 via-white/90 to-slate-50/95 backdrop-blur-xl">
          <div className="mb-10">
            <h1 className="text-4xl font-bold text-slate-900 mb-2">
              Welcome to SmartLab
            </h1>
            <div className="flex gap-6 mt-8 border-b border-slate-300">
              <Link
                href="/login"
                className={`pb-3 text-lg font-semibold transition-all ${
                  pathname === '/login' 
                    ? 'text-slate-900 border-b-2 border-slate-900' 
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                Login
              </Link>
              <Link
                href="/signup"
                className={`pb-3 text-lg font-semibold transition-all ${
                  pathname === '/signup' 
                    ? 'text-slate-900 border-b-2 border-slate-900' 
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                Sign up
              </Link>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {pathname === '/signup' && (
              <div className="relative">
                <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white/50 backdrop-blur-sm border border-slate-300/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all text-slate-900 placeholder-slate-500 shadow-sm"
                  placeholder="Please enter your name"
                />
              </div>
            )}

            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/50 backdrop-blur-sm border border-slate-300/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all text-slate-900 placeholder-slate-500 shadow-sm"
                placeholder="Please enter your email"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-12 py-4 bg-white/50 backdrop-blur-sm border border-slate-300/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all text-slate-900 placeholder-slate-500 shadow-sm"
                placeholder="Please enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-900 transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {pathname === '/signup' && (
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-4 bg-white/50 backdrop-blur-sm border border-slate-300/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all text-slate-900 placeholder-slate-500 shadow-sm"
                  placeholder="Confirm your password"
                />
              </div>
            )}

            {pathname === '/login' && (
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center text-slate-700 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="mr-2 w-4 h-4 rounded border-slate-400 text-slate-900 focus:ring-slate-900" 
                  />
                  <span>Remember me</span>
                </label>
                <Link href="/forgot-password" className="text-slate-700 hover:text-slate-900 font-medium">
                  Forgot password?
                </Link>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-slate-900 via-slate-800 to-black text-white py-4 rounded-2xl font-semibold hover:from-slate-800 hover:via-slate-700 hover:to-slate-900 transition-all shadow-lg shadow-black/30 hover:shadow-black/50 transform hover:-translate-y-0.5"
            >
              {pathname === '/login' ? 'Login' : 'Sign up'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-slate-600 text-sm">
              {pathname === '/login' ? "You don't have an account? " : 'Already have an account? '}
              {pathname === '/login' ? (
                <Link href="/signup" className="text-slate-900 font-semibold underline hover:text-slate-700">
                  sign up
                </Link>
              ) : (
                <Link href="/login" className="text-slate-900 font-semibold underline hover:text-slate-700">
                  login
                </Link>
              )}
            </p>
          </div>

          <div className="mt-8 mb-6 flex items-center">
            <div className="flex-1 border-t border-slate-300"></div>
            <span className="px-4 text-slate-500 text-sm">or</span>
            <div className="flex-1 border-t border-slate-300"></div>
          </div>

          <button 
            type="button"
            className="w-full flex items-center justify-center px-4 py-3.5 bg-white/50 backdrop-blur-sm border border-slate-300/50 rounded-2xl hover:bg-white/70 transition-all text-slate-700 shadow-sm"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span className="text-sm font-medium">Sign up with Google</span>
          </button>
        </div>

        <div className="hidden md:flex bg-gradient-to-br from-slate-800 via-slate-900 to-black p-12 items-center justify-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full -ml-48 -mb-48 blur-3xl"></div>
          
          <div className="relative z-10 w-full max-w-md">
            <div className="bg-white/10 backdrop-blur-xl rounded-[40px] p-8 shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] border border-white/20">
              <img 
                src="/sm.png" 
                alt="SmartLab" 
                className="w-full h-auto rounded-3xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}