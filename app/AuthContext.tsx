'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { User, UserRole, UserStatus, ScheduleType } from '@/types';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    handleLogin: (userData: User) => void;
    handleLogout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            initStorage();
            localStorage.removeItem('sl_session');
            setLoading(false);
        }
    }, []);

    const handleLogin = useCallback((userData: User) => {
        setUser(userData);
        localStorage.setItem('sl_session', JSON.stringify(userData));
    }, []);

    const handleLogout = useCallback(() => {
        setUser(null);
        localStorage.removeItem('sl_session');
    }, []);

    const value = useMemo(() => ({
        user,
        loading,
        handleLogin,
        handleLogout
    }), [user, loading, handleLogin, handleLogout]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

// Storage initialization
const initStorage = () => {
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
                uploadProgress: 100
            }]
        }
    ];

    if (!localStorage.getItem('sl_labs')) {
        localStorage.setItem('sl_labs', JSON.stringify(defaultLabs));
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
            { id: '1', name: 'New Year\'s Day', date: '2026-01-01', type: 'National', description: 'National public holiday' },
            { id: '2', name: 'Chinese New Year (1st Day)', date: '2026-02-17', type: 'Cultural', description: 'Lunar New Year celebration' },
            { id: '3', name: 'Chinese New Year (2nd Day)', date: '2026-02-18', type: 'Cultural', description: 'Second day of celebration' },
            { id: '4', name: 'Hari Raya Puasa', date: '2026-03-20', type: 'Cultural', description: 'End of Ramadan (Eid al-Fitr)' },
            { id: '5', name: 'Hari Raya Puasa (2nd Day)', date: '2026-03-21', type: 'Cultural', description: 'Second day celebration' },
            { id: '6', name: 'Labour Day', date: '2026-05-01', type: 'National', description: 'International Workers\' Day' },
            { id: '7', name: 'Hari Raya Haji', date: '2026-05-27', type: 'Cultural', description: 'Feast of Sacrifice (Eid al-Adha)' },
            { id: '8', name: 'Hari Raya Haji (2nd Day)', date: '2026-05-28', type: 'Cultural', description: 'Second day celebration' },
            { id: '9', name: 'Wesak Day', date: '2026-05-31', type: 'Cultural', description: 'Buddha\'s Birthday' },
            { id: '10', name: 'Birthday of Yang di-Pertuan Agong', date: '2026-06-01', type: 'National', description: 'King\'s official birthday' },
            { id: '11', name: 'Awal Muharram', date: '2026-06-17', type: 'Cultural', description: 'Islamic New Year' },
            { id: '12', name: 'Maulidur Rasul', date: '2026-08-25', type: 'Cultural', description: 'Prophet Muhammad\'s Birthday' },
            { id: '13', name: 'Merdeka Day', date: '2026-08-31', type: 'National', description: 'Malaysia\'s Independence Day' },
            { id: '14', name: 'Malaysia Day', date: '2026-09-16', type: 'National', description: 'Formation of Malaysia' },
            { id: '15', name: 'Deepavali', date: '2026-11-08', type: 'Cultural', description: 'Festival of Lights (Diwali)' },
            { id: '16', name: 'Christmas Day', date: '2026-12-25', type: 'Cultural', description: 'Christian celebration' },
            { id: '17', name: 'School Mid-year Holiday', date: '2026-05-30', type: 'School', description: 'Mid-year break starts' },
            { id: '18', name: 'School Year-end Holiday', date: '2026-11-21', type: 'School', description: 'Year-end break starts' }
        ]));
    }

    if (!localStorage.getItem('sl_bookings')) {
        localStorage.setItem('sl_bookings', JSON.stringify([
            { id: 'b1', labName: 'Quantum Physics Hub', type: ScheduleType.OPERATION, startTime: '09:00', endTime: '11:00', userName: 'Usman Ali' }
        ]));
    }
};
