import React from 'react';
import { UserRole } from '../../types';
import {
  LayoutDashboard,
  Users,
  Calendar,
  CreditCard,
  MoreHorizontal,
  UserPlus,
  Banknote,
  Clock,
  User,
  CalendarCheck,
  FileText,
  CheckSquare
} from 'lucide-react';

interface BottomNavProps {
  currentRole: UserRole;
  adminTab: string;
  setAdminTab: (tab: any) => void;
  receptionTab: string;
  setReceptionTab: (tab: any) => void;
  teacherTab: string;
  setTeacherTab: (tab: any) => void;
  studentTab: string;
  setStudentTab: (tab: any) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentRole,
  adminTab,
  setAdminTab,
  receptionTab,
  setReceptionTab,
  teacherTab,
  setTeacherTab,
  studentTab,
  setStudentTab
}) => {
  if (currentRole === 'login') return null;

  // Render navigation based on current role
  if (currentRole === 'admin') {
    const tabs = [
      { id: 'home', label: 'Accueil', icon: LayoutDashboard },
      { id: 'students', label: 'Étudiants', icon: Users },
      { id: 'planning', label: 'Planning', icon: Calendar },
      { id: 'payments', label: 'Paiements', icon: CreditCard },
      { id: 'more', label: 'Plus', icon: MoreHorizontal }
    ];

    return (
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 pb-safe shadow-lg">
        <div className="grid grid-cols-5 items-center h-15 max-w-lg mx-auto px-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = adminTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setAdminTab(tab.id)}
                className={`min-h-[46px] min-w-[44px] flex flex-col items-center justify-center gap-1 transition-colors ${
                  isActive ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
                <span className={`text-[10px] tracking-tight leading-none ${isActive ? 'font-bold' : 'font-medium'}`}>
                  {tab.label}
                </span>
                {isActive && <span className="w-1 h-1 rounded-full bg-indigo-600 -mb-1" />}
              </button>
            );
          })}
        </div>
      </nav>
    );
  }

  if (currentRole === 'reception') {
    const tabs = [
      { id: 'home', label: 'Accueil', icon: LayoutDashboard },
      { id: 'students', label: 'Inscriptions', icon: UserPlus },
      { id: 'payments', label: 'Paiements', icon: Banknote },
      { id: 'planning', label: 'Séances', icon: Clock },
      { id: 'profile', label: 'Guichet', icon: User }
    ];

    return (
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 pb-safe shadow-lg">
        <div className="grid grid-cols-5 items-center h-15 max-w-lg mx-auto px-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = receptionTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setReceptionTab(tab.id)}
                className={`min-h-[46px] min-w-[44px] flex flex-col items-center justify-center gap-1 transition-colors ${
                  isActive ? 'text-emerald-600' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
                <span className={`text-[10px] tracking-tight leading-none ${isActive ? 'font-bold' : 'font-medium'}`}>
                  {tab.label}
                </span>
                {isActive && <span className="w-1 h-1 rounded-full bg-emerald-600 -mb-1" />}
              </button>
            );
          })}
        </div>
      </nav>
    );
  }

  if (currentRole === 'teacher') {
    const tabs = [
      { id: 'home', label: 'Accueil', icon: LayoutDashboard },
      { id: 'sessions', label: 'Séances', icon: CalendarCheck },
      { id: 'groups', label: 'Groupes', icon: Users },
      { id: 'documents', label: 'Documents', icon: FileText },
      { id: 'profile', label: 'Profil', icon: User }
    ];

    return (
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 pb-safe shadow-lg">
        <div className="grid grid-cols-5 items-center h-15 max-w-lg mx-auto px-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = teacherTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setTeacherTab(tab.id)}
                className={`min-h-[46px] min-w-[44px] flex flex-col items-center justify-center gap-1 transition-colors ${
                  isActive ? 'text-blue-600' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
                <span className={`text-[10px] tracking-tight leading-none ${isActive ? 'font-bold' : 'font-medium'}`}>
                  {tab.label}
                </span>
                {isActive && <span className="w-1 h-1 rounded-full bg-blue-600 -mb-1" />}
              </button>
            );
          })}
        </div>
      </nav>
    );
  }

  if (currentRole === 'student') {
    const tabs = [
      { id: 'home', label: 'Accueil', icon: LayoutDashboard },
      { id: 'planning', label: 'Planning', icon: Calendar },
      { id: 'attendance', label: 'Présences', icon: CheckSquare },
      { id: 'documents', label: 'Documents', icon: FileText },
      { id: 'profile', label: 'Profil', icon: User }
    ];

    return (
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 pb-safe shadow-lg">
        <div className="grid grid-cols-5 items-center h-15 max-w-lg mx-auto px-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = studentTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setStudentTab(tab.id)}
                className={`min-h-[46px] min-w-[44px] flex flex-col items-center justify-center gap-1 transition-colors ${
                  isActive ? 'text-violet-600' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
                <span className={`text-[10px] tracking-tight leading-none ${isActive ? 'font-bold' : 'font-medium'}`}>
                  {tab.label}
                </span>
                {isActive && <span className="w-1 h-1 rounded-full bg-violet-600 -mb-1" />}
              </button>
            );
          })}
        </div>
      </nav>
    );
  }

  return null;
};
