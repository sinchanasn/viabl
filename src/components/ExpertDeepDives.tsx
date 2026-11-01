import React, { useState } from 'react';
import { EvaluationResult } from '../types';
import { COMMITTEE_MEMBERS } from '../services/presets';

interface ExpertDeepDivesProps {
  evaluation: EvaluationResult;
}

export const ExpertDeepDives: React.FC<ExpertDeepDivesProps> = ({ evaluation }) => {
  const [selectedExpertId, setSelectedExpertId] = useState<'vc' | 'founder' | 'cto' | 'marketer'>('vc');

  const selectedMember = COMMITTEE_MEMBERS.find(m => m.id === selectedExpertId)!;
  const expertData = evaluation.expertEvaluations[selectedExpertId];

  return (
    <div id="experts" className="space-y-6">
      <div className="pb-3 border-b border-zinc-200 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 block">
            Individual Audit
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-normal text-zinc-950">
            Partner Due Diligence Deep Dives
          </h2>
        </div>
        <span className="text-xs font-mono text-zinc-500">
          SELECT PARTNER DOSSIER
        </span>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-zinc-200 overflow-x-auto gap-2">
        {COMMITTEE_MEMBERS.map((member) => {
          const isSelected = selectedExpertId === member.id;
          return (
            <button
              key={member.id}
              onClick={() => setSelectedExpertId(member.id)}
              className={`px-4 py-2.5 font-mono text-xs uppercase tracking-wider transition-colors border-b-2 whitespace-nowrap ${
                isSelected
                  ? 'border-zinc-950 font-bold text-zinc-950 bg-zinc-50'
                  : 'border-transparent text-zinc-500 hover:text-zinc-900'
              }`}
            >
              [{member.avatarInitials}] {member.roleTitle} — {member.name}
            </button>
          );
        })}
      </div>

      {/* Main Dossier Sheet */}
      <div className="document-sheet p-6 sm:p-10 border border-zinc-300 bg-white space-y-8">
        {/* Partner Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-zinc-200">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 block">
              DILIGENCE PARTNER PROFILE
            </span>
            <h3 className="font-serif text-2xl font-bold text-zinc-950 mt-1">
              {selectedMember.name}
            </h3>
            <p className="text-xs text-zinc-600 font-mono mt-0.5">
              {selectedMember.title} • {selectedMember.firm}
            </p>
          </div>

          <div className="text-left sm:text-right font-mono text-xs">
            <span className="text-zinc-400 block text-[10px] uppercase">PARTNER VOTE</span>
            <span className="inline-block px-2.5 py-1 border border-zinc-300 bg-zinc-50 font-bold text-zinc-950 mt-1">
              {expertData.verdictVote} ({expertData.stance})
            </span>
          </div>
        </div>

        {/* Detailed Strategic Analysis */}
        <div className="space-y-2">
          <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block">
            Partner Thesis & Diligence Notes
          </span>
          <p className="font-serif text-sm sm:text-base text-zinc-800 leading-relaxed p-4 border border-zinc-200 bg-zinc-50/50">
            {expertData.deepDiveAnalysis}
          </p>
        </div>

        {/* Green Flags vs Red Flags */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 border border-zinc-200 bg-white space-y-3">
            <span className="font-mono text-xs uppercase tracking-wider font-bold text-zinc-900 block pb-2 border-b border-zinc-100">
              Positive Diligence Signals
            </span>
            <ul className="space-y-2 text-xs text-zinc-700 font-sans">
              {expertData.greenFlags.map((flag, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="font-mono text-zinc-400">+</span>
                  <span>{flag}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-5 border border-zinc-200 bg-white space-y-3">
            <span className="font-mono text-xs uppercase tracking-wider font-bold text-zinc-900 block pb-2 border-b border-zinc-100">
              Identified Vulnerability Flags
            </span>
            <ul className="space-y-2 text-xs text-zinc-700 font-sans">
              {expertData.redFlags.map((flag, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="font-mono text-zinc-400">—</span>
                  <span>{flag}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 3 Hard Questions */}
        <div className="p-6 border border-zinc-200 bg-zinc-50/60 space-y-3">
          <span className="font-mono text-xs uppercase tracking-wider font-bold text-zinc-900 block pb-2 border-b border-zinc-200">
            Three Scrutiny Questions {selectedMember.name.split(' ')[0]} Will Ask
          </span>

          <div className="space-y-2.5">
            {expertData.hardQuestionsForFounders.map((question, idx) => (
              <div 
                key={idx}
                className="p-3 border border-zinc-200 bg-white text-xs sm:text-sm font-serif italic text-zinc-900 flex items-start gap-3"
              >
                <span className="font-mono text-xs font-bold text-zinc-400 not-italic">
                  0{idx + 1}.
                </span>
                <span>"{question}"</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
