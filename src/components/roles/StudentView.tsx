import React, { useState } from 'react';
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
  Clock3,
  Mail,
  GraduationCap
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
  onPreviewDocument
}) => {
  const [attendanceFilter, setAttendanceFilter] = useState<'all' | 'present' | 'absent' | 'late'>('all');

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

  const filteredAttendance = myAttendance.filter((rec) => {
    if (attendanceFilter === 'all') return true;
    return rec.status === attendanceFilter;
  });

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
            <div className="text-[11px] text-blue-200 mt-0.5 font-mono">Matricule: {student.id.toUpperCase()}</div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. ACCUEIL (DASHBOARD)                                                    */}
      {/* ========================================================================= */}
      {currentTab === 'dashboard' && (
        <div className="space-y-6">
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
                <span>{nextSession ? `${nextSession.day} — ${nextSession.time}` : 'Mardi — 17:00'}</span>
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
              <div className="text-2xl font-black text-indigo-600 mt-1">{student.monthlyFee.toLocaleString()} DZD</div>
              <div className="text-xs text-slate-500 font-medium mt-1">
                {student.subscriptionPlan || `Abonnement ${student.level}`}
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Solde Paiement</span>
              <div className={`text-2xl font-black mt-1 ${student.remainingAmount === 0 ? 'text-emerald-600' : 'text-amber-600'}`}>
                {student.remainingAmount === 0 ? 'Réglé' : `${student.remainingAmount.toLocaleString()} DZD`}
              </div>
              <div className="text-xs text-slate-500 font-medium mt-1">
                {student.remainingAmount === 0 ? 'Aucun impayé en cours' : 'Paiement en attente'}
              </div>
            </div>
          </div>

          {/* Main Grid: Schedule preview & Recent documents */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4 bg-white rounded-2xl border border-slate-200 shadow-xs p-5">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-slate-900">Emploi du Temps Hebdomadaire</h2>
                  <p className="text-xs text-slate-500">Séances programmées pour votre groupe {student.groupName}.</p>
                </div>
              </div>

              <div className="space-y-3">
                {studentSessions.map((session) => (
                  <div
                    key={session.id}
                    className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-14 h-14 rounded-xl bg-blue-100 text-blue-700 font-bold flex flex-col items-center justify-center text-xs shrink-0">
                        <span className="text-[10px] font-semibold">{session.day}</span>
                        <span className="font-mono text-xs">{session.time.split(' - ')[0]}</span>
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
                    <span
                      className={`px-3 py-1 rounded-lg text-xs font-bold ${
                        session.attendanceCompleted
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-blue-50 text-blue-700 border border-blue-200'
                      }`}
                    >
                      {session.attendanceCompleted ? 'Présences prises' : 'À venir'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4 bg-white rounded-2xl border border-slate-200 shadow-xs p-5">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-slate-900">Documents Récents</h2>
                <span className="text-xs text-slate-500">{groupDocuments.length} fichiers</span>
              </div>

              <div className="space-y-2.5">
                {groupDocuments.slice(0, 4).map((doc) => (
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
                        <div className="text-[10px] text-slate-500">{doc.subject} · {doc.fileSize}</div>
                      </div>
                    </div>

                    <button
                      onClick={() => onPreviewDocument(doc)}
                      className="p-1.5 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors cursor-pointer shrink-0"
                      title="Consulter"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. PLANNING HEBDOMADAIRE                                                  */}
      {/* ========================================================================= */}
      {currentTab === 'planning' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h1 className="text-xl font-bold text-slate-900">Mon Emploi du Temps Hebdomadaire</h1>
              <p className="text-xs text-slate-500">
                Horaires, salles et formateurs affectés à votre groupe {student.groupName}.
              </p>
            </div>
            <span className="px-3 py-1.5 rounded-xl bg-blue-50 text-blue-700 font-bold text-xs border border-blue-200 self-start sm:self-auto">
              Année 2026/2027 · {student.level}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {studentSessions.map((ses) => (
              <div key={ses.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-800">
                    {ses.day}
                  </span>
                  <span className="text-xs font-extrabold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                    {ses.room}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900">{ses.subject}</h3>
                  <div className="text-xs text-slate-500 mt-0.5">Formateur: {ses.teacherName}</div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="font-mono text-slate-600 font-medium">{ses.time} ({ses.duration})</span>
                  <span
                    className={`font-semibold ${
                      ses.attendanceCompleted ? 'text-emerald-600' : 'text-slate-400'
                    }`}
                  >
                    {ses.attendanceCompleted ? '✓ Présences faites' : 'À venir'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. HISTORIQUE DES PRÉSENCES                                               */}
      {/* ========================================================================= */}
      {currentTab === 'attendance' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl font-bold text-slate-900">Mes Présences & Émargements</h1>
              <p className="text-xs text-slate-500">
                Relevé exact des pointages enregistrés par vos enseignants en classe.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200">
                Assiduité : {attendanceRate}%
              </span>
            </div>
          </div>

          {/* Quick Filter Bar */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-medium w-fit">
            <button
              onClick={() => setAttendanceFilter('all')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                attendanceFilter === 'all' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600'
              }`}
            >
              Tous ({myAttendance.length})
            </button>
            <button
              onClick={() => setAttendanceFilter('present')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                attendanceFilter === 'present' ? 'bg-emerald-600 text-white shadow-xs font-bold' : 'text-emerald-700'
              }`}
            >
              Présent ({presentCount})
            </button>
            <button
              onClick={() => setAttendanceFilter('absent')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                attendanceFilter === 'absent' ? 'bg-rose-600 text-white shadow-xs font-bold' : 'text-rose-700'
              }`}
            >
              Absent ({absentCount})
            </button>
            <button
              onClick={() => setAttendanceFilter('late')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                attendanceFilter === 'late' ? 'bg-amber-600 text-white shadow-xs font-bold' : 'text-amber-700'
              }`}
            >
              Retard ({lateCount})
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="divide-y divide-slate-100">
              {filteredAttendance.length === 0 ? (
                <div className="p-8 text-center text-xs text-slate-400">
                  Aucun pointage trouvé pour cette sélection.
                </div>
              ) : (
                filteredAttendance.map((rec) => (
                  <div key={rec.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-3.5">
                      {rec.status === 'present' && (
                        <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
                          <Check className="w-4 h-4" />
                        </div>
                      )}
                      {rec.status === 'absent' && (
                        <div className="w-9 h-9 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center font-bold">
                          <AlertCircle className="w-4 h-4" />
                        </div>
                      )}
                      {rec.status === 'late' && (
                        <div className="w-9 h-9 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center font-bold">
                          <Clock3 className="w-4 h-4" />
                        </div>
                      )}

                      <div>
                        <div className="text-sm font-bold text-slate-900">{rec.subject}</div>
                        <div className="text-xs text-slate-400 mt-0.5">
                          {rec.date} · {rec.time} {rec.note ? `— Note: ${rec.note}` : ''}
                        </div>
                      </div>
                    </div>

                    <div>
                      {rec.status === 'present' && (
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          🟢 Présent
                        </span>
                      )}
                      {rec.status === 'absent' && (
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200">
                          🔴 Absent
                        </span>
                      )}
                      {rec.status === 'late' && (
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
                          🟠 Retard
                        </span>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. DOCUMENTS & SUPPORTS DE COURS                                          */}
      {/* ========================================================================= */}
      {currentTab === 'documents' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h1 className="text-xl font-bold text-slate-900">Mes Documents & Supports Pédagogiques</h1>
              <p className="text-xs text-slate-500">
                Téléchargez les séries d'exercices, devoirs et cours mis à disposition par vos enseignants.
              </p>
            </div>
            <span className="text-xs text-slate-500 font-semibold">{groupDocuments.length} ressources disponibles</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {groupDocuments.map((doc) => (
              <div
                key={doc.id}
                className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3 hover:border-blue-400 transition-all"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold shrink-0">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 leading-snug">{doc.title}</h3>
                      <div className="text-xs text-slate-500 mt-1">
                        Matière : <strong className="text-slate-700">{doc.subject}</strong> · Auteur : {doc.authorName}
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600 shrink-0">
                    {doc.type}
                  </span>
                </div>

                {doc.description && (
                  <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    {doc.description}
                  </p>
                )}

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-400 text-[11px] font-mono">{doc.date} · {doc.fileSize}</span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => onPreviewDocument(doc)}
                      className="px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold text-xs transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Consulter</span>
                    </button>
                    <button
                      onClick={() => onPreviewDocument(doc)}
                      className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
                      title="Télécharger"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. MES PAIEMENTS & REÇUS                                                  */}
      {/* ========================================================================= */}
      {currentTab === 'payments' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h1 className="text-xl font-bold text-slate-900">Mes Reçus de Scolarité & Cotisations</h1>
              <p className="text-xs text-slate-500">
                Historique des encaissements enregistrés auprès de l'administration ETS EL MAALIM.
              </p>
            </div>
          </div>

          {/* Tuition summary card */}
          <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-md space-y-4">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-300">Abonnement Annuel / Mensuel</span>
              <span className="font-mono text-emerald-400 font-bold">Dinar Algérien (DZD)</span>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-3 border-t border-slate-800 text-center">
              <div>
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Tarif / Mois</div>
                <div className="text-base sm:text-lg font-black text-white mt-1">
                  {student.monthlyFee.toLocaleString()} DZD
                </div>
              </div>
              <div>
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Total Réglé</div>
                <div className="text-base sm:text-lg font-black text-emerald-400 mt-1">
                  {student.paidAmount.toLocaleString()} DZD
                </div>
              </div>
              <div>
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Solde Impayé</div>
                <div className="text-base sm:text-lg font-black text-rose-400 mt-1">
                  {student.remainingAmount.toLocaleString()} DZD
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-4 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">Reçus Officiels Délivrés</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 uppercase font-semibold border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3">Reçu N°</th>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3">Formule / Désignation</th>
                    <th className="px-4 py-3">Mode</th>
                    <th className="px-4 py-3">Montant Encaissé</th>
                    <th className="px-4 py-3 text-right">Statut</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {myPayments.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50/70">
                      <td className="px-4 py-3 font-mono font-bold text-slate-800">{p.receiptNumber}</td>
                      <td className="px-4 py-3 text-slate-600">{p.date}</td>
                      <td className="px-4 py-3 font-semibold text-slate-800">{p.subscriptionPlan}</td>
                      <td className="px-4 py-3 text-slate-600">{p.paymentMethod}</td>
                      <td className="px-4 py-3 font-black text-emerald-600">
                        +{p.paidAmount.toLocaleString()} DZD
                      </td>
                      <td className="px-4 py-3 text-right">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700">
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
      {/* 6. MON PROFIL                                                             */}
      {/* ========================================================================= */}
      {currentTab === 'profile' && (
        <div className="max-w-2xl space-y-4">
          <h1 className="text-xl font-bold text-slate-900">Mon Profil Étudiant</h1>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5 text-xs">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-indigo-600 text-white font-black text-xl flex items-center justify-center">
                {student.firstName[0]}
                {student.lastName[0]}
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">{student.firstName} {student.lastName}</h2>
                <div className="text-slate-500">{student.level} · Groupe {student.groupName}</div>
                <div className="text-[11px] font-mono text-blue-600 mt-0.5">Matricule : {student.id.toUpperCase()}</div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
              <div>
                <span className="text-slate-400 font-semibold uppercase text-[10px] block">Téléphone Étudiant</span>
                <span className="font-bold text-slate-800 text-sm">{student.phone}</span>
              </div>
              <div>
                <span className="text-slate-400 font-semibold uppercase text-[10px] block">Téléphone Parent / Tuteur</span>
                <span className="font-bold text-slate-800 text-sm">{student.parentPhone}</span>
              </div>
              <div>
                <span className="text-slate-400 font-semibold uppercase text-[10px] block">Adresse Email</span>
                <span className="font-bold text-slate-800 text-sm">{student.email || 'Non renseigné'}</span>
              </div>
              <div>
                <span className="text-slate-400 font-semibold uppercase text-[10px] block">Date d'inscription</span>
                <span className="font-bold text-slate-800 text-sm">{student.enrollmentDate}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
