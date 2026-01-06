import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { PlayerCard } from '@/components/cards/PlayerCard';
import { mockPlayers } from '@/api/mockData';

const TopPlayers = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // TODO: Replace with actual API call with debounce
  // const { data: players, isLoading } = useQuery({
  //   queryKey: ['players', searchQuery],
  //   queryFn: () => apiClient.get('/players', { params: { search: searchQuery } })
  // });

  const filteredPlayers = mockPlayers.filter(player => 
    player.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    player.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-to-br from-card to-muted/30 border-b border-border">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Top Chess Players
            </h1>
            <p className="text-lg text-muted-foreground">
              Subscribe to your favorite players and get notified of their games
            </p>
          </div>
        </div>
      </section>

      {/* Search and Players */}
      <section className="container mx-auto px-4 py-8">
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search players by name or username..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 text-base"
            />
          </div>
        </div>

        {/* Players Grid */}
        {filteredPlayers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredPlayers.map((player) => (
              <PlayerCard key={player.id} player={player} showSubscribe={true} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">No players found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search query
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default TopPlayers;
