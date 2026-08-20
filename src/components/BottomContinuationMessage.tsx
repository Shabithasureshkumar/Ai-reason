import React from 'react';
import { ArrowRight } from 'lucide-react';

interface BottomContinuationMessageProps {
  onOpenPasteModal: () => void;
}

export const BottomContinuationMessage: React.FC<BottomContinuationMessageProps> = ({
  onOpenPasteModal,
}) => {
  return (
    <div className="w-full max-w-2xl mx-auto mt-6 mb-2 text-center relative z-10">
      <button
        type="button"
        onClick={onOpenPasteModal}
        className="inline-flex items-center justify-center gap-1.5 text-[#7C3AED] hover:text-[#5B21B6] font-semibold text-[8px] sm:text-sm transition-colors group cursor-pointer min-h-[44px] px-0 sm:px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
      >
        <span>Already spoke with another AI? Paste your conversation and we'll continue from there.</span>
        <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-[#7C3AED] group-hover:translate-x-1 transition-transform stroke-[2.5] shrink-0" aria-hidden="true" />
      </button>
    </div>
  );
};
