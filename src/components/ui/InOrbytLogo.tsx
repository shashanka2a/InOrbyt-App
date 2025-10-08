import React from 'react';

interface InOrbytLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function InOrbytLogo({ className = '', size = 'md' }: InOrbytLogoProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8', 
    lg: 'w-12 h-12'
  };

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <svg
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* InOrbyt Logo Design */}
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ea532a" />
            <stop offset="100%" stopColor="#ff6b35" />
          </linearGradient>
        </defs>
        
        {/* Background Circle */}
        <circle cx="16" cy="16" r="15" fill="url(#logoGradient)" />
        
        {/* "IO" Text */}
        <text
          x="16"
          y="20"
          textAnchor="middle"
          fill="white"
          fontSize="12"
          fontWeight="700"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          IO
        </text>
      </svg>
    </div>
  );
}
