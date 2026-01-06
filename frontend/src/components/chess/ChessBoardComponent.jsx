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
    return (
        <div className="w-full aspect-square">
            <Chessboard
                position={position}
                onPieceDrop={onPieceDrop}
                boardOrientation={boardOrientation}
                showBoardNotation={showNotation}
                arePiecesDraggable={!disabled}
                animationDuration={300}
                customSquareStyles={customSquareStyles}
                boardStyle={{
                    borderRadius: '8px',
                    boxShadow:
                        '0 4px 6px -1px rgb(0 0 0 / 0.35), 0 2px 4px -2px rgb(0 0 0 / 0.35)'
                }}
                options={{
                    lightSquareStyle: {
                        backgroundColor: '#EBECD0'
                    },
                    darkSquareStyle: {
                        backgroundColor: '#739552'
                    }
                }}
            />

        </div>
    );
};
