import { useEffect, useId, useRef, useState } from 'react';
import { LayoutGrid, Menu, X } from 'lucide-react';
import { navItems } from '../data/navigation';
import { NavItem } from '../types/navigation';

interface MobileNavMenuProps {
  activeTab: NavItem;
  onTabChange: (tab: NavItem) => void;
}

/**
 * Below `lg` the horizontal pill navigation cannot fit next to the utility
 * cluster, so it is replaced by this disclosure menu. Self-contained: the
 * trigger sits in the header bar and the panel is anchored to the header's
 * bottom edge (the parent <header> provides the positioning context).
 */
export function MobileNavMenu({ activeTab, onTabChange }: MobileNavMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const panelId = useId();

  const close = (restoreFocus: boolean) => {
    setIsOpen(false);
    if (restoreFocus) triggerRef.current?.focus();
  };

  // Escape closes and returns focus to the trigger; an outside click just closes.
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        close(true);
      }
    };

    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (panelRef.current?.contains(target) || triggerRef.current?.contains(target)) return;
      setIsOpen(false);
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handlePointerDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handlePointerDown);
    };
  }, [isOpen]);

  const handleSelect = (tab: NavItem) => {
    onTabChange(tab);
    close(true);
  };

  return (
    <div className="lg:hidden">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-controls={panelId}
        aria-label={isOpen ? 'Close main menu' : 'Open main menu'}
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F1F1F4] text-slate-800 transition-colors hover:bg-[#ECEAF8] focus:outline-none focus:ring-2 focus:ring-purple-400 cursor-pointer"
      >
        {isOpen ? (
          <X className="w-5 h-5 stroke-[2.2]" aria-hidden="true" />
        ) : (
          <Menu className="w-5 h-5 stroke-[2.2]" aria-hidden="true" />
        )}
      </button>

      {isOpen && (
        <div
          ref={panelRef}
          id={panelId}
          className="absolute left-0 right-0 top-full z-50 border-b border-slate-200/70 bg-white px-4 pb-4 pt-3 shadow-lg sm:px-6 animate-fadeIn"
        >
          <nav aria-label="Primary" className="flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelect(item.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`flex min-h-[44px] items-center gap-2.5 rounded-2xl px-4 text-sm font-semibold transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-[#7C3AED] to-[#6366F1] text-white shadow-md shadow-purple-600/30'
                      : 'text-slate-700 hover:bg-slate-50 hover:text-purple-700'
                  }`}
                >
                  {isActive && <LayoutGrid className="w-4 h-4 stroke-[2.2]" aria-hidden="true" />}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      )}
    </div>
  );
}
