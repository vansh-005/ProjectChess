// Mock data for frontend development
// TODO: Replace with actual API calls when backend is ready

export const mockTournaments = [
  {
    id: '1',
    name: 'World Chess Championship 2024',
    description: 'The ultimate chess competition featuring the world\'s top players',
    startDate: '2024-03-01',
    endDate: '2024-03-15',
    status: 'live',
    rounds: 11,
    currentRound: 5,
    participants: 16,
    prizePool: '$500,000'
  },
  {
    id: '2',
    name: 'Speed Chess Championship',
    description: 'Fast-paced blitz and bullet games',
    startDate: '2024-02-10',
    endDate: '2024-02-25',
    status: 'live',
    rounds: 9,
    currentRound: 7,
    participants: 32,
    prizePool: '$200,000'
  },
  {
    id: '3',
    name: 'Grand Swiss Tournament',
    description: 'Swiss-system tournament with elite players',
    startDate: '2024-04-01',
    endDate: '2024-04-14',
    status: 'upcoming',
    rounds: 11,
    currentRound: 0,
    participants: 64,
    prizePool: '$350,000'
  }
];

export const mockGames = [
  {
    id: '1',
    tournamentId: '1',
    round: 5,
    whitePlayer: {
      id: 'p1',
      name: 'Magnus Carlsen',
      title: 'GM',
      rating: 2830,
      country: 'NO',
      avatar: null
    },
    blackPlayer: {
      id: 'p2',
      name: 'Hikaru Nakamura',
      title: 'GM',
      rating: 2789,
      country: 'US',
      avatar: null
    },
    status: 'live',
    result: null,
    startTime: new Date().toISOString(),
    currentPosition: 'rnbqkb1r/pp2pppp/3p1n2/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 0 4',
    lastMove: 'e7e5',
    moveCount: 8,
    whiteTime: '01:15:23',
    blackTime: '01:08:45'
  },
  {
    id: '2',
    tournamentId: '1',
    round: 5,
    whitePlayer: {
      id: 'p3',
      name: 'Fabiano Caruana',
      title: 'GM',
      rating: 2786,
      country: 'US',
      avatar: null
    },
    blackPlayer: {
      id: 'p4',
      name: 'Ding Liren',
      title: 'GM',
      rating: 2780,
      country: 'CN',
      avatar: null
    },
    status: 'completed',
    result: '1-0',
    startTime: new Date(Date.now() - 3600000).toISOString(),
    endTime: new Date().toISOString(),
    currentPosition: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4',
    lastMove: 'f8c5',
    moveCount: 42,
    whiteTime: '00:00:00',
    blackTime: '00:15:32'
  }
];

export const mockPlayers = [
  {
    id: 'p1',
    username: 'MagnusCarlsen',
    name: 'Magnus Carlsen',
    title: 'GM',
    rating: 2830,
    country: 'NO',
    rank: 1,
    gamesPlayed: 1250,
    wins: 820,
    draws: 350,
    losses: 80,
    avatar: null
  },
  {
    id: 'p2',
    username: 'HikaruNakamura',
    name: 'Hikaru Nakamura',
    title: 'GM',
    rating: 2789,
    country: 'US',
    rank: 2,
    gamesPlayed: 2100,
    wins: 1300,
    draws: 550,
    losses: 250,
    avatar: null
  },
  {
    id: 'p3',
    username: 'FabianoCaruana',
    name: 'Fabiano Caruana',
    title: 'GM',
    rating: 2786,
    country: 'US',
    rank: 3,
    gamesPlayed: 980,
    wins: 650,
    draws: 270,
    losses: 60,
    avatar: null
  },
  {
    id: 'p4',
    username: 'DingLiren',
    name: 'Ding Liren',
    title: 'GM',
    rating: 2780,
    country: 'CN',
    rank: 4,
    gamesPlayed: 890,
    wins: 580,
    draws: 250,
    losses: 60,
    avatar: null
  }
];

export const mockNews = [
  {
    id: '1',
    title: 'World Championship Heats Up as Round 5 Begins',
    excerpt: 'The competition intensifies with unexpected moves and brilliant strategies',
    date: new Date().toISOString(),
    image: null
  },
  {
    id: '2',
    title: 'Carlsen Maintains Lead with Stunning Victory',
    excerpt: 'World champion demonstrates why he is still at the top',
    date: new Date(Date.now() - 86400000).toISOString(),
    image: null
  }
];

export const mockGameMoves = [
  { number: 1, white: 'e4', black: 'e5' },
  { number: 2, white: 'Nf3', black: 'Nc6' },
  { number: 3, white: 'Bb5', black: 'a6' },
  { number: 4, white: 'Ba4', black: 'Nf6' },
  { number: 5, white: 'O-O', black: 'Be7' },
  { number: 6, white: 'Re1', black: 'b5' },
  { number: 7, white: 'Bb3', black: 'd6' },
  { number: 8, white: 'c3', black: 'O-O' },
];

export const mockEvaluation = [
  { move: 1, score: 0.3 },
  { move: 2, score: 0.2 },
  { move: 3, score: 0.4 },
  { move: 4, score: 0.1 },
  { move: 5, score: 0.3 },
  { move: 6, score: -0.1 },
  { move: 7, score: 0.2 },
  { move: 8, score: 0.5 },
];
