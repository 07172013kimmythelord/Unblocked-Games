
import React from 'react';
import { Game } from '../types';

interface GameCardProps {
  game: Game;
  onClick: (game: Game) => void;
}

const GameCard: React.FC<GameCardProps> = ({ game, onClick }) => {
  return (
    <div 
      onClick={() => onClick(game)}
      className="group relative bg-slate-800 rounded-xl overflow-hidden cursor-pointer border border-slate-700 hover:border-indigo-500/50 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/10"
    >
      <div className="aspect-video overflow-hidden">
        <img 
          src={game.thumbnail} 
          alt={game.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60"></div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-bold text-lg text-white group-hover:text-indigo-400 transition-colors truncate">
            {game.title}
          </h3>
          <span className="text-[10px] uppercase tracking-widest bg-slate-700 text-slate-300 px-2 py-0.5 rounded font-bold">
            {game.category}
          </span>
        </div>
        <p className="text-slate-400 text-sm line-clamp-2">
          {game.description}
        </p>
      </div>

      <div className="absolute bottom-4 right-4 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
        <div className="bg-indigo-600 text-white p-2 rounded-full shadow-xl">
          <i className="fas fa-play ml-0.5"></i>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
