
import React, { useState, useMemo } from 'react';
import { Game, GameCategory } from './types';
import { GAMES_DATA } from './constants';
import Navbar from './components/Navbar';
import GameCard from './components/GameCard';
import GamePlayer from './components/GamePlayer';
import AIAssistant from './components/AIAssistant';

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<GameCategory>(GameCategory.ALL);
  const [activeGame, setActiveGame] = useState<Game | null>(null);

  const filteredGames = useMemo(() => {
    return GAMES_DATA.filter(game => {
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          game.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === GameCategory.ALL || game.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery}
        onHome={() => {
          setSelectedCategory(GameCategory.ALL);
          setSearchQuery('');
          setActiveGame(null);
        }}
      />

      <main className="flex-1 max-w-7xl mx-auto w-full p-4 md:p-8">
        {/* Categories Header */}
        <div className="mb-10 text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            UNLEASH THE PIXELS
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-8">
            The ultimate destination for unblocked entertainment. No limits, no filters, just pure gaming.
          </p>

          <div className="flex flex-wrap justify-center gap-2">
            {Object.values(GameCategory).map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                  selectedCategory === cat 
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' 
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white border border-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Game Grid */}
        {filteredGames.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredGames.map(game => (
              <GameCard 
                key={game.id} 
                game={game} 
                onClick={(g) => setActiveGame(g)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="bg-slate-800/50 inline-block p-6 rounded-full mb-6">
              <i className="fas fa-ghost text-5xl text-slate-600"></i>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Game Over (for this search)</h3>
            <p className="text-slate-400">We couldn't find any games matching "{searchQuery}"</p>
            <button 
              onClick={() => {setSearchQuery(''); setSelectedCategory(GameCategory.ALL);}}
              className="mt-6 text-indigo-400 hover:text-indigo-300 font-bold underline underline-offset-4"
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* Featured Banner */}
        <div className="mt-20 glass rounded-3xl p-8 md:p-12 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-indigo-600/10 -skew-x-12 translate-x-1/4"></div>
          <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
            <div>
              <span className="text-indigo-400 font-bold uppercase tracking-widest text-sm mb-4 block">Coming Soon</span>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-6">WANT TO UPLOAD YOUR OWN GAME?</h2>
              <p className="text-slate-400 mb-8 leading-relaxed">
                Join our developer community and share your creations with thousands of players worldwide. 
                Get featured on our homepage and track your game's performance.
              </p>
              <button className="bg-white text-indigo-950 px-8 py-3 rounded-xl font-black hover:bg-indigo-50 transition-colors shadow-xl">
                JOIN THE WAITLIST
              </button>
            </div>
            <div className="hidden md:block relative">
              <img 
                src="https://picsum.photos/seed/arcade/800/600" 
                alt="Community" 
                className="rounded-2xl shadow-2xl rotate-2 group-hover:rotate-0 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </main>

      <footer className="glass border-t border-white/10 py-12 px-4 mt-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-1.5 rounded-lg">
              <i className="fas fa-gamepad text-white"></i>
            </div>
            <span className="text-xl font-black text-white">NOVAARCADE</span>
          </div>
          
          <div className="flex gap-8 text-slate-500 text-sm">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>

          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-indigo-600 hover:text-white transition-all">
              <i className="fab fa-discord"></i>
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-indigo-600 hover:text-white transition-all">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-indigo-600 hover:text-white transition-all">
              <i className="fab fa-github"></i>
            </a>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-white/5 text-center text-slate-600 text-xs">
          © {new Date().getFullYear()} NovaArcade. For educational purposes only. Games belong to their respective creators.
        </div>
      </footer>

      {activeGame && (
        <GamePlayer 
          game={activeGame} 
          onClose={() => setActiveGame(null)} 
        />
      )}

      <AIAssistant />
    </div>
  );
};

export default App;
