import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import { User, UserRole, UserStatus } from '../types';

interface LoginProps {
  onLogin: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    // Mock Login Logic
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

    onLogin(mockUser);
    navigate('/');
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Left side: Form */}
      <div className="flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-600 text-white font-bold text-2xl mb-6 shadow-lg shadow-blue-200">SL</div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome Back</h1>
            <p className="text-slate-500">Sign in to manage your lab resources and equipment.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 bg-rose-50 text-rose-600 text-sm font-medium rounded-xl border border-rose-100 flex items-center gap-2">
                <CheckCircle2 size={16} className="text-rose-500" />
                {error}
              </div>
            )}

            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-700">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@smartlab.com"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-slate-700">Password</label>
                <Link to="/forgot-password" title="Forgot Password" className="text-sm font-bold text-blue-600 hover:underline">Forgot?</Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input type="checkbox" id="remember" className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
              <label htmlFor="remember" className="text-sm text-slate-600 font-medium">Remember me for 30 days</label>
            </div>

            <button 
              type="submit" 
              className="w-full py-3.5 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 hover:-translate-y-0.5 active:translate-y-0 transition-all"
            >
              Sign In
            </button>
          </form>

          <div className="text-center">
            <p className="text-slate-500 text-sm">
              Don't have an account? <Link to="/signup" className="text-blue-600 font-bold hover:underline">Create an account</Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right side: Branding/Image */}
      <div className="hidden lg:flex flex-col justify-center p-12 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-slate-800/50 rounded-full blur-[80px] -ml-24 -mb-24"></div>
        
        <div className="relative z-10 max-w-lg">
          <div className="mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">Version 2.4 Enterprise</span>
            <h2 className="text-5xl font-extrabold leading-tight mb-6">Digital Ecosystem for Laboratory Excellence</h2>
            <p className="text-lg text-slate-400 leading-relaxed">
              SmartLab empowers institutions to manage complex resources, schedules, and compliance in one unified interface. Built for performance, designed for people.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-2">
              <p className="text-3xl font-bold">99.9%</p>
              <p className="text-sm text-slate-500 font-medium uppercase tracking-wider">Uptime Reliability</p>
            </div>
            <div className="space-y-2">
              <p className="text-3xl font-bold">50k+</p>
              <p className="text-sm text-slate-500 font-medium uppercase tracking-wider">Active Assets</p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-12 left-12 flex items-center gap-4">
          <div className="flex -space-x-3">
            {[1,2,3,4].map(i => (
              <img key={i} src={`https://i.pravatar.cc/100?u=${i+10}`} className="w-10 h-10 rounded-full border-2 border-slate-900" alt="User" />
            ))}
          </div>
          <p className="text-sm text-slate-500 font-medium italic">Trusted by 200+ global research centers</p>
        </div>
      </div>
    </div>
  );
};

export default Login;