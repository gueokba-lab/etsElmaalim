import React, { useState } from 'react';
import {
  Student,
  Teacher,
  Group,
  SessionItem,
  AttendanceRecord,
  PaymentRecord,
  DocumentItem,
  AdminSection,
  UserAccount
} from '../../types';
import {
  Users,
  GraduationCap,
  Layers,
  Calendar,
  CreditCard,
  CheckCircle2,
  AlertCircle,
  Plus,
  Search,
  Eye,
  Edit,
  Trash2,
  Download,
  Filter,
  BarChart3,
  Clock,
  ArrowUpRight,
  Sparkles,
  Banknote,
  DoorOpen,
  BookOpen,
  Settings,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  FileText,
  ShieldCheck,
  UserCheck,
  Lock,
  X,
  Check
} from 'lucide-react';

interface AdminViewProps {
  currentSection: AdminSection;
  setSection: (section: AdminSection) => void;
  students: Student[];
  teachers: Teacher[];
  groups: Group[];
  sessions: SessionItem[];
  attendance: AttendanceRecord[];
  payments: PaymentRecord[];
  documents: DocumentItem[];
  users: UserAccount[];
  onOpenAddStudent: () => void;
  onEditStudent: (student: Student) => void;
  onDeleteStudent: (studentId: string) => void;
  onOpenAddPayment: () => void;
  onOpenAddDocument: () => void;
  onOpenAddSession: () => void;
  onDeleteSession: (sessionId: string) => void;
  onSelectStudent: (student: Student) => void;
  onPreviewDocument: (doc: DocumentItem) => void;
  onAddUser: (user: Omit<UserAccount, 'id' | 'createdAt' | 'lastLogin'>) => void;
  onUpdateUser: (user: UserAccount) => void;
  onToggleUserStatus: (userId: string) => void;
  onDeleteUser: (userId: string) => void;
}

