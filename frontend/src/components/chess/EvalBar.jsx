import React from 'react';
import { Card } from '@/components/ui/card';

export const EvalBar = ({ evaluation = 0, height = 400 }) => {
  // Convert evaluation to percentage (capped at +5/-5 advantage)
  const cappedEval = Math.max(-5, Math.min(5, evaluation));
  const percentage = ((cappedEval + 5) / 10) * 100;

  const getEvalText = () => {
    if (Math.abs(evaluation) >= 10) {
      return evaluation > 0 ? 'M' : '-M'; // Mate
    }
    const formatted = evaluation >= 0 ? `+${evaluation.toFixed(1)}` : evaluation.toFixed(1);
    return formatted;
  };

  return (
    <Card className="relative overflow-hidden" style={{ height: `${height}px`, width: '40px' }}>
      {/* Black advantage (top) */}
      <div 
        className="absolute top-0 left-0 right-0 bg-foreground transition-all duration-300"
        style={{ height: `${100 - percentage}%` }}
      />
      
      {/* White advantage (bottom) */}
      <div 
        className="absolute bottom-0 left-0 right-0 bg-background border-t border-border transition-all duration-300"
        style={{ height: `${percentage}%` }}
      />
      
      {/* Evaluation text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <div className="bg-card border border-border rounded px-1 py-0.5">
          <span className="text-[10px] font-bold text-foreground whitespace-nowrap">
            {getEvalText()}
          </span>
        </div>
      </div>
    </Card>
  );
};
