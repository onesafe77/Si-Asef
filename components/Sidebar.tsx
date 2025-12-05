import React from 'react';
import { Plus, MessageSquare, Settings, UserCircle, X, Zap, CreditCard, LogOut } from 'lucide-react';
import { ChatSession, User } from '../types';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  sessions: ChatSession[];
  user: User | null;
  onNewChat: () => void;
  onLoadSession: (id: string) => void;
  onOpenUpgrade: () => void;
  onOpenSettings: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  isOpen, 
  toggleSidebar, 
  sessions, 
  user,
  onNewChat, 
  onLoadSession, 
  onOpenUpgrade, 
  onOpenSettings 
}) => {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-zinc-900/20 backdrop-blur-sm z-20 md:hidden" 
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar Container */}
      <aside 
        className={`
          fixed md:relative z-30 flex flex-col h-full bg-[#FAFAF9] border-r border-zinc-200
          transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)]
          ${isOpen ? 'w-[280px] translate-x-0' : 'w-0 -translate-x-full opacity-0 md:opacity-100'}
          overflow-hidden
        `}
      >
        <div className="p-4 flex-none w-[280px]">
           {/* Close button for mobile */}
           <div className="md:hidden w-full flex justify-end mb-2">
             <button onClick={toggleSidebar} className="p-2 text-zinc-500"><X className="w-5 h-5"/></button>
           </div>
           
           {/* New Chat Button */}
           <button 
            onClick={() => {
              onNewChat();
              if (window.innerWidth < 768) toggleSidebar();
            }}
            className="w-full flex items-center justify-between px-4 py-3 bg-white border border-zinc-200 rounded-xl hover:border-zinc-300 hover:shadow-md hover:bg-zinc-50 transition-all duration-200 group text-sm text-zinc-800 shadow-sm"
          >
            <div className="flex items-center gap-2">
                <Plus className="w-4 h-4 text-asef-blue" strokeWidth={3} />
                <span className="font-semibold">Mulai Chat Baru</span>
            </div>
          </button>
        </div>

        {/* History List */}
        <div className="flex-1 overflow-y-auto px-3 py-2 space-y-6 scrollbar-thin w-[280px]">
          <div>
            <h3 className="px-3 text-[11px] font-bold text-zinc-400 uppercase tracking-widest mb-3">Hari Ini</h3>
            <ul className="space-y-1">
              {sessions.map((session) => (
                <li key={session.id}>
                  <button 
                    onClick={() => onLoadSession(session.id)}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-zinc-200/50 transition-colors text-left group"
                  >
                    <MessageSquare className="w-4 h-4 text-zinc-400 group-hover:text-zinc-600" />
                    <span className="text-[13px] truncate text-zinc-600 group-hover:text-zinc-900 font-medium">
                      {session.title}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="px-3 text-[11px] font-bold text-zinc-400 uppercase tracking-widest mb-3">Kemarin</h3>
            <ul className="space-y-1">
              <li>
                <button 
                  onClick={() => onLoadSession('history-1')}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-zinc-200/50 transition-colors text-left group"
                >
                  <MessageSquare className="w-4 h-4 text-zinc-400 group-hover:text-zinc-600" />
                  <span className="text-[13px] truncate text-zinc-600 group-hover:text-zinc-900 font-medium">Prosedur APD Konstruksi</span>
                </button>
              </li>
              <li>
                <button 
                   onClick={() => onLoadSession('history-2')}
                   className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-zinc-200/50 transition-colors text-left group"
                >
                   <MessageSquare className="w-4 h-4 text-zinc-400 group-hover:text-zinc-600" />
                  <span className="text-[13px] truncate text-zinc-600 group-hover:text-zinc-900 font-medium">Analisa Risiko Kebakaran</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Upgrade / Account Section */}
        <div className="p-4 bg-[#FAFAF9] space-y-3 w-[280px]">
          
          {/* Upgrade Card */}
          <div className="p-4 bg-gradient-to-br from-white to-zinc-50 border border-zinc-200 rounded-xl shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                <Zap className="w-12 h-12 text-asef-gold" />
            </div>
            
            <div className="relative z-10">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-zinc-500 uppercase">Starter Plan</span>
                    <span className="text-xs font-semibold text-zinc-900">3/5 Chats</span>
                </div>
                {/* Progress Bar */}
                <div className="w-full h-1.5 bg-zinc-200 rounded-full mb-3 overflow-hidden">
                    <div className="h-full bg-asef-blue rounded-full w-[60%]"></div>
                </div>
                
                <button 
                    onClick={onOpenUpgrade}
                    className="w-full py-2 bg-zinc-900 hover:bg-black text-white text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-zinc-500/20 hover:shadow-zinc-500/30 hover:-translate-y-0.5"
                >
                    <Zap className="w-3.5 h-3.5 text-asef-gold" fill="currentColor" />
                    Upgrade to Pro
                </button>
            </div>
          </div>

          <div className="pt-2 border-t border-zinc-200">
             <button 
                onClick={onOpenSettings}
                className="flex items-center gap-3 w-full px-2 py-2 rounded-lg hover:bg-zinc-200/50 transition-colors text-zinc-700"
            >
                <div className="w-8 h-8 rounded-full bg-zinc-200 flex items-center justify-center text-zinc-500 shrink-0">
                    <UserCircle className="w-5 h-5" />
                </div>
                <div className="flex-1 text-left overflow-hidden">
                    <p className="text-sm font-semibold text-zinc-900 truncate">
                      {user ? user.name : 'Safety Officer'}
                    </p>
                    <p className="text-[11px] text-zinc-500 truncate">
                      {user ? user.email : 'Free Account'}
                    </p>
                </div>
                <Settings className="w-4 h-4 text-zinc-400 hover:text-zinc-600 shrink-0" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;