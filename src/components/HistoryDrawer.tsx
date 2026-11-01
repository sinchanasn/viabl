import React, { useState } from 'react';
import { EvaluationResult } from '../types';

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  history: EvaluationResult[];
  currentId: string | null;
  onSelectEvaluation: (item: EvaluationResult) => void;
  onDeleteEvaluation: (id: string) => void;
  onClearHistory: () => void;
  onCompareEvaluations?: (idA: string, idB: string) => void;
}

export const HistoryDrawer: React.FC<HistoryDrawerProps> = ({
  isOpen,
  onClose,
  history,
  currentId,
  onSelectEvaluation,
  onDeleteEvaluation,
  onClearHistory,
  onCompareEvaluations
}) => {
  const [selectedForCompare, setSelectedForCompare] = useState<string[]>([]);

  if (!isOpen) return null;

  const toggleCompare = (id: string) => {
    if (selectedForCompare.includes(id)) {
      setSelectedForCompare(selectedForCompare.filter(i => i !== id));
    } else {
      if (selectedForCompare.length >= 2) {
        setSelectedForCompare([selectedForCompare[1], id]);
      } else {
        setSelectedForCompare([...selectedForCompare, id]);
      }
    }
  };

  const handleRunCompare = () => {
    if (selectedForCompare.length === 2 && onCompareEvaluations) {
      onCompareEvaluations(selectedForCompare[0], selectedForCompare[1]);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-zinc-950/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-zinc-200 shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-5 border-b border-zinc-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-serif text-lg font-bold text-zinc-950">
                Evaluation History
              </span>
              <span className="text-xs font-mono px-2 py-0.5 border border-zinc-200 bg-zinc-50 text-zinc-600">
                {history.length} Saved
              </span>
            </div>

            <button
              onClick={onClose}
              className="text-xs font-mono text-zinc-500 hover:text-zinc-950 p-1"
            >
              [CLOSE]
            </button>
          </div>

          {/* Compare Toolbar */}
          {history.length >= 2 && (
            <div className="px-5 py-2.5 bg-zinc-50 border-b border-zinc-200 flex items-center justify-between text-xs font-mono">
              <span className="text-zinc-500">
                Compare Selected: {selectedForCompare.length}/2
              </span>

              {selectedForCompare.length === 2 && (
                <button
                  onClick={handleRunCompare}
                  className="px-2.5 py-1 bg-zinc-950 hover:bg-zinc-800 text-white font-bold text-[11px] transition-colors"
                >
                  Run Comparison →
                </button>
              )}
            </div>
          )}

          {/* List Content */}
          <div className="flex-1 overflow-y-auto p-5 space-y-3">
            {history.length === 0 ? (
              <div className="text-center py-16 text-zinc-400 text-xs font-mono">
                No past evaluations recorded. Run your first diligence review to save.
              </div>
            ) : (
              history.map((item) => {
                const isCurrent = currentId === item.id;
                const isChecked = selectedForCompare.includes(item.id);
                const dateStr = new Date(item.timestamp).toLocaleDateString(undefined, {
                  month: 'short',
                  day: 'numeric'
                });

                return (
                  <div
                    key={item.id}
                    className={`p-4 border transition-all text-left space-y-2 ${
                      isCurrent
                        ? 'border-zinc-950 bg-zinc-50'
                        : 'border-zinc-200 bg-white hover:border-zinc-400'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-mono">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleCompare(item.id)}
                          className="cursor-pointer accent-zinc-900"
                        />
                        <span className="font-bold text-zinc-950">
                          {item.verdict} ({item.overallViabilityScore}/100)
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-zinc-400">
                        <span>{dateStr}</span>
                        <button
                          onClick={() => onDeleteEvaluation(item.id)}
                          className="hover:text-zinc-900"
                          title="Delete"
                        >
                          ×
                        </button>
                      </div>
                    </div>

                    <p 
                      onClick={() => {
                        onSelectEvaluation(item);
                        onClose();
                      }}
                      className="font-serif text-sm text-zinc-800 line-clamp-2 cursor-pointer hover:text-zinc-950"
                    >
                      {item.ideaText}
                    </p>

                    <div className="pt-2 border-t border-zinc-100 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                      <span className="truncate max-w-[200px]">{item.industry}</span>
                      <button
                        onClick={() => {
                          onSelectEvaluation(item);
                          onClose();
                        }}
                        className="text-zinc-900 underline font-semibold"
                      >
                        Open Memo →
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer */}
          {history.length > 0 && (
            <div className="p-4 border-t border-zinc-200 flex items-center justify-between bg-zinc-50 font-mono text-xs">
              <button
                onClick={onClearHistory}
                className="text-zinc-500 hover:text-zinc-900 underline"
              >
                Clear All History
              </button>

              <button
                onClick={onClose}
                className="px-3 py-1.5 border border-zinc-300 bg-white text-zinc-900 font-medium"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
