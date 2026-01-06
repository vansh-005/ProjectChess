import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';

import { useAuth } from '@/app/providers/AuthProvider';
import { getTournaments } from '@/api/tournaments.api';
import {
    getUserSubscriptions,
    subscribeToTournament,
    unsubscribeFromTournament,
} from '@/api/subscriptions.api';

const PAGE_SIZE = 9;

const Tournaments = () => {
    const navigate = useNavigate();
    const { token, user } = useAuth();

    const [tournaments, setTournaments] = useState([]);
    const [subscriptions, setSubscriptions] = useState([]);
    const [subscribedTournamentIds, setSubscribedTournamentIds] = useState(
        new Set()
    );

    const [stateFilter, setStateFilter] = useState('LIVE');
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);

    /* -------------------- FETCH TOURNAMENTS -------------------- */

    useEffect(() => {
        fetchTournaments();
    }, [stateFilter, page]);

    const fetchTournaments = async () => {
        setLoading(true);
        try {
            const data = await getTournaments({
                state: stateFilter,
                page,
                size: PAGE_SIZE,
                token,
            });

            setTournaments(data.content || []);
            setTotalPages(data.totalPages || 0);
        } catch (err) {
            console.error('Failed to load tournaments', err);
        } finally {
            setLoading(false);
        }
    };

    /* -------------------- FETCH SUBSCRIPTIONS -------------------- */

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

            const set = new Set(
                subs
                    .filter(s => s.targetType === 'TOURNAMENT')
                    .map(s => s.targetId)
            );

            setSubscribedTournamentIds(set);
        } catch (err) {
            console.error('Failed to load subscriptions', err);
        }
    };

    /* -------------------- SUBSCRIBE / UNSUBSCRIBE -------------------- */

    const handleToggleSubscribe = async (tournament) => {
        if (!user || !token) return;

        const isSubscribed = subscribedTournamentIds.has(tournament.lichessId);

        try {
            if (!isSubscribed) {
                // SUBSCRIBE
                const sub = await subscribeToTournament({
                    username: user.username,
                    targetId: tournament.lichessId,
                    token,
                });

                setSubscriptions(prev => [...prev, sub]);
                setSubscribedTournamentIds(prev => {
                    const copy = new Set(prev);
                    copy.add(tournament.lichessId);
                    return copy;
                });
            } else {
                // UNSUBSCRIBE
                const existingSub = subscriptions.find(
                    s => s.targetId === tournament.lichessId
                );

                if (!existingSub) return;

                await unsubscribeFromTournament({
                    username: user.username,
                    subscriptionId: existingSub.id,
                    token,
                });

                setSubscriptions(prev =>
                    prev.filter(s => s.id !== existingSub.id)
                );

                setSubscribedTournamentIds(prev => {
                    const copy = new Set(prev);
                    copy.delete(tournament.lichessId);
                    return copy;
                });
            }
        } catch (err) {
            console.error('Failed to toggle subscription', err);
        }
    };

    /* -------------------- RENDER -------------------- */

    return (
        <div className="min-h-screen bg-background">
            <section className="container mx-auto px-4 py-8 space-y-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold">Tournaments</h1>
                        <p className="text-muted-foreground">
                            Browse live, upcoming, and completed tournaments
                        </p>
                    </div>

                    {/* Search */}
                    <div className="relative w-full md:w-72">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search tournaments..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-9"
                        />
                    </div>
                </div>

                {/* Tabs */}
                <Tabs
                    value={stateFilter}
                    onValueChange={(val) => {
                        setPage(0);
                        setStateFilter(val);
                    }}
                >
                    <TabsList>
                        <TabsTrigger value="LIVE">Live</TabsTrigger>
                        <TabsTrigger value="UPCOMING">Upcoming</TabsTrigger>
                        <TabsTrigger value="COMPLETED">Completed</TabsTrigger>
                    </TabsList>
                </Tabs>

                {/* Content */}
                {loading ? (
                    <div className="text-center py-16 text-muted-foreground">
                        Loading tournaments...
                    </div>
                ) : tournaments.length === 0 ? (
                    <div className="text-center py-16 text-muted-foreground">
                        No tournaments found
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {tournaments.map((t) => {
                            const isSubscribed =
                                subscribedTournamentIds.has(t.lichessId);

                            return (
                                <Card
                                    key={t.id}
                                    className="cursor-pointer transition-all hover:shadow-lg hover:border-primary/50"
                                    onClick={() =>
                                        navigate(`/tournament/${t.lichessId}`)
                                    }
                                >
                                    <CardContent className="p-4 space-y-3 relative">
                                        {/* Subscribe Button */}
                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            className={`absolute top-3 right-3 ${
                                                isSubscribed
                                                    ? 'text-primary'
                                                    : 'text-muted-foreground'
                                            }`}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleToggleSubscribe(t);
                                            }}
                                        >
                                            <Bell
                                                className={`h-4 w-4 ${
                                                    isSubscribed ? 'fill-primary' : ''
                                                }`}
                                            />
                                        </Button>

                                        {/* Image */}
                                        {t.imageUrl && (
                                            <img
                                                src={t.imageUrl}
                                                alt={t.name}
                                                className="w-full h-40 object-cover rounded-md"
                                            />
                                        )}

                                        {/* Title */}
                                        <div>
                                            <h3 className="font-semibold text-lg line-clamp-2">
                                                {t.name}
                                            </h3>
                                            <p className="text-sm text-muted-foreground">
                                                {t.format} • {t.timeControl}
                                            </p>
                                        </div>

                                        {/* Meta */}
                                        <div className="flex items-center justify-between">
                                            <Badge variant="secondary">{t.state}</Badge>
                                            <span className="text-xs text-muted-foreground">
                        {new Date(t.startsAt).toLocaleString()}
                      </span>
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2 pt-6">
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={page === 0}
                            onClick={() => setPage(p => p - 1)}
                        >
                            Previous
                        </Button>

                        <span className="text-sm text-muted-foreground">
              Page {page + 1} of {totalPages}
            </span>

                        <Button
                            variant="outline"
                            size="sm"
                            disabled={page + 1 >= totalPages}
                            onClick={() => setPage(p => p + 1)}
                        >
                            Next
                        </Button>
                    </div>
                )}
            </section>
        </div>
    );
};

export default Tournaments;
