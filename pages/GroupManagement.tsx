
import React, { useState, useEffect } from 'react';
import { UsersRound, Plus, MoreVertical, Search, CheckCircle2, X, Check, ArrowRight } from 'lucide-react';
import { Group, User } from '../types';

const GroupManagement: React.FC = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [newGroupName, setNewGroupName] = useState('');

  useEffect(() => {
    setGroups(JSON.parse(localStorage.getItem('sl_groups') || '[]'));
    setUsers(JSON.parse(localStorage.getItem('sl_users') || '[]'));
  }, []);

  const saveGroups = (updated: Group[]) => {
    setGroups(updated);
    localStorage.setItem('sl_groups', JSON.stringify(updated));
  };

  const toggleUser = (id: string) => {
    setSelectedUsers(prev => 
      prev.includes(id) ? prev.filter(uid => uid !== id) : [...prev, id]
    );
  };

  const handleCreateGroup = () => {
    if (!newGroupName) return;
    const newGroup: Group = {
      id: 'g' + Date.now(),
      name: newGroupName,
      userIds: selectedUsers
    };
    saveGroups([...groups, newGroup]);
    setModalOpen(false);
    setNewGroupName('');
    setSelectedUsers([]);
  };

  const deleteGroup = (id: string) => {
    if (confirm('Dissolve this research group?')) {
      saveGroups(groups.filter(g => g.id !== id));
    }
  };

  return (
    <div className="space-y-8 pb-20 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Teams & Clusters</h2>
          <p className="text-sm text-slate-500 font-medium">Managing bulk permissions for {groups.length} collaborative units.</p>
        </div>
        <button onClick={() => setModalOpen(true)} className="bg-blue-600 text-white px-8 py-4 rounded-[24px] font-black shadow-2xl shadow-blue-200 hover:bg-blue-700 transition-all flex items-center gap-2">
          <Plus size={20} /> Form Cluster
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {groups.map((group) => (
          <div key={group.id} className="bg-white p-8 rounded-[48px] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-blue-500/5 transition-all group">
            <div className="flex justify-between items-start mb-8">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-[28px] flex items-center justify-center shadow-inner">
                <UsersRound size={32} />
              </div>
              <button onClick={() => deleteGroup(group.id)} className="p-3 text-slate-200 hover:text-rose-500 hover:bg-rose-50 rounded-2xl transition-all">
                <X size={20} />
              </button>
            </div>
            
            <h3 className="text-2xl font-black text-slate-900 mb-2 leading-tight">{group.name}</h3>
            <p className="text-sm text-slate-400 font-bold uppercase tracking-widest mb-8">{group.userIds.length} Registered Nodes</p>

            <div className="flex items-center justify-between pt-8 border-t border-slate-50">
              <div className="flex -space-x-3">
                {group.userIds.slice(0, 4).map((uid, i) => {
                  const u = users.find(u => u.id === uid);
                  return (
                    <div key={i} className="w-10 h-10 rounded-2xl bg-slate-900 text-white border-2 border-white flex items-center justify-center text-xs font-black shadow-lg">
                      {u ? u.firstName[0] : '?'}
                    </div>
                  );
                })}
                {group.userIds.length > 4 && (
                  <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white border-2 border-white flex items-center justify-center text-xs font-black shadow-lg">
                    +{group.userIds.length - 4}
                  </div>
                )}
              </div>
              <button className="flex items-center gap-1.5 text-sm font-black text-blue-600 hover:translate-x-1 transition-transform">
                Configure <ArrowRight size={16}/>
              </button>
            </div>
          </div>
        ))}
        {groups.length === 0 && (
           <div className="col-span-full py-20 text-center border-4 border-dashed border-slate-50 rounded-[48px]">
              <p className="text-slate-300 font-black text-xl uppercase tracking-[0.2em]">No Research Teams Defined</p>
           </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-2xl rounded-[48px] shadow-2xl overflow-hidden p-10 animate-in zoom-in-95 duration-300">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-3xl font-black text-slate-900">Cluster Forge</h2>
              <button onClick={() => setModalOpen(false)} className="w-12 h-12 flex items-center justify-center rounded-2xl bg-slate-100 text-slate-400 hover:text-slate-900 transition-colors"><X size={24}/></button>
            </div>
            
            <div className="space-y-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Team Designation</label>
                <input 
                  value={newGroupName} 
                  onChange={e => setNewGroupName(e.target.value)}
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-[28px] outline-none focus:ring-4 focus:ring-blue-500/10 focus:bg-white transition-all font-bold text-lg" 
                  placeholder="e.g. Sub-Zero Simulation Unit" 
                />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Enlist Researchers</label>
                  <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{selectedUsers.length} Selected</span>
                </div>
                <div className="max-h-64 overflow-y-auto border border-slate-50 rounded-[32px] bg-slate-50/30 p-2 divide-y divide-slate-50">
                  {users.map((user) => (
                    <label key={user.id} className="flex items-center gap-4 p-4 hover:bg-white rounded-2xl cursor-pointer transition-all group">
                      <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${selectedUsers.includes(user.id) ? 'bg-blue-600 border-blue-600' : 'bg-white border-slate-200'}`}>
                        {selectedUsers.includes(user.id) && <Check size={14} className="text-white" />}
                      </div>
                      <input 
                        type="checkbox" 
                        className="hidden" 
                        checked={selectedUsers.includes(user.id)}
                        onChange={() => toggleUser(user.id)}
                      />
                      <div className="flex-1">
                        <p className="text-sm font-black text-slate-900 leading-tight">{user.firstName} {user.lastName}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">{user.role} • {user.studentId}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-12">
              <button onClick={() => setModalOpen(false)} className="flex-1 py-5 font-black text-slate-500 hover:bg-slate-50 rounded-[32px] transition-colors">Discard</button>
              <button onClick={handleCreateGroup} className="flex-1 py-5 bg-blue-600 text-white rounded-[32px] font-black shadow-2xl shadow-blue-200 hover:bg-blue-700 transition-all flex items-center justify-center gap-3">
                Establish Team <Check size={20}/>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupManagement;
