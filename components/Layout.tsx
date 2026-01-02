'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FlaskConical,
  CalendarClock,
  Users,
  CalendarDays,
  UsersRound,
  LogOut,
  Menu,
  Globe,
  Bell,
  X,
  Check
} from 'lucide-react';
import { User, UserRole } from '../types';
import { useLanguage } from '@/app/LanguageContext';
import { getTranslation, LanguageCode } from '@/translations';

interface LayoutProps {
  user: User;
  onLogout: () => void;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ user, onLogout, children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isLanguageMenuOpen, setLanguageMenuOpen] = useState(false);
  const [showSignOutConfirm, setShowSignOutConfirm] = useState(false);
  const pathname = usePathname();
  const { currentLanguage, setLanguage, languages } = useLanguage();
  const t = getTranslation(currentLanguage.code as LanguageCode);

  const navItems = [
    { label: t.common.dashboard, icon: LayoutDashboard, path: '/dashboard' },
    { label: t.common.labRooms, icon: FlaskConical, path: '/labs' },
    { label: t.common.booking, icon: CalendarClock, path: '/scheduling' },
    { label: t.common.users, icon: Users, path: '/users', role: [UserRole.MASTER, UserRole.CONFIGURATOR] },
    { label: t.common.groups, icon: UsersRound, path: '/groups', role: [UserRole.MASTER, UserRole.CONFIGURATOR] },
    { label: t.common.holidays, icon: CalendarDays, path: '/off-days' },
  ];

  const closeSidebar = () => setSidebarOpen(false);
  const isActive = (path: string) => pathname === path;

  const handleSignOutClick = () => {
    setShowSignOutConfirm(true);
  };

  const handleNavigation = () => {
    closeSidebar();
  };

  const handleConfirmSignOut = () => {
    setShowSignOutConfirm(false);
    onLogout();
  };

  return (
    <div className="min-h-screen flex bg-slate-50 relative">
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm transition-opacity"
          onClick={closeSidebar}
        />
      )}

      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-zinc-950 text-white border-r border-zinc-900 transition-transform duration-300 ease-in-out transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0`}>
        <div className="flex flex-col h-full">
          <div className="p-8 flex items-center justify-between">
            <Link href="/dashboard" className="flex items-center gap-4 group">
              <img src="/sm.png" alt="SmartLab" className="w-10 h-10 rounded-xl shadow-lg group-hover:scale-105 transition-all" />
              <span className="text-xl font-bold tracking-tight group-hover:text-blue-400 transition-colors">SmartLab</span>
            </Link>
            <button onClick={closeSidebar} className="md:hidden p-2 text-zinc-500 hover:text-white transition-all">
              <X size={24} />
            </button>
          </div>

          <nav className="flex-1 px-4 py-4 space-y-1">
            {navItems.filter(item => !item.role || item.role.includes(user.role)).map((item) => (
              <Link
                key={item.path}
                href={item.path}
                onClick={handleNavigation}
                prefetch={true}
                className={`flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-200 group ${isActive(item.path)
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
                  }`}
              >
                <item.icon size={20} className={isActive(item.path) ? 'text-white' : 'text-zinc-400 group-hover:text-white'} />
                <span className="font-semibold text-sm">{item.label}</span>
              </Link>
            ))}
          </nav>

          <div className="p-6 border-t border-zinc-900">
            <button
              onClick={handleSignOutClick}
              className="flex items-center gap-4 w-full px-4 py-3 text-zinc-500 hover:bg-rose-500/10 hover:text-rose-500 rounded-xl transition-all duration-200"
            >
              <LogOut size={20} />
              <span className="font-semibold text-sm">{t.common.signOut}</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 h-screen">
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-4 md:px-10 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-xl transition-all"
            >
              <Menu size={24} />
            </button>
            <h1 className="text-base md:text-lg font-bold text-slate-900 tracking-tight line-clamp-1">
              {navItems.find(item => item.path === pathname)?.label || 'Overview'}
            </h1>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <div className="hidden sm:flex items-center gap-1">
              <div className="relative">
                <button
                  onClick={() => setLanguageMenuOpen(!isLanguageMenuOpen)}
                  className="p-2 text-slate-400 hover:text-blue-600 transition-all flex items-center gap-1 rounded-lg hover:bg-slate-100"
                  title="Change Language"
                >
                  <Globe size={18} />
                  <span className="text-[10px] font-bold uppercase">{currentLanguage.code}</span>
                </button>

                {isLanguageMenuOpen && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-slate-200 rounded-2xl shadow-xl z-50 overflow-hidden">
                    <div className="p-3 border-b border-slate-100">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest px-2">Select Language</p>
                    </div>
                    <div className="p-2 space-y-1">
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setLanguage(lang.code);
                            setLanguageMenuOpen(false);
                          }}
                          className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg transition-all text-sm font-semibold ${currentLanguage.code === lang.code
                            ? 'bg-blue-50 text-blue-600 border border-blue-200'
                            : 'text-slate-700 hover:bg-slate-50'
                            }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{lang.flag}</span>
                            <div className="text-left">
                              <p className="text-sm font-bold">{lang.name}</p>
                              <p className="text-xs text-slate-400">{lang.native}</p>
                            </div>
                          </div>
                          {currentLanguage.code === lang.code && <Check size={16} className="text-blue-600" />}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <button className="p-2 text-slate-400 hover:text-blue-600 transition-all relative">
                <Bell size={18} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
              </button>
            </div>
            <div className="hidden sm:block h-6 w-px bg-slate-200 mx-1"></div>
            <div className="flex items-center gap-3">
              <div className="text-right hidden lg:block">
                <p className="text-sm font-bold text-slate-900 leading-none">{user.firstName}</p>
                <p className="text-[10px] font-semibold text-slate-400 uppercase">{user.role}</p>
              </div>
              <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-zinc-950 text-white flex items-center justify-center font-bold text-sm shadow-md">
                {user.firstName[0]}{user.lastName[0]}
              </div>
            </div>
          </div>
        </header>

        <main className="p-4 md:p-8 flex-1 overflow-y-auto bg-slate-50">
          {children}
        </main>

        {/* Sign Out Confirmation Modal */}
        {showSignOutConfirm && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
            <div className="bg-white w-full max-w-sm rounded-[32px] shadow-2xl overflow-hidden p-8 animate-in zoom-in-95 duration-300">
              {/* Header with icon */}
              <div className="flex flex-col items-center mb-6">
                <div className="w-16 h-16 bg-rose-50 rounded-2xl flex items-center justify-center mb-4">
                  <LogOut size={32} className="text-rose-500" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 text-center">Sign Out?</h2>
              </div>

              {/* Message */}
              <p className="text-center text-slate-600 text-base mb-8 leading-relaxed">
                Are you sure you want to sign out? You'll need to log in again to access your account.
              </p>

              {/* Divider */}
              <div className="h-px bg-slate-100 mb-6"></div>

              {/* Buttons */}
              <div className="flex gap-3 flex-col-reverse sm:flex-row">
                <button
                  onClick={() => setShowSignOutConfirm(false)}
                  className="flex-1 py-3 font-bold text-slate-700 bg-slate-100 rounded-2xl hover:bg-slate-200 transition-all text-sm uppercase tracking-wide"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmSignOut}
                  className="flex-1 py-3 font-bold text-white bg-rose-500 rounded-2xl hover:bg-rose-600 shadow-lg hover:shadow-rose-500/30 transition-all text-sm uppercase tracking-wide flex items-center justify-center gap-2"
                >
                  <LogOut size={16} />
                  Yes, Sign Out
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(Layout);
