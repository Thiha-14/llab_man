
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';

const ForgotPassword: React.FC = () => {
  const [isSent, setIsSent] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white p-10 rounded-[40px] shadow-2xl border border-white">
        <div className="mb-8">
          <Link to="/login" className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-600 font-bold text-sm transition-colors mb-8">
            <ArrowLeft size={16} />
            Back to Login
          </Link>
          <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Reset Password</h1>
          <p className="text-slate-500 font-medium">No worries, we'll send you reset instructions.</p>
        </div>

        {isSent ? (
          <div className="text-center space-y-6 py-4 animate-in zoom-in-95 duration-300">
             <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
               <CheckCircle2 size={40} />
             </div>
             <h3 className="text-xl font-bold text-slate-900">Email Sent!</h3>
             <p className="text-slate-500">We've sent a password reset link to <span className="text-slate-900 font-bold">your-email@edu.com</span></p>
             <button onClick={() => setIsSent(false)} className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all">Try again</button>
          </div>
        ) : (
          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setIsSent(true); }}>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input type="email" required placeholder="name@university.edu" className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
              </div>
            </div>

            <button type="submit" className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-xl shadow-blue-200 hover:bg-blue-700 hover:-translate-y-1 transition-all">
              Send Reset Link
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
