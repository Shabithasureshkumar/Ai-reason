import React, { useId } from 'react';
import { X, Sparkles, Activity, ArrowRight } from 'lucide-react';
import { VitalItem } from '../types/health';
import { useModalA11y } from '../hooks/useModalA11y';

interface VitalDetailModalProps {
  vital: VitalItem | null;
  onClose: () => void;
  onAskAva: (context: string) => void;
}

export const VitalDetailModal: React.FC<VitalDetailModalProps> = ({ vital, onClose, onAskAva }) => {
  const dialogRef = useModalA11y(vital !== null, onClose);
  const titleId = useId();

  if (!vital) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-brand-100 space-y-6 relative focus:outline-none"
      >

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close vital details"
          className="absolute top-4 right-4 w-11 h-11 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-400 cursor-pointer"
        >
          <X className="w-5 h-5" aria-hidden="true" />
        </button>

        {/* Header Title */}
        <div className="flex items-center space-x-3 pr-12">
          <div className="w-12 h-12 shrink-0 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center border border-brand-200">
            <Activity className="w-6 h-6" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 id={titleId} className="text-xl font-bold text-slate-900">{vital.name}</h3>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 uppercase">
                {vital.status}
              </span>
            </div>
            <span className="text-xs text-slate-400 font-medium">Last updated {vital.lastUpdated}</span>
          </div>
        </div>

        {/* Big Reading Card */}
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/60 flex items-baseline justify-between gap-3 flex-wrap">
          <div>
            <span className="text-4xl font-extrabold text-slate-900 tracking-tight">{vital.value}</span>
            <span className="text-sm font-semibold text-slate-500 ml-1.5">{vital.unit}</span>
          </div>
          <div className="text-right">
            <span className="text-xs font-bold text-slate-700 block">Target Range</span>
            <span className="text-xs font-medium text-brand-700 bg-brand-100/70 px-2 py-0.5 rounded-md">
              {vital.targetRange || 'Standard Normal'}
            </span>
          </div>
        </div>

        {/* Trend Graph Visual */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-800">
            <span>7-Day Trend Graph</span>
            <span className="text-emerald-600 font-semibold">{vital.trend}</span>
          </div>
          <div className="p-4 rounded-2xl bg-brand-50/40 border border-brand-100 h-28 flex items-center justify-center">
            <svg viewBox="0 0 200 60" className="w-full h-full stroke-brand-600 fill-none" strokeWidth="3" aria-hidden="true">
              <path d="M 10 40 Q 40 10, 80 35 T 150 20 T 190 25" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* Historical AI Context */}
        <div className="p-4 rounded-2xl bg-brand-50/60 border border-brand-200/70 text-xs sm:text-sm text-slate-700 space-y-1">
          <span className="font-bold text-brand-900 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-brand-600" aria-hidden="true" />
            Ava Clinical Insights:
          </span>
          <p className="leading-relaxed text-slate-600">
            {vital.historicalContext || `${vital.name} is stable with normal daily biological variance.`}
          </p>
        </div>

        {/* Action Button */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={() => {
              onClose();
              onAskAva(`Tell me more about my ${vital.name} reading of ${vital.value} ${vital.unit}`);
            }}
            className="w-full py-2.5 min-h-[44px] rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs sm:text-sm transition-colors flex items-center justify-center space-x-2 shadow-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-400 focus:ring-offset-2"
          >
            <Sparkles className="w-4 h-4" aria-hidden="true" />
            <span>Ask Ava about {vital.name}</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

      </div>
    </div>
  );
};
