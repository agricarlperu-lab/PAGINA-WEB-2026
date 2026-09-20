export interface PresetItem {
  id: string;
  name: string;
  category: 'amazon' | 'sacha' | 'cacao' | 'coco' | 'aguaje' | 'finanzas' | 'fondos';
  url: string;
  thumbnail?: string;
}

export const MEDIA_PRESETS: PresetItem[] = [
  // Fondos y Texturas
  {
    id: 'bg-selva-fog',
    name: 'Selva Amazónica con Neblina (San Martín)',
    category: 'fondos',
    url: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&q=80&w=1600'
  },
  {
    id: 'bg-dark-architect',
    name: 'Arquitectura Pizarra Dark Minimal',
    category: 'fondos',
    url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1600'
  },
  {
    id: 'bg-green-canopy',
    name: 'Dosel Verde Esmeralda Aéreo',
    category: 'fondos',
    url: 'https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&q=80&w=1600'
  },
  {
    id: 'bg-clean-light',
    name: 'Estudio Blanco Suave con Sombra Sutil',
    category: 'fondos',
    url: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&q=80&w=1600'
  },

  // Sacha Inchi
  {
    id: 'sacha-seeds',
    name: 'Semillas Secas de Sacha Inchi',
    category: 'sacha',
    url: 'https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'sacha-oil',
    name: 'Aceite Dorado Virgen en Frío',
    category: 'sacha',
    url: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'sacha-harvest',
    name: 'Fruto Verde Estrella Sacha Inchi',
    category: 'sacha',
    url: 'https://images.unsplash.com/photo-1598965675045-45c5e72c7d05?auto=format&fit=crop&q=80&w=1200'
  },

  // Cacao
  {
    id: 'cacao-beans',
    name: 'Granos de Cacao Secos y Fermentados',
    category: 'cacao',
    url: 'https://images.unsplash.com/photo-1587132137056-bfbf0166836e?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'cacao-pod',
    name: 'Mazorca Fresca de Cacao en Árbol',
    category: 'cacao',
    url: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'cacao-nibs',
    name: 'Nibs y Pasta Artesanal de Cacao',
    category: 'cacao',
    url: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?auto=format&fit=crop&q=80&w=1200'
  },

  // Coco
  {
    id: 'coco-fresh',
    name: 'Cocos Frescos Cosechados',
    category: 'coco',
    url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'coco-shredded',
    name: 'Coco Rallado Deshidratado Fino',
    category: 'coco',
    url: 'https://images.unsplash.com/photo-1544378730-8b5104b18790?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'coco-oil-bottle',
    name: 'Aceite de Coco Virgen Prensado',
    category: 'coco',
    url: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&q=80&w=1200'
  },

  // Aguaje
  {
    id: 'aguaje-wild',
    name: 'Palmeras de Aguaje y Fruto Silvestre',
    category: 'aguaje',
    url: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'aguaje-superfruit',
    name: 'Pulpa y Frutos Rojos Amazónicos',
    category: 'aguaje',
    url: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&q=80&w=1200'
  },

  // Finanzas y Tecnología
  {
    id: 'pos-contactless',
    name: 'Cobro Digital Terminal Móvil',
    category: 'finanzas',
    url: 'https://images.unsplash.com/photo-1556742049-0a670f4a4591?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'conta-software',
    name: 'Gestión Contable y Pantalla Financiera',
    category: 'finanzas',
    url: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'fintech-card',
    name: 'Pasarela de Recaudación Segura',
    category: 'finanzas',
    url: 'https://images.unsplash.com/photo-1563013544-824ae1d704d3?auto=format&fit=crop&q=80&w=1200'
  }
];
