import { SiteTextConfig, CommerceItem } from '../data';
import cocoHeroImg from '../assets/images/regenerated_image_1789613068806.jpg';

export type Language = 'es' | 'en';

export interface TranslationDictionary {
  // Navigation & Header
  nav: {
    home: string;
    about: string;
    products: string;
    services: string;
    contact: string;
    editMedia: string;
    customBgAndPhotos: string;
    brochurePdf: string;
    brochureDownloaded: string;
    generatingFile: string;
    getQuote: string;
    back: string;
    backToCatalog: string;
    viewMore: string;
    exploreProducts: string;
    viewServices: string;
    tagline: string;
    amazonEcosystem: string;
    sanMartinAmazon: string;
    langToggleLabel: string;
    aboutUs: string;
  };
  // Site Text Configuration
  siteText: SiteTextConfig;
  // Commerce Items (Products & Services)
  commerceItems: CommerceItem[];
  // Products page
  products: {
    title: string;
    subtitle: string;
  };
  // Services page
  services: {
    title: string;
    subtitle: string;
  };
  // Divisions & Values
  divisions: {
    tagline: string;
    title: string;
    subtitle: string;
    agroTitle: string;
    agroSubtitle: string;
    agroDesc: string;
    agroPoints: string[];
    fintechTitle: string;
    fintechSubtitle: string;
    fintechDesc: string;
    fintechPoints: string[];
  };
  // Value chain
  process: {
    title: string;
    subtitle: string;
    responsibleChain: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
  };
  // About Us
  about: {
    badge: string;
    title: string;
    heading: string;
    quote: string;
    missionTitle: string;
    missionText: string;
    visionTitle: string;
    visionText: string;
    valuesTitle: string;
    valuesSubtitle: string;
    sustainabilityTitle: string;
    sustainability: string;
    sustainabilityDesc: string;
    innovationTitle: string;
    innovation: string;
    innovationDesc: string;
    transparencyTitle: string;
    transparency: string;
    transparencyDesc: string;
  };
  // Contact
  contact: {
    badge: string;
    attentionChannels: string;
    title: string;
    connectWithUs: string;
    subtitle: string;
    readyToAssist: string;
    corpInfo: string;
    corporateInfo: string;
    mainOffice: string;
    directPhone: string;
    centralPhone: string;
    corpEmail: string;
    officialEmail: string;
    website: string;
    officialPortal: string;
    officialRuc: string;
    businessHours: string;
    hoursValue: string;
    businessHoursVal: string;
    activeSupportLine: string;
    formTitle: string;
    formSubtitle: string;
    sendMessageDirect: string;
    fullName: string;
    fullNamePlaceholder: string;
    email: string;
    emailAddress: string;
    emailPlaceholder: string;
    phone: string;
    phoneWhatsApp: string;
    phonePlaceholder: string;
    subject: string;
    subjectPlaceholder: string;
    message: string;
    messagePlaceholder: string;
    sendBtn: string;
    sendDirect: string;
    sending: string;
    successMsg: string;
    successDelivery: string;
    errorMsg: string;
  };
  // Footer
  footer: {
    desc: string;
    origin: string;
    agroTitle: string;
    agroDivision: string;
    traceability: string;
    fintechTitle: string;
    fintechDivision: string;
    autoReconciliation: string;
    transparentFee: string;
    contactTitle: string;
    contactHeadquarters: string;
    locationLabel: string;
    location: string;
    phoneLabel: string;
    phone: string;
    emailLabel: string;
    email: string;
    websiteLabel: string;
    website: string;
    rucLabel: string;
    officialRuc: string;
    rightsReserved: string;
    allRightsReserved: string;
    tagline: string;
  };
  // Common terms & subpage labels
  common: {
    superfood: string;
    fineCocoa: string;
    fineAromaCacao: string;
    superfruit: string;
    agroIndustry: string;
    product: string;
    service: string;
    financialManagement: string;
    agriculturalSupply: string;
    technicalSpecifications: string;
    keyBenefits: string;
    presentation: string;
    originSanMartin: string;
    directQuotePrompt: string;
    requestQuoteNow: string;
    chatWhatsApp: string;
    welcomeTagline: string;
    viewDetails: string;
    motto: string;
    companyMotto: string;
  };
}

