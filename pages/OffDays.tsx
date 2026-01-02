'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, Plus, Trash2, ChevronLeft, ChevronRight, X, Check } from 'lucide-react';
import { Holiday } from '../types';

const OffDays: React.FC = () => {
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(0); // 0 = January, 11 = December
  const [currentYear] = useState(2026);
  const [newHoliday, setNewHoliday] = useState({ name: '', date: '', type: 'National' as 'National' | 'Cultural' | 'Weekend' | 'School', description: '' });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('sl_holidays') || '[]');
    setHolidays(saved);
  }, []);

  const saveHolidays = (updated: Holiday[]) => {
    setHolidays(updated);
    localStorage.setItem('sl_holidays', JSON.stringify(updated));
  };

  const handleAdd = () => {
    if (!newHoliday.name || !newHoliday.date) return;
    const item: Holiday = {
      id: Date.now().toString(),
      name: newHoliday.name,
      date: newHoliday.date,
      type: newHoliday.type,
      description: newHoliday.description
    };
    saveHolidays([...holidays, item]);
    setModalOpen(false);
    setNewHoliday({ name: '', date: '', type: 'National', description: '' });
  };

  const handleDelete = (id: string) => {
    if (confirm('Permanently remove this entry?')) {
      saveHolidays(holidays.filter(h => h.id !== id));
    }
  };

  return (
    <div className="space-y-10 pb-20 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">Holiday Registry</h2>
          <p className="text-slate-500 font-bold text-lg">Define operational blackouts and institutional breaks.</p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-3 bg-slate-900 text-white px-8 py-4 rounded-3xl font-black shadow-2xl hover:bg-black hover:-translate-y-1 transition-all uppercase tracking-widest text-xs"
        >
          <Plus size={20} />
          Register Event
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
        <div className="xl:col-span-2 bg-white p-10 rounded-[48px] border border-slate-50 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-black text-slate-900">{new Date(currentYear, currentMonth).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })} - Malaysia</h3>
            <div className="flex gap-3">
              <button 
                onClick={() => setCurrentMonth(prev => prev === 0 ? 11 : prev - 1)}
                className="p-3 hover:bg-slate-50 border border-slate-100 rounded-[18px] text-slate-400 hover:text-slate-900 transition-all shadow-sm"
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                onClick={() => setCurrentMonth(prev => prev === 11 ? 0 : prev + 1)}
                className="p-3 hover:bg-slate-50 border border-slate-100 rounded-[18px] text-slate-400 hover:text-slate-900 transition-all shadow-sm"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mb-8 pb-6 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-red-500"></div>
              <span className="text-xs font-bold text-slate-600">National</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-green-500"></div>
              <span className="text-xs font-bold text-slate-600">Cultural</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-amber-500"></div>
              <span className="text-xs font-bold text-slate-600">School</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-slate-400"></div>
              <span className="text-xs font-bold text-slate-600">Weekend</span>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-6 mb-8">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
              <div key={day} className="text-center text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">{day}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-6">
            {(() => {
              const firstDay = new Date(currentYear, currentMonth, 1).getDay();
              const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
              const startDay = firstDay === 0 ? 6 : firstDay - 1; // Adjust for Monday start
              const cells = [];
              
              // Empty cells before month starts
              for (let i = 0; i < startDay; i++) {
                cells.push(<div key={`empty-${i}`} className="aspect-square"></div>);
              }
              
              // Days of the month
              for (let day = 1; day <= daysInMonth; day++) {
                const dateStr = `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
                const dayOfWeek = new Date(currentYear, currentMonth, day).getDay();
                const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
                const found = holidays.find(h => h.date === dateStr);
                
                const getHolidayStyles = () => {
                  if (!found && isWeekend) return 'bg-slate-100 border-slate-200 text-slate-500';
                  if (found?.type === 'National') return 'bg-red-50 border-red-200 text-red-600 shadow-xl shadow-red-500/5';
                  if (found?.type === 'Cultural') return 'bg-green-50 border-green-200 text-green-600 shadow-xl shadow-green-500/5';
                  if (found?.type === 'School') return 'bg-amber-50 border-amber-200 text-amber-600 shadow-xl shadow-amber-500/5';
                  if (found?.type === 'Weekend') return 'bg-blue-50 border-blue-200 text-blue-600 shadow-xl shadow-blue-500/5';
                  return 'bg-white border-slate-50 text-slate-700 hover:border-blue-200 hover:scale-105';
                };
                
                cells.push(
                  <div key={day} className={`aspect-square flex flex-col items-center justify-center rounded-[28px] border-2 transition-all group relative cursor-pointer ${getHolidayStyles()}`}>
                    <span className="text-lg font-black">{day}</span>
                    {(found || isWeekend) && (
                      <div className={`absolute top-2 right-2 w-2.5 h-2.5 rounded-full ring-4 ring-white shadow-lg ${
                        found?.type === 'National' ? 'bg-red-500' :
                        found?.type === 'Cultural' ? 'bg-green-500' :
                        found?.type === 'School' ? 'bg-amber-500' :
                        found?.type === 'Weekend' ? 'bg-blue-500' :
                        'bg-slate-400'
                      }`}></div>
                    )}
                    {found && (
                      <div className="absolute inset-x-0 bottom-0 py-2 text-center opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 backdrop-blur-sm rounded-b-[28px]">
                        <span className="text-[8px] font-black uppercase truncate px-2 block">{found.name}</span>
                      </div>
                    )}
                  </div>
                );
              }
              
              return cells;
            })()}
          </div>
        </div>

        <div className="bg-white p-10 rounded-[48px] border border-slate-50 shadow-sm h-fit">
          <h3 className="text-xl font-black text-slate-900 mb-10 border-b border-slate-50 pb-6">Scheduled Events</h3>
          <div className="space-y-6">
            {holidays.length === 0 && (
              <div className="text-center py-10">
                <Calendar size={48} className="mx-auto text-slate-100 mb-4" />
                <p className="text-slate-300 font-black uppercase tracking-widest text-xs">No entries detected</p>
              </div>
            )}
            {holidays.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).map((holiday) => (
              <div key={holiday.id} className="group p-6 bg-slate-50/50 rounded-[32px] border border-slate-100 hover:border-blue-200 hover:bg-white hover:shadow-2xl hover:shadow-blue-500/5 transition-all">
                <div className="flex justify-between items-start mb-4">
                  <span className={`text-[9px] font-black uppercase px-3 py-1.5 rounded-full tracking-widest ${
                    holiday.type === 'National' ? 'bg-red-100 text-red-600' :
                    holiday.type === 'Cultural' ? 'bg-green-100 text-green-600' :
                    holiday.type === 'School' ? 'bg-amber-100 text-amber-600' :
                    'bg-blue-100 text-blue-600'
                  }`}>
                    {holiday.type}
                  </span>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                    <button onClick={() => handleDelete(holiday.id)} className="p-2.5 text-slate-300 hover:text-rose-600 bg-white rounded-xl shadow-sm"><Trash2 size={16} /></button>
                  </div>
                </div>
                <h4 className="font-black text-slate-900 text-lg mb-2">{holiday.name}</h4>
                {holiday.description && (
                  <p className="text-xs text-slate-500 mb-3 font-medium">{holiday.description}</p>
                )}
                <div className="flex items-center gap-3 text-sm font-bold text-slate-400 bg-white/50 w-fit px-3 py-1.5 rounded-xl">
                  <Calendar size={16} className="text-blue-500" />
                  {new Date(holiday.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-lg rounded-[48px] shadow-2xl overflow-hidden p-10 animate-in zoom-in-95 duration-300">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-2xl font-black text-slate-900">Define Event</h2>
              <button onClick={() => setModalOpen(false)} className="w-12 h-12 flex items-center justify-center rounded-2xl bg-slate-100 text-slate-400 hover:text-slate-900 transition-colors"><X size={24} /></button>
            </div>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Event Label</label>
                <input
                  type="text"
                  placeholder="e.g. Winter Research Break"
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-3xl outline-none focus:bg-white font-bold transition-all"
                  value={newHoliday.name}
                  onChange={e => setNewHoliday({ ...newHoliday, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Event Date</label>
                <input
                  type="date"
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-3xl outline-none focus:bg-white font-bold transition-all"
                  value={newHoliday.date}
                  onChange={e => setNewHoliday({ ...newHoliday, date: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Description (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Federal public holiday"
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-3xl outline-none focus:bg-white font-bold transition-all"
                  value={newHoliday.description}
                  onChange={e => setNewHoliday({ ...newHoliday, description: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Classification</label>
                <div className="grid grid-cols-2 gap-2">
                  {(['National', 'Cultural', 'School', 'Weekend'] as const).map(t => (
                    <button
                      key={t}
                      onClick={() => setNewHoliday({ ...newHoliday, type: t })}
                      className={`py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${
                        newHoliday.type === t 
                          ? t === 'National' ? 'bg-red-600 text-white shadow-lg' :
                            t === 'Cultural' ? 'bg-green-600 text-white shadow-lg' :
                            t === 'School' ? 'bg-amber-600 text-white shadow-lg' :
                            'bg-blue-600 text-white shadow-lg'
                          : 'bg-slate-50 text-slate-400'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <button onClick={handleAdd} className="w-full mt-10 py-5 bg-blue-600 text-white rounded-4xl font-black shadow-2xl shadow-blue-200 hover:bg-blue-700 transition-all flex items-center justify-center gap-3">
              Finalize Registration <Check size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OffDays;
