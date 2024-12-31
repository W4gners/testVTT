import React from 'react';
import { Upload } from 'lucide-react';

interface FileUploadProps {
  onFileSelect: (content: string) => void;
  acceptedFormats: string;
}

export function FileUpload({ onFileSelect, acceptedFormats }: FileUploadProps) {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      onFileSelect(content);
    };
    reader.readAsText(file);
  };

  return (
    <div className="w-full">
      <label
        htmlFor="file-upload"
        className="flex flex-col items-center justify-center w-full h-32 border border-neutral-700 border-dashed rounded-xl cursor-pointer bg-neutral-800/50 hover:bg-neutral-700/50 transition-colors"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <div className="w-10 h-10 mb-3 rounded-lg bg-neutral-700/50 flex items-center justify-center">
            <Upload className="w-5 h-5 text-neutral-400" />
          </div>
          <p className="mb-2 text-sm text-neutral-400">
            <span className="font-medium text-orange-500">Clique para enviar</span>{' '}
            ou arraste seu arquivo
          </p>
          <p className="text-xs text-neutral-500">
            {acceptedFormats === '.srt' ? 'Apenas arquivos .srt' : 'Apenas arquivos .vtt'}
          </p>
        </div>
        <input
          id="file-upload"
          type="file"
          accept={acceptedFormats}
          className="hidden"
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
}