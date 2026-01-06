import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Mail } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border bg-card mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent">
                <span className="text-lg font-bold text-primary-foreground">♔</span>
              </div>
              <span className="text-lg font-bold text-foreground">ChessHub</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Your ultimate platform for chess tournaments, games, and live updates.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/tournament/1" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Tournaments
                </Link>
              </li>
              <li>
                <Link to="/top-players" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Top Players
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Connect</h3>
            <div className="flex space-x-3">
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted hover:bg-primary/10 hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted hover:bg-primary/10 hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted hover:bg-primary/10 hover:text-primary transition-colors"
                aria-label="Email"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border">
          <p className="text-center text-sm text-muted-foreground">
            © {currentYear} ChessHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
