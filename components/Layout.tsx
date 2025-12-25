
import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
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
  X
} from 'lucide-react';
import { User, UserRole } from '../types';

interface LayoutProps {
  user: User;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ user, onLogout }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { label: 'Home', icon: LayoutDashboard, path: '/' },
    { label: 'Lab Rooms', icon: FlaskConical, path: '/labs' },
    { label: 'Booking', icon: CalendarClock, path: '/scheduling' },
    { label: 'Users', icon: Users, path: '/users', role: [UserRole.MASTER, UserRole.CONFIGURATOR] },
    { label: 'Groups', icon: UsersRound, path: '/groups', role: [UserRole.MASTER, UserRole.CONFIGURATOR] },
    { label: 'Holidays', icon: CalendarDays, path: '/off-days' },
  ];

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="min-h-screen flex bg-slate-50 relative">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm transition-opacity"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar - Deep Black */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-zinc-950 text-white border-r border-zinc-900 transition-transform duration-300 ease-in-out transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0`}>
        <div className="flex flex-col h-full">
          <div className="p-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-bold text-xl shadow-lg shadow-blue-500/20">SL</div>
              <span className="text-xl font-bold tracking-tight">SmartLab</span>
            </div>
            <button onClick={closeSidebar} className="md:hidden p-2 text-zinc-500 hover:text-white transition-all">
              <X size={24} />
            </button>
          </div>

          <nav className="flex-1 px-4 py-4 space-y-1">
            {navItems.filter(item => !item.role || item.role.includes(user.role)).map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={closeSidebar}
                className={`flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-200 group ${
                  location.pathname === item.path 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
                }`}
              >
                <item.icon size={20} className={location.pathname === item.path ? 'text-white' : 'text-zinc-400 group-hover:text-white'} />
                <span className="font-semibold text-sm">{item.label}</span>
              </Link>
            ))}
          </nav>

          <div className="p-6 border-t border-zinc-900">
            <button
              onClick={onLogout}
              className="flex items-center gap-4 w-full px-4 py-3 text-zinc-500 hover:bg-rose-500/10 hover:text-rose-500 rounded-xl transition-all duration-200"
            >
              <LogOut size={20} />
              <span className="font-semibold text-sm">Sign Out</span>
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
              {navItems.find(item => item.path === location.pathname)?.label || 'Overview'}
            </h1>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <div className="hidden sm:flex items-center gap-1">
              <button className="p-2 text-slate-400 hover:text-blue-600 transition-all"><Globe size={18} /></button>
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
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
