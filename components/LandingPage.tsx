import React, { useState } from 'react';
import { ShieldCheck, ArrowRight, BookOpen, AlertTriangle, FileText, Check, Star, Zap, Building2, Users, ChevronRight, Menu, HardHat, Factory, Truck, Search, Camera, Download, Scale, Hammer, Landmark, Pickaxe, Briefcase, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

interface LandingPageProps {
  onStart: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // Helper for cleaner company logo items
  const CompanyItem = ({ icon, name }: { icon: React.ReactNode, name: string }) => (
    <div className="flex items-center gap-3 mx-10 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-default group">
        <span className="text-emerald-600 group-hover:text-emerald-500 transition-colors [&>svg]:w-6 [&>svg]:h-6 [&>svg]:stroke-[2.5]">
            {icon}
        </span>
        <span className="text-lg font-bold text-zinc-800 tracking-widest font-display">{name}</span>
    </div>
  );

  const CompanyLogos = () => (
    <>
        <CompanyItem icon={<Building2 />} name="ADHIKARYA" />
        <CompanyItem icon={<Zap />} name="PLN GROUP" />
        <CompanyItem icon={<Users />} name="WASKITA" />
        <CompanyItem icon={<ShieldCheck />} name="PERTAMINA" />
        <CompanyItem icon={<HardHat />} name="HUTAMA KARYA" />
        <CompanyItem icon={<Factory />} name="KRAKATAU STEEL" />
        <CompanyItem icon={<Truck />} name="PELINDO" />
        <CompanyItem icon={<Building2 />} name="WIKA" />
        <CompanyItem icon={<Hammer />} name="SEMEN INDONESIA" />
        <CompanyItem icon={<Landmark />} name="JASA MARGA" />
        <CompanyItem icon={<Factory />} name="PUPUK INDONESIA" />
        <CompanyItem icon={<Pickaxe />} name="BUKIT ASAM" />
        <CompanyItem icon={<Pickaxe />} name="ANTM" />
        <CompanyItem icon={<Briefcase />} name="PP PERSERO" />
    </>
  );

  return (
    <div className="h-screen w-full bg-[#FAFAF9] text-zinc-800 font-sans flex flex-col overflow-y-auto selection:bg-emerald-500/20 selection:text-emerald-900 scroll-smooth">
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#FAFAF9]/90 backdrop-blur-xl border-b border-zinc-200/50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2.5 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 bg-asef-blue text-white rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:bg-emerald-600 transition-colors">
              <ShieldCheck className="w-6 h-6" strokeWidth={2.5} />
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-zinc-900 group-hover:text-emerald-700 transition-colors">Si Asef</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-zinc-500">
            <button onClick={() => scrollToSection('features')} className="hover:text-asef-blue transition-colors">Fitur</button>
            <button onClick={() => scrollToSection('how-it-works')} className="hover:text-asef-blue transition-colors">Cara Kerja</button>
            <button onClick={() => scrollToSection('testimonials')} className="hover:text-asef-blue transition-colors">Testimoni</button>
            <button onClick={() => scrollToSection('pricing')} className="hover:text-asef-blue transition-colors">Harga</button>
          </div>
          
          <div className="flex items-center gap-4">
             <button onClick={onStart} className="hidden md:block text-sm font-bold text-zinc-600 hover:text-zinc-900 px-2 transition-colors">
                Masuk
             </button>
             <button 
                onClick={onStart}
                className="text-sm font-bold bg-asef-primary text-white px-6 py-2.5 rounded-full hover:bg-emerald-950 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
              >
                Coba Gratis
              </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden flex-shrink-0 bg-asef-primary min-h-[90vh] flex items-center">
        {/* Background Patterns */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-emerald-500/20 rounded-full blur-[120px] animate-pulse [animation-duration:8s]"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-500/10 rounded-full blur-[120px] animate-pulse [animation-duration:10s]"></div>

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 md:gap-24 relative z-10">
            <div className="flex-1 text-center lg:text-left pt-8 lg:pt-0">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-emerald-300 mb-8 shadow-sm backdrop-blur-md cursor-default hover:bg-white/10 transition-colors">
                    <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    Ahli Hukum & Regulasi K3 Indonesia
                </div>
                
                <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-bold text-white leading-[1.1] mb-8 tracking-tight">
                    Paham Regulasi, <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-200">Hindari Sanksi.</span>
                </h1>
                
                <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto lg:mx-0 mb-10 leading-relaxed font-light">
                    Asisten AI yang menguasai <strong className="text-emerald-100 font-medium">UU No. 1 Tahun 1970</strong>, <strong className="text-emerald-100 font-medium">PP 50/2012</strong>, dan seluruh <strong className="text-emerald-100 font-medium">Permenaker</strong>. Dapatkan jawaban hukum K3 dalam hitungan detik.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 w-full">
                    <button 
                    onClick={onStart}
                    className="w-full sm:w-auto px-8 py-4 bg-asef-blue text-white text-lg font-bold rounded-full hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-900/30 hover:shadow-2xl hover:shadow-emerald-900/50 hover:-translate-y-1 flex items-center justify-center gap-2 group"
                    >
                    Konsultasi Sekarang
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button 
                        onClick={() => window.open('https://youtube.com', '_blank')}
                        className="w-full sm:w-auto px-8 py-4 bg-white/5 text-white border border-white/10 text-lg font-bold rounded-full hover:bg-white/10 transition-all flex items-center justify-center backdrop-blur-sm"
                    >
                    Lihat Demo
                    </button>
                </div>
                
                <div className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-x-8 gap-y-4 text-zinc-500 text-sm font-medium">
                    <span className="flex items-center gap-2"><Check className="w-5 h-5 text-emerald-500 bg-emerald-500/10 rounded-full p-0.5" /> Referensi Pasal Akurat</span>
                    <span className="flex items-center gap-2"><Check className="w-5 h-5 text-emerald-500 bg-emerald-500/10 rounded-full p-0.5" /> Update Regulasi 2024</span>
                </div>
            </div>

            {/* Hero Image / UI Mockup */}
            <div className="flex-1 w-full relative perspective-1000">
                <div className="bg-white rounded-3xl shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5)] border border-white/10 overflow-hidden ring-1 ring-white/10 transform rotate-y-[-6deg] rotate-x-[4deg] hover:rotate-y-0 hover:rotate-x-0 transition-transform duration-700 ease-out lg:scale-105">
                    <div className="h-12 bg-zinc-50 border-b border-zinc-200 flex items-center px-6 gap-2">
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-400"></div>
                            <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                            <div className="w-3 h-3 rounded-full bg-green-400"></div>
                        </div>
                        <div className="ml-4 px-3 py-1 bg-white rounded-md text-[10px] text-zinc-400 font-mono border border-zinc-200">
                            si-asef-compliance-check.ts
                        </div>
                    </div>
                    <div className="p-8 bg-white grid gap-8">
                         {/* Chat Bubble 1 */}
                        <div className="flex gap-4 animate-fade-in-up [animation-delay:500ms]">
                            <div className="w-10 h-10 rounded-full bg-zinc-100 flex-shrink-0 flex items-center justify-center border border-zinc-200">
                                <Users className="w-5 h-5 text-zinc-400" />
                            </div>
                            <div className="bg-zinc-50 border border-zinc-200 px-6 py-4 rounded-3xl rounded-tl-none max-w-[85%] text-sm text-zinc-700 leading-relaxed shadow-sm">
                                Apa dasar hukum wajib lapor kecelakaan kerja?
                            </div>
                        </div>
                         {/* Chat Bubble 2 (AI) */}
                        <div className="flex gap-4 flex-row-reverse animate-fade-in-up [animation-delay:1000ms]">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 flex-shrink-0 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                                <Scale className="w-5 h-5 text-white" />
                            </div>
                            <div className="bg-white border border-emerald-100 p-0 rounded-3xl rounded-tr-none max-w-[95%] w-full shadow-lg shadow-emerald-500/5 overflow-hidden">
                                <div className="p-3 bg-emerald-50/50 border-b border-emerald-100 flex items-center gap-2">
                                     <FileText className="w-4 h-4 text-emerald-600" />
                                     <span className="text-xs font-extrabold text-emerald-700 uppercase tracking-wide">Jawaban Regulasi</span>
                                </div>
                                <div className="p-5 space-y-4">
                                    <div className="p-4 bg-zinc-50/50 border border-zinc-200 rounded-xl shadow-sm hover:border-emerald-300 transition-colors cursor-pointer group/card">
                                        <h4 className="font-bold text-zinc-900 text-sm mb-2 group-hover/card:text-emerald-700 transition-colors">Permenaker No. 03/MEN/1998</h4>
                                        <div className="text-xs text-zinc-600 leading-relaxed pl-3 border-l-2 border-emerald-300">
                                            Pasal 4 ayat (1): Pengurus atau pengusaha wajib melaporkan tiap kecelakaan kerja kepada Kandepnaker setempat dalam waktu tidak lebih dari 2x24 jam.
                                        </div>
                                    </div>
                                    <button className="w-full py-2.5 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-lg hover:bg-emerald-100 transition-colors border border-emerald-100">
                                        Lihat Pasal Lengkap
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Social Proof - Infinite Scroll */}
      <section className="py-12 border-b border-zinc-200 bg-white overflow-hidden flex-shrink-0">
        <p className="text-center text-xs font-bold text-zinc-400 uppercase tracking-[0.2em] mb-8">Dipercaya oleh tim K3 di perusahaan terkemuka</p>
        <div className="relative flex overflow-x-hidden group">
            {/* Gradient masks */}
            <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-white via-white/80 to-transparent z-10"></div>
            <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-white via-white/80 to-transparent z-10"></div>

            <div className="flex animate-scroll hover:[animation-play-state:paused] whitespace-nowrap py-2">
               <div className="flex items-center">
                   <CompanyLogos />
               </div>
               <div className="flex items-center">
                   <CompanyLogos />
               </div>
            </div>
        </div>
      </section>

       {/* How It Works Section */}
       <section id="how-it-works" className="py-32 px-6 bg-white flex-shrink-0">
         <div className="max-w-7xl mx-auto">
             <div className="text-center mb-24">
                <h2 className="font-serif text-3xl md:text-5xl text-zinc-900 mb-6 font-bold">Cara Kerja Si Asef</h2>
                <p className="text-zinc-500 text-lg md:text-xl max-w-2xl mx-auto font-light">Tiga langkah mudah untuk memastikan kepatuhan hukum perusahaan Anda tanpa ribet.</p>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative">
                {/* Connecting Line */}
                <div className="hidden md:block absolute top-16 left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-zinc-200 via-emerald-200 to-zinc-200 -z-10 border-t border-dashed border-zinc-300"></div>

                <div className="text-center relative group">
                    <div className="w-32 h-32 mx-auto bg-white rounded-full flex items-center justify-center mb-8 shadow-xl shadow-zinc-200 z-10 group-hover:scale-110 transition-transform duration-300">
                        <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center text-asef-blue border border-emerald-100">
                            <Search className="w-10 h-10 text-emerald-600" />
                        </div>
                    </div>
                    <h3 className="text-2xl font-bold text-zinc-900 mb-4">1. Cari Topik</h3>
                    <p className="text-zinc-500 leading-relaxed text-lg">Ketik isu K3 Anda. <br/><span className="text-sm bg-zinc-100 px-2 py-0.5 rounded text-zinc-600">Contoh: "Aturan APD Ketinggian"</span></p>
                </div>

                <div className="text-center relative group">
                     <div className="w-32 h-32 mx-auto bg-white rounded-full flex items-center justify-center mb-8 shadow-xl shadow-zinc-200 z-10 group-hover:scale-110 transition-transform duration-300">
                         <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center text-asef-blue border border-emerald-100">
                            <Zap className="w-10 h-10 text-emerald-600" />
                        </div>
                    </div>
                    <h3 className="text-2xl font-bold text-zinc-900 mb-4">2. AI Mencari Pasal</h3>
                    <p className="text-zinc-500 leading-relaxed text-lg">Si Asef memindai ribuan halaman UU, PP, dan Permenaker secara instan.</p>
                </div>

                <div className="text-center relative group">
                     <div className="w-32 h-32 mx-auto bg-white rounded-full flex items-center justify-center mb-8 shadow-xl shadow-zinc-200 z-10 group-hover:scale-110 transition-transform duration-300">
                         <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center text-asef-blue border border-emerald-100">
                            <Scale className="w-10 h-10 text-emerald-600" />
                        </div>
                    </div>
                    <h3 className="text-2xl font-bold text-zinc-900 mb-4">3. Jawaban Akurat</h3>
                    <p className="text-zinc-500 leading-relaxed text-lg">Terima jawaban lengkap dengan referensi Nomor, Tahun, dan Pasal.</p>
                </div>
             </div>
         </div>
       </section>

      {/* Features Section */}
      <section id="features" className="py-32 px-6 bg-[#FAFAF9] flex-shrink-0 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-zinc-300 to-transparent"></div>
        <div className="max-w-7xl mx-auto relative z-10">
           <div className="text-center mb-20 max-w-3xl mx-auto">
             <h2 className="font-serif text-3xl md:text-5xl text-zinc-900 mb-6 font-bold">Fitur Unggulan</h2>
             <p className="text-zinc-500 text-lg md:text-xl font-light">Solusi lengkap untuk kebutuhan Legal & Compliance Safety Officer modern.</p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="bg-white p-10 rounded-[2.5rem] border border-zinc-200 shadow-sm hover:shadow-2xl transition-all duration-300 group hover:-translate-y-2">
                 <div className="w-16 h-16 bg-blue-50 text-asef-blue rounded-2xl flex items-center justify-center mb-8 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                    <BookOpen className="w-8 h-8" strokeWidth={1.5} />
                 </div>
                 <h3 className="text-2xl font-bold text-zinc-900 mb-4">Ensiklopedia Regulasi</h3>
                 <p className="text-zinc-500 leading-relaxed text-lg">Akses instan ke UU No. 1 Tahun 1970, PP 50 Tahun 2012, dan standar ISO 45001. Tanyakan pasal spesifik tanpa membuka buku tebal.</p>
              </div>

              <div className="bg-white p-10 rounded-[2.5rem] border border-zinc-200 shadow-sm hover:shadow-2xl transition-all duration-300 group hover:-translate-y-2">
                 <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-amber-500 group-hover:text-white transition-colors duration-300">
                    <Camera className="w-8 h-8" strokeWidth={1.5} />
                 </div>
                 <h3 className="text-2xl font-bold text-zinc-900 mb-4">Visual Hazard Detection</h3>
                 <p className="text-zinc-500 leading-relaxed text-lg">Upload foto kondisi tidak aman, AI akan mengidentifikasi potensi bahaya sesuai standar K3 Indonesia.</p>
              </div>

              <div className="bg-white p-10 rounded-[2.5rem] border border-zinc-200 shadow-sm hover:shadow-2xl transition-all duration-300 group hover:-translate-y-2">
                 <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                    <FileText className="w-8 h-8" strokeWidth={1.5} />
                 </div>
                 <h3 className="text-2xl font-bold text-zinc-900 mb-4">Dokumen Generator</h3>
                 <p className="text-zinc-500 leading-relaxed text-lg">Buat draf JSA (Job Safety Analysis), IBPR, atau form inspeksi hanya dengan memberikan deskripsi singkat pekerjaan.</p>
              </div>
           </div>
        </div>
      </section>

       {/* Testimonials Section */}
       <section id="testimonials" className="py-32 px-6 bg-white border-y border-zinc-200 flex-shrink-0">
        <div className="max-w-7xl mx-auto">
            <h2 className="font-serif text-3xl md:text-5xl text-zinc-900 mb-20 text-center font-bold">Kata mereka tentang Si Asef</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                {/* Testimonial Cards with cleaner layout */}
                {[
                    {text: "Sangat membantu saat audit. Saya bisa menemukan pasal tentang Bejana Tekan dalam hitungan detik.", name: "Budi Darmawan", role: "HSE Coordinator, Konstruksi", init: "BD"},
                    {text: "Sebagai mahasiswa K3, Si Asef seperti dosen pembimbing. Penjelasan regulasinya sangat detail dan akurat.", name: "Siti Nurhaliza", role: "Mahasiswi K3, UI", init: "SN"},
                    {text: "Fitur cek sanksi sangat berguna untuk mengingatkan manajemen tentang risiko compliance.", name: "Agus Rahardjo", role: "Safety Manager, Manufaktur", init: "AR"}
                ].map((item, i) => (
                     <div key={i} className="p-10 bg-zinc-50 rounded-[2rem] relative hover:bg-emerald-50/50 transition-colors duration-300 border border-transparent hover:border-emerald-100">
                        <div className="flex text-amber-400 mb-6 gap-1">
                            {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 fill-current" />)}
                        </div>
                        <p className="text-zinc-700 mb-8 italic leading-relaxed text-lg">"{item.text}"</p>
                        <div className="flex items-center gap-5 border-t border-zinc-200/50 pt-6">
                            <div className="w-14 h-14 bg-white border border-zinc-200 rounded-full flex items-center justify-center font-bold text-zinc-400 text-lg shadow-sm">{item.init}</div>
                            <div>
                                <p className="text-base font-bold text-zinc-900">{item.name}</p>
                                <p className="text-sm text-zinc-500">{item.role}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
       </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-32 px-6 bg-zinc-50 relative flex-shrink-0">
        <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
                <h2 className="font-serif text-4xl md:text-5xl text-zinc-900 mb-6 font-bold">Investasi kecil untuk kepatuhan besar.</h2>
                <p className="text-zinc-500 text-lg md:text-xl mb-10">Pilih paket yang sesuai dengan kebutuhan operasional Anda.</p>
                
                {/* Billing Toggle */}
                <div className="inline-flex items-center p-1 bg-white rounded-full border border-zinc-200 shadow-sm">
                    <button 
                        onClick={() => setBillingCycle('monthly')}
                        className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${billingCycle === 'monthly' ? 'bg-zinc-900 text-white shadow-md' : 'text-zinc-500 hover:text-zinc-900'}`}
                    >
                        Bulanan
                    </button>
                    <button 
                         onClick={() => setBillingCycle('yearly')}
                         className={`px-6 py-2 rounded-full text-sm font-bold transition-all flex items-center gap-2 ${billingCycle === 'yearly' ? 'bg-zinc-900 text-white shadow-md' : 'text-zinc-500 hover:text-zinc-900'}`}
                    >
                        Tahunan
                        <span className="bg-emerald-100 text-emerald-700 text-[10px] px-1.5 py-0.5 rounded uppercase">Hemat 20%</span>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                {/* Free Tier */}
                <div className="bg-white rounded-[2rem] p-8 border border-zinc-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group h-full relative overflow-hidden">
                    <div className="mb-8">
                        <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest bg-zinc-100 px-3 py-1 rounded-full">Starter</span>
                        <div className="mt-4 flex items-baseline gap-1">
                            <span className="text-5xl font-bold text-zinc-900 tracking-tight">Rp 0</span>
                        </div>
                        <p className="mt-4 text-zinc-500 text-sm leading-relaxed">Akses dasar untuk mahasiswa atau Safety Officer pemula.</p>
                    </div>
                    
                    <div className="border-t border-zinc-100 my-6"></div>

                    <ul className="space-y-4 mb-10 flex-1">
                        <li className="flex items-start gap-3 text-zinc-700 text-sm">
                            <Check className="w-5 h-5 text-zinc-300 flex-shrink-0 mt-0.5" strokeWidth={3} />
                            <span><strong>Akses Terbatas:</strong> UU No. 1 Tahun 1970 & PP 50/2012 saja.</span>
                        </li>
                        <li className="flex items-start gap-3 text-zinc-700 text-sm">
                            <Check className="w-5 h-5 text-zinc-300 flex-shrink-0 mt-0.5" strokeWidth={3} />
                            <span><strong>5 Pertanyaan</strong> per hari.</span>
                        </li>
                        <li className="flex items-start gap-3 text-zinc-700 text-sm">
                            <Check className="w-5 h-5 text-zinc-300 flex-shrink-0 mt-0.5" strokeWidth={3} />
                            <span>Tidak ada export dokumen.</span>
                        </li>
                    </ul>
                    
                    <button onClick={onStart} className="w-full py-4 px-6 bg-zinc-100 hover:bg-zinc-200 text-zinc-900 font-bold rounded-xl transition-colors">
                        Mulai Gratis
                    </button>
                </div>

                {/* Pro Tier (Highlighted) */}
                <div className="bg-white rounded-[2rem] p-8 border-2 border-asef-blue shadow-2xl relative transform md:-translate-y-6 flex flex-col z-10 h-full">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-asef-blue text-white px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg shadow-emerald-500/30 whitespace-nowrap">
                        Paling Populer
                    </div>
                    <div className="mb-8">
                        <span className="text-xs font-bold text-asef-blue uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full">Professional</span>
                        <div className="mt-4 flex items-baseline gap-1">
                            <span className="text-5xl font-bold text-zinc-900 tracking-tight">
                                {billingCycle === 'monthly' ? 'Rp 149rb' : 'Rp 119rb'}
                            </span>
                            <span className="text-zinc-500 font-medium text-sm">/bulan</span>
                        </div>
                        <p className="mt-4 text-zinc-500 text-sm leading-relaxed">
                            {billingCycle === 'monthly' ? 'Ditagih bulanan.' : 'Ditagih Rp 1.428.000 per tahun.'} Solusi lengkap untuk praktisi.
                        </p>
                    </div>
                    
                    <div className="border-t border-zinc-100 my-6"></div>
                    
                    <ul className="space-y-4 mb-10 flex-1">
                         <li className="flex items-start gap-3 text-zinc-800 text-sm">
                            <Check className="w-5 h-5 text-asef-blue flex-shrink-0 mt-0.5" strokeWidth={3} />
                            <span><strong>Full Database:</strong> Akses ke ribuan UU, PP, Permenaker, Perpres, & SNI terkait.</span>
                        </li>
                        <li className="flex items-start gap-3 text-zinc-800 text-sm">
                            <Check className="w-5 h-5 text-asef-blue flex-shrink-0 mt-0.5" strokeWidth={3} />
                            <span><strong>Unlimited Chat:</strong> Konsultasi tanpa batas harian.</span>
                        </li>
                        <li className="flex items-start gap-3 text-zinc-800 text-sm">
                            <Check className="w-5 h-5 text-asef-blue flex-shrink-0 mt-0.5" strokeWidth={3} />
                            <span><strong>Vision AI:</strong> Analisa foto kondisi tidak aman di lapangan.</span>
                        </li>
                        <li className="flex items-start gap-3 text-zinc-800 text-sm">
                            <Check className="w-5 h-5 text-asef-blue flex-shrink-0 mt-0.5" strokeWidth={3} />
                            <span><strong>Document Generator:</strong> Buat JSA, IBPR, & Laporan Inspeksi (PDF/Docx).</span>
                        </li>
                        <li className="flex items-start gap-3 text-zinc-800 text-sm">
                            <Check className="w-5 h-5 text-asef-blue flex-shrink-0 mt-0.5" strokeWidth={3} />
                            <span>Prioritas Server & Support.</span>
                        </li>
                    </ul>

                    <button onClick={onStart} className="w-full py-4 px-6 bg-asef-blue hover:bg-emerald-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 hover:-translate-y-0.5">
                        Pilih Professional
                    </button>
                </div>

                {/* Enterprise Tier */}
                <div className="bg-white rounded-[2rem] p-8 border border-zinc-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group h-full">
                    <div className="mb-8">
                        <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest bg-zinc-100 px-3 py-1 rounded-full">Perusahaan</span>
                        <div className="mt-4 flex items-baseline gap-1">
                            <span className="text-5xl font-bold text-zinc-900 tracking-tight">Custom</span>
                        </div>
                        <p className="mt-4 text-zinc-500 text-sm leading-relaxed">Untuk tim HSE korporat besar dengan kebutuhan integrasi khusus.</p>
                    </div>

                    <div className="border-t border-zinc-100 my-6"></div>
                    
                    <ul className="space-y-4 mb-10 flex-1">
                        <li className="flex items-start gap-3 text-zinc-700 text-sm">
                            <Check className="w-5 h-5 text-zinc-300 flex-shrink-0 mt-0.5" strokeWidth={3} />
                            <span><strong>Multi-User Management:</strong> Dashboard admin terpusat.</span>
                        </li>
                        <li className="flex items-start gap-3 text-zinc-700 text-sm">
                            <Check className="w-5 h-5 text-zinc-300 flex-shrink-0 mt-0.5" strokeWidth={3} />
                            <span><strong>Private Knowledge Base:</strong> Upload SOP internal perusahaan Anda.</span>
                        </li>
                        <li className="flex items-start gap-3 text-zinc-700 text-sm">
                            <Check className="w-5 h-5 text-zinc-300 flex-shrink-0 mt-0.5" strokeWidth={3} />
                            <span>API Access & SSO Integration.</span>
                        </li>
                        <li className="flex items-start gap-3 text-zinc-700 text-sm">
                            <Check className="w-5 h-5 text-zinc-300 flex-shrink-0 mt-0.5" strokeWidth={3} />
                            <span>Dedicated Account Manager & SLA.</span>
                        </li>
                    </ul>

                    <button onClick={() => window.open('mailto:sales@siasef.id')} className="w-full py-4 px-6 bg-white border-2 border-zinc-200 hover:border-zinc-800 text-zinc-900 font-bold rounded-xl transition-all">
                        Hubungi Sales
                    </button>
                </div>
            </div>

            {/* FAQ Section */}
            <div className="max-w-3xl mx-auto mt-24">
                <h3 className="text-2xl font-bold text-zinc-900 mb-8 text-center">Pertanyaan Umum (FAQ)</h3>
                <div className="space-y-4">
                    {[
                        {q: "Apakah saya bisa membatalkan langganan kapan saja?", a: "Ya, Anda bisa membatalkan langganan kapan saja melalui menu Pengaturan Akun. Akses Pro akan tetap aktif hingga akhir periode tagihan."},
                        {q: "Apakah data perusahaan saya aman?", a: "Tentu. Kami menggunakan enkripsi standar industri (AES-256) dan tidak menggunakan data percakapan Anda untuk melatih model AI publik tanpa izin."},
                        {q: "Apakah hasil dokumen legal bisa langsung digunakan?", a: "Dokumen yang dihasilkan adalah draf referensi yang sangat akurat. Namun, sebagai standar prosedur hukum, kami tetap menyarankan validasi akhir oleh ahli hukum atau manajemen perusahaan."},
                        {q: "Apa bedanya versi Gratis dan Pro?", a: "Versi Gratis terbatas pada regulasi dasar dan kuota harian. Versi Pro membuka seluruh database hukum Indonesia (termasuk yang terbaru), fitur upload foto, dan pembuatan dokumen tanpa batas."}
                    ].map((faq, i) => (
                        <div key={i} className="bg-white border border-zinc-200 rounded-xl overflow-hidden transition-all">
                            <button 
                                onClick={() => toggleFaq(i)}
                                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-zinc-50 transition-colors"
                            >
                                <span className="font-bold text-zinc-800">{faq.q}</span>
                                {openFaq === i ? <ChevronUp className="w-5 h-5 text-zinc-400"/> : <ChevronDown className="w-5 h-5 text-zinc-400"/>}
                            </button>
                            <div className={`px-6 overflow-hidden transition-all duration-300 ${openFaq === i ? 'max-h-40 py-4 opacity-100 border-t border-zinc-100' : 'max-h-0 py-0 opacity-0'}`}>
                                <p className="text-zinc-600 text-sm leading-relaxed">{faq.a}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-white border-t border-zinc-200 flex-shrink-0">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-asef-primary text-white rounded-lg flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5" />
                </div>
                <span className="font-bold text-xl text-zinc-900">Si Asef</span>
            </div>
            <div className="flex gap-8 text-sm font-medium text-zinc-500">
                <a href="#" className="hover:text-emerald-600 transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-emerald-600 transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-emerald-600 transition-colors">Contact</a>
            </div>
            <div className="text-sm text-zinc-400">
                &copy; {new Date().getFullYear()} Si Asef AI. All rights reserved.
            </div>
        </div>
      </footer>

    </div>
  );
};

export default LandingPage;