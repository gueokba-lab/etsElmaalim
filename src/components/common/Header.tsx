import React, { useState } from 'react';
import { UserRole } from '../../types';
import {
  GraduationCap,
  Menu,
  X,
  Smartphone,
  Maximize2,
  RotateCcw,
  LogOut,
  ShieldCheck,
  UserCheck,
  BookOpen,
  User,
  ChevronDown
} from 'lucide-react';

interface HeaderProps {
  currentRole: UserRole;
  onSelectRole: (role: UserRole) => void;
  deviceFrame: boolean;
  onToggleDeviceFrame: () => void;
  onResetData: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentRole,
  onSelectRole,
  deviceFrame,
  onToggleDeviceFrame,
  onResetData
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);

  const getRoleLabel = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return 'Administration';
      case 'reception':
        return 'Réception';
      case 'teacher':
        return 'Formateur';
      case 'student':
        return 'Élève (Sara)';
      default:
        return 'Connexion';
    }
  };

  const getRoleBadge = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return { label: 'Direction', color: 'bg-indigo-900/40 text-indigo-400 border-indigo-700/50' };
      case 'reception':
        return { label: 'Accueil', color: 'bg-emerald-900/40 text-emerald-400 border-emerald-700/50' };
      case 'teacher':
        return { label: 'Enseignant', color: 'bg-blue-900/40 text-blue-400 border-blue-700/50' };
      case 'student':
        return { label: '3AS Groupe A', color: 'bg-violet-900/40 text-violet-400 border-violet-700/50' };
      default:
        return { label: 'Démo', color: 'bg-slate-800 text-slate-300 border-slate-700' };
    }
  };

  const badge = getRoleBadge(currentRole);

  return (
    <>
      <header className="sticky top-0 z-30 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 px-4 py-2.5 text-white">
        <div className="flex items-center justify-between gap-2">
          {/* Brand Wordmark & Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shadow-md shadow-blue-900/30">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-base tracking-tight text-white">CENTRE PRO</span>
                {currentRole !== 'login' && (
                  <span className={`text-[10px] font-medium px-1.5 py-0.2 rounded border ${badge.color}`}>
                    {badge.label}
                  </span>
                )}
              </div>
              <div className="text-[10px] text-slate-400 -mt-0.5 hidden xs:block">
                Système de Gestion
              </div>
            </div>
          </div>

          {/* Actions & Role Switcher */}
          <div className="flex items-center gap-1.5">
            {currentRole !== 'login' && (
              <div className="relative">
                <button
                  onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800/90 hover:bg-slate-750 border border-slate-700 text-xs font-medium text-slate-200 transition-colors"
                  title="Changer d'espace pour la démo"
                >
                  <span className="max-w-[85px] truncate">{getRoleLabel(currentRole)}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {isRoleDropdownOpen && (
                  <div
                    className="absolute right-0 mt-1.5 w-48 bg-slate-900 border border-slate-700/80 rounded-xl shadow-xl py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100"
                    onClick={() => setIsRoleDropdownOpen(false)}
                  >
                    <div className="px-3 py-1 text-[10px] uppercase tracking-wider font-semibold text-slate-400">
                      Changer d'espace
                    </div>
                    <button
                      onClick={() => onSelectRole('admin')}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 text-left text-xs font-medium transition-colors ${
                        currentRole === 'admin' ? 'bg-indigo-600/20 text-indigo-300' : 'text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <ShieldCheck className="w-4 h-4 text-indigo-400" />
                      <div>
                        <div>Administration</div>
                        <div className="text-[10px] text-slate-400">Direction & Finances</div>
                      </div>
                    </button>
                    <button
                      onClick={() => onSelectRole('reception')}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 text-left text-xs font-medium transition-colors ${
                        currentRole === 'reception' ? 'bg-emerald-600/20 text-emerald-300' : 'text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <UserCheck className="w-4 h-4 text-emerald-400" />
                      <div>
                        <div>Réception</div>
                        <div className="text-[10px] text-slate-400">Accueil & Inscriptions</div>
                      </div>
                    </button>
                    <button
                      onClick={() => onSelectRole('teacher')}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 text-left text-xs font-medium transition-colors ${
                        currentRole === 'teacher' ? 'bg-blue-600/20 text-blue-300' : 'text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <BookOpen className="w-4 h-4 text-blue-400" />
                      <div>
                        <div>Formateur</div>
                        <div className="text-[10px] text-slate-400">Ahmed Mansouri (Maths)</div>
                      </div>
                    </button>
                    <button
                      onClick={() => onSelectRole('student')}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 text-left text-xs font-medium transition-colors ${
                        currentRole === 'student' ? 'bg-violet-600/20 text-violet-300' : 'text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <User className="w-4 h-4 text-violet-400" />
                      <div>
                        <div>Élève</div>
                        <div className="text-[10px] text-slate-400">Sara Benali (3AS A)</div>
                      </div>
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Menu trigger button */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              aria-label="Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Slide-over Drawer / Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end">
          <div
            className="w-full max-w-xs bg-slate-900 border-l border-slate-800 h-full flex flex-col p-4 text-white shadow-2xl animate-in slide-in-from-right duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-md bg-indigo-600 flex items-center justify-center">
                  <GraduationCap className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-sm font-bold">CENTRE PRO</div>
                  <div className="text-[10px] text-slate-400">Options & Démonstration</div>
                </div>
              </div>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-1 text-slate-400 hover:text-white"
                aria-label="Fermer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content & Role Selection */}
            <div className="flex-1 overflow-y-auto py-4 space-y-4">
              <div>
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Espaces Utilisateurs
                </div>
                <div className="space-y-1">
                  <button
                    onClick={() => {
                      onSelectRole('admin');
                      setIsMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-left transition-colors ${
                      currentRole === 'admin'
                        ? 'bg-indigo-600/20 border-indigo-500/50 text-white font-medium'
                        : 'bg-slate-800/40 border-slate-800 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <ShieldCheck className="w-4 h-4 text-indigo-400" />
                      <div>
                        <div className="text-xs">Administration</div>
                        <div className="text-[10px] text-slate-400">Direction générale & finances</div>
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      onSelectRole('reception');
                      setIsMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-left transition-colors ${
                      currentRole === 'reception'
                        ? 'bg-emerald-600/20 border-emerald-500/50 text-white font-medium'
                        : 'bg-slate-800/40 border-slate-800 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <UserCheck className="w-4 h-4 text-emerald-400" />
                      <div>
                        <div className="text-xs">Réception</div>
                        <div className="text-[10px] text-slate-400">Inscriptions & paiements rapides</div>
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      onSelectRole('teacher');
                      setIsMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-left transition-colors ${
                      currentRole === 'teacher'
                        ? 'bg-blue-600/20 border-blue-500/50 text-white font-medium'
                        : 'bg-slate-800/40 border-slate-800 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <BookOpen className="w-4 h-4 text-blue-400" />
                      <div>
                        <div className="text-xs">Formateur (Ahmed)</div>
                        <div className="text-[10px] text-slate-400">Appel & séances du jour</div>
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      onSelectRole('student');
                      setIsMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-left transition-colors ${
                      currentRole === 'student'
                        ? 'bg-violet-600/20 border-violet-500/50 text-white font-medium'
                        : 'bg-slate-800/40 border-slate-800 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <User className="w-4 h-4 text-violet-400" />
                      <div>
                        <div className="text-xs">Élève (Sara)</div>
                        <div className="text-[10px] text-slate-400">Planning & suivi des présences</div>
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Display & Presentation options */}
              <div>
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Mode de Présentation
                </div>
                <div className="space-y-1">
                  <button
                    onClick={() => {
                      onToggleDeviceFrame();
                      setIsMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl bg-slate-800/50 border border-slate-800 hover:bg-slate-800 text-left transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      {deviceFrame ? (
                        <Maximize2 className="w-4 h-4 text-amber-400" />
                      ) : (
                        <Smartphone className="w-4 h-4 text-emerald-400" />
                      )}
                      <div>
                        <div className="text-xs font-medium">
                          {deviceFrame ? 'Plein Écran Fluide' : 'Cadre Smartphone Démo'}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {deviceFrame
                            ? 'Afficher sans bordure de téléphone'
                            : 'Simuler un châssis iPhone 16 Pro'}
                        </div>
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Maintenance & Reset */}
              <div>
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Démo
                </div>
                <button
                  onClick={() => {
                    onResetData();
                    setIsMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-800/30 border border-slate-800 hover:bg-slate-800 text-slate-300 text-left text-xs transition-colors"
                >
                  <RotateCcw className="w-4 h-4 text-blue-400" />
                  <div>
                    <div className="font-medium">Réinitialiser les données</div>
                    <div className="text-[10px] text-slate-400">Recharger le scénario initial</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Logout button */}
            <div className="pt-3 border-t border-slate-800">
              <button
                onClick={() => {
                  onSelectRole('login');
                  setIsMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-rose-600/10 hover:bg-rose-600/20 text-rose-400 border border-rose-600/30 text-xs font-medium transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Changer de rôle / Écran de Connexion</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
