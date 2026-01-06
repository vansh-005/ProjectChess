import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Eye } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export const GameCard = ({ game, showTournament = false }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'live':
        return 'bg-success text-success-foreground';
      case 'completed':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-primary text-primary-foreground';
    }
  };

  const getResultColor = (result, playerColor) => {
    if (!result) return '';
    if (result === '1/2-1/2') return 'text-muted-foreground';
    if ((result === '1-0' && playerColor === 'white') || (result === '0-1' && playerColor === 'black')) {
      return 'text-success';
    }
    return 'text-destructive';
  };

  const getResultText = (result, playerColor) => {
    if (!result) return '';
    if (result === '1/2-1/2') return 'Draw';
    if ((result === '1-0' && playerColor === 'white') || (result === '0-1' && playerColor === 'black')) {
      return 'Won';
    }
    return 'Lost';
  };

  return (
    <Link to={`/game/${game.id}`}>
      <Card className="group overflow-hidden transition-all duration-smooth hover:shadow-lg hover:border-primary/50">
        <div className="p-4 space-y-3">
          {/* Header */}
          <div className="flex items-center justify-between">
            <Badge className={getStatusColor(game.status)} size="sm">
              {game.status === 'live' && <div className="mr-1 h-2 w-2 rounded-full bg-current animate-pulse" />}
              {game.status}
            </Badge>
            <span className="text-xs text-muted-foreground">Round {game.round}</span>
          </div>

          {/* White Player */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <Avatar className="h-8 w-8 border border-border">
                <AvatarFallback className="bg-muted text-xs font-semibold">
                  {game.whitePlayer.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1">
                  {game.whitePlayer.title && (
                    <span className="text-xs font-semibold text-warning">
                      {game.whitePlayer.title}
                    </span>
                  )}
                  <span className="text-sm font-medium truncate">
                    {game.whitePlayer.name}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {game.whitePlayer.rating}
                </span>
              </div>
            </div>
            <div className="flex flex-col items-end">
              {game.status === 'completed' && game.result && (
                <span className={`text-xs font-semibold ${getResultColor(game.result, 'white')}`}>
                  {getResultText(game.result, 'white')}
                </span>
              )}
              {game.status === 'live' && (
                <span className="text-xs font-mono text-muted-foreground">
                  {game.whiteTime}
                </span>
              )}
            </div>
          </div>

          {/* VS Divider */}
          <div className="flex items-center gap-2">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs font-semibold text-muted-foreground">VS</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          {/* Black Player */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <Avatar className="h-8 w-8 border border-border">
                <AvatarFallback className="bg-muted text-xs font-semibold">
                  {game.blackPlayer.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1">
                  {game.blackPlayer.title && (
                    <span className="text-xs font-semibold text-warning">
                      {game.blackPlayer.title}
                    </span>
                  )}
                  <span className="text-sm font-medium truncate">
                    {game.blackPlayer.name}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {game.blackPlayer.rating}
                </span>
              </div>
            </div>
            <div className="flex flex-col items-end">
              {game.status === 'completed' && game.result && (
                <span className={`text-xs font-semibold ${getResultColor(game.result, 'black')}`}>
                  {getResultText(game.result, 'black')}
                </span>
              )}
              {game.status === 'live' && (
                <span className="text-xs font-mono text-muted-foreground">
                  {game.blackTime}
                </span>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-2 border-t border-border">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span>Move {game.moveCount}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-primary group-hover:text-primary/80 transition-colors">
              <Eye className="h-3 w-3" />
              <span>Watch</span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};
