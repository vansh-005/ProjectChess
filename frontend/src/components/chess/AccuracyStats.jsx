import React from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export const AccuracyStats = ({ whiteAccuracy = 0, blackAccuracy = 0, whiteName, blackName }) => {
  const getAccuracyColor = (accuracy) => {
    if (accuracy >= 90) return 'text-success';
    if (accuracy >= 75) return 'text-primary';
    if (accuracy >= 60) return 'text-warning';
    return 'text-destructive';
  };

  const getProgressColor = (accuracy) => {
    if (accuracy >= 90) return 'bg-success';
    if (accuracy >= 75) return 'bg-primary';
    if (accuracy >= 60) return 'bg-warning';
    return 'bg-destructive';
  };

  return (
    <Card className="p-4">
      <h3 className="text-sm font-semibold text-foreground mb-3">Accuracy</h3>
      
      <div className="space-y-4">
        {/* White Accuracy */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground">
              {whiteName || 'White'}
            </span>
            <span className={`text-lg font-bold ${getAccuracyColor(whiteAccuracy)}`}>
              {whiteAccuracy.toFixed(1)}%
            </span>
          </div>
          <div className="relative h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className={`absolute h-full ${getProgressColor(whiteAccuracy)} transition-all duration-300`}
              style={{ width: `${whiteAccuracy}%` }}
            />
          </div>
        </div>

        {/* Black Accuracy */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground">
              {blackName || 'Black'}
            </span>
            <span className={`text-lg font-bold ${getAccuracyColor(blackAccuracy)}`}>
              {blackAccuracy.toFixed(1)}%
            </span>
          </div>
          <div className="relative h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className={`absolute h-full ${getProgressColor(blackAccuracy)} transition-all duration-300`}
              style={{ width: `${blackAccuracy}%` }}
            />
          </div>
        </div>
      </div>
    </Card>
  );
};
