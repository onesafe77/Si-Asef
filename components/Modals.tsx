import React from 'react';
import { X, Check, Zap, ShieldCheck, User as UserIcon, LogOut, CreditCard } from 'lucide-react';
import { User } from '../types';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UpgradeModal: React.FC<UpgradeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 font-sans">
      <div className="absolute inset-0 bg-zinc-900/60 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      <div className="relative bg-white rounded-[2rem] w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col md:flex-row overflow-hidden animate-fade-in-up">
        
        {/* Left Side - Value Prop */}
        <div className="w-full md:w-5/12 bg-zinc-900 p-8 md:p-10 text-white flex flex-col justify-between relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>
            
            <div className="relative z-10">
                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-8 border border-white/10 shadow-lg">
                    <Zap className="w-7 h-7 text-emerald-400" fill="currentColor" />
                </div>
                <h2 className="text-3xl font-display font-bold mb-4">Upgrade to Pro</h2>
                <p className="text-zinc-400 leading-relaxed mb-8 text-sm">
                    Dapatkan kekuatan penuh AI untuk analisa regulasi K3. Tanpa batas, lebih cepat, dan lebih cerdas.
                </p>
                
                <div className="space-y-5">
                    {[
                        "Unlimited Chat History",
                        "Akses Penuh Database UU & PP",
                        "Upload & Analisa Dokumen PDF",
                        "Vision AI (Deteksi Bahaya Foto)",
                        "Prioritas Respon Server"
                    ].map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-3 group">
                            <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0 group-hover:bg-emerald-500 transition-colors">
                                <Check className="w-3 h-3 text-emerald-400 group-hover:text-white" strokeWidth={3} />
                            </div>
                            <span className="text-sm font-medium text-zinc-200 group-hover:text-white transition-colors">{feature}</span>
                        </div>
                    ))}
                </div>
            </div>
            
            <div className="mt-10 pt-6 border-t border-white/10 text-xs text-zinc-500 font-medium tracking-wider uppercase flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                Si Asef Enterprise
            </div>
        </div>

        {/* Right Side - Pricing */}
        <div className="w-full md:w-7/12 p-8 md:p-10 bg-white relative flex flex-col">
            <button onClick={onClose} className="absolute top-6 right-6 p-2 hover:bg-zinc-100 rounded-full transition-colors group">
                <X className="w-6 h-6 text-zinc-400 group-hover:text-zinc-600" />
            </button>
            
            <h3 className="text-2xl font-bold text-zinc-900 mb-2 font-display">Pilih Paket Langganan</h3>
            <p className="text-zinc-500 text-sm mb-8">Investasi terbaik untuk kepatuhan keselamatan kerja.</p>
            
            <div className="space-y-4 flex-1">
                {/* Monthly Plan */}
                <div className="border-2 border-emerald-500 bg-emerald-50/30 rounded-2xl p-5 flex items-center justify-between cursor-pointer relative transition-all hover:shadow-lg hover:shadow-emerald-500/10">
                    <div className="absolute -top-3 left-6 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                        Paling Populer
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-6 h-6 rounded-full border-[6px] border-emerald-500 bg-white shadow-sm"></div>
                        <div>
                            <p className="font-bold text-zinc-900 text-lg">Bulanan</p>
                            <p className="text-xs text-zinc-500 font-medium">Tagihan setiap bulan</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="font-bold text-2xl text-zinc-900 font-display">Rp 149rb</p>
                        <p className="text-[11px] text-zinc-400 font-medium uppercase tracking-wide">/bulan</p>
                    </div>
                </div>

                {/* Yearly Plan */}
                <div className="border border-zinc-200 rounded-2xl p-5 flex items-center justify-between cursor-pointer hover:border-emerald-500 hover:bg-zinc-50 transition-all group">
                     <div className="flex items-center gap-4">
                        <div className="w-6 h-6 rounded-full border-2 border-zinc-300 group-hover:border-emerald-400 transition-colors"></div>
                        <div>
                            <div className="flex items-center gap-2">
                                <p className="font-bold text-zinc-700 group-hover:text-zinc-900">Tahunan</p>
                                <span className="bg-amber-100 text-amber-700 text-[10px] px-2 py-0.5 rounded font-bold">HEMAT 20%</span>
                            </div>
                            <p className="text-xs text-zinc-500 font-medium">Tagihan setiap tahun</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="font-bold text-2xl text-zinc-900 font-display">Rp 1.4jt</p>
                        <p className="text-[11px] text-zinc-400 font-medium uppercase tracking-wide">/tahun</p>
                    </div>
                </div>
            </div>

            <div className="mt-8">
                <button className="w-full py-4 bg-zinc-900 hover:bg-emerald-600 text-white font-bold text-lg rounded-2xl transition-all shadow-xl shadow-zinc-900/10 hover:shadow-emerald-600/30 hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    Langganan Sekarang
                </button>
                <div className="flex items-center justify-center gap-4 mt-6 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Logo_ovo_purple.svg/2560px-Logo_ovo_purple.svg.png" className="h-4 object-contain" alt="OVO" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Bank_Central_Asia.svg/2560px-Bank_Central_Asia.svg.png" className="h-4 object-contain" alt="BCA" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Gopay_logo.svg/2560px-Gopay_logo.svg.png" className="h-4 object-contain" alt="GoPay" />
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  onLogout: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, user, onLogout }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 font-sans">
        <div className="absolute inset-0 bg-zinc-900/60 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
        <div className="relative bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl animate-fade-in-up">
            
            {/* Header */}
            <div className="px-6 py-5 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/80 backdrop-blur-md">
                <h3 className="font-bold text-zinc-900 text-lg">Pengaturan Akun</h3>
                <button onClick={onClose} className="p-1 hover:bg-zinc-200 rounded-full transition-colors">
                    <X className="w-5 h-5 text-zinc-500" />
                </button>
            </div>
            
            <div className="p-6 space-y-6">
                {/* Profile Section */}
                <div className="flex items-center gap-5 p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-emerald-500/20">
                        {user?.name?.charAt(0) || 'U'}
                    </div>
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-bold text-zinc-900">{user?.name || 'User'}</h4>
                            {user?.plan === 'pro' && (
                                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded-full uppercase tracking-wider">PRO</span>
                            )}
                        </div>
                        <button className="text-xs font-bold text-emerald-600 hover:text-emerald-700 transition-colors">
                            Ubah Foto Profil
                        </button>
                    </div>
                </div>

                {/* Form Fields */}
                <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Nama Lengkap</label>
                        <input 
                            type="text" 
                            defaultValue={user?.name} 
                            className="w-full px-4 py-3 bg-white border border-zinc-200 rounded-xl text-sm font-medium text-zinc-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all" 
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Email</label>
                        <input 
                            type="email" 
                            defaultValue={user?.email} 
                            className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm font-medium text-zinc-500 cursor-not-allowed" 
                            disabled 
                        />
                    </div>
                </div>

                {/* Actions */}
                <div className="pt-6 mt-2 border-t border-zinc-100 space-y-3">
                     <button className="w-full py-3 bg-zinc-900 text-white rounded-xl text-sm font-bold hover:bg-emerald-600 transition-all shadow-lg shadow-zinc-900/10">
                        Simpan Perubahan
                    </button>
                    <button 
                        onClick={onLogout}
                        className="w-full py-3 text-red-500 hover:bg-red-50 rounded-xl text-sm font-bold transition-colors flex items-center justify-center gap-2 border border-transparent hover:border-red-100"
                    >
                        <LogOut className="w-4 h-4" />
                        Keluar dari Akun
                    </button>
                </div>
            </div>
        </div>
      </div>
    );
  };
