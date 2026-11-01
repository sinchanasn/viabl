import React, { useState } from 'react';
import { StartupIdeaInput } from '../types';
import { PRESET_IDEAS, PresetIdea, COMMITTEE_MEMBERS } from '../services/presets';

interface IdeaInputProps {
  onEvaluate: (input: StartupIdeaInput) => void;
  isLoading: boolean;
  loadingStepText: string;
  onCancel?: () => void;
}

export const IdeaInput: React.FC<IdeaInputProps> = ({
  onEvaluate,
  isLoading,
  loadingStepText,
  onCancel
}) => {
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [monetizationModel, setMonetizationModel] = useState('');
  const [stage, setStage] = useState<'Just an Idea' | 'Prototype / MVP' | 'Early Traction'>('Just an Idea');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSelectPreset = (preset: PresetIdea) => {
    setTitle(preset.title || '');
    setDescription(preset.description);
    setTargetAudience(preset.targetAudience || '');
    setMonetizationModel(preset.monetizationModel || '');
    setStage(preset.stage || 'Just an Idea');
    setShowAdvanced(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim() || isLoading) return;

    onEvaluate({
      title: title.trim() || undefined,
      description: description.trim(),
      targetAudience: targetAudience.trim() || undefined,
      monetizationModel: monetizationModel.trim() || undefined,
      stage
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:py-16">
      {/* Editorial Header */}
      <div className="mb-8 pb-6 border-b border-zinc-200 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 mb-1">
            Diligence Docket // Submission Form
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-normal text-zinc-950">
            Submit Startup Concept for Review
          </h1>
          <p className="text-xs sm:text-sm text-zinc-600 mt-1 max-w-xl">
            Enter your idea in natural language. The committee will examine customer desperation, competitive whitespace, technical feasibility, and monetization defensibility.
          </p>
        </div>

        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="text-xs font-mono text-zinc-500 hover:text-zinc-900 underline self-start sm:self-auto"
          >
            ← Back to Overview
          </button>
        )}
      </div>

      {/* Main Diligence Form */}
      <form onSubmit={handleSubmit} className="document-sheet p-6 sm:p-10 border border-zinc-300 bg-white space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label htmlFor="idea-description" className="block text-xs font-mono uppercase tracking-wider text-zinc-800 font-bold">
              Startup Pitch & Core Thesis <span className="text-zinc-400">*</span>
            </label>
            <span className="text-[11px] font-mono text-zinc-400">
              {description.length} chars
            </span>
          </div>

          <textarea
            id="idea-description"
            rows={5}
            required
            disabled={isLoading}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g. A developer platform that hooks into GitHub PRs to continuously synchronize API documentation and generate interactive sandboxes. Engineering teams pay $99-$499/month..."
            className="w-full px-4 py-3 rounded-none border border-zinc-300 bg-white text-zinc-900 placeholder-zinc-400 text-sm font-sans focus:outline-none focus:border-zinc-900 transition-colors leading-relaxed"
          />

          {/* Optional Details Toggle */}
          <div className="pt-2">
            <button
              type="button"
              disabled={isLoading}
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="text-xs font-mono text-zinc-600 hover:text-zinc-950 underline transition-colors"
            >
              {showAdvanced ? '[-] Hide Optional Context' : '[+] Add Target ICP, Pricing Model & Current Stage'}
            </button>

            {showAdvanced && (
              <div className="mt-4 pt-4 border-t border-zinc-100 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-zinc-500 mb-1">
                    Venture Name
                  </label>
                  <input
                    type="text"
                    disabled={isLoading}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. CodeSync AI"
                    className="w-full px-3 py-2 border border-zinc-300 bg-white text-xs text-zinc-900 focus:outline-none focus:border-zinc-900"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-zinc-500 mb-1">
                    Target Customer (ICP)
                  </label>
                  <input
                    type="text"
                    disabled={isLoading}
                    value={targetAudience}
                    onChange={(e) => setTargetAudience(e.target.value)}
                    placeholder="e.g. CTOs & Dev Leads"
                    className="w-full px-3 py-2 border border-zinc-300 bg-white text-xs text-zinc-900 focus:outline-none focus:border-zinc-900"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-zinc-500 mb-1">
                    Monetization Model
                  </label>
                  <input
                    type="text"
                    disabled={isLoading}
                    value={monetizationModel}
                    onChange={(e) => setMonetizationModel(e.target.value)}
                    placeholder="e.g. $99/mo B2B SaaS"
                    className="w-full px-3 py-2 border border-zinc-300 bg-white text-xs text-zinc-900 focus:outline-none focus:border-zinc-900"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Submit Action */}
          <div className="pt-4 border-t border-zinc-200">
            <button
              type="submit"
              disabled={isLoading || !description.trim()}
              className={`w-full py-4 text-xs font-mono uppercase tracking-widest font-bold transition-colors ${
                isLoading || !description.trim()
                  ? 'bg-zinc-100 text-zinc-400 border border-zinc-200 cursor-not-allowed'
                  : 'bg-zinc-950 text-white hover:bg-zinc-800'
              }`}
            >
              {isLoading ? (loadingStepText || 'Committee Deliberation in Session...') : 'Convene Committee & Run Due Diligence'}
            </button>
          </div>
        </div>

        {/* Loading Progress State */}
        {isLoading && (
          <div className="p-4 border border-zinc-300 bg-zinc-50 text-xs font-mono space-y-2">
            <div className="flex items-center justify-between text-zinc-700">
              <span>STATUS: REVIEW IN PROGRESS</span>
              <span className="animate-pulse">● DELIBERATING</span>
            </div>
            <div className="text-zinc-900 font-semibold">
              {loadingStepText}
            </div>
          </div>
        )}
      </form>

      {/* Preset Sample Ideas */}
      <div className="mt-10 pt-6 border-t border-zinc-200 space-y-3">
        <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-500">
          Or load a sample venture docket:
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {PRESET_IDEAS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              disabled={isLoading}
              onClick={() => handleSelectPreset(preset)}
              className="p-3.5 border border-zinc-200 bg-white hover:border-zinc-400 text-left transition-colors space-y-1.5"
            >
              <div className="flex items-center justify-between text-[10px] font-mono">
                <span className="text-zinc-500 uppercase">{preset.badge}</span>
                <span className="font-bold text-zinc-900">{preset.expectedVerdictPreview}</span>
              </div>
              <div className="font-serif font-semibold text-sm text-zinc-950 line-clamp-1">
                {preset.title}
              </div>
              <p className="text-[11px] text-zinc-600 line-clamp-2">
                {preset.description}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
