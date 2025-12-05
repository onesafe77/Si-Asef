import React, { useState, useRef, useEffect } from 'react';
import { Menu, ShieldCheck, PanelLeftClose, PanelLeftOpen, Sparkles, X, Check, CreditCard, User as UserIcon, Bell, Lock, BookOpen, AlertTriangle, FileText, Activity, TrendingUp, Calendar, ArrowRight, Scale, Gavel, Search } from 'lucide-react';
import Sidebar from './components/Sidebar';
import ChatBubble from './components/ChatBubble';
import InputArea from './components/InputArea';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import { Message, Role, ChatSession, LoadingState, User } from './types';
import { sendMessageToGemini, initializeChat } from './services/gemini';

const SAMPLE_SESSIONS: ChatSession[] = [
  { id: '1', title: 'Dasar Hukum Ahli K3', date: 'Today' },
  { id: '2', title: 'Sanksi Pelanggaran APD', date: 'Today' },
];

const QUICK_ACTIONS = [
    { title: "Cari Dasar Hukum", subtitle: "Temukan pasal spesifik", icon: <Scale className="w-6 h-6 text-asef-blue" />, prompt: "Apa dasar hukum yang mewajibkan perusahaan memiliki: " },
    { title: "Cek Kepatuhan", subtitle: "Audit kesesuaian regulasi", icon: <ShieldCheck className="w-6 h-6 text-emerald-500" />, prompt: "Apakah perusahaan saya sudah comply dengan peraturan tentang: " },
    { title: "Sanksi & Denda", subtitle: "Konsekuensi hukum", icon: <Gavel className="w-6 h-6 text-red-500" />, prompt: "Apa sanksi pidana atau denda jika melanggar: " },
];

const RECENT_UPDATES = [
    { title: "UU Cipta Kerja (Klaster Ketenagakerjaan)", date: "Update Terbaru" },
    { title: "Permenaker No. 5 Tahun 2018 (Lingkungan Kerja)", date: "Referensi Utama" },
    { title: "PP No. 50 Tahun 2012 (SMK3)", date: "Wajib Baca" },
];

type ViewState = 'landing' | 'login' | 'chat';

