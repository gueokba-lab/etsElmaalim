import React, { useState } from 'react';
import { DocumentItem } from '../../types';
import { X, Download, FileText, Check, Share2, Eye } from 'lucide-react';

interface DocumentViewerModalProps {
  document: DocumentItem;
  onClose: () => void;
  onTriggerToast: (toast: { type: 'success' | 'info'; title: string; description?: string }) => void;
}

export const DocumentViewerModal: React.FC<DocumentViewerModalProps> = ({
  document,
  onClose,
  onTriggerToast
}) => {
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      setDownloaded(true);
      onTriggerToast({
        type: 'success',
        title: 'Téléchargement terminé !',
        description: `${document.title} enregistré sur votre appareil (${document.fileSize}).`
      });
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div
        className="w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-2xl max-h-[92vh] flex flex-col shadow-2xl animate-in slide-in-from-bottom duration-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-10 h-1.5 bg-slate-300 rounded-full mx-auto my-2.5 sm:hidden" />

        {/* Header */}
        <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-blue-600/10 text-blue-700 flex items-center justify-center shrink-0">
              <FileText className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="text-xs text-slate-500 font-medium">Aperçu du document</div>
              <h2 className="text-sm font-bold text-slate-900 truncate">{document.title}</h2>
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

        {/* Content body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {/* Metadata badges */}
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-medium">
              📁 {document.groupName}
            </span>
            <span className="px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 font-medium">
              📚 {document.subject}
            </span>
            <span className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 font-medium">
              💾 {document.fileSize}
            </span>
            <span className="px-2.5 py-1 rounded-md bg-purple-50 text-purple-700 font-medium">
              ✍️ {document.authorName}
            </span>
          </div>

          {/* Realistic Document Preview Canvas */}
          <div className="border border-slate-200 rounded-2xl p-5 bg-slate-50/50 shadow-inner space-y-3 font-serif">
            <div className="border-b border-slate-200 pb-3 flex justify-between items-start">
              <div>
                <div className="text-[11px] font-sans text-slate-500 uppercase tracking-widest font-semibold">
                  CENTRE PRO · SUPPORT OFFICIEL
                </div>
                <div className="text-sm font-bold text-slate-900 font-sans mt-0.5">
                  {document.title}
                </div>
              </div>
              <span className="text-[10px] font-sans px-2 py-0.5 rounded bg-slate-200 text-slate-700">
                {document.type}
              </span>
            </div>

            <div className="text-xs text-slate-700 leading-relaxed font-sans">
              {document.description}
            </div>

            {/* Mock document excerpt */}
            <div className="p-3.5 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs space-y-2 font-mono">
              <div className="text-[11px] text-blue-700 font-sans font-semibold">
                Extrait du sommaire & méthodologie :
              </div>
              <ul className="text-[11px] space-y-1 list-disc list-inside text-slate-600 font-sans">
                <li>I. Rappels fondamentaux et définitions rigoureuses</li>
                <li>II. Théorèmes clés et démonstrations requises au BAC</li>
                <li>III. Études de cas pratiques & méthodologie de rédaction</li>
                <li>IV. Fiche d'auto-évaluation et barème prévisionnel</li>
              </ul>
            </div>

            <div className="text-[10px] text-slate-400 text-right font-sans">
              Déposé le {document.date} · Certifié conforme au programme officiel
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-slate-200 bg-white flex items-center gap-3">
          <button
            type="button"
            onClick={handleDownload}
            disabled={downloading}
            className={`flex-1 min-h-[46px] rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-lg transition-all ${
              downloaded
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-900 hover:bg-slate-800 text-white shadow-slate-900/10'
            }`}
          >
            {downloading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Téléchargement en cours...</span>
              </>
            ) : downloaded ? (
              <>
                <Check className="w-4 h-4" />
                <span>Fichier téléchargé ({document.fileSize})</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Télécharger le document ({document.fileSize})</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
