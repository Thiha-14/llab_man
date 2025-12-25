
import React, { useState, useEffect } from 'react';
import { 
  Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock, Wrench, AlertCircle, Plus, FlaskConical, MapPin, User, Check, X, Trash2
} from 'lucide-react';
import { ScheduleType } from '../types';

interface Booking {
  id: string;
  labName: string;
  type: ScheduleType;
  startTime: string;
  endTime: string;
  userName: string;
}

const Scheduling: React.FC = () => {
  const [activeType, setActiveType] = useState<ScheduleType>(ScheduleType.OPERATION);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [selectedLab, setSelectedLab] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const labs = JSON.parse(localStorage.getItem('sl_labs') || '[]');

  useEffect(() => {
    const saved = localStorage.getItem('sl_bookings');
    if (saved) setBookings(JSON.parse(saved));
  }, []);

  const saveBookings = (updated: Booking[]) => {
    setBookings(updated);
    localStorage.setItem('sl_bookings', JSON.stringify(updated));
  };

  const handleAddBooking = () => {
    if (!selectedLab || !selectedTime) return;
    const newBooking: Booking = {
      id: 'b' + Date.now(),
      labName: selectedLab,
      type: activeType,
      startTime: selectedTime,
      endTime: (parseInt(selectedTime.split(':')[0]) + 2).toString().padStart(2, '0') + ':00',
      userName: JSON.parse(localStorage.getItem('sl_session') || '{}').firstName || 'Member'
    };
    saveBookings([...bookings, newBooking]);
    setShowAdd(false);
    setSelectedLab('');
    setSelectedTime('');
  };

  const handleDelete = (id: string) => {
    if (confirm('Cancel this booking?')) {
      saveBookings(bookings.filter(b => b.id !== id));
    }
  };

  return (
    <div className="space-y-6 md:space-y-10 pb-20 animate-in fade-in duration-700">
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 md:gap-8">
        <div className="flex w-full sm:w-auto bg-white p-1.5 md:p-2 rounded-2xl md:rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <button 
            onClick={() => setActiveType(ScheduleType.OPERATION)}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-2 md:gap-3 px-4 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl font-black text-[10px] md:text-xs transition-all uppercase tracking-widest ${activeType === ScheduleType.OPERATION ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/20' : 'text-slate-400 hover:text-slate-600'}`}
          >
            <Clock size={16} className="md:w-[18px] md:h-[18px]" /> Daily
          </button>
          <button 
            onClick={() => setActiveType(ScheduleType.MAINTENANCE)}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-2 md:gap-3 px-4 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl font-black text-[10px] md:text-xs transition-all uppercase tracking-widest ${activeType === ScheduleType.MAINTENANCE ? 'bg-amber-500 text-white shadow-xl shadow-amber-500/20' : 'text-slate-400 hover:text-slate-600'}`}
          >
            <Wrench size={16} className="md:w-[18px] md:h-[18px]" /> Repairs
          </button>
        </div>

        <div className="flex w-full sm:w-auto items-center justify-between gap-4 md:gap-6 bg-white px-6 md:px-8 py-3 md:py-4 border border-slate-100 rounded-[24px] md:rounded-[32px] shadow-sm">
          <button className="p-1 md:p-2 hover:bg-slate-50 rounded-xl text-slate-300 hover:text-slate-900 transition-all"><ChevronLeft size={20}/></button>
          <div className="text-center min-w-[120px] md:min-w-[150px]">
            <span className="text-base md:text-lg font-black text-slate-900">Oct 24, Thu</span>
          </div>
          <button className="p-1 md:p-2 hover:bg-slate-50 rounded-xl text-slate-300 hover:text-slate-900 transition-all"><ChevronRight size={20}/></button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 md:gap-10">
        <div className="xl:col-span-3 bg-white rounded-[32px] md:rounded-[48px] border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 md:p-10 border-b border-slate-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h3 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">Daily Schedule</h3>
            <button onClick={() => setShowAdd(true)} className="w-full sm:w-auto flex items-center justify-center gap-2 bg-black text-white px-6 py-3 md:py-4 rounded-2xl font-black shadow-lg hover:bg-slate-800 transition-all uppercase tracking-widest text-[10px] md:text-xs">
              <Plus size={18} /> Book a Slot
            </button>
          </div>
          
          <div className="p-6 md:p-10">
            <div className="relative space-y-10 md:space-y-14">
              <div className="absolute left-[50px] md:left-[85px] top-0 bottom-0 w-1 bg-slate-50 rounded-full"></div>
              {['08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00'].map((time) => (
                <div key={time} className="flex gap-6 md:gap-10 group relative">
                  <div className="w-[35px] md:w-[45px] text-[10px] md:text-xs font-black text-slate-300 mt-2 tracking-widest">{time}</div>
                  <div className="flex-1 min-h-[60px] md:min-h-[80px]">
                    {bookings.filter(b => b.startTime.startsWith(time.split(':')[0].padStart(2, '0'))).map(slot => (
                      <div key={slot.id} className={`p-4 md:p-6 rounded-2xl md:rounded-3xl border-l-[8px] md:border-l-[12px] shadow-sm transition-all hover:shadow-lg mb-4 ${
                        slot.type === ScheduleType.OPERATION 
                          ? 'bg-blue-50 border-blue-600 text-blue-900' 
                          : 'bg-amber-50 border-amber-500 text-amber-900'
                      }`}>
                        <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-3">
                          <div className="min-w-0">
                            <h4 className="font-black text-lg md:text-xl mb-1 line-clamp-1">{slot.labName}</h4>
                            <div className="flex flex-wrap items-center gap-3 md:gap-4 text-[10px] font-bold opacity-60 uppercase tracking-widest">
                              <span className="flex items-center gap-1"><User size={12}/> {slot.userName}</span>
                              <span className="flex items-center gap-1"><Clock size={12}/> {slot.startTime} — {slot.endTime}</span>
                            </div>
                          </div>
                          <button onClick={() => handleDelete(slot.id)} className="p-2.5 md:p-3 bg-white/60 hover:bg-rose-500 hover:text-white rounded-xl transition-all self-end sm:self-auto"><Trash2 size={16}/></button>
                        </div>
                      </div>
                    ))}
                    <div className="w-full h-px bg-slate-50 mt-6 md:mt-8 group-last:hidden"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="hidden xl:block space-y-8 animate-in slide-in-from-right duration-700">
          <div className="bg-black p-10 rounded-[48px] shadow-2xl text-white relative overflow-hidden group">
            <h4 className="text-xl font-black mb-6 flex items-center gap-2">
              <AlertCircle size={22} className="text-blue-500" />
              Lab Monitor
            </h4>
            <div className="space-y-4 relative z-10">
              {[
                { name: 'X-Ray Lab', status: 'In Use', color: 'bg-rose-500' },
                { name: 'GPU Farm', status: 'Online', color: 'bg-emerald-500' },
                { name: 'Bio Lab 4', status: 'Online', color: 'bg-emerald-500' },
              ].map((res, i) => (
                <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-2xl flex justify-between items-center">
                  <span className="text-sm font-bold">{res.name}</span>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${res.color}`}></div>
                    <span className="text-[10px] font-black uppercase text-slate-400">{res.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {showAdd && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
           <div className="bg-white w-full max-w-lg rounded-[28px] md:rounded-[40px] shadow-2xl overflow-y-auto max-h-[90vh] p-6 md:p-10 animate-in zoom-in-95 duration-300">
              <div className="flex justify-between items-center mb-6 md:mb-10">
                <h2 className="text-xl md:text-2xl font-black text-slate-900">Book a Slot</h2>
                <button onClick={() => setShowAdd(false)} className="w-10 h-10 flex items-center justify-center rounded-2xl bg-slate-50 text-slate-400 hover:text-slate-900 transition-all"><X size={24}/></button>
              </div>
              <div className="space-y-4 md:space-y-6">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Select Lab</label>
                    <select 
                      className="w-full px-4 md:px-6 py-3 md:py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none font-bold text-base md:text-lg"
                      value={selectedLab}
                      onChange={(e) => setSelectedLab(e.target.value)}
                    >
                       <option value="">Choose a lab...</option>
                       {labs.map((l: any) => <option key={l.id} value={l.name}>{l.name}</option>)}
                    </select>
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Set Time</label>
                    <input 
                      type="time" 
                      className="w-full px-4 md:px-6 py-3 md:py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none font-bold text-base md:text-lg"
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                    />
                 </div>
              </div>
              <button onClick={handleAddBooking} className="w-full mt-8 md:mt-10 py-4 md:py-5 bg-blue-600 text-white rounded-3xl font-black shadow-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-3 uppercase text-[10px] md:text-xs tracking-widest">
                 Confirm Booking <Check size={20}/>
              </button>
           </div>
        </div>
      )}
    </div>
  );
};

export default Scheduling;
