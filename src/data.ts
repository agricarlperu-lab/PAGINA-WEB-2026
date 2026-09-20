import cocoHeroImg from './assets/images/regenerated_image_1789613068806.jpg';

export interface CommerceItem {
  id: string;
  type: 'servicio' | 'producto';
  title: string;
  description: string;
  image: string;
}

export interface SiteTextConfig {
  heroTagline: string;
  heroTitleLine1: string;
  heroTitleHighlight1: string;
  heroTitleLine2: string;
  heroTitleHighlight2: string;
  heroSubtitle: string;
  aboutTitle: string;
  aboutDescription: string;
  missionText: string;
  visionText: string;
  contactPhone: string;
  contactEmail: string;
  contactAddress: string;
  companyRuc: string;
  companyWebsite?: string;
  stat1Value: string;
  stat1Label: string;
  stat2Value: string;
  stat2Label: string;
  stat3Value: string;
  stat3Label: string;
  stat4Value?: string;
  stat4Label?: string;
  divisionsTitle?: string;
  divisionsSubtitle?: string;
  agroDivisionTitle?: string;
  agroDivisionDesc?: string;
  fintechDivisionTitle?: string;
  fintechDivisionDesc?: string;
  quoteText?: string;
  quoteSubtitle?: string;
  contactTitle?: string;
  contactSubtitle?: string;
  footerTagline?: string;
  companyMotto?: string;
}

export const DEFAULT_SITE_TEXT: SiteTextConfig = {
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
  footerTagline: 'AGRICARL PERÚ · Conectando al agricultor con el mercado',
};

export const COMMERCE_ITEMS: CommerceItem[] = [
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
    title: 'Gestor Contable',
    description: 'Optimiza tu administración con nuestra herramienta diseñada específicamente para emprendedores. Nuestro sistema facilita la generación automática de los asientos contables del Libro Diario de Formato Simplificado (5.2), utilizando el Plan Contable General Empresarial vigente (5.4).',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'cacao',
    type: 'producto',
    title: 'Cacao',
    description: 'Cacao Amazónico de Alta Pureza Nuestro cacao proviene directamente de la selva peruana, destacando por su perfil nutricional superior. En AGRICARL PERÚ SAC, trabajamos junto a agricultores locales bajo rigurosos estándares para garantizar un grano de calidad excepcional y origen sostenible.',
    image: 'https://images.unsplash.com/photo-1587132137056-bfbf0166836e?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'sacha-inchi',
    type: 'producto',
    title: 'Sacha Inchi',
    description: 'El Superalimento Amazónico Conocido como el «Maní del Inca», nuestro Sacha Inchi destaca por su pureza y origen sostenible. Es una fuente excepcional de Omega-3, ideal para la salud cardiovascular. Lo ofrecemos en semillas seleccionadas para consumo directo, tostado o extracción de aceites nutracéuticos.',
    image: 'https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?auto=format&fit=crop&q=80&w=800'
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
  }
];
