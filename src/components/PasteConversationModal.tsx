import React, { useEffect, useId, useState } from 'react';
import { X, Sparkles, Clipboard, ArrowRight } from 'lucide-react';
import { useModalA11y } from '../hooks/useModalA11y';

interface PasteConversationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImportConversation: (pastedText: string) => void;
}

export const PasteConversationModal: React.FC<PasteConversationModalProps> = ({
  isOpen,
  onClose,
  onImportConversation,
}) => {
  const [pastedText, setPastedText] = useState('');
  const dialogRef = useModalA11y(isOpen, onClose);
  const titleId = useId();
  const fieldId = useId();

  // The component stays mounted while closed, so clear the draft on close
  // instead of showing the previous transcript when it is reopened.
  useEffect(() => {
    if (!isOpen) setPastedText('');
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pastedText.trim()) {
      onImportConversation(pastedText);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fadeIn">
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className="bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-purple-100 overflow-hidden relative transform transition-all focus:outline-none"
      >

        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-purple-50 via-violet-50 to-white border-b border-purple-100 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 shrink-0 rounded-full bg-purple-600 text-white flex items-center justify-center">
              <Sparkles className="w-4 h-4" aria-hidden="true" />
            </div>
            <div>
              <h3 id={titleId} className="text-base font-bold text-slate-900">Import AI Transcript</h3>
              <p className="text-xs text-slate-500">Paste context from ChatGPT, Claude, Gemini, or Ava</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close import dialog"
            className="w-11 h-11 md:w-8 md:h-8 shrink-0 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-400 cursor-pointer"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        {/* Content Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-2">
            <label htmlFor={fieldId} className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              Previous Chat Log or Symptom Notes
            </label>
            <textarea
              id={fieldId}
              value={pastedText}
              onChange={(e) => setPastedText(e.target.value)}
              placeholder="Paste your past AI conversation here... (e.g. 'I discussed persistent headaches with my previous doctor...')"
              className="w-full h-44 p-4 border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-800 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:outline-none resize-none leading-relaxed placeholder:text-slate-400"
            />
          </div>

          <div className="flex items-center justify-between gap-3 flex-wrap pt-2">
            <button
              type="button"
              onClick={async () => {
                try {
                  const text = await navigator.clipboard.readText();
                  if (text) setPastedText(text);
                } catch {
                  // Clipboard permission denied or unavailable: the user can
                  // still paste manually, so fail silently.
                }
              }}
              className="text-xs font-semibold text-purple-700 hover:text-purple-900 flex items-center gap-1.5 px-3 min-h-[44px] md:min-h-0 md:py-1.5 rounded-lg bg-purple-50 border border-purple-200/80 cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              <Clipboard className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Paste from Clipboard</span>
            </button>

            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 min-h-[44px] md:min-h-0 md:py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!pastedText.trim()}
                className="px-5 min-h-[44px] md:min-h-0 md:py-2 text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl flex items-center gap-1.5 shadow-md shadow-purple-500/20 cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2"
              >
                <span>Continue Analysis</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </form>

      </div>
    </div>
  );
};
