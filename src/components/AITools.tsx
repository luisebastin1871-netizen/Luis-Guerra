import React, { useState, useRef } from 'react';
import { 
  Wand2, 
  Search, 
  Image as ImageIcon, 
  ScanSearch, 
  Loader2, 
  Upload, 
  Sparkles,
  ArrowRight,
  AlertCircle
} from 'lucide-react';
import { analyzeImage, generateImage, editImage, searchMarket } from '../services/gemini';
import { motion, AnimatePresence } from 'motion/react';

type Tool = 'analyze' | 'generate' | 'edit' | 'search';

export function AITools() {
  const [activeTool, setActiveTool] = useState<Tool>('analyze');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [size, setSize] = useState<'1K' | '2K' | '4K'>('1K');
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const runTool = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      if (activeTool === 'analyze') {
        if (!preview) throw new Error('Please upload an image first');
        const [mime, data] = preview.split(',');
        const mimeType = mime.match(/:(.*?);/)?.[1] || 'image/jpeg';
        const res = await analyzeImage(data, mimeType);
        setResult(res || 'No analysis available.');
      } else if (activeTool === 'generate') {
        if (!prompt) throw new Error('Please enter a prompt');
        const res = await generateImage(prompt, size);
        if (res) setResult(res);
        else throw new Error('Failed to generate image');
      } else if (activeTool === 'edit') {
        if (!preview) throw new Error('Please upload an image first');
        if (!prompt) throw new Error('Please enter an editing prompt');
        const [mime, data] = preview.split(',');
        const mimeType = mime.match(/:(.*?);/)?.[1] || 'image/jpeg';
        const res = await editImage(data, mimeType, prompt);
        if (res) setResult(res);
        else throw new Error('Failed to edit image');
      } else if (activeTool === 'search') {
        if (!prompt) throw new Error('Please enter a search query');
        const res = await searchMarket(prompt);
        setResult(res || 'No results found.');
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl overflow-hidden">
      <div className="flex border-b border-slate-100">
        {[
          { id: 'analyze', icon: ScanSearch, label: 'Calidad AI' },
          { id: 'generate', icon: ImageIcon, label: 'Generar' },
          { id: 'edit', icon: Wand2, label: 'Editor' },
          { id: 'search', icon: Search, label: 'Mercado' },
        ].map((tool) => (
          <button
            key={tool.id}
            onClick={() => {
              setActiveTool(tool.id as Tool);
              setResult(null);
              setError(null);
            }}
            className={`flex-1 flex flex-col items-center gap-2 py-6 transition-all ${
              activeTool === tool.id 
                ? 'bg-emerald-50 text-emerald-700 border-b-2 border-emerald-600' 
                : 'text-slate-400 hover:bg-slate-50'
            }`}
          >
            <tool.icon className="w-6 h-6" />
            <span className="text-xs font-bold uppercase tracking-widest">{tool.label}</span>
          </button>
        ))}
      </div>

      <div className="p-8 md:p-12">
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-display font-bold mb-2">
                {activeTool === 'analyze' && 'Análisis de Calidad Exportación'}
                {activeTool === 'generate' && 'Generador de Activos Visuales'}
                {activeTool === 'edit' && 'Editor de Imágenes Inteligente'}
                {activeTool === 'search' && 'Inteligencia de Mercado Real-time'}
              </h3>
              <p className="text-slate-500">
                {activeTool === 'analyze' && 'Sube una foto de tus espárragos para una evaluación instantánea de frescura y grado.'}
                {activeTool === 'generate' && 'Crea imágenes personalizadas para marketing o empaques usando IA de última generación.'}
                {activeTool === 'edit' && 'Modifica fotos de productos con lenguaje natural. "Añade rocío", "Cambia el fondo".'}
                {activeTool === 'search' && 'Consulta tendencias de precios, demanda global y noticias del sector agrícola.'}
              </p>
            </div>

            {(activeTool === 'analyze' || activeTool === 'edit') && (
              <div className="space-y-4">
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="aspect-video rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50 flex flex-col items-center justify-center cursor-pointer hover:border-emerald-400 transition-all overflow-hidden relative group"
                >
                  {preview ? (
                    <img src={preview} className="w-full h-full object-cover" />
                  ) : (
                    <>
                      <Upload className="w-10 h-10 text-slate-300 mb-4 group-hover:text-emerald-500 transition-colors" />
                      <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Subir Imagen</span>
                    </>
                  )}
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/*" 
                    onChange={handleFileChange} 
                  />
                </div>
              </div>
            )}

            {(activeTool === 'generate' || activeTool === 'edit' || activeTool === 'search') && (
              <div className="space-y-4">
                <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">
                  {activeTool === 'search' ? 'Consulta de Mercado' : 'Instrucciones / Prompt'}
                </label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder={
                    activeTool === 'search' 
                      ? '¿Cuál es el precio actual del espárrago en el mercado de EE.UU.?' 
                      : 'Ej: Espárragos verdes frescos sobre mesa de madera rústica...'
                  }
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all resize-none"
                  rows={3}
                />
              </div>
            )}

            {activeTool === 'generate' && (
              <div className="space-y-4">
                <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Resolución</label>
                <div className="flex gap-4">
                  {(['1K', '2K', '4K'] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => setSize(s)}
                      className={`flex-1 py-3 rounded-xl font-bold border transition-all ${
                        size === s ? 'bg-emerald-600 border-emerald-600 text-white' : 'bg-white border-slate-200 text-slate-600 hover:border-emerald-400'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={runTool}
              disabled={loading}
              className="w-full py-5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <Sparkles className="w-5 h-5 text-emerald-400" />
                  <span>Ejecutar Herramienta AI</span>
                </>
              )}
            </button>

            {error && (
              <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 text-sm font-medium">
                <AlertCircle className="w-5 h-5 shrink-0" />
                {error}
              </div>
            )}
          </div>

          <div className="bg-slate-50 rounded-[2rem] border border-slate-100 p-8 min-h-[400px] flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Resultado AI</span>
              {result && !loading && (
                <button 
                  onClick={() => setResult(null)}
                  className="text-xs font-bold text-emerald-600 hover:text-emerald-700 uppercase tracking-widest"
                >
                  Limpiar
                </button>
              )}
            </div>

            <div className="flex-1 flex items-center justify-center">
              {!result && !loading && (
                <div className="text-center space-y-4 max-w-xs">
                  <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto text-slate-200">
                    <Sparkles className="w-8 h-8" />
                  </div>
                  <p className="text-slate-400 text-sm">El resultado de la inteligencia artificial aparecerá aquí después de ejecutar la herramienta.</p>
                </div>
              )}

              {loading && (
                <div className="text-center space-y-4">
                  <Loader2 className="w-10 h-10 animate-spin text-emerald-600 mx-auto" />
                  <p className="text-emerald-600 font-bold animate-pulse">Procesando con Gemini...</p>
                </div>
              )}

              {result && !loading && (
                <div className="w-full h-full">
                  {(activeTool === 'generate' || activeTool === 'edit') ? (
                    <div className="rounded-2xl overflow-hidden shadow-lg border border-white">
                      <img src={result} className="w-full h-auto" />
                    </div>
                  ) : (
                    <div className="prose prose-slate max-w-none text-slate-600 text-sm leading-relaxed whitespace-pre-wrap">
                      {result}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
