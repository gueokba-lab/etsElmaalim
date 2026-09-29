import React, { useState } from 'react';
import { Group, SessionItem } from '../../types';
import { X, Calendar, Clock, MapPin, Layers, Save } from 'lucide-react';

interface AddSessionModalProps {
  groups: Group[];
  onClose: () => void;
  onAddSession: (data: {
    day: SessionItem['day'];
    time: string;
    duration: string;
    groupId: string;
    room: string;
  }) => void;
}

export const AddSessionModal: React.FC<AddSessionModalProps> = ({
  groups,
  onClose,
  onAddSession
}) => {
  const [day, setDay] = useState<SessionItem['day']>('Lundi');
  const [time, setTime] = useState('17:00 - 19:00');
  const [duration, setDuration] = useState('2h00');
  const [groupId, setGroupId] = useState(groups[0]?.id || '');
  const [room, setRoom] = useState('Salle 02');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!groupId) return;
    onAddSession({
      day,
      time,
      duration,
      groupId,
      room
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600/10 text-blue-700 flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Programmer une séance</h2>
              <div className="text-xs text-slate-500">Ajout au planning hebdomadaire des salles</div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Jour de la semaine
              </label>
              <select
                value={day}
                onChange={(e) => setDay(e.target.value as any)}
                className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:border-blue-600 bg-white"
              >
                <option value="Lundi">Lundi</option>
                <option value="Mardi">Mardi</option>
                <option value="Mercredi">Mercredi</option>
                <option value="Jeudi">Jeudi</option>
                <option value="Vendredi">Vendredi</option>
                <option value="Samedi">Samedi</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Salle assignée
              </label>
              <select
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:border-blue-600 bg-white font-medium"
              >
                <option value="Salle 01">Salle 01 (Capacité 20)</option>
                <option value="Salle 02">Salle 02 (Capacité 18)</option>
                <option value="Salle 03">Salle 03 (Capacité 20)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Groupe d'élèves
            </label>
            <select
              value={groupId}
              onChange={(e) => setGroupId(e.target.value)}
              className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:border-blue-600 bg-white font-medium"
            >
              {groups.map((grp) => (
                <option key={grp.id} value={grp.id}>
                  {grp.name} ({grp.subject} · {grp.teacherName})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Créneau horaire
              </label>
              <input
                type="text"
                required
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="17:00 - 19:00"
                className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:border-blue-600 bg-white font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Durée
              </label>
              <input
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="2h00"
                className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:border-blue-600 bg-white"
              />
            </div>
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-blue-600/20 transition-colors"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Enregistrer la séance</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
