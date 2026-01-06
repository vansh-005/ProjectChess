import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';

export const MoveList = ({ moves = [], currentMove = null, onMoveClick }) => {
  const getMoveClass = (moveIndex) => {
    const isCurrentMove = currentMove === moveIndex;
    return `px-2 py-1 rounded text-sm ${
      isCurrentMove 
        ? 'bg-primary text-primary-foreground font-semibold' 
        : 'hover:bg-muted/50 cursor-pointer'
    } transition-colors`;
  };

  return (
    <Card className="p-3">
      <div className="mb-2 pb-2 border-b border-border">
        <h3 className="text-sm font-semibold text-foreground">Moves</h3>
      </div>
      <ScrollArea className="h-[300px]">
        <div className="space-y-1">
          {moves.map((move, index) => (
            <div 
              key={index} 
              className="grid grid-cols-[30px_1fr_1fr] gap-2 items-center"
            >
              <span className="text-xs text-muted-foreground font-semibold">
                {move.number}.
              </span>
              <button
                className={getMoveClass(index * 2)}
                onClick={() => onMoveClick && onMoveClick(index * 2)}
              >
                {move.white}
              </button>
              {move.black && (
                <button
                  className={getMoveClass(index * 2 + 1)}
                  onClick={() => onMoveClick && onMoveClick(index * 2 + 1)}
                >
                  {move.black}
                </button>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};