export const TRANSLATIONS: Record<Language, TranslationDictionary> = {
  es: {
    nav: {
      home: 'Inicio',
      about: 'Quiénes somos',
      aboutUs: 'Quiénes somos',
      products: 'Productos',
      services: 'Servicios',
      contact: 'Contacto',
      editMedia: 'Editar Medios',
      customBgAndPhotos: 'Personalizar Fondos y Fotos',
      brochurePdf: 'Brochure PDF',
      brochureDownloaded: '¡Brochure Oficial descargado!',
      generatingFile: 'Generando archivo...',
      getQuote: 'Cotizar / Contacto',
      back: 'Regresar',
      backToCatalog: 'Volver al catálogo',
      viewMore: 'Ver Más',
      exploreProducts: 'Explorar Productos',
      viewServices: 'Ver Servicios',
      tagline: 'AGRICARL PERÚ · Conectando al agricultor con el mercado',
      amazonEcosystem: 'Ecosistema Amazónico',
      sanMartinAmazon: 'S.A.C. · San Martín',
      langToggleLabel: 'Cambiar idioma',
    },
    siteText: {
      heroTagline: 'AGRICARL PERÚ · Conectando al agricultor con el mercado',
      companyMotto: 'AGRICARL PERÚ: Conectando al agricultor con el mercado',
      heroTitleLine1: 'SOLUCIONES DE',
      heroTitleHighlight1: 'SUMINISTRO',
      heroTitleLine2: 'Y GESTIÓN DE',
      heroTitleHighlight2: 'RECAUDACIÓN',
      heroSubtitle: 'En AGRICARL PERÚ S.A.C. nos especializamos en la comercialización de materias primas oriundos de la amazonia, y en diversos productos de nivel industrial. Paralelamente, ofrecemos nuestro Servicio de Recaudación Financiera, un producto transaccional diseñado como una herramienta clave para la gestión de cobros de negocios entre proveedores y clientes.',
      aboutTitle: 'QUIÉNES SOMOS',
      aboutDescription: 'AGRICARL PERÚ S.A.C. es una empresa peruana con sede en la región San Martín, orientada al desarrollo agroindustrial sostenible de superalimentos amazónicos como el Sacha Inchi y el Cacao Fino de Aroma, combinando tecnología de recaudación transaccional AgriCobros y gestión contable para emprendedores.',
      missionText: 'Impulsar el crecimiento de los agricultores y emprendedores mediante la comercialización de insumos orgánicos de alta calidad y soluciones tecnológicas de recaudación transparente.',
      visionText: 'Convertirnos en el referente nacional e internacional de articulación entre la producción amazónica sostenible y soluciones financieras accesibles.',
      contactPhone: '+51 956 352 862',
      contactEmail: 'operaciones@agricarlperu.com',
      contactAddress: 'Región San Martín, Amazonía del Perú',
      companyRuc: '20611291001',
      companyWebsite: 'http://www.agricarlperu.com',
      stat1Value: '100%',
      stat1Label: 'Granos Seleccionados',
      stat2Value: '24/7',
      stat2Label: 'Plataforma AgriCobros',
      stat3Value: 'PEL 5.2',
      stat3Label: 'Gestor Contable Formato 5.2',
      stat4Value: '100%',
      stat4Label: 'Trazabilidad y Origen Justo',
      divisionsTitle: 'Pilares del Progreso y Sostenibilidad',
      divisionsSubtitle: 'En AGRICARL PERÚ S.A.C., unimos el potencial del agro peruano con la eficiencia financiera del mañana.',
      agroDivisionTitle: 'División Suministro Agrícola',
      agroDivisionDesc: 'Producimos, seleccionamos y exportamos materias primas de la selva de San Martín, como el Sacha Inchi y el Cacao Amazónico. Trabajamos en alianza directa con cooperativas locales de agricultores para asegurar un comercio justo, trazabilidad rigurosa y granos orgánicos premium.',
      fintechDivisionTitle: 'División Gestión Financiera',
      fintechDivisionDesc: 'Desarrollamos soluciones transaccionales avanzadas para optimizar la cadena de cobros y pagos corporativos. A través de nuestro gateway de recaudación AgriCobros y la solución integrada de Gestor Contable 5.4, simplificamos los flujos de caja y la contabilidad empresarial.',
      quoteText: '«Impulsando el desarrollo sostenible desde el corazón de la Amazonía.»',
      quoteSubtitle: 'Nuestra Filosofía Sostenible',
      contactTitle: 'Conéctese con Nosotros',
      contactSubtitle: 'Estamos listos para atender sus requerimientos de materias primas o configurar sus soluciones de recaudación.',
      footerTagline: 'AGRICARL PERÚ · Conectando al agricultor con el mercado',
    },
    commerceItems: [
      {
        id: 'sacha-inchi',
        type: 'producto',
        title: 'Sacha Inchi',
        description: 'El Superalimento Amazónico Conocido como el «Maní del Inca», nuestro Sacha Inchi destaca por su pureza y origen sostenible. Es una fuente excepcional de Omega-3, ideal para la salud cardiovascular. Lo ofrecemos en semillas seleccionadas para consumo directo, tostado o extracción de aceites nutracéuticos.',
        image: 'https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 'cacao',
        type: 'producto',
        title: 'Cacao Amazónico',
        description: 'Cacao Amazónico de Alta Pureza. Nuestro cacao proviene directamente de la selva peruana, destacando por su perfil nutricional superior. En AGRICARL PERÚ SAC, trabajamos junto a agricultores locales bajo rigurosos estándares para garantizar un grano de calidad excepcional y origen sostenible.',
        image: 'https://images.unsplash.com/photo-1587132137056-bfbf0166836e?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 'aguaje-deshidratado',
        type: 'producto',
        title: 'Aguaje Deshidratado',
        description: 'Fruto amazónico de alta densidad nutritiva. Pulpa de aguaje (Mauritia flexuosa) deshidratada a bajas temperaturas para preservar sus ricos carotenoides (provitamina A), antioxidantes, fitoestrógenos naturales y vitamina E. Suministrado en polvo fino y hojuelas para la industria alimentaria, nutracéutica y cosmética.',
        image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 'coco-derivados',
        type: 'producto',
        title: 'Coco & Subproductos (Aceite y Rallado)',
        description: 'Aprovechamiento integral del coco cosechado en la Amazonía peruana. Proveemos subproductos de alta pureza: Coco Rallado Deshidratado (corte fino y medio, libre de conservantes y sin azúcar añadida) y Aceite de Coco Virgen Prensado en Frío, rico en ácido láurico y triglicéridos de cadena media (MCT).',
        image: cocoHeroImg
      },
      {
        id: 'gestion-recaudacion',
        type: 'servicio',
        title: 'Gestión de Recaudación AgriCobros',
        description: 'Simplifique sus operaciones financieras con nuestro sistema AgriCobros, la solución integral para optimizar sus cobros y pagos. Acceda a las tarifas más competitivas del mercado y reciba pagos con cargo a tarjetas de los cuatro bancos más importantes del Perú.',
        image: 'https://images.unsplash.com/photo-1563013544-824ae1d704d3?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 'gestor-contable',
        type: 'servicio',
        title: 'Gestor Contable Formato 5.2',
        description: 'Optimiza tu administración con nuestra herramienta diseñada específicamente para emprendedores. Nuestro sistema facilita la generación automática de los asientos contables del Libro Diario de Formato Simplificado (5.2), utilizando el Plan Contable General Empresarial vigente (5.4).',
        image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800'
      }
    ],
    products: {
      title: 'Productos Agroindustriales',
      subtitle: 'Superalimentos y materias primas amazónicas con certificación y trazabilidad de origen.'
    },
    services: {
      title: 'Servicios Corporativos & FinTech',
      subtitle: 'Herramientas financieras, recaudación transaccional y asesoría contable especializada.'
    },
    divisions: {
      tagline: 'Pilares del Progreso y Sostenibilidad',
      title: 'Dos Ejes Estratégicos que Transforman',
      subtitle: 'En AGRICARL PERÚ S.A.C., unimos el potencial del agro peruano con la eficiencia financiera del mañana.',
      agroTitle: 'División Suministro Agrícola',
      agroSubtitle: 'Materias Primas & Superalimentos Orgánicos',
      agroDesc: 'Producimos, seleccionamos y exportamos materias primas de la selva de San Martín, como el Sacha Inchi y el Cacao Amazónico. Trabajamos en alianza directa con cooperativas locales de agricultores para asegurar un comercio justo, trazabilidad rigurosa y granos orgánicos premium.',
      agroPoints: [
        'Comercio Justo y Trato Directo con Familias Agricultoras',
        'Trazabilidad Total desde las Parcelas de San Martín',
        'Controles Fitosanitarios y Calidad de Exportación',
        'Procesamiento Ecológico con Respeto a la Biodiversidad'
      ],
      fintechTitle: 'División Gestión Financiera',
      fintechSubtitle: 'Tecnología Transaccional & Contabilidad Simplificada',
      fintechDesc: 'Desarrollamos soluciones transaccionales avanzadas para optimizar la cadena de cobros y pagos corporativos. A través de nuestro gateway de recaudación AgriCobros y la solución integrada de Gestor Contable 5.4, simplificamos los flujos de caja y la contabilidad empresarial.',
      fintechPoints: [
        'Plataforma AgriCobros: Recaudación Multicanal y Tarjetas',
        'Generación Automática de Libro Diario Formato 5.2',
        'Conciliación Bancaria Rápida y Transparente',
        'Tarifas Competitivas y Soporte Especializado'
      ]
    },
    process: {
      title: 'Compromiso de Origen a Destino',
      subtitle: 'Nuestro proceso asegura excelencia operativa y responsabilidad en cada etapa del camino.',
      responsibleChain: 'Cadena de Valor Responsable',
      step1Title: 'Origen Justo',
      step1Desc: 'Capacitamos y compramos directamente a agricultores de San Martín, pagando tarifas éticas y fomentando prácticas ecológicas.',
      step2Title: 'Procesamiento Premium',
      step2Desc: 'Seleccionamos los mejores lotes de Sacha Inchi y Cacao bajo controles técnicos sanitarios rigurosos en nuestra planta.',
      step3Title: 'Facilidad y Tecnología',
      step3Desc: 'Soportamos toda la cadena comercial y de recaudación mediante herramientas digitales transaccionales de última generación.'
    },
    about: {
      badge: 'Quiénes somos',
      title: 'Quiénes Somos',
      heading: 'Nuestra Filosofía Sostenible',
      quote: '«Impulsando el desarrollo sostenible desde el corazón de la Amazonía.»',
      missionTitle: 'Nuestra Misión',
      missionText: 'Impulsar el crecimiento de los agricultores y emprendedores mediante la comercialización de insumos orgánicos de alta calidad y soluciones tecnológicas de recaudación transparente.',
      visionTitle: 'Nuestra Visión',
      visionText: 'Convertirnos en el referente nacional e internacional de articulación entre la producción amazónica sostenible y soluciones financieras accesibles.',
      valuesTitle: 'Nuestros Valores Corporativos',
      valuesSubtitle: 'Los principios éticos que guían nuestras acciones diarias.',
      sustainabilityTitle: 'Sostenibilidad',
      sustainability: 'Sostenibilidad',
      sustainabilityDesc: 'Preservamos el ecosistema amazónico trabajando con estándares de cultivo responsables y apoyando a agricultores de San Martín.',
      innovationTitle: 'Innovación',
      innovation: 'Innovación',
      innovationDesc: 'Desarrollamos soluciones financieras disruptivas como AgriCobros y sistemas contables avanzados para automatizar procesos.',
      transparencyTitle: 'Transparencia',
      transparency: 'Transparencia',
      transparencyDesc: 'Operamos bajo altos estándares de cumplimiento regulatorio y ético, garantizando confianza total a clientes, socios y agricultores.'
    },
    contact: {
      badge: 'Canales de Atención',
      attentionChannels: 'Canales de Atención',
      title: 'Conéctese con Nosotros',
      connectWithUs: 'Conéctese con Nosotros',
      subtitle: 'Estamos listos para atender sus requerimientos de materias primas o configurar sus soluciones de recaudación.',
      readyToAssist: 'Estamos listos para atender sus consultas y cotizaciones.',
      corpInfo: 'Información Corporativa',
      corporateInfo: 'Información Corporativa',
      mainOffice: 'Oficina Principal',
      directPhone: 'Teléfono Directo',
      centralPhone: 'Central Telefónica / WhatsApp',
      corpEmail: 'Correo Electrónico',
      officialEmail: 'Correo Oficial',
      website: 'Sitio Web',
      officialPortal: 'Portal Institucional',
      officialRuc: 'RUC Oficial',
      businessHours: 'Horario de Atención',
      hoursValue: 'Lunes a Viernes: 8:00 am - 6:00 pm (UTC-5)',
      businessHoursVal: 'Lunes a Viernes: 8:00 am - 6:00 pm (UTC-5)',
      activeSupportLine: 'Línea de soporte y cotizaciones activa',
      formTitle: 'Envíenos una Consulta Directa',
      formSubtitle: 'Complete el formulario y nuestro equipo comercial le responderá en breve.',
      sendMessageDirect: 'Envíenos un mensaje directo',
      fullName: 'Nombre y Apellidos',
      fullNamePlaceholder: 'Ej. Carlos Mendoza',
      email: 'Correo Electrónico',
      emailAddress: 'Correo Electrónico',
      emailPlaceholder: 'carlos@empresa.com',
      phone: 'Teléfono / WhatsApp',
      phoneWhatsApp: 'Teléfono / WhatsApp',
      phonePlaceholder: '+51 987 654 321',
      subject: 'Asunto o Producto de Interés',
      subjectPlaceholder: 'Ej. Cotización de Cacao Orgánico / Plataforma AgriCobros',
      message: 'Mensaje o Requerimiento',
      messagePlaceholder: 'Describa el volumen requerido, especificaciones o consulta...',
      sendBtn: 'Enviar Consulta',
      sendDirect: 'Enviar Consulta Directa',
      sending: 'Enviando...',
      successMsg: '¡Mensaje enviado con éxito! Nos comunicaremos a la brevedad.',
      successDelivery: 'Consulta remitida al área de operaciones.',
      errorMsg: 'Hubo un inconveniente al enviar el mensaje. Por favor contáctenos directamente por WhatsApp o teléfono.'
    },
    footer: {
      desc: 'Empresa peruana de la región San Martín orientada al desarrollo agroindustrial sostenible de superalimentos amazónicos y tecnología de recaudación transaccional.',
      origin: 'Región San Martín, Amazonía del Perú',
      agroTitle: 'División Agroindustrial',
      agroDivision: 'División Agro-Industrial',
      traceability: 'Trazabilidad y Comercio Justo',
      fintechTitle: 'División FinTech & TI',
      fintechDivision: 'División FinTech & TI',
      autoReconciliation: 'Conciliación Bancaria 24/7',
      transparentFee: 'Tarifas Competitivas y Transparentes',
      contactTitle: 'Contacto & Sede',
      contactHeadquarters: 'Sede Central & Contacto',
      locationLabel: 'Ubicación:',
      location: 'Ubicación',
      phoneLabel: 'Teléfono:',
      phone: 'Teléfono',
      emailLabel: 'Correo:',
      email: 'Correo',
      websiteLabel: 'Sitio Web:',
      website: 'Sitio Web',
      rucLabel: 'RUC Oficial:',
      officialRuc: 'RUC Oficial',
      rightsReserved: 'Todos los derechos reservados.',
      allRightsReserved: 'Todos los derechos reservados.',
      tagline: 'AGRICARL PERÚ · Conectando al agricultor con el mercado'
    },
    common: {
      superfood: 'Superalimento',
      fineCocoa: 'Cacao Fino',
      fineAromaCacao: 'Cacao Fino de Aroma',
      superfruit: 'Superfruto',
      agroIndustry: 'Agro-Industria',
      product: 'Producto',
      service: 'Servicio',
      financialManagement: 'Gestión Financiera',
      agriculturalSupply: 'Suministro Agrícola',
      technicalSpecifications: 'Especificaciones Técnicas',
      keyBenefits: 'Beneficios Clave',
      presentation: 'Presentación',
      originSanMartin: 'Origen: San Martín, Perú',
      directQuotePrompt: '¿Desea cotizar volúmenes de exportación o implementar recaudación?',
      requestQuoteNow: 'Solicitar Cotización',
      chatWhatsApp: 'Escríbenos por WhatsApp',
      welcomeTagline: '¡Bienvenido a AGRICARL!',
      viewDetails: 'Ver Detalles',
      motto: 'AGRICARL PERÚ: Conectando al agricultor con el mercado',
      companyMotto: 'AGRICARL PERÚ: Conectando al agricultor con el mercado'
    }
  },

  en: {
    nav: {
      home: 'Home',
      about: 'About Us',
      aboutUs: 'About Us',
      products: 'Products',
      services: 'Services',
      contact: 'Contact',
      editMedia: 'Edit Media',
      customBgAndPhotos: 'Customize Media & Photos',
      brochurePdf: 'PDF Brochure',
      brochureDownloaded: 'Official Brochure downloaded!',
      generatingFile: 'Generating file...',
      getQuote: 'Get Quote / Contact',
      back: 'Back',
      backToCatalog: 'Back to catalog',
      viewMore: 'View More',
      exploreProducts: 'Explore Products',
      viewServices: 'View Services',
      tagline: 'AGRICARL PERU · Connecting farmers with the market',
      amazonEcosystem: 'Amazonian Ecosystem',
      sanMartinAmazon: 'S.A.C. · San Martín, Peru',
      langToggleLabel: 'Switch language',
    },
    siteText: {
      heroTagline: 'AGRICARL PERU · Connecting farmers with the market',
      companyMotto: 'AGRICARL PERU: Connecting farmers with the market',
      heroTitleLine1: 'SUPPLY',
      heroTitleHighlight1: 'SOLUTIONS',
      heroTitleLine2: 'AND REVENUE',
      heroTitleHighlight2: 'MANAGEMENT',
      heroSubtitle: 'At AGRICARL PERÚ S.A.C., we specialize in sourcing and commercializing premium native raw materials from the Peruvian Amazon, alongside industrial-grade agricultural products. Concurrently, we provide our Financial Collection Service—a robust transactional platform designed as a critical tool for managing payments between businesses, suppliers, and clients.',
      aboutTitle: 'ABOUT US',
      aboutDescription: 'AGRICARL PERÚ S.A.C. is a Peruvian enterprise headquartered in the San Martín region, committed to the sustainable agroindustrial development of Amazonian superfoods such as Sacha Inchi and Fine Aroma Cocoa, seamlessly integrating AgriCobros revenue collection technology and simplified accounting tools for growing businesses.',
      missionText: 'To drive the prosperity of agricultural producers and entrepreneurs through the commercialization of high-purity organic raw materials and transparent, accessible revenue technologies.',
      visionText: 'To become the benchmark uniting sustainable Amazonian production with accessible, reliable financial and transactional solutions globally.',
      contactPhone: '+51 956 352 862',
      contactEmail: 'operaciones@agricarlperu.com',
      contactAddress: 'San Martín Region, Peruvian Amazon',
      companyRuc: '20611291001',
      companyWebsite: 'http://www.agricarlperu.com',
      stat1Value: '100%',
      stat1Label: 'Selected Premium Grains',
      stat2Value: '24/7',
      stat2Label: 'AgriCobros Platform',
      stat3Value: 'PEL 5.2',
      stat3Label: 'Accounting Manager Format 5.2',
      stat4Value: '100%',
      stat4Label: 'Traceability & Fair Origin',
      divisionsTitle: 'Pillars of Progress and Sustainability',
      divisionsSubtitle: 'At AGRICARL PERÚ S.A.C., we bring together the potential of Peruvian agriculture with tomorrow’s financial efficiency.',
      agroDivisionTitle: 'Agricultural Supply Division',
      agroDivisionDesc: 'We produce, select, and export raw materials from the lush forests of San Martín, such as Sacha Inchi and Amazonian Cocoa. We partner directly with local farming cooperatives to ensure fair trade pricing, rigorous traceability, and premium organic harvests.',
      fintechDivisionTitle: 'Financial Management Division',
      fintechDivisionDesc: 'We build advanced transactional solutions to streamline corporate payment and collection workflows. Through our AgriCobros revenue gateway and integrated Accounting Manager 5.4, we simplify cash flow and enterprise bookkeeping.',
      quoteText: '«Driving sustainable development from the heart of the Amazon.»',
      quoteSubtitle: 'Our Sustainable Philosophy',
      contactTitle: 'Connect with Us',
      contactSubtitle: 'We are ready to attend to your raw material requirements or configure your financial collection solutions.',
      footerTagline: 'AGRICARL PERU · Connecting farmers with the market',
    },
    commerceItems: [
      {
        id: 'sacha-inchi',
        type: 'producto',
        title: 'Sacha Inchi (Inca Peanut)',
        description: 'The Amazonian Superfood. Renowned as the "Inca Peanut", our Sacha Inchi stands out for its high purity and sustainable origin. It is an extraordinary natural source of Omega-3 fatty acids, promoting cardiovascular wellness. Available as selected raw seeds, roasted nuts, or cold-pressed virgin oil for nutraceutical extraction.',
        image: 'https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 'cacao',
        type: 'producto',
        title: 'Amazonian Cocoa (Fine Aroma)',
        description: 'High-Purity Amazonian Cocoa. Directly sourced from the fertile rainforests of San Martín, Peru, renowned worldwide for its superior floral and fruity flavor notes. At AGRICARL PERÚ SAC, we partner with smallholder cooperatives under strict agricultural standards to ensure exceptional grain quality and sustainable origin.',
        image: 'https://images.unsplash.com/photo-1587132137056-bfbf0166836e?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 'aguaje-deshidratado',
        type: 'producto',
        title: 'Dehydrated Aguaje',
        description: 'High-density nutrient fruit from the Mauritia flexuosa palm. Gently dehydrated at low temperatures to protect its high concentrations of beta-carotenes (provitamin A), natural antioxidants, phytoestrogens, and vitamin E. Supplied in fine powder and flakes for the food, nutraceutical, and cosmetic industries.',
        image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 'coco-derivados',
        type: 'producto',
        title: 'Coconut & Byproducts (Oil & Shredded)',
        description: 'Holistic utilization of coconuts harvested in the Peruvian Amazon. We supply high-purity derivatives: Dehydrated Shredded Coconut (fine and medium cuts, additive-free and without added sugars) and Cold-Pressed Virgin Coconut Oil, abundant in lauric acid and medium-chain triglycerides (MCT).',
        image: cocoHeroImg
      },
      {
        id: 'gestion-recaudacion',
        type: 'servicio',
        title: 'AgriCobros Revenue Management',
        description: 'Simplify your financial operations with our AgriCobros platform, an all-in-one gateway to streamline collections and recurring payouts. Benefit from market-leading rates and accept payments charged to cards from Peru’s top four major banking institutions.',
        image: 'https://images.unsplash.com/photo-1563013544-824ae1d704d3?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 'gestor-contable',
        type: 'servicio',
        title: 'Accounting Manager Format 5.2',
        description: 'Streamline your enterprise administration with our specialized digital bookkeeping software designed for entrepreneurs. Automatically generates standard simplified general journal entries (Format 5.2) adhering to Peru’s current General Corporate Accounting Plan (5.4).',
        image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800'
      }
    ],
    products: {
      title: 'Agroindustrial Products',
      subtitle: 'Amazonian superfoods and raw materials with certified origin and quality.'
    },
    services: {
      title: 'Corporate & FinTech Services',
      subtitle: 'Financial tools, transactional collection infrastructure, and specialized business advisory.'
    },
    divisions: {
      tagline: 'Pillars of Progress and Sustainability',
      title: 'Two Strategic Axes Driving Transformation',
      subtitle: 'At AGRICARL PERÚ S.A.C., we bring together the potential of Peruvian agriculture with tomorrow’s financial efficiency.',
      agroTitle: 'Agricultural Supply Division',
      agroSubtitle: 'Raw Materials & Organic Superfoods',
      agroDesc: 'We produce, select, and export raw materials from the lush forests of San Martín, such as Sacha Inchi and Amazonian Cocoa. We partner directly with local farming cooperatives to ensure fair trade pricing, rigorous traceability, and premium organic harvests.',
      agroPoints: [
        'Fair Trade and Direct Relationship with Farming Families',
        'Total Traceability from San Martín Farmlands',
        'Stringent Phytosanitary Controls & Export Quality',
        'Eco-Conscious Processing Respecting Amazonian Biodiversity'
      ],
      fintechTitle: 'Financial Management Division',
      fintechSubtitle: 'Transactional Tech & Simplified Bookkeeping',
      fintechDesc: 'We build advanced transactional solutions to streamline corporate payment and collection workflows. Through our AgriCobros revenue gateway and integrated Accounting Manager 5.4, we simplify cash flow and enterprise bookkeeping.',
      fintechPoints: [
        'AgriCobros Platform: Multi-Channel Card Collections',
        'Automated Journal Book Format 5.2 Generation',
        'Fast, Transparent Automated Bank Reconciliation',
        'Competitive Rates & Dedicated Specialist Support'
      ]
    },
    process: {
      title: 'Commitment from Origin to Destination',
      subtitle: 'Our process ensures operational excellence and ethical responsibility at every stage of the journey.',
      responsibleChain: 'Responsible Value Chain',
      step1Title: 'Fair Origin',
      step1Desc: 'We train and purchase directly from San Martín farmers, paying ethical prices and promoting regenerative agriculture.',
      step2Title: 'Premium Processing',
      step2Desc: 'We select the finest batches of Sacha Inchi and Cocoa under rigorous sanitary and technical controls at our facility.',
      step3Title: 'Technology & Ease',
      step3Desc: 'We back the entire commercial and revenue chain with modern, state-of-the-art transactional digital applications.'
    },
    about: {
      badge: 'About Us',
      title: 'About Us',
      heading: 'Our Sustainable Philosophy',
      quote: '«Driving sustainable development from the heart of the Amazon.»',
      missionTitle: 'Our Mission',
      missionText: 'To empower the growth of agricultural producers and entrepreneurs through the commercialization of high-quality organic ingredients and transparent revenue management technology.',
      visionTitle: 'Our Vision',
      visionText: 'To become the national and international benchmark uniting sustainable Amazonian production with accessible, reliable financial and transactional solutions.',
      valuesTitle: 'Our Corporate Values',
      valuesSubtitle: 'The ethical principles that guide our everyday operations.',
      sustainabilityTitle: 'Sustainability',
      sustainability: 'Sustainability',
      sustainabilityDesc: 'We preserve the Amazonian ecosystem by adhering to responsible farming practices and actively uplifting San Martín farming communities.',
      innovationTitle: 'Innovation',
      innovation: 'Innovation',
      innovationDesc: 'We develop disruptive financial tools such as AgriCobros and modern accounting utilities to automate enterprise workflows.',
      transparencyTitle: 'Transparency',
      transparency: 'Transparency',
      transparencyDesc: 'We adhere to the highest standards of regulatory compliance and corporate ethics, instilling complete trust among partners, clients, and farmers.'
    },
    contact: {
      badge: 'Customer Service Channels',
      attentionChannels: 'Customer Service Channels',
      title: 'Connect with Us',
      connectWithUs: 'Connect with Us',
      subtitle: 'We are ready to attend to your bulk raw material requirements or configure your corporate collection infrastructure.',
      readyToAssist: 'We are ready to attend to your bulk raw material inquiries and digital payment requests.',
      corpInfo: 'Corporate Information',
      corporateInfo: 'Corporate Information',
      mainOffice: 'Headquarters',
      directPhone: 'Direct Phone',
      centralPhone: 'Phone Central / WhatsApp',
      corpEmail: 'Corporate Email',
      officialEmail: 'Official Email',
      website: 'Website',
      officialPortal: 'Corporate Portal',
      officialRuc: 'Official Tax ID (RUC)',
      businessHours: 'Business Hours',
      hoursValue: 'Monday to Friday: 8:00 AM - 6:00 PM (UTC-5)',
      businessHoursVal: 'Monday to Friday: 8:00 AM - 6:00 PM (UTC-5)',
      activeSupportLine: 'Active support & quote line',
      formTitle: 'Send Us a Direct Inquiry',
      formSubtitle: 'Fill out the form below and our commercial team will respond promptly.',
      sendMessageDirect: 'Send Us a Direct Message',
      fullName: 'Full Name',
      fullNamePlaceholder: 'e.g. John Doe',
      email: 'Email Address',
      emailAddress: 'Email Address',
      emailPlaceholder: 'john@company.com',
      phone: 'Phone / WhatsApp',
      phoneWhatsApp: 'Phone / WhatsApp',
      phonePlaceholder: '+1 555 123 4567',
      subject: 'Subject or Product of Interest',
      subjectPlaceholder: 'e.g. Organic Cocoa Bulk Quote / AgriCobros Gateway',
      message: 'Message or Specification',
      messagePlaceholder: 'Please describe the required volume, technical specs, or inquiry...',
      sendBtn: 'Send Inquiry',
      sendDirect: 'Send Direct Inquiry',
      sending: 'Sending...',
      successMsg: 'Message sent successfully! We will get in touch with you shortly.',
      successDelivery: 'Inquiry forwarded to our operations team.',
      errorMsg: 'There was an issue sending your message. Please contact us directly via WhatsApp or telephone.'
    },
    footer: {
      desc: 'Peruvian enterprise based in San Martín region dedicated to sustainable agroindustrial development of Amazonian superfoods and transactional revenue collection technology.',
      origin: 'San Martín Region, Peruvian Amazon',
      agroTitle: 'Agroindustrial Division',
      agroDivision: 'Agro-Industrial Division',
      traceability: 'Origin Traceability & Fair Trade',
      fintechTitle: 'FinTech & IT Division',
      fintechDivision: 'FinTech & IT Division',
      autoReconciliation: '24/7 Automated Bank Reconciliation',
      transparentFee: 'Competitive and Transparent Rates',
      contactTitle: 'Headquarters & Contact',
      contactHeadquarters: 'Headquarters & Contact',
      locationLabel: 'Location:',
      location: 'Location',
      phoneLabel: 'Phone:',
      phone: 'Phone',
      emailLabel: 'Email:',
      email: 'Email',
      websiteLabel: 'Website:',
      website: 'Website',
      rucLabel: 'Official Tax ID (RUC):',
      officialRuc: 'Official Tax ID (RUC)',
      rightsReserved: 'All rights reserved.',
      allRightsReserved: 'All rights reserved.',
      tagline: 'AGRICARL PERU · Connecting farmers with the market'
    },
    common: {
      superfood: 'Superfood',
      fineCocoa: 'Fine Cocoa',
      fineAromaCacao: 'Fine Aroma Cacao',
      superfruit: 'Superfruit',
      agroIndustry: 'Agro-Industry',
      product: 'Product',
      service: 'Service',
      financialManagement: 'Financial Management',
      agriculturalSupply: 'Agricultural Supply',
      technicalSpecifications: 'Technical Specifications',
      keyBenefits: 'Key Benefits',
      presentation: 'Presentation',
      originSanMartin: 'Origin: San Martín, Peru',
      directQuotePrompt: 'Looking to quote export volumes or implement collection solutions?',
      requestQuoteNow: 'Request a Quote',
      chatWhatsApp: 'Chat with Us on WhatsApp',
      welcomeTagline: 'Welcome to AGRICARL!',
      viewDetails: 'View Details',
      motto: 'AGRICARL PERU: Connecting farmers with the market',
      companyMotto: 'AGRICARL PERU: Connecting farmers with the market'
    }
  }
};
