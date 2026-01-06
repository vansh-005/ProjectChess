import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const TournamentCardLive = ({
                                tournament,
                                isSubscribed = false,
                                onToggleSubscribe,
                            }) => {
    const navigate = useNavigate();

    return (
        <Card
            className="cursor-pointer transition-all hover:shadow-lg hover:border-primary/50"
            onClick={() => navigate(`/tournament/${tournament.lichessId}`)}
        >
            <CardContent className="p-4 space-y-3 relative">
                {/* Subscribe */}
                <Button
                    size="icon"
                    variant="ghost"
                    className={`absolute top-3 right-3 ${
                        isSubscribed ? 'text-primary' : 'text-muted-foreground'
                    }`}
                    onClick={(e) => {
                        e.stopPropagation();
                        onToggleSubscribe?.(tournament);
                    }}
                >
                    <Bell className={`h-4 w-4 ${isSubscribed ? 'fill-primary' : ''}`} />
                </Button>

                {/* Image */}
                {tournament.imageUrl && (
                    <img
                        src={tournament.imageUrl}
                        alt={tournament.name}
                        className="w-full h-40 object-cover rounded-md"
                    />
                )}

                {/* Title */}
                <div>
                    <h3 className="font-semibold text-lg line-clamp-2">
                        {tournament.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                        {tournament.format} • {tournament.timeControl}
                    </p>
                </div>

                {/* Meta */}
                <div className="flex items-center justify-between">
                    <Badge variant="secondary">{tournament.state}</Badge>
                    <span className="text-xs text-muted-foreground">
            {new Date(tournament.startsAt).toLocaleString()}
          </span>
                </div>
            </CardContent>
        </Card>
    );
};

export default TournamentCardLive;
