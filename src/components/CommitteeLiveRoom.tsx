import React, { useState } from 'react';
import { EvaluationResult } from '../types';
import { COMMITTEE_MEMBERS } from '../services/presets';

interface CommitteeLiveRoomProps {
  evaluation: EvaluationResult;
}

export const CommitteeLiveRoom: React.FC<CommitteeLiveRoomProps> = ({ evaluation }) => {
  const [viewMode, setViewMode] = useState<'transcript' | 'partners'>('transcript');
  const { expertEvaluations, simulatedDebateSnippet } = evaluation;

  return (
    <div id="committee" className="space-y-6">
      {/* Section Header */}
      <div className="pb-3 border-b border-zinc-200 flex flex-col sm:flex-row sm:items-baseline justify-between gap-3">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 block">
            Boardroom Record
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-normal text-zinc-950">
            Investment Committee Deliberation
          </h2>
        </div>

        <div className="flex items-center border border-zinc-200 bg-zinc-50 text-xs font-mono">
          <button
            onClick={() => setViewMode('transcript')}
            className={`px-3 py-1.5 transition-colors ${
              viewMode === 'transcript' ? 'bg-zinc-950 text-white font-bold' : 'text-zinc-600 hover:text-zinc-950'
            }`}
          >
            Deliberation Transcript
          </button>
          <button
            onClick={() => setViewMode('partners')}
            className={`px-3 py-1.5 transition-colors ${
              viewMode === 'partners' ? 'bg-zinc-950 text-white font-bold' : 'text-zinc-600 hover:text-zinc-950'
            }`}
          >
            Partner Votes & Notes
          </button>
        </div>
      </div>

      {/* 4 Partner Vote Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {COMMITTEE_MEMBERS.map((member) => {
          const evalData = expertEvaluations[member.id];
          return (
            <div
              key={member.id}
              className="p-4 border border-zinc-200 bg-white space-y-2 hover:border-zinc-400 transition-colors"
            >
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-zinc-500 uppercase">{member.roleTitle}</span>
                <span className="px-1.5 py-0.5 border border-zinc-300 font-bold text-zinc-950 bg-zinc-50">
                  {evalData.verdictVote}
                </span>
              </div>
              <div className="font-serif font-bold text-base text-zinc-950">{member.name}</div>
              <div className="text-[11px] font-mono text-zinc-500">{evalData.stance}</div>
            </div>
          );
        })}
      </div>

      {/* Mode 1: Deliberation Transcript */}
      {viewMode === 'transcript' && (
        <div className="document-sheet p-6 sm:p-8 border border-zinc-300 bg-white space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-200 text-xs font-mono text-zinc-500 uppercase">
            <span>OFFICIAL TRANSCRIPT // UNFILTERED EXCHANGE</span>
            <span>RECORDING ARCHIVED</span>
          </div>

          <div className="space-y-4 pt-2">
            {simulatedDebateSnippet.map((turn, idx) => (
              <div 
                key={idx} 
                className="p-4 border border-zinc-200 bg-zinc-50/50 space-y-1.5 font-sans"
              >
                <div className="flex items-center gap-2 font-mono text-xs">
                  <span className="font-bold text-zinc-950">{turn.speaker}</span>
                  <span className="text-zinc-400">({turn.role})</span>
                </div>
                <p className="font-serif text-sm sm:text-base text-zinc-800 leading-relaxed italic">
                  "{turn.message}"
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mode 2: Partner Theses & Quotes */}
      {viewMode === 'partners' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {COMMITTEE_MEMBERS.map((member) => {
            const data = expertEvaluations[member.id];
            return (
              <div 
                key={member.id} 
                className="document-sheet p-5 sm:p-6 border border-zinc-200 bg-white space-y-3"
              >
                <div className="flex items-start justify-between pb-2 border-b border-zinc-100">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block">
                      {member.roleTitle}
                    </span>
                    <h3 className="font-serif text-lg font-bold text-zinc-950">{member.name}</h3>
                    <p className="text-xs text-zinc-500">{member.title}</p>
                  </div>
                  <span className="px-2 py-0.5 border border-zinc-300 font-mono text-xs font-bold text-zinc-900 bg-zinc-50">
                    VOTE: {data.verdictVote}
                  </span>
                </div>

                <div className="p-3 bg-zinc-50 border border-zinc-200 font-serif text-xs sm:text-sm italic text-zinc-800 leading-relaxed">
                  {data.quote}
                </div>

                <div className="text-xs text-zinc-600 leading-relaxed font-sans">
                  <strong className="text-zinc-900 font-mono uppercase text-[10px] block mb-0.5">Primary Thesis:</strong>
                  {data.primaryThesis}
                </div>

                <div className="pt-2 border-t border-zinc-100 text-xs font-mono text-zinc-500">
                  <span className="text-zinc-900 font-bold block mb-0.5">Scrutiny Question:</span>
                  "{data.hardQuestionsForFounders[0]}"
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
