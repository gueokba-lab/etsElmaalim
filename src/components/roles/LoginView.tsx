import React, { useState } from 'react';
import { UserRole, UserAccount } from '../../types';
import {
  GraduationCap,
  ShieldCheck,
  UserCheck,
  BookOpen,
  User,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Lock,
  Mail,
  KeyRound,
  LogIn,
  AlertCircle,
  X
} from 'lucide-react';

interface LoginViewProps {
  onSelectRole: (role: UserRole) => void;
  users: UserAccount[];
  onLoginAttempt?: (role: UserRole, email?: string) => { success: boolean; error?: string };
  onLoginWithCredentials?: (email: string, pass: string) => { success: boolean; error?: string };
}

export const LoginView: React.FC<LoginViewProps> = ({
  onSelectRole,
  users,
  onLoginAttempt,
  onLoginWithCredentials
}) => {
  const [activeTab, setActiveTab] = useState<'quick' | 'credentials'>('quick');
  const [emailInput, setEmailInput] = useState('nadia@centrepro.demo');
  const [passwordInput, setPasswordInput] = useState('123456');
  const [loginError, setLoginError] = useState<string | null>(null);

  const nadiaUser =
    users.find((u) => u.email.toLowerCase() === 'nadia@centrepro.demo') ||
    users.find((u) => u.role === 'reception');
  const isNadiaDisabled = nadiaUser ? !nadiaUser.active : false;

  const handleQuickRole = (role: UserRole) => {
    setLoginError(null);
    if (role === 'reception') {
      if (isNadiaDisabled) {
        setLoginError(
          `Compte désactivé : Le compte de ${nadiaUser?.name || 'Nadia Benali'} (${nadiaUser?.email || 'nadia@centrepro.demo'}) a été suspendu par l'administration.`
        );
        return;
      }
      if (onLoginAttempt) {
        const res = onLoginAttempt('reception');
        if (!res.success) {
          setLoginError(res.error || 'Compte désactivé.');
          return;
        }
      } else {
        onSelectRole('reception');
      }
      return;
    }

    if (onLoginAttempt) {
      const res = onLoginAttempt(role);
      if (!res.success) {
        setLoginError(res.error || 'Erreur de connexion.');
        return;
      }
    } else {
      onSelectRole(role);
    }
  };

  const handleCredentialsLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);

    if (onLoginWithCredentials) {
      const res = onLoginWithCredentials(emailInput, passwordInput);
      if (!res.success) {
        setLoginError(res.error || 'Erreur de connexion.');
        return;
      }
    } else {
      // Fallback
      if (emailInput.toLowerCase().includes('nadia') || emailInput.toLowerCase().includes('reception')) {
        if (isNadiaDisabled) {
          setLoginError("Compte désactivé : Ce compte a été suspendu par l'administration.");
          return;
        }
        onSelectRole('reception');
      } else if (emailInput.toLowerCase().includes('direction') || emailInput.toLowerCase().includes('admin')) {
        onSelectRole('admin');
      } else if (emailInput.toLowerCase().includes('ahmed') || emailInput.toLowerCase().includes('prof')) {
        onSelectRole('teacher');
      } else {
        onSelectRole('student');
      }
    }
  };

  const receptionAccounts = users.filter((u) => u.role === 'reception');

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between">
      {/* Top Navbar */}
      <header className="border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 font-black">
            EM
          </div>
          <div>
            <div className="font-black text-lg tracking-tight text-white flex items-center gap-2">
              ETS EL MAALIM
              <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30">
                ERP SaaS
              </span>
            </div>
            <div className="text-xs text-slate-400">Système de gestion pour centre de formation</div>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-4 text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Portail Web Officiel
          </span>
          <span className="text-slate-700">|</span>
          <span>Année Académique 2026-2027</span>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-8 lg:p-12">
        <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Product Presentation */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
              <Sparkles className="w-4 h-4 text-amber-400" />
              ETS EL MAALIM · Plateforme Intégrale
            </div>

            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
                Pilotez votre centre avec{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-violet-400">
                  excellence
                </span>
                .
              </h1>
              <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                Inscriptions, émargement tactile par formateur, encaissements et suivi des impayés, plannings de salles et partage de cours.
              </p>
            </div>

            {/* Feature Points */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-300">
                <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span>Workflow d'émargement en classe pour formateurs</span>
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-300">
                <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span>Gestion de caisse, reçus d'abonnements & impayés</span>
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-300">
                <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span>Gestion multi-utilisateurs & comptes Réception</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Role Portal */}
          <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-xl font-bold text-white">Connexion au Système</h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  ETS EL MAALIM · Système de gestion pour centre de formation
                </p>
              </div>

              <div className="flex items-center bg-slate-800/80 p-1 rounded-xl text-xs font-semibold">
                <button
                  onClick={() => {
                    setActiveTab('quick');
                    setLoginError(null);
                  }}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    activeTab === 'quick' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Accès Direct
                </button>
                <button
                  onClick={() => {
                    setActiveTab('credentials');
                    setLoginError(null);
                  }}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    activeTab === 'credentials' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Identifiants
                </button>
              </div>
            </div>

            {/* Error Notification Banner */}
            {loginError && (
              <div className="p-4 rounded-2xl bg-rose-950/80 border border-rose-500/50 text-rose-200 text-xs flex items-start gap-3 shadow-lg animate-in fade-in slide-in-from-top-2">
                <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <strong className="block text-sm font-bold text-white mb-0.5">Compte désactivé</strong>
                  <span>{loginError}</span>
                </div>
                <button
                  onClick={() => setLoginError(null)}
                  className="text-rose-400 hover:text-white p-1 rounded-lg hover:bg-rose-900/50 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {activeTab === 'quick' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* 1. Administration */}
                <button
                  onClick={() => handleQuickRole('admin')}
                  className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-indigo-500 text-left transition-all group flex flex-col justify-between cursor-pointer hover:shadow-lg hover:shadow-indigo-500/10"
                >
                  <div className="flex items-start justify-between">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-800">
                      Accès Total
                    </span>
                  </div>
                  <div className="mt-4">
                    <div className="font-bold text-white text-sm group-hover:text-indigo-300 transition-colors flex items-center justify-between">
                      Administration
                      <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      KPIs, plannings, utilisateurs, finances & rapports
                    </div>
                  </div>
                </button>

                {/* 2. Réception - Nadia Benali */}
                <button
                  onClick={() => handleQuickRole('reception')}
                  className={`p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border text-left transition-all group flex flex-col justify-between cursor-pointer hover:shadow-lg ${
                    isNadiaDisabled
                      ? 'border-rose-700/80 ring-1 ring-rose-500/30 opacity-80'
                      : 'border-slate-700/80 hover:border-emerald-500 hover:shadow-emerald-500/10 ring-1 ring-emerald-500/30'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform ${
                        isNadiaDisabled
                          ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                          : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      }`}
                    >
                      <UserCheck className="w-5 h-5" />
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isNadiaDisabled
                          ? 'bg-rose-950 text-rose-300 border border-rose-800'
                          : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                      }`}
                    >
                      {isNadiaDisabled ? 'Compte Désactivé' : 'Nadia Benali'}
                    </span>
                  </div>
                  <div className="mt-4">
                    <div
                      className={`font-bold text-sm transition-colors flex items-center justify-between ${
                        isNadiaDisabled
                          ? 'text-rose-300'
                          : 'text-white group-hover:text-emerald-300'
                      }`}
                    >
                      Réception
                      <ArrowRight
                        className={`w-4 h-4 group-hover:translate-x-1 transition-all ${
                          isNadiaDisabled
                            ? 'text-rose-500'
                            : 'text-slate-500 group-hover:text-emerald-400'
                        }`}
                      />
                    </div>
                    <div
                      className={`text-[11px] font-mono mt-0.5 ${
                        isNadiaDisabled ? 'text-rose-400' : 'text-emerald-300'
                      }`}
                    >
                      {isNadiaDisabled ? 'Accès suspendu par direction' : 'nadia@centrepro.demo · 123456'}
                    </div>
                  </div>
                </button>

                {/* 3. Formateur - Ahmed Mansouri */}
                <button
                  onClick={() => handleQuickRole('teacher')}
                  className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-amber-500 text-left transition-all group flex flex-col justify-between cursor-pointer hover:shadow-lg hover:shadow-amber-500/10"
                >
                  <div className="flex items-start justify-between">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-800">
                      Ahmed Mansouri
                    </span>
                  </div>
                  <div className="mt-4">
                    <div className="font-bold text-white text-sm group-hover:text-amber-300 transition-colors flex items-center justify-between">
                      Formateur
                      <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      Appel en classe (17:00), séances & cours
                    </div>
                  </div>
                </button>

                {/* 4. Élève - Sara Benali */}
                <button
                  onClick={() => handleQuickRole('student')}
                  className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-blue-500 text-left transition-all group flex flex-col justify-between cursor-pointer hover:shadow-lg hover:shadow-blue-500/10"
                >
                  <div className="flex items-start justify-between">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <User className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-950 text-blue-300 border border-blue-800">
                      Sara Benali
                    </span>
                  </div>
                  <div className="mt-4">
                    <div className="font-bold text-white text-sm group-hover:text-blue-300 transition-colors flex items-center justify-between">
                      Élève
                      <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      Prochaine séance, documents & présences
                    </div>
                  </div>
                </button>
              </div>
            ) : (
              <form onSubmit={handleCredentialsLogin} className="space-y-4">
                {/* Reception accounts list selector for testing */}
                <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700 text-xs text-slate-300 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white">Comptes Réception Enregistrés :</span>
                    <span className="text-[11px] text-slate-400">Cliquez pour tester</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {receptionAccounts.map((acc) => (
                      <button
                        key={acc.id}
                        type="button"
                        onClick={() => {
                          setEmailInput(acc.email);
                          setPasswordInput(acc.password || '123456');
                        }}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border flex items-center gap-1.5 transition-colors cursor-pointer ${
                          acc.active
                            ? 'bg-emerald-950/60 text-emerald-300 border-emerald-700/60 hover:bg-emerald-900/60'
                            : 'bg-rose-950/60 text-rose-300 border-rose-700/60 hover:bg-rose-900/60'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            acc.active ? 'bg-emerald-400' : 'bg-rose-400'
                          }`}
                        />
                        <span>{acc.name}</span>
                        {!acc.active && <span className="text-[9px] uppercase font-bold">(Désactivé)</span>}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Adresse Email</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      placeholder="nom@elmaalim.dz ou nadia@centrepro.demo"
                      className="w-full pl-10 pr-3.5 py-2.5 bg-slate-800/90 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Mot de passe</label>
                  <div className="relative">
                    <KeyRound className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-3.5 py-2.5 bg-slate-800/90 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-blue-600 hover:bg-blue-500 active:scale-98 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Se connecter à ETS EL MAALIM</span>
                </button>
              </form>
            )}

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 text-xs text-slate-400 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-slate-500" />
                Accès direct sans mot de passe activé pour la présentation au propriétaire.
              </span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 px-6 py-4 text-center text-xs text-slate-500">
        ETS EL MAALIM © 2026 · Système de gestion pour centre de formation · Démo Interactive Web
      </footer>
    </div>
  );
};
