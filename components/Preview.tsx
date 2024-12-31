import React from 'react';
import { Copy } from 'lucide-react';

interface PreviewProps {
  content: string;
  type: 'input' | 'output';
  label: string;
}

export function Preview({ content, type, label }: PreviewProps) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
    } catch (err) {
      console.error('Falha ao copiar texto:', err);
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-medium text-neutral-400">{label}</h3>
        {type === 'output' && content && (
          <button
            onClick={handleCopy}
            className="inline-flex items-center px-2 py-1 text-sm text-neutral-400 hover:text-neutral-200 transition-colors"
            title="Copiar para área de transferência"
          >
            <Copy className="w-4 h-4 mr-1" />
            Copiar
          </button>
        )}
      </div>
      <div className="w-full bg-neutral-900 rounded-xl border border-neutral-700">
        <pre className="p-4 text-sm font-mono text-neutral-300 overflow-auto max-h-[300px] whitespace-pre-wrap break-words">
          {content || 'Nenhum conteúdo para exibir'}
        </pre>
      </div>
    </div>
  );
}