import React from 'react';
import { Student, SessionItem, AttendanceRecord, PaymentRecord, DocumentItem, StudentSection } from '../../types';
import {
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  AlertCircle,
  FileText,
  Download,
  Eye,
  CreditCard,
  User,
  Sparkles,
  Phone,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Check,
  Clock3
} from 'lucide-react';

interface StudentViewProps {
  currentTab: StudentSection;
  student: Student;
  sessions: SessionItem[];
  attendance: AttendanceRecord[];
  payments: PaymentRecord[];
  documents: DocumentItem[];
  onPreviewDocument: (doc: DocumentItem) => void;
  onSelectRole: (role: any) => void;
}

export const StudentView: React.FC<StudentViewProps> = ({
  currentTab,
  student,
  sessions,
  attendance,
  payments,
  documents,
  onPreviewDocument,
}) => {
  // Student: Sara Benali (id: std-1, group: 3AS Groupe A)
  const studentSessions = sessions.filter((s) => s.groupId === student.groupId);
  const nextSession = studentSessions[0] || sessions[0];

  // Attendance for this student
  const myAttendance = attendance.filter((a) => a.studentId === student.id);
  const presentCount = myAttendance.filter((a) => a.status === 'present').length;
  const absentCount = myAttendance.filter((a) => a.status === 'absent').length;
  const lateCount = myAttendance.filter((a) => a.status === 'late').length;
  const totalCount = myAttendance.length;
  const attendanceRate = totalCount > 0 ? Math.round((presentCount / totalCount) * 100) : 100;

  // Payments for this student
  const myPayments = payments.filter((p) => p.studentId === student.id);

  // Group documents
  const groupDocuments = documents.filter(
    (d) => d.groupId === student.groupId || d.groupId === 'all'
  );

  return (
    <div className="p-6 lg:px-8 lg:py-6 space-y-6 w-full max-w-none">
      {/* Student Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-violet-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-indigo-950/10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-xs text-xs font-semibold text-blue-100 border border-white/20">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            Portail Étudiant · ETS EL MAALIM · 2026/2027
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Bonjour, {student.firstName} 👋
          </h1>
          <p className="text-sm text-blue-100/90 max-w-xl">
            Bienvenue sur votre espace apprenant ETS EL MAALIM. Consultez votre emploi du temps, vos supports de cours et le suivi de vos présences.
          </p>
        </div>

        <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 shrink-0">
          <div className="w-12 h-12 rounded-xl bg-white text-indigo-700 font-black flex items-center justify-center text-lg shadow-sm">
            {student.firstName[0]}
          </div>
          <div>
            <div className="text-sm font-bold text-white">{student.firstName} {student.lastName}</div>
            <div className="text-xs text-blue-100 font-medium">{student.groupName} · {student.level}</div>
            <div className="text-[11px] text-blue-200 mt-0.5">Matricule: {student.id.toUpperCase()}</div>
          </div>
        </div>
      </div>

      {/* Hero: Next Session Highlight */}
      <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-3xl p-6 text-white shadow-lg shadow-orange-500/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-100">
            <Clock className="w-4 h-4" /> Ma Prochaine Séance
          </div>
          <div className="text-2xl font-black">
            {nextSession ? nextSession.subject : 'Mathématiques'}
          </div>
          <div className="text-sm text-amber-100 font-medium flex flex-wrap items-center gap-3">
            <span>Demain — {nextSession ? nextSession.time : '17:00'}</span>
            <span>·</span>
            <span>{nextSession ? nextSession.room : 'Salle 02'}</span>
            <span>·</span>
            <span>Formateur: {nextSession ? nextSession.teacherName : 'Ahmed Mansouri'}</span>
          </div>
        </div>

        <div className="bg-white/20 backdrop-blur-sm px-4 py-3 rounded-2xl border border-white/30 text-center sm:text-right shrink-0">
          <span className="text-xs text-amber-100 font-medium">Groupe affecté</span>
          <div className="text-base font-bold text-white">{student.groupName}</div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Taux de Présence</span>
          <div className="text-2xl font-black text-emerald-600 mt-1">{attendanceRate}%</div>
          <div className="text-xs text-slate-500 font-medium mt-1">
            {presentCount} présences sur {totalCount} séances
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Absences Notées</span>
          <div className="text-2xl font-black text-rose-600 mt-1">{absentCount}</div>
          <div className="text-xs text-rose-500 font-medium mt-1">
            {absentCount === 0 ? 'Assiduité exemplaire !' : 'À justifier auprès du secrétariat'}
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Abonnement Mensuel</span>
          <div className="text-2xl font-black text-indigo-600 mt-1">{student.monthlyFee.toLocaleString()} DA</div>
          <div className="text-xs text-slate-500 font-medium mt-1">
            {student.subscriptionPlan}
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Solde Paiement</span>
          <div className={`text-2xl font-black mt-1 ${student.remainingAmount === 0 ? 'text-emerald-600' : 'text-amber-600'}`}>
            {student.remainingAmount === 0 ? 'Réglé' : `${student.remainingAmount.toLocaleString()} DA`}
          </div>
          <div className="text-xs text-slate-500 font-medium mt-1">
            {student.remainingAmount === 0 ? 'Aucun impayé en cours' : 'Paiement en attente'}
          </div>
        </div>
      </div>

      {/* Main Student Hub Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Schedule & Attendance (2 cols on large screen) */}
        <div className="lg:col-span-2 space-y-6">
          {/* My Sessions Timetable */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-slate-900">Emploi du Temps Hebdomadaire</h2>
                <p className="text-xs text-slate-500">Vos séances pour la semaine en cours.</p>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-100">
                {student.groupName}
              </span>
            </div>

            <div className="space-y-3">
              {studentSessions.map((session) => (
                <div
                  key={session.id}
                  className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors flex items-center justify-between"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 font-bold flex flex-col items-center justify-center text-xs shrink-0">
                      <Clock className="w-4 h-4 mb-0.5" />
                      <span>{session.time}</span>
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-sm">{session.subject}</div>
                      <div className="text-xs text-slate-500 mt-0.5 flex items-center gap-2">
                        <span>Formateur: {session.teacherName}</span>
                        <span>·</span>
                        <span className="font-semibold text-slate-700">{session.room}</span>
                      </div>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                    {session.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Attendance History */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-slate-900">Historique des Présences</h2>
                <p className="text-xs text-slate-500">Relevé des émargements enregistrés par les formateurs.</p>
              </div>
            </div>

            <div className="divide-y divide-slate-100 border border-slate-100 rounded-xl overflow-hidden">
              {myAttendance.map((rec) => (
                <div key={rec.id} className="p-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-3">
                    {rec.status === 'present' && (
                      <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
                        <Check className="w-4 h-4" />
                      </div>
                    )}
                    {rec.status === 'absent' && (
                      <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center font-bold">
                        <AlertCircle className="w-4 h-4" />
                      </div>
                    )}
                    {rec.status === 'late' && (
                      <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center font-bold">
                        <Clock3 className="w-4 h-4" />
                      </div>
                    )}
                    <div>
                      <div className="text-xs font-bold text-slate-900">{rec.subject}</div>
                      <div className="text-[11px] text-slate-400">{rec.date} · {rec.time}</div>
                    </div>
                  </div>

                  <div>
                    {rec.status === 'present' && (
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        🟢 Présent
                      </span>
                    )}
                    {rec.status === 'absent' && (
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200">
                        🔴 Absent
                      </span>
                    )}
                    {rec.status === 'late' && (
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
                        🟠 Retard
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Documents and Payment Receipts */}
        <div className="space-y-6">
          {/* Documents & Course Materials */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-slate-900">Mes Documents & Cours</h2>
                <p className="text-xs text-slate-500">Supports partagés par vos professeurs.</p>
              </div>
            </div>

            <div className="space-y-2.5">
              {groupDocuments.map((doc) => (
                <div
                  key={doc.id}
                  className="p-3 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-slate-50 transition-colors flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs shrink-0">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div className="truncate">
                      <div className="text-xs font-bold text-slate-900 truncate">{doc.title}</div>
                      <div className="text-[10px] text-slate-500">
                        {doc.subject} · {doc.fileSize}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => onPreviewDocument(doc)}
                      className="p-1.5 hover:bg-white text-slate-600 hover:text-blue-600 rounded-lg transition-colors cursor-pointer"
                      title="Visualiser"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onPreviewDocument(doc)}
                      className="p-1.5 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors cursor-pointer"
                      title="Télécharger"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payments & Receipts */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">Mes Reçus de Paiement</h2>
              <p className="text-xs text-slate-500">Historique des cotisations réglées au centre.</p>
            </div>

            <div className="space-y-2.5">
              {myPayments.map((p) => (
                <div
                  key={p.id}
                  className="p-3 rounded-xl border border-slate-100 bg-slate-50/40 flex items-center justify-between"
                >
                  <div>
                    <div className="text-xs font-bold text-slate-900">{p.subscription}</div>
                    <div className="text-[11px] text-slate-500">{p.date} · Reçu N° {p.id.toUpperCase()}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-bold text-emerald-600">{p.paidAmount.toLocaleString()} DA</div>
                    <div className="text-[10px] text-slate-400">Paiement validé</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
