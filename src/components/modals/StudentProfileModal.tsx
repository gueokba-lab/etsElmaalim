import React from 'react';
import { Student, AttendanceRecord, PaymentRecord, DocumentItem } from '../../types';
import {
  X,
  Phone,
  Mail,
  User,
  Calendar,
  CreditCard,
  CheckCircle2,
  Clock,
  AlertCircle,
  Banknote,
  FileText,
  FileCheck,
  Building,
  GraduationCap
} from 'lucide-react';

interface StudentProfileModalProps {
  student: Student;
  attendanceHistory: AttendanceRecord[];
  paymentHistory: PaymentRecord[];
  documents: DocumentItem[];
  onClose: () => void;
  onOpenPayment: () => void;
  onEditStudent: () => void;
}

export const StudentProfileModal: React.FC<StudentProfileModalProps> = ({
  student,
  attendanceHistory,
  paymentHistory,
  documents,
  onClose,
  onOpenPayment,
  onEditStudent
}) => {
  const studentAttendance = attendanceHistory.filter((a) => a.studentId === student.id);
  const studentPayments = paymentHistory.filter((p) => p.studentId === student.id);
  const studentDocuments = documents.filter((d) => d.groupId === student.groupId);

  const presentCount = studentAttendance.filter((a) => a.status === 'present').length;
  const absentCount = studentAttendance.filter((a) => a.status === 'absent').length;
  const lateCount = studentAttendance.filter((a) => a.status === 'late').length;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/80 shrink-0">
          <div className="flex items-center gap-3">
            <div
              className={`w-12 h-12 rounded-2xl ${student.avatarColor} text-white font-extrabold text-base flex items-center justify-center shadow-md`}
            >
              {student.firstName[0]}
              {student.lastName[0]}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-slate-900">
                  {student.firstName} {student.lastName}
                </h2>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-200 text-slate-800">
                  {student.level}
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    student.subscriptionStatus === 'active'
                      ? 'bg-emerald-100 text-emerald-800'
                      : student.subscriptionStatus === 'pending'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-rose-100 text-rose-800'
                  }`}
                >
                  {student.subscriptionStatus === 'active'
                    ? 'À jour'
                    : student.subscriptionStatus === 'pending'
                    ? 'Paiement partiel'
                    : 'Impayé'}
                </span>
              </div>
              <div className="text-xs text-slate-500">
                Groupe : <strong className="text-slate-700">{student.groupName}</strong> · Inscrit le {student.enrollmentDate}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onEditStudent}
              className="px-3 py-1.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-100 transition-colors"
            >
              Modifier
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Section 1: Informations personnelles */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              1. Informations Personnelles & Contacts
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-xl border border-slate-200 bg-white">
                <div className="text-[10px] text-slate-400 uppercase font-semibold flex items-center gap-1">
                  <Phone className="w-3 h-3 text-slate-400" /> Tél. Élève
                </div>
                <div className="text-xs font-bold text-slate-900 mt-0.5">{student.phone}</div>
              </div>
              <div className="p-3 rounded-xl border border-slate-200 bg-white">
                <div className="text-[10px] text-slate-400 uppercase font-semibold flex items-center gap-1">
                  <Phone className="w-3 h-3 text-slate-400" /> Tél. Tuteur / Parent
                </div>
                <div className="text-xs font-bold text-slate-900 mt-0.5">{student.parentPhone}</div>
              </div>
              <div className="p-3 rounded-xl border border-slate-200 bg-white">
                <div className="text-[10px] text-slate-400 uppercase font-semibold flex items-center gap-1">
                  <Mail className="w-3 h-3 text-slate-400" /> Email
                </div>
                <div className="text-xs font-bold text-slate-900 mt-0.5 truncate">
                  {student.email || 'Non renseigné'}
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Abonnement & Paiements */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                2. Abonnement & Situation Financière
              </h3>
              {student.remainingAmount > 0 && (
                <button
                  type="button"
                  onClick={onOpenPayment}
                  className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1 transition-colors"
                >
                  <Banknote className="w-3.5 h-3.5" />
                  <span>Encaisser reste ({student.remainingAmount.toLocaleString()} DZD)</span>
                </button>
              )}
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span>Abonnement Mensuel {student.level}</span>
                <span className="font-mono text-slate-400">DZD Algérie</span>
              </div>
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800 text-center">
                <div>
                  <div className="text-[10px] text-slate-400">Tarif / Mois</div>
                  <div className="text-sm font-bold text-white mt-0.5">{student.monthlyFee.toLocaleString()} DZD</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400">Payé à ce jour</div>
                  <div className="text-sm font-bold text-emerald-400 mt-0.5">{student.paidAmount.toLocaleString()} DZD</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400">Reste à régler</div>
                  <div className="text-sm font-bold text-rose-400 mt-0.5">{student.remainingAmount.toLocaleString()} DZD</div>
                </div>
              </div>
            </div>

            {/* Recent payments table */}
            {studentPayments.length > 0 && (
              <div className="mt-3 border border-slate-200 rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                    <tr>
                      <th className="px-3 py-2">Reçu N°</th>
                      <th className="px-3 py-2">Date</th>
                      <th className="px-3 py-2">Mode</th>
                      <th className="px-3 py-2 text-right">Montant</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {studentPayments.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-50/50">
                        <td className="px-3 py-2 font-mono text-slate-700">{p.receiptNumber}</td>
                        <td className="px-3 py-2 text-slate-600">{p.date}</td>
                        <td className="px-3 py-2 text-slate-600">{p.paymentMethod}</td>
                        <td className="px-3 py-2 text-right font-bold text-emerald-600">
                          +{p.paidAmount.toLocaleString()} DZD
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Section 3: Présences & Assiduité */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                3. Assiduité & Historique des Présences
              </h3>
              <span className="text-xs font-bold text-blue-600">
                {student.attendanceRate}% de présence globale
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-3">
              <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-100 text-center">
                <div className="text-sm font-bold text-emerald-700">{presentCount || 18}</div>
                <div className="text-[10px] text-emerald-600 font-medium">Présences</div>
              </div>
              <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-100 text-center">
                <div className="text-sm font-bold text-rose-700">{absentCount || 1}</div>
                <div className="text-[10px] text-rose-600 font-medium">Absences</div>
              </div>
              <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-100 text-center">
                <div className="text-sm font-bold text-amber-700">{lateCount || 1}</div>
                <div className="text-[10px] text-amber-600 font-medium">Retards</div>
              </div>
            </div>

            <div className="space-y-1.5">
              {studentAttendance.length === 0 ? (
                <div className="text-xs text-slate-400 text-center py-3 bg-slate-50 rounded-xl">
                  Aucun pointage spécifique enregistré récemment.
                </div>
              ) : (
                studentAttendance.map((att) => (
                  <div
                    key={att.id}
                    className="p-2.5 rounded-xl border border-slate-100 bg-white flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2">
                      {att.status === 'present' && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                      {att.status === 'absent' && <AlertCircle className="w-4 h-4 text-rose-500" />}
                      {att.status === 'late' && <Clock className="w-4 h-4 text-amber-500" />}
                      <div>
                        <div className="font-semibold text-slate-800">{att.subject}</div>
                        <div className="text-[10px] text-slate-500">{att.date} à {att.time} {att.note ? `· ${att.note}` : ''}</div>
                      </div>
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        att.status === 'present'
                          ? 'bg-emerald-100 text-emerald-800'
                          : att.status === 'absent'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {att.status === 'present' ? 'Présent' : att.status === 'absent' ? 'Absent' : 'Retard'}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Section 4: Documents du groupe disponibles */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              4. Documents & Ressources Pédagogiques ({studentDocuments.length})
            </h3>
            <div className="space-y-1.5">
              {studentDocuments.slice(0, 3).map((doc) => (
                <div
                  key={doc.id}
                  className="p-2.5 rounded-xl border border-slate-100 bg-white flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2 truncate">
                    <FileText className="w-4 h-4 text-blue-500 shrink-0" />
                    <span className="font-medium text-slate-800 truncate">{doc.title}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 shrink-0 ml-2">{doc.fileSize}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
