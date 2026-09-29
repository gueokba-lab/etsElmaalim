import React, { useState } from 'react';
import { Student } from '../../types';
import { X, Banknote, CheckCircle, Receipt, ArrowRight } from 'lucide-react';

interface AddPaymentModalProps {
  students: Student[];
  onClose: () => void;
  onAddPayment: (paymentData: {
    studentId: string;
    amount: number;
    method: 'Espèces' | 'Virement CCP' | 'BaridiMob';
    plan: string;
  }) => void;
  preselectedStudentId?: string;
}

export const AddPaymentModal: React.FC<AddPaymentModalProps> = ({
  students,
  onClose,
  onAddPayment,
  preselectedStudentId
}) => {
  const [selectedStudentId, setSelectedStudentId] = useState(
    preselectedStudentId || students[0]?.id || ''
  );
  const selectedStudent = students.find((s) => s.id === selectedStudentId);

  const [amount, setAmount] = useState<number>(() => {
    return selectedStudent?.remainingAmount && selectedStudent.remainingAmount > 0
      ? selectedStudent.remainingAmount
      : selectedStudent?.monthlyFee || 6000;
  });

  const [method, setMethod] = useState<'Espèces' | 'Virement CCP' | 'BaridiMob'>('Espèces');
  const [plan, setPlan] = useState('Abonnement Mensuel Normalisé');

  const handleStudentChange = (id: string) => {
    setSelectedStudentId(id);
    const st = students.find((s) => s.id === id);
    if (st) {
      setAmount(st.remainingAmount > 0 ? st.remainingAmount : st.monthlyFee);
      setPlan(`Abonnement ${st.level} - ${st.groupName}`);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudent || amount <= 0) return;

    onAddPayment({
      studentId: selectedStudent.id,
      amount,
      method,
      plan: plan || `Abonnement ${selectedStudent.level}`
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
              <Banknote className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Encaisser un paiement</h2>
              <div className="text-[11px] text-slate-500">Émission instantanée de reçu DZD</div>
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

        {/* Body Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Sélectionner l'étudiant
            </label>
            <select
              value={selectedStudentId}
              onChange={(e) => handleStudentChange(e.target.value)}
              className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:border-emerald-600 bg-white font-medium"
            >
              {students.map((st) => (
                <option key={st.id} value={st.id}>
                  {st.lastName.toUpperCase()} {st.firstName} ({st.groupName} — Reste: {st.remainingAmount.toLocaleString()} DZD)
                </option>
              ))}
            </select>
          </div>

          {selectedStudent && (
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-semibold text-slate-800">Situation financière</span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    selectedStudent.remainingAmount === 0
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {selectedStudent.remainingAmount === 0 ? 'À jour' : 'Reste à payer'}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center pt-1 border-t border-slate-200/70 text-slate-600 text-xs">
                <div>
                  <div className="text-[10px] text-slate-400">Total Mois</div>
                  <div className="font-bold text-slate-900 mt-0.5">
                    {selectedStudent.monthlyFee.toLocaleString()} DZD
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400">Déjà réglé</div>
                  <div className="font-bold text-emerald-600 mt-0.5">
                    {selectedStudent.paidAmount.toLocaleString()} DZD
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400">Solde restant</div>
                  <div className="font-bold text-rose-600 mt-0.5">
                    {selectedStudent.remainingAmount.toLocaleString()} DZD
                  </div>
                </div>
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Libellé de l'Abonnement
            </label>
            <input
              type="text"
              value={plan}
              onChange={(e) => setPlan(e.target.value)}
              placeholder="Ex: Pack BAC Réussite (Maths + Physique)"
              className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:border-emerald-600 bg-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Montant encaissé (DZD) <span className="text-rose-500">*</span>
              </label>
              <input
                type="number"
                step="500"
                min="500"
                required
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full text-sm font-bold text-slate-900 px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:border-emerald-600 bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Mode de règlement
              </label>
              <select
                value={method}
                onChange={(e) => setMethod(e.target.value as any)}
                className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:border-emerald-600 bg-white font-medium"
              >
                <option value="Espèces">💵 Espèces</option>
                <option value="BaridiMob">📱 BaridiMob</option>
                <option value="Virement CCP">🏛️ Virement CCP</option>
              </select>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-100 flex items-start gap-2.5 text-xs text-emerald-900">
            <Receipt className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <div className="text-[11px] leading-relaxed">
              Un reçu numérique certifié sera instantanément émis avec numéro unique et consultable dans l'espace élève et admin.
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full min-h-[46px] rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-slate-900/10 transition-colors"
            >
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>Valider le reçu & Encaisser {amount.toLocaleString()} DZD</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
