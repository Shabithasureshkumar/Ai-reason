import { RefObject, useEffect, useRef } from 'react';

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'textarea:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

function getFocusable(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
    (el) => el.offsetParent !== null || el === document.activeElement,
  );
}

/**
 * Dialog behaviour shared by every modal:
 *  - moves focus into the dialog on open
 *  - traps Tab / Shift+Tab inside it
 *  - closes on Escape
 *  - locks background scrolling (compensating for the scrollbar width so the
 *    page behind does not shift sideways)
 *  - restores focus to the element that opened the dialog
 *
 * Returns the ref to attach to the dialog container.
 *
 * `restoreFocusTo` covers the case where the trigger is disabled while the
 * dialog is being prepared (the composer button is disabled during analysis,
 * so it has already lost focus by the time the results dialog opens). Pass the
 * element captured at the moment the user acted and focus returns there.
 */
export function useModalA11y(
  isOpen: boolean,
  onClose: () => void,
  restoreFocusTo?: RefObject<HTMLElement | null>,
): RefObject<HTMLDivElement> {
  const containerRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const restoreTargetRef = useRef(restoreFocusTo);
  restoreTargetRef.current = restoreFocusTo;

  // Held in a ref so an inline `onClose={() => ...}` prop does not re-run the
  // effect on every parent render, which would re-steal focus mid-interaction.
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;

    const container = containerRef.current;
    if (!container) return;

    previouslyFocused.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;

    const focusables = getFocusable(container);
    (focusables[0] ?? container).focus({ preventScroll: true });

    const body = document.body;
    const previousOverflow = body.style.overflow;
    const previousPaddingRight = body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        event.stopPropagation();
        onCloseRef.current();
        return;
      }

      if (event.key !== 'Tab') return;

      const items = getFocusable(container);
      if (items.length === 0) {
        event.preventDefault();
        container.focus({ preventScroll: true });
        return;
      }

      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement as HTMLElement | null;

      // Focus that escaped the dialog is pulled back to the correct edge.
      if (!active || !container.contains(active)) {
        event.preventDefault();
        (event.shiftKey ? last : first).focus();
        return;
      }

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown, true);

    return () => {
      document.removeEventListener('keydown', handleKeyDown, true);
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPaddingRight;

      // Prefer the explicitly supplied trigger, but only if it is still in the
      // document (a trigger inside another dialog may have unmounted).
      const explicit = restoreTargetRef.current?.current ?? null;
      const target = explicit?.isConnected ? explicit : previouslyFocused.current;
      target?.focus({ preventScroll: true });
      previouslyFocused.current = null;
    };
  }, [isOpen]);

  return containerRef;
}
