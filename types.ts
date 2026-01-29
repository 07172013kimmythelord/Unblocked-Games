
export interface Game {
  id: string;
  title: string;
  category: GameCategory;
  description: string;
  thumbnail: string;
  iframeUrl: string;
  developer?: string;
}

export enum GameCategory {
  ALL = 'All',
  ACTION = 'Action',
  PUZZLE = 'Puzzle',
  SPORTS = 'Sports',
  ARCADE = 'Arcade',
  DRIVING = 'Driving',
  SHOOTER = 'Shooter'
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}
