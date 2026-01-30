
import { Game, GameCategory } from './types';

export const GAMES_DATA: Game[] = [
  {
    id: '2048',
    title: '2048',
    category: GameCategory.PUZZLE,
    description: 'Join the numbers and get to the 2048 tile! A classic addictive puzzle game.',
    thumbnail: 'https://images.unsplash.com/photo-1614332284113-97ce27a1403a?w=800&auto=format&fit=crop',
    iframeUrl: 'https://play2048.co/'
  },
  {
    id: 'slope',
    title: 'Slope',
    category: GameCategory.DRIVING,
    description: 'A fast-paced 3D running game. Drive your ball down the slope, avoid obstacles, and reach the high score.',
    thumbnail: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?w=800&auto=format&fit=crop',
    iframeUrl: 'https://slopegame.io/slope-game.embed'
  },
  {
    id: 'retro-bowl',
    title: 'Retro Bowl',
    category: GameCategory.SPORTS,
    description: 'The perfect game for the armchair quarterback to finally prove a point. Can you manage your team to the ultimate prize?',
    thumbnail: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=800&auto=format&fit=crop',
    iframeUrl: 'https://game316009.konggames.com/gamez/0031/6009/live/index.html'
  },
  {
    id: 'space-invaders',
    title: 'Galactic Shooter',
    category: GameCategory.SHOOTER,
    description: 'Defend the galaxy from waves of alien invaders in this arcade-style space shooter.',
    thumbnail: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=800&auto=format&fit=crop',
    iframeUrl: 'https://raw.githack.com/platzhersh/pacman-canvas/master/index.html'
  }
];
