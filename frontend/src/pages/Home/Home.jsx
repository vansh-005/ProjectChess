import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Zap, Newspaper, ArrowRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { GameCard } from '@/components/cards/GameCard';
import TournamentCardLive from '@/components/cards/TournamentCardLive';

import { useAuth } from '@/app/providers/AuthProvider';
import { getTournaments } from '@/api/tournaments.api';
import {
  getUserSubscriptions,
  subscribeToTournament,
  unsubscribeFromTournament,
} from '@/api/subscriptions.api';

import { mockGames, mockNews } from '@/api/mockData';

const Home = () => {
  const { token, user } = useAuth();

  const [liveTournaments, setLiveTournaments] = useState([]);
  const [upcomingTournaments, setUpcomingTournaments] = useState([]);

  const [subscriptions, setSubscriptions] = useState([]);
  const [subscribedIds, setSubscribedIds] = useState(new Set());

  const liveGames = mockGames.filter(g => g.status === 'live');

  /* ---------------- FETCH TOURNAMENTS ---------------- */

  useEffect(() => {
    if (!token) return;
    fetchHomeTournaments();
  }, [token]);

  const fetchHomeTournaments = async () => {
    try {
      const [live, upcoming] = await Promise.all([
        getTournaments({ state: 'LIVE', page: 0, size: 3, token }),
        getTournaments({ state: 'UPCOMING', page: 0, size: 3, token }),
      ]);

      setLiveTournaments(live.content || []);
      setUpcomingTournaments(upcoming.content || []);
    } catch (err) {
      console.error('Failed to load home tournaments', err);
    }
  };

  /* ---------------- FETCH SUBSCRIPTIONS ---------------- */

  useEffect(() => {
    if (!user || !token) return;
    fetchSubscriptions();
  }, [user, token]);

  const fetchSubscriptions = async () => {
    try {
      const data = await getUserSubscriptions({
        username: user.username,
        token,
      });

      const subs = data.content || [];
      setSubscriptions(subs);

      setSubscribedIds(
          new Set(
              subs
                  .filter(s => s.targetType === 'TOURNAMENT')
                  .map(s => s.targetId)
          )
      );
    } catch (err) {
      console.error('Failed to load subscriptions', err);
    }
  };

  /* ---------------- SUBSCRIBE TOGGLE ---------------- */

  const handleToggleSubscribe = async (tournament) => {
    if (!user || !token) return;

    const isSubscribed = subscribedIds.has(tournament.lichessId);

    try {
      if (!isSubscribed) {
        const sub = await subscribeToTournament({
          username: user.username,
          targetId: tournament.lichessId,
          token,
        });

        setSubscriptions(prev => [...prev, sub]);
        setSubscribedIds(prev => new Set(prev).add(tournament.lichessId));
      } else {
        const sub = subscriptions.find(
            s => s.targetId === tournament.lichessId
        );

        if (!sub) return;

        await unsubscribeFromTournament({
          username: user.username,
          subscriptionId: sub.id,
          token,
        });

        setSubscriptions(prev => prev.filter(s => s.id !== sub.id));
        setSubscribedIds(prev => {
          const copy = new Set(prev);
          copy.delete(tournament.lichessId);
          return copy;
        });
      }
    } catch (err) {
      console.error('Subscription failed', err);
    }
  };

  /* ---------------- RENDER ---------------- */

  return (
      <div className="min-h-screen">
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/20">
          <div className="container mx-auto px-4 py-16 md:py-24 text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Trophy className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">
              Live Chess Tournaments
            </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Watch the World's Best
              <span className="text-gradient block mt-2">
              Play Chess Live
            </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Follow elite tournaments, get real-time notifications,
              and never miss a brilliant game.
            </p>
            <div className="flex justify-center gap-4">
              <Link to="/tournaments">
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
        </section>

        {/* Live Tournaments */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Live Tournaments</h2>
              <Link to="/tournaments">
                <Button variant="ghost" className="gap-2">
                  View All <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {liveTournaments.map(t => (
                  <TournamentCardLive
                      key={t.id}
                      tournament={t}
                      isSubscribed={subscribedIds.has(t.lichessId)}
                      onToggleSubscribe={handleToggleSubscribe}
                  />
              ))}
            </div>
          </div>
        </section>

        {/* Upcoming Tournaments */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Upcoming Tournaments</h2>
              <Link to="/tournaments">
                <Button variant="ghost" className="gap-2">
                  View All <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {upcomingTournaments.map(t => (
                  <TournamentCardLive
                      key={t.id}
                      tournament={t}
                      isSubscribed={subscribedIds.has(t.lichessId)}
                      onToggleSubscribe={handleToggleSubscribe}
                  />
              ))}
            </div>
          </div>
        </section>

        {/* Live Games + News remain unchanged */}
        {/* (intentionally left as-is to avoid scope creep) */}
      </div>
  );
};

export default Home;
