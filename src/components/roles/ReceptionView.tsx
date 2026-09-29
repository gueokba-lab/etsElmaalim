import React, { useState } from 'react';
import { Student, PaymentRecord, SessionItem, Group, ReceptionSection } from '../../types';
import {
  UserPlus,
  Banknote,
  Search,
  Clock,
  AlertCircle,
  Phone,
  CheckCircle2,
  Calendar,
  Layers,
  Sparkles,
  ArrowUpRight,
  Filter,
  Eye,
  Check,
  CreditCard
} from 'lucide-react';

interface ReceptionViewProps {
  currentTab: ReceptionSection;
  students: Student[];
  payments: PaymentRecord[];
  sessions: SessionItem[];
  groups: Group[];
  onOpenAddStudent: () => void;
  onOpenAddPayment: () => void;
  onSelectStudent: (student: Student) => void;
  onSelectRole: (role: any) => void;
}

export const ReceptionView: React.FC<ReceptionViewProps> = ({
  currentTab,
  students,
  payments,
  sessions,
  groups,
  onOpenAddStudent,
  onOpenAddPayment,
  onSelectStudent,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [levelFilter, setLevelFilter] = useState('Tous');
  const [paymentFilter, setPaymentFilter] = useState<'all' | 'unpaid' | 'paid'>('all');

  // Daily operations metrics
  const todayPayments = payments.filter((p) => p.date === "Aujourd'hui" || p.date.includes('28 Sept'));
  const todayRevenue = todayPayments.reduce((sum, p) => sum + p.paidAmount, 0);
  const unpaidStudents = students.filter((s) => s.remainingAmount > 0);
  const totalUnpaid = unpaidStudents.reduce((sum, s) => sum + s.remainingAmount, 0);
  const todaySessions = sessions.filter((s) => s.date === "Aujourd'hui");
  const newStudents = students.slice(0, 5);

  // Search filtered students
  const filteredStudents = students.filter((st) => {
    const fullName = `${st.firstName} ${st.lastName}`.toLowerCase();
    const matchesSearch =
      fullName.includes(searchQuery.toLowerCase()) ||
      st.phone.includes(searchQuery) ||
      st.groupName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = levelFilter === 'Tous' || st.level === levelFilter;
    const matchesPayment =
      paymentFilter === 'all' ||
      (paymentFilter === 'unpaid' && st.remainingAmount > 0) ||
      (paymentFilter === 'paid' && st.remainingAmount === 0);
    return matchesSearch && matchesLevel && matchesPayment;
  });

  return (
    <div className="p-6 lg:px-8 lg:py-6 space-y-6 w-full max-w-none">
      {/* Top Banner & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-blue-900 to-indigo-950 p-6 rounded-2xl text-white shadow-xl shadow-blue-950/10">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-200 border border-blue-400/30 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-blue-300" />
            Guichet & Accueil Opérationnel · ETS EL MAALIM
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Bonjour, Nadia 👋</h1>
          <p className="text-sm text-blue-200/80 mt-1">
            Tableau de bord de réception ETS EL MAALIM — Gestion quotidienne des inscriptions, encaissements et plannings.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenAddStudent}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 active:scale-95 text-white font-semibold rounded-xl text-sm shadow-md shadow-blue-600/30 transition-all cursor-pointer"
          >
            <UserPlus className="w-4 h-4" />
            <span>Inscrire un étudiant</span>
          </button>
          <button
            onClick={onOpenAddPayment}
            className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-semibold rounded-xl text-sm shadow-md shadow-emerald-600/30 transition-all cursor-pointer"
          >
            <Banknote className="w-4 h-4" />
            <span>Encaisser un paiement</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Nouveaux Étudiants</span>
            <div className="text-2xl font-black text-slate-900 mt-1">{newStudents.length}</div>
            <div className="text-xs text-blue-600 font-medium mt-1 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" /> Cette semaine
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <UserPlus className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Paiements du Jour</span>
            <div className="text-2xl font-black text-emerald-600 mt-1">{todayRevenue.toLocaleString()} DA</div>
            <div className="text-xs text-slate-500 font-medium mt-1">
              {todayPayments.length} encaissements
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <Banknote className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Impayés</span>
            <div className="text-2xl font-black text-rose-600 mt-1">{totalUnpaid.toLocaleString()} DA</div>
            <div className="text-xs text-rose-600 font-medium mt-1 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" /> {unpaidStudents.length} étudiants concernés
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
            <AlertCircle className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Séances Aujourd'hui</span>
            <div className="text-2xl font-black text-indigo-600 mt-1">{todaySessions.length}</div>
            <div className="text-xs text-indigo-600 font-medium mt-1 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> Salles opérationnelles
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
            <Calendar className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Main Content Sections Based on Tab or Default Operations Grid */}
      {(currentTab === 'dashboard' || currentTab === 'students') && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Recherche & Fichier des Étudiants</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Vérification rapide du statut d'abonnement, contact et affectation des groupes.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <div className="relative min-w-[220px]">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Nom, tél, groupe..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-medium text-slate-600">
                <button
                  onClick={() => setPaymentFilter('all')}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    paymentFilter === 'all' ? 'bg-white text-slate-900 shadow-xs font-semibold' : ''
                  }`}
                >
                  Tous ({students.length})
                </button>
                <button
                  onClick={() => setPaymentFilter('unpaid')}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    paymentFilter === 'unpaid' ? 'bg-rose-600 text-white shadow-xs font-semibold' : 'text-rose-600'
                  }`}
                >
                  Impayés ({unpaidStudents.length})
                </button>
                <button
                  onClick={() => setPaymentFilter('paid')}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    paymentFilter === 'paid' ? 'bg-emerald-600 text-white shadow-xs font-semibold' : 'text-emerald-700'
                  }`}
                >
                  À jour
                </button>
              </div>

              <select
                value={levelFilter}
                onChange={(e) => setLevelFilter(e.target.value)}
                className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none"
              >
                <option value="Tous">Tous Niveaux</option>
                <option value="3AS (Terminale)">3AS (Terminale)</option>
                <option value="2AS">2AS</option>
                <option value="4AM (BEM)">4AM (BEM)</option>
              </select>
            </div>
          </div>

          {/* Table on Desktop, Cards on Mobile */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Étudiant</th>
                  <th className="py-3 px-4">Téléphone</th>
                  <th className="py-3 px-4">Niveau & Groupe</th>
                  <th className="py-3 px-4">Abonnement</th>
                  <th className="py-3 px-4">Payé / Reste</th>
                  <th className="py-3 px-4">Statut</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredStudents.map((st) => (
                  <tr key={st.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 font-semibold text-slate-900">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-xs">
                          {st.firstName[0]}
                          {st.lastName[0]}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900">
                            {st.lastName} {st.firstName}
                          </div>
                          <div className="text-[11px] text-slate-400 font-normal">{st.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-700 font-mono">
                      <a href={`tel:${st.phone}`} className="hover:text-blue-600 flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5 text-slate-400" />
                        {st.phone}
                      </a>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-800">{st.groupName}</div>
                      <div className="text-[11px] text-slate-400">{st.level}</div>
                    </td>
                    <td className="py-3 px-4 text-slate-700">
                      <span className="font-medium text-slate-800">{st.subscriptionPlan}</span>
                      <div className="text-[11px] text-slate-400">{st.monthlyFee.toLocaleString()} DA/mois</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-bold text-emerald-600">{st.paidAmount.toLocaleString()} DA</div>
                      {st.remainingAmount > 0 ? (
                        <div className="text-[11px] font-semibold text-rose-600">
                          Reste: {st.remainingAmount.toLocaleString()} DA
                        </div>
                      ) : (
                        <div className="text-[11px] text-emerald-600 flex items-center gap-0.5">
                          <Check className="w-3 h-3" /> Réglé
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      {st.remainingAmount > 0 ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-rose-50 text-rose-700 border border-rose-200">
                          <AlertCircle className="w-3 h-3" /> Impayé
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3" /> À jour
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => onSelectStudent(st)}
                          className="px-2.5 py-1.5 bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-600 rounded-lg font-semibold text-xs transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Fiche</span>
                        </button>
                        {st.remainingAmount > 0 && (
                          <button
                            onClick={onOpenAddPayment}
                            className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold text-xs transition-colors flex items-center gap-1 cursor-pointer"
                          >
                            <CreditCard className="w-3.5 h-3.5" />
                            <span>Payer</span>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden divide-y divide-slate-100 p-3 space-y-3">
            {filteredStudents.map((st) => (
              <div key={st.id} className="p-3.5 bg-slate-50/70 rounded-xl border border-slate-200 space-y-2.5">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-bold text-slate-900 text-sm">
                      {st.lastName} {st.firstName}
                    </div>
                    <div className="text-xs text-slate-500">{st.groupName} · {st.level}</div>
                  </div>
                  {st.remainingAmount > 0 ? (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-700">
                      Impayé {st.remainingAmount.toLocaleString()} DA
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700">
                      À jour
                    </span>
                  )}
                </div>

                <div className="text-xs text-slate-600 flex items-center justify-between pt-1 border-t border-slate-200/60">
                  <span className="font-mono text-blue-600">{st.phone}</span>
                  <button
                    onClick={() => onSelectStudent(st)}
                    className="text-xs font-semibold text-blue-600 flex items-center gap-1"
                  >
                    Voir dossier <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Today's Operations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Schedule at Reception */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">Séances du Jour (Accueil)</h2>
              <p className="text-xs text-slate-500">Pour guider les élèves vers les bonnes salles.</p>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-100">
              {todaySessions.length} Séances
            </span>
          </div>

          <div className="space-y-3">
            {todaySessions.map((session) => (
              <div
                key={session.id}
                className="p-3.5 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-slate-50 transition-colors flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-800 font-bold flex flex-col items-center justify-center text-xs shrink-0">
                    <Clock className="w-3.5 h-3.5 mb-0.5" />
                    <span>{session.time}</span>
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-sm">
                      {session.subject} — {session.groupName}
                    </div>
                    <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                      <span>Prof: {session.teacherName}</span>
                      <span>·</span>
                      <span className="font-semibold text-slate-700">{session.room}</span>
                    </div>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                  {session.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Transactions at the Counter */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">Derniers Encaissements au Guichet</h2>
              <p className="text-xs text-slate-500">Reçus délivrés récemment.</p>
            </div>
            <button
              onClick={onOpenAddPayment}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
            >
              + Nouveau reçu
            </button>
          </div>

          <div className="space-y-2.5">
            {payments.slice(0, 5).map((pay) => (
              <div
                key={pay.id}
                className="p-3 rounded-xl border border-slate-100 hover:border-slate-200 transition-colors flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center text-xs">
                    DA
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-xs">{pay.studentName}</div>
                    <div className="text-[11px] text-slate-500">
                      {pay.subscription} · {pay.date}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-emerald-600 text-xs">+{pay.paidAmount.toLocaleString()} DA</div>
                  {pay.remainingAmount > 0 ? (
                    <div className="text-[10px] text-rose-500 font-semibold">Reste: {pay.remainingAmount} DA</div>
                  ) : (
                    <div className="text-[10px] text-emerald-600 font-medium">Soldé</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
