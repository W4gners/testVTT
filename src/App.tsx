import React, { useState } from 'react';
import { FileUpload } from './components/FileUpload';
import { Preview } from './components/Preview';
import { ActionButtons } from './components/ActionButtons';
import { DragDropProvider } from './components/DragDropProvider';
import { srtToVtt, addVttNumbering } from './utils/subtitleConverter';
import { LogoMultimidia } from './assets/logo_multimidia';

type ConversionMode = 'srtToVtt' | 'addNumbering' | 'audioToVtt' | 'videoToVtt';

export default function App() {
  const [conteudoEntrada, setConteudoEntrada] = useState('');
  const [conteudoSaida, setConteudoSaida] = useState('');
  const [modo, setModo] = useState<ConversionMode>('srtToVtt');

  const handleSelecionarArquivo = (content: string) => {
    setConteudoEntrada(content);
    if (modo === 'srtToVtt') {
      setConteudoSaida(srtToVtt(content));
    } else if (modo === 'addNumbering') {
      setConteudoSaida(addVttNumbering(content));
    }
  };

  const handleReiniciar = () => {
    setConteudoEntrada('');
    setConteudoSaida('');
  };

  return (
    <DragDropProvider onFileDrop={handleSelecionarArquivo}>
      <div className="min-h-screen bg-neutral-900 text-white">
        {/* Header */}
        <header className="border-b border-neutral-800">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <LogoMultimidia />
          </div>
        </header>

        {/* Navigation */}
        <nav className="border-b border-neutral-800">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex space-x-1">
              <button
                onClick={() => setModo('srtToVtt')}
                className={`px-4 py-3 text-sm font-medium transition-colors ${
                  modo === 'srtToVtt'
                    ? 'bg-orange-500/20 text-orange-500 border-b-2 border-orange-500'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                SRT para VTT
              </button>
              <button
                onClick={() => setModo('addNumbering')}
                className={`px-4 py-3 text-sm font-medium transition-colors ${
                  modo === 'addNumbering'
                    ? 'bg-orange-500/20 text-orange-500 border-b-2 border-orange-500'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                Numerar VTT
              </button>
              <button
                onClick={() => setModo('audioToVtt')}
                className={`px-4 py-3 text-sm font-medium transition-colors ${
                  modo === 'audioToVtt'
                    ? 'bg-orange-500/20 text-orange-500 border-b-2 border-orange-500'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                Áudio para VTT
              </button>
              <button
                onClick={() => setModo('videoToVtt')}
                className={`px-4 py-3 text-sm font-medium transition-colors ${
                  modo === 'videoToVtt'
                    ? 'bg-orange-500/20 text-orange-500 border-b-2 border-orange-500'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                Vídeo para VTT
              </button>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-4 py-8">
          <div className="space-y-8">
            {/* Upload Area */}
            <div className="bg-neutral-800 rounded-xl p-6">
              <h2 className="text-lg font-bold text-center mb-6">
                {modo === 'srtToVtt' && 'SRT para VTT'}
                {modo === 'addNumbering' && 'Numerar VTT'}
                {modo === 'audioToVtt' && 'Áudio para VTT'}
                {modo === 'videoToVtt' && 'Vídeo para VTT'}
              </h2>
              {(modo === 'srtToVtt' || modo === 'addNumbering') && (
                <FileUpload 
                  onFileSelect={handleSelecionarArquivo}
                  acceptedFormats={modo === 'srtToVtt' ? '.srt' : '.vtt'}
                />
              )}
              {(modo === 'audioToVtt' || modo === 'videoToVtt') && (
                <div className="text-center text-neutral-400">
                  <p>Funcionalidade em desenvolvimento</p>
                </div>
              )}
            </div>

            {/* Results Area */}
            {(conteudoEntrada || conteudoSaida) && (modo === 'srtToVtt' || modo === 'addNumbering') && (
              <div className="bg-neutral-800 rounded-xl p-6">
                <h3 className="text-lg font-bold mb-6 text-center">Resultado</h3>
                <div className="space-y-6">
                  <Preview 
                    content={conteudoSaida} 
                    type="output" 
                    label="Resultado" 
                  />
                  <ActionButtons vttContent={conteudoSaida} onReset={handleReiniciar} />
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </DragDropProvider>
  );
}