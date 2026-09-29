import React, { useState } from 'react';
import { UserRole, UserAccount } from '../../types';
import {
  Bell,
  Search,
  Menu,
  ChevronDown,
  RotateCcw,
  CheckCircle2,
  Calendar,
  Layers,
  Sparkles,
  ShieldCheck,
  UserCheck,
  GraduationCap,
  User
} from 'lucide-react';

interface TopHeaderProps {
  currentRole: UserRole;
  receptionUser?: UserAccount | null;
  title: string;
  subtitle?: string;
  onSelectRole: (role: UserRole) => void;
  onResetData: () => void;
  onOpenMobileMenu: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  currentRole,
  receptionUser,
  title,
  subtitle,
  onSelectRole,
  onResetData,
  onOpenMobileMenu
}) => {
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  if (currentRole === 'login') return null;

  const getRoleBadge = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return { label: 'Direction', color: 'bg-indigo-50 text-indigo-700 border-indigo-200' };
      case 'reception':
        return { label: 'Guichet Accueil', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
      case 'teacher':
        return { label: 'Formateur', color: 'bg-blue-50 text-blue-700 border-blue-200' };
      case 'student':
        return { label: 'Élève', color: 'bg-purple-50 text-purple-700 border-purple-200' };
      default:
        return { label: 'Démo', color: 'bg-slate-100 text-slate-700 border-slate-200' };
    }
  };

  const getRoleUser = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return { name: 'Directeur Général', detail: 'ETS EL MAALIM · Direction', initials: 'DG', color: 'bg-indigo-600' };
      case 'reception': {
        const name = receptionUser?.name || 'Nadia Benali';
        const initials = name
          .split(' ')
          .map((n: string) => n[0])
          .join('')
          .substring(0, 2)
          .toUpperCase() || 'NB';
        return { name, detail: 'ETS EL MAALIM · Réception', initials, color: 'bg-emerald-600' };
      }
      case 'teacher':
        return { name: 'Ahmed Mansouri', detail: 'Professeur Mathématiques', initials: 'AM', color: 'bg-blue-600' };
      case 'student':
        return { name: 'Sara Benali', detail: 'Terminale 3AS - Grp A', initials: 'SB', color: 'bg-purple-600' };
      default:
        return { name: 'Utilisateur', detail: 'Démo', initials: 'U', color: 'bg-slate-600' };
    }
  };

  const user = getRoleUser(currentRole);
  const badge = getRoleBadge(currentRole);

  return (
    <header className="w-full h-16 shrink-0 bg-white border-b border-slate-200 px-4 lg:px-8 flex items-center justify-between z-20 sticky top-0">
      {/* Left side: Hamburger (mobile) + Page Title & Breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileMenu}
          className="md:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          aria-label="Ouvrir le menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h1 className="text-base md:text-lg font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <span>{title}</span>
            <span className={`hidden sm:inline-flex text-[11px] font-semibold px-2 py-0.5 rounded-full border ${badge.color}`}>
              {badge.label}
            </span>
          </h1>
          {subtitle && (
            <p className="text-xs text-slate-500 hidden sm:block -mt-0.5">{subtitle}</p>
          )}
        </div>
      </div>

      {/* Right side: Quick Search, Reset Data, Notifications & Role Selector Profile */}
      <div className="flex items-center gap-2.5">
        {/* Quick Reset Demo button */}
        <button
          onClick={onResetData}
          className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
          title="Réinitialiser les données de démonstration"
        >
          <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
          <span>Réinitialiser démo</span>
        </button>

        {/* Notifications button */}
        <div className="relative">
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors relative"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-600 ring-2 ring-white" />
          </button>

          {notificationsOpen && (
            <div
              className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-200 p-3 z-50 animate-in fade-in zoom-in-95 duration-100 text-xs"
              onClick={() => setNotificationsOpen(false)}
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 font-bold text-slate-900">
                <span>Notifications Récentes</span>
                <span className="text-[10px] text-blue-600 font-semibold">2 nouvelles</span>
              </div>
              <div className="space-y-2 py-2">
                <div className="p-2 rounded-xl bg-blue-50/70 border border-blue-100 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-slate-900">Séance 17:00 validée</div>
                    <div className="text-[11px] text-slate-500">Ahmed Mansouri a complété la feuille d'émargement.</div>
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-slate-900">Nouveau versement reçu</div>
                    <div className="text-[11px] text-slate-500">6 000 DZD encaissés pour Sara Benali (Reçu REC-2026-0842).</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Vertical divider */}
        <div className="h-6 w-px bg-slate-200 hidden sm:block" />

        {/* User profile dropdown & Role Switcher */}
        <div className="relative">
          <button
            onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
            className="flex items-center gap-2.5 p-1 sm:px-2.5 sm:py-1.5 rounded-xl hover:bg-slate-100 border border-transparent hover:border-slate-200 transition-all text-left"
          >
            <div
              className={`w-8 h-8 rounded-xl ${user.color} text-white font-bold text-xs flex items-center justify-center shadow-xs shrink-0`}
            >
              {user.initials}
            </div>
            <div className="hidden md:block">
              <div className="text-xs font-bold text-slate-900 leading-tight">{user.name}</div>
              <div className="text-[10px] text-slate-500 leading-tight">{user.detail}</div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
          </button>

          {/* Role Dropdown */}
          {roleDropdownOpen && (
            <div
              className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-slate-200 p-2 z-50 animate-in fade-in zoom-in-95 duration-100"
              onClick={() => setRoleDropdownOpen(false)}
            >
              <div className="px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                Changer de rôle démo
              </div>

              <div className="space-y-1">
                <button
                  onClick={() => onSelectRole('admin')}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left text-xs font-semibold transition-colors ${
                    currentRole === 'admin'
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4 text-indigo-600" />
                  <div>
                    <div>Administration</div>
                    <div className="text-[10px] text-slate-500 font-normal">Direction, finances & rapports</div>
                  </div>
                </button>

                <button
                  onClick={() => onSelectRole('reception')}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left text-xs font-semibold transition-colors ${
                    currentRole === 'reception'
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <UserCheck className="w-4 h-4 text-emerald-600" />
                  <div>
                    <div>Réception</div>
                    <div className="text-[10px] text-slate-500 font-normal">Guichet & encaissements</div>
                  </div>
                </button>

                <button
                  onClick={() => onSelectRole('teacher')}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left text-xs font-semibold transition-colors ${
                    currentRole === 'teacher'
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <GraduationCap className="w-4 h-4 text-blue-600" />
                  <div>
                    <div>Formateur (Ahmed)</div>
                    <div className="text-[10px] text-slate-500 font-normal">Pointage des présences & cours</div>
                  </div>
                </button>

                <button
                  onClick={() => onSelectRole('student')}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left text-xs font-semibold transition-colors ${
                    currentRole === 'student'
                      ? 'bg-purple-50 text-purple-700'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <User className="w-4 h-4 text-purple-600" />
                  <div>
                    <div>Élève (Sara)</div>
                    <div className="text-[10px] text-slate-500 font-normal">Planning & statut de présence</div>
                  </div>
                </button>
              </div>

              <div className="pt-2 mt-2 border-t border-slate-100">
                <button
                  onClick={() => onSelectRole('login')}
                  className="w-full text-center py-2 px-3 text-xs font-bold text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-50 transition-colors"
                >
                  Écran de choix des rôles
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
