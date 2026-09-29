import React, { useState } from 'react';
import { Group, Student } from '../../types';
import { X, UserPlus, Phone, BookOpen, Layers } from 'lucide-react';

interface AddStudentModalProps {
  groups: Group[];
  onClose: () => void;
  onAdd: (studentData: Omit<Student, 'id' | 'enrollmentDate' | 'attendanceRate' | 'avatarColor'>) => void;
}

export const AddStudentModal: React.FC<AddStudentModalProps> = ({ groups, onClose, onAdd }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('055');
  const [parentPhone, setParentPhone] = useState('066');
  const [level, setLevel] = useState('3AS');
  const [groupId, setGroupId] = useState(groups[0]?.id || '');
  const [monthlyFee, setMonthlyFee] = useState<number>(6000);
  const [paidAmount, setPaidAmount] = useState<number>(6000);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim()) return;

    const selectedGroup = groups.find((g) => g.id === groupId);
    const groupName = selectedGroup ? selectedGroup.name : 'Groupe Général';
    const remainingAmount = Math.max(0, monthlyFee - paidAmount);
    const subscriptionStatus: Student['subscriptionStatus'] =
      remainingAmount === 0 ? 'active' : paidAmount > 0 ? 'pending' : 'unpaid';

    onAdd({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      phone,
      parentPhone,
      level,
      groupId,
      groupName,
      monthlyFee,
      paidAmount,
      remainingAmount,
      subscriptionStatus
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div
        className="w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-2xl max-h-[92vh] flex flex-col shadow-2xl animate-in slide-in-from-bottom duration-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-10 h-1.5 bg-slate-300 rounded-full mx-auto my-2.5 sm:hidden" />

        {/* Modal Header */}
        <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-600/10 text-emerald-700 flex items-center justify-center">
              <UserPlus className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Inscrire un étudiant</h2>
              <div className="text-[11px] text-slate-500">Ajout immédiat au registre et au groupe</div>
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

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Nom <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Ex: Benali"
                className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:border-indigo-600 bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Prénom <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Ex: Sara"
                className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:border-indigo-600 bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Téléphone Élève
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="0550 00 00 00"
                className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:border-indigo-600 bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Téléphone Parent
              </label>
              <input
                type="tel"
                value={parentPhone}
                onChange={(e) => setParentPhone(e.target.value)}
                placeholder="0661 00 00 00"
                className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:border-indigo-600 bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Niveau Scolaire
              </label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:border-indigo-600 bg-white"
              >
                <option value="3AS">3AS (Terminale BAC)</option>
                <option value="2AS">2AS (2ème Année)</option>
                <option value="1AS">1AS (1ère Année)</option>
                <option value="BEM">4AM (Brevet BEM)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Groupe Assigné
              </label>
              <select
                value={groupId}
                onChange={(e) => setGroupId(e.target.value)}
                className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:border-indigo-600 bg-white font-medium"
              >
                {groups.map((grp) => (
                  <option key={grp.id} value={grp.id}>
                    {grp.name} ({grp.studentCount}/{grp.maxCapacity})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Pricing & initial payment */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
            <div className="text-xs font-bold text-slate-800 flex items-center justify-between">
              <span>Tarif & Paiement d'inscription</span>
              <span className="text-[10px] text-slate-500 font-normal">Devise : DZD</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-medium text-slate-600 mb-1">
                  Montant Abonnement (DZD)
                </label>
                <input
                  type="number"
                  step="500"
                  value={monthlyFee}
                  onChange={(e) => setMonthlyFee(Number(e.target.value))}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 bg-white font-semibold"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-slate-600 mb-1">
                  Versement initial (DZD)
                </label>
                <input
                  type="number"
                  step="500"
                  value={paidAmount}
                  onChange={(e) => setPaidAmount(Number(e.target.value))}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 bg-white font-semibold text-emerald-700"
                />
              </div>
            </div>

            <div className="text-[11px] flex items-center justify-between pt-1 border-t border-slate-200 text-slate-600">
              <span>Solde restant :</span>
              <span className="font-bold text-slate-900">
                {Math.max(0, monthlyFee - paidAmount).toLocaleString()} DZD
              </span>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full min-h-[46px] rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-slate-900/10 transition-colors"
            >
              <UserPlus className="w-4 h-4" />
              <span>Valider l'inscription</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
