import React, { useState } from 'react';
import { ApiSettings } from '../types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: ApiSettings;
  onSaveSettings: (settings: ApiSettings) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onSaveSettings
}) => {
  const [geminiApiKey, setGeminiApiKey] = useState(settings.geminiApiKey || '');
  const [openaiApiKey, setOpenaiApiKey] = useState(settings.openaiApiKey || '');
  const [preferredEngine, setPreferredEngine] = useState<ApiSettings['preferredEngine']>(
    settings.preferredEngine || 'auto'
  );
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveSettings({
      geminiApiKey: geminiApiKey.trim(),
      openaiApiKey: openaiApiKey.trim(),
      preferredEngine
    });
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      <div 
        className="fixed inset-0 bg-zinc-950/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="relative bg-white border border-zinc-300 p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-200">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 block">
              SYSTEM CONFIGURATION
            </span>
            <h3 className="font-serif text-xl font-bold text-zinc-950">
              Intelligence Engine Settings
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-xs font-mono text-zinc-400 hover:text-zinc-900"
          >
            [CLOSE]
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-5 text-xs font-sans">
          {/* Mode Selector */}
          <div>
            <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-600 mb-2 font-bold">
              Diligence Synthesis Mode
            </label>
            <div className="space-y-2">
              <label 
                className={`p-3 border flex items-start justify-between cursor-pointer transition-colors ${
                  preferredEngine === 'auto'
                    ? 'border-zinc-950 bg-zinc-50'
                    : 'border-zinc-200 bg-white hover:border-zinc-300'
                }`}
              >
                <div>
                  <div className="font-serif font-bold text-sm text-zinc-900">
                    Autonomous Heuristic Engine (Recommended)
                  </div>
                  <div className="text-[11px] text-zinc-500 mt-0.5">
                    Fast, offline, zero token charges. Uses institutional seed criteria and market heuristics.
                  </div>
                </div>
                <input
                  type="radio"
                  name="engine"
                  value="auto"
                  checked={preferredEngine === 'auto'}
                  onChange={() => setPreferredEngine('auto')}
                  className="mt-1 accent-zinc-900"
                />
              </label>

              <label 
                className={`p-3 border flex items-start justify-between cursor-pointer transition-colors ${
                  preferredEngine === 'local'
                    ? 'border-zinc-950 bg-zinc-50'
                    : 'border-zinc-200 bg-white hover:border-zinc-300'
                }`}
              >
                <div>
                  <div className="font-serif font-bold text-sm text-zinc-900">
                    Enforce Pure Local Simulation
                  </div>
                  <div className="text-[11px] text-zinc-500 mt-0.5">
                    Guarantees zero outbound network calls.
                  </div>
                </div>
                <input
                  type="radio"
                  name="engine"
                  value="local"
                  checked={preferredEngine === 'local'}
                  onChange={() => setPreferredEngine('local')}
                  className="mt-1 accent-zinc-900"
                />
              </label>
            </div>
          </div>

          {/* Optional Gemini Key */}
          <div className="space-y-1">
            <label className="block text-[10px] font-mono uppercase tracking-wider text-zinc-600">
              Google Gemini API Key (Optional)
            </label>
            <input
              type="password"
              value={geminiApiKey}
              onChange={(e) => setGeminiApiKey(e.target.value)}
              placeholder="AIzaSy..."
              className="w-full px-3 py-2 border border-zinc-300 bg-white text-xs text-zinc-900 font-mono focus:outline-none focus:border-zinc-900"
            />
            <p className="text-[10px] text-zinc-400">
              Optional live LLM calls to Gemini 2.0 Flash for multi-persona reasoning.
            </p>
          </div>

          {/* Optional OpenAI Key */}
          <div className="space-y-1">
            <label className="block text-[10px] font-mono uppercase tracking-wider text-zinc-600">
              OpenAI API Key (Optional)
            </label>
            <input
              type="password"
              value={openaiApiKey}
              onChange={(e) => setOpenaiApiKey(e.target.value)}
              placeholder="sk-..."
              className="w-full px-3 py-2 border border-zinc-300 bg-white text-xs text-zinc-900 font-mono focus:outline-none focus:border-zinc-900"
            />
          </div>

          <div className="p-3 bg-zinc-50 border border-zinc-200 text-[11px] font-mono text-zinc-500">
            Keys remain strictly inside local browser storage (localStorage). They are never transmitted to third-party telemetry servers.
          </div>

          <div className="pt-2 flex justify-end gap-3 font-mono">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-zinc-200 hover:border-zinc-300 text-zinc-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-zinc-950 hover:bg-zinc-800 text-white font-bold"
            >
              {savedSuccess ? '✓ Saved' : 'Save Preferences'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
