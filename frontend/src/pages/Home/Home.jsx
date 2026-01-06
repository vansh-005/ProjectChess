import React from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Zap, Newspaper, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TournamentCard } from '@/components/cards/TournamentCard';
import { GameCard } from '@/components/cards/GameCard';
import { mockTournaments, mockGames, mockNews } from '@/api/mockData';

const Home = () => {
  const liveTournaments = mockTournaments.filter(t => t.status === 'live');
  const upcomingTournaments = mockTournaments.filter(t => t.status === 'upcoming');
  const liveGames = mockGames.filter(g => g.status === 'live');

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/20">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="container relative mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Trophy className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Live Chess Tournaments</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Watch the World's Best
              <span className="text-gradient block mt-2">Play Chess Live</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Follow elite tournaments, get real-time notifications for exciting moves, and never miss a brilliant game.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link to="/tournament/1">
                <Button size="lg" className="gap-2">
                  <Trophy className="h-5 w-5" />
                  View Tournaments
                </Button>
              </Link>
              <Link to="/top-players">
                <Button size="lg" variant="outline" className="gap-2">
                  <Zap className="h-5 w-5" />
                  Top Players
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Live Games Section */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">Top Games Happening Now</h2>
              <p className="text-muted-foreground mt-1">Watch the most exciting matches live</p>
            </div>
            <div className="flex items-center gap-2 text-success">
              <div className="h-3 w-3 rounded-full bg-success animate-pulse" />
              <span className="text-sm font-medium">{liveGames.length} Live</span>
            </div>
          </div>
          
          {liveGames.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {liveGames.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-card rounded-lg border border-border">
              <p className="text-muted-foreground">No live games at the moment</p>
            </div>
          )}
        </div>
      </section>

      {/* Live Tournaments */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">Live Tournaments</h2>
              <p className="text-muted-foreground mt-1">Currently ongoing competitions</p>
            </div>
            <Link to="/tournament/1">
              <Button variant="ghost" className="gap-2">
                View All
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {liveTournaments.map((tournament) => (
              <TournamentCard key={tournament.id} tournament={tournament} />
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Tournaments */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">Upcoming Tournaments</h2>
              <p className="text-muted-foreground mt-1">Subscribe for notifications</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {upcomingTournaments.map((tournament) => (
              <TournamentCard key={tournament.id} tournament={tournament} variant="compact" />
            ))}
          </div>
        </div>
      </section>

      {/* Chess News */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-6">
            <Newspaper className="h-6 w-6 text-primary" />
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">Chess News</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockNews.map((news) => (
              <div
                key={news.id}
                className="group bg-card rounded-lg border border-border p-6 transition-all duration-smooth hover:shadow-lg hover:border-primary/50"
              >
                <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
                  {news.title}
                </h3>
                <p className="text-muted-foreground mb-4">{news.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {new Date(news.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                  <Button variant="ghost" size="sm" className="gap-2">
                    Read More
                    <ArrowRight className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
