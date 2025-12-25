import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Phone, Hash, ArrowRight } from 'lucide-react';

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-xl bg-white rounded-[40px] shadow-2xl border border-white overflow-hidden flex flex-col md:flex-row">
        {/* Left Visual Area */}
        <div className="hidden md:flex md:w-1/3 bg-blue-600 p-8 flex-col justify-between text-white relative">
           <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
           <div className="relative z-10">
             <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center font-bold text-xl backdrop-blur-md mb-8">SL</div>
             <h2 className="text-3xl font-bold leading-tight mb-4">Join the Lab Network.</h2>
             <p className="text-blue-100 text-sm opacity-80">Access state-of-the-art facilities and equipment with a single unified account.</p>
           </div>
           <div className="relative z-10 flex gap-1">
             {[1,2,3].map(i => (
               <div key={i} className={`h-1 rounded-full transition-all ${step === i ? 'w-8 bg-white' : 'w-2 bg-white/30'}`}></div>
             ))}
           </div>
        </div>

        {/* Right Form Area */}
        <div className="flex-1 p-8 md:p-12">
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Create Account</h1>
            <p className="text-slate-500 font-medium">Please provide your details to register.</p>
          </div>

          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">First Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input type="text" placeholder="John" className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Last Name</label>
                <input type="text" placeholder="Doe" className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Student ID</label>
              <div className="relative">
                <Hash className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input type="text" placeholder="STU-00123" className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input type="email" placeholder="john.doe@university.edu" className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input type="password" placeholder="••••••••" className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
              </div>
            </div>

            <button type="button" className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-xl shadow-blue-200 hover:bg-blue-700 hover:-translate-y-1 transition-all flex items-center justify-center gap-2">
              Complete Registration
              <ArrowRight size={18} />
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-slate-400 text-sm font-medium">
              Already a member? <Link to="/login" className="text-blue-600 font-bold hover:underline">Sign In here</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;