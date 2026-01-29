
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { getGameRecommendation } from '../services/geminiService';

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: "Hey! I'm Nova. Looking for something specific to play today? Just tell me your mood!" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const response = await getGameRecommendation(input, messages);
    
    setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    setIsLoading(false);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 bg-indigo-600 hover:bg-indigo-500 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-2xl shadow-indigo-500/40 transition-all hover:scale-110 active:scale-95"
      >
        <i className={`fas ${isOpen ? 'fa-times' : 'fa-robot'} text-xl`}></i>
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 w-[90vw] md:w-80 h-[500px] glass rounded-2xl flex flex-col shadow-2xl border border-indigo-500/20 overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          <div className="bg-indigo-600 p-4 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <i className="fas fa-robot text-white text-sm"></i>
            </div>
            <div>
              <h3 className="text-white font-bold text-sm">Game Guru Nova</h3>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></div>
                <span className="text-[10px] text-indigo-100 font-medium uppercase tracking-wider">Online Assistant</span>
              </div>
            </div>
          </div>

          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 space-y-4 text-sm scroll-smooth"
          >
            {messages.map((m, i) => (
              <div 
                key={i} 
                className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[85%] p-3 rounded-2xl ${
                    m.role === 'user' 
                      ? 'bg-indigo-600 text-white rounded-tr-none' 
                      : 'bg-slate-700/50 text-slate-200 rounded-tl-none border border-slate-600'
                  }`}
                  dangerouslySetInnerHTML={{ __html: m.content.replace(/\*\*(.*?)\*\*/g, '<b class="text-indigo-300">$1</b>') }}
                >
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-700/50 p-3 rounded-2xl rounded-tl-none flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce"></div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-white/5 bg-slate-800/50">
            <div className="relative">
              <input
                type="text"
                placeholder="Ask for a recommendation..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2 pl-4 pr-10 text-white focus:outline-none focus:border-indigo-500 transition-all text-xs"
              />
              <button 
                onClick={handleSend}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-indigo-500 hover:text-indigo-400 transition-colors"
              >
                <i className="fas fa-paper-plane"></i>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIAssistant;
