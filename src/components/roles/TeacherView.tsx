import React from 'react';
import { SessionItem, Student, Group, DocumentItem, AttendanceRecord, TeacherSection } from '../../types';
import {
  CalendarCheck,
  Users,
  FolderOpen,
  User,
  Clock,
  MapPin,
  CheckCircle2,
  Plus,
  Eye,
  Download,
  AlertCircle,
  Sparkles,
  Phone,
  Mail,
  Award,
  CheckSquare
} from 'lucide-react';

interface TeacherViewProps {
  currentSection: TeacherSection;
  setSection: (section: TeacherSection) => void;
  sessions: SessionItem[];
  students: Student[];
  groups: Group[];
  documents: DocumentItem[];
  attendance: AttendanceRecord[];
  onTakeAttendance: (session: SessionItem) => void;
  onOpenAddDocument: () => void;
  onPreviewDocument: (doc: DocumentItem) => void;
}

export const TeacherView: React.FC<TeacherViewProps> = ({
  currentSection,
  setSection,
  sessions,
  students,
  groups,
  documents,
  attendance,
  onTakeAttendance,
  onOpenAddDocument,
  onPreviewDocument
}) => {
  // Current teacher: Ahmed Mansouri (id: tch-1)
  const teacherSessions = sessions.filter((s) => s.teacherId === 'tch-1');
  const teacherGroups = groups.filter((g) => g.teacherId === 'tch-1');
  const teacherDocuments = documents.filter((d) => d.authorName.includes('Ahmed Mansouri'));

  // Today session highlight
  const todaySession = teacherSessions.find((s) => s.day === 'Mardi') || teacherSessions[0];
  const sessionAttendance = attendance.filter((a) => a.sessionId === todaySession?.id);
  const presentCount = sessionAttendance.filter((a) => a.status === 'present').length;
  const absentCount = sessionAttendance.filter((a) => a.status === 'absent').length;
  const lateCount = sessionAttendance.filter((a) => a.status === 'late').length;

  return (
    <div className="p-6 lg:px-8 lg:py-6 space-y-6 w-full max-w-none">
      {/* ========================================================================= */}
      {/* 1. TABLEAU DE BORD FORMATEUR                                              */}
      {/* ========================================================================= */}
      {currentSection === 'dashboard' && (
        <div className="space-y-6">
          {/* Hero Teacher Banner */}
          <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 text-white rounded-2xl p-6 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase tracking-wider bg-white/20 px-2.5 py-0.5 rounded-full">
                  Espace Pédagogique · ETS EL MAALIM
                </span>
                <span className="text-xs text-blue-200">· Mardi 29 Septembre 2026</span>
              </div>
              <h1 className="text-2xl font-black tracking-tight mt-1.5">
                Bonjour, Ahmed 👋
              </h1>
              <p className="text-xs text-blue-100 mt-1">
                Professeur de Mathématiques (Lycée & BAC) · Centre ETS EL MAALIM · Vos séances, feuilles d'émargement et documents.
              </p>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                onClick={onOpenAddDocument}
                className="px-4 py-2.5 rounded-xl bg-white text-blue-900 text-xs font-bold flex items-center gap-1.5 shadow-md hover:bg-blue-50 transition-colors"
              >
                <Plus className="w-4 h-4 text-blue-700" />
                <span>Publier un support de cours</span>
              </button>
            </div>
          </div>

          {/* Featured Séance du jour Highlight: 17:00 Mathématiques - 3AS Groupe A */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900">
                Mes séances aujourd'hui (Mardi)
              </h2>
              <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg">
                Salle 02 · 17:00
              </span>
            </div>

            {todaySession && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-100 text-blue-700 flex flex-col items-center justify-center shrink-0">
                    <span className="text-base font-black leading-none">17:00</span>
                    <span className="text-[10px] font-semibold mt-1">2h00</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-slate-900">
                        {todaySession.subject} — {todaySession.groupName}
                      </h3>
                      <span
                        className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                          todaySession.attendanceCompleted
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}
                      >
                        {todaySession.attendanceCompleted ? 'Appel validé' : 'En attente d\'émargement'}
                      </span>
                    </div>

                    <div className="text-xs text-slate-500 flex items-center gap-3 mt-1.5">
                      <span className="flex items-center gap-1 font-semibold text-slate-700">
                        <MapPin className="w-3.5 h-3.5 text-blue-600" /> {todaySession.room}
                      </span>
                      <span>·</span>
                      <span>Terminale Scientifique (BAC)</span>
                      <span>·</span>
                      <span>5 élèves inscrits</span>
                    </div>

                    {todaySession.attendanceCompleted && sessionAttendance.length > 0 && (
                      <div className="mt-3 flex items-center gap-3 text-xs font-medium bg-slate-50 p-2.5 rounded-xl border border-slate-200 w-fit">
                        <span className="text-emerald-700 font-bold">🟢 {presentCount} Présents</span>
                        <span className="text-rose-700 font-bold">🔴 {absentCount} Absents</span>
                        <span className="text-amber-700 font-bold">🟠 {lateCount} Retard</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="shrink-0">
                  <button
                    type="button"
                    onClick={() => onTakeAttendance(todaySession)}
                    className={`w-full lg:w-auto px-6 py-3.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-lg transition-all active:scale-[0.99] ${
                      todaySession.attendanceCompleted
                        ? 'bg-slate-900 hover:bg-slate-800 text-white'
                        : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-blue-600/30'
                    }`}
                  >
                    <CheckSquare className="w-4 h-4" />
                    <span>
                      {todaySession.attendanceCompleted
                        ? 'Modifier la feuille de présence'
                        : 'Prendre les présences maintenant'}
                    </span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* 2-Columns: Mes Groupes & Derniers Documents déposés */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Mes Groupes */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900">Mes groupes assignés</h3>
                <button
                  onClick={() => setSection('groups')}
                  className="text-xs text-blue-600 font-semibold hover:text-blue-700"
                >
                  Voir tous ({teacherGroups.length})
                </button>
              </div>

              <div className="space-y-3">
                {teacherGroups.map((grp) => (
                  <div key={grp.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-slate-900">{grp.name}</div>
                      <div className="text-[11px] text-slate-500">{grp.level} · {grp.scheduleTime}</div>
                    </div>
                    <span className="text-xs font-extrabold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg">
                      {grp.studentCount} élèves
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Documents récents */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900">Mes documents récents</h3>
                <button
                  onClick={() => setSection('documents')}
                  className="text-xs text-blue-600 font-semibold hover:text-blue-700"
                >
                  Voir tous ({teacherDocuments.length})
                </button>
              </div>

              <div className="space-y-2.5">
                {teacherDocuments.slice(0, 3).map((doc) => (
                  <div key={doc.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                    <div className="truncate max-w-xs">
                      <div className="font-bold text-slate-900 truncate">{doc.title}</div>
                      <div className="text-[10px] text-slate-500">{doc.groupName} · {doc.fileSize}</div>
                    </div>
                    <button
                      onClick={() => onPreviewDocument(doc)}
                      className="p-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 shrink-0"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. MES SÉANCES (PLANNING COMPLET ENSEIGNANT)                              */}
      {/* ========================================================================= */}
      {currentSection === 'sessions' && (
        <div className="space-y-4">
          <h1 className="text-xl font-bold text-slate-900">Planning de mes séances hebdomadaires</h1>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50/80 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3.5">Jour & Heure</th>
                  <th className="px-6 py-3.5">Matière</th>
                  <th className="px-6 py-3.5">Groupe</th>
                  <th className="px-6 py-3.5">Salle</th>
                  <th className="px-6 py-3.5">Statut</th>
                  <th className="px-6 py-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {teacherSessions.map((ses) => (
                  <tr key={ses.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="px-6 py-3.5 font-bold font-mono text-slate-900">
                      {ses.day} — {ses.time}
                    </td>
                    <td className="px-6 py-3.5 font-semibold text-slate-800">{ses.subject}</td>
                    <td className="px-6 py-3.5 text-slate-700">{ses.groupName}</td>
                    <td className="px-6 py-3.5 font-bold text-blue-700">{ses.room}</td>
                    <td className="px-6 py-3.5">
                      <span
                        className={`inline-flex px-2 py-0.5 rounded-full font-bold text-[10px] ${
                          ses.attendanceCompleted
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-blue-50 text-blue-700'
                        }`}
                      >
                        {ses.attendanceCompleted ? 'Présences prises' : 'À venir'}
                      </span>
                    </td>
                    <td className="px-6 py-3.5 text-right">
                      <button
                        onClick={() => onTakeAttendance(ses)}
                        className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-colors"
                      >
                        {ses.attendanceCompleted ? 'Modifier l\'appel' : 'Faire l\'appel'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. MES GROUPES (LISTE DES ÉLÈVES & COORDONNÉES)                           */}
      {/* ========================================================================= */}
      {currentSection === 'groups' && (
        <div className="space-y-4">
          <h1 className="text-xl font-bold text-slate-900">Mes Groupes & Listes d'Élèves</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {teacherGroups.map((grp) => {
              const grpStudents = students.filter((s) => s.groupId === grp.id);
              return (
                <div key={grp.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div>
                      <h3 className="text-base font-bold text-slate-900">{grp.name}</h3>
                      <div className="text-xs text-slate-500">{grp.level} · {grp.room}</div>
                    </div>
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-50 text-blue-700">
                      {grpStudents.length} élèves
                    </span>
                  </div>

                  <div className="space-y-2">
                    {grpStudents.map((st) => (
                      <div key={st.id} className="p-2.5 rounded-xl bg-slate-50 flex items-center justify-between text-xs">
                        <div className="font-semibold text-slate-800">{st.firstName} {st.lastName}</div>
                        <div className="text-slate-500 font-mono">{st.phone} · <strong className="text-blue-600">{st.attendanceRate}% assiduité</strong></div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. PRÉSENCES & ÉMARGEMENT (APPEL PAR SÉANCE)                              */}
      {/* ========================================================================= */}
      {currentSection === 'attendance' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl font-bold text-slate-900">Feuilles d'Émargement & Pointage</h1>
              <p className="text-xs text-slate-500">
                Faites l'appel pour chacune de vos séances et enregistrez les présences, absences et retards.
              </p>
            </div>
            <div className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 self-start sm:self-auto">
              Synchronisation immédiate avec l'Administration & l'Espace Élève
            </div>
          </div>

          {/* Sessions List for Taking Attendance */}
          <div className="space-y-3">
            <h2 className="text-sm font-bold text-slate-900">Mes Séances Programmées</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {teacherSessions.map((ses) => {
                const sesAtt = attendance.filter((a) => a.sessionId === ses.id);
                const pCount = sesAtt.filter((a) => a.status === 'present').length;
                const aCount = sesAtt.filter((a) => a.status === 'absent').length;
                const lCount = sesAtt.filter((a) => a.status === 'late').length;

                return (
                  <div
                    key={ses.id}
                    className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4 hover:border-blue-400 transition-all"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-slate-900">{ses.groupName}</span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                            {ses.room}
                          </span>
                        </div>
                        <div className="text-xs text-slate-500 mt-0.5">
                          {ses.day} · {ses.time} · {ses.subject}
                        </div>
                      </div>

                      <span
                        className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                          ses.attendanceCompleted
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}
                      >
                        {ses.attendanceCompleted ? '✓ Appel validé' : 'En attente'}
                      </span>
                    </div>

                    {ses.attendanceCompleted && sesAtt.length > 0 && (
                      <div className="flex items-center gap-2 text-xs bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                        <span className="text-emerald-700 font-bold">🟢 {pCount} Présents</span>
                        <span>·</span>
                        <span className="text-rose-700 font-bold">🔴 {aCount} Absents</span>
                        <span>·</span>
                        <span className="text-amber-700 font-bold">🟠 {lCount} Retards</span>
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={() => onTakeAttendance(ses)}
                      className={`w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        ses.attendanceCompleted
                          ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                          : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/20'
                      }`}
                    >
                      <CheckSquare className="w-4 h-4" />
                      <span>{ses.attendanceCompleted ? 'Modifier les présences' : 'Faire l\'appel en classe'}</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent Records Log for Teacher */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-4 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">Derniers Pointages Réalisés</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3">Date & Heure</th>
                    <th className="px-4 py-3">Élève</th>
                    <th className="px-4 py-3">Matière</th>
                    <th className="px-4 py-3">Statut</th>
                    <th className="px-4 py-3">Motif / Note</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {attendance
                    .filter((a) => a.subject.includes('Mathématiques') || teacherSessions.some((s) => s.id === a.sessionId))
                    .map((rec) => (
                      <tr key={rec.id} className="hover:bg-slate-50/70">
                        <td className="px-4 py-3 font-mono text-slate-600">
                          {rec.date} {rec.time}
                        </td>
                        <td className="px-4 py-3 font-bold text-slate-900">{rec.studentName}</td>
                        <td className="px-4 py-3 text-slate-700">{rec.subject}</td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              rec.status === 'present'
                                ? 'bg-emerald-50 text-emerald-700'
                                : rec.status === 'absent'
                                ? 'bg-rose-50 text-rose-700'
                                : 'bg-amber-50 text-amber-700'
                            }`}
                          >
                            {rec.status === 'present'
                              ? '🟢 Présent'
                              : rec.status === 'absent'
                              ? '🔴 Absent'
                              : '🟠 Retard'}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-slate-500 italic">{rec.note || '—'}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. DOCUMENTS & 6. PROFIL                                                  */}
      {/* ========================================================================= */}
      {currentSection === 'documents' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-slate-900">Mes Documents & Supports Pédagogiques</h1>
            <button
              onClick={onOpenAddDocument}
              className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Publier une ressource</span>
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase font-semibold border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3.5">Fichier</th>
                  <th className="px-6 py-3.5">Type</th>
                  <th className="px-6 py-3.5">Groupe</th>
                  <th className="px-6 py-3.5">Date</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {teacherDocuments.map((doc) => (
                  <tr key={doc.id} className="hover:bg-slate-50/70">
                    <td className="px-6 py-3.5 font-bold text-slate-900">{doc.title}</td>
                    <td className="px-6 py-3.5">{doc.type}</td>
                    <td className="px-6 py-3.5">{doc.groupName}</td>
                    <td className="px-6 py-3.5 text-slate-500">{doc.date}</td>
                    <td className="px-6 py-3.5 text-right">
                      <button
                        onClick={() => onPreviewDocument(doc)}
                        className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 font-semibold"
                      >
                        Consulter
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {currentSection === 'profile' && (
        <div className="max-w-xl space-y-4">
          <h1 className="text-xl font-bold text-slate-900">Profil Enseignant</h1>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4 text-xs">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white font-black text-xl flex items-center justify-center">
                AM
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900">Ahmed Mansouri</h2>
                <div className="text-slate-500">Enseignant Spécialiste · Mathématiques BAC</div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 space-y-2 text-slate-700">
              <div>Téléphone : <strong>0550 44 55 66</strong></div>
              <div>Email : <strong>a.mansouri@centrepro.dz</strong></div>
              <div>Expérience : <strong>12 ans d'exercice (Lycée Pilote)</strong></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
