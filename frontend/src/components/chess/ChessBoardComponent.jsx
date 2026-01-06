import React from 'react';
import { Chessboard } from 'react-chessboard';

export const ChessBoardComponent = ({ 
  position = 'start', 
  onPieceDrop,
  boardOrientation = 'white',
  customSquareStyles = {},
  showNotation = true,
  disabled = false
}) => {
  // Chess.com inspired board styling
  const boardStyle = {
    borderRadius: '8px',
    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.35), 0 2px 4px -2px rgb(0 0 0 / 0.35)'
  };

  const darkSquareStyle = {
    backgroundColor: 'hsl(92, 18%, 42%)' // Chess dark green
  };

  const lightSquareStyle = {
    backgroundColor: 'hsl(92, 35%, 68%)' // Chess light green
  };

  return (
    <div className="w-full aspect-square">
      <Chessboard
        position={position}
        onPieceDrop={onPieceDrop}
        boardOrientation={boardOrientation}
        customBoardStyle={boardStyle}
        customDarkSquareStyle={darkSquareStyle}
        customLightSquareStyle={lightSquareStyle}
        customSquareStyles={customSquareStyles}
        showBoardNotation={showNotation}
        arePiecesDraggable={!disabled}
        animationDuration={300}
      />
    </div>
  );
};
