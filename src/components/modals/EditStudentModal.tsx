import React, { useState } from 'react';
import { Group, Student } from '../../types';
import { X, UserCheck, Save } from 'lucide-react';

interface EditStudentModalProps {
  student: Student;
  groups: Group[];
  onClose: () => void;
  onSave: (updatedData: Student) => void;
}

export const EditStudentModal: React.FC<EditStudentModalProps> = ({
  student,
  groups,
  onClose,
  onSave
}) => {
  const [firstName, setFirstName] = useState(student.firstName);
  const [lastName, setLastName] = useState(student.lastName);
  const [email, setEmail] = useState(student.email || '');
  const [phone, setPhone] = useState(student.phone);
  const [parentPhone, setParentPhone] = useState(student.parentPhone);
  const [level, setLevel] = useState(student.level);
  const [groupId, setGroupId] = useState(student.groupId);
  const [monthlyFee, setMonthlyFee] = useState(student.monthlyFee);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const grp = groups.find((g) => g.id === groupId);
    onSave({
      ...student,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      parentPhone: parentPhone.trim(),
      level,
      groupId,
      groupName: grp ? grp.name : student.groupName,
      monthlyFee
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600/10 text-indigo-700 flex items-center justify-center">
              <UserCheck className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Modifier la fiche élève</h2>
              <div className="text-xs text-slate-500">Mise à jour des coordonnées et affectation</div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Nom</label>
              <input
                type="text"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:border-indigo-600 bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Prénom</label>
              <input
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:border-indigo-600 bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="eleve@domaine.dz"
              className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:border-indigo-600 bg-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Téléphone Élève</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:border-indigo-600 bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Téléphone Parent</label>
              <input
                type="tel"
                value={parentPhone}
                onChange={(e) => setParentPhone(e.target.value)}
                className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:border-indigo-600 bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Niveau</label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:border-indigo-600 bg-white"
              >
                <option value="3AS">3AS (Terminale)</option>
                <option value="2AS">2AS (2ème Année)</option>
                <option value="1AS">1AS (1ère Année)</option>
                <option value="BEM">4AM (BEM)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Groupe</label>
              <select
                value={groupId}
                onChange={(e) => setGroupId(e.target.value)}
                className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:border-indigo-600 bg-white font-medium"
              >
                {groups.map((grp) => (
                  <option key={grp.id} value={grp.id}>
                    {grp.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Tarif Mensuel (DZD)
            </label>
            <input
              type="number"
              step="500"
              value={monthlyFee}
              onChange={(e) => setMonthlyFee(Number(e.target.value))}
              className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:border-indigo-600 bg-white font-bold"
            />
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
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-indigo-600/20 transition-colors"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Enregistrer les modifications</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
