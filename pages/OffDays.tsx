
import React, { useState, useEffect } from 'react';
import { Calendar, Plus, Trash2, Edit2, ChevronLeft, ChevronRight, MapPin, X, Check } from 'lucide-react';
import { Holiday } from '../types';

const OffDays: React.FC = () => {
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [newHoliday, setNewHoliday] = useState({ name: '', date: '', type: 'Public' as 'Public' | 'Local' });

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
      type: newHoliday.type
    };
    saveHolidays([...holidays, item]);
    setModalOpen(false);
    setNewHoliday({ name: '', date: '', type: 'Public' });
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
          className="flex items-center gap-3 bg-slate-900 text-white px-8 py-4 rounded-[24px] font-black shadow-2xl hover:bg-black hover:-translate-y-1 transition-all uppercase tracking-widest text-xs"
        >
          <Plus size={20} />
          Register Event
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
        <div className="xl:col-span-2 bg-white p-10 rounded-[48px] border border-slate-50 shadow-sm">
          <div className="flex justify-between items-center mb-12">
            <h3 className="text-2xl font-black text-slate-900">2024 Academic Matrix</h3>
            <div className="flex gap-3">
              <button className="p-3 hover:bg-slate-50 border border-slate-100 rounded-[18px] text-slate-400 hover:text-slate-900 transition-all shadow-sm"><ChevronLeft size={24}/></button>
              <button className="p-3 hover:bg-slate-50 border border-slate-100 rounded-[18px] text-slate-400 hover:text-slate-900 transition-all shadow-sm"><ChevronRight size={24}/></button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-6 mb-8">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
              <div key={day} className="text-center text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">{day}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-6">
            {Array.from({ length: 31 }).map((_, i) => {
              const day = i + 1;
              const dateStr = `2024-10-${day.toString().padStart(2, '0')}`;
              const found = holidays.find(h => h.date === dateStr);
              return (
                <div key={i} className={`aspect-square flex flex-col items-center justify-center rounded-[28px] border-2 transition-all group relative cursor-pointer ${
                  found 
                    ? 'bg-rose-50 border-rose-100 text-rose-600 shadow-xl shadow-rose-500/5' 
                    : 'bg-white border-slate-50 text-slate-700 hover:border-blue-200 hover:scale-105'
                }`}>
                  <span className="text-lg font-black">{day}</span>
                  {found && (
                    <div className="absolute top-2 right-2 w-2.5 h-2.5 bg-rose-500 rounded-full ring-4 ring-white shadow-lg"></div>
                  )}
                  {found && (
                    <div className="absolute inset-x-0 bottom-0 py-2 text-center opacity-0 group-hover:opacity-100 transition-opacity">
                       <span className="text-[8px] font-black uppercase truncate px-2 block">{found.name}</span>
                    </div>
                  )}
                </div>
              );
            })}
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
            {holidays.map((holiday) => (
              <div key={holiday.id} className="group p-6 bg-slate-50/50 rounded-[32px] border border-slate-100 hover:border-blue-200 hover:bg-white hover:shadow-2xl hover:shadow-blue-500/5 transition-all">
                <div className="flex justify-between items-start mb-4">
                  <span className={`text-[9px] font-black uppercase px-3 py-1.5 rounded-full tracking-widest ${
                    holiday.type === 'Public' ? 'bg-rose-100 text-rose-600' : 'bg-blue-100 text-blue-600'
                  }`}>
                    {holiday.type} Registry
                  </span>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                    <button onClick={() => handleDelete(holiday.id)} className="p-2.5 text-slate-300 hover:text-rose-600 bg-white rounded-xl shadow-sm"><Trash2 size={16}/></button>
                  </div>
                </div>
                <h4 className="font-black text-slate-900 text-lg mb-2">{holiday.name}</h4>
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
                <button onClick={() => setModalOpen(false)} className="w-12 h-12 flex items-center justify-center rounded-2xl bg-slate-100 text-slate-400 hover:text-slate-900 transition-colors"><X size={24}/></button>
              </div>
              <div className="space-y-6">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Event Label</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Winter Research Break"
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-3xl outline-none focus:bg-white font-bold transition-all"
                      value={newHoliday.name}
                      onChange={e => setNewHoliday({...newHoliday, name: e.target.value})}
                    />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Event Date</label>
                    <input 
                      type="date" 
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-3xl outline-none focus:bg-white font-bold transition-all"
                      value={newHoliday.date}
                      onChange={e => setNewHoliday({...newHoliday, date: e.target.value})}
                    />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Classification</label>
                    <div className="flex gap-2">
                       {['Public', 'Local'].map(t => (
                         <button 
                           key={t}
                           onClick={() => setNewHoliday({...newHoliday, type: t as any})}
                           className={`flex-1 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${newHoliday.type === t ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-50 text-slate-400'}`}
                         >
                           {t}
                         </button>
                       ))}
                    </div>
                 </div>
              </div>
              <button onClick={handleAdd} className="w-full mt-10 py-5 bg-blue-600 text-white rounded-[32px] font-black shadow-2xl shadow-blue-200 hover:bg-blue-700 transition-all flex items-center justify-center gap-3">
                 Finalize Registration <Check size={20}/>
              </button>
           </div>
        </div>
      )}
    </div>
  );
};

export default OffDays;
