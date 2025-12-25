
import React, { useState, useEffect } from 'react';
import { 
  Search, Filter, MoreHorizontal, UserPlus, Calendar, ShieldCheck, Activity, User as UserIcon, X, Check, Mail, Phone, Hash
} from 'lucide-react';
import { User, UserStatus, UserRole } from '../types';

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [newUser, setNewUser] = useState({ firstName: '', lastName: '', email: '', role: UserRole.USER });

  useEffect(() => {
    setUsers(JSON.parse(localStorage.getItem('sl_users') || '[]'));
  }, []);

  const saveUsers = (updated: User[]) => {
    setUsers(updated);
    localStorage.setItem('sl_users', JSON.stringify(updated));
  };

  const handleCreateUser = () => {
    if (!newUser.firstName || !newUser.email) return;
    const user: User = {
      id: 'u' + Date.now(),
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      studentId: 'STU-' + Math.floor(Math.random() * 9000 + 1000),
      email: newUser.email,
      phone: '+1 000 000 0000',
      registrationDate: new Date().toISOString().split('T')[0],
      effectiveFrom: new Date().toISOString().split('T')[0],
      effectiveTo: '2030-01-01',
      status: UserStatus.ACTIVE,
      role: newUser.role
    };
    saveUsers([...users, user]);
    setShowAdd(false);
    setNewUser({ firstName: '', lastName: '', email: '', role: UserRole.USER });
  };

  const deleteUser = (id: string) => {
    if (confirm('Permanently remove this account?')) {
      saveUsers(users.filter(u => u.id !== id));
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Institutional Registry</h2>
          <p className="text-sm text-slate-500 font-medium">Managing access for {users.length} active research accounts.</p>
        </div>
        <button onClick={() => setShowAdd(true)} className="flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-[24px] font-black shadow-2xl shadow-blue-200 hover:bg-blue-700 hover:-translate-y-1 transition-all">
          <UserPlus size={20} /> Deploy Account
        </button>
      </div>

      <div className="bg-white rounded-[48px] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="relative flex-1 w-full max-w-xl">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
            <input type="text" placeholder="Search by identity string..." className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-[24px] outline-none focus:ring-4 focus:ring-blue-500/10 focus:bg-white transition-all font-medium" />
          </div>
          <button className="flex items-center gap-2 px-6 py-4 border border-slate-100 rounded-[24px] text-sm font-black text-slate-500 hover:bg-slate-50 transition-all uppercase tracking-widest">
            <Filter size={18} /> Filters
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] border-b border-slate-100">
                <th className="px-10 py-6">Researcher</th>
                <th className="px-10 py-6">Credentials</th>
                <th className="px-10 py-6">Authorization</th>
                <th className="px-10 py-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {users.map(user => (
                <tr key={user.id} className="hover:bg-blue-50/30 transition-colors group">
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 rounded-[20px] bg-slate-900 text-white flex items-center justify-center font-black text-xl shadow-xl">
                        {user.firstName[0]}{user.lastName[0]}
                      </div>
                      <div>
                        <p className="font-black text-slate-900 text-lg leading-tight mb-1">{user.firstName} {user.lastName}</p>
                        <p className="text-xs text-slate-400 font-bold">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-8">
                    <div className="flex flex-col gap-1">
                      <span className="font-mono text-xs font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-full w-fit">{user.studentId}</span>
                      <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">{user.status} Enrollment</span>
                    </div>
                  </td>
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-2 text-sm font-black text-slate-700 mb-1">
                      <ShieldCheck size={18} className="text-blue-600" /> {user.role}
                    </div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Expiry: {user.effectiveTo}</p>
                  </td>
                  <td className="px-10 py-8 text-right">
                    <button onClick={() => deleteUser(user.id)} className="p-4 text-slate-300 hover:text-rose-600 hover:bg-rose-50 rounded-[20px] transition-all">
                      <Trash2 size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showAdd && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-xl rounded-[48px] shadow-2xl overflow-hidden p-10 animate-in zoom-in-95 duration-300">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-2xl font-black text-slate-900">Provision Account</h2>
              <button onClick={() => setShowAdd(false)} className="w-12 h-12 flex items-center justify-center rounded-2xl bg-slate-100 text-slate-400 hover:text-slate-900 transition-colors"><X size={24}/></button>
            </div>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">First Name</label>
                    <input value={newUser.firstName} onChange={e => setNewUser({...newUser, firstName: e.target.value})} className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-3xl outline-none focus:bg-white font-bold" placeholder="Usman"/>
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Last Name</label>
                    <input value={newUser.lastName} onChange={e => setNewUser({...newUser, lastName: e.target.value})} className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-3xl outline-none focus:bg-white font-bold" placeholder="Ali"/>
                 </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                <input value={newUser.email} onChange={e => setNewUser({...newUser, email: e.target.value})} className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-3xl outline-none focus:bg-white font-bold" placeholder="usman@smartlab.com"/>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Account Role</label>
                <select value={newUser.role} onChange={e => setNewUser({...newUser, role: e.target.value as UserRole})} className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-3xl outline-none focus:bg-white font-bold">
                   <option value={UserRole.USER}>Research Student (User)</option>
                   <option value={UserRole.CONFIGURATOR}>Lab Technician (Configurator)</option>
                   <option value={UserRole.MASTER}>Administrator (Master)</option>
                </select>
              </div>
            </div>
            <button onClick={handleCreateUser} className="w-full mt-10 py-5 bg-slate-900 text-white rounded-[32px] font-black shadow-2xl hover:bg-black transition-all flex items-center justify-center gap-3">
              Deploy Credentials <Check size={20}/>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const Trash2: React.FC<{size?: number}> = ({size = 24}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2m-6 9h4m-4-4h4"/></svg>
);

export default UserManagement;
