import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Search, Filter } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { GameCard } from '@/components/cards/GameCard';
import { PlayerCard } from '@/components/cards/PlayerCard';
import { mockTournaments, mockGames, mockPlayers } from '@/api/mockData';

const Tournament = () => {
  const { id } = useParams();
  const tournament = mockTournaments.find(t => t.id === id) || mockTournaments[0];
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRound, setSelectedRound] = useState('all');
  const [onlyActiveGames, setOnlyActiveGames] = useState(false);

  // Filter games based on tournament
  const tournamentGames = mockGames.filter(g => g.tournamentId === tournament.id);
  const filteredGames = tournamentGames.filter(game => {
    if (onlyActiveGames && game.status !== 'live') return false;
    if (selectedRound !== 'all' && game.round.toString() !== selectedRound) return false;
    return true;
  });

  // Mock standings data
  const standings = mockPlayers.slice(0, 8).map((player, index) => ({
    ...player,
    score: 7.5 - index * 0.5,
    gamesPlayed: 8
  }));

  return (
    <div className="min-h-screen bg-background">
      {/* Tournament Header */}
      <section className="bg-gradient-to-br from-card to-muted/30 border-b border-border">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-3">
              <span className="px-3 py-1 rounded-full bg-success/10 text-success text-sm font-semibold">
                {tournament.status === 'live' && '⚫ '}
                {tournament.status.charAt(0).toUpperCase() + tournament.status.slice(1)}
              </span>
              {tournament.status === 'live' && (
                <span className="text-sm text-muted-foreground">
                  Round {tournament.currentRound} of {tournament.rounds}
                </span>
              )}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              {tournament.name}
            </h1>
            <p className="text-lg text-muted-foreground mb-4">
              {tournament.description}
            </p>
            <div className="flex flex-wrap gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Prize Pool: </span>
                <span className="font-semibold text-foreground">{tournament.prizePool}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Players: </span>
                <span className="font-semibold text-foreground">{tournament.participants}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Dates: </span>
                <span className="font-semibold text-foreground">
                  {new Date(tournament.startDate).toLocaleDateString()} - {new Date(tournament.endDate).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tournament Content */}
      <section className="container mx-auto px-4 py-8">
        <Tabs defaultValue="games" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-4 mb-6">
            <TabsTrigger value="home">Home</TabsTrigger>
            <TabsTrigger value="games">Games</TabsTrigger>
            <TabsTrigger value="standings">Standings</TabsTrigger>
            <TabsTrigger value="players">Players</TabsTrigger>
          </TabsList>

          {/* Home Tab */}
          <TabsContent value="home" className="space-y-6">
            <div className="bg-card rounded-lg border border-border p-6">
              <h2 className="text-xl font-bold text-foreground mb-4">Tournament Overview</h2>
              <div className="prose prose-invert max-w-none">
                <p className="text-muted-foreground">
                  {tournament.description}
                </p>
                <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-muted/50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-primary">{tournament.rounds}</div>
                    <div className="text-sm text-muted-foreground">Rounds</div>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-primary">{tournament.participants}</div>
                    <div className="text-sm text-muted-foreground">Players</div>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-primary">{tournament.currentRound}</div>
                    <div className="text-sm text-muted-foreground">Current Round</div>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-primary">{filteredGames.length}</div>
                    <div className="text-sm text-muted-foreground">Active Games</div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Games Tab */}
          <TabsContent value="games" className="space-y-4">
            {/* Search and Filters */}
            <div className="bg-card rounded-lg border border-border p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search games..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Select value={selectedRound} onValueChange={setSelectedRound}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select round" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Rounds</SelectItem>
                    {Array.from({ length: tournament.rounds }, (_, i) => (
                      <SelectItem key={i + 1} value={(i + 1).toString()}>
                        Round {i + 1}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="active-games"
                    checked={onlyActiveGames}
                    onCheckedChange={setOnlyActiveGames}
                  />
                  <Label htmlFor="active-games" className="text-sm cursor-pointer">
                    Only Active Games
                  </Label>
                </div>
              </div>
            </div>

            {/* Games Grid */}
            {filteredGames.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredGames.map((game) => (
                  <GameCard key={game.id} game={game} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-card rounded-lg border border-border">
                <p className="text-muted-foreground">No games found</p>
              </div>
            )}
          </TabsContent>

          {/* Standings Tab */}
          <TabsContent value="standings" className="space-y-4">
            <div className="bg-card rounded-lg border border-border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50 border-b border-border">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">#</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">Player</th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-muted-foreground">Rating</th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-muted-foreground">Played</th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-muted-foreground">Score</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {standings.map((player, index) => (
                      <tr key={player.id} className="hover:bg-muted/30 transition-colors">
                        <td className="px-4 py-3 text-sm font-medium text-foreground">{index + 1}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            {player.title && (
                              <span className="text-xs font-semibold text-warning">{player.title}</span>
                            )}
                            <span className="text-sm font-medium text-foreground">{player.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-center text-sm text-muted-foreground">{player.rating}</td>
                        <td className="px-4 py-3 text-center text-sm text-muted-foreground">{player.gamesPlayed}</td>
                        <td className="px-4 py-3 text-center text-sm font-semibold text-primary">{player.score}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          {/* Players Tab */}
          <TabsContent value="players" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockPlayers.slice(0, 6).map((player) => (
                <PlayerCard key={player.id} player={player} showSubscribe={false} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
};

export default Tournament;
