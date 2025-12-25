
import React, { useState, useEffect } from 'react';
import { 
  Plus, Search, Trash2, X, MapPin, FlaskConical, Cpu, ShieldCheck, ChevronRight, Check
} from 'lucide-react';
import { Lab, UserRole, Equipment, Allowance } from '../types';

interface LabManagementProps {
  role: UserRole;
}

const LabManagement: React.FC<LabManagementProps> = ({ role }) => {
  const [activeTab, setActiveTab] = useState<'details' | 'equipment' | 'allowances'>('details');
  const [isModalOpen, setModalOpen] = useState(false);
  const [isEqModalOpen, setEqModalOpen] = useState(false);
  const [labs, setLabs] = useState<Lab[]>([]);
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  
  const [newLab, setNewLab] = useState({ name: '', description: '', location: '' });
  const [newEq, setNewEq] = useState({ name: '', manufacturer: '', model: '', serialNumber: '', nextCalibrationDate: '' });

  useEffect(() => {
    setLabs(JSON.parse(localStorage.getItem('sl_labs') || '[]'));
    setEquipment(JSON.parse(localStorage.getItem('sl_equipment') || '[]'));
  }, []);

  const saveLabs = (updated: Lab[]) => {
    setLabs(updated);
    localStorage.setItem('sl_labs', JSON.stringify(updated));
  };
  const saveEquipment = (updated: Equipment[]) => {
    setEquipment(updated);
    localStorage.setItem('sl_equipment', JSON.stringify(updated));
  };

  const handleAddLab = () => {
    if (!newLab.name) return;
    const item: Lab = {
      id: 'l' + Date.now(),
      name: newLab.name,
      description: newLab.description || 'Standard lab facility.',
      location: newLab.location || 'Main Building',
      features: ['Basic Equipment'],
      media: [{ 
        id: 'm-new', 
        url: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=800', 
        type: 'image', 
        name: 'New Lab',
        uploadProgress: 100
      }]
    };
    saveLabs([...labs, item]);
    setNewLab({ name: '', description: '', location: '' });
    setModalOpen(false);
  };

  const handleAddEquipment = () => {
    if (!newEq.name) return;
    const item: Equipment = {
      id: 'e' + Date.now(),
      name: newEq.name,
      manufacturer: newEq.manufacturer || 'General',
      model: newEq.model || 'Standard',
      serialNumber: newEq.serialNumber || 'N/A',
      procurementDate: new Date().toISOString().split('T')[0],
      invoiceNumber: 'INV-' + Math.floor(Math.random() * 1000),
      lastCalibrationDate: new Date().toISOString().split('T')[0],
      nextCalibrationDate: newEq.nextCalibrationDate || '2025-12-31',
      calibrationFrequency: 'Yearly'
    };
    saveEquipment([...equipment, item]);
    setNewEq({ name: '', manufacturer: '', model: '', serialNumber: '', nextCalibrationDate: '' });
    setEqModalOpen(false);
  };

  const deleteLab = (id: string) => {
    if (confirm('Delete this lab room?')) saveLabs(labs.filter(l => l.id !== id));
  };

  const deleteEq = (id: string) => {
    if (confirm('Delete this equipment?')) saveEquipment(equipment.filter(e => e.id !== id));
  };

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in duration-500">
      {/* Scrollable Tabs */}
      <div className="flex border-b border-slate-200 gap-6 md:gap-8 mb-4 overflow-x-auto no-scrollbar scroll-smooth">
        {[
          { id: 'details', label: 'Labs', icon: FlaskConical },
          { id: 'equipment', label: 'Equipment', icon: Cpu },
          { id: 'allowances', label: 'Rules', icon: ShieldCheck }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 pb-4 text-xs md:text-sm font-bold transition-all relative whitespace-nowrap ${
              activeTab === tab.id ? 'text-blue-600' : 'text-slate-400'
            }`}
          >
            <tab.icon size={16} className="md:w-[18px] md:h-[18px]" />
            {tab.label}
            {activeTab === tab.id && <div className="absolute bottom-0 left-0 right-0 h-0.5 md:h-1 bg-blue-600 rounded-full"></div>}
          </button>
        ))}
      </div>

      {activeTab === 'details' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
            <div className="relative flex-1 sm:max-w-[320px]">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
              <input type="text" placeholder="Search labs..." className="w-full pl-12 pr-4 py-2.5 md:py-3 bg-white border border-slate-200 rounded-2xl outline-none focus:border-blue-400 font-bold text-sm" />
            </div>
            {role !== UserRole.USER && (
              <button onClick={() => setModalOpen(true)} className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-2.5 md:py-3 rounded-2xl font-bold shadow-md hover:bg-blue-700 transition-all text-xs md:text-sm">
                <Plus size={18} /> Add Lab
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {labs.map(lab => (
              <div key={lab.id} className="bg-white rounded-[28px] md:rounded-[32px] border border-slate-100 shadow-sm overflow-hidden group hover:shadow-lg transition-all duration-300">
                <div className="h-44 md:h-52 bg-slate-50 relative overflow-hidden">
                  {lab.media[0] ? (
                    <img src={lab.media[0].url} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={lab.name} />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-200"><FlaskConical size={48} /></div>
                  )}
                  <div className="absolute top-4 right-4 flex gap-2 sm:opacity-0 group-hover:opacity-100 transition-all">
                    <button onClick={() => deleteLab(lab.id)} className="p-2 md:p-3 bg-white/90 text-rose-600 rounded-xl shadow-md"><Trash2 size={16}/></button>
                  </div>
                </div>
                <div className="p-5 md:p-6">
                  <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-1 line-clamp-1">{lab.name}</h3>
                  <p className="text-xs md:text-sm text-slate-500 mb-4 md:mb-6 leading-relaxed line-clamp-2">{lab.description}</p>
                  <div className="flex items-center gap-2 text-[10px] md:text-xs font-bold text-slate-400 bg-slate-50 px-3 md:px-4 py-2 md:py-3 rounded-xl line-clamp-1">
                    <MapPin size={14} className="text-blue-600 shrink-0" /> {lab.location}
                  </div>
                  <button className="w-full mt-4 md:mt-6 py-2.5 md:py-3 bg-slate-50 text-slate-900 rounded-xl font-bold text-[10px] md:text-xs uppercase tracking-wider hover:bg-blue-600 hover:text-white transition-all">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'equipment' && (
        <div className="bg-white rounded-[28px] md:rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 md:p-8 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h3 className="text-lg md:text-xl font-bold text-slate-900">Equipment List</h3>
              <p className="text-slate-400 text-[10px] md:text-xs mt-1 uppercase tracking-tight font-semibold">{equipment.length} items total</p>
            </div>
            <button onClick={() => setEqModalOpen(true)} className="w-full sm:w-auto flex items-center justify-center gap-2 bg-zinc-950 text-white px-5 py-2.5 md:py-3 rounded-2xl font-bold shadow-md hover:bg-zinc-800 transition-all text-[10px] md:text-xs uppercase tracking-widest">
              <Plus size={16} /> Add Equipment
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[600px]">
              <thead>
                <tr className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase border-b border-slate-100">
                  <th className="px-6 md:px-8 py-4 md:py-5 tracking-widest">Name</th>
                  <th className="px-6 md:px-8 py-4 md:py-5 tracking-widest">Serial</th>
                  <th className="px-6 md:px-8 py-4 md:py-5 tracking-widest">Calibration</th>
                  <th className="px-6 md:px-8 py-4 md:py-5 text-right tracking-widest">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {equipment.map(item => (
                  <tr key={item.id} className="hover:bg-blue-50/20 transition-colors">
                    <td className="px-6 md:px-8 py-4 md:py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center font-bold text-sm">{item.name[0]}</div>
                        <div>
                          <p className="font-bold text-slate-900 text-xs md:text-sm">{item.name}</p>
                          <p className="text-[9px] md:text-[10px] text-slate-400 font-bold uppercase">{item.manufacturer}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 md:px-8 py-4 md:py-6">
                      <span className="font-mono text-[10px] md:text-xs font-bold text-blue-600 bg-blue-50 px-2 md:px-3 py-1 rounded-full">{item.serialNumber}</span>
                    </td>
                    <td className="px-6 md:px-8 py-4 md:py-6">
                       <span className="text-xs md:text-sm font-bold text-slate-700">{item.nextCalibrationDate}</span>
                    </td>
                    <td className="px-6 md:px-8 py-4 md:py-6 text-right">
                      <button onClick={() => deleteEq(item.id)} className="p-2 text-slate-300 hover:text-rose-600 transition-all"><Trash2 size={16}/></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Lab Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-lg rounded-[28px] md:rounded-[32px] shadow-2xl overflow-y-auto max-h-[90vh] p-6 md:p-10 animate-in zoom-in-95 duration-300">
            <div className="flex justify-between items-center mb-6 md:mb-10">
              <h2 className="text-xl md:text-2xl font-bold text-slate-900">Add New Lab Room</h2>
              <button onClick={() => setModalOpen(false)} className="p-2 bg-slate-50 text-slate-400 hover:text-slate-900 rounded-xl transition-all"><X size={20}/></button>
            </div>
            <div className="space-y-4 md:space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest">Lab Name</label>
                <input type="text" value={newLab.name} onChange={(e) => setNewLab({...newLab, name: e.target.value})} className="w-full px-4 md:px-5 py-3 md:py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none font-bold focus:border-blue-400 text-sm" placeholder="e.g. Physics Lab 1" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest">About the Lab</label>
                <textarea value={newLab.description} onChange={(e) => setNewLab({...newLab, description: e.target.value})} className="w-full px-4 md:px-5 py-3 md:py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none font-bold min-h-[80px] md:min-h-[100px] focus:border-blue-400 text-sm" placeholder="Enter details..." />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mt-8 md:mt-10">
              <button onClick={() => setModalOpen(false)} className="order-2 sm:order-1 flex-1 py-3 md:py-4 font-bold text-slate-500 rounded-2xl hover:bg-slate-50 transition-all uppercase text-[10px] md:text-xs tracking-widest">Cancel</button>
              <button onClick={handleAddLab} className="order-1 sm:order-2 flex-1 py-3 md:py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-lg hover:bg-blue-700 transition-all uppercase text-[10px] md:text-xs tracking-widest">Save Lab</button>
            </div>
          </div>
        </div>
      )}

      {/* Add Equipment Modal */}
      {isEqModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
           <div className="bg-white w-full max-w-lg rounded-[28px] md:rounded-[32px] shadow-2xl overflow-y-auto max-h-[90vh] p-6 md:p-10 animate-in zoom-in-95 duration-300">
              <div className="flex justify-between items-center mb-6 md:mb-10">
                <h2 className="text-xl md:text-2xl font-bold text-slate-900">Add Equipment</h2>
                <button onClick={() => setEqModalOpen(false)} className="p-2 bg-slate-50 text-slate-400 hover:text-slate-900 rounded-xl transition-all"><X size={20}/></button>
              </div>
              <div className="space-y-4 md:space-y-5">
                 <div className="space-y-1">
                    <label className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest">Name</label>
                    <input value={newEq.name} onChange={e => setNewEq({...newEq, name: e.target.value})} className="w-full px-4 md:px-5 py-3 md:py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none font-bold focus:border-blue-400 text-sm" placeholder="e.g. Microscope A1"/>
                 </div>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest">Serial</label>
                      <input value={newEq.serialNumber} onChange={e => setNewEq({...newEq, serialNumber: e.target.value})} className="w-full px-4 md:px-5 py-3 md:py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none font-bold focus:border-blue-400 text-sm" placeholder="SN-XXXX"/>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest">Calibration Date</label>
                      <input type="date" value={newEq.nextCalibrationDate} onChange={e => setNewEq({...newEq, nextCalibrationDate: e.target.value})} className="w-full px-4 md:px-5 py-3 md:py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none font-bold focus:border-blue-400 text-sm"/>
                    </div>
                 </div>
              </div>
              <button onClick={handleAddEquipment} className="w-full mt-8 md:mt-10 py-4 md:py-5 bg-zinc-950 text-white rounded-2xl font-bold shadow-lg hover:bg-zinc-800 transition-all uppercase text-[10px] md:text-xs tracking-widest">
                 Add to Inventory
              </button>
           </div>
        </div>
      )}
    </div>
  );
};

export default LabManagement;
