import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Globe, 
  CheckCircle2, 
  Truck, 
  Mail, 
  Phone, 
  MapPin, 
  ChevronRight, 
  Menu, 
  X,
  Award,
  Leaf,
  Ship,
  Factory,
  Thermometer,
  Users,
  Plane,
  ShieldCheck,
  FileCheck
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { translations, type Language } from './translations';

import { AITools } from './components/AITools';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function App() {
  const [lang, setLang] = useState<Language>('es');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const t = translations[lang];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLang = () => setLang(prev => prev === 'es' ? 'en' : 'es');

  const NavItem = ({ href, children }: { href: string, children: React.ReactNode }) => (
    <a 
      href={href} 
      className="text-sm font-medium hover:text-emerald-600 transition-colors"
      onClick={() => setIsMenuOpen(false)}
    >
      {children}
    </a>
  );

  const destinations = [
    { code: 'US', name: 'USA' },
    { code: 'EU', name: 'Europe' },
    { code: 'GB', name: 'UK' },
    { code: 'JP', name: 'Japan' },
    { code: 'AU', name: 'Australia' },
    { code: 'CA', name: 'Canada' },
    { code: 'KR', name: 'South Korea' },
  ];

  return (
    <div className="min-h-screen bg-[#FDFDFB] text-slate-900 font-sans selection:bg-emerald-100 selection:text-emerald-900">
      {/* Navigation */}
      <nav className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 border-b",
        scrolled ? "bg-white/80 backdrop-blur-md py-3 border-slate-200 shadow-sm" : "bg-transparent py-5 border-transparent"
      )}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
              E
            </div>
            <span className="text-xl font-display font-bold tracking-tight text-slate-900">
              Espara<span className="text-emerald-600">Go</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <NavItem href="#about">{t.nav.about}</NavItem>
            <NavItem href="#products">{t.nav.products}</NavItem>
            <NavItem href="#certifications">{t.nav.certifications}</NavItem>
            <NavItem href="#capacity">{t.nav.capacity}</NavItem>
            <NavItem href="#innovation">Innovation</NavItem>
            <NavItem href="#contact">{t.nav.contact}</NavItem>
            
            <button 
              onClick={toggleLang}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 hover:bg-slate-50 transition-colors text-xs font-semibold uppercase tracking-wider"
            >
              <Globe className="w-3.5 h-3.5" />
              {lang === 'es' ? 'EN' : 'ES'}
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 w-full bg-white border-b border-slate-200 p-6 flex flex-col gap-4 md:hidden shadow-xl"
            >
              <NavItem href="#about">{t.nav.about}</NavItem>
              <NavItem href="#products">{t.nav.products}</NavItem>
              <NavItem href="#certifications">{t.nav.certifications}</NavItem>
              <NavItem href="#capacity">{t.nav.capacity}</NavItem>
              <NavItem href="#innovation">Innovation</NavItem>
              <NavItem href="#contact">{t.nav.contact}</NavItem>
              <button 
                onClick={toggleLang}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-slate-50 font-bold"
              >
                <Globe className="w-4 h-4" />
                {lang === 'es' ? 'English Version' : 'Versión en Español'}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>


      {/* Hero Section */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2070&auto=format&fit=crop" 
            alt="Cinematic Asparagus Fields in Ica at Sunrise" 
            className="w-full h-full object-cover brightness-[0.6]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl text-white"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-600/90 backdrop-blur-sm text-xs font-bold uppercase tracking-widest mb-6">
              {t.capacity.origin}
            </span>
            <h1 className="text-5xl md:text-7xl font-display font-bold leading-[1.1] mb-6 tracking-tight">
              {t.hero.title}
            </h1>
            <p className="text-xl text-white/80 mb-10 leading-relaxed max-w-lg">
              {t.hero.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="#contact" 
                className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2 group"
              >
                {t.hero.cta}
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a 
                href="#products" 
                className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 rounded-xl font-bold transition-all flex items-center justify-center"
              >
                {t.nav.products}
              </a>
            </div>
          </motion.div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-white/50">
          <div className="w-px h-12 bg-gradient-to-b from-white/50 to-transparent" />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1589923188900-85dae523342b?q=80&w=1974&auto=format&fit=crop" 
                  alt="EsparaGo Team - Export Excellence" 
                  className="rounded-3xl shadow-2xl z-10 relative object-cover h-[500px] w-full"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-emerald-50 rounded-3xl -z-10" />
              </div>
            </motion.div>
            
            <div>
              <span className="text-emerald-600 font-bold uppercase tracking-widest text-sm mb-4 block">
                {t.nav.about}
              </span>
              <h2 className="text-4xl font-display font-bold mb-8 text-slate-900 tracking-tight">
                {t.about.title}
              </h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                {t.about.description}
              </p>
              <p className="text-lg text-slate-600 mb-10 leading-relaxed italic border-l-4 border-emerald-500 pl-6">
                "{t.about.mission}"
              </p>
              
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="text-3xl font-bold text-emerald-600 mb-1">15+</div>
                  <div className="text-sm text-slate-500 font-medium uppercase tracking-wider">Años de Exp.</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-emerald-600 mb-1">20+</div>
                  <div className="text-sm text-slate-500 font-medium uppercase tracking-wider">Países Destino</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold mb-4 tracking-tight">{t.benefits.title}</h2>
            <div className="w-20 h-1.5 bg-emerald-500 mx-auto rounded-full" />
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center p-8 rounded-3xl bg-white/5 border border-white/10">
              <div className="w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Leaf className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-4">{t.benefits.healthTitle}</h3>
              <p className="text-slate-400 leading-relaxed">{t.benefits.healthDesc}</p>
            </div>
            
            <div className="text-center p-8 rounded-3xl bg-white/5 border border-white/10">
              <div className="w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Globe className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-4">{t.benefits.businessTitle}</h3>
              <p className="text-slate-400 leading-relaxed">{t.benefits.businessDesc}</p>
            </div>
            
            <div className="text-center p-8 rounded-3xl bg-white/5 border border-white/10">
              <div className="w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-4">{t.benefits.qualityTitle}</h3>
              <p className="text-slate-400 leading-relaxed">{t.benefits.qualityDesc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold mb-4 tracking-tight">{t.products.title}</h2>
            <div className="w-20 h-1.5 bg-emerald-600 mx-auto rounded-full" />
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                name: t.products.green.name, 
                desc: t.products.green.desc, 
                img: "https://images.unsplash.com/photo-1519623286359-e9f3cbef015b?q=80&w=1000&auto=format&fit=crop" 
              },
              { 
                name: t.products.white.name, 
                desc: t.products.white.desc, 
                img: "https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?q=80&w=1000&auto=format&fit=crop" 
              },
              { 
                name: "Export Packaging", 
                desc: "Peruvian Asparagus – Export Quality. Standardized boxes for global distribution.", 
                img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1000&auto=format&fit=crop" 
              }
            ].map((product, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-100"
              >
                <div className="h-64 overflow-hidden">
                  <img 
                    src={product.img} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-bold mb-3">{product.name}</h3>
                  <p className="text-slate-600 leading-relaxed mb-6">
                    {product.desc}
                  </p>
                  <a href="#contact" className="text-emerald-600 font-bold flex items-center gap-2 text-sm uppercase tracking-wider hover:gap-3 transition-all">
                    {t.hero.cta} <ChevronRight className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="py-24 bg-emerald-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-800 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-display font-bold mb-6 tracking-tight">{t.certifications.title}</h2>
              <p className="text-xl text-emerald-100/80 mb-12">
                {t.certifications.subtitle}
              </p>
              
              <div className="grid sm:grid-cols-2 gap-8">
                {[
                  { 
                    text: t.certifications.organic,
                    badge: "https://upload.wikimedia.org/wikipedia/commons/3/3a/USDA_Organic_seal.svg",
                    desc: "Certificación internacional para productos libres de pesticidas."
                  },
                  { 
                    text: t.certifications.gap,
                    badge: "https://www.globalgap.org/export/sites/default/.content/images/logos/GLOBALGAP_Logo_Standard_RGB.png",
                    desc: "Buenas Prácticas Agrícolas reconocidas mundialmente."
                  },
                  { 
                    text: t.certifications.haccp,
                    badge: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/HACCP_Logo.svg/1200px-HACCP_Logo.svg.png",
                    desc: "Análisis de Peligros y Puntos Críticos de Control."
                  },
                  { 
                    text: t.certifications.smeta,
                    badge: "https://www.sedex.com/wp-content/uploads/2021/04/Sedex_Logo_RGB.png",
                    desc: "Auditoría de comercio ético y responsabilidad social."
                  }
                ].map((cert, i) => (
                  <div key={i} className="flex flex-col sm:flex-row items-center gap-6 bg-white/10 p-8 rounded-[2rem] border border-white/20 hover:bg-white/20 transition-all group backdrop-blur-sm">
                    <div className="w-28 h-28 bg-white rounded-full flex items-center justify-center shrink-0 shadow-[0_15px_30px_rgba(0,0,0,0.3)] border-4 border-emerald-500/30 group-hover:scale-110 transition-transform relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 to-transparent opacity-50" />
                      <img src={cert.badge} className="w-20 h-20 object-contain relative z-10 p-2" alt={cert.text} />
                    </div>
                    <div className="text-center sm:text-left">
                      <span className="font-display font-bold text-xl block mb-1 text-white">{cert.text}</span>
                      <p className="text-emerald-100/60 text-sm mb-3 max-w-[200px]">{cert.desc}</p>
                      <div className="flex items-center justify-center sm:justify-start gap-2">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                        <span className="text-emerald-400 text-[10px] uppercase tracking-[0.2em] font-black">Verified & Active</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative hidden lg:block">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <img src="https://images.unsplash.com/photo-1589923188900-85dae523342b?q=80&w=1000&auto=format&fit=crop" className="rounded-2xl shadow-2xl border-4 border-white/20" alt="Quality Control" referrerPolicy="no-referrer" />
                  <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
                    <div className="flex items-center gap-3 mb-2">
                      <ShieldCheck className="w-6 h-6 text-emerald-400" />
                      <span className="font-bold text-white">Auditoría Aprobada</span>
                    </div>
                    <p className="text-emerald-100/60 text-sm">Inspecciones anuales rigurosas para mantener los más altos estándares.</p>
                  </div>
                </div>
                <div className="space-y-4 mt-12">
                  <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
                    <div className="flex items-center gap-3 mb-2">
                      <FileCheck className="w-6 h-6 text-emerald-400" />
                      <span className="font-bold text-white">Documentación Full</span>
                    </div>
                    <p className="text-emerald-100/60 text-sm">Trazabilidad completa desde la semilla hasta el destino final.</p>
                  </div>
                  <img src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1000&auto=format&fit=crop" className="rounded-2xl shadow-2xl border-4 border-white/20" alt="Export Documentation" referrerPolicy="no-referrer" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Capacity Section */}
      <section id="capacity" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16">
            <div className="bg-slate-50 p-12 rounded-[2.5rem] border border-slate-100 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-100/50 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
              <MapPin className="w-12 h-12 text-emerald-600 mb-6" />
              <h3 className="text-3xl font-display font-bold mb-6 tracking-tight">{t.capacity.origin}</h3>
              <p className="text-lg text-slate-600 leading-relaxed">
                {t.capacity.originDesc}
              </p>
              <div className="mt-8 flex items-center gap-4 text-emerald-700 font-bold">
                <Globe className="w-5 h-5" />
                <span>Exportación Global 24/7</span>
              </div>
            </div>
            
            <div className="bg-emerald-50 p-12 rounded-[2.5rem] border border-emerald-100 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-200/50 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
              <Ship className="w-12 h-12 text-emerald-600 mb-6" />
              <h3 className="text-3xl font-display font-bold mb-6 tracking-tight">{t.capacity.capacityTitle}</h3>
              <p className="text-lg text-slate-600 leading-relaxed">
                {t.capacity.capacityDesc}
              </p>
              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3 text-slate-700 font-semibold">
                  <Truck className="w-5 h-5 text-emerald-600" />
                  <span>Logística Aérea Diaria</span>
                </div>
                <div className="flex items-center gap-3 text-slate-700 font-semibold">
                  <Ship className="w-5 h-5 text-emerald-600" />
                  <span>Contenedores Marítimos Semanales</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl font-display font-bold mb-12 tracking-tight">{t.facilities.title}</h2>
              <div className="grid sm:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600">
                    <Factory className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-bold">{t.facilities.packing.title}</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">{t.facilities.packing.desc}</p>
                  <img src="https://images.unsplash.com/photo-1589923188900-85dae523342b?q=80&w=400&auto=format&fit=crop" className="rounded-xl h-32 w-full object-cover" alt="Packing Plant Workers" />
                </div>
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600">
                    <Thermometer className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-bold">{t.facilities.cold.title}</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">{t.facilities.cold.desc}</p>
                  <img src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=400&auto=format&fit=crop" className="rounded-xl h-32 w-full object-cover" alt="Cold Storage Warehouse" />
                </div>
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600">
                    <Plane className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-bold">Logística Aérea</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">Pallets de exportación listos para despacho.</p>
                  <img src="https://images.unsplash.com/photo-1580674684081-7617fbf3d745?q=80&w=400&auto=format&fit=crop" className="rounded-xl h-32 w-full object-cover" alt="Export Pallets" />
                </div>
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600">
                    <Ship className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-bold">Exportación Marítima</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">Contenedores refrigerados en puerto.</p>
                  <img src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=400&auto=format&fit=crop" className="rounded-xl h-32 w-full object-cover" alt="Shipping Containers" />
                </div>
              </div>
            </div>

            <div className="bg-white p-12 rounded-[2.5rem] border border-slate-200 shadow-sm">
              <h2 className="text-4xl font-display font-bold mb-12 tracking-tight">{t.destinations.title}</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                {destinations.map((dest) => (
                  <div key={dest.code} className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-emerald-200 transition-colors">
                    <span className="text-2xl font-bold text-emerald-600">{dest.code}</span>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{dest.name}</span>
                  </div>
                ))}
                <div className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-emerald-600 text-white">
                  <Globe className="w-6 h-6" />
                  <span className="text-xs font-bold uppercase tracking-widest">{t.destinations.more}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold mb-4 tracking-tight">Galería de Calidad</h2>
            <div className="w-20 h-1.5 bg-emerald-600 mx-auto rounded-full" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-4">
              <img src="https://images.unsplash.com/photo-1515471204579-475f85386c6a?q=80&w=1000&auto=format&fit=crop" className="rounded-2xl w-full h-48 object-cover shadow-lg" referrerPolicy="no-referrer" />
              <img src="https://images.unsplash.com/photo-1519623286359-e9f3cbef015b?q=80&w=1000&auto=format&fit=crop" className="rounded-2xl w-full h-64 object-cover shadow-lg" referrerPolicy="no-referrer" />
            </div>
            <div className="space-y-4">
              <img src="https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=1000&auto=format&fit=crop" className="rounded-2xl w-full h-64 object-cover shadow-lg" referrerPolicy="no-referrer" />
              <img src="https://images.unsplash.com/photo-1622484211148-716598e04141?q=80&w=1000&auto=format&fit=crop" className="rounded-2xl w-full h-48 object-cover shadow-lg" referrerPolicy="no-referrer" />
            </div>
            <div className="space-y-4">
              <img src="https://images.unsplash.com/photo-1464454709131-ffd692591ee5?q=80&w=1000&auto=format&fit=crop" className="rounded-2xl w-full h-48 object-cover shadow-lg" referrerPolicy="no-referrer" />
              <img src="https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?q=80&w=1000&auto=format&fit=crop" className="rounded-2xl w-full h-64 object-cover shadow-lg" referrerPolicy="no-referrer" />
            </div>
            <div className="space-y-4">
              <img src="https://images.unsplash.com/photo-1515471204579-475f85386c6a?q=80&w=1000&auto=format&fit=crop" className="rounded-2xl w-full h-64 object-cover shadow-lg" referrerPolicy="no-referrer" />
              <img src="https://images.unsplash.com/photo-1519623286359-e9f3cbef015b?q=80&w=1000&auto=format&fit=crop" className="rounded-2xl w-full h-48 object-cover shadow-lg" referrerPolicy="no-referrer" />
            </div>
          </div>
        </div>
      </section>

      {/* Quality Showcase Section */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 tracking-tight">
                Calidad que se Ve y se Siente
              </h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Nuestros campos en Ica y Trujillo producen los espárragos más robustos y vibrantes del mundo. 
                Cada turión es un testimonio de la prosperidad de nuestra tierra y el cuidado de nuestra gente.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <img 
                  src="https://images.unsplash.com/photo-1622484211148-716598e04141?q=80&w=800&auto=format&fit=crop" 
                  className="rounded-2xl shadow-md h-48 w-full object-cover" 
                  referrerPolicy="no-referrer" 
                />
                <img 
                  src="https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?q=80&w=800&auto=format&fit=crop" 
                  className="rounded-2xl shadow-md h-48 w-full object-cover" 
                  referrerPolicy="no-referrer" 
                />
              </div>
            </div>
            <div className="order-1 md:order-2">
              <img 
                src="https://images.unsplash.com/photo-1595841696677-6489ff3f8cd1?q=80&w=1200&auto=format&fit=crop" 
                className="rounded-[3rem] shadow-2xl w-full h-[600px] object-cover" 
                referrerPolicy="no-referrer" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Innovation Lab Section */}
      <section id="innovation" className="py-24 bg-slate-900 overflow-hidden relative">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#10b981_0%,transparent_50%)]" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <span className="text-emerald-400 font-bold uppercase tracking-widest text-sm mb-4 block">
              {t.innovation.title}
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 tracking-tight">
              {lang === 'es' ? 'Tecnología de Vanguardia para el Agro' : 'Cutting-Edge Tech for Agriculture'}
            </h2>
            <p className="text-emerald-100/60 max-w-2xl mx-auto text-lg">
              {t.innovation.subtitle}
            </p>
          </div>

          <AITools />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-slate-100">
            <div className="grid lg:grid-cols-5">
              <div className="lg:col-span-2 bg-emerald-600 p-12 text-white">
                <h2 className="text-4xl font-display font-bold mb-8 tracking-tight">¿Listo para Importar?</h2>
                <p className="text-emerald-100 mb-12 text-lg">
                  Contacte a nuestro equipo de exportación para cotizaciones.
                </p>
                
                <div className="space-y-8">
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-sm text-emerald-200 uppercase tracking-widest font-bold mb-1">WhatsApp / Call</div>
                      <div className="text-xl font-bold">+51 959217046</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-sm text-emerald-200 uppercase tracking-widest font-bold mb-1">Email</div>
                      <div className="text-xl font-bold">export@esparago.pe</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-sm text-emerald-200 uppercase tracking-widest font-bold mb-1">Location</div>
                      <div className="text-xl font-bold">Lima, Perú</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-3 p-12">
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">{t.contact.name}</label>
                      <input type="text" className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">{t.contact.email}</label>
                      <input type="email" className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">{t.contact.company}</label>
                    <input type="text" className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">{t.contact.message}</label>
                    <textarea rows={4} className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all resize-none"></textarea>
                  </div>
                  <button className="w-full py-5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl transition-all shadow-lg shadow-emerald-200 text-lg">
                    {t.contact.send}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
              E
            </div>
            <span className="text-lg font-bold tracking-tight">
              Espara<span className="text-emerald-600">Go</span> S.A.C
            </span>
          </div>
          
          <div className="text-slate-500 text-sm font-medium">
            {t.footer.rights}
          </div>
          
          <div className="flex gap-6">
            <a href="#" className="text-slate-400 hover:text-emerald-600 transition-colors">LinkedIn</a>
            <a href="#" className="text-slate-400 hover:text-emerald-600 transition-colors">Instagram</a>
            <a href="#" className="text-slate-400 hover:text-emerald-600 transition-colors">Facebook</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
