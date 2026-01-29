
import React, { useState } from 'react';
import { Game } from '../types';

interface GamePlayerProps {
  game: Game;
  onClose: () => void;
}

const GamePlayer: React.FC<GamePlayerProps> = ({ game, onClose }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    const iframe = document.getElementById('game-iframe');
    if (iframe) {
      if (!isFullscreen) {
        if (iframe.requestFullscreen) {
          iframe.requestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      }
      setIsFullscreen(!isFullscreen);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] bg-slate-950 flex flex-col">
      <div className="glass border-b border-white/10 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <i className="fas fa-arrow-left text-xl"></i>
          </button>
          <div>
            <h2 className="font-bold text-lg text-white leading-tight">{game.title}</h2>
            <p className="text-xs text-slate-400 uppercase tracking-widest">{game.category}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={toggleFullscreen}
            className="p-2 text-slate-400 hover:text-white transition-colors"
            title="Fullscreen"
          >
            <i className={`fas ${isFullscreen ? 'fa-compress' : 'fa-expand'}`}></i>
          </button>
          <button 
            onClick={onClose}
            className="bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white px-4 py-1.5 rounded-lg text-sm font-bold transition-all"
          >
            Quit
          </button>
        </div>
      </div>

      <div className="flex-1 bg-black relative">
        <iframe
          id="game-iframe"
          src={game.iframeUrl}
          className="w-full h-full border-0"
          title={game.title}
          allowFullScreen
          allow="autoplay; encrypted-media; fullscreen"
        ></iframe>
      </div>
    </div>
  );
};

export default GamePlayer;
