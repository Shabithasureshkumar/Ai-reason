import React from 'react';
import {
  Activity,
  Calendar,
  UserCheck,
  FileText,
  Pill,
  HeartHandshake
} from 'lucide-react';

export interface QuickActionItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  prompt: string;
}

interface QuickActionChipsProps {
  onSelectAction: (prompt: string) => void;
}

export const quickActionsData: QuickActionItem[] = [
  {
    id: 'check-symptoms',
    label: 'CHECK SYMPTOMS',
    icon: <Activity className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 shrink-0 text-slate-700 stroke-[2.2]" aria-hidden="true" />,
    prompt: 'I would like help checking my symptoms.',
  },
  {
    id: 'book-appointment',
    label: 'BOOK APPOINTMENT',
    icon: <Calendar className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 shrink-0 text-slate-700 stroke-[2.2]" aria-hidden="true" />,
    prompt: 'I would like to book an appointment with a specialist.',
  },
  {
    id: 'find-specialist',
    label: 'FIND SPECIALIST',
    icon: <UserCheck className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 shrink-0 text-slate-700 stroke-[2.2]" aria-hidden="true" />,
    prompt: 'Help me find the right specialist for my health concern.',
  },
  {
    id: 'review-labs',
    label: 'REVIEW LAB RESULTS',
    icon: <FileText className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 shrink-0 text-slate-700 stroke-[2.2]" aria-hidden="true" />,
    prompt: 'I would like to review my recent lab results.',
  },
  {
    id: 'medication-review',
    label: 'MEDICATION REVIEW',
    icon: <Pill className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 shrink-0 text-slate-700 stroke-[2.2]" aria-hidden="true" />,
    prompt: 'I would like to review my active medications and dosages.',
  },
  {
    id: 'mental-health',
    label: 'MENTAL HEALTH SUPPORT',
    icon: <HeartHandshake className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 shrink-0 text-slate-700 stroke-[2.2]" aria-hidden="true" />,
    prompt: 'I need mental health support and guidance.',
  },
];

export const QuickActionChips: React.FC<QuickActionChipsProps> = ({ onSelectAction }) => {
  return (
    /**
     * A single wrapping row. The previous hard-coded 4 + 2 split forced the
     * first four chips onto one flex line, which overflowed between 640px and
     * ~800px and dropped a single orphan chip onto its own line. Natural
     * wrapping still resolves to 4 + 2 at desktop widths.
     */
    <div className="w-full max-w-3xl mx-auto mt-4 sm:mt-5 relative z-10 grid grid-cols-3 gap-x-[6px] gap-y-[10px] md:flex md:flex-wrap md:items-center md:justify-center md:gap-2.5">
      {quickActionsData.map((action) => (
        <button
          key={action.id}
          type="button"
          onClick={() => onSelectAction(action.prompt)}
          className="bg-white hover:bg-purple-50/80 border border-slate-200/80 hover:border-purple-300 text-slate-700 hover:text-purple-800 font-bold text-[8.5px] leading-none tracking-[-0.01em] md:text-[11px] md:tracking-wider uppercase px-1 md:px-4 py-0 md:py-2 min-h-[31px] md:min-h-0 md:h-auto rounded-lg md:rounded-xl shadow-xs transition-all duration-200 flex items-center justify-center md:justify-start gap-[3px] md:gap-2 min-[400px]:whitespace-nowrap md:whitespace-normal cursor-pointer active:scale-95 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 relative after:absolute after:content-[''] after:inset-x-0 after:-inset-y-[5px] md:after:hidden"
        >
          {action.icon}
          <span>{action.label}</span>
        </button>
      ))}
    </div>
  );
};
