import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppProviders } from '@/app/providers';
import { AppRouter } from '@/app/router';
import '@/App.css';
import {AuthProvider} from "@/app/providers/AuthProvider";

function App() {
  return (
      <AuthProvider>
      <BrowserRouter>
      <AppProviders>
        <AppRouter />
      </AppProviders>
    </BrowserRouter>
      </AuthProvider>
  );
}

export default App;
