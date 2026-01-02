'use client';

import React, { useState, useEffect } from 'react';
import { UsersRound, Plus, X, Check, ArrowRight, Trash2, Users, User as UserIcon, Shield } from 'lucide-react';
import { Group, User } from '../types';

const GroupManagement: React.FC = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [newGroupName, setNewGroupName] = useState('');
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);

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
    if (confirm('Remove this group permanently?')) {
      saveGroups(groups.filter(g => g.id !== id));
    }
  };

  const getGroupStats = (group: Group) => {
    const groupUsers = users.filter(u => group.userIds.includes(u.id));
    const roles = groupUsers.reduce((acc, u) => {
      acc[u.role] = (acc[u.role] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    return roles;
  };

  return (
    <div className="space-y-10 pb-20 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Research Teams</h2>
          <p className="text-lg text-slate-500 font-bold">Organize researchers into collaborative groups • {groups.length} active teams</p>
        </div>
        <button 
          onClick={() => setModalOpen(true)} 
          className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-3xl font-black shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105 transition-all flex items-center gap-3 group"
        >
          <Plus size={22} className="group-hover:rotate-90 transition-transform" /> Create Team
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {groups.map((group) => {
          const stats = getGroupStats(group);
          const isExpanded = expandedGroup === group.id;
          
          return (
            <div 
              key={group.id} 
              className="bg-white rounded-[40px] border-2 border-slate-100 shadow-lg hover:shadow-2xl hover:border-blue-200 transition-all overflow-hidden group/card"
            >
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center shadow-xl shadow-blue-500/20 group-hover/card:scale-110 transition-transform">
                    <UsersRound size={32} className="text-white" strokeWidth={2.5} />
                  </div>
                  <button 
                    onClick={() => deleteGroup(group.id)} 
                    className="p-3 text-slate-300 hover:text-rose-600 hover:bg-rose-50 rounded-2xl transition-all opacity-0 group-hover/card:opacity-100"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                <h3 className="text-2xl font-black text-slate-900 mb-3 leading-tight group-hover/card:text-blue-600 transition-colors">
                  {group.name}
                </h3>
                
                <div className="flex items-center gap-6 mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="text-sm font-bold text-slate-600">{group.userIds.length} Members</span>
                  </div>
                  {Object.keys(stats).length > 0 && (
                    <div className="flex items-center gap-2">
                      <Shield size={14} className="text-blue-500" />
                      <span className="text-sm font-bold text-slate-600">{Object.keys(stats).length} Roles</span>
                    </div>
                  )}
                </div>

                {/* Member Avatars */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex -space-x-3">
                    {group.userIds.slice(0, 5).map((uid, i) => {
                      const u = users.find(u => u.id === uid);
                      return (
                        <div 
                          key={i} 
                          className="w-11 h-11 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-900 text-white border-3 border-white flex items-center justify-center text-sm font-black shadow-lg hover:scale-110 hover:z-10 transition-transform cursor-pointer"
                          title={u ? `${u.firstName} ${u.lastName}` : 'Unknown'}
                        >
                          {u ? u.firstName[0] : '?'}
                        </div>
                      );
                    })}
                    {group.userIds.length > 5 && (
                      <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white border-3 border-white flex items-center justify-center text-xs font-black shadow-lg">
                        +{group.userIds.length - 5}
                      </div>
                    )}
                  </div>
                </div>

                {/* Role Distribution */}
                {Object.keys(stats).length > 0 && (
                  <div className="space-y-2 mb-6 p-4 bg-slate-50 rounded-2xl">
                    {Object.entries(stats).map(([role, count]) => (
                      <div key={role} className="flex justify-between items-center">
                        <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">{role}</span>
                        <span className="text-xs font-black text-blue-600 bg-blue-50 px-2 py-1 rounded-lg">{count}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Expand/View Members */}
                <button
                  onClick={() => setExpandedGroup(isExpanded ? null : group.id)}
                  className="w-full py-3 bg-slate-900 hover:bg-blue-600 text-white rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2 group/btn"
                >
                  <Users size={16} />
                  {isExpanded ? 'Hide Members' : 'View All Members'}
                  <ArrowRight size={16} className={`group-hover/btn:translate-x-1 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                </button>
              </div>

              {/* Expanded Member List */}
              {isExpanded && (
                <div className="border-t-2 border-slate-100 bg-slate-50 p-6 animate-in slide-in-from-top duration-300">
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {group.userIds.map((uid) => {
                      const u = users.find(user => user.id === uid);
                      if (!u) return null;
                      return (
                        <div key={uid} className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-slate-100 hover:border-blue-200 transition-all">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-700 to-slate-900 text-white flex items-center justify-center font-black text-sm shadow-md">
                            {u.firstName[0]}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-black text-slate-900 text-sm truncate">{u.firstName} {u.lastName}</p>
                            <p className="text-xs text-slate-500 font-bold">{u.role} • {u.studentId}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {groups.length === 0 && (
          <div className="col-span-full py-32 text-center">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-full flex items-center justify-center">
              <UsersRound size={48} className="text-blue-300" />
            </div>
            <h3 className="text-2xl font-black text-slate-300 mb-2">No Teams Yet</h3>
            <p className="text-slate-400 font-medium mb-6">Create your first research team to get started</p>
            <button 
              onClick={() => setModalOpen(true)}
              className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-blue-700 transition-all inline-flex items-center gap-2"
            >
              <Plus size={18} /> Create First Team
            </button>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-6 bg-black/70 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-2xl rounded-[48px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-3xl font-black mb-2">Create New Team</h2>
                  <p className="text-blue-100 font-medium">Build a collaborative research group</p>
                </div>
                <button 
                  onClick={() => setModalOpen(false)} 
                  className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/20 hover:bg-white/30 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            <div className="p-10 space-y-8">
              <div className="space-y-3">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-black">1</div>
                  Team Name
                </label>
                <input
                  value={newGroupName}
                  onChange={e => setNewGroupName(e.target.value)}
                  className="w-full px-6 py-5 bg-slate-50 border-2 border-slate-200 rounded-3xl outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all font-bold text-lg placeholder:text-slate-300"
                  placeholder="e.g. Quantum Physics Research Team"
                />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-black">2</div>
                    Select Members
                  </label>
                  <span className="text-sm font-black text-blue-600 bg-blue-50 px-4 py-2 rounded-2xl">
                    {selectedUsers.length} Selected
                  </span>
                </div>
                
                <div className="max-h-80 overflow-y-auto border-2 border-slate-100 rounded-3xl bg-slate-50 p-3 space-y-2">
                  {users.length === 0 ? (
                    <div className="text-center py-12">
                      <UserIcon size={48} className="mx-auto text-slate-200 mb-3" />
                      <p className="text-slate-400 font-bold">No users available</p>
                    </div>
                  ) : (
                    users.map((user) => (
                      <label 
                        key={user.id} 
                        className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all group/item ${
                          selectedUsers.includes(user.id) 
                            ? 'bg-blue-50 border-2 border-blue-200 shadow-sm' 
                            : 'bg-white border-2 border-transparent hover:border-slate-200 hover:shadow-sm'
                        }`}
                      >
                        <div className={`w-7 h-7 rounded-xl border-3 flex items-center justify-center transition-all ${
                          selectedUsers.includes(user.id) 
                            ? 'bg-blue-600 border-blue-600 scale-110' 
                            : 'bg-white border-slate-300 group-hover/item:border-blue-300'
                        }`}>
                          {selectedUsers.includes(user.id) && <Check size={16} className="text-white" strokeWidth={3} />}
                        </div>
                        <input
                          type="checkbox"
                          className="hidden"
                          checked={selectedUsers.includes(user.id)}
                          onChange={() => toggleUser(user.id)}
                        />
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-700 to-slate-900 text-white flex items-center justify-center font-black text-sm shadow-md">
                          {user.firstName[0]}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-black text-slate-900 leading-tight">{user.firstName} {user.lastName}</p>
                          <p className="text-xs text-slate-500 font-bold">{user.role} • {user.studentId}</p>
                        </div>
                      </label>
                    ))
                  )}
                </div>
              </div>
            </div>

            <div className="flex gap-4 p-6 bg-slate-50 border-t-2 border-slate-100">
              <button 
                onClick={() => setModalOpen(false)} 
                className="flex-1 py-4 font-black text-slate-600 hover:bg-white rounded-3xl transition-all border-2 border-slate-200 hover:border-slate-300"
              >
                Cancel
              </button>
              <button 
                onClick={handleCreateGroup} 
                disabled={!newGroupName || selectedUsers.length === 0}
                className="flex-1 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-3xl font-black shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <Check size={20} /> Create Team
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupManagement;
