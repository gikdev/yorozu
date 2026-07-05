import { useState } from 'react';
import { tv, cn } from 'tailwind-variants';
import { SpinnerGapIcon } from '@phosphor-icons/react';

const coverContainer = tv({
  base: 'relative overflow-hidden flex items-center justify-center',
});

const coverImage = tv({
  base: 'w-full h-full object-cover',
});

const coverPlaceholder = tv({
  base: 'w-full h-full flex items-center justify-center text-6xl font-bold bg-mist-700',
});

interface CoverImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  coverImageUrl: string | null | undefined;
  placeholderLetter: string;
  title: string;
  className?: string;
  showLoading?: boolean;
}

export function CoverImage({
  coverImageUrl,
  placeholderLetter,
  title,
  className = '',
  showLoading = true,
  alt,
  ...imgProps
}: CoverImageProps) {
  const [errored, setErrored] = useState(false);
  const [loading, setLoading] = useState(true);

  // Reset states when URL changes
  const key = coverImageUrl ?? '';

  // If URL is falsy or errored, show placeholder
  const showFallback = !coverImageUrl || errored;

  // Handle image load and error
  const handleLoad = () => setLoading(false);
  const handleError = () => {
    setErrored(true);
    setLoading(false);
  };

  // Merge default container classes with user’s className
  const containerClasses = cn(coverContainer(), className);

  return (
    <div className={containerClasses}>
      {!showFallback ? (
        <>
          {/* Image */}
          <img
            key={key} // forces re‑mount when URL changes
            src={coverImageUrl}
            alt={alt || title}
            className={coverImage()}
            onLoad={handleLoad}
            onError={handleError}
            {...imgProps}
          />
          {/* Loading spinner */}
          {showLoading && loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-mist-950/50">
              <SpinnerGapIcon size={32} className="animate-spin text-mist-100" />
            </div>
          )}
        </>
      ) : (
        // Placeholder
        <div className={coverPlaceholder()}>
          {placeholderLetter?.charAt(0) || '?'}
        </div>
      )}
    </div>
  );
}
