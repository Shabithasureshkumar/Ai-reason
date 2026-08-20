import React, { useId, useRef } from 'react';
import { Lock, ArrowRight, Sparkles } from 'lucide-react';
import { Avatar } from './ui/Avatar';

interface AIInputComposerProps {
  message: string;
  onChangeMessage: (value: string) => void;
  onSubmit: () => void;
  isAnalyzing?: boolean;
}

export const doctorAvatars = [
  {
    name: "Dr. Marcus Vance",
    role: "Cardiologist",
    url: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80"
  },
  {
    name: "Dr. Elena Rostova",
    role: "Neurologist",
    url: "https://images.unsplash.com/photo-1594824813566-7885a3964670?w=150&auto=format&fit=crop&q=80"
  },
  {
    name: "Dr. Sarah Chen",
    role: "Endocrinologist",
    url: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80"
  },
  {
    name: "Dr. Amara Osei",
    role: "Internal Medicine",
    url: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=150&auto=format&fit=crop&q=80"
  }
];

export const AIInputComposer: React.FC<AIInputComposerProps> = ({
  message,
  onChangeMessage,
  onSubmit,
  isAnalyzing = false,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fieldId = useId();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (message.trim()) {
        onSubmit();
      }
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-6 relative z-10">
      {/* MAIN CONTAINER FRAME WITH LIGHT BACKGROUND & ROUNDED CORNERS */}
      <div className="bg-[#F7F6FC]/90 rounded-[28px] pt-2 px-0 pb-0 sm:p-3 border-0 sm:border border-purple-100/60 shadow-xl shadow-purple-950/5 overflow-hidden">

        {/* TOP BAR: SPECIALIST AVAILABILITY */}
        <div className="px-3 py-2 flex items-start md:items-center md:justify-between gap-2 mb-1.5">

          {/* Left: Doctor Avatars + 37 SPECIALISTS AVAILABLE */}
          <div className="flex items-center gap-3 min-w-0">
            {/* Overlapping Doctor Avatars. Decorative - the count beside them
                already carries the meaning for assistive tech. */}
            <div className="flex items-center -space-x-2">
              {doctorAvatars.map((doc) => (
                <Avatar
                  key={doc.name}
                  src={doc.url}
                  name={doc.name}
                  title={`${doc.name} - ${doc.role}`}
                  size={32}
                  decorative
                  loading="eager"
                  className="border-2 border-white shadow-xs"
                />
              ))}
            </div>

            {/* Availability Text + (mobile) wait time stacked beneath it */}
            <div className="min-w-0">
              <span className="block text-[11px] sm:text-xs font-extrabold text-[#10B981] tracking-wider uppercase">
                37 SPECIALISTS AVAILABLE
              </span>
              <div className="md:hidden mt-1 text-xs font-medium text-slate-500">
                As soon as <span className="font-bold text-slate-800">15 min</span>
              </div>
            </div>
          </div>

          {/* Right: Wait Time Indicator (desktop composition) */}
          <div className="hidden md:block text-xs font-medium text-slate-500 shrink-0">
            As soon as <span className="font-bold text-slate-800">15 min</span>
          </div>

        </div>

        {/* WHITE AI INPUT BOX WITH PURPLE BORDER */}
        <div className="bg-white rounded-[24px] border-2 border-[#C4B5FD] p-3.5 sm:p-6 shadow-sm relative flex flex-col justify-between min-h-[170px] sm:min-h-[200px] transition-all focus-within:border-[#A78BFA] focus-within:ring-2 focus-within:ring-purple-200/50">

          {/* Text Area Input */}
          <label htmlFor={fieldId} className="sr-only">
            Describe your symptoms or what you need help with
          </label>
          <textarea
            id={fieldId}
            ref={textareaRef}
            value={message}
            onChange={(e) => onChangeMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="What would you like help with today?"
            className="w-full bg-transparent resize-none focus:outline-none text-slate-800 text-base sm:text-lg placeholder:text-slate-400 placeholder:font-normal font-medium leading-relaxed min-h-[100px] sm:min-h-[120px]"
          />

          {/* BOTTOM BAR INSIDE COMPOSER */}
          <div className="flex items-center justify-between gap-2 sm:gap-3 pt-2 border-t border-slate-100">

            {/* Bottom Left: HIPAA Privacy Label */}
            <div className="flex items-center gap-1 sm:gap-1.5 text-slate-400 min-w-0">
              <Lock className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 shrink-0 stroke-[2.2] text-slate-400" aria-hidden="true" />
              <span className="text-[7.5px] sm:text-[11px] font-bold tracking-normal sm:tracking-wider text-slate-400 uppercase leading-tight whitespace-nowrap">
                HIPAA COMPLIANT | PRIVATE &amp; SECURE
              </span>
            </div>

            {/* Bottom Right: Start AI Analysis Button */}
            <button
              type="button"
              onClick={onSubmit}
              disabled={isAnalyzing || !message.trim()}
              className="bg-gradient-to-r from-[#6D28D9] via-[#7C3AED] to-[#6366F1] hover:from-[#5B21B6] hover:to-[#4F46E5] text-white font-bold text-[10px] md:text-sm px-[14px] md:px-6 py-0 md:py-2.5 h-[34px] md:h-auto md:min-h-0 rounded-full flex items-center justify-center gap-1.5 md:gap-2.5 shrink-0 relative after:absolute after:content-[''] after:inset-x-0 after:-inset-y-[5px] md:after:hidden shadow-md shadow-purple-600/25 hover:shadow-lg hover:shadow-purple-600/35 transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2"
            >
              {isAnalyzing ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin text-white" aria-hidden="true" />
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <span>Start AI Analysis</span>
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 stroke-[2.5]" aria-hidden="true" />
                </>
              )}
            </button>

          </div>

        </div>

      </div>

      {/* Progress announcement for assistive tech */}
      <div role="status" aria-live="polite" className="sr-only">
        {isAnalyzing ? 'Analyzing your description and matching specialists.' : ''}
      </div>
    </div>
  );
};
