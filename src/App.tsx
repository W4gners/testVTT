import React, { useState } from 'react';
import { FileUpload } from './components/FileUpload';
import { Preview } from './components/Preview';
import { ActionButtons } from './components/ActionButtons';
import { DragDropProvider } from './components/DragDropProvider';
import { srtToVtt, addVttNumbering } from './utils/subtitleConverter';
import { FileText, Settings } from 'lucide-react';
import { ConversionType } from './components/ConversionType';
import { ThemeToggle } from './components/ThemeToggle';

export default function App() {
  const [conteudoEntrada, setConteudoEntrada] = useState('');
  const [conteudoSaida, setConteudoSaida] = useState('');
  const [tipoConversao, setTipoConversao] = useState<'srtToVtt' | 'addNumbering'>('srtToVtt');

  const handleSelecionarArquivo = (content: string) => {
    setConteudoEntrada(content);
    const convertido = tipoConversao === 'srtToVtt' 
      ? srtToVtt(content)
      : addVttNumbering(content);
    setConteudoSaida(convertido);
  };

  const handleMudarTipoConversao = (type: 'srtToVtt' | 'addNumbering') => {
    setTipoConversao(type);
    if (conteudoEntrada) {
      const convertido = type === 'srtToVtt' 
        ? srtToVtt(conteudoEntrada)
        : addVttNumbering(conteudoEntrada);
      setConteudoSaida(convertido);
    }
  };

  const handleReiniciar = () => {
    setConteudoEntrada('');
    setConteudoSaida('');
  };

  return (
    <DragDropProvider onFileDrop={handleSelecionarArquivo}>
      <div className="min-h-screen bg-neutral-900 text-white">
        <div className="max-w-7xl mx-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Painel Lateral Esquerdo */}
            <div className="lg:col-span-4">
              <div className="bg-neutral-800 rounded-2xl p-6 space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">Conversor de Legendas</h2>
                    <p className="text-neutral-400 text-sm">Converta e edite legendas</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <ConversionType 
                    type={tipoConversao} 
                    onChange={handleMudarTipoConversao} 
                  />
                  <FileUpload 
                    onFileSelect={handleSelecionarArquivo}
                    acceptedFormats={tipoConversao === 'srtToVtt' ? '.srt' : '.vtt'}
                  />
                </div>
              </div>
            </div>

            {/* Área Principal */}
            <div className="lg:col-span-8">
              <div className="bg-neutral-800 rounded-2xl p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-medium">Visualização</h3>
                  <div className="flex items-center space-x-4">
                    <ThemeToggle />
                    <button className="p-2 hover:bg-neutral-700 rounded-lg transition-colors">
                      <Settings className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {(conteudoEntrada || conteudoSaida) ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Preview 
                        content={conteudoEntrada} 
                        type="input" 
                        label={tipoConversao === 'srtToVtt' ? 'Conteúdo SRT' : 'Conteúdo VTT'} 
                      />
                      <Preview 
                        content={conteudoSaida} 
                        type="output" 
                        label="Resultado" 
                      />
                    </div>
                    <ActionButtons vttContent={conteudoSaida} onReset={handleReiniciar} />
                  </div>
                ) : (
                  <div className="text-center py-12 text-neutral-400">
                    <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Selecione um arquivo para começar a conversão</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DragDropProvider>
  );
}