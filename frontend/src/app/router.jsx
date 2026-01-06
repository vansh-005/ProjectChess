import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { PageShell } from '@/components/layout/PageShell';

// Pages
import Home from '@/pages/Home/Home';
import Tournament from '@/pages/Tournament/Tournament';
import Game from '@/pages/Game/Game';
import TopPlayers from '@/pages/TopPlayers/TopPlayers';
import Me from '@/pages/Me/Me';

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<PageShell />}>
        <Route index element={<Home />} />
        <Route path="tournament/:id" element={<Tournament />} />
        <Route path="game/:id" element={<Game />} />
        <Route path="top-players" element={<TopPlayers />} />
        <Route path="me" element={<Me />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};
