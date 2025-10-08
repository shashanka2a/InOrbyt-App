import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'white' | 'dark';
  showText?: boolean;
}

export function Logo({ 
  className = '', 
  size = 'md', 
  variant = 'default',
  showText = true 
}: LogoProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8', 
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-xl', 
    xl: 'text-2xl'
  };

  const textColorClasses = {
    default: 'text-[#0a0e1a]',
    white: 'text-[#f9f4e1]',
    dark: 'text-[#0a0e1a]'
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <img 
        src="/logo.svg" 
        alt="InOrbyt Logo" 
        className={`${sizeClasses[size]} flex-shrink-0`}
      />
      {showText && (
        <span className={`font-lora font-bold ${textSizeClasses[size]} ${textColorClasses[variant]}`}>
          InOrbyt.io
        </span>
      )}
    </div>
  );
}
