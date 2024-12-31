import React from 'react';

export function LogoMultimidia() {
  return (
    <div className="flex items-center gap-2 text-white">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 8H2V4C2 3.46957 2.21071 2.96086 2.58579 2.58579C2.96086 2.21071 3.46957 2 4 2H8V4H4V8Z" fill="currentColor"/>
        <path d="M20 8H22V4C22 3.46957 21.7893 2.96086 21.4142 2.58579C21.0391 2.21071 20.5304 2 20 2H16V4H20V8Z" fill="currentColor"/>
        <path d="M20 20H16V22H20C20.5304 22 21.0391 21.7893 21.4142 21.4142C21.7893 21.0391 22 20.5304 22 20V16H20V20Z" fill="currentColor"/>
        <path d="M4 20H8V22H4C3.46957 22 2.96086 21.7893 2.58579 21.4142C2.21071 21.0391 2 20.5304 2 20V16H4V20Z" fill="currentColor"/>
      </svg>
      <span className="font-semibold text-lg">Multimídia</span>
    </div>
  );
}