function App() {
  const [currentView, setCurrentView] = useState<ViewState>('landing');
  const [messages, setMessages] = useState<Message[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loadingState, setLoadingState] = useState<LoadingState>('idle');
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Responsive sidebar initialization
  useEffect(() => {
    const handleResize = () => {
        if (window.innerWidth < 1024) {
            setSidebarOpen(false);
        } else {
            setSidebarOpen(true);
        }
    };
    // Initial check
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (currentView === 'chat') {
      initializeChat();
    }
  }, [currentView]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  const handleLoginSuccess = (user: User) => {
    setCurrentUser(user);
    setCurrentView('chat');
  };

  const handleNewChat = () => {
    setMessages([]);
    setLoadingState('idle');
    if (window.innerWidth < 768) setSidebarOpen(false);
  };

  const handleLoadSession = (id: string) => {
      handleNewChat();
      setMessages([
          { id: 'old-1', role: Role.USER, content: 'Apa dasar hukum pembentukan P2K3 di perusahaan?', timestamp: Date.now() },
          { id: 'old-2', role: Role.MODEL, content: 'Dasar hukum pembentukan **P2K3 (Panitia Pembina Keselamatan dan Kesehatan Kerja)** adalah:\n\n1. **UU No. 1 Tahun 1970 Pasal 10**: Mewajibkan pembentukan P2K3 bagi tempat kerja tertentu.\n2. **Permenaker No. PER.04/MEN/1987**: Mengatur tata cara penunjukan dan wewenang P2K3.\n\nPerusahaan wajib membentuk P2K3 jika mempekerjakan 100 orang atau lebih, atau kurang dari 100 orang tetapi memiliki risiko besar.', timestamp: Date.now() }
      ]);
      if (window.innerWidth < 768) setSidebarOpen(false);
  };

  const handleSendMessage = async (text: string, image?: string) => {
    // If image is present, append a visual marker to text for the user bubble
    const displayContent = image ? `[Attachment] ${text}` : text;
    
    const userMsg: Message = {
      id: Date.now().toString(),
      role: Role.USER,
      content: displayContent,
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, userMsg]);
    setLoadingState('streaming');

    const aiMsgId = (Date.now() + 1).toString();
    const aiPlaceholder: Message = {
      id: aiMsgId,
      role: Role.MODEL,
      content: '',
      timestamp: Date.now(),
      isStreaming: true
    };
    
    setMessages(prev => [...prev, aiPlaceholder]);

    try {
      let accumulatedText = '';
      
      const promptToSend = image ? `[User uploaded an image] ${text}` : text;

      await sendMessageToGemini(promptToSend, (chunk) => {
        accumulatedText += chunk;
        setMessages(prev => prev.map(msg => 
          msg.id === aiMsgId 
            ? { ...msg, content: accumulatedText }
            : msg
        ));
      });
      
      setMessages(prev => prev.map(msg => 
        msg.id === aiMsgId 
          ? { ...msg, isStreaming: false }
          : msg
      ));
      setLoadingState('idle');

    } catch (error) {
      setMessages(prev => prev.map(msg => 
        msg.id === aiMsgId 
          ? { ...msg, content: "Maaf, saya mengalami kendala koneksi. Silakan coba lagi.", isStreaming: false }
          : msg
      ));
      setLoadingState('error');
    }
  };

  const handleRegenerate = async () => {
      const lastUserMessage = messages.slice().reverse().find(m => m.role === Role.USER);
      if (lastUserMessage) {
          // Strip attachment marker for re-sending
          const cleanText = lastUserMessage.content.replace('[Attachment] ', '');
          await handleSendMessage(cleanText);
      }
  };

  if (currentView === 'landing') {
    return <LandingPage onStart={() => setCurrentView('login')} />;
  }

  if (currentView === 'login') {
    return (
      <Login 
        onLoginSuccess={handleLoginSuccess} 
        onBack={() => setCurrentView('landing')} 
      />
    );
  }

  return (
    <div className="flex h-screen bg-[#FAFAF9]">
      {/* Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen} 
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        sessions={SAMPLE_SESSIONS}
        user={currentUser}
        onNewChat={handleNewChat}
        onLoadSession={handleLoadSession}
        onOpenUpgrade={() => setShowUpgradeModal(true)}
        onOpenSettings={() => setShowSettingsModal(true)}
      />

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full relative overflow-hidden transition-all duration-300 shadow-2xl">
        
        {/* Top Navigation Bar */}
        <header className="flex-none h-16 flex items-center justify-between px-6 z-10 bg-[#FAFAF9]/90 backdrop-blur-sm border-b border-zinc-200/50">
           <div className="flex items-center gap-3">
             <button 
               onClick={() => setSidebarOpen(!sidebarOpen)} 
               className="p-2 text-zinc-400 hover:text-zinc-600 hover:bg-zinc-200/50 rounded-lg transition-colors"
               title={sidebarOpen ? "Close Sidebar" : "Open Sidebar"}
             >
                {sidebarOpen ? <PanelLeftClose className="w-5 h-5" /> : <PanelLeftOpen className="w-5 h-5" />}
             </button>
             <div className="flex items-center gap-2">
                 <span className="text-sm font-semibold text-zinc-700">Si Asef</span>
                 <span className="text-zinc-300">/</span>
                 <span className="text-sm text-zinc-500">
                    {messages.length > 0 ? 'Konsultasi Regulasi' : 'Dashboard Hukum'}
                 </span>
             </div>
           </div>
           
           <div className="flex items-center gap-3">
              <button 
                onClick={() => setCurrentView('landing')}
                className="hidden md:block text-xs font-semibold text-zinc-500 hover:text-zinc-900 mr-2 uppercase tracking-wider"
              >
                Home
              </button>
              <div 
                onClick={() => setShowUpgradeModal(true)}
                className="flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-[11px] font-bold border border-amber-200 cursor-pointer hover:bg-amber-200 transition-colors"
              >
                <Sparkles className="w-3 h-3" />
                UPGRADE
              </div>
           </div>
        </header>

        {/* Chat Scroll Area */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto w-full relative scroll-smooth bg-[#FAFAF9]"
        >
          {messages.length === 0 ? (
            <div className="min-h-full p-8 md:p-12 animate-fade-in-up">
              
              {/* Dashboard Header */}
              <div className="max-w-5xl mx-auto mb-10">
                 <h1 className="text-3xl font-serif font-bold text-zinc-900 mb-2">
                    Halo, {currentUser ? currentUser.name.split(' ')[0] : 'Rekan'} K3.
                 </h1>
                 <p className="text-zinc-500 text-lg">Saya siap membantu Anda menelusuri <strong>Regulasi K3 & Hukum Lingkungan Indonesia</strong>.</p>
              </div>

              <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                  {/* Status Card */}
                  <div className="col-span-1 md:col-span-2 bg-gradient-to-br from-asef-primary to-zinc-900 rounded-3xl p-6 text-white relative overflow-hidden shadow-xl">
                      <div className="absolute top-0 right-0 p-8 opacity-10">
                          <Scale className="w-32 h-32" />
                      </div>
                      <div className="relative z-10">
                          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold mb-4 border border-white/20">
                             <Sparkles className="w-3 h-3 text-amber-400" />
                             Regulasi Spotlight
                          </div>
                          <h3 className="text-xl md:text-2xl font-serif font-bold leading-relaxed mb-4">
                             "Perusahaan wajib menerapkan SMK3 jika mempekerjakan minimal 100 orang atau memiliki potensi bahaya tinggi."
                          </h3>
                          <div className="flex gap-2">
                              <span className="text-xs bg-white/20 px-2 py-1 rounded text-emerald-200 font-mono">PP 50 Tahun 2012 Pasal 5</span>
                          </div>
                          <button 
                             onClick={() => handleSendMessage("Jelaskan detail penerapan SMK3 berdasarkan PP 50 Tahun 2012")}
                             className="mt-6 px-4 py-2 bg-white text-zinc-900 rounded-lg text-sm font-bold hover:bg-zinc-100 transition-colors"
                          >
                             Pelajari SMK3
                          </button>
                      </div>
                  </div>

                  {/* Stats / Update Card */}
                  <div className="bg-white border border-zinc-200 rounded-3xl p-6 shadow-sm">
                      <div className="flex items-center gap-2 mb-4">
                         <BookOpen className="w-5 h-5 text-asef-blue" />
                         <span className="font-bold text-zinc-800">Pustaka Regulasi</span>
                      </div>
                      <div className="space-y-4">
                          {RECENT_UPDATES.map((update, idx) => (
                              <div key={idx} className="pb-3 border-b border-zinc-100 last:border-0 last:pb-0">
                                  <p className="text-sm font-medium text-zinc-800 hover:text-asef-blue cursor-pointer transition-colors line-clamp-2">
                                    {update.title}
                                  </p>
                                  <p className="text-xs text-zinc-400 mt-1">{update.date}</p>
                              </div>
                          ))}
                      </div>
                  </div>
              </div>

              {/* Quick Actions Grid */}
              <div className="max-w-5xl mx-auto">
                 <h2 className="text-lg font-bold text-zinc-800 mb-6 flex items-center gap-2">
                    <Search className="w-5 h-5 text-asef-blue" />
                    Penelusuran Hukum
                 </h2>
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {QUICK_ACTIONS.map((action, idx) => (
                        <button 
                        key={idx}
                        onClick={() => handleSendMessage(action.prompt)}
                        className="flex flex-col p-6 bg-white border border-zinc-200 rounded-2xl hover:border-asef-blue/50 hover:shadow-lg hover:-translate-y-1 transition-all text-left group"
                        >
                            <div className="flex items-center justify-between w-full mb-4">
                                <div className="p-3 bg-zinc-50 rounded-xl group-hover:bg-white transition-colors">
                                    {action.icon}
                                </div>
                                <ArrowRight className="w-5 h-5 text-zinc-300 group-hover:text-asef-blue transition-colors" />
                            </div>
                            <h3 className="font-bold text-zinc-900 mb-1">{action.title}</h3>
                            <p className="text-sm text-zinc-500">{action.subtitle}</p>
                        </button>
                    ))}
                    
                    {/* Visual Detection Placeholder Card */}
                    <div className="p-6 border border-dashed border-zinc-300 rounded-2xl flex flex-col items-center justify-center text-center hover:bg-zinc-50 transition-colors cursor-pointer group" onClick={() => document.querySelector<HTMLElement>('button[title="Upload Image"]')?.click()}>
                        <div className="w-12 h-12 bg-zinc-100 rounded-full flex items-center justify-center mb-3 group-hover:bg-white group-hover:shadow-md transition-all">
                             <AlertTriangle className="w-6 h-6 text-zinc-400" />
                        </div>
                        <h3 className="font-bold text-zinc-700 text-sm">Cek Pelanggaran Visual</h3>
                        <p className="text-xs text-zinc-400 mt-1">Upload foto untuk deteksi ketidaksesuaian</p>
                    </div>
                 </div>
              </div>
              
            </div>
          ) : (
            <div className="flex flex-col pb-4 pt-4 min-h-0 max-w-5xl mx-auto">
              {messages.map((msg, idx) => (
                <ChatBubble 
                    key={msg.id} 
                    message={msg} 
                    onRegenerate={msg.role === Role.MODEL && idx === messages.length - 1 ? handleRegenerate : undefined}
                />
              ))}
              <div className="h-4" />
            </div>
          )}
        </div>

        {/* Input Sticky Footer */}
        <div className="flex-none pt-6 bg-gradient-to-t from-[#FAFAF9] via-[#FAFAF9] to-transparent">
           <InputArea onSendMessage={handleSendMessage} isLoading={loadingState === 'streaming'} />
        </div>
      </main>

      {/* --- MODALS --- */}
      
      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900/50 backdrop-blur-sm animate-fade-in-up [animation-duration:0.2s]">
            <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl border border-zinc-200 overflow-hidden">
                <div className="p-6 bg-asef-blue text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10"><Sparkles className="w-24 h-24" /></div>
                    <h2 className="text-2xl font-serif font-bold mb-2">Upgrade to Pro</h2>
                    <p className="text-blue-100 text-sm">Akses database hukum lengkap & konsultasi prioritas.</p>
                    <button onClick={() => setShowUpgradeModal(false)} className="absolute top-4 right-4 text-white/70 hover:text-white"><X className="w-5 h-5"/></button>
                </div>
                <div className="p-6">
                    <div className="space-y-4 mb-6">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-asef-blue"><Check className="w-4 h-4"/></div>
                            <span className="text-zinc-700">Akses Penuh UU, PP, Permenaker</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-asef-blue"><Check className="w-4 h-4"/></div>
                            <span className="text-zinc-700">Analisa Dokumen Legal (PDF)</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-asef-blue"><Check className="w-4 h-4"/></div>
                            <span className="text-zinc-700">Audit Compliance Otomatis</span>
                        </div>
                    </div>
                    <button className="w-full py-3 bg-zinc-900 text-white font-bold rounded-xl hover:bg-black transition-colors flex items-center justify-center gap-2">
                        <CreditCard className="w-4 h-4" />
                        Subscribe - Rp 149rb/bulan
                    </button>
                    <p className="text-center text-xs text-zinc-400 mt-4">Secure payment via Midtrans</p>
                </div>
            </div>
        </div>
      )}

      {/* Settings Modal */}
      {showSettingsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900/50 backdrop-blur-sm animate-fade-in-up [animation-duration:0.2s]">
             <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl border border-zinc-200 overflow-hidden">
                <div className="flex items-center justify-between p-4 border-b border-zinc-100">
                    <h3 className="font-bold text-zinc-800">Settings</h3>
                    <button onClick={() => setShowSettingsModal(false)} className="text-zinc-400 hover:text-zinc-700"><X className="w-5 h-5"/></button>
                </div>
                <div className="p-2">
                    <div className="p-4 flex items-center gap-4 bg-zinc-50 rounded-lg mx-2 my-2 border border-zinc-100">
                        <div className="w-12 h-12 bg-zinc-200 rounded-full flex items-center justify-center text-zinc-500 font-bold text-lg">
                           {currentUser ? currentUser.name.charAt(0).toUpperCase() : 'S'}
                        </div>
                        <div>
                            <p className="font-bold text-zinc-900">{currentUser ? currentUser.name : 'Safety Officer'}</p>
                            <p className="text-xs text-zinc-500">{currentUser ? currentUser.email : 'user@company.com'}</p>
                        </div>
                    </div>
                    <button className="w-full flex items-center gap-3 p-3 hover:bg-zinc-50 rounded-lg text-left transition-colors text-zinc-700">
                        <UserIcon className="w-5 h-5 text-zinc-400" />
                        <div className="flex-1">
                            <div className="font-medium text-sm">Account</div>
                            <div className="text-xs text-zinc-400">Manage email & password</div>
                        </div>
                    </button>
                    <button className="w-full flex items-center gap-3 p-3 hover:bg-zinc-50 rounded-lg text-left transition-colors text-zinc-700">
                        <Bell className="w-5 h-5 text-zinc-400" />
                        <div className="flex-1">
                            <div className="font-medium text-sm">Notifications</div>
                            <div className="text-xs text-zinc-400">Email preferences</div>
                        </div>
                    </button>
                     <button className="w-full flex items-center gap-3 p-3 hover:bg-zinc-50 rounded-lg text-left transition-colors text-zinc-700">
                        <Lock className="w-5 h-5 text-zinc-400" />
                        <div className="flex-1">
                            <div className="font-medium text-sm">Privacy</div>
                            <div className="text-xs text-zinc-400">Data controls</div>
                        </div>
                    </button>
                </div>
                <div className="p-4 bg-zinc-50 border-t border-zinc-100">
                     <button onClick={() => setCurrentView('landing')} className="w-full py-2 text-red-600 font-medium text-sm hover:bg-red-50 rounded-lg transition-colors">
                        Sign Out
                    </button>
                </div>
             </div>
        </div>
      )}
    </div>
  );
}

export default App;