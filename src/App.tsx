import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { LandingPage } from './components/LandingPage';
import { IdeaInput } from './components/IdeaInput';
import { VerdictBanner } from './components/VerdictBanner';
import { ScoreBreakdown } from './components/ScoreBreakdown';
import { CommitteeLiveRoom } from './components/CommitteeLiveRoom';
import { ExpertDeepDives } from './components/ExpertDeepDives';
import { StrategicAnalysis } from './components/StrategicAnalysis';
import { CompetitorMatrix } from './components/CompetitorMatrix';
import { PivotSuggestions } from './components/PivotSuggestions';
import { HistoryDrawer } from './components/HistoryDrawer';
import { SettingsModal } from './components/SettingsModal';
import { ExportModal } from './components/ExportModal';
import { CompareModal } from './components/CompareModal';
import { EvaluationResult, StartupIdeaInput, ApiSettings } from './types';
import { evaluateStartupIdea } from './services/evaluator';
import { SAMPLE_INVESTMENT_MEMO } from './services/presets';
import { 
  getEvaluationHistory, 
  saveEvaluationToHistory, 
  removeEvaluationFromHistory, 
  clearAllHistory, 
  getSavedSettings, 
  saveSettings 
} from './services/storage';

export const App: React.FC = () => {
  // Navigation views: 'landing' | 'input' | 'memo'
  const [currentView, setCurrentView] = useState<'landing' | 'input' | 'memo'>('landing');
  const [currentEvaluation, setCurrentEvaluation] = useState<EvaluationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStepText, setLoadingStepText] = useState('');
  
  const [history, setHistory] = useState<EvaluationResult[]>([]);
  const [settings, setSettings] = useState<ApiSettings>(getSavedSettings());

  // Modals state
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  
  // Compare state
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [compareIdA, setCompareIdA] = useState<string | null>(null);
  const [compareIdB, setCompareIdB] = useState<string | null>(null);

  // Load history on mount
  useEffect(() => {
    const saved = getEvaluationHistory();
    setHistory(saved);
  }, []);

  const handleStartEvaluation = () => {
    setCurrentView('input');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewSampleMemo = () => {
    setCurrentEvaluation(SAMPLE_INVESTMENT_MEMO);
    setCurrentView('memo');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReturnToLanding = () => {
    setCurrentEvaluation(null);
    setCurrentView('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEvaluate = async (input: StartupIdeaInput) => {
    setIsLoading(true);
    setLoadingStepText('Convening Investment Committee...');

    try {
      const result = await evaluateStartupIdea(input, settings, (step) => {
        setLoadingStepText(step);
      });

      setCurrentEvaluation(result);
      saveEvaluationToHistory(result);
      setHistory(getEvaluationHistory());
      setCurrentView('memo');

      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error('Evaluation failed:', err);
      alert('An error occurred during evaluation. Please try again or check your settings.');
    } finally {
      setIsLoading(false);
      setLoadingStepText('');
    }
  };

  const handleSaveSettings = (newSettings: ApiSettings) => {
    setSettings(newSettings);
    saveSettings(newSettings);
  };

  const handleDeleteEvaluation = (id: string) => {
    const updated = removeEvaluationFromHistory(id);
    setHistory(updated);
    if (currentEvaluation?.id === id) {
      if (updated.length > 0) {
        setCurrentEvaluation(updated[0]);
      } else {
        setCurrentEvaluation(null);
        setCurrentView('landing');
      }
    }
  };

  const handleClearHistory = () => {
    clearAllHistory();
    setHistory([]);
  };

  const handleCompare = (idA: string, idB: string) => {
    setCompareIdA(idA);
    setCompareIdB(idB);
    setIsCompareOpen(true);
  };

  const scrollToSection = (id: string) => {
    if (currentView !== 'landing' && (id === 'dimensions' || id === 'how-it-works' || id === 'committee' || id === 'sample-memo' || id === 'why-viabl')) {
      setCurrentView('landing');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }

    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const ideaA = history.find(h => h.id === compareIdA) || null;
  const ideaB = history.find(h => h.id === compareIdB) || null;

  return (
    <div className="min-h-screen bg-white text-zinc-900 flex flex-col font-sans selection:bg-zinc-950 selection:text-white">
      {/* Top Global Navigation */}
      <Header
        onNewEvaluation={handleStartEvaluation}
        onOpenHistory={() => setIsHistoryOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenExport={() => setIsExportOpen(true)}
        historyCount={history.length}
        currentEvaluation={currentView === 'memo' ? currentEvaluation : null}
        onScrollToSection={scrollToSection}
      />

      {/* Main View Area */}
      <main className="flex-1">
        {currentView === 'landing' && (
          <LandingPage
            onEvaluateIdea={handleStartEvaluation}
            onViewSampleMemo={handleViewSampleMemo}
            onScrollToSection={scrollToSection}
          />
        )}

        {currentView === 'input' && (
          <IdeaInput
            onEvaluate={handleEvaluate}
            isLoading={isLoading}
            loadingStepText={loadingStepText}
            onCancel={handleReturnToLanding}
          />
        )}

        {currentView === 'memo' && currentEvaluation && (
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
            {/* Memorandum Top Bar */}
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 pb-4 border-b border-zinc-200 no-print">
              <button
                onClick={handleReturnToLanding}
                className="text-xs font-mono text-zinc-500 hover:text-zinc-950 underline self-start"
              >
                ← Return to Platform Overview
              </button>

              <div className="flex items-center gap-3 text-xs font-mono text-zinc-500">
                <span>DOCKET: {currentEvaluation.id}</span>
                <span>•</span>
                <span className="font-semibold text-zinc-900 uppercase">
                  {currentEvaluation.industry}
                </span>
              </div>
            </div>

            {/* Submitted Pitch Docket Brief */}
            <div className="p-5 border border-zinc-200 bg-zinc-50/60 space-y-2 text-xs font-sans">
              <div className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 font-bold">
                Evaluated Concept Under Review
              </div>
              <p className="font-serif text-sm sm:text-base text-zinc-900 italic leading-relaxed">
                "{currentEvaluation.ideaText}"
              </p>
              <div className="pt-2 border-t border-zinc-200/60 flex flex-wrap gap-4 font-mono text-[11px] text-zinc-500">
                <span>Target Customer: <strong className="text-zinc-900">{currentEvaluation.targetCustomer}</strong></span>
                <span>Monetization Model: <strong className="text-zinc-900">{currentEvaluation.monetizationModel}</strong></span>
              </div>
            </div>

            {/* 1. Verdict & Overall Viability Score */}
            <VerdictBanner
              evaluation={currentEvaluation}
              onScrollToSection={scrollToSection}
            />

            {/* 2. Six Diligence Dimensions & Radar Analysis */}
            <ScoreBreakdown scores={currentEvaluation.scores} />

            {/* 3. Investment Committee Deliberation Record */}
            <CommitteeLiveRoom evaluation={currentEvaluation} />

            {/* 4. Strategic Analysis: Executive Summary, Key Strengths & Risks */}
            <StrategicAnalysis evaluation={currentEvaluation} />

            {/* 5. Partner Dossiers & Scrutiny Questions */}
            <ExpertDeepDives evaluation={currentEvaluation} />

            {/* 6. Competitor Landscape */}
            <CompetitorMatrix competitors={currentEvaluation.competitorLandscape} />

            {/* 7. Adjacent Pivot Vectors */}
            <PivotSuggestions
              pivotAngles={currentEvaluation.pivotAngles}
              verdict={currentEvaluation.verdict}
            />

            {/* Bottom Actions Bar */}
            <div className="pt-8 border-t border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-4 no-print font-mono text-xs">
              <button
                onClick={handleStartEvaluation}
                className="w-full sm:w-auto px-6 py-3 border border-zinc-300 hover:border-zinc-900 text-zinc-900 font-medium transition-colors"
              >
                [+] Evaluate Another Startup Idea
              </button>

              <button
                onClick={() => setIsExportOpen(true)}
                className="w-full sm:w-auto px-6 py-3 bg-zinc-950 hover:bg-zinc-800 text-white font-bold transition-colors"
              >
                Export Formal Investment Memo (PDF/Markdown) →
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Sidebars & Modals */}
      <HistoryDrawer
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        currentId={currentEvaluation?.id || null}
        onSelectEvaluation={(item) => {
          setCurrentEvaluation(item);
          setCurrentView('memo');
        }}
        onDeleteEvaluation={handleDeleteEvaluation}
        onClearHistory={handleClearHistory}
        onCompareEvaluations={handleCompare}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onSaveSettings={handleSaveSettings}
      />

      {currentEvaluation && (
        <ExportModal
          isOpen={isExportOpen}
          onClose={() => setIsExportOpen(false)}
          evaluation={currentEvaluation}
        />
      )}

      <CompareModal
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        ideaA={ideaA}
        ideaB={ideaB}
      />
    </div>
  );
};

export default App;
