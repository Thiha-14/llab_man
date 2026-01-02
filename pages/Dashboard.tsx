'use client';

import React, { useState, useEffect } from 'react';
import {
  Users, FlaskConical, AlertTriangle, ChevronRight, ShieldCheck, Activity, Clock
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useLanguage } from '@/app/LanguageContext';
import { getTranslation, LanguageCode } from '@/translations';

const dataUsage = [
  { name: 'Mon', usage: 45 },
  { name: 'Tue', usage: 52 },
  { name: 'Wed', usage: 38 },
  { name: 'Thu', usage: 65 },
  { name: 'Fri', usage: 48 },
  { name: 'Sat', usage: 20 },
  { name: 'Sun', usage: 15 },
];

const Dashboard: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const t = getTranslation(currentLanguage.code as LanguageCode);
  const [counts, setCounts] = useState({ users: 0, labs: 0, equipment: 0, maintenance: 0 });

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('sl_users') || '[]');
    const labs = JSON.parse(localStorage.getItem('sl_labs') || '[]');
    const equip = JSON.parse(localStorage.getItem('sl_equipment') || '[]');
    const bookings = JSON.parse(localStorage.getItem('sl_bookings') || '[]');

    setCounts({
      users: users.length,
      labs: labs.length,
      equipment: equip.length,
      maintenance: bookings.filter((b: any) => b.type === 'Maintenance').length
    });
  }, []);

  const stats = [
    { label: t.common.totalUsers, value: counts.users, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: t.common.labRooms, value: counts.labs, icon: FlaskConical, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: t.common.equipmentCount, value: counts.equipment, icon: ShieldCheck, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: t.common.maintenanceCount, value: counts.maintenance, icon: AlertTriangle, color: 'text-amber-600', bg: 'bg-amber-50' },
  ];

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">{t.common.mainDashboard}</h2>
          <p className="text-sm md:text-base text-slate-500 font-medium">{t.common.labStatusOverview}</p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none px-4 md:px-6 py-3 text-xs md:text-sm font-bold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all">{t.common.report}</button>
          <button className="flex-1 md:flex-none px-4 md:px-6 py-3 text-xs md:text-sm font-bold text-white bg-blue-600 rounded-xl shadow-md hover:bg-blue-700 transition-all">{t.common.newBooking}</button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-5 md:p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
            <div className={`w-10 h-10 md:w-12 md:h-12 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center mb-4`}>
              <stat.icon size={20} className="md:w-6 md:h-6" />
            </div>
            <div>
              <p className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{stat.label}</p>
              <h3 className="text-2xl md:text-3xl font-bold text-slate-900 leading-none">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        <div className="lg:col-span-2 bg-white p-5 md:p-8 rounded-4xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="mb-6 md:mb-8">
            <h3 className="text-lg md:text-xl font-bold text-slate-900">{t.common.labUsageHistory}</h3>
            <p className="text-xs md:text-sm text-slate-400">{t.common.weeklyActivity}</p>
          </div>
          <div className="h-50 sm:h-62.5 md:h-75 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dataUsage}>
                <defs>
                  <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10 }} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }} />
                <Area type="monotone" dataKey="usage" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorUsage)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-zinc-950 p-6 md:p-8 rounded-4xl shadow-lg text-white">
            <h3 className="text-lg md:text-xl font-bold mb-6 flex items-center gap-2">
              <Activity size={20} className="text-blue-500" /> Recent Updates
            </h3>
            <div className="space-y-4">
              {[
                { text: 'Lab 1 Temp: 22°C', type: 'Status', color: 'text-emerald-400' },
                { text: 'System Running Well', type: 'Stats', color: 'text-blue-400' },
                { text: '3 New Member Requests', type: 'Alert', color: 'text-amber-400' },
              ].map((alert, idx) => (
                <div key={idx} className="p-3 md:p-4 bg-white/5 rounded-2xl border border-white/10 flex justify-between items-center">
                  <div>
                    <p className="text-[11px] md:text-xs font-bold text-white mb-1">{alert.text}</p>
                    <span className={`text-[9px] md:text-[10px] font-bold uppercase ${alert.color}`}>{alert.type}</span>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 md:mt-8 py-3 bg-blue-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-all text-xs md:text-sm">
              View All
              <ChevronRight size={16} />
            </button>
          </div>

          <div className="bg-white p-5 md:p-6 rounded-4xl border border-slate-100 shadow-sm flex items-center gap-4">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
              <Clock size={20} className="md:w-6 md:h-6" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Current Time</p>
              <p className="text-lg md:text-xl font-bold text-slate-900">08:42:15 AM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Dashboard);
