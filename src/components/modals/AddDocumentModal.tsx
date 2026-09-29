import React, { useState } from 'react';
import { Group, DocumentItem } from '../../types';
import { X, Upload, FileText, FileCheck } from 'lucide-react';

interface AddDocumentModalProps {
  groups: Group[];
  authorName: string;
  defaultSubject?: string;
  onClose: () => void;
  onAddDocument: (docData: {
    title: string;
    type: DocumentItem['type'];
    groupId: string;
    subject: string;
    authorName: string;
    description?: string;
  }) => void;
}

export const AddDocumentModal: React.FC<AddDocumentModalProps> = ({
  groups,
  authorName,
  defaultSubject = 'Mathématiques',
  onClose,
  onAddDocument
}) => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState<DocumentItem['type']>('PDF');
  const [groupId, setGroupId] = useState(groups[0]?.id || '');
  const [subject, setSubject] = useState(defaultSubject);
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAddDocument({
      title: title.trim().endsWith(`.${type.toLowerCase()}`) ? title.trim() : `${title.trim()}.${type === 'PowerPoint' ? 'pptx' : type === 'Word' ? 'docx' : 'pdf'}`,
      type,
      groupId,
      subject,
      authorName,
      description
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
            <div className="w-8 h-8 rounded-lg bg-blue-600/10 text-blue-700 flex items-center justify-center">
              <Upload className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Déposer un document</h2>
              <div className="text-[11px] text-slate-500">Mise à disposition immédiate pour les apprenants</div>
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
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Titre du document ou du cours <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Série d'exercices N°3 — Géométrie dans l'espace"
              className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:border-blue-600 bg-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Type de ressource
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:border-blue-600 bg-white"
              >
                <option value="PDF">📄 Fichier PDF</option>
                <option value="Exercices">📝 Exercices & Séries</option>
                <option value="Tests">🎯 Test / Devoir type</option>
                <option value="Word">📑 Document Word (.docx)</option>
                <option value="PowerPoint">📊 Présentation PPTX</option>
                <option value="Image">🖼️ Image / Schéma</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Matière
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Mathématiques"
                className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:border-blue-600 bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Groupe destinataire
            </label>
            <select
              value={groupId}
              onChange={(e) => setGroupId(e.target.value)}
              className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:border-blue-600 bg-white font-medium"
            >
              {groups.map((grp) => (
                <option key={grp.id} value={grp.id}>
                  {grp.name} ({grp.level})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Consignes ou description
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ex: À préparer impérativement pour la séance du vendredi. Contient 8 exercices corrigés."
              className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:outline-hidden focus:border-blue-600 bg-white resize-none"
            />
          </div>

          {/* Realistic upload drop simulator */}
          <div className="p-4 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 flex flex-col items-center justify-center text-center">
            <FileCheck className="w-6 h-6 text-blue-500 mb-1" />
            <div className="text-xs font-semibold text-slate-800">Fichier prêt à être lié</div>
            <div className="text-[10px] text-slate-500">Taille estimée : 2.4 Mo · Stockage sécurisé</div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full min-h-[46px] rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-slate-900/10 transition-colors"
            >
              <Upload className="w-4 h-4" />
              <span>Publier le document</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
