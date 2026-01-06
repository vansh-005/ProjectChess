import React, { useState } from 'react';
import { User, Bell, Settings, Save } from 'lucide-react';
import { useAuth } from '@/app/providers';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

const Me = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
  });
  
  const [notifications, setNotifications] = useState({
    gameStart: true,
    significantMoves: true,
    gameEnd: true,
    tournamentUpdates: true,
    playerSubscriptions: true,
  });

  const handleSaveProfile = () => {
    // TODO: Replace with actual API call
    // await apiClient.put('/users/me', formData);
    
    updateUser(formData);
    setIsEditing(false);
    toast.success('Profile updated successfully');
  };

  const handleNotificationChange = (key, value) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
    // TODO: Save to backend
    // await apiClient.put('/users/me/notifications', { [key]: value });
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">Please log in</h2>
          <p className="text-muted-foreground">You need to be logged in to view this page</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-to-br from-card to-muted/30 border-b border-border">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-start gap-6">
            <Avatar className="h-20 w-20 border-4 border-primary/20">
              <AvatarFallback className="bg-primary/10 text-primary font-bold text-2xl">
                {user.username.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-3xl font-bold text-foreground">{user.username}</h1>
                <Badge variant="secondary" className="bg-warning/10 text-warning border-warning/20">
                  {user.title}
                </Badge>
              </div>
              <p className="text-muted-foreground mb-2">{user.email}</p>
              <div className="flex items-center gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Rating: </span>
                  <span className="font-semibold text-primary">{user.rating}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Country: </span>
                  <span className="font-semibold text-foreground">{user.country}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="container mx-auto px-4 py-8">
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="profile" className="gap-2">
              <User className="h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2">
              <Bell className="h-4 w-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="subscriptions" className="gap-2">
              <Settings className="h-4 w-4" />
              Subscriptions
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your account details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rating">Rating</Label>
                  <Input
                    id="rating"
                    value={user.rating}
                    disabled
                    className="bg-muted"
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  {isEditing ? (
                    <>
                      <Button onClick={handleSaveProfile} className="gap-2">
                        <Save className="h-4 w-4" />
                        Save Changes
                      </Button>
                      <Button variant="outline" onClick={() => setIsEditing(false)}>
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <Button onClick={() => setIsEditing(true)} variant="outline">
                      Edit Profile
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Choose what notifications you want to receive
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-border">
                  <div className="space-y-0.5">
                    <Label htmlFor="game-start" className="cursor-pointer">
                      Game Start Notifications
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified when subscribed games begin
                    </p>
                  </div>
                  <Switch
                    id="game-start"
                    checked={notifications.gameStart}
                    onCheckedChange={(checked) => handleNotificationChange('gameStart', checked)}
                  />
                </div>

                <div className="flex items-center justify-between py-3 border-b border-border">
                  <div className="space-y-0.5">
                    <Label htmlFor="sig-moves" className="cursor-pointer">
                      Significant Moves
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Brilliant moves, blunders, and critical positions
                    </p>
                  </div>
                  <Switch
                    id="sig-moves"
                    checked={notifications.significantMoves}
                    onCheckedChange={(checked) => handleNotificationChange('significantMoves', checked)}
                  />
                </div>

                <div className="flex items-center justify-between py-3 border-b border-border">
                  <div className="space-y-0.5">
                    <Label htmlFor="game-end" className="cursor-pointer">
                      Game End Results
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Final results of subscribed games
                    </p>
                  </div>
                  <Switch
                    id="game-end"
                    checked={notifications.gameEnd}
                    onCheckedChange={(checked) => handleNotificationChange('gameEnd', checked)}
                  />
                </div>

                <div className="flex items-center justify-between py-3 border-b border-border">
                  <div className="space-y-0.5">
                    <Label htmlFor="tournament" className="cursor-pointer">
                      Tournament Updates
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Updates about subscribed tournaments
                    </p>
                  </div>
                  <Switch
                    id="tournament"
                    checked={notifications.tournamentUpdates}
                    onCheckedChange={(checked) => handleNotificationChange('tournamentUpdates', checked)}
                  />
                </div>

                <div className="flex items-center justify-between py-3">
                  <div className="space-y-0.5">
                    <Label htmlFor="players" className="cursor-pointer">
                      Player Subscriptions
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Notifications from subscribed players
                    </p>
                  </div>
                  <Switch
                    id="players"
                    checked={notifications.playerSubscriptions}
                    onCheckedChange={(checked) => handleNotificationChange('playerSubscriptions', checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Subscriptions Tab */}
          <TabsContent value="subscriptions" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Manage Subscriptions</CardTitle>
                <CardDescription>
                  View and manage your tournament and player subscriptions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <p className="text-muted-foreground">You don't have any active subscriptions</p>
                  <Button variant="outline" className="mt-4">Browse Players</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
};

export default Me;
