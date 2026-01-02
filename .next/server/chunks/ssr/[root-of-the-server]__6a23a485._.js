module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/Desktop/llab_man/types.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ScheduleType",
    ()=>ScheduleType,
    "UserRole",
    ()=>UserRole,
    "UserStatus",
    ()=>UserStatus
]);
var UserRole = /*#__PURE__*/ function(UserRole) {
    UserRole["MASTER"] = "Master";
    UserRole["CONFIGURATOR"] = "Configurator";
    UserRole["USER"] = "User";
    return UserRole;
}({});
var UserStatus = /*#__PURE__*/ function(UserStatus) {
    UserStatus["ACTIVE"] = "Active";
    UserStatus["INACTIVE"] = "Inactive";
    UserStatus["SUSPENDED"] = "Suspended";
    return UserStatus;
}({});
var ScheduleType = /*#__PURE__*/ function(ScheduleType) {
    ScheduleType["OPERATION"] = "Operation";
    ScheduleType["MAINTENANCE"] = "Maintenance";
    return ScheduleType;
}({});
}),
"[project]/Desktop/llab_man/app/AuthContext.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthProvider",
    ()=>AuthProvider,
    "useAuth",
    ()=>useAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$llab_man$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/llab_man/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$llab_man$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/llab_man/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$llab_man$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/llab_man/types.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
const AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$llab_man$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
const AuthProvider = ({ children })=>{
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$llab_man$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$llab_man$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$llab_man$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
    }, []);
    const handleLogin = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$llab_man$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((userData)=>{
        setUser(userData);
        localStorage.setItem('sl_session', JSON.stringify(userData));
    }, []);
    const handleLogout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$llab_man$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        setUser(null);
        localStorage.removeItem('sl_session');
    }, []);
    const value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$llab_man$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>({
            user,
            loading,
            handleLogin,
            handleLogout
        }), [
        user,
        loading,
        handleLogin,
        handleLogout
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$llab_man$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/Desktop/llab_man/app/AuthContext.tsx",
        lineNumber: 45,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
const useAuth = ()=>{
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$llab_man$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};
// Storage initialization
const initStorage = ()=>{
    const defaultLabs = [
        {
            id: 'l1',
            name: 'Quantum Physics Hub',
            description: 'A dedicated space for studying modern particles and physics experiments.',
            location: 'Building A, Room 101',
            features: [
                'Vacuum Chamber',
                'Cryogenics'
            ],
            media: [
                {
                    id: 'm1',
                    url: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=800',
                    type: 'image',
                    name: 'Quantum Lab',
                    uploadProgress: 100
                }
            ]
        },
        {
            id: 'l2',
            name: 'Biology Discovery Center',
            description: 'A lab focused on DNA testing and general biology research.',
            location: 'Building B, Room 202',
            features: [
                'Centrifuge',
                'Microscopes'
            ],
            media: [
                {
                    id: 'm2',
                    url: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=800',
                    type: 'image',
                    name: 'Biology Lab',
                    uploadProgress: 100
                }
            ]
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
                status: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$llab_man$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UserStatus"].ACTIVE,
                role: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$llab_man$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UserRole"].MASTER
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
                status: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$llab_man$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UserStatus"].ACTIVE,
                role: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$llab_man$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UserRole"].CONFIGURATOR
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
            {
                id: '1',
                name: 'New Year\'s Day',
                date: '2026-01-01',
                type: 'National',
                description: 'National public holiday'
            },
            {
                id: '2',
                name: 'Chinese New Year (1st Day)',
                date: '2026-02-17',
                type: 'Cultural',
                description: 'Lunar New Year celebration'
            },
            {
                id: '3',
                name: 'Chinese New Year (2nd Day)',
                date: '2026-02-18',
                type: 'Cultural',
                description: 'Second day of celebration'
            },
            {
                id: '4',
                name: 'Hari Raya Puasa',
                date: '2026-03-20',
                type: 'Cultural',
                description: 'End of Ramadan (Eid al-Fitr)'
            },
            {
                id: '5',
                name: 'Hari Raya Puasa (2nd Day)',
                date: '2026-03-21',
                type: 'Cultural',
                description: 'Second day celebration'
            },
            {
                id: '6',
                name: 'Labour Day',
                date: '2026-05-01',
                type: 'National',
                description: 'International Workers\' Day'
            },
            {
                id: '7',
                name: 'Hari Raya Haji',
                date: '2026-05-27',
                type: 'Cultural',
                description: 'Feast of Sacrifice (Eid al-Adha)'
            },
            {
                id: '8',
                name: 'Hari Raya Haji (2nd Day)',
                date: '2026-05-28',
                type: 'Cultural',
                description: 'Second day celebration'
            },
            {
                id: '9',
                name: 'Wesak Day',
                date: '2026-05-31',
                type: 'Cultural',
                description: 'Buddha\'s Birthday'
            },
            {
                id: '10',
                name: 'Birthday of Yang di-Pertuan Agong',
                date: '2026-06-01',
                type: 'National',
                description: 'King\'s official birthday'
            },
            {
                id: '11',
                name: 'Awal Muharram',
                date: '2026-06-17',
                type: 'Cultural',
                description: 'Islamic New Year'
            },
            {
                id: '12',
                name: 'Maulidur Rasul',
                date: '2026-08-25',
                type: 'Cultural',
                description: 'Prophet Muhammad\'s Birthday'
            },
            {
                id: '13',
                name: 'Merdeka Day',
                date: '2026-08-31',
                type: 'National',
                description: 'Malaysia\'s Independence Day'
            },
            {
                id: '14',
                name: 'Malaysia Day',
                date: '2026-09-16',
                type: 'National',
                description: 'Formation of Malaysia'
            },
            {
                id: '15',
                name: 'Deepavali',
                date: '2026-11-08',
                type: 'Cultural',
                description: 'Festival of Lights (Diwali)'
            },
            {
                id: '16',
                name: 'Christmas Day',
                date: '2026-12-25',
                type: 'Cultural',
                description: 'Christian celebration'
            },
            {
                id: '17',
                name: 'School Mid-year Holiday',
                date: '2026-05-30',
                type: 'School',
                description: 'Mid-year break starts'
            },
            {
                id: '18',
                name: 'School Year-end Holiday',
                date: '2026-11-21',
                type: 'School',
                description: 'Year-end break starts'
            }
        ]));
    }
    if (!localStorage.getItem('sl_bookings')) {
        localStorage.setItem('sl_bookings', JSON.stringify([
            {
                id: 'b1',
                labName: 'Quantum Physics Hub',
                type: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$llab_man$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ScheduleType"].OPERATION,
                startTime: '09:00',
                endTime: '11:00',
                userName: 'Usman Ali'
            }
        ]));
    }
};
}),
"[project]/Desktop/llab_man/app/LanguageContext.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LanguageProvider",
    ()=>LanguageProvider,
    "useLanguage",
    ()=>useLanguage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$llab_man$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/llab_man/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$llab_man$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/llab_man/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
