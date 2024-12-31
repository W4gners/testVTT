import React from 'react';
import { Download, RotateCcw } from 'lucide-react';

interface ActionButtonsProps {
  vttContent: string;
  onReset: () => void;
}

export function ActionButtons({ vttContent, onReset }: ActionButtonsProps) {
  const handleDownload = () => {
    const blob = new Blob([vttContent], { type: 'text/vtt' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'legendas.vtt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex justify-end gap-3">
      <button
        onClick={onReset}
        className="flex items-center justify-center px-4 py-2 rounded-xl text-neutral-400 bg-neutral-700/50 hover:bg-neutral-700 transition-colors"
      >
        <RotateCcw className="w-4 h-4 mr-2" />
        Nova Conversão
      </button>
      <button
        onClick={handleDownload}
        disabled={!vttContent}
        className={`flex items-center justify-center px-4 py-2 rounded-xl ${
          !vttContent
            ? 'bg-neutral-700 text-neutral-500 cursor-not-allowed'
            : 'bg-orange-500 hover:bg-orange-600 text-white'
        } transition-colors`}
      >
        <Download className="w-4 h-4 mr-2" />
        Baixar VTT
      </button>
    </div>
  );
}