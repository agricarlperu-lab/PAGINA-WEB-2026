/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  motion, 
  AnimatePresence 
} from 'motion/react';
import { 
  X, 
  Menu, 
  User, 
  Mail, 
  MessageSquare, 
  Send,
  ExternalLink,
  Leaf, 
  CheckCircle, 
  ChevronRight,
  ChevronDown,
  ArrowLeft,
  DollarSign,
  Briefcase,
  TrendingUp,
  Award,
  Shield,
  MapPin,
  Phone,
  Building2,
  Sparkles,
  Check,
  Clock,
  Globe,
  Sliders,
  Camera,
  Play,
  Film
} from 'lucide-react';
import logoAmazonico from './agricarl_logo_amazonico.svg';
import { COMMERCE_ITEMS, CommerceItem, SiteTextConfig, DEFAULT_SITE_TEXT } from './data';
import SachaInchiPage from './components/SachaInchiPage';
import CacaoPage from './components/CacaoPage';
import AguajePage from './components/AguajePage';
import CocoPage from './components/CocoPage';
import cocoHeroImg from './assets/images/regenerated_image_1789613068806.jpg';
import CobragoodPage from './components/CobragoodPage';
import GestorContablePage from './components/GestorContablePage';
import { AnimatedHeroCarousel, ContinuousMovingImageMarquee, GALLERY_IMAGES, GalleryItem } from './components/AnimatedImageCarousel';
import { AntMotionBanner } from './components/AntMotionBanner';
import { EditableText } from './components/EditableText';
import { EditableMedia } from './components/EditableMedia';
import { EditableBackground } from './components/EditableBackground';
import { MediaProvider, useMedia } from './context/MediaContext';
import { ImageEditModal } from './components/ImageEditModal';
import { MediaManagerDrawer } from './components/MediaManagerDrawer';
import { SectionDivider } from './components/SectionDivider';
import LocationMapSanMartin from './components/LocationMapSanMartin';
import { CorporateBrochureButton } from './components/CorporateBrochureButton';
import { ExecutiveCard } from './components/ExecutiveCard';
import { PresentationVideoSection } from './components/PresentationVideoSection';
import { FileDown } from 'lucide-react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { LanguageToggle } from './components/LanguageToggle';

type PageId = 'inicio' | 'quienes-somos' | 'productos' | 'servicios' | 'contacto';

