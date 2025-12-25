import React from 'react';
import { Globe, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LanguageSelection: React.FC = () => {
  const navigate = useNavigate();
  const languages = [
    { code: 'en', name: 'English', native: 'English', flag: '🇺🇸' },
    { code: 'ar', name: 'Arabic', native: 'العربية', flag: '🇸🇦' },
    { code: 'fr', name: 'French', native: 'Français', flag: '🇫🇷' },
    { code: 'tr', name: 'Turkish', native: 'Türkçe', flag: '🇹🇷' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md bg-white p-8 rounded-[40px] shadow-2xl border border-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-400 to-blue-600"></div>
        
        <div className="flex flex-col items-center mb-10">
          <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center mb-6 text-blue-600">
            <Globe size={40} strokeWidth={1.5} />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Select Language</h1>
          <p className="text-slate-500 text-center font-medium">Please choose your preferred language to continue.</p>
        </div>

        <div className="space-y-4 mb-8">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => navigate('/login')}
              className="w-full flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-3xl hover:border-blue-500 hover:bg-blue-50 hover:shadow-lg hover:shadow-blue-500/5 transition-all group"
            >
              <div className="flex items-center gap-4">
                <span className="text-2xl">{lang.flag}</span>
                <div className="text-left">
                  <p className="font-bold text-slate-800">{lang.name}</p>
                  <p className="text-xs text-slate-400 font-medium">{lang.native}</p>
                </div>
              </div>
              <ChevronRight className="text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" size={20} />
            </button>
          ))}
        </div>

        <p className="text-center text-xs text-slate-400 font-medium">
          Language preferences can be changed later in settings.
        </p>
      </div>
      
      <div className="mt-8 text-slate-400 text-sm font-semibold tracking-widest uppercase">
        SmartLab Enterprise Ecosystem
      </div>
    </div>
  );
};

export default LanguageSelection;