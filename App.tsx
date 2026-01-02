
import React, { useState, useEffect } from 'react';
import Login from './pages/Login';
import Signup from './pages/auth';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';
import LabManagement from './pages/LabManagement';
import Scheduling from './pages/Scheduling';
import UserManagement from './pages/UserManagement';
import OffDays from './pages/OffDays';
import GroupManagement from './pages/GroupManagement';
import LanguageSelection from './pages/LanguageSelection';
import Layout from './components/Layout';
import { User, UserRole, UserStatus, ScheduleType } from './types';

// Storage initialization with improved URLs and simpler language
const initStorage = () => {
  // Always clear labs for this update to fix the broken image issue
  const defaultLabs = [
    {
      id: 'l1',
      name: 'Quantum Physics Hub',
      description: 'A dedicated space for studying modern particles and physics experiments.',
      location: 'Building A, Room 101',
      features: ['Vacuum Chamber', 'Cryogenics'],
      media: [{
        id: 'm1',
        url: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=800',
        type: 'image',
        name: 'Quantum Lab',
        // Fix: Added required uploadProgress property
        uploadProgress: 100
      }]
    },
    {
      id: 'l2',
      name: 'Biology Discovery Center',
      description: 'A lab focused on DNA testing and general biology research.',
      location: 'Building B, Room 202',
      features: ['Centrifuge', 'Microscopes'],
      media: [{
        id: 'm2',
        url: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=800',
        type: 'image',
        name: 'Biology Lab',
        // Fix: Added required uploadProgress property
        uploadProgress: 100
      }]
    }
  ];

  if (!localStorage.getItem('sl_labs')) {
    localStorage.setItem('sl_labs', JSON.stringify(defaultLabs));
  } else {
    // Check if the current lab 1 image is the old broken one and fix it
    const existingLabs = JSON.parse(localStorage.getItem('sl_labs') || '[]');
    if (existingLabs.length > 0 && existingLabs[0].media[0].url.includes('photo-1581093458791')) {
      localStorage.setItem('sl_labs', JSON.stringify(defaultLabs));
    }
  }

  if (!localStorage.getItem('sl_users')) {
    localStorage.setItem('sl_users', JSON.stringify([
      {
        id: 'u1',
        firstName: 'Usman',
        lastName: 'Ali',
        studentId: 'STU-1001',
        email: 'usman@smartlab.com',
        phone: '+1 234 567 8901',
        registrationDate: '2023-10-01',
        effectiveFrom: '2023-10-01',
        effectiveTo: '2025-10-01',
        status: UserStatus.ACTIVE,
        role: UserRole.MASTER
      },
      {
        id: 'u2',
        firstName: 'Awab',
        lastName: 'Khan',
        studentId: 'STU-1002',
        email: 'awab@smartlab.com',
        phone: '+1 234 567 8902',
        registrationDate: '2023-10-05',
        effectiveFrom: '2023-10-05',
        effectiveTo: '2024-10-05',
        status: UserStatus.ACTIVE,
        role: UserRole.CONFIGURATOR
      }
    ]));
  }

  if (!localStorage.getItem('sl_equipment')) {
    localStorage.setItem('sl_equipment', JSON.stringify([
      {
        id: 'e1',
        name: 'Digital Microscope',
        manufacturer: 'Zeiss',
        model: 'Sigma 500',
        serialNumber: 'Z-SEM-9921',
        procurementDate: '2023-01-10',
        invoiceNumber: 'INV-001',
        lastCalibrationDate: '2023-06-15',
        nextCalibrationDate: '2025-06-15',
        calibrationFrequency: 'Yearly'
      }
    ]));
  }

  if (!localStorage.getItem('sl_holidays')) {
    localStorage.setItem('sl_holidays', JSON.stringify([
      { id: '1', name: 'New Year', date: '2024-01-01', type: 'Public' },
      { id: '2', name: 'National Holiday', date: '2024-05-01', type: 'Public' }
    ]));
  }

  if (!localStorage.getItem('sl_bookings')) {
    localStorage.setItem('sl_bookings', JSON.stringify([
      { id: 'b1', labName: 'Quantum Physics Hub', type: ScheduleType.OPERATION, startTime: '09:00', endTime: '11:00', userName: 'Usman Ali' }
    ]));
  }
};

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initStorage();
    const savedUser = localStorage.getItem('sl_session');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const handleLogin = (userData: User) => {
    setUser(userData);
    localStorage.setItem('sl_session', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('sl_session');
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-zinc-950">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <div className="space-y-1">
            <span className="text-white font-bold tracking-[0.2em] text-lg block uppercase">SmartLab</span>
            <span className="text-blue-500 font-medium tracking-widest text-xs animate-pulse">Loading App...</span>
          </div>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    if (!user) return <Login onLogin={handleLogin} />;

    switch (true) {
      case window.location.hash === '#/language':
        return <LanguageSelection />;
      case window.location.hash === '#/login':
        return <Login onLogin={handleLogin} />;
      case window.location.hash === '#/signup':
        return <Signup />;
      case window.location.hash === '#/forgot-password':
        return <ForgotPassword />;
      case window.location.hash === '#/':
        return <Layout user={user} onLogout={handleLogout}><Dashboard /></Layout>;
      case window.location.hash === '#/labs':
        return <Layout user={user} onLogout={handleLogout}><LabManagement role={user.role || UserRole.USER} /></Layout>;
      case window.location.hash === '#/scheduling':
        return <Layout user={user} onLogout={handleLogout}><Scheduling /></Layout>;
      case window.location.hash === '#/users':
        return <Layout user={user} onLogout={handleLogout}><UserManagement /></Layout>;
      case window.location.hash === '#/off-days':
        return <Layout user={user} onLogout={handleLogout}><OffDays /></Layout>;
      case window.location.hash === '#/groups':
        return <Layout user={user} onLogout={handleLogout}><GroupManagement /></Layout>;
      default:
        return user ? <Layout user={user} onLogout={handleLogout}><Dashboard /></Layout> : <Login onLogin={handleLogin} />;
    }
  };

  return (
    <div>
      {window.location.hash === '#/language' && <LanguageSelection />}
      {!window.location.hash.startsWith('#/language') && !window.location.hash.startsWith('#/login') && !window.location.hash.startsWith('#/signup') && !window.location.hash.startsWith('#/forgot-password') && renderContent()}
      {(window.location.hash.startsWith('#/login') || window.location.hash === '') && !user && <Login onLogin={handleLogin} />}
      {window.location.hash.startsWith('#/signup') && !user && <Signup />}
      {window.location.hash.startsWith('#/forgot-password') && <ForgotPassword />}
    </div>
  );
};

export default App;
