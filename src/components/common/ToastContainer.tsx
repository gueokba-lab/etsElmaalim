import React from 'react';
import { ToastMessage } from '../../state/useCenterStore';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

interface ToastContainerProps {
  toasts: ToastMessage[];
  onRemove: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onRemove }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-11/12 max-w-sm flex flex-col gap-2 pointer-events-none">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isWarning = toast.type === 'warning';
        const isError = toast.type === 'error';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-xl shadow-lg border backdrop-blur-md transition-all duration-200 animate-in fade-in slide-in-from-top-3 ${
              isSuccess
                ? 'bg-slate-900/95 border-emerald-500/40 text-white'
                : isWarning
                ? 'bg-slate-900/95 border-amber-500/40 text-white'
                : isError
                ? 'bg-slate-900/95 border-rose-500/40 text-white'
                : 'bg-slate-900/95 border-blue-500/40 text-white'
            }`}
          >
            <div className="mt-0.5 shrink-0">
              {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
              {isWarning && <AlertCircle className="w-5 h-5 text-amber-400" />}
              {isError && <AlertCircle className="w-5 h-5 text-rose-400" />}
              {!isSuccess && !isWarning && !isError && <Info className="w-5 h-5 text-blue-400" />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-semibold">{toast.title}</div>
              {toast.description && (
                <div className="text-[11px] text-slate-300 mt-0.5 leading-snug line-clamp-2">
                  {toast.description}
                </div>
              )}
            </div>
            <button
              onClick={() => onRemove(toast.id)}
              className="p-1 -mr-1 text-slate-400 hover:text-white"
              aria-label="Fermer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
