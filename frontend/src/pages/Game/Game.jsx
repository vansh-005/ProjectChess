import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, SkipBack, ChevronRight, SkipForward, Download, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChessBoardComponent } from '@/components/chess/ChessBoardComponent';
import { EvalBar } from '@/components/chess/EvalBar';
import { MoveList } from '@/components/chess/MoveList';
import { AccuracyStats } from '@/components/chess/AccuracyStats';
import { mockGames, mockGameMoves, mockEvaluation } from '@/api/mockData';

const Game = () => {
  const { id } = useParams();
  const game = mockGames.find(g => g.id === id) || mockGames[0];
  const [currentMoveIndex, setCurrentMoveIndex] = useState(mockGameMoves.length * 2 - 1);

  // TODO: Replace with WebSocket connection
  // useEffect(() => {
  //   const ws = new WebSocket(`ws://...games/${id}`);
  //   ws.onmessage = (event) => {
  //     const data = JSON.parse(event.data);
  //     // Update game state
  //   };
  //   return () => ws.close();
  // }, [id]);

  const handleMoveClick = (moveIndex) => {
    setCurrentMoveIndex(moveIndex);
  };

  const handleFirst = () => setCurrentMoveIndex(0);
  const handlePrevious = () => setCurrentMoveIndex(Math.max(0, currentMoveIndex - 1));
  const handleNext = () => setCurrentMoveIndex(Math.min(mockGameMoves.length * 2 - 1, currentMoveIndex + 1));
  const handleLast = () => setCurrentMoveIndex(mockGameMoves.length * 2 - 1);

  const currentEval = mockEvaluation[Math.min(currentMoveIndex, mockEvaluation.length - 1)]?.score || 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to={`/tournament/${game.tournamentId}`}>
              <Button variant="ghost" size="sm" className="gap-2">
                <ChevronLeft className="h-4 w-4" />
                Back to Tournament
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <Badge variant={game.status === 'live' ? 'default' : 'secondary'} className="gap-1">
                {game.status === 'live' && <div className="h-2 w-2 rounded-full bg-current animate-pulse" />}
                {game.status}
              </Badge>
              <span className="text-sm text-muted-foreground">Round {game.round}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Game Content */}
      <section className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar - Player Info */}
          <div className="lg:col-span-3 space-y-4">
            {/* White Player */}
            <div className="bg-card rounded-lg border border-border p-4">
              <div className="flex items-start gap-3 mb-3">
                <Avatar className="h-12 w-12 border-2 border-primary/20">
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                    {game.whitePlayer.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1 mb-1">
                    {game.whitePlayer.title && (
                      <span className="text-xs font-semibold text-warning">
                        {game.whitePlayer.title}
                      </span>
                    )}
                  </div>
                  <h3 className="text-sm font-semibold text-foreground truncate">
                    {game.whitePlayer.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {game.whitePlayer.rating}
                  </p>
                </div>
              </div>
              {game.status === 'completed' && game.result && (
                <div className="text-center py-2 rounded-lg bg-muted/50">
                  <span className={`text-lg font-bold ${
                    game.result === '1-0' ? 'text-success' : 
                    game.result === '1/2-1/2' ? 'text-muted-foreground' : 
                    'text-destructive'
                  }`}>
                    {game.result === '1-0' ? 'WON' : game.result === '1/2-1/2' ? 'DRAW' : 'LOST'}
                  </span>
                </div>
              )}
              {game.status === 'live' && (
                <div className="text-center py-2 rounded-lg bg-muted/50">
                  <span className="text-sm font-mono text-muted-foreground">
                    {game.whiteTime}
                  </span>
                </div>
              )}
            </div>

            {/* VS Divider */}
            <div className="flex items-center justify-center">
              <div className="px-4 py-2 rounded-lg bg-muted">
                <span className="text-sm font-bold text-foreground">VS</span>
              </div>
            </div>

            {/* Black Player */}
            <div className="bg-card rounded-lg border border-border p-4">
              <div className="flex items-start gap-3 mb-3">
                <Avatar className="h-12 w-12 border-2 border-primary/20">
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                    {game.blackPlayer.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1 mb-1">
                    {game.blackPlayer.title && (
                      <span className="text-xs font-semibold text-warning">
                        {game.blackPlayer.title}
                      </span>
                    )}
                  </div>
                  <h3 className="text-sm font-semibold text-foreground truncate">
                    {game.blackPlayer.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {game.blackPlayer.rating}
                  </p>
                </div>
              </div>
              {game.status === 'completed' && game.result && (
                <div className="text-center py-2 rounded-lg bg-muted/50">
                  <span className={`text-lg font-bold ${
                    game.result === '0-1' ? 'text-success' : 
                    game.result === '1/2-1/2' ? 'text-muted-foreground' : 
                    'text-destructive'
                  }`}>
                    {game.result === '0-1' ? 'WON' : game.result === '1/2-1/2' ? 'DRAW' : 'LOST'}
                  </span>
                </div>
              )}
              {game.status === 'live' && (
                <div className="text-center py-2 rounded-lg bg-muted/50">
                  <span className="text-sm font-mono text-muted-foreground">
                    {game.blackTime}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Center - Chess Board */}
          <div className="lg:col-span-6">
            <div className="bg-card rounded-lg border border-border p-4">
              <div className="flex items-center gap-4 mb-4">
                <EvalBar evaluation={currentEval} height={500} />
                <div className="flex-1">
                  <ChessBoardComponent
                    position={game.currentPosition}
                    disabled={true}
                    boardOrientation="white"
                  />
                </div>
              </div>
              
              {/* Move Controls */}
              <div className="flex items-center justify-center gap-2 mt-4">
                <Button variant="outline" size="icon" onClick={handleFirst}>
                  <SkipBack className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={handlePrevious}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="px-4 py-2 text-sm font-medium text-muted-foreground">
                  Move {Math.floor(currentMoveIndex / 2) + 1}
                </span>
                <Button variant="outline" size="icon" onClick={handleNext}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={handleLast}>
                  <SkipForward className="h-4 w-4" />
                </Button>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-center gap-2 mt-4">
                <Button variant="outline" size="sm" className="gap-2">
                  <Download className="h-4 w-4" />
                  Download PGN
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Share2 className="h-4 w-4" />
                  Share
                </Button>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Analysis */}
          <div className="lg:col-span-3 space-y-4">
            <Tabs defaultValue="moves" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="moves">Moves</TabsTrigger>
                <TabsTrigger value="analysis">Analysis</TabsTrigger>
              </TabsList>
              
              <TabsContent value="moves" className="mt-4">
                <MoveList 
                  moves={mockGameMoves} 
                  currentMove={currentMoveIndex}
                  onMoveClick={handleMoveClick}
                />
              </TabsContent>
              
              <TabsContent value="analysis" className="mt-4 space-y-4">
                <div className="bg-card rounded-lg border border-border p-3">
                  <div className="text-xs text-muted-foreground mb-2">Engine Analysis</div>
                  <div className="text-sm font-medium text-foreground">
                    Depth: 25 | Stockfish 17.1 Lite
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground">
                    Best move: Ng4#
                  </div>
                </div>
                <AccuracyStats 
                  whiteAccuracy={82.2}
                  blackAccuracy={93.4}
                  whiteName={game.whitePlayer.name}
                  blackName={game.blackPlayer.name}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Game;
