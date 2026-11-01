import React from 'react';
import { EvaluationResult } from '../types';

interface HeaderProps {
  onNewEvaluation: () => void;
  onOpenHistory: () => void;
  onOpenSettings: () => void;
  onOpenExport: () => void;
  historyCount: number;
  currentEvaluation: EvaluationResult | null;
  onScrollToSection?: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onNewEvaluation,
  onOpenHistory,
  onOpenSettings,
  onOpenExport,
  historyCount,
  currentEvaluation,
  onScrollToSection
}) => {
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/95 backdrop-blur-md transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div 
          onClick={onNewEvaluation}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-2xl font-bold tracking-tight text-zinc-950">
              Viabl
            </span>
            <span className="font-mono text-[10px] tracking-widest text-zinc-400 uppercase hidden sm:inline">
              / VENTURE INTELLIGENCE
            </span>
          </div>
        </div>

        {/* Center Nav links (when on landing page) */}
        {!currentEvaluation && onScrollToSection && (
          <nav className="hidden md:flex items-center gap-7 text-xs font-medium text-zinc-600">
            <button 
              onClick={() => onScrollToSection('dimensions')} 
              className="hover:text-zinc-950 transition-colors"
            >
              Evaluation Dimensions
            </button>
            <button 
              onClick={() => onScrollToSection('how-it-works')} 
              className="hover:text-zinc-950 transition-colors"
            >
              Methodology
            </button>
            <button 
              onClick={() => onScrollToSection('committee')} 
              className="hover:text-zinc-950 transition-colors"
            >
              Investment Committee
            </button>
            <button 
              onClick={() => onScrollToSection('sample-memo')} 
              className="hover:text-zinc-950 transition-colors"
            >
              Sample Memo
            </button>
            <button 
              onClick={() => onScrollToSection('why-viabl')} 
              className="hover:text-zinc-950 transition-colors"
            >
              Founder Scrutiny
            </button>
          </nav>
        )}

        {/* Right Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {currentEvaluation ? (
            <>
              <button
                onClick={onNewEvaluation}
                className="px-3.5 py-1.5 text-xs font-medium text-zinc-700 hover:text-zinc-950 border border-zinc-300 hover:border-zinc-400 transition-colors bg-white shadow-xs"
              >
                Evaluate Another Idea
              </button>

              <button
                onClick={onOpenExport}
                className="px-3.5 py-1.5 text-xs font-medium text-white bg-zinc-900 hover:bg-zinc-800 transition-colors shadow-xs"
              >
                Export Memo
              </button>
            </>
          ) : (
            <button
              onClick={onNewEvaluation}
              className="px-4 py-1.5 text-xs font-semibold text-white bg-zinc-950 hover:bg-zinc-800 transition-colors tracking-wide"
            >
              Evaluate an Idea
            </button>
          )}

          <button
            onClick={onOpenHistory}
            className="px-3 py-1.5 text-xs font-medium text-zinc-600 hover:text-zinc-950 border border-zinc-200 hover:border-zinc-300 transition-colors bg-white"
            title="Saved Evaluations"
          >
            History {historyCount > 0 && `(${historyCount})`}
          </button>

          <button
            onClick={onOpenSettings}
            className="px-2.5 py-1.5 text-xs font-mono text-zinc-500 hover:text-zinc-900 border border-zinc-200 hover:border-zinc-300 transition-colors bg-white"
            title="Configuration"
          >
            Settings
          </button>
        </div>
      </div>
    </header>
  );
};