function AppContent() {
  const { getImage, openDrawer, openEditor } = useMedia();
  const { language, translations, siteText, commerceItems, t } = useLanguage();
  // Page state: "inicio" | "quienes-somos" | "productos" | "servicios" | "contacto"
  const [activePage, setActivePage] = useState<PageId>('inicio');
  
  // Sub-page state: Selected CommerceItem for dedicated sub-page detail view
  const [activeSubPage, setActiveSubPage] = useState<CommerceItem | null>(null);

  // Corporate logo (Amazonian identity, persistent)
  const [logoUrl] = useState<string>(() => {
    try {
      return localStorage.getItem('agricarl_logo') || logoAmazonico;
    } catch {
      return logoAmazonico;
    }
  });

  // Mobile navigation drawer toggle
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Contact Form state
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formSubject, setFormSubject] = useState('');
  const [formMsg, setFormMsg] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [submissionFeedback, setSubmissionFeedback] = useState<{
    success: boolean;
    delivery?: string;
    message?: string;
    targetEmail?: string;
  } | null>(null);
  const [apiStatus, setApiStatus] = useState<{
    configured: boolean;
    provider: string;
    targetEmail: string;
  }>({
    configured: false,
    provider: 'server',
    targetEmail: 'operaciones@agricarlperu.com'
  });

  useEffect(() => {
    fetch('/api/contact/status')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.targetEmail) {
          setApiStatus(data);
        }
      })
      .catch(() => {});
  }, []);

  // Interactive simulators state
  const [simAmount, setSimAmount] = useState<number>(1500);
  const [simBank, setSimBank] = useState<string>('BCP');
  const [simTax, setSimTax] = useState<number>(18);

  // Effect to cleanse any legacy localStorage entries from previous sessions
  useEffect(() => {
    try {
      const raw = localStorage.getItem('agricarl_site_text');
      if (raw && (raw.includes('gmail.com') || raw.includes('Lozada') || raw.includes('Monsalve'))) {
        const parsed = JSON.parse(raw);
        parsed.contactEmail = 'operaciones@agricarlperu.com';
        delete parsed.operationsManager;
        delete parsed.operationsManagerRole;
        localStorage.setItem('agricarl_site_text', JSON.stringify(parsed));
      }
    } catch {}
  }, []);

  const [galleryImages] = useState<GalleryItem[]>(() => {
    try {
      const saved = localStorage.getItem('agricarl_gallery_images');
      if (saved) {
        let parsed: GalleryItem[] = JSON.parse(saved);
        // Cleanse and replace any legacy Cobragood references with AgriCobros
        parsed = parsed.map(item => {
          const isAgriCobros = item.id.includes('cobragood') || item.id.includes('agricobros') || item.id === 'gestion-recaudacion';
          const def = GALLERY_IMAGES.find(d => d.id === item.id || (isAgriCobros && (d.id === 'agricobros-1' || d.id === 'cobragood-1')));

          let title = def ? def.title : item.title;
          let subtitle = def ? def.subtitle : item.subtitle;
          let description = def ? def.description : item.description;
          const category = def ? def.category : item.category;
          const badgeColor = def ? def.badgeColor : item.badgeColor;

          title = (title || '').replace(/cobragood/gi, 'AgriCobros');
          subtitle = (subtitle || '').replace(/cobragood/gi, 'AgriCobros');
          description = (description || '').replace(/cobragood/gi, 'AgriCobros');

          return {
            ...item,
            id: isAgriCobros ? 'agricobros-1' : item.id,
            title,
            subtitle,
            description,
            category,
            badgeColor,
            image: item.image || (def ? def.image : '')
          };
        });

        // Ensure all definitions in GALLERY_IMAGES are present
        GALLERY_IMAGES.forEach(def => {
          const exists = parsed.some(p => p.id === def.id || (def.id.includes('agricobros') && p.id.includes('agricobros')));
          if (!exists) {
            parsed.push(def);
          }
        });

        localStorage.setItem('agricarl_gallery_images', JSON.stringify(parsed));
        return parsed;
      }
      return GALLERY_IMAGES;
    } catch (e) {
      return GALLERY_IMAGES;
    }
  });

  const [heroBgUrl] = useState<string>(() => {
    try {
      return localStorage.getItem('agricarl_hero_bg') || 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=1920&auto=format&fit=crop';
    } catch (e) {
      return 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=1920&auto=format&fit=crop';
    }
  });

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formEmail.trim() || !formMsg.trim()) return;

    setFormLoading(true);

    const targetEmail = 'operaciones@agricarlperu.com';
    const payload = {
      name: formName.trim(),
      email: formEmail.trim(),
      phone: formPhone.trim(),
      subject: formSubject.trim() || 'Consulta Comercial / Servicios',
      message: formMsg.trim()
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmissionFeedback({
          success: true,
          delivery: data.delivery,
          message: data.message || `Consulta remitida a ${targetEmail}`,
          targetEmail: data.targetEmail || targetEmail
        });
      } else {
        throw new Error(data.error || 'Respuesta no satisfactoria del servidor');
      }
    } catch (err: any) {
      console.warn('Envío de fondo no disponible en este entorno, activando vía directa:', err);
      // Fallback: Still confirm capture and prepare direct client send
      setSubmissionFeedback({
        success: true,
        delivery: 'client_dispatch',
        message: `Mensaje preparado para despacho a ${targetEmail}`,
        targetEmail
      });
    } finally {
      setFormLoading(false);
      setFormSubmitted(true);
    }
  };

  const handleResetForm = () => {
    setFormName('');
    setFormEmail('');
    setFormPhone('');
    setFormSubject('');
    setFormMsg('');
    setFormSubmitted(false);
    setSubmissionFeedback(null);
  };

  // Helper to switch pages
  const navigateToPage = (page: PageId) => {
    setActivePage(page);
    setActiveSubPage(null);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Helper to navigate to a sub-page (detail view)
  const navigateToSubPage = (item: CommerceItem) => {
    setActiveSubPage(item);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-brand-light font-sans text-brand-dark flex flex-col justify-between overflow-x-clip antialiased selection:bg-brand-green selection:text-white relative bg-architectural-grid">
      
      {/* 1. Cabecera y Navegación (Header) Fija y Permanente */}
      {/* 1. Cabecera y Navegación (Header) Fija y Permanente en Color Vino */}
      <header 
        id="header"
        className="w-full fixed top-0 left-0 right-0 z-50 bg-[#4c0519]/95 backdrop-blur-xl border-b border-[#6e0d25]/80 shadow-md transition-all duration-300 text-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between gap-4">
          {/* Logo brand & Name */}
          <div className="flex items-center gap-3.5">
            <div className="relative group/logo">
              <button 
                onClick={() => navigateToPage('inicio')}
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border-2 border-emerald-400/40 p-0.5 flex items-center justify-center shadow-xs overflow-hidden cursor-pointer bg-white hover:border-emerald-400 transition-all duration-300"
                title="AGRICARL PERÚ S.A.C. - Inicio"
              >
                <img 
                  src={getImage('logo', logoUrl)} 
                  alt="AGRICARL Logo" 
                  className="w-full h-full object-cover rounded-full hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  openEditor({
                    key: 'logo',
                    title: 'Logo Corporativo AGRICARL',
                    type: 'image',
                    currentSrc: getImage('logo', logoUrl),
                    defaultSrc: logoUrl,
                    section: 'Identidad Corporativa'
                  });
                }}
                className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-700 text-white flex items-center justify-center opacity-0 group-hover/logo:opacity-100 transition-opacity shadow-md cursor-pointer hover:bg-emerald-600 print:hidden"
                title="Cambiar Logo"
              >
                <Camera className="w-2.5 h-2.5" />
              </button>
            </div>
            <button 
              onClick={() => navigateToPage('inicio')}
              className="text-left cursor-pointer focus:outline-none group"
            >
              <span className="font-display font-black text-base sm:text-lg lg:text-xl tracking-tight text-white uppercase block leading-none group-hover:text-rose-200 transition-colors">
                AGRICARL PERÚ
              </span>
              <span className="text-[9px] sm:text-[10px] font-mono font-bold tracking-wider text-rose-200/90 uppercase mt-0.5 block">
                {language === 'es' ? 'Conectando al agricultor con el mercado' : 'Connecting farmers with the market'}
              </span>
            </button>
          </div>

          {/* Desktop Navigation Menu */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8" id="nav-desktop">
            <button 
              onClick={() => navigateToPage('inicio')}
              className={`text-xs font-bold tracking-wider uppercase transition-colors py-2 relative cursor-pointer ${
                activePage === 'inicio' && !activeSubPage ? 'text-white font-bold' : 'text-rose-100/85 hover:text-white'
              }`}
            >
              {translations.nav.home}
              {activePage === 'inicio' && !activeSubPage && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-400 rounded-full" />
              )}
            </button>

            <button 
              onClick={() => navigateToPage('quienes-somos')}
              className={`text-xs font-bold tracking-wider uppercase transition-colors py-2 relative cursor-pointer ${
                activePage === 'quienes-somos' && !activeSubPage ? 'text-white font-bold' : 'text-rose-100/85 hover:text-white'
              }`}
            >
              {translations.nav.about}
              {activePage === 'quienes-somos' && !activeSubPage && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-400 rounded-full" />
              )}
            </button>

            {/* Productos Dropdown */}
            <div className="relative group">
              <button 
                onClick={() => navigateToPage('productos')}
                className={`text-xs font-bold tracking-wider uppercase transition-colors py-2 flex items-center gap-1 cursor-pointer ${
                  activePage === 'productos' || (activeSubPage && (activeSubPage.id === 'cacao' || activeSubPage.id === 'sacha-inchi' || activeSubPage.id === 'aguaje-deshidratado' || activeSubPage.id === 'coco-derivados'))
                    ? 'text-white font-bold' 
                    : 'text-rose-100/85 hover:text-white'
                }`}
              >
                <span>{translations.nav.products}</span>
                <ChevronDown className="w-3.5 h-3.5 text-rose-200 transition-transform duration-200 group-hover:rotate-180" />
              </button>

              <div className="absolute top-full left-0 w-60 bg-white border border-rose-100/80 rounded-2xl shadow-xl py-2 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-200 z-50">
                <button 
                  onClick={() => {
                    const item = commerceItems.find(i => i.id === 'cacao') || COMMERCE_ITEMS.find(i => i.id === 'cacao');
                    if (item) navigateToSubPage(item);
                  }}
                  className="w-full text-left px-4 py-2.5 text-xs font-medium text-slate-700 hover:bg-rose-50 hover:text-[#4c0519] transition-colors cursor-pointer flex items-center justify-between"
                >
                  <span>{commerceItems.find(i => i.id === 'cacao')?.title || 'Cacao Amazónico'}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </button>
                <button 
                  onClick={() => {
                    const item = commerceItems.find(i => i.id === 'sacha-inchi') || COMMERCE_ITEMS.find(i => i.id === 'sacha-inchi');
                    if (item) navigateToSubPage(item);
                  }}
                  className="w-full text-left px-4 py-2.5 text-xs font-medium text-slate-700 hover:bg-rose-50 hover:text-[#4c0519] transition-colors cursor-pointer flex items-center justify-between"
                >
                  <span>{commerceItems.find(i => i.id === 'sacha-inchi')?.title || 'Sacha Inchi'}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </button>
                <button 
                  onClick={() => {
                    const item = commerceItems.find(i => i.id === 'aguaje-deshidratado') || COMMERCE_ITEMS.find(i => i.id === 'aguaje-deshidratado');
                    if (item) navigateToSubPage(item);
                  }}
                  className="w-full text-left px-4 py-2.5 text-xs font-medium text-slate-700 hover:bg-rose-50 hover:text-[#4c0519] transition-colors cursor-pointer flex items-center justify-between"
                >
                  <span>{commerceItems.find(i => i.id === 'aguaje-deshidratado')?.title || 'Aguaje Deshidratado'}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </button>
                <button 
                  onClick={() => {
                    const item = commerceItems.find(i => i.id === 'coco-derivados') || COMMERCE_ITEMS.find(i => i.id === 'coco-derivados');
                    if (item) navigateToSubPage(item);
                  }}
                  className="w-full text-left px-4 py-2.5 text-xs font-medium text-slate-700 hover:bg-rose-50 hover:text-[#4c0519] transition-colors cursor-pointer flex items-center justify-between"
                >
                  <span>{commerceItems.find(i => i.id === 'coco-derivados')?.title || 'Coco & Subproductos'}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </button>
              </div>
            </div>

            {/* Servicios Dropdown */}
            <div className="relative group">
              <button 
                onClick={() => navigateToPage('servicios')}
                className={`text-xs font-bold tracking-wider uppercase transition-colors py-2 flex items-center gap-1 cursor-pointer ${
                  activePage === 'servicios' || (activeSubPage && (activeSubPage.id === 'gestion-recaudacion' || activeSubPage.id === 'gestor-contable'))
                    ? 'text-white font-bold' 
                    : 'text-rose-100/85 hover:text-white'
                }`}
              >
                <span>{translations.nav.services}</span>
                <ChevronDown className="w-3.5 h-3.5 text-rose-200 transition-transform duration-200 group-hover:rotate-180" />
              </button>

              <div className="absolute top-full left-0 w-64 bg-white border border-rose-100/80 rounded-2xl shadow-xl py-2 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-200 z-50">
                <button 
                  onClick={() => {
                    const item = commerceItems.find(i => i.id === 'gestion-recaudacion') || COMMERCE_ITEMS.find(i => i.id === 'gestion-recaudacion');
                    if (item) navigateToSubPage(item);
                  }}
                  className="w-full text-left px-4 py-2.5 text-xs font-medium text-slate-700 hover:bg-rose-50 hover:text-[#4c0519] transition-colors cursor-pointer flex items-center justify-between"
                >
                  <span>{commerceItems.find(i => i.id === 'gestion-recaudacion')?.title || 'Sistema AgriCobros'}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </button>
                <button 
                  onClick={() => {
                    const item = commerceItems.find(i => i.id === 'gestor-contable') || COMMERCE_ITEMS.find(i => i.id === 'gestor-contable');
                    if (item) navigateToSubPage(item);
                  }}
                  className="w-full text-left px-4 py-2.5 text-xs font-medium text-slate-700 hover:bg-rose-50 hover:text-[#4c0519] transition-colors cursor-pointer flex items-center justify-between"
                >
                  <span>{commerceItems.find(i => i.id === 'gestor-contable')?.title || 'Gestor Contable Formato 5.2'}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </button>
              </div>
            </div>

            <button 
              onClick={() => navigateToPage('contacto')}
              className={`text-xs font-bold tracking-wider uppercase transition-colors py-2 relative cursor-pointer ${
                activePage === 'contacto' && !activeSubPage ? 'text-white font-bold' : 'text-rose-100/85 hover:text-white'
              }`}
            >
              {translations.nav.contact}
              {activePage === 'contacto' && !activeSubPage && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-400 rounded-full" />
              )}
            </button>
          </nav>

          {/* Right Header Action Button */}
          <div className="hidden md:flex items-center gap-2.5 print:hidden">
            <LanguageToggle variant="header" />
            <button
              onClick={openDrawer}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider text-rose-100 bg-white/10 hover:bg-white/20 border border-white/20 transition-all cursor-pointer shadow-2xs"
              title={language === 'es' ? 'Personalizar todas las imágenes y fondos de la página' : 'Customize all page images and backgrounds'}
            >
              <Sliders className="w-3.5 h-3.5 text-rose-200" />
              <span>{translations.nav.editMedia}</span>
            </button>
            <CorporateBrochureButton 
              variant="header" 
              companyRuc={siteText.companyRuc} 
              email={siteText.contactEmail}
              phone={siteText.contactPhone}
            />
            <button 
              onClick={() => navigateToPage('contacto')}
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-4.5 py-2 rounded-full text-xs font-bold uppercase tracking-wider shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer flex items-center gap-1.5"
            >
              <span>{translations.nav.getQuote}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile hamburger menu & Language Toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <LanguageToggle variant="compact" />
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none cursor-pointer print:hidden"
              aria-label="Toggle navigation menu"
              id="mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="md:hidden fixed top-20 sm:top-22 left-4 right-4 bg-[#3b0513] border border-[#6e0d25] rounded-2xl shadow-2xl z-50 p-4 print:hidden"
            id="mobile-navigation-panel"
          >
            <div className="flex flex-col space-y-2">
              {/* Lema en Menú Móvil */}
              <div className="px-2 py-1.5 bg-black/20 rounded-lg border border-rose-500/20 text-center mb-1">
                <p className="text-[10px] font-mono font-bold text-rose-200 uppercase tracking-wider">
                  {language === 'es' ? 'AGRICARL PERÚ: Conectando al agricultor con el mercado' : 'AGRICARL PERU: Connecting farmers with the market'}
                </p>
              </div>

              <LanguageToggle variant="mobile" className="mb-2 bg-[#4c0519] border-[#6e0d25] text-white" />

              {[
                { id: 'inicio', label: translations.nav.home },
                { id: 'quienes-somos', label: translations.nav.about },
                { id: 'productos', label: translations.nav.products },
                { id: 'servicios', label: translations.nav.services },
                { id: 'contacto', label: translations.nav.contact }
              ].map((item) => (
                <button 
                  key={item.id}
                  onClick={() => navigateToPage(item.id as PageId)}
                  className={`w-full text-left py-3 px-4 rounded-xl text-xs font-bold tracking-widest uppercase transition-all cursor-pointer ${
                    activePage === item.id && !activeSubPage
                      ? 'bg-emerald-600 text-white font-black' 
                      : 'text-rose-100/90 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openDrawer();
                }}
                className="w-full text-center py-2.5 px-4 rounded-xl text-xs font-bold tracking-widest uppercase transition-all cursor-pointer bg-white/10 text-rose-200 hover:bg-white/20 border border-white/20 flex items-center justify-center gap-2 mt-1"
              >
                <Sliders className="w-3.5 h-3.5 text-rose-200" />
                <span>{translations.nav.editMedia}</span>
              </button>

              <div className="pt-2 mt-1 border-t border-rose-900/40">
                <CorporateBrochureButton 
                  variant="header" 
                  className="w-full justify-center bg-white/10 text-white border-white/20 hover:bg-emerald-600 hover:text-white py-2.5"
                  companyRuc={siteText.companyRuc} 
                  email={siteText.contactEmail}
                  phone={siteText.contactPhone}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer for fixed header */}
      <div className="h-18 sm:h-20 shrink-0" aria-hidden="true" />

      {/* MAIN VIEW AREA WITH PAGE TRANSITIONS */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
                 {/* RENDER SUB-PAGE (DETAIL VIEW OF COMPONENT MODULE) */}
          {activeSubPage ? (
            <motion.div
              key={`subpage-${activeSubPage.id}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              {activeSubPage.id === 'sacha-inchi' ? (
                <SachaInchiPage onBack={() => setActiveSubPage(null)} />
              ) : activeSubPage.id === 'cacao' ? (
                <CacaoPage onBack={() => setActiveSubPage(null)} />
              ) : activeSubPage.id === 'aguaje-deshidratado' ? (
                <AguajePage onBack={() => setActiveSubPage(null)} />
              ) : activeSubPage.id === 'coco-derivados' ? (
                <CocoPage onBack={() => setActiveSubPage(null)} />
              ) : activeSubPage.id === 'gestion-recaudacion' ? (
                <CobragoodPage onBack={() => setActiveSubPage(null)} />
              ) : activeSubPage.id === 'gestor-contable' ? (
                <GestorContablePage onBack={() => setActiveSubPage(null)} />
              ) : (
                <div className="max-w-4xl mx-auto px-4 py-12 sm:py-16">
                  <button 
                    onClick={() => setActiveSubPage(null)}
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-green hover:text-brand-green-dark mb-8 transition-colors cursor-pointer group"
                  >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span>{translations.nav.back}</span>
                  </button>

                  <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200/60">
                    <div className="h-64 sm:h-96 relative bg-slate-900">
                      <EditableMedia
                        mediaKey={`img-${activeSubPage.id}`}
                        src={activeSubPage.image}
                        alt={activeSubPage.title}
                        title={activeSubPage.title}
                        section="Vista Detalle"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-brand-dark/20 to-transparent pointer-events-none"></div>
                      <div className="absolute bottom-6 left-6 right-6 text-white space-y-2 pointer-events-none">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded border border-emerald-900 font-bold">
                          AGRICARL PERÚ S.A.C.
                        </span>
                        <h1 className="font-display font-black text-2xl sm:text-4xl uppercase tracking-tight">
                          {activeSubPage.title}
                        </h1>
                      </div>
                    </div>

                    <div className="p-6 sm:p-10 space-y-10">
                      <div className="space-y-4">
                        <h2 className="text-xs font-mono tracking-widest text-brand-green uppercase font-bold">
                          {language === 'es' ? 'Descripción del Módulo' : 'Module Description'}
                        </h2>
                        <p className="text-slate-700 text-base sm:text-lg leading-relaxed font-light">
                          {activeSubPage.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          ) : (
            <>
              {/* PAGE 1: INICIO */}
              {activePage === 'inicio' && (
                <motion.div
                  key="page-inicio"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-20 py-12 sm:py-16 relative"
                >
                  {/* Hero Section */}
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <EditableBackground
                      sectionKey="bg-hero"
                      title="Fondo Principal (Hero)"
                      defaultColor="#ffffff"
                      defaultOpacity={0.88}
                      defaultPattern="grid"
                      className="relative rounded-3xl p-6 sm:p-10 lg:p-12 border border-slate-200/90 shadow-[0_10px_35px_-10px_rgba(15,23,42,0.05)] overflow-hidden"
                    >
                      <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
                      
                      <div className="lg:col-span-7 space-y-6 text-center lg:text-left relative group">
                        <div className="space-y-3">
                          <h1 
                            id="hero-title"
                            className="font-display font-black text-3xl sm:text-4xl md:text-5xl lg:text-[42px] xl:text-[52px] text-brand-dark leading-tight tracking-tight uppercase"
                          >
                            <EditableText value={siteText.heroTitleLine1} />{' '}
                            <span className="text-brand-green relative inline-block">
                              <EditableText value={siteText.heroTitleHighlight1} />
                              <span className="absolute bottom-1 left-0 w-full h-1 bg-brand-green/25 rounded-full" />
                            </span>{' '}
                            <EditableText value={siteText.heroTitleLine2} />{' '}
                            <span className="text-brand-pink-accent relative inline-block">
                              <EditableText value={siteText.heroTitleHighlight2} />
                              <span className="absolute bottom-1 left-0 w-full h-1 bg-brand-pink-accent/25 rounded-full" />
                            </span>.
                          </h1>

                          <p 
                            id="hero-paragraph"
                            className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal antialiased relative"
                          >
                            <EditableText
                              multiline
                              value={siteText.heroSubtitle}
                              as="span"
                              className="font-normal"
                            />
                          </p>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
                          <button 
                            onClick={() => navigateToPage('productos')}
                            className="w-full sm:w-auto bg-brand-green-dark hover:bg-brand-green text-white px-7 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg shadow-brand-green-dark/10 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
                          >
                            <span>{translations.nav.exploreProducts}</span>
                            <ChevronRight className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => navigateToPage('servicios')}
                            className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-800 px-7 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider border border-slate-200 shadow-xs hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
                          >
                            <span>{translations.nav.viewServices}</span>
                          </button>
                          <button
                            onClick={() => {
                              const el = document.getElementById('video-presentacion');
                              if (el) el.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="w-full sm:w-auto bg-[#4c0519] hover:bg-[#6e0d25] text-white px-7 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2.5 border border-rose-900/40"
                          >
                            <Play className="w-3.5 h-3.5 text-rose-300 fill-rose-300" />
                            <span>{language === 'es' ? 'Ver Video' : 'Watch Video'}</span>
                          </button>
                        </div>
                      </div>

                      <div className="lg:col-span-5 flex justify-center">
                        <div className="w-full">
                          <AnimatedHeroCarousel 
                            images={galleryImages}
                            onItemClick={(item) => {
                              if (item.id.includes('agricobros') || item.id.includes('cobragood')) {
                                setActiveSubPage(commerceItems.find(i => i.id === 'gestion-recaudacion') || COMMERCE_ITEMS.find(i => i.id === 'gestion-recaudacion') || null);
                                return;
                              }
                              const match = COMMERCE_ITEMS.find(i => item.id.startsWith(i.id));
                              if (match) setActiveSubPage(match);
                            }} 
                          />
                        </div>
                      </div>

                    </div>
                  </EditableBackground>
                </div>

                  {/* Video Institucional de Presentación Oficial */}
                  <PresentationVideoSection id="video-presentacion" />

                  {/* Divider: Hero to Living Amazon Banner */}
                  <SectionDivider variant="leaf" label={translations.nav.amazonEcosystem} accentColor="green" />

                  {/* Banner de Fondo Video / Animación en Movimiento: La Hormiga Cortadora */}
                  <AntMotionBanner 
                    heroBgUrl={heroBgUrl} 
                  />

                  {/* Visual Portfolio Marquee */}
                  <div className="space-y-4">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                      <div className="space-y-1">
                        <h3 className="font-display font-black text-xl sm:text-2xl text-brand-dark uppercase tracking-tight">
                          {language === 'es' ? 'Nuestra Cadena Productiva en Movimiento' : 'Our Productive Chain in Motion'}
                        </h3>
                      </div>
                    </div>
                    <ContinuousMovingImageMarquee 
                      images={galleryImages}
                      onItemClick={(id) => {
                        if (id.startsWith('sacha')) setActiveSubPage(commerceItems.find(i => i.id === 'sacha-inchi') || COMMERCE_ITEMS.find(i => i.id === 'sacha-inchi') || null);
                        else if (id.startsWith('cacao')) setActiveSubPage(commerceItems.find(i => i.id === 'cacao') || COMMERCE_ITEMS.find(i => i.id === 'cacao') || null);
                        else if (id.startsWith('aguaje')) setActiveSubPage(commerceItems.find(i => i.id === 'aguaje-deshidratado') || COMMERCE_ITEMS.find(i => i.id === 'aguaje-deshidratado') || null);
                        else if (id.startsWith('coco')) setActiveSubPage(commerceItems.find(i => i.id === 'coco-derivados') || COMMERCE_ITEMS.find(i => i.id === 'coco-derivados') || null);
                        else if (id.startsWith('cobragood') || id.startsWith('agricobros')) setActiveSubPage(commerceItems.find(i => i.id === 'gestion-recaudacion') || COMMERCE_ITEMS.find(i => i.id === 'gestion-recaudacion') || null);
                        else if (id.startsWith('gestor')) setActiveSubPage(commerceItems.find(i => i.id === 'gestor-contable') || COMMERCE_ITEMS.find(i => i.id === 'gestor-contable') || null);
                      }}
                    />
                  </div>

                  {/* Dual Business Divisions Section */}
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                    <div className="text-center space-y-4">
                      <h2 className="font-display font-black text-2xl sm:text-4xl text-brand-dark uppercase tracking-tight flex items-center justify-center gap-2 flex-wrap">
                        <span>{siteText.divisionsTitle || (language === 'es' ? 'Pilares del Progreso y Sostenibilidad' : 'Pillars of Progress and Sustainability')}</span>
                      </h2>
                      <p className="text-slate-500 max-w-2xl mx-auto text-sm font-light leading-relaxed">
                        {siteText.divisionsSubtitle || (language === 'es' ? 'En AGRICARL PERÚ S.A.C., unimos el potencial del agro peruano con la eficiencia financiera del mañana.' : 'At AGRICARL PERÚ S.A.C., we unite the potential of Peruvian agriculture with tomorrow’s financial efficiency.')}
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                      {/* Division 1: Agro-Industrial */}
                      <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-[0_12px_36px_-12px_rgba(15,23,42,0.06)] flex flex-col justify-between space-y-8 hover:border-emerald-600/40 hover:shadow-2xl transition-all duration-300 group relative">
                        <div className="space-y-6">
                          <div className="relative h-48 rounded-2xl overflow-hidden border border-slate-100 shadow-inner">
                            <EditableMedia
                              mediaKey="img-division-agro"
                              src="https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?auto=format&fit=crop&q=80&w=800"
                              alt="División Suministro Agrícola - Sacha Inchi y Cacao"
                              title="División Suministro Agrícola"
                              section="Líneas Estratégicas"
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4 pointer-events-none">
                              <span className="text-white text-xs font-mono font-bold uppercase tracking-wider bg-brand-green/90 px-2.5 py-1 rounded-md backdrop-blur-sm">
                                {language === 'es' ? 'Agro-Industrial · San Martín' : 'Agro-Industrial · San Martín'}
                              </span>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-brand-green flex items-center justify-center shrink-0">
                              <Leaf className="w-5 h-5" />
                            </div>
                            <div>
                              <h3 className="font-display font-black text-xl text-brand-dark uppercase tracking-tight">
                                {siteText.agroDivisionTitle || translations.divisions.agroTitle}
                              </h3>
                              <p className="text-[11px] text-brand-green font-mono font-bold uppercase tracking-wider">
                                {translations.divisions.agroSubtitle}
                              </p>
                            </div>
                          </div>
                          
                          <p className="text-slate-600 text-sm leading-relaxed font-light">
                            {siteText.agroDivisionDesc || translations.divisions.agroDesc}
                          </p>
                          <ul className="space-y-2 pt-2">
                            {translations.divisions.agroPoints.map((point, idx) => (
                              <li key={idx} className="flex items-center gap-2.5 text-xs text-slate-600">
                                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <button 
                          onClick={() => navigateToPage('productos')}
                          className="w-full py-3.5 bg-brand-green-dark hover:bg-brand-green text-white rounded-xl text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <span>{language === 'es' ? 'Ver Catálogo de Productos' : 'View Product Catalog'}</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Division 2: Fintech */}
                      <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-[0_12px_36px_-12px_rgba(15,23,42,0.06)] flex flex-col justify-between space-y-8 hover:border-pink-500/40 hover:shadow-2xl transition-all duration-300 group relative">
                        <div className="space-y-6">
                          <div className="relative h-48 rounded-2xl overflow-hidden border border-slate-100 shadow-inner">
                            <EditableMedia
                              mediaKey="img-division-tech"
                              src="https://images.unsplash.com/photo-1556742049-0a670f4a4591?auto=format&fit=crop&q=80&w=800"
                              alt="División Gestión Financiera - AgriCobros"
                              title="División Gestión Financiera"
                              section="Líneas Estratégicas"
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4 pointer-events-none">
                              <span className="text-white text-xs font-mono font-bold uppercase tracking-wider bg-brand-pink-accent/90 px-2.5 py-1 rounded-md backdrop-blur-sm">
                                {language === 'es' ? 'FinTech · Recaudación Móvil' : 'FinTech · Mobile Collections'}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-pink-50 text-brand-pink-accent flex items-center justify-center shrink-0">
                              <DollarSign className="w-5 h-5" />
                            </div>
                            <div>
                              <h3 className="font-display font-black text-xl text-brand-dark uppercase tracking-tight">
                                {siteText.fintechDivisionTitle || translations.divisions.fintechTitle}
                              </h3>
                              <p className="text-[11px] text-brand-pink-accent font-mono font-bold uppercase tracking-wider">
                                {translations.divisions.fintechSubtitle}
                              </p>
                            </div>
                          </div>

                          <p className="text-slate-600 text-sm leading-relaxed font-light">
                            {siteText.fintechDivisionDesc || translations.divisions.fintechDesc}
                          </p>
                          <ul className="space-y-2 pt-2">
                            {translations.divisions.fintechPoints.map((point, idx) => (
                              <li key={idx} className="flex items-center gap-2.5 text-xs text-slate-600">
                                <Check className="w-4 h-4 text-brand-pink-accent shrink-0" />
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <button 
                          onClick={() => navigateToPage('servicios')}
                          className="w-full py-3.5 bg-brand-dark hover:bg-slate-800 text-white rounded-xl text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <span>{language === 'es' ? 'Ver Soluciones Tecnológicas' : 'View Tech Solutions'}</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Photo Gallery Grid */}
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                    <div className="text-center space-y-3">
                      <h3 className="font-display font-black text-2xl sm:text-3xl text-brand-dark uppercase tracking-tight">
                        {language === 'es' ? 'Nuestras Operaciones en Imágenes' : 'Our Operations in Images'}
                      </h3>
                      <p className="text-slate-500 max-w-xl mx-auto text-xs font-light">
                        {language === 'es' 
                          ? 'De las parcelas en San Martín a la infraestructura financiera digital de AGRICARL PERÚ S.A.C.' 
                          : 'From the fields in San Martín to the digital financial infrastructure of AGRICARL PERÚ S.A.C.'}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {/* 1. Sacha Inchi */}
                      <div className="group relative rounded-2xl overflow-hidden shadow-lg border border-slate-200/60 aspect-[4/3] bg-slate-900 cursor-pointer" onClick={() => setActiveSubPage(commerceItems.find(i => i.id === 'sacha-inchi') || COMMERCE_ITEMS.find(i => i.id === 'sacha-inchi') || null)}>
                        <EditableMedia
                          mediaKey="img-sacha-inchi"
                          src="https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&q=80&w=800"
                          alt="Sacha Inchi Superfood"
                          title="Sacha Inchi"
                          section="Catálogo Operaciones"
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent p-5 flex flex-col justify-end pointer-events-none">
                          <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest">{translations.common.agriculturalSupply}</span>
                          <h4 className="text-base font-bold text-white uppercase mt-0.5">{commerceItems.find(i => i.id === 'sacha-inchi')?.title || 'Sacha Inchi'}</h4>
                          <p className="text-[11px] text-slate-300 font-light mt-1 line-clamp-2">{commerceItems.find(i => i.id === 'sacha-inchi')?.description || 'Semillas, almendras secas y aceite extra virgen de alta pureza.'}</p>
                        </div>
                      </div>

                      {/* 2. Cacao Amazónico */}
                      <div className="group relative rounded-2xl overflow-hidden shadow-lg border border-slate-200/60 aspect-[4/3] bg-slate-900 cursor-pointer" onClick={() => setActiveSubPage(commerceItems.find(i => i.id === 'cacao') || COMMERCE_ITEMS.find(i => i.id === 'cacao') || null)}>
                        <EditableMedia
                          mediaKey="img-cacao"
                          src="https://images.unsplash.com/photo-1587132137056-bfbf0166836e?auto=format&fit=crop&q=80&w=800"
                          alt="Cacao Amazónico"
                          title="Cacao Amazónico"
                          section="Catálogo Operaciones"
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent p-5 flex flex-col justify-end pointer-events-none">
                          <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-widest">{translations.common.agriculturalSupply}</span>
                          <h4 className="text-base font-bold text-white uppercase mt-0.5">{commerceItems.find(i => i.id === 'cacao')?.title || 'Cacao Amazónico'}</h4>
                          <p className="text-[11px] text-slate-300 font-light mt-1 line-clamp-2">{commerceItems.find(i => i.id === 'cacao')?.description || 'Granos de cacao seco fermentados con trazabilidad de San Martín.'}</p>
                        </div>
                      </div>

                      {/* 3. Aguaje Deshidratado */}
                      <div className="group relative rounded-2xl overflow-hidden shadow-lg border border-slate-200/60 aspect-[4/3] bg-slate-900 cursor-pointer" onClick={() => setActiveSubPage(commerceItems.find(i => i.id === 'aguaje-deshidratado') || COMMERCE_ITEMS.find(i => i.id === 'aguaje-deshidratado') || null)}>
                        <EditableMedia
                          mediaKey="img-aguaje"
                          src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=800"
                          alt="Aguaje Deshidratado"
                          title="Aguaje Deshidratado"
                          section="Catálogo Operaciones"
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent p-5 flex flex-col justify-end pointer-events-none">
                          <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-widest">{translations.common.superfruit}</span>
                          <h4 className="text-base font-bold text-white uppercase mt-0.5">{commerceItems.find(i => i.id === 'aguaje-deshidratado')?.title || 'Aguaje Deshidratado'}</h4>
                          <p className="text-[11px] text-slate-300 font-light mt-1 line-clamp-2">{commerceItems.find(i => i.id === 'aguaje-deshidratado')?.description || 'Pulpa deshidratada en polvo y hojuelas rica en betacaroteno y fitoestrógenos.'}</p>
                        </div>
                      </div>

                      {/* 4. Coco & Subproductos */}
                      <div className="group relative rounded-2xl overflow-hidden shadow-lg border border-slate-200/60 aspect-[4/3] bg-slate-900 cursor-pointer" onClick={() => setActiveSubPage(commerceItems.find(i => i.id === 'coco-derivados') || COMMERCE_ITEMS.find(i => i.id === 'coco-derivados') || null)}>
                        <EditableMedia
                          mediaKey="img-coco"
                          src={cocoHeroImg}
                          alt="Coco y Derivados"
                          title="Coco & Derivados"
                          section="Catálogo Operaciones"
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent p-5 flex flex-col justify-end pointer-events-none">
                          <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest">{translations.common.agroIndustry}</span>
                          <h4 className="text-base font-bold text-white uppercase mt-0.5">{commerceItems.find(i => i.id === 'coco-derivados')?.title || 'Coco & Subproductos'}</h4>
                          <p className="text-[11px] text-slate-300 font-light mt-1 line-clamp-2">{commerceItems.find(i => i.id === 'coco-derivados')?.description || 'Coco Rallado Deshidratado y Aceite Virgen Prensado en Frío.'}</p>
                        </div>
                      </div>

                      {/* 5. AgriCobros */}
                      <div className="group relative rounded-2xl overflow-hidden shadow-lg border border-slate-200/60 aspect-[4/3] bg-slate-900 cursor-pointer" onClick={() => setActiveSubPage(commerceItems.find(i => i.id === 'gestion-recaudacion') || COMMERCE_ITEMS.find(i => i.id === 'gestion-recaudacion') || null)}>
                        <EditableMedia
                          mediaKey="img-agricobros"
                          src="https://images.unsplash.com/photo-1563013544-824ae1d704d3?auto=format&fit=crop&q=80&w=800"
                          alt="Recaudación AgriCobros"
                          title="Recaudación AgriCobros"
                          section="Catálogo Operaciones"
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent p-5 flex flex-col justify-end pointer-events-none">
                          <span className="text-[10px] font-mono font-bold text-pink-400 uppercase tracking-widest">{translations.common.financialManagement}</span>
                          <h4 className="text-base font-bold text-white uppercase mt-0.5">{commerceItems.find(i => i.id === 'gestion-recaudacion')?.title || 'AgriCobros'}</h4>
                          <p className="text-[11px] text-slate-300 font-light mt-1 line-clamp-2">{commerceItems.find(i => i.id === 'gestion-recaudacion')?.description || 'Recaudación y cobro inteligente en tiendas y comercios.'}</p>
                        </div>
                      </div>

                      {/* 6. Gestor Contable */}
                      <div className="group relative rounded-2xl overflow-hidden shadow-lg border border-slate-200/60 aspect-[4/3] bg-slate-900 cursor-pointer" onClick={() => setActiveSubPage(commerceItems.find(i => i.id === 'gestor-contable') || COMMERCE_ITEMS.find(i => i.id === 'gestor-contable') || null)}>
                        <EditableMedia
                          mediaKey="img-gestor-contable"
                          src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800"
                          alt="Gestor Contable"
                          title="Gestor Contable Formato 5.2"
                          section="Catálogo Operaciones"
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent p-5 flex flex-col justify-end pointer-events-none">
                          <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest">{translations.common.financialManagement}</span>
                          <h4 className="text-base font-bold text-white uppercase mt-0.5">{commerceItems.find(i => i.id === 'gestor-contable')?.title || 'Gestor Contable 5.4'}</h4>
                          <p className="text-[11px] text-slate-300 font-light mt-1 line-clamp-2">{commerceItems.find(i => i.id === 'gestor-contable')?.description || 'Generación automática del Libro Diario Formato 5.2.'}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                </motion.div>
              )}

              {/* PAGE 2: QUIÉNES SOMOS */}
              {activePage === 'quienes-somos' && (
                <motion.div
                  key="page-quienes-somos"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="max-w-5xl mx-auto px-4 py-16 sm:py-24 space-y-16"
                >
                  <div className="text-center space-y-4">
                    <span className="font-mono text-[10px] tracking-widest text-brand-green uppercase font-bold bg-brand-green/10 px-3.5 py-1.5 rounded-full">
                      {translations.nav.aboutUs}
                    </span>
                    <h2 className="font-display font-black text-3xl sm:text-4xl text-brand-dark uppercase tracking-tight">
                      {translations.about.title}
                    </h2>
                    <div className="w-16 h-1 bg-brand-green mx-auto rounded-full"></div>
                  </div>

                  <EditableBackground
                    sectionKey="bg-quienes-somos-quote"
                    title="Panel de Filosofía Sostenible"
                    defaultColor="#072518"
                    defaultOpacity={0.92}
                    defaultPattern="grid"
                    className="relative overflow-hidden rounded-3xl p-8 sm:p-16 text-center text-white shadow-2xl border border-slate-800"
                  >
                    <div className="absolute inset-0 bg-architectural-grid-dark opacity-15 pointer-events-none"></div>
                    <div className="absolute -top-10 -left-10 w-40 h-40 bg-emerald-500/20 blur-3xl rounded-full" />
                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-pink-500/15 blur-3xl rounded-full" />

                    <div className="relative z-10 space-y-8 max-w-2xl mx-auto">
                      <blockquote className="space-y-4">
                        <p className="font-display font-light text-2xl sm:text-3xl md:text-4xl italic leading-relaxed tracking-wide bg-gradient-to-r from-white via-slate-100 to-slate-200 bg-clip-text text-transparent">
                          {siteText.quoteText || (language === 'es' ? '«Impulsando el desarrollo sostenible desde el corazón de la Amazonía.»' : '“Driving sustainable development from the heart of the Amazon.”')}
                        </p>
                      </blockquote>
                      
                      <div className="text-brand-pink-accent font-mono text-xs sm:text-sm tracking-widest uppercase font-bold bg-brand-pink-accent/10 inline-block px-5 py-2 rounded-full border border-brand-pink-accent/20 shadow-sm">
                        {siteText.heroTagline || translations.common.welcomeTagline}
                      </div>
                    </div>
                  </EditableBackground>

                  {/* Mission & Vision Row */}
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-[0_8px_30px_-8px_rgba(15,23,42,0.06)] space-y-4 relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-full h-1 bg-brand-green" />
                      <div className="w-10 h-10 rounded-xl bg-brand-green/10 flex items-center justify-center text-brand-green">
                        <Sparkles className="w-5 h-5" />
                      </div>
                      <h3 className="font-display font-black text-xl text-brand-dark uppercase tracking-tight">{translations.about.missionTitle}</h3>
                      <p className="text-slate-600 text-sm leading-relaxed font-light">
                        {siteText.missionText}
                      </p>
                    </div>

                    <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-[0_8px_30px_-8px_rgba(15,23,42,0.06)] space-y-4 relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-full h-1 bg-brand-pink-accent" />
                      <div className="w-10 h-10 rounded-xl bg-pink-100/40 flex items-center justify-center text-brand-pink-accent">
                        <TrendingUp className="w-5 h-5" />
                      </div>
                      <h3 className="font-display font-black text-xl text-brand-dark uppercase tracking-tight">{translations.about.visionTitle}</h3>
                      <p className="text-slate-600 text-sm leading-relaxed font-light">
                        {siteText.visionText}
                      </p>
                    </div>
                  </div>

                  {/* Core Values Section */}
                  <div className="space-y-8 pt-4">
                    <div className="text-center space-y-2">
                      <h3 className="font-display font-black text-2xl text-brand-dark uppercase tracking-tight">{translations.about.valuesTitle}</h3>
                      <p className="text-slate-500 text-xs font-light">{translations.about.valuesSubtitle}</p>
                    </div>

                    <div className="grid sm:grid-cols-3 gap-6">
                      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs space-y-3">
                        <div className="w-9 h-9 rounded-xl bg-emerald-100 text-brand-green flex items-center justify-center">
                          <Leaf className="w-4 h-4" />
                        </div>
                        <h4 className="font-display font-bold text-base text-brand-dark uppercase">{translations.about.sustainability}</h4>
                        <p className="text-slate-500 text-xs leading-relaxed font-light">
                          {translations.about.sustainabilityDesc}
                        </p>
                      </div>

                      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs space-y-3">
                        <div className="w-9 h-9 rounded-xl bg-emerald-100 text-brand-green flex items-center justify-center">
                          <Briefcase className="w-4 h-4" />
                        </div>
                        <h4 className="font-display font-bold text-base text-brand-dark uppercase">{translations.about.innovation}</h4>
                        <p className="text-slate-500 text-xs leading-relaxed font-light">
                          {translations.about.innovationDesc}
                        </p>
                      </div>

                      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs space-y-3">
                        <div className="w-9 h-9 rounded-xl bg-emerald-100 text-brand-green flex items-center justify-center">
                          <Shield className="w-4 h-4" />
                        </div>
                        <h4 className="font-display font-bold text-base text-brand-dark uppercase">{translations.about.transparency}</h4>
                        <p className="text-slate-500 text-xs leading-relaxed font-light">
                          {translations.about.transparencyDesc}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* PAGE 3: PRODUCTOS */}
              {activePage === 'productos' && (
                <motion.div
                  key="page-productos"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
                >
                  <div className="text-center space-y-4 mb-16">
                    <span className="font-mono text-[10px] tracking-widest text-brand-green uppercase font-bold bg-brand-green/10 px-3.5 py-1.5 rounded-full">
                      {translations.nav.products}
                    </span>
                    <h2 className="font-display font-black text-3xl sm:text-4xl text-brand-dark uppercase tracking-tight">
                      {translations.products.title}
                    </h2>
                    <div className="w-16 h-1 bg-brand-green mx-auto rounded-full"></div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {commerceItems.filter(item => item.type === 'producto').map((item) => (
                      <div 
                        key={item.id}
                        className="group bg-white rounded-3xl overflow-hidden border border-slate-200/60 shadow-md hover:shadow-2xl hover:border-brand-green/20 transition-all duration-500 flex flex-col justify-between"
                      >
                        <div className="h-64 relative bg-slate-900 overflow-hidden">
                          <EditableMedia
                            mediaKey={`img-${item.id}`}
                            src={item.image}
                            alt={item.title}
                            title={item.title}
                            section="Página Productos"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/70 via-transparent to-transparent pointer-events-none"></div>
                          <span className="absolute top-4 left-4 bg-brand-green-dark text-white text-[9px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-lg border border-brand-green/20 pointer-events-none">
                            {item.id === 'sacha-inchi' ? translations.common.superfood : item.id === 'cacao' ? translations.common.fineAromaCacao : item.id === 'aguaje-deshidratado' ? translations.common.superfruit : item.id === 'coco-derivados' ? translations.common.agroIndustry : translations.nav.products}
                          </span>
                        </div>
                        <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                          <div className="space-y-3">
                            <h3 className="font-display font-bold text-xl text-brand-dark tracking-tight">
                              <EditableText value={item.title} />
                            </h3>
                            <p className="text-slate-600 text-sm leading-relaxed font-light">
                              <EditableText
                                multiline
                                value={item.description}
                                as="span"
                              />
                            </p>
                          </div>
                          <div className="pt-4 border-t border-slate-200/60 flex justify-between items-center">
                            <span className="font-mono text-[9px] text-brand-pink-accent uppercase tracking-widest font-bold">
                              {translations.common.welcomeTagline}
                            </span>
                            <button 
                              onClick={() => navigateToSubPage(item)}
                              className="bg-brand-green-dark hover:bg-brand-green text-white px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-sm flex items-center gap-1 cursor-pointer"
                            >
                              <span>{translations.common.viewDetails}</span>
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* PAGE 4: SERVICIOS */}
              {activePage === 'servicios' && (
                <motion.div
                  key="page-servicios"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
                >
                  <div className="text-center space-y-4 mb-16">
                    <span className="font-mono text-[10px] tracking-widest text-brand-green uppercase font-bold bg-brand-green/10 px-3.5 py-1.5 rounded-full">
                      {translations.nav.services}
                    </span>
                    <h2 className="font-display font-black text-3xl sm:text-4xl text-brand-dark uppercase tracking-tight">
                      {translations.services.title}
                    </h2>
                    <div className="w-16 h-1 bg-brand-green mx-auto rounded-full"></div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {commerceItems.filter(item => item.type === 'servicio').map((item) => (
                      <div 
                        key={item.id}
                        className="group bg-white rounded-3xl overflow-hidden border border-slate-200/60 shadow-md hover:shadow-2xl hover:border-brand-green/20 transition-all duration-500 flex flex-col justify-between"
                      >
                        <div className="h-64 relative bg-slate-900 overflow-hidden">
                          <EditableMedia
                            mediaKey={`img-${item.id}`}
                            src={item.image}
                            alt={item.title}
                            title={item.title}
                            section="Página Servicios"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/70 via-transparent to-transparent pointer-events-none"></div>
                          <span className="absolute top-4 left-4 bg-brand-green-dark text-white text-[9px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-lg border border-brand-green/20 pointer-events-none">
                            {translations.nav.services}
                          </span>
                        </div>
                        <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                          <div className="space-y-3">
                            <h3 className="font-display font-bold text-xl text-brand-dark tracking-tight">
                              <EditableText value={item.title} />
                            </h3>
                            <p className="text-slate-600 text-sm leading-relaxed font-light">
                              <EditableText
                                multiline
                                value={item.description}
                                as="span"
                              />
                            </p>
                          </div>
                          <div className="pt-4 border-t border-slate-200/60 flex justify-between items-center">
                            <span className="font-mono text-[9px] text-brand-pink-accent uppercase tracking-widest font-bold">
                              {translations.common.welcomeTagline}
                            </span>
                            <button 
                              onClick={() => navigateToSubPage(item)}
                              className="bg-brand-green-dark hover:bg-brand-green text-white px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-sm flex items-center gap-1 cursor-pointer"
                            >
                              <span>{translations.common.viewDetails}</span>
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* PAGE 5: CONTACTO */}
              {activePage === 'contacto' && (
                <motion.div
                  key="page-contacto"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="max-w-6xl mx-auto px-4 py-16 space-y-12"
                >
                  <div className="text-center space-y-4">
                    <span className="font-mono text-[10px] tracking-widest text-brand-green uppercase font-bold bg-brand-green/10 px-3.5 py-1.5 rounded-full">
                      {translations.contact.attentionChannels}
                    </span>
                    <h2 className="font-display font-black text-3xl sm:text-4xl text-brand-dark uppercase tracking-tight">
                      {translations.contact.connectWithUs}
                    </h2>
                    <p className="text-slate-500 max-w-xl mx-auto text-sm font-light">
                      {translations.contact.readyToAssist}
                    </p>
                  </div>

                  <div className="grid lg:grid-cols-12 gap-10 items-stretch">
                    {/* Contact Info Panel */}
                    <div className="lg:col-span-5 space-y-6">
                      <EditableBackground
                        sectionKey="bg-contact-card"
                        title="Ficha Corporativa de Contacto"
                        defaultColor="#072518"
                        defaultOpacity={0.94}
                        defaultPattern="grid"
                        className="text-white rounded-3xl p-8 relative overflow-hidden border border-slate-800 shadow-2xl flex flex-col justify-between h-full"
                      >
                        <div className="absolute inset-0 bg-architectural-grid-dark opacity-15 pointer-events-none"></div>
                        <div className="absolute -top-10 -left-10 w-42 h-42 bg-brand-green/25 blur-3xl rounded-full" />
                        
                        <div className="relative z-10 space-y-8">
                          <div>
                            <span className="font-mono text-[8px] text-brand-pink-accent tracking-widest uppercase font-bold bg-brand-pink-accent/15 px-3.5 py-1.5 rounded-full border border-brand-pink-accent/20">
                              {translations.contact.corporateInfo}
                            </span>
                            <h3 className="font-display font-black text-2xl text-white uppercase tracking-tight mt-4">
                              AGRICARL PERÚ S.A.C.
                            </h3>
                            <p className="font-mono text-xs text-pink-400 font-bold mt-1">
                              RUC: {siteText.companyRuc}
                            </p>
                          </div>

                          <div className="space-y-6">
                            <div className="flex items-start gap-4">
                              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-emerald-400 shrink-0">
                                <MapPin className="w-5 h-5" />
                              </div>
                              <div className="space-y-1">
                                <p className="font-mono text-[9px] uppercase tracking-wider text-slate-400">{translations.contact.mainOffice}</p>
                                <p className="text-xs text-white leading-relaxed font-light">
                                  <EditableText value={siteText.contactAddress} />
                                </p>
                              </div>
                            </div>

                            <div className="flex items-start gap-4">
                              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-emerald-400 shrink-0">
                                <Phone className="w-5 h-5" />
                              </div>
                              <div className="space-y-1">
                                <p className="font-mono text-[9px] uppercase tracking-wider text-slate-400">{translations.contact.centralPhone}</p>
                                <a 
                                  href="https://wa.me/51956352862" 
                                  target="_blank" 
                                  rel="noopener noreferrer" 
                                  className="text-xs text-white font-mono font-medium hover:text-emerald-300 transition-colors block"
                                >
                                  <EditableText value={siteText.contactPhone} />
                                </a>
                              </div>
                            </div>

                            <div className="flex items-start gap-4">
                              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-emerald-400 shrink-0">
                                <Mail className="w-5 h-5" />
                              </div>
                              <div className="space-y-1">
                                <p className="font-mono text-[9px] uppercase tracking-wider text-slate-400">{translations.contact.officialEmail}</p>
                                <a 
                                  href="mailto:operaciones@agricarlperu.com" 
                                  className="text-xs text-white font-mono font-medium leading-relaxed hover:text-emerald-300 transition-colors block"
                                >
                                  operaciones@agricarlperu.com
                                </a>
                              </div>
                            </div>

                            <div className="flex items-start gap-4">
                              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-emerald-400 shrink-0">
                                <Globe className="w-5 h-5" />
                              </div>
                              <div className="space-y-1">
                                <p className="font-mono text-[9px] uppercase tracking-wider text-slate-400">{translations.contact.officialPortal}</p>
                                <a 
                                  href="http://www.agricarlperu.com" 
                                  target="_blank" 
                                  rel="noopener noreferrer" 
                                  className="text-xs text-cyan-300 font-mono font-medium hover:underline block"
                                >
                                  www.agricarlperu.com
                                </a>
                              </div>
                            </div>

                            <div className="flex items-start gap-4">
                              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-emerald-400 shrink-0">
                                <Building2 className="w-5 h-5" />
                              </div>
                              <div className="space-y-1">
                                <p className="font-mono text-[9px] uppercase tracking-wider text-slate-400">{translations.contact.businessHours}</p>
                                <p className="text-xs text-white font-medium">
                                  {translations.contact.businessHoursVal}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="pt-8 border-t border-white/10 relative z-10 flex items-center gap-2.5">
                          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></div>
                          <span className="font-mono text-[8px] text-emerald-400 tracking-widest uppercase font-bold">{translations.contact.activeSupportLine}</span>
                        </div>
                      </EditableBackground>
                    </div>

                    {/* Contact Form Panel */}
                    <div className="lg:col-span-7">
                      <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-200/60 h-full flex flex-col justify-center space-y-6">
                        <div className="space-y-2">
                          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-mono font-bold border border-emerald-200">
                            <Mail className="w-3.5 h-3.5 text-emerald-600" />
                            <span>{translations.contact.officialEmail}: operaciones@agricarlperu.com</span>
                          </div>
                          <h3 className="font-display font-black text-xl text-brand-dark uppercase tracking-tight">
                            {translations.contact.sendMessageDirect}
                          </h3>
                          <p className="text-xs text-slate-500 leading-relaxed">
                            {language === 'es'
                              ? <>Escriba su consulta a continuación. Al presionar enviar, se despachará directamente a nuestra bandeja corporativa <strong className="text-slate-700">operaciones@agricarlperu.com</strong>.</>
                              : <>Type your inquiry below. When you submit, it will be dispatched directly to our corporate inbox <strong className="text-slate-700">operaciones@agricarlperu.com</strong>.</>}
                          </p>
                        </div>

                        <AnimatePresence mode="wait">
                          {!formSubmitted ? (
                            <motion.form 
                              key="contact-form"
                              onSubmit={handleFormSubmit}
                              className="space-y-4"
                            >
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="relative">
                                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                    <User className="w-4 h-4" />
                                  </div>
                                  <input 
                                    type="text"
                                    required
                                    placeholder={translations.contact.fullName + ' *'}
                                    value={formName}
                                    onChange={(e) => setFormName(e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3 py-3.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green transition-all placeholder:text-slate-400 font-semibold"
                                  />
                                </div>

                                <div className="relative">
                                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                    <Mail className="w-4 h-4" />
                                  </div>
                                  <input 
                                    type="email"
                                    required
                                    placeholder={translations.contact.emailAddress + ' *'}
                                    value={formEmail}
                                    onChange={(e) => setFormEmail(e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3 py-3.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green transition-all placeholder:text-slate-400 font-semibold"
                                  />
                                </div>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="relative">
                                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                    <Phone className="w-4 h-4" />
                                  </div>
                                  <input 
                                    type="tel"
                                    placeholder={translations.contact.phoneWhatsApp}
                                    value={formPhone}
                                    onChange={(e) => setFormPhone(e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3 py-3.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green transition-all placeholder:text-slate-400 font-semibold"
                                  />
                                </div>

                                <div className="relative">
                                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                    <MessageSquare className="w-4 h-4" />
                                  </div>
                                  <input 
                                    type="text"
                                    placeholder={translations.contact.subject}
                                    value={formSubject}
                                    onChange={(e) => setFormSubject(e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3 py-3.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green transition-all placeholder:text-slate-400 font-semibold"
                                  />
                                </div>
                              </div>

                              <div className="relative">
                                <textarea 
                                  required
                                  rows={4}
                                  placeholder={translations.contact.messagePlaceholder}
                                  value={formMsg}
                                  onChange={(e) => setFormMsg(e.target.value)}
                                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green transition-all resize-none placeholder:text-slate-400 font-semibold leading-relaxed"
                                ></textarea>
                              </div>

                              <div className="space-y-2 pt-1">
                                <button 
                                  type="submit"
                                  disabled={formLoading}
                                  className="w-full bg-brand-green hover:bg-emerald-600 text-white font-bold py-4 rounded-xl text-xs sm:text-sm tracking-wider uppercase transition-all flex items-center justify-center gap-2 disabled:bg-slate-400 cursor-pointer shadow-lg hover:shadow-emerald-900/20 group"
                                >
                                  {formLoading ? (
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                  ) : (
                                    <>
                                      <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                      <span>{translations.contact.sendDirect}</span>
                                    </>
                                  )}
                                </button>
                                <p className="text-[11px] text-center text-slate-400 leading-normal">
                                  {language === 'es' ? 'El mensaje se enviará directamente a' : 'The message will be sent directly to'}{' '}
                                  <span className="text-slate-600 font-mono font-medium">operaciones@agricarlperu.com</span>
                                </p>
                              </div>
                            </motion.form>
                          ) : (
                            <motion.div 
                              key="success-form"
                              initial={{ opacity: 0, scale: 0.96 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="py-4 space-y-5 text-center"
                            >
                              <div className="w-14 h-14 rounded-full bg-emerald-100 text-brand-green flex items-center justify-center mx-auto border border-emerald-200 shadow-sm">
                                <CheckCircle className="w-8 h-8" />
                              </div>

                              <div className="space-y-1.5">
                                <span className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-mono font-bold border border-emerald-200">
                                  {submissionFeedback?.delivery === 'resend' || submissionFeedback?.delivery === 'sendgrid' || submissionFeedback?.delivery === 'smtp'
                                    ? (language === 'es' ? '✓ Correo Despachado Directamente a: operaciones@agricarlperu.com' : '✓ Email Dispatched Directly to: operaciones@agricarlperu.com')
                                    : (language === 'es' ? '✓ Mensaje Registrado en el Servidor Oficial para: operaciones@agricarlperu.com' : '✓ Inquiry Recorded on Official Server for: operaciones@agricarlperu.com')}
                                </span>
                                <h4 className="text-lg sm:text-xl font-bold text-brand-dark">
                                  {submissionFeedback?.delivery === 'resend' || submissionFeedback?.delivery === 'sendgrid' || submissionFeedback?.delivery === 'smtp'
                                    ? (language === 'es' ? '¡Correo Enviado con Éxito!' : 'Email Sent Successfully!')
                                    : (language === 'es' ? '¡Consulta Registrada Exitosamente!' : 'Inquiry Successfully Recorded!')}
                                </h4>
                                <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                                  {submissionFeedback?.message || (language === 'es' ? 'Su consulta ha sido procesada y canalizada a nuestra gerencia en operaciones@agricarlperu.com.' : 'Your inquiry has been processed and routed to management at operaciones@agricarlperu.com.')}
                                </p>
                              </div>

                              {/* Resumen del Mensaje */}
                              <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 text-left text-xs space-y-2 max-w-lg mx-auto shadow-inner">
                                <div className="flex justify-between border-b border-slate-200/60 pb-1 text-[11px]">
                                  <span className="text-slate-400 font-mono">{language === 'es' ? 'Para:' : 'To:'}</span>
                                  <span className="font-mono font-bold text-emerald-800">operaciones@agricarlperu.com</span>
                                </div>
                                <div className="flex justify-between border-b border-slate-200/60 pb-1 text-[11px]">
                                  <span className="text-slate-400 font-mono">{language === 'es' ? 'De:' : 'From:'}</span>
                                  <span className="font-semibold text-slate-700">{formName} ({formEmail})</span>
                                </div>
                                {formPhone && (
                                  <div className="flex justify-between border-b border-slate-200/60 pb-1 text-[11px]">
                                    <span className="text-slate-400 font-mono">{language === 'es' ? 'Teléfono:' : 'Phone:'}</span>
                                    <span className="font-mono text-slate-700">{formPhone}</span>
                                  </div>
                                )}
                                <div className="pt-1">
                                  <span className="text-slate-400 font-mono text-[11px] block">{language === 'es' ? 'Contenido:' : 'Content:'}</span>
                                  <p className="text-slate-600 italic line-clamp-3 text-[11px] mt-0.5 bg-white p-2.5 rounded-lg border border-slate-200/60">
                                    "{formMsg}"
                                  </p>
                                </div>
                              </div>

                              {/* Opciones directas de envío */}
                              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-1">
                                <a 
                                  href={`mailto:operaciones@agricarlperu.com?subject=${encodeURIComponent(formSubject.trim() ? `Consulta Web AGRICARL: ${formSubject.trim()} - ${formName.trim()}` : `Consulta Web AGRICARL - ${formName.trim()}`)}&body=${encodeURIComponent(`Estimado equipo de AGRICARL PERÚ S.A.C.,\n\nHe registrado la siguiente consulta desde el portal web oficial (www.agricarlperu.com):\n\n• Remitente: ${formName.trim()}\n• Correo: ${formEmail.trim()}\n• Teléfono: ${formPhone.trim() || 'No indicado'}\n• Asunto: ${formSubject.trim() || 'Consulta Comercial'}\n\nDETALLE:\n${formMsg.trim()}\n\n---\nAGRICARL PERÚ S.A.C. - RUC: 20611291001`)}`}
                                  className="w-full sm:w-auto bg-brand-green-dark hover:bg-brand-green text-white px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                                >
                                  <Mail className="w-4 h-4" />
                                  <span>{language === 'es' ? 'Abrir en Cliente de Correo' : 'Open in Mail Client'}</span>
                                </a>

                                <a 
                                  href={`https://mail.google.com/mail/?view=cm&fs=1&to=operaciones@agricarlperu.com&su=${encodeURIComponent(formSubject.trim() ? `Consulta Web AGRICARL: ${formSubject.trim()} - ${formName.trim()}` : `Consulta Web AGRICARL - ${formName.trim()}`)}&body=${encodeURIComponent(`Estimado equipo de AGRICARL PERÚ S.A.C.,\n\nHe registrado la siguiente consulta desde el portal web oficial (www.agricarlperu.com):\n\n• Remitente: ${formName.trim()}\n• Correo: ${formEmail.trim()}\n• Teléfono: ${formPhone.trim() || 'No indicado'}\n• Asunto: ${formSubject.trim() || 'Consulta Comercial'}\n\nDETALLE:\n${formMsg.trim()}\n\n---\nAGRICARL PERÚ S.A.C. - RUC: 20611291001`)}`}
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                                >
                                  <ExternalLink className="w-4 h-4" />
                                  <span>{language === 'es' ? 'Enviar vía Gmail Web' : 'Send via Gmail Web'}</span>
                                </a>
                              </div>

                              <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-center gap-3 text-xs">
                                <a 
                                  href={`https://wa.me/51956352862?text=${encodeURIComponent(`Hola AGRICARL PERÚ S.A.C., acabo de redactar una consulta para operaciones@agricarlperu.com:\n\n*De:* ${formName}\n*Correo:* ${formEmail}\n*Mensaje:* ${formMsg}`)}`}
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-emerald-700 hover:text-emerald-800 font-semibold flex items-center gap-1.5 py-1"
                                >
                                  <Phone className="w-3.5 h-3.5" />
                                  <span>{language === 'es' ? 'Enviar también copia por WhatsApp (956 352 862)' : 'Also send copy via WhatsApp (956 352 862)'}</span>
                                </a>
                                <span className="hidden sm:inline text-slate-300">·</span>
                                <button 
                                  onClick={handleResetForm}
                                  className="text-slate-500 hover:text-slate-800 font-semibold cursor-pointer py-1"
                                >
                                  {language === 'es' ? 'Redactar otro mensaje' : 'Write another message'}
                                </button>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>

                  {/* Executive Operational Accreditation Card */}
                  <div className="pt-4">
                    <div className="text-center mb-5">
                      <span className="font-mono text-[9px] uppercase tracking-widest text-brand-pink-accent font-bold bg-brand-pink-accent/10 px-3.5 py-1.5 rounded-full border border-brand-pink-accent/20">
                        {language === 'es' ? 'Credencial Institucional y Canales de Atención Directa' : 'Institutional Credentials & Direct Contact Channels'}
                      </span>
                    </div>
                    <div className="max-w-3xl mx-auto">
                      <ExecutiveCard variant="light" />
                    </div>
                  </div>

                  {/* Interactive Geographic Map Component */}
                  <div className="pt-6">
                    <LocationMapSanMartin />
                  </div>
                </motion.div>
              )}
            </>
          )}

        </AnimatePresence>
      </main>

      {/* 4. Pie de Página Corporativo Renovado - Diseño Simple con Fondo de la Hormiga */}
      <EditableBackground
        sectionKey="bg-footer"
        title="Fondo Pie de Página"
        defaultImage={heroBgUrl}
        defaultColor="#051b11"
        defaultOpacity={0.88}
        defaultPattern="none"
        className="text-slate-200 border-t border-emerald-950 font-sans relative overflow-hidden"
      >
        {/* Capa de Imagen de Fondo de la Hormiga / Selva Amazónica */}
        <img 
          src={heroBgUrl} 
          alt="Ecosistema Selva San Martín" 
          className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/85 to-slate-950/95 pointer-events-none"></div>

        {/* Franja Superior: Marcha de la Hormiga Cortadora (Compacta) */}
        <div className="w-full overflow-hidden py-1.5 bg-black/50 border-b border-emerald-500/15 backdrop-blur-sm relative z-10 select-none">
          <div className="flex items-center gap-12 animate-ant-march whitespace-nowrap">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="inline-flex items-center gap-2 text-[11px] font-mono text-emerald-300/90">
                <span className="text-xs inline-block transform -rotate-12 animate-ant-bob">🍃</span>
                <span className="font-bold tracking-widest uppercase text-emerald-400">
                  AGRICARL PERÚ · San Martín
                </span>
                <span className="text-xs">🐜</span>
              </div>
            ))}
          </div>
        </div>

        {/* Contenido Compacto y Disminuido */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 relative z-10 flex flex-col items-center text-center space-y-3">
          {/* Navegación Directa */}
          <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-xs font-medium text-slate-300">
            <button 
              onClick={() => navigateToPage('inicio')} 
              className="hover:text-emerald-400 transition-colors cursor-pointer"
            >
              {translations.nav.home}
            </button>
            <span className="text-emerald-500/40">·</span>
            <button 
              onClick={() => navigateToPage('quienes-somos')} 
              className="hover:text-emerald-400 transition-colors cursor-pointer"
            >
              {translations.nav.about}
            </button>
            <span className="text-emerald-500/40">·</span>
            <button 
              onClick={() => navigateToPage('productos')} 
              className="hover:text-emerald-400 transition-colors cursor-pointer"
            >
              {translations.nav.products}
            </button>
            <span className="text-emerald-500/40">·</span>
            <button 
              onClick={() => navigateToPage('servicios')} 
              className="hover:text-emerald-400 transition-colors cursor-pointer"
            >
              {translations.nav.services}
            </button>
            <span className="text-emerald-500/40">·</span>
            <button 
              onClick={() => navigateToPage('contacto')} 
              className="hover:text-emerald-400 transition-colors cursor-pointer"
            >
              {translations.nav.contact}
            </button>
          </nav>

          {/* Canales Rápidos de Contacto */}
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-[11px] text-slate-400">
            <a 
              href="https://wa.me/51956352862" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-emerald-300 transition-colors flex items-center gap-1 font-mono"
            >
              <span className="text-emerald-400 font-bold">WhatsApp:</span> {siteText.contactPhone}
            </a>
            <span className="text-slate-700 hidden sm:inline">|</span>
            <a 
              href="mailto:operaciones@agricarlperu.com" 
              className="hover:text-emerald-300 transition-colors flex items-center gap-1 font-mono"
            >
              <span className="text-emerald-400 font-bold">Email:</span> {siteText.contactEmail}
            </a>
            <span className="text-slate-700 hidden sm:inline">|</span>
            <a 
              href="http://www.agricarlperu.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-cyan-400 hover:underline transition-colors font-mono"
            >
              www.agricarlperu.com
            </a>
          </div>

          {/* Descarga Brochure & Copyright */}
          <div className="pt-2 border-t border-white/10 w-full flex flex-col sm:flex-row items-center justify-between gap-2.5 text-[11px] text-slate-500">
            <p>© 2026 AGRICARL PERÚ S.A.C. · {translations.footer.allRightsReserved}</p>
            <CorporateBrochureButton 
              variant="header" 
              className="bg-emerald-950/80 hover:bg-emerald-900 text-emerald-200 border-emerald-500/30 hover:border-emerald-400 py-1 px-3 text-[11px]"
              companyRuc={siteText.companyRuc} 
              email={siteText.contactEmail}
              phone={siteText.contactPhone}
            />
          </div>
        </div>
      </EditableBackground>

      {/* WhatsApp Floating Button (Bottom-Left) */}
      <a 
        href="https://wa.me/51956352862" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="fixed bottom-5 left-5 z-40 bg-[#25D366] hover:bg-[#20ba59] text-white p-3.5 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 flex items-center justify-center cursor-pointer print:hidden"
        title={language === 'es' ? 'Escríbenos por WhatsApp' : 'Contact us on WhatsApp'}
      >
        <MessageSquare className="w-6 h-6 fill-current text-white" />
      </a>

      {/* Floating Brochure Download Button (Bottom-Right) */}
      <CorporateBrochureButton 
        variant="floating" 
        companyRuc={siteText.companyRuc} 
        email={siteText.contactEmail}
        phone={siteText.contactPhone}
      />

    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <MediaProvider>
        <AppContent />
        <ImageEditModal />
        <MediaManagerDrawer />
      </MediaProvider>
    </LanguageProvider>
  );
}
