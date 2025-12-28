"use client";

import React, { useState } from 'react';
import { ImageOff } from 'lucide-react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallback?: React.ReactNode;
}

export function SafeImage({ src, alt, className, fallback, ...props }: SafeImageProps) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  if (error || !src) {
    return (
      <div className={`flex items-center justify-center bg-zinc-900 ${className}`}>
        {fallback || <ImageOff className="h-10 w-10 text-zinc-700" />}
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {loading && (
        <div className="absolute inset-0 bg-zinc-900 animate-pulse" />
      )}
      <img
        {...props}
        src={src}
        alt={alt}
        className={`${props.className || ''} ${loading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}
        onLoad={() => setLoading(false)}
        onError={() => {
          setError(true);
          setLoading(false);
        }}
      />
    </div>
  );
}
