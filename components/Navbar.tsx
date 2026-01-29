
import React from 'react';

interface NavbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onHome: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ searchQuery, setSearchQuery, onHome }) => {
  return (
    <nav className="sticky top-0 z-50 glass border-b border-white/10 px-4 py-3 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div 
          onClick={onHome}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="bg-indigo-600 p-2 rounded-lg group-hover:bg-indigo-500 transition-colors">
            <i className="fas fa-gamepad text-white text-xl"></i>
          </div>
          <h1 className="text-2xl font-black tracking-tighter text-white">
            NOVA<span className="text-indigo-400">ARCADE</span>
          </h1>
        </div>

        <div className="relative w-full md:w-96">
          <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
          <input
            type="text"
            placeholder="Search unblocked games..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-800/50 border border-slate-700 rounded-full py-2 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder:text-slate-500"
          />
        </div>

        <div className="hidden md:flex items-center gap-6 text-slate-300 font-medium">
          <button className="hover:text-white transition-colors">New</button>
          <button className="hover:text-white transition-colors">Popular</button>
          <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2 rounded-full text-sm font-bold transition-all shadow-lg shadow-indigo-500/20">
            Sign In
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