const languages = [
    {
        code: 'en',
        name: 'English',
        native: 'English',
        flag: '🇺🇸',
        rtl: false
    },
    {
        code: 'ar',
        name: 'Arabic',
        native: 'العربية',
        flag: '🇸🇦',
        rtl: true
    },
    {
        code: 'fr',
        name: 'French',
        native: 'Français',
        flag: '🇫🇷',
        rtl: false
    },
    {
        code: 'zh',
        name: 'Chinese',
        native: '中文',
        flag: '🇨🇳',
        rtl: false
    }
];
const LanguageContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$llab_man$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
const LanguageProvider = ({ children })=>{
    const [currentLanguage, setCurrentLanguage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$llab_man$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(languages[0]);
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$llab_man$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$llab_man$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
    }, []);
    const handleSetLanguage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$llab_man$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((code)=>{
        const lang = languages.find((l)=>l.code === code);
        if (lang) {
            setCurrentLanguage(lang);
            localStorage.setItem('sl_language', code);
            document.documentElement.lang = code;
            document.documentElement.dir = lang.rtl ? 'rtl' : 'ltr';
        }
    }, []);
    const value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$llab_man$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>({
            currentLanguage,
            setLanguage: handleSetLanguage,
            languages
        }), [
        currentLanguage,
        handleSetLanguage
    ]);
    if (!mounted) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$llab_man$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$llab_man$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
            children: children
        }, void 0, false);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$llab_man$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(LanguageContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/Desktop/llab_man/app/LanguageContext.tsx",
        lineNumber: 70,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
const useLanguage = ()=>{
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$llab_man$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within LanguageProvider');
    }
    return context;
};
}),
"[project]/Desktop/llab_man/app/layout.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RootLayout
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$llab_man$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/llab_man/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$llab_man$2f$app$2f$AuthContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/llab_man/app/AuthContext.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$llab_man$2f$app$2f$LanguageContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/llab_man/app/LanguageContext.tsx [app-ssr] (ecmascript)");
'use client';
;
;
;
;
function RootLayout({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$llab_man$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("html", {
        lang: "en",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$llab_man$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("head", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$llab_man$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("link", {
                    rel: "icon",
                    href: "/favi.png",
                    type: "image/png"
                }, void 0, false, {
                    fileName: "[project]/Desktop/llab_man/app/layout.tsx",
                    lineNumber: 16,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/Desktop/llab_man/app/layout.tsx",
                lineNumber: 15,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$llab_man$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("body", {
                className: "bg-white text-slate-900",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$llab_man$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$llab_man$2f$app$2f$LanguageContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LanguageProvider"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$llab_man$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$llab_man$2f$app$2f$AuthContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AuthProvider"], {
                        children: children
                    }, void 0, false, {
                        fileName: "[project]/Desktop/llab_man/app/layout.tsx",
                        lineNumber: 20,
                        columnNumber: 21
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Desktop/llab_man/app/layout.tsx",
                    lineNumber: 19,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/Desktop/llab_man/app/layout.tsx",
                lineNumber: 18,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/llab_man/app/layout.tsx",
        lineNumber: 14,
        columnNumber: 9
    }, this);
}
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/dynamic-access-async-storage.external.js [external] (next/dist/server/app-render/dynamic-access-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/dynamic-access-async-storage.external.js", () => require("next/dist/server/app-render/dynamic-access-async-storage.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__6a23a485._.js.map