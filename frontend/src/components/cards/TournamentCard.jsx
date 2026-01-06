import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users, Trophy, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export const TournamentCard = ({ tournament, variant = 'default' }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'live':
        return 'bg-success text-success-foreground';
      case 'upcoming':
        return 'bg-warning text-warning-foreground';
      case 'completed':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-primary text-primary-foreground';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  if (variant === 'compact') {
    return (
      <Link to={`/tournament/${tournament.id}`}>
        <div className="group relative overflow-hidden rounded-lg bg-card border border-border p-4 transition-all duration-smooth hover:border-primary/50 hover:shadow-md">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <Badge className={getStatusColor(tournament.status)} size="sm">
                  {tournament.status}
                </Badge>
              </div>
              <h3 className="text-sm font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                {tournament.name}
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                {formatDate(tournament.startDate)} - {formatDate(tournament.endDate)}
              </p>
            </div>
            <Trophy className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Card className="group overflow-hidden transition-all duration-smooth hover:shadow-lg card-hover">
      <CardHeader className="space-y-2">
        <div className="flex items-center justify-between">
          <Badge className={getStatusColor(tournament.status)}>
            {tournament.status === 'live' ? '⚫ Live' : tournament.status}
          </Badge>
          {tournament.status === 'live' && (
            <div className="flex items-center gap-1 text-success">
              <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
              <span className="text-xs font-medium">Round {tournament.currentRound}</span>
            </div>
          )}
        </div>
        <CardTitle className="text-xl group-hover:text-primary transition-colors">
          {tournament.name}
        </CardTitle>
        <CardDescription className="line-clamp-2">
          {tournament.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">
              {formatDate(tournament.startDate)}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">
              {tournament.participants} players
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Trophy className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">
              {tournament.prizePool}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">
              {tournament.rounds} rounds
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <Link to={`/tournament/${tournament.id}`} className="w-full">
          <Button className="w-full" variant="outline">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
