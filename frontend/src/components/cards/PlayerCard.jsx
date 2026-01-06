import React, { useState } from 'react';
import { Bell, BellOff, TrendingUp } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

export const PlayerCard = ({ player, showSubscribe = true }) => {
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // TODO: Replace with actual API call
    // await apiClient.post(`/players/${player.id}/subscribe`);
    
    setIsSubscribed(!isSubscribed);
    toast.success(
      isSubscribed
        ? `Unsubscribed from ${player.name}'s games`
        : `Subscribed to ${player.name}'s games`
    );
  };

  const getWinRate = () => {
    const total = player.gamesPlayed;
    if (total === 0) return 0;
    return ((player.wins / total) * 100).toFixed(1);
  };

  return (
    <Card className="group overflow-hidden transition-all duration-smooth hover:shadow-lg hover:border-primary/50">
      <div className="p-4">
        <div className="flex items-start justify-between gap-4">
          {/* Player Info */}
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <Avatar className="h-12 w-12 border-2 border-primary/20">
              <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                {player.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                {player.title && (
                  <Badge variant="secondary" className="text-xs font-semibold bg-warning/10 text-warning border-warning/20">
                    {player.title}
                  </Badge>
                )}
                <span className="text-xs text-muted-foreground">#{player.rank}</span>
              </div>
              <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                {player.name}
              </h3>
              <p className="text-sm text-muted-foreground">@{player.username}</p>
            </div>
          </div>

          {/* Subscribe Button */}
          {showSubscribe && (
            <Button
              variant={isSubscribed ? 'outline' : 'default'}
              size="icon"
              onClick={handleSubscribe}
              className="shrink-0"
            >
              {isSubscribed ? (
                <BellOff className="h-4 w-4" />
              ) : (
                <Bell className="h-4 w-4" />
              )}
            </Button>
          )}
        </div>

        {/* Stats */}
        <div className="mt-4 grid grid-cols-3 gap-3">
          <div className="text-center p-2 rounded-lg bg-muted/50">
            <div className="text-lg font-bold text-primary">{player.rating}</div>
            <div className="text-xs text-muted-foreground">Rating</div>
          </div>
          <div className="text-center p-2 rounded-lg bg-muted/50">
            <div className="text-lg font-bold text-foreground">{player.gamesPlayed}</div>
            <div className="text-xs text-muted-foreground">Games</div>
          </div>
          <div className="text-center p-2 rounded-lg bg-muted/50">
            <div className="text-lg font-bold text-success flex items-center justify-center gap-1">
              {getWinRate()}%
              <TrendingUp className="h-3 w-3" />
            </div>
            <div className="text-xs text-muted-foreground">Win Rate</div>
          </div>
        </div>

        {/* W/D/L Stats */}
        <div className="mt-3 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1">
            <span className="text-muted-foreground">W:</span>
            <span className="font-semibold text-success">{player.wins}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-muted-foreground">D:</span>
            <span className="font-semibold text-muted-foreground">{player.draws}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-muted-foreground">L:</span>
            <span className="font-semibold text-destructive">{player.losses}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
