import React, { useState } from 'react';
import { SessionItem, Student, AttendanceStatus, AttendanceRecord } from '../../types';
import { X, Check, Clock, UserX, CheckCheck, Save, Sparkles } from 'lucide-react';

interface AttendanceModalProps {
  session: SessionItem;
  students: Student[];
  existingAttendance: AttendanceRecord[];
  onClose: () => void;
  onSave: (sessionId: string, records: { studentId: string; status: AttendanceStatus; note?: string }[]) => void;
}

export const AttendanceModal: React.FC<AttendanceModalProps> = ({
  session,
  students,
  existingAttendance,
  onClose,
  onSave
}) => {
  // Filter students of this session's group
  const groupStudents = students.filter((s) => s.groupId === session.groupId);

  // Initialize status for each student based on existing records or default to present
  const [attendanceState, setAttendanceState] = useState<{
    [studentId: string]: { status: AttendanceStatus; note: string };
  }>(() => {
    const initialState: { [studentId: string]: { status: AttendanceStatus; note: string } } = {};
    groupStudents.forEach((student) => {
      const existing = existingAttendance.find(
        (a) => a.sessionId === session.id && a.studentId === student.id
      );
      initialState[student.id] = {
        status: existing ? existing.status : 'present',
        note: existing?.note || ''
      };
    });
    return initialState;
  });

  const handleSetStatus = (studentId: string, status: AttendanceStatus) => {
    setAttendanceState((prev) => ({
      ...prev,
      [studentId]: { ...prev[studentId], status }
    }));
  };

  const handleSetNote = (studentId: string, note: string) => {
    setAttendanceState((prev) => ({
      ...prev,
      [studentId]: { ...prev[studentId], note }
    }));
  };

  const markAllPresent = () => {
    setAttendanceState((prev) => {
      const next = { ...prev };
      groupStudents.forEach((s) => {
        next[s.id] = { ...next[s.id], status: 'present' };
      });
      return next;
    });
  };

  const handleSave = () => {
    const records = Object.entries(attendanceState).map(([studentId, data]) => ({
      studentId,
      status: data.status,
      note: data.note
    }));
    onSave(session.id, records);
  };

  // Metrics
  const presentCount = Object.values(attendanceState).filter((v) => v.status === 'present').length;
  const absentCount = Object.values(attendanceState).filter((v) => v.status === 'absent').length;
  const lateCount = Object.values(attendanceState).filter((v) => v.status === 'late').length;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div
        className="w-full sm:max-w-lg bg-white rounded-t-3xl sm:rounded-2xl max-h-[92vh] flex flex-col shadow-2xl animate-in slide-in-from-bottom duration-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Grab bar for mobile */}
        <div className="w-10 h-1.5 bg-slate-300 rounded-full mx-auto my-2.5 sm:hidden" />

        {/* Modal Header */}
        <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                {session.room}
              </span>
              <span className="text-xs text-slate-500 font-medium">
                {session.time} · {session.date}
              </span>
            </div>
            <h2 className="text-base font-bold text-slate-900 mt-1">
              Feuille d'émargement — {session.groupName}
            </h2>
            <div className="text-xs text-slate-600">
              Matière : <span className="font-semibold text-slate-800">{session.subject}</span> · Formateur : {session.teacherName}
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-colors"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick controls & stats bar */}
        <div className="px-5 py-2.5 bg-white border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs font-medium">
            <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
              🟢 {presentCount} Présent{presentCount > 1 ? 's' : ''}
            </span>
            <span className="text-rose-700 bg-rose-50 px-2 py-0.5 rounded">
              🔴 {absentCount} Absent{absentCount > 1 ? 's' : ''}
            </span>
            <span className="text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
              🟠 {lateCount} Retard{lateCount > 1 ? 's' : ''}
            </span>
          </div>
          <button
            onClick={markAllPresent}
            className="flex items-center gap-1 text-[11px] font-semibold text-indigo-600 hover:text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-lg transition-colors"
          >
            <CheckCheck className="w-3.5 h-3.5" />
            Tous présents
          </button>
        </div>

        {/* Students list */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {groupStudents.length === 0 ? (
            <div className="text-center py-8 text-slate-500 text-sm">
              Aucun élève enregistré dans ce groupe.
            </div>
          ) : (
            groupStudents.map((student) => {
              const currentStatus = attendanceState[student.id]?.status || 'present';
              const currentNote = attendanceState[student.id]?.note || '';
              const isPresent = currentStatus === 'present';
              const isAbsent = currentStatus === 'absent';
              const isLate = currentStatus === 'late';

              return (
                <div
                  key={student.id}
                  className={`p-3.5 rounded-2xl border transition-all ${
                    isPresent
                      ? 'bg-white border-slate-200 shadow-xs'
                      : isAbsent
                      ? 'bg-rose-50/50 border-rose-200'
                      : 'bg-amber-50/50 border-amber-200'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div
                        className={`w-9 h-9 rounded-full ${student.avatarColor} text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-xs`}
                      >
                        {student.firstName[0]}
                        {student.lastName[0]}
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-bold text-slate-900 truncate">
                          {student.firstName} {student.lastName}
                        </div>
                        <div className="text-[11px] text-slate-500 flex items-center gap-1">
                          <span>{student.level}</span>
                          <span>·</span>
                          <span className="text-slate-600 font-medium">{student.attendanceRate}% d'assiduité</span>
                        </div>
                      </div>
                    </div>

                    {/* Quick status pill text */}
                    <div className="text-right">
                      {isPresent && (
                        <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-100/60 px-2 py-0.5 rounded-md">
                          Présent
                        </span>
                      )}
                      {isAbsent && (
                        <span className="text-[11px] font-semibold text-rose-700 bg-rose-100/60 px-2 py-0.5 rounded-md">
                          Absent
                        </span>
                      )}
                      {isLate && (
                        <span className="text-[11px] font-semibold text-amber-700 bg-amber-100/60 px-2 py-0.5 rounded-md">
                          En retard
                        </span>
                      )}
                    </div>
                  </div>

                  {/* 3 tactile buttons for status */}
                  <div className="grid grid-cols-3 gap-2 mt-3">
                    <button
                      type="button"
                      onClick={() => handleSetStatus(student.id, 'present')}
                      className={`min-h-[44px] flex items-center justify-center gap-1.5 rounded-xl text-xs font-semibold transition-all ${
                        isPresent
                          ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/30'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                      }`}
                    >
                      <Check className="w-4 h-4 stroke-[2.5]" />
                      <span>Présent</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleSetStatus(student.id, 'absent')}
                      className={`min-h-[44px] flex items-center justify-center gap-1.5 rounded-xl text-xs font-semibold transition-all ${
                        isAbsent
                          ? 'bg-rose-600 text-white shadow-sm shadow-rose-600/30'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                      }`}
                    >
                      <UserX className="w-4 h-4 stroke-[2.5]" />
                      <span>Absent</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleSetStatus(student.id, 'late')}
                      className={`min-h-[44px] flex items-center justify-center gap-1.5 rounded-xl text-xs font-semibold transition-all ${
                        isLate
                          ? 'bg-amber-600 text-white shadow-sm shadow-amber-600/30'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                      }`}
                    >
                      <Clock className="w-4 h-4 stroke-[2.5]" />
                      <span>Retard</span>
                    </button>
                  </div>

                  {/* Note input if absent or late */}
                  {(isAbsent || isLate) && (
                    <div className="mt-2.5 pt-2 border-t border-slate-200/60 animate-in fade-in">
                      <input
                        type="text"
                        placeholder={
                          isLate ? 'Ex: Retard de 15 minutes...' : 'Motif d\'absence ou justificatif...'
                        }
                        value={currentNote}
                        onChange={(e) => handleSetNote(student.id, e.target.value)}
                        className="w-full text-xs px-3 py-1.5 rounded-lg border border-slate-300 focus:outline-hidden focus:ring-1 focus:ring-blue-500 bg-white"
                      />
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Sticky bottom confirmation bar */}
        <div className="p-4 border-t border-slate-200 bg-white flex items-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="py-3 px-4 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors"
          >
            Annuler
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="flex-1 min-h-[46px] flex items-center justify-center gap-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-lg shadow-slate-900/10 active:scale-[0.99] transition-transform"
          >
            <Save className="w-4 h-4" />
            <span>Enregistrer les présences ({groupStudents.length} élèves)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
