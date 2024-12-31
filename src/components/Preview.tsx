import React from 'react';

interface PreviewProps {
  content: string;
  type: 'input' | 'output';
  label: string;
}

export function Preview({ content, type }: PreviewProps) {
  return (
    <div className="w-full">
      <pre className="w-full p-4 bg-neutral-900 rounded-lg text-sm text-neutral-300 font-mono whitespace-pre-wrap break-words">
        {content}
      </pre>
    </div>
  );
}