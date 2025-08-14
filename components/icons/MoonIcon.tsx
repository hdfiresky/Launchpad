import React from 'react';

export const MoonIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M21.02,14.82A8.76,8.76,0,0,1,11.25,21a8.75,8.75,0,0,1,0-17.5,8.68,8.68,0,0,1,1.97.23,0.67,0.67,0,0,1,.37,1,7.35,7.35,0,0,0-1.32,4.1A7.35,7.35,0,0,0,20,15.17a0.67,0.67,0,0,1,.94.56A8.69,8.69,0,0,1,21.02,14.82Z" />
  </svg>
);
