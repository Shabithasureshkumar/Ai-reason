import { useEffect, useState } from 'react';

interface AvatarProps {
  src: string;
  /** Accessible name and source of the initials fallback. */
  name: string;
  /** Rendered size in CSS pixels. Also set as intrinsic width/height. */
  size: number;
  className?: string;
  title?: string;
  loading?: 'eager' | 'lazy';
  /** True when an adjacent label already names the person. */
  decorative?: boolean;
}

function initialsFrom(name: string): string {
  return name
    .replace(/^(Dr|Mr|Mrs|Ms|Mx)\.?\s+/i, '')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

/**
 * The doctor portraits are remote third-party placeholders and one of them
 * (Dr. Elena Rostova) currently 404s, which rendered a broken-image icon.
 * This keeps the exact same circular box but swaps in an initials chip when
 * the request fails, so the layout never breaks and never reflows.
 */
export function Avatar({
  src,
  name,
  size,
  className = '',
  title,
  loading = 'lazy',
  decorative = false,
}: AvatarProps) {
  const [hasFailed, setHasFailed] = useState(false);

  // A changed src is a fresh attempt.
  useEffect(() => {
    setHasFailed(false);
  }, [src]);

  const boxStyle = { width: size, height: size };

  if (hasFailed) {
    return (
      <span
        role={decorative ? undefined : 'img'}
        aria-label={decorative ? undefined : name}
        aria-hidden={decorative || undefined}
        title={title ?? name}
        style={boxStyle}
        className={`inline-flex shrink-0 items-center justify-center rounded-full bg-brand-100 font-bold uppercase leading-none text-brand-700 ${className}`}
      >
        <span style={{ fontSize: Math.max(10, Math.round(size * 0.36)) }}>
          {initialsFrom(name)}
        </span>
      </span>
    );
  }

  return (
    <img
      src={src}
      alt={decorative ? '' : name}
      aria-hidden={decorative || undefined}
      title={title}
      width={size}
      height={size}
      style={boxStyle}
      loading={loading}
      decoding="async"
      referrerPolicy="no-referrer"
      onError={() => setHasFailed(true)}
      className={`shrink-0 rounded-full object-cover ${className}`}
    />
  );
}