export const AdminView: React.FC<AdminViewProps> = ({
  currentSection,
  setSection,
  students,
  teachers,
  groups,
  sessions,
  attendance,
  payments,
  documents,
  users,
  onOpenAddStudent,
  onEditStudent,
  onDeleteStudent,
  onOpenAddPayment,
  onOpenAddDocument,
  onOpenAddSession,
  onDeleteSession,
  onSelectStudent,
  onPreviewDocument,
  onAddUser,
  onUpdateUser,
  onToggleUserStatus,
  onDeleteUser
}) => {
  // User Management State
  const [userSearch, setUserSearch] = useState('');
  const [userRoleFilter, setUserRoleFilter] = useState('Tous');
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserAccount | null>(null);

  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserPassword, setNewUserPassword] = useState('123456');
  const [newUserRole, setNewUserRole] = useState<'reception' | 'admin'>('reception');
  const [newUserPerms, setNewUserPerms] = useState({
    canRegisterStudents: true,
    canCollectPayments: true,
    canViewPlanning: true,
    canExportReports: false
  });

  // Filters & Search
  const [studentSearch, setStudentSearch] = useState('');
  const [studentLevelFilter, setStudentLevelFilter] = useState('Tous');
  const [studentSortField, setStudentSortField] = useState<'name' | 'attendance' | 'remaining'>('name');
  const [studentPage, setStudentPage] = useState(1);
  const studentsPerPage = 7;

  // Payments filter
  const [paymentSearch, setPaymentSearch] = useState('');
  const [paymentStatusFilter, setPaymentStatusFilter] = useState('Tous');

  // KPI Calculations
  const totalStudents = students.length;
  const totalTeachers = teachers.length;
  const totalGroups = groups.length;
  const todaySessions = sessions.filter((s) => s.day === 'Mardi');
  const monthlyRevenue = payments.reduce((acc, p) => acc + p.paidAmount, 0);
  const totalUnpaid = students.reduce((acc, s) => acc + s.remainingAmount, 0);
  const totalExpected = students.reduce((acc, s) => acc + s.monthlyFee, 0);

  const totalAttendanceRecords = attendance.length;
  const presentRecords = attendance.filter((a) => a.status === 'present').length;
  const globalAttendanceRate = totalAttendanceRecords > 0
    ? Math.round((presentRecords / totalAttendanceRecords) * 100)
    : 94;

  // Student filtering & sorting
  const filteredStudents = students
    .filter((st) => {
      const matchSearch =
        `${st.firstName} ${st.lastName}`.toLowerCase().includes(studentSearch.toLowerCase()) ||
        st.phone.includes(studentSearch) ||
        st.groupName.toLowerCase().includes(studentSearch.toLowerCase());
      const matchLevel = studentLevelFilter === 'Tous' || st.level === studentLevelFilter;
      return matchSearch && matchLevel;
    })
    .sort((a, b) => {
      if (studentSortField === 'name') return a.lastName.localeCompare(b.lastName);
      if (studentSortField === 'attendance') return b.attendanceRate - a.attendanceRate;
      if (studentSortField === 'remaining') return b.remainingAmount - a.remainingAmount;
      return 0;
    });

  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage) || 1;
  const paginatedStudents = filteredStudents.slice(
    (studentPage - 1) * studentsPerPage,
    studentPage * studentsPerPage
  );

  // Payments filtering
  const filteredPayments = payments.filter((p) => {
    const matchSearch =
      p.studentName.toLowerCase().includes(paymentSearch.toLowerCase()) ||
      p.receiptNumber.toLowerCase().includes(paymentSearch.toLowerCase());
    const matchStatus = paymentStatusFilter === 'Tous' || p.status === paymentStatusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="p-6 lg:px-8 lg:py-6 space-y-6 w-full max-w-none">
      {/* ========================================================================= */}
      {/* 1. TABLEAU DE BORD (DESKTOP GRID OF 7 KPI CARDS + 4 ACTIONABLE TABLES)     */}
      {/* ========================================================================= */}
      {currentSection === 'dashboard' && (
        <div className="space-y-6">
          {/* Welcome Banner */}
          <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-6 shadow-md border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 px-2.5 py-0.5 rounded-full border border-indigo-500/30">
                  Vue Direction & Direction Générale
                </span>
                <span className="text-xs text-slate-400">· Mardi 29 Septembre 2026</span>
              </div>
              <h1 className="text-2xl font-black tracking-tight text-white mt-1.5">
                Tableau de bord de gestion · ETS EL MAALIM
              </h1>
              <p className="text-xs text-slate-300 mt-1 max-w-2xl">
                Suivi global en direct du centre ETS EL MAALIM : effectifs élèves, formateurs, émargements en classe, trésorerie et comptes utilisateurs.
              </p>
            </div>

            <div className="flex items-center gap-2.5 shrink-0">
              <button
                onClick={onOpenAddStudent}
                className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-blue-600/25 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Nouvel Étudiant</span>
              </button>
              <button
                onClick={onOpenAddPayment}
                className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-emerald-600/25 transition-all"
              >
                <Banknote className="w-4 h-4" />
                <span>Encaisser Reçu</span>
              </button>
            </div>
          </div>

          {/* 7 KPI Cards Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {/* 1. Nombre d'étudiants */}
            <div
              onClick={() => setSection('students')}
              className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs hover:border-blue-400 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
                <span>Étudiants</span>
                <Users className="w-4 h-4 text-blue-500 group-hover:scale-110 transition-transform" />
              </div>
              <div className="text-2xl font-black text-slate-900 mt-2">{totalStudents}</div>
              <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
                <span className="text-emerald-600 font-bold">+4</span> ce mois
              </div>
            </div>

            {/* 2. Nombre de formateurs */}
            <div
              onClick={() => setSection('teachers')}
              className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs hover:border-indigo-400 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
                <span>Formateurs</span>
                <GraduationCap className="w-4 h-4 text-indigo-500 group-hover:scale-110 transition-transform" />
              </div>
              <div className="text-2xl font-black text-slate-900 mt-2">{totalTeachers}</div>
              <div className="text-[11px] text-slate-500 mt-1">Actifs en poste</div>
            </div>

            {/* 3. Nombre de groupes */}
            <div
              onClick={() => setSection('groups')}
              className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs hover:border-purple-400 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
                <span>Groupes</span>
                <Layers className="w-4 h-4 text-purple-500 group-hover:scale-110 transition-transform" />
              </div>
              <div className="text-2xl font-black text-slate-900 mt-2">{totalGroups}</div>
              <div className="text-[11px] text-slate-500 mt-1">3AS, 2AS, BEM</div>
            </div>

            {/* 4. Séances aujourd'hui */}
            <div
              onClick={() => setSection('planning')}
              className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs hover:border-amber-400 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
                <span>Séances jour</span>
                <Calendar className="w-4 h-4 text-amber-500 group-hover:scale-110 transition-transform" />
              </div>
              <div className="text-2xl font-black text-slate-900 mt-2">{todaySessions.length}</div>
              <div className="text-[11px] text-slate-500 mt-1">Salles 01, 02, 03</div>
            </div>

            {/* 5. Paiements du mois */}
            <div
              onClick={() => setSection('payments')}
              className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs hover:border-emerald-400 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
                <span>Paiements</span>
                <CreditCard className="w-4 h-4 text-emerald-500 group-hover:scale-110 transition-transform" />
              </div>
              <div className="text-xl font-black text-emerald-600 mt-2 truncate">
                {(monthlyRevenue / 1000).toFixed(1)}k <span className="text-xs font-semibold text-slate-500">DZD</span>
              </div>
              <div className="text-[11px] text-emerald-600 font-semibold mt-1">
                {monthlyRevenue.toLocaleString()} DZD
              </div>
            </div>

            {/* 6. Impayés */}
            <div
              onClick={() => setSection('payments')}
              className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs hover:border-rose-400 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
                <span>Impayés</span>
                <AlertCircle className="w-4 h-4 text-rose-500 group-hover:scale-110 transition-transform" />
              </div>
              <div className="text-xl font-black text-rose-600 mt-2 truncate">
                {(totalUnpaid / 1000).toFixed(1)}k <span className="text-xs font-semibold text-slate-500">DZD</span>
              </div>
              <div className="text-[11px] text-rose-600 font-semibold mt-1">
                À relancer
              </div>
            </div>

            {/* 7. Taux de présence */}
            <div
              onClick={() => setSection('attendance')}
              className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs hover:border-indigo-400 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
                <span>Présences</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-500 group-hover:scale-110 transition-transform" />
              </div>
              <div className="text-2xl font-black text-slate-900 mt-2">{globalAttendanceRate}%</div>
              <div className="text-[11px] text-slate-500 mt-1">Moyenne globale</div>
            </div>
          </div>

          {/* Section: Planning du jour (Tableau desktop professionnel) */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-4 md:px-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-slate-900">Planning des séances du jour</h2>
                <p className="text-xs text-slate-500">Créneaux horaires et salles occupées aujourd'hui</p>
              </div>
              <button
                onClick={() => setSection('planning')}
                className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                <span>Voir le calendrier complet</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Responsive Desktop Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50/80 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-100">
                  <tr>
                    <th className="px-6 py-3">Heure</th>
                    <th className="px-6 py-3">Groupe</th>
                    <th className="px-6 py-3">Matière</th>
                    <th className="px-6 py-3">Formateur</th>
                    <th className="px-6 py-3">Salle</th>
                    <th className="px-6 py-3 text-right">Statut</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {todaySessions.map((ses) => (
                    <tr key={ses.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="px-6 py-3.5 font-bold font-mono text-slate-900">{ses.time}</td>
                      <td className="px-6 py-3.5 font-semibold text-slate-800">{ses.groupName}</td>
                      <td className="px-6 py-3.5 text-slate-700">{ses.subject}</td>
                      <td className="px-6 py-3.5 text-slate-700">{ses.teacherName}</td>
                      <td className="px-6 py-3.5">
                        <span className="px-2.5 py-1 rounded-md bg-slate-100 font-extrabold text-slate-800 border border-slate-200">
                          {ses.room}
                        </span>
                      </td>
                      <td className="px-6 py-3.5 text-right">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                            ses.attendanceCompleted
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : ses.status === 'in_progress'
                              ? 'bg-amber-50 text-amber-700 border border-amber-200'
                              : 'bg-blue-50 text-blue-700 border border-blue-200'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              ses.attendanceCompleted
                                ? 'bg-emerald-500'
                                : ses.status === 'in_progress'
                                ? 'bg-amber-500'
                                : 'bg-blue-500'
                            }`}
                          />
                          {ses.attendanceCompleted
                            ? 'Appel validé'
                            : ses.status === 'in_progress'
                            ? 'En cours'
                            : 'Programmée'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 2-Column Split: Dernières inscriptions & Paiements récents */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Dernières Inscriptions */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
              <div className="p-4 md:px-6 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Dernières inscriptions</h3>
                  <p className="text-xs text-slate-500">Nouveaux élèves ajoutés au registre</p>
                </div>
                <button
                  onClick={() => setSection('students')}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700"
                >
                  Tous les étudiants ({students.length})
                </button>
              </div>

              <div className="divide-y divide-slate-100">
                {students.slice(0, 4).map((st) => (
                  <div
                    key={st.id}
                    onClick={() => onSelectStudent(st)}
                    className="p-3.5 px-6 flex items-center justify-between hover:bg-slate-50/60 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-xl ${st.avatarColor} text-white font-bold text-xs flex items-center justify-center`}
                      >
                        {st.firstName[0]}
                        {st.lastName[0]}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900">
                          {st.firstName} {st.lastName}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          {st.groupName} · {st.phone}
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          st.subscriptionStatus === 'active'
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-amber-50 text-amber-700'
                        }`}
                      >
                        {st.subscriptionStatus === 'active' ? 'À jour' : 'Reste à payer'}
                      </span>
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        Inscrit le {st.enrollmentDate}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Paiements récents */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
              <div className="p-4 md:px-6 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Paiements récents</h3>
                  <p className="text-xs text-slate-500">Derniers reçus encaissés au guichet</p>
                </div>
                <button
                  onClick={() => setSection('payments')}
                  className="text-xs font-semibold text-emerald-600 hover:text-emerald-700"
                >
                  Tous les paiements ({payments.length})
                </button>
              </div>

              <div className="divide-y divide-slate-100">
                {payments.slice(0, 4).map((p) => (
                  <div
                    key={p.id}
                    className="p-3.5 px-6 flex items-center justify-between hover:bg-slate-50/60 transition-colors text-xs"
                  >
                    <div>
                      <div className="font-bold text-slate-900">{p.studentName}</div>
                      <div className="text-[11px] text-slate-500">{p.subscriptionPlan} · {p.paymentMethod}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-extrabold text-emerald-600">+{p.paidAmount.toLocaleString()} DZD</div>
                      <div className="text-[10px] text-slate-400">{p.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. GESTION DES ÉTUDIANTS (TABLEAU DESKTOP + RECHERCHE + FILTRES + CRUD)     */}
      {/* ========================================================================= */}
      {currentSection === 'students' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h1 className="text-xl font-bold text-slate-900">Registre des Étudiants</h1>
              <p className="text-xs text-slate-500">
                Gestion des fiches apprenants, affectations aux groupes et suivi des règlements.
              </p>
            </div>
            <button
              onClick={onOpenAddStudent}
              className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-colors self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Inscrire un étudiant</span>
            </button>
          </div>

          {/* Search, Level filters & Sort bar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Rechercher par nom, groupe ou téléphone..."
                value={studentSearch}
                onChange={(e) => {
                  setStudentSearch(e.target.value);
                  setStudentPage(1);
                }}
                className="w-full text-xs pl-9 pr-3 py-2 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-hidden focus:border-blue-600"
              />
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto no-scrollbar">
              <span className="text-xs text-slate-400 shrink-0 font-medium">Niveau :</span>
              {['Tous', '3AS', '2AS', 'BEM'].map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => {
                    setStudentLevelFilter(lvl);
                    setStudentPage(1);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors shrink-0 ${
                    studentLevelFilter === lvl
                      ? 'bg-slate-900 text-white font-bold'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {lvl}
                </button>
              ))}

              <div className="h-4 w-px bg-slate-200 mx-1 shrink-0" />

              <select
                value={studentSortField}
                onChange={(e) => setStudentSortField(e.target.value as any)}
                className="text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white font-medium text-slate-700 shrink-0"
              >
                <option value="name">Trier par Nom</option>
                <option value="attendance">Trier par Assiduité</option>
                <option value="remaining">Trier par Impayé</option>
              </select>
            </div>
          </div>

          {/* Desktop Table View */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50/80 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-3.5">Étudiant</th>
                    <th className="px-6 py-3.5">Téléphone</th>
                    <th className="px-6 py-3.5">Groupe</th>
                    <th className="px-6 py-3.5">Niveau</th>
                    <th className="px-6 py-3.5">Assiduité</th>
                    <th className="px-6 py-3.5">Abonnement (DZD)</th>
                    <th className="px-6 py-3.5">Statut</th>
                    <th className="px-6 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {paginatedStudents.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="px-6 py-8 text-center text-slate-400">
                        Aucun étudiant ne correspond à vos critères de recherche.
                      </td>
                    </tr>
                  ) : (
                    paginatedStudents.map((st) => (
                      <tr key={st.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="px-6 py-3.5">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-8 h-8 rounded-full ${st.avatarColor} text-white font-bold text-xs flex items-center justify-center shrink-0`}
                            >
                              {st.firstName[0]}
                              {st.lastName[0]}
                            </div>
                            <div>
                              <div className="font-bold text-slate-900">
                                {st.lastName.toUpperCase()} {st.firstName}
                              </div>
                              <div className="text-[11px] text-slate-400">{st.email || 'Pas d\'email'}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-3.5 font-mono text-slate-600">{st.phone}</td>
                        <td className="px-6 py-3.5 font-semibold text-slate-800">{st.groupName}</td>
                        <td className="px-6 py-3.5">
                          <span className="px-2 py-0.5 rounded bg-slate-100 font-semibold text-slate-700">
                            {st.level}
                          </span>
                        </td>
                        <td className="px-6 py-3.5">
                          <div className="flex items-center gap-2">
                            <div className="w-12 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                              <div
                                className="h-full bg-blue-600 rounded-full"
                                style={{ width: `${st.attendanceRate}%` }}
                              />
                            </div>
                            <span className="font-bold text-slate-700">{st.attendanceRate}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-3.5">
                          <div>
                            <span className="font-bold text-slate-900">{st.monthlyFee.toLocaleString()} DZD</span>
                            {st.remainingAmount > 0 && (
                              <div className="text-[10px] text-rose-600 font-semibold">
                                Reste : {st.remainingAmount.toLocaleString()} DZD
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-3.5">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                              st.subscriptionStatus === 'active'
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : st.subscriptionStatus === 'pending'
                                ? 'bg-amber-50 text-amber-700 border border-amber-200'
                                : 'bg-rose-50 text-rose-700 border border-rose-200'
                            }`}
                          >
                            {st.subscriptionStatus === 'active'
                              ? 'Payé'
                              : st.subscriptionStatus === 'pending'
                              ? 'Partiel'
                              : 'Impayé'}
                          </span>
                        </td>
                        <td className="px-6 py-3.5 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => onSelectStudent(st)}
                              className="p-1.5 rounded-lg text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                              title="Voir le profil complet"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => onEditStudent(st)}
                              className="p-1.5 rounded-lg text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                              title="Modifier l'étudiant"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => onDeleteStudent(st.id)}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                              title="Supprimer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className="p-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <div>
                Affichage de {(studentPage - 1) * studentsPerPage + 1} à{' '}
                {Math.min(studentPage * studentsPerPage, filteredStudents.length)} sur{' '}
                {filteredStudents.length} élèves
              </div>
              <div className="flex items-center gap-1">
                <button
                  disabled={studentPage === 1}
                  onClick={() => setStudentPage(studentPage - 1)}
                  className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-40"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="px-3 font-semibold text-slate-700">
                  Page {studentPage} sur {totalPages}
                </span>
                <button
                  disabled={studentPage === totalPages}
                  onClick={() => setStudentPage(studentPage + 1)}
                  className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-40"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. PLANNING HEBDOMADAIRE (CALENDRIER SEMAINE LUN-SAM + MODALE AJOUT)       */}
      {/* ========================================================================= */}
      {currentSection === 'planning' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h1 className="text-xl font-bold text-slate-900">Planning Hebdomadaire des Cours</h1>
              <p className="text-xs text-slate-500">
                Visualisation des créneaux par jour et gestion des occupations de salles (01, 02, 03).
              </p>
            </div>
            <button
              onClick={onOpenAddSession}
              className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-colors self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Programmer une séance</span>
            </button>
          </div>

          {/* Weekly Desktop Grid: Monday to Saturday */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3">
            {(['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'] as const).map((dayName) => {
              const daySessions = sessions.filter((s) => s.day === dayName);

              return (
                <div key={dayName} className="bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col min-h-[360px]">
                  {/* Day Header */}
                  <div className="p-3 bg-slate-50/80 border-b border-slate-200 text-center rounded-t-2xl">
                    <div className="text-xs font-black text-slate-900 uppercase tracking-wider">{dayName}</div>
                    <div className="text-[10px] text-slate-500">{daySessions.length} séance(s)</div>
                  </div>

                  {/* Sessions column */}
                  <div className="p-2 space-y-2 flex-1 overflow-y-auto">
                    {daySessions.length === 0 ? (
                      <div className="text-center py-8 text-[11px] text-slate-400">Aucune séance</div>
                    ) : (
                      daySessions.map((ses) => (
                        <div
                          key={ses.id}
                          className="p-3 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-400 hover:shadow-xs transition-all space-y-2 text-xs relative group"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-mono font-bold text-slate-900 bg-white px-1.5 py-0.5 rounded border text-[11px]">
                              {ses.time.split(' - ')[0]}
                            </span>
                            <span className="font-extrabold text-[10px] px-1.5 py-0.5 rounded bg-blue-100 text-blue-800">
                              {ses.room}
                            </span>
                          </div>

                          <div>
                            <div className="font-bold text-slate-900 leading-tight">{ses.subject}</div>
                            <div className="text-[11px] text-slate-600 mt-0.5 font-semibold">{ses.groupName}</div>
                            <div className="text-[10px] text-slate-500 mt-0.5 truncate">{ses.teacherName}</div>
                          </div>

                          <div className="pt-1.5 border-t border-slate-200 flex items-center justify-between text-[10px]">
                            <span
                              className={`font-semibold ${
                                ses.attendanceCompleted ? 'text-emerald-600' : 'text-slate-500'
                              }`}
                            >
                              {ses.attendanceCompleted ? '✓ Présences faites' : 'En attente'}
                            </span>
                            <button
                              onClick={() => onDeleteSession(ses.id)}
                              className="text-slate-400 hover:text-rose-600 transition-colors"
                              title="Supprimer la séance"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. GESTION DES PAIEMENTS (TABLEAU + REÇUS DZD + MODALE ENCAISSEMENT)      */}
      {/* ========================================================================= */}
      {currentSection === 'payments' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h1 className="text-xl font-bold text-slate-900">Registre des Paiements & Abonnements</h1>
              <p className="text-xs text-slate-500">
                Encaissements, gestion des impayés et émission de reçus officiels (DZD).
              </p>
            </div>
            <button
              onClick={onOpenAddPayment}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-colors self-start sm:self-auto"
            >
              <Banknote className="w-4 h-4" />
              <span>Encaisser un paiement</span>
            </button>
          </div>

          {/* Revenue Summary Banner */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
              <div className="text-xs text-slate-400 font-semibold uppercase">Total Prévu ce mois</div>
              <div className="text-xl font-black text-slate-900 mt-1">
                {totalExpected.toLocaleString()} DZD
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">{students.length} abonnements actifs</div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
              <div className="text-xs text-slate-400 font-semibold uppercase">Encaissé à ce jour</div>
              <div className="text-xl font-black text-emerald-600 mt-1">
                {monthlyRevenue.toLocaleString()} DZD
              </div>
              <div className="text-[11px] text-emerald-600 mt-0.5">
                {Math.round((monthlyRevenue / totalExpected) * 100)}% de recouvrement
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
              <div className="text-xs text-slate-400 font-semibold uppercase">Solde Impayé</div>
              <div className="text-xl font-black text-rose-600 mt-1">
                {totalUnpaid.toLocaleString()} DZD
              </div>
              <div className="text-[11px] text-rose-600 mt-0.5">
                {students.filter((s) => s.remainingAmount > 0).length} élèves à relancer
              </div>
            </div>
          </div>

          {/* Desktop Payments Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row items-center justify-between gap-3">
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Rechercher par étudiant ou reçu..."
                  value={paymentSearch}
                  onChange={(e) => setPaymentSearch(e.target.value)}
                  className="w-full text-xs pl-9 pr-3 py-2 rounded-xl border border-slate-200 bg-slate-50/50"
                />
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">Statut :</span>
                {['Tous', 'Payé', 'Partiel'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setPaymentStatusFilter(st)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                      paymentStatusFilter === st
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50/80 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-3.5">Reçu N°</th>
                    <th className="px-6 py-3.5">Étudiant</th>
                    <th className="px-6 py-3.5">Abonnement</th>
                    <th className="px-6 py-3.5">Mode</th>
                    <th className="px-6 py-3.5">Date</th>
                    <th className="px-6 py-3.5">Montant Encaissé</th>
                    <th className="px-6 py-3.5">Reste</th>
                    <th className="px-6 py-3.5 text-right">Statut</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredPayments.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="px-6 py-3.5 font-mono font-bold text-slate-800">{p.receiptNumber}</td>
                      <td className="px-6 py-3.5 font-bold text-slate-900">{p.studentName}</td>
                      <td className="px-6 py-3.5 text-slate-600">{p.subscriptionPlan}</td>
                      <td className="px-6 py-3.5 text-slate-600">{p.paymentMethod}</td>
                      <td className="px-6 py-3.5 text-slate-500">{p.date}</td>
                      <td className="px-6 py-3.5 font-black text-emerald-600">
                        +{p.paidAmount.toLocaleString()} DZD
                      </td>
                      <td className="px-6 py-3.5 font-bold text-slate-600">
                        {p.remainingAmount > 0 ? (
                          <span className="text-rose-600">{p.remainingAmount.toLocaleString()} DZD</span>
                        ) : (
                          '0 DZD'
                        )}
                      </td>
                      <td className="px-6 py-3.5 text-right">
                        <span
                          className={`inline-flex px-2 py-0.5 rounded-full text-[11px] font-bold ${
                            p.status === 'Payé'
                              ? 'bg-emerald-50 text-emerald-700'
                              : 'bg-amber-50 text-amber-700'
                          }`}
                        >
                          {p.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. HISTORIQUE DES PRÉSENCES                                               */}
      {/* ========================================================================= */}
      {currentSection === 'attendance' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-slate-900">Suivi & Feuilles d'Émargement</h1>
              <p className="text-xs text-slate-500">Historique complet des pointages effectués par les formateurs.</p>
            </div>
            <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200">
              Assiduité Globale : {globalAttendanceRate}%
            </span>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50/80 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-3.5">Date & Heure</th>
                    <th className="px-6 py-3.5">Élève</th>
                    <th className="px-6 py-3.5">Matière</th>
                    <th className="px-6 py-3.5">Statut de Présence</th>
                    <th className="px-6 py-3.5">Remarque / Justificatif</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {attendance.map((att) => (
                    <tr key={att.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="px-6 py-3.5 text-slate-600 font-mono">
                        {att.date} à {att.time}
                      </td>
                      <td className="px-6 py-3.5 font-bold text-slate-900">{att.studentName}</td>
                      <td className="px-6 py-3.5 font-semibold text-slate-700">{att.subject}</td>
                      <td className="px-6 py-3.5">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-bold text-[11px] ${
                            att.status === 'present'
                              ? 'bg-emerald-50 text-emerald-700'
                              : att.status === 'absent'
                              ? 'bg-rose-50 text-rose-700'
                              : 'bg-amber-50 text-amber-700'
                          }`}
                        >
                          {att.status === 'present' ? '🟢 Présent' : att.status === 'absent' ? '🔴 Absent' : '🟠 Retard'}
                        </span>
                      </td>
                      <td className="px-6 py-3.5 text-slate-500 italic">{att.note || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5b. FORMULES D'ABONNEMENTS                                                */}
      {/* ========================================================================= */}
      {currentSection === 'subscriptions' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl font-bold text-slate-900">Formules d'Abonnements & Tarifs</h1>
              <p className="text-xs text-slate-500">
                Grilles tarifaires officielles des cours de soutien scolaire au centre ETS EL MAALIM.
              </p>
            </div>
            <button
              onClick={onOpenAddPayment}
              className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-colors self-start sm:self-auto cursor-pointer"
            >
              <CreditCard className="w-4 h-4" />
              <span>Encaisser un abonnement</span>
            </button>
          </div>

          {/* Subscription Plans Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                title: 'Terminale BAC (3AS)',
                fee: '6 000 DZD',
                badge: 'Niveau Clé',
                color: 'border-blue-500 bg-blue-50/20',
                count: students.filter((s) => s.level.includes('3AS')).length,
                desc: 'Préparation intensive BAC : Maths, Physique & Français.'
              },
              {
                title: '2ème Année Lycée (2AS)',
                fee: '5 500 DZD',
                badge: 'Standard',
                color: 'border-indigo-500 bg-indigo-50/20',
                count: students.filter((s) => s.level.includes('2AS')).length,
                desc: 'Consolidation des bases scientifiques et techniques.'
              },
              {
                title: 'Cycle Moyen BEM (4AM)',
                fee: '4 500 DZD',
                badge: 'Brevet',
                color: 'border-emerald-500 bg-emerald-50/20',
                count: students.filter((s) => s.level.includes('BEM') || s.level.includes('4AM')).length,
                desc: 'Révision méthodologique pour l’examen du BEM.'
              },
              {
                title: 'Pack Trimestriel Tout-en-un',
                fee: '15 000 DZD',
                badge: 'Formule Promo',
                color: 'border-amber-500 bg-amber-50/20',
                count: students.filter((s) => s.subscriptionPlan?.includes('Pack') || s.monthlyFee >= 8000).length,
                desc: 'Abonnement groupé trimestriel avec support complet.'
              }
            ].map((planItem) => (
              <div
                key={planItem.title}
                className={`p-5 rounded-2xl bg-white border-2 shadow-xs space-y-3 flex flex-col justify-between ${planItem.color}`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white text-slate-700 border border-slate-200">
                      {planItem.badge}
                    </span>
                    <span className="text-xs font-bold text-blue-600 bg-white px-2 py-0.5 rounded-full border border-slate-100">
                      {planItem.count} inscrits
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mt-2">{planItem.title}</h3>
                  <div className="text-lg font-black text-slate-900 mt-1">{planItem.fee}</div>
                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">{planItem.desc}</p>
                </div>

                <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-600">
                  <span>Centre ETS EL MAALIM</span>
                  <span className="font-semibold text-emerald-600">Formule Active</span>
                </div>
              </div>
            ))}
          </div>

          {/* Enrolled Students Table for Subscriptions */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-900">Répartition des Abonnements par Étudiant</h2>
              <span className="text-xs text-slate-500 font-medium">{students.length} dossiers</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Élève</th>
                    <th className="py-3 px-4">Groupe</th>
                    <th className="py-3 px-4">Formule d'Abonnement</th>
                    <th className="py-3 px-4">Tarif Mensuel</th>
                    <th className="py-3 px-4">Réglé / Reste</th>
                    <th className="py-3 px-4 text-right">Statut</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {students.map((st) => (
                    <tr key={st.id} className="hover:bg-slate-50/70">
                      <td className="py-3 px-4 font-bold text-slate-900">{st.firstName} {st.lastName}</td>
                      <td className="py-3 px-4 text-slate-600">{st.groupName}</td>
                      <td className="py-3 px-4 font-semibold text-slate-800">
                        {st.subscriptionPlan || `Abonnement ${st.level}`}
                      </td>
                      <td className="py-3 px-4 font-mono font-bold text-slate-900">
                        {st.monthlyFee.toLocaleString()} DZD
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-emerald-600 font-bold">{st.paidAmount.toLocaleString()} DZD</span>
                        {st.remainingAmount > 0 ? (
                          <span className="text-rose-600 text-[11px] block font-semibold">
                            Reste : {st.remainingAmount.toLocaleString()} DZD
                          </span>
                        ) : (
                          <span className="text-slate-400 text-[11px] block">Soldé</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <span
                          className={`inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            st.remainingAmount === 0
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-rose-50 text-rose-700 border border-rose-200'
                          }`}
                        >
                          {st.remainingAmount === 0 ? 'À jour' : 'Impayé'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. CORPS PROFESSORAL / FORMATEURS                                         */}
      {/* ========================================================================= */}
      {currentSection === 'teachers' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-slate-900">Corps Professoral</h1>
              <p className="text-xs text-slate-500">Enseignants spécialisés et répartition des matières.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {teachers.map((tch) => (
              <div key={tch.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-blue-600 text-white font-black text-sm flex items-center justify-center shadow-xs">
                      {tch.name.split(' ').map((n) => n[0]).join('')}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">{tch.name}</h3>
                      <span className="text-xs font-semibold text-blue-600">{tch.subject}</span>
                    </div>
                  </div>
                </div>

                <div className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                  {tch.experience}
                </div>

                <div className="space-y-2 text-xs pt-2 border-t border-slate-100">
                  <div className="flex justify-between text-slate-600">
                    <span>Téléphone :</span>
                    <strong className="text-slate-900">{tch.phone}</strong>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Email :</span>
                    <strong className="text-slate-900 truncate max-w-[170px]">{tch.email}</strong>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Groupes assignés :</span>
                    <strong className="text-slate-900">{tch.groups.join(', ')}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 7. GROUPES & EFFECTIFS                                                    */}
      {/* ========================================================================= */}
      {currentSection === 'groups' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-slate-900">Groupes & Niveaux</h1>
              <p className="text-xs text-slate-500">Capacités maximales et affectation des salles.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {groups.map((grp) => (
              <div key={grp.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700">
                    {grp.level}
                  </span>
                  <span className="text-xs font-bold text-slate-700">{grp.room}</span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900">{grp.name}</h3>
                  <div className="text-xs text-slate-500 mt-0.5">{grp.subject}</div>
                  <div className="text-xs text-slate-600 font-medium mt-1">Formateur : {grp.teacherName}</div>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Effectif actuel :</span>
                    <span className="font-extrabold text-blue-600">
                      {grp.studentCount} / {grp.maxCapacity} élèves
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full bg-blue-600 rounded-full"
                      style={{ width: `${(grp.studentCount / grp.maxCapacity) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 8. MATIÈRES & 9. SALLES                                                   */}
      {/* ========================================================================= */}
      {currentSection === 'subjects' && (
        <div className="space-y-4">
          <h1 className="text-xl font-bold text-slate-900">Matières Enseignées</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { name: 'Mathématiques', coef: '7 (Terminale Scientifique)', teachers: 'Ahmed Mansouri', groups: '3AS Groupe A, 2AS Groupe A' },
              { name: 'Physique-Chimie', coef: '6 (BAC)', teachers: 'Karim Saidi', groups: '3AS Groupe A, 3AS Groupe B' },
              { name: 'Français & Expression', coef: '3 (BEM & Lycée)', teachers: 'Amel Benali', groups: 'BEM Groupe A, 2AS Groupe A' }
            ].map((sub) => (
              <div key={sub.name} className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-2">
                <div className="text-base font-bold text-slate-900">{sub.name}</div>
                <div className="text-xs text-slate-500">Coefficient : {sub.coef}</div>
                <div className="text-xs text-slate-700 pt-2 border-t border-slate-100">
                  Responsable : <strong>{sub.teachers}</strong>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {currentSection === 'rooms' && (
        <div className="space-y-4">
          <h1 className="text-xl font-bold text-slate-900">Gestion des Salles de Cours</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { name: 'Salle 01', cap: '20 places', equip: 'Projecteur HD, Tableau blanc interactif, Climatisation', status: 'Occupée' },
              { name: 'Salle 02', cap: '18 places', equip: 'Tableau blanc, Chauffage, Connexion Fibre', status: 'En cours (17h00)' },
              { name: 'Salle 03', cap: '20 places', equip: 'Écran interactif, Audio stéréo, Climatisation', status: 'Disponible' }
            ].map((rm) => (
              <div key={rm.name} className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-2">
                <div className="flex justify-between items-center">
                  <div className="text-base font-bold text-slate-900">{rm.name}</div>
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700">{rm.cap}</span>
                </div>
                <div className="text-xs text-slate-600">{rm.equip}</div>
                <div className="text-xs font-bold text-emerald-600 pt-2 border-t border-slate-100">
                  Statut : {rm.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 10. DOCUMENTS PÉDAGOGIQUES                                                */}
      {/* ========================================================================= */}
      {currentSection === 'documents' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-slate-900">Bibliothèque des Documents & Ressources</h1>
              <p className="text-xs text-slate-500">Fichiers pédagogiques, séries et devoirs mis à disposition.</p>
            </div>
            <button
              onClick={onOpenAddDocument}
              className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Déposer un document</span>
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50/80 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-3.5">Nom du document</th>
                    <th className="px-6 py-3.5">Type</th>
                    <th className="px-6 py-3.5">Groupe</th>
                    <th className="px-6 py-3.5">Matière</th>
                    <th className="px-6 py-3.5">Auteur</th>
                    <th className="px-6 py-3.5">Date</th>
                    <th className="px-6 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {documents.map((doc) => (
                    <tr key={doc.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="px-6 py-3.5 font-bold text-slate-900 flex items-center gap-2">
                        <FileText className="w-4 h-4 text-blue-500 shrink-0" />
                        <span className="truncate max-w-sm">{doc.title}</span>
                      </td>
                      <td className="px-6 py-3.5">
                        <span className="px-2 py-0.5 rounded bg-slate-100 font-semibold text-slate-700">
                          {doc.type}
                        </span>
                      </td>
                      <td className="px-6 py-3.5 font-semibold text-slate-700">{doc.groupName}</td>
                      <td className="px-6 py-3.5 text-slate-600">{doc.subject}</td>
                      <td className="px-6 py-3.5 text-slate-600">{doc.authorName}</td>
                      <td className="px-6 py-3.5 text-slate-400">{doc.date}</td>
                      <td className="px-6 py-3.5 text-right">
                        <button
                          onClick={() => onPreviewDocument(doc)}
                          className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs inline-flex items-center gap-1.5 transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Voir / Télécharger</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 11. RAPPORTS & ANALYSES VISUELLES                                         */}
      {/* ========================================================================= */}
      {currentSection === 'reports' && (
        <div className="space-y-6">
          <div>
            <h1 className="text-xl font-bold text-slate-900">Rapports & Statistiques Consolidées</h1>
            <p className="text-xs text-slate-500">Analyses comparatives d'activité, taux d'assiduité et trésorerie.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Chart 1: Présence par groupe */}
            <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center justify-between">
                <span>Taux de présence moyen par groupe</span>
                <span className="text-xs text-blue-600 font-bold">Moyenne : 94%</span>
              </h3>
              <div className="space-y-3">
                {[
                  { name: '3AS Groupe A (Terminale)', rate: 95 },
                  { name: '3AS Groupe B (Terminale)', rate: 90 },
                  { name: '2AS Groupe A (2ème Année)', rate: 98 },
                  { name: 'BEM Groupe A (Brevet)', rate: 94 }
                ].map((item) => (
                  <div key={item.name} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-700">{item.name}</span>
                      <span className="text-slate-900 font-bold">{item.rate}%</span>
                    </div>
                    <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full transition-all duration-500"
                        style={{ width: `${item.rate}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chart 2: Répartition des encaissements */}
            <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center justify-between">
                <span>Recouvrement Financier du Mois</span>
                <span className="text-xs text-emerald-600 font-bold">
                  {Math.round((monthlyRevenue / totalExpected) * 100)}%
                </span>
              </h3>

              <div className="w-full h-5 rounded-full bg-rose-500 overflow-hidden flex">
                <div
                  className="h-full bg-emerald-500"
                  style={{ width: `${(monthlyRevenue / totalExpected) * 100}%` }}
                />
              </div>

              <div className="grid grid-cols-2 gap-4 pt-3 border-t border-slate-100 text-xs">
                <div>
                  <div className="text-slate-400">Total Encaissé</div>
                  <div className="text-lg font-black text-emerald-600 mt-0.5">
                    {monthlyRevenue.toLocaleString()} DZD
                  </div>
                </div>
                <div>
                  <div className="text-slate-400">Solde Impayé</div>
                  <div className="text-lg font-black text-rose-600 mt-0.5">
                    {totalUnpaid.toLocaleString()} DZD
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 12. PARAMÈTRES DU CENTRE                                                  */}
      {/* ========================================================================= */}
      {currentSection === 'settings' && (
        <div className="space-y-4 max-w-2xl">
          <h1 className="text-xl font-bold text-slate-900">Paramètres de la Plateforme</h1>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Raison sociale du centre</label>
              <input
                type="text"
                defaultValue="ETS EL MAALIM — Système de gestion pour centre de formation"
                className="w-full px-3 py-2 rounded-xl border border-slate-300"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Devise principale</label>
              <input type="text" disabled defaultValue="Dinar Algérien (DZD)" className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50" />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Téléphone d'accueil / Secrétariat</label>
              <input type="text" defaultValue="023 45 67 89 / 0550 00 11 22" className="w-full px-3 py-2 rounded-xl border border-slate-300" />
            </div>
            <button className="px-4 py-2.5 bg-slate-900 text-white font-bold rounded-xl shadow-xs">
              Enregistrer les modifications
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 13. GESTION DES UTILISATEURS & COMPTES RÉCEPTION                           */}
      {/* ========================================================================= */}
      {currentSection === 'users' && (
        <div className="space-y-6">
          {/* Top Header & Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <span>Gestion des Utilisateurs & Comptes Réception</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                  {users.length} comptes
                </span>
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Créez, modifiez, activez ou désactivez les comptes opérateurs pour le guichet de réception ETS EL MAALIM.
              </p>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                onClick={() => {
                  setNewUserName('');
                  setNewUserEmail('');
                  setNewUserPassword('123456');
                  setNewUserRole('reception');
                  setNewUserPerms({
                    canRegisterStudents: true,
                    canCollectPayments: true,
                    canViewPlanning: true,
                    canExportReports: false
                  });
                  setIsAddUserModalOpen(true);
                }}
                className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-md shadow-blue-600/25 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Nouveau Compte Réception</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Comptes</span>
              <div className="text-2xl font-black text-slate-900 mt-1">{users.length}</div>
              <div className="text-[11px] text-slate-500 mt-0.5">Accès enregistrés</div>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Comptes Réception</span>
              <div className="text-2xl font-black text-emerald-600 mt-1">
                {users.filter((u) => u.role === 'reception' && u.active).length}
              </div>
              <div className="text-[11px] text-emerald-600 font-medium mt-0.5 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Actifs au guichet
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Direction / Admin</span>
              <div className="text-2xl font-black text-indigo-600 mt-1">
                {users.filter((u) => u.role === 'admin').length}
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">Privilèges administrateur</div>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Compte Démo Recommandé</span>
              <div className="text-sm font-bold text-slate-900 mt-1 truncate">Nadia Benali</div>
              <div className="text-[11px] font-mono text-blue-600 mt-0.5 truncate">nadia@centrepro.demo</div>
            </div>
          </div>

          {/* Search & Filter Bar */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="relative flex-1 max-w-sm">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Rechercher par nom, email..."
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={userRoleFilter}
                  onChange={(e) => setUserRoleFilter(e.target.value)}
                  className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none"
                >
                  <option value="Tous">Tous les rôles</option>
                  <option value="reception">Réception uniquement</option>
                  <option value="admin">Administration uniquement</option>
                </select>
              </div>
            </div>

            {/* Users Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Utilisateur</th>
                    <th className="py-3 px-4">Email de Connexion</th>
                    <th className="py-3 px-4">Rôle</th>
                    <th className="py-3 px-4">Statut</th>
                    <th className="py-3 px-4">Permissions Accordées</th>
                    <th className="py-3 px-4">Dernier Accès</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {users
                    .filter((u) => {
                      const matchSearch =
                        u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
                        u.email.toLowerCase().includes(userSearch.toLowerCase());
                      const matchRole = userRoleFilter === 'Tous' || u.role === userRoleFilter;
                      return matchSearch && matchRole;
                    })
                    .map((userItem) => (
                      <tr key={userItem.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3.5 px-4 font-bold text-slate-900">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-xs shadow-xs ${
                                userItem.role === 'admin'
                                  ? 'bg-indigo-600'
                                  : userItem.role === 'reception'
                                  ? 'bg-emerald-600'
                                  : 'bg-blue-600'
                              }`}
                            >
                              {userItem.name[0]}
                            </div>
                            <div>
                              <div className="font-bold text-slate-900">{userItem.name}</div>
                              <div className="text-[10px] text-slate-400">Créé le {userItem.createdAt}</div>
                            </div>
                          </div>
                        </td>

                        <td className="py-3.5 px-4 text-slate-700 font-mono">
                          <span className="px-2 py-0.5 rounded-lg bg-slate-100 border border-slate-200 text-[11px]">
                            {userItem.email}
                          </span>
                        </td>

                        <td className="py-3.5 px-4">
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
                              userItem.role === 'admin'
                                ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                                : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            }`}
                          >
                            {userItem.role === 'admin' ? (
                              <>
                                <ShieldCheck className="w-3.5 h-3.5" /> Administrateur
                              </>
                            ) : (
                              <>
                                <UserCheck className="w-3.5 h-3.5" /> Réception & Guichet
                              </>
                            )}
                          </span>
                        </td>

                        <td className="py-3.5 px-4">
                          <button
                            onClick={() => onToggleUserStatus(userItem.id)}
                            className={`px-2.5 py-1 rounded-full text-[11px] font-bold border transition-colors cursor-pointer flex items-center gap-1 ${
                              userItem.active
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100'
                                : 'bg-rose-50 text-rose-700 border-rose-300 hover:bg-rose-100'
                            }`}
                            title="Cliquer pour activer / désactiver ce compte"
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                userItem.active ? 'bg-emerald-500' : 'bg-rose-500'
                              }`}
                            />
                            <span>{userItem.active ? 'Actif' : 'Désactivé'}</span>
                          </button>
                        </td>

                        <td className="py-3.5 px-4">
                          <div className="flex flex-wrap gap-1">
                            {userItem.permissions.canRegisterStudents && (
                              <span className="text-[10px] bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded border border-blue-200">
                                Inscriptions
                              </span>
                            )}
                            {userItem.permissions.canCollectPayments && (
                              <span className="text-[10px] bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded border border-emerald-200">
                                Paiements
                              </span>
                            )}
                            {userItem.permissions.canViewPlanning && (
                              <span className="text-[10px] bg-purple-50 text-purple-700 px-1.5 py-0.5 rounded border border-purple-200">
                                Planning
                              </span>
                            )}
                            {userItem.permissions.canExportReports && (
                              <span className="text-[10px] bg-amber-50 text-amber-700 px-1.5 py-0.5 rounded border border-amber-200">
                                Rapports
                              </span>
                            )}
                          </div>
                        </td>

                        <td className="py-3.5 px-4 text-slate-500 text-[11px]">
                          {userItem.lastLogin}
                        </td>

                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => setEditingUser(userItem)}
                              className="px-2.5 py-1.5 bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-600 rounded-lg font-semibold text-xs transition-colors flex items-center gap-1 cursor-pointer"
                            >
                              <Edit className="w-3.5 h-3.5" />
                              <span>Modifier</span>
                            </button>
                            {userItem.role !== 'admin' && (
                              <button
                                onClick={() => onDeleteUser(userItem.id)}
                                className="p-1.5 bg-slate-100 hover:bg-rose-50 text-slate-500 hover:text-rose-600 rounded-lg transition-colors cursor-pointer"
                                title="Supprimer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Créer un compte Réception */}
      {isAddUserModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-base font-bold text-slate-900">Nouveau Compte Réception</h2>
                <p className="text-xs text-slate-500">Ajoutez un opérateur pour le guichet ETS EL MAALIM.</p>
              </div>
              <button
                onClick={() => setIsAddUserModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!newUserName.trim() || !newUserEmail.trim()) return;
                onAddUser({
                  name: newUserName,
                  email: newUserEmail,
                  role: newUserRole,
                  active: true,
                  permissions: newUserPerms
                });
                setIsAddUserModalOpen(false);
              }}
              className="space-y-3.5 text-xs"
            >
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Nom complet</label>
                <input
                  type="text"
                  placeholder="ex: Nadia Benali"
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Email de connexion</label>
                <input
                  type="email"
                  placeholder="ex: nadia@centrepro.demo"
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Mot de passe provisoire</label>
                <input
                  type="password"
                  value={newUserPassword}
                  onChange={(e) => setNewUserPassword(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-2">Permissions attribuées</label>
                <div className="space-y-2 p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700">
                    <input
                      type="checkbox"
                      checked={newUserPerms.canRegisterStudents}
                      onChange={(e) =>
                        setNewUserPerms({ ...newUserPerms, canRegisterStudents: e.target.checked })
                      }
                      className="rounded text-blue-600"
                    />
                    <span>Inscrire de nouveaux étudiants</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700">
                    <input
                      type="checkbox"
                      checked={newUserPerms.canCollectPayments}
                      onChange={(e) =>
                        setNewUserPerms({ ...newUserPerms, canCollectPayments: e.target.checked })
                      }
                      className="rounded text-blue-600"
                    />
                    <span>Encaisser et délivrer des reçus de paiement</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700">
                    <input
                      type="checkbox"
                      checked={newUserPerms.canViewPlanning}
                      onChange={(e) =>
                        setNewUserPerms({ ...newUserPerms, canViewPlanning: e.target.checked })
                      }
                      className="rounded text-blue-600"
                    />
                    <span>Consulter le planning des salles</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700">
                    <input
                      type="checkbox"
                      checked={newUserPerms.canExportReports}
                      onChange={(e) =>
                        setNewUserPerms({ ...newUserPerms, canExportReports: e.target.checked })
                      }
                      className="rounded text-blue-600"
                    />
                    <span>Exporter les rapports statistiques</span>
                  </label>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddUserModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 rounded-xl font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md cursor-pointer"
                >
                  Créer le compte
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Modifier un compte */}
      {editingUser && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-base font-bold text-slate-900">Modifier le Compte</h2>
                <p className="text-xs text-slate-500">Mise à jour des informations de {editingUser.name}.</p>
              </div>
              <button
                onClick={() => setEditingUser(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                onUpdateUser(editingUser);
                setEditingUser(null);
              }}
              className="space-y-3.5 text-xs"
            >
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Nom complet</label>
                <input
                  type="text"
                  value={editingUser.name}
                  onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Email</label>
                <input
                  type="email"
                  value={editingUser.email}
                  onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-2">Permissions actives</label>
                <div className="space-y-2 p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700">
                    <input
                      type="checkbox"
                      checked={editingUser.permissions.canRegisterStudents}
                      onChange={(e) =>
                        setEditingUser({
                          ...editingUser,
                          permissions: {
                            ...editingUser.permissions,
                            canRegisterStudents: e.target.checked
                          }
                        })
                      }
                      className="rounded text-blue-600"
                    />
                    <span>Inscrire des étudiants</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700">
                    <input
                      type="checkbox"
                      checked={editingUser.permissions.canCollectPayments}
                      onChange={(e) =>
                        setEditingUser({
                          ...editingUser,
                          permissions: {
                            ...editingUser.permissions,
                            canCollectPayments: e.target.checked
                          }
                        })
                      }
                      className="rounded text-blue-600"
                    />
                    <span>Encaisser et éditer des reçus</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700">
                    <input
                      type="checkbox"
                      checked={editingUser.permissions.canViewPlanning}
                      onChange={(e) =>
                        setEditingUser({
                          ...editingUser,
                          permissions: {
                            ...editingUser.permissions,
                            canViewPlanning: e.target.checked
                          }
                        })
                      }
                      className="rounded text-blue-600"
                    />
                    <span>Consulter le planning</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700">
                    <input
                      type="checkbox"
                      checked={editingUser.permissions.canExportReports}
                      onChange={(e) =>
                        setEditingUser({
                          ...editingUser,
                          permissions: {
                            ...editingUser.permissions,
                            canExportReports: e.target.checked
                          }
                        })
                      }
                      className="rounded text-blue-600"
                    />
                    <span>Exporter des rapports</span>
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="font-semibold text-slate-700">Statut du compte</span>
                <button
                  type="button"
                  onClick={() => setEditingUser({ ...editingUser, active: !editingUser.active })}
                  className={`px-3 py-1 rounded-full font-bold text-[11px] ${
                    editingUser.active
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-rose-100 text-rose-800'
                  }`}
                >
                  {editingUser.active ? 'Actif' : 'Désactivé'}
                </button>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  className="px-4 py-2 border border-slate-200 rounded-xl font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md cursor-pointer"
                >
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
