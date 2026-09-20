import jsPDF from 'jspdf';

export interface BrochureData {
  companyName: string;
  companyRuc: string;
  location: string;
  email: string;
  phone: string;
  website: string;
}

export const generateCorporateBrochure = (data?: Partial<BrochureData>): void => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 18;
  const contentWidth = pageWidth - margin * 2;

  // Colors
  const darkGreen = [7, 37, 24];      // #072518
  const emerald = [13, 122, 70];       // #0d7a46
  const emeraldLight = [240, 253, 244];// #f0fdf4
  const slateDark = [9, 13, 22];       // #090d16
  const slateMuted = [100, 116, 139];  // #64748b
  const slateLight = [241, 245, 249];  // #f1f5f9
  const pinkAccent = [236, 72, 153];   // #ec4899
  const goldAccent = [217, 119, 6];    // #d97706

  const ruc = data?.companyRuc || '20611291001';
  const email = data?.email || 'operaciones@agricarlperu.com';
  const phone = data?.phone || '+51 956 352 862';
  const website = data?.website || 'http://www.agricarlperu.com';
  const location = data?.location || 'Región San Martín, Amazonía del Perú';

  // Helper: Header bar for inner pages
  const renderPageHeader = (pageNum: number, title: string) => {
    doc.setFillColor(darkGreen[0], darkGreen[1], darkGreen[2]);
    doc.rect(0, 0, pageWidth, 16, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(255, 255, 255);
    doc.text('AGRICARL PERÚ S.A.C. · DOSSIER CORPORATIVO OFICIAL', margin, 10.5);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(200, 230, 210);
    doc.text(title, pageWidth - margin, 10.5, { align: 'right' });

    // Header bottom line
    doc.setDrawColor(emerald[0], emerald[1], emerald[2]);
    doc.setLineWidth(0.8);
    doc.line(0, 16, pageWidth, 16);

    // Footer bar
    renderPageFooter(pageNum);
  };

  // Helper: Footer bar for inner pages
  const renderPageFooter = (pageNum: number) => {
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.4);
    doc.line(margin, pageHeight - 14, pageWidth - margin, pageHeight - 14);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(slateMuted[0], slateMuted[1], slateMuted[2]);
    doc.text(`RUC: ${ruc} | ${location} | ${email}`, margin, pageHeight - 9);
    doc.text(`Página ${pageNum} de 3`, pageWidth - margin, pageHeight - 9, { align: 'right' });
  };

  // ==========================================
  // PAGE 1: PORTADA & PRESENTACIÓN INSTITUCIONAL
  // ==========================================
  
  // Top Header Background
  doc.setFillColor(darkGreen[0], darkGreen[1], darkGreen[2]);
  doc.rect(0, 0, pageWidth, 82, 'F');

  // Decorative Emerald Strip
  doc.setFillColor(emerald[0], emerald[1], emerald[2]);
  doc.rect(0, 82, pageWidth, 3, 'F');

  // Badge Header
  doc.setFillColor(slateDark[0], slateDark[1], slateDark[2]);
  doc.roundedRect(margin, 12, 60, 6.5, 1.5, 1.5, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(236, 253, 245);
  doc.text('BROCHURE CORPORATIVO 2026', margin + 30, 16.5, { align: 'center' });

  // Main Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(23);
  doc.setTextColor(255, 255, 255);
  doc.text('AGRICARL PERÚ S.A.C.', margin, 31);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(167, 243, 208);
  doc.text('LEMA: « CONECTANDO AL AGRICULTOR CON EL MERCADO »', margin, 39);

  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(209, 250, 229);
  doc.text('Agroindustria Sostenible & Soluciones de Recaudación en la Amazonía', margin, 44);

  // Quick stats ribbon inside header
  const statBoxY = 48;
  const boxW = (contentWidth - 6) / 3;

  const stats = [
    { label: 'SUPERFOODS', val: '100% Orgánicos' },
    { label: 'RECAUDACIÓN', val: 'AgriCobros 24/7' },
    { label: 'CONTABILIDAD', val: 'PLE SUNAT 5.2' }
  ];

  stats.forEach((s, idx) => {
    const x = margin + idx * (boxW + 3);
    doc.setFillColor(15, 45, 30);
    doc.roundedRect(x, statBoxY, boxW, 22, 2, 2, 'F');
    doc.setDrawColor(30, 80, 50);
    doc.setLineWidth(0.3);
    doc.roundedRect(x, statBoxY, boxW, 22, 2, 2, 'S');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.5);
    doc.setTextColor(167, 243, 208);
    doc.text(s.label, x + boxW / 2, statBoxY + 7, { align: 'center' });

    doc.setFontSize(9);
    doc.setTextColor(255, 255, 255);
    doc.text(s.val, x + boxW / 2, statBoxY + 15, { align: 'center' });
  });

  // Presentation Body Text
  let curY = 96;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(slateDark[0], slateDark[1], slateDark[2]);
  doc.text('1. Identidad Institucional y Propuesta de Valor', margin, curY);

  curY += 6;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.8);
  doc.setTextColor(51, 65, 85);
  const introText = 
    'AGRICARL PERÚ S.A.C. es una empresa peruana con base estratégica en la región San Martín, dedicada a la articulación productiva y comercialización de materias primas y superalimentos nativos de la Amazonía. De forma paralela e integrada, desarrollamos soluciones tecnológicas de recaudación transaccional (AgriCobros) y herramientas de gestión contable automatizada (Formato 5.2 SUNAT), cerrando la brecha entre el agro de exportación y la eficiencia empresarial moderna.';
  const introLines = doc.splitTextToSize(introText, contentWidth);
  doc.text(introLines, margin, curY);
  curY += introLines.length * 4.4 + 6;

  // Misión y Visión Cards (2 Columns)
  const cardW = (contentWidth - 6) / 2;
  const cardH = 46;

  // Misión
  doc.setFillColor(slateLight[0], slateLight[1], slateLight[2]);
  doc.roundedRect(margin, curY, cardW, cardH, 2.5, 2.5, 'F');
  doc.setDrawColor(emerald[0], emerald[1], emerald[2]);
  doc.setLineWidth(0.8);
  doc.line(margin, curY, margin + cardW, curY);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(darkGreen[0], darkGreen[1], darkGreen[2]);
  doc.text('NUESTRA MISIÓN', margin + 6, curY + 8);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.8);
  doc.setTextColor(71, 85, 105);
  const misText = 
    'Impulsar el crecimiento sostenible de productores agrícolas y empresas mediante la comercialización ética de insumos amazónicos de máxima pureza, complementada con plataformas digitales transparentes para pagos, cobros y cumplimiento contable.';
  const misLines = doc.splitTextToSize(misText, cardW - 12);
  doc.text(misLines, margin + 6, curY + 14);

  // Visión
  const visX = margin + cardW + 6;
  doc.setFillColor(slateLight[0], slateLight[1], slateLight[2]);
  doc.roundedRect(visX, curY, cardW, cardH, 2.5, 2.5, 'F');
  doc.setDrawColor(pinkAccent[0], pinkAccent[1], pinkAccent[2]);
  doc.setLineWidth(0.8);
  doc.line(visX, curY, visX + cardW, curY);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(slateDark[0], slateDark[1], slateDark[2]);
  doc.text('NUESTRA VISIÓN', visX + 6, curY + 8);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.8);
  doc.setTextColor(71, 85, 105);
  const visText = 
    'Ser el conglomerado líder en articulación agroindustrial y fintech en la cuenca amazónica del Perú, reconocido internacionalmente por la excelencia botánica, la trazabilidad de origen y la innovación tecnológica al servicio del sector productivo.';
  const visLines = doc.splitTextToSize(visText, cardW - 12);
  doc.text(visLines, visX + 6, curY + 14);

  curY += cardH + 10;

  // Pilares y Principios Operativos (3 Columns)
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(slateDark[0], slateDark[1], slateDark[2]);
  doc.text('Pilares de Nuestra Operación', margin, curY);

  curY += 5;
  const colW = (contentWidth - 8) / 3;
  const pillars = [
    { title: 'Trazabilidad y Origen Justo', desc: 'Comercio directo con agricultores de San Martín. Precios justos y prácticas ecológicas.' },
    { title: 'Estándares Industriales', desc: 'Plantas de acopio y procesado con certificaciones sanitarias y control riguroso de humedad.' },
    { title: 'Plataforma Integrada', desc: 'Soporte bancario y liquidación automatizada para transacciones entre clientes y proveedores.' }
  ];

  pillars.forEach((p, i) => {
    const px = margin + i * (colW + 4);
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(px, curY, colW, 30, 2, 2, 'F');
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.4);
    doc.roundedRect(px, curY, colW, 30, 2, 2, 'S');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(emerald[0], emerald[1], emerald[2]);
    doc.text(p.title, px + 4, curY + 7);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(100, 116, 139);
    const pLines = doc.splitTextToSize(p.desc, colW - 8);
    doc.text(pLines, px + 4, curY + 13);
  });

  // Footer page 1
  renderPageFooter(1);

  // ==========================================
  // PAGE 2: PORTAFOLIO DE PRODUCTOS AGROINDUSTRIALES
  // ==========================================
  doc.addPage();
  renderPageHeader(2, 'LÍNEA DE PRODUCTOS AGROINDUSTRIALES');

  curY = 25;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(slateDark[0], slateDark[1], slateDark[2]);
  doc.text('2. Catálogo de Superalimentos y Materias Primas Amazónicas', margin, curY);

  curY += 5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.2);
  doc.setTextColor(71, 85, 105);
  doc.text('Cosechas seleccionadas en origen, secado controlado y presentación industrial para exportación y retail.', margin, curY);

  curY += 8;

  const products = [
    {
      title: 'SACHA INCHI (Plukenetia volubilis)',
      subtitle: 'El Maní del Inca · Máxima Concentración Natural de Omega 3, 6 y 9',
      color: emerald,
      specs: [
        { k: 'Presentaciones', v: 'Aceite extra virgen prensado en frío, semillas tostadas con/sin sal, granos crudos seleccionados.' },
        { k: 'Perfil Nutricional', v: 'Hasta 48% de Omega 3 vegetal, alto en vitamina E (tocoferoles) y proteínas de alto valor biológico.' },
        { k: 'Formatos Comerciales', v: 'Cilindros industriales 200L, contenedores IBC 1000L, sacos de 25kg y botellas retail 250ml / 500ml.' },
        { k: 'Aplicaciones', v: 'Industria farmacéutica, suplementación nutracéutica, gastronomía gourmet y cosmética orgánica.' }
      ]
    },
    {
      title: 'CACAO FINO DE AROMA (Theobroma cacao)',
      subtitle: 'Grano Criollo y Trinitario · Valles de San Martín (Tarapoto, Tocache y Juanjuí)',
      color: goldAccent,
      specs: [
        { k: 'Presentaciones', v: 'Grano fermentado y seco (grado I, fermentación 85%+), nibs de cacao tostados, pasta y manteca pura.' },
        { k: 'Perfil Sensorial', v: 'Notas florales, frutos secos, nueces y fondo suave maderoso con acidez cítrica balanceada.' },
        { k: 'Formatos Comerciales', v: 'Sacos de yute de 64kg y 50kg para exportación, cajas de 20kg con revestimiento grado alimenticio.' },
        { k: 'Certificación', v: 'Libre de cadmio bajo límites de la Unión Europea, trazabilidad de lote y secado solar bajo carpa.' }
      ]
    },
    {
      title: 'AGUAJE DESHIDRATADO (Mauritia flexuosa)',
      subtitle: 'El Fruto de la Vida Amazónico · Fitoestrógenos y Pro-Vitamina A Pura',
      color: [180, 83, 9],
      specs: [
        { k: 'Presentaciones', v: 'Pulpa deshidratada micropulverizada, harina pura 100% natural y hojuelas secas.' },
        { k: 'Propiedades', v: 'Extraordinaria concentración de betacarotenos (vitamina A), ácido oleico y fitoestrógenos naturales.' },
        { k: 'Formatos Comerciales', v: 'Bolsas trilaminadas al vacío de 5kg, cajas de 20kg y sacos industriales de 25kg.' },
        { k: 'Aplicaciones', v: 'Bebidas funcionales, cápsulas nutracéuticas, repostería vegana y cuidado capilar/dérmico.' }
      ]
    },
    {
      title: 'COCO AMAZÓNICO & DERIVADOS (Cocos nucifera)',
      subtitle: 'Pureza Tropical · Procesamiento en Seco Sin Aditivos Químicos',
      color: [13, 148, 136],
      specs: [
        { k: 'Presentaciones', v: 'Coco rallado deshidratado (corte fino y medio), aceite de coco virgen prensado en frío y harina de coco.' },
        { k: 'Características', v: 'Sin endulzantes añadidos, sin blanqueadores químicos, aroma fresco y natural, alto en ácido láurico.' },
        { k: 'Formatos Comerciales', v: 'Baldes de 18L, cilindros 200L, sacos de papel kraft multi-pliego de 25kg y 50kg.' },
        { k: 'Aplicaciones', v: 'Panificación industrial, chocolatería, cosmética natural y consumo directo.' }
      ]
    }
  ];

  const prodBoxH = 54;
  products.forEach((prod) => {
    // Card frame
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(margin, curY, contentWidth, prodBoxH, 2.5, 2.5, 'F');
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.4);
    doc.roundedRect(margin, curY, contentWidth, prodBoxH, 2.5, 2.5, 'S');

    // Left color bar
    doc.setFillColor(prod.color[0], prod.color[1], prod.color[2]);
    doc.rect(margin, curY, 3.5, prodBoxH, 'F');

    // Product Title & Subtitle
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(slateDark[0], slateDark[1], slateDark[2]);
    doc.text(prod.title, margin + 7, curY + 7);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(slateMuted[0], slateMuted[1], slateMuted[2]);
    doc.text(prod.subtitle, margin + 7, curY + 11.5);

    // Separator line
    doc.setDrawColor(241, 245, 249);
    doc.line(margin + 7, curY + 14, margin + contentWidth - 4, curY + 14);

    // Specs Grid (2x2)
    const specColW = (contentWidth - 14) / 2;
    prod.specs.forEach((sp, sIdx) => {
      const col = sIdx % 2;
      const row = Math.floor(sIdx / 2);
      const sx = margin + 7 + col * (specColW + 4);
      const sy = curY + 19 + row * 16;

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7);
      doc.setTextColor(prod.color[0], prod.color[1], prod.color[2]);
      doc.text(`• ${sp.k}:`, sx, sy);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(6.8);
      doc.setTextColor(71, 85, 105);
      const valLines = doc.splitTextToSize(sp.v, specColW - 4);
      doc.text(valLines, sx + 2, sy + 4.2);
    });

    curY += prodBoxH + 6;
  });

  // ==========================================
  // PAGE 3: SERVICIOS TECNOLÓGICOS Y CONTACTO
  // ==========================================
  doc.addPage();
  renderPageHeader(3, 'DIVISIÓN TECNOLOGÍA & SERVICIOS');

  curY = 25;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(slateDark[0], slateDark[1], slateDark[2]);
  doc.text('3. Soluciones Financieras & Gestión Contable', margin, curY);

  curY += 5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.2);
  doc.setTextColor(71, 85, 105);
  doc.text('Herramientas digitales diseñadas para agilizar cobros, liquidaciones y auditorías contables en el Perú.', margin, curY);

  curY += 8;

  // Service 1: AgriCobros
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(margin, curY, contentWidth, 68, 2.5, 2.5, 'F');
  doc.setDrawColor(emerald[0], emerald[1], emerald[2]);
  doc.setLineWidth(0.6);
  doc.roundedRect(margin, curY, contentWidth, 68, 2.5, 2.5, 'S');

  // Badge
  doc.setFillColor(emeraldLight[0], emeraldLight[1], emeraldLight[2]);
  doc.roundedRect(margin + 6, curY + 6, 46, 6, 1.5, 1.5, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.5);
  doc.setTextColor(emerald[0], emerald[1], emerald[2]);
  doc.text('PASARELA DE RECAUDACIÓN', margin + 8, curY + 10.2);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(slateDark[0], slateDark[1], slateDark[2]);
  doc.text('AgriCobros · Sistema de Cobros y Liquidaciones B2B / B2C', margin + 6, curY + 18);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.8);
  doc.setTextColor(71, 85, 105);
  const cgDesc = 
    'Plataforma transaccional corporativa desarrollada para optimizar la cadena de pagos entre proveedores, distribuidores y clientes. Integra billeteras móviles (Yape, Plin), transferencias interbancarias y pagos con tarjeta de crédito/débito con liquidación inmediata.';
  const cgLines = doc.splitTextToSize(cgDesc, contentWidth - 12);
  doc.text(cgLines, margin + 6, curY + 24);

  // Features list
  const cgFeatures = [
    'Conciliación bancaria en tiempo real con descarga automática de reportes Excel y CSV.',
    'Generación masiva de links de pago y códigos QR dinámicos para fuerza de ventas.',
    'Comisión transparente desde 1.5% sin costos ocultos de mantenimiento ni afiliación.',
    'Seguridad de nivel bancario con cifrado TLS 1.3 y prevención de fraude en transacciones.'
  ];

  cgFeatures.forEach((feat, idx) => {
    const fy = curY + 39 + idx * 6.5;
    doc.setFillColor(emerald[0], emerald[1], emerald[2]);
    doc.circle(margin + 8, fy - 1.2, 1, 'F');
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.2);
    doc.setTextColor(51, 65, 85);
    doc.text(feat, margin + 12, fy);
  });

  curY += 76;

  // Service 2: Gestor Contable Formato 5.2
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(margin, curY, contentWidth, 68, 2.5, 2.5, 'F');
  doc.setDrawColor(pinkAccent[0], pinkAccent[1], pinkAccent[2]);
  doc.setLineWidth(0.6);
  doc.roundedRect(margin, curY, contentWidth, 68, 2.5, 2.5, 'S');

  // Badge
  doc.setFillColor(253, 242, 248);
  doc.roundedRect(margin + 6, curY + 6, 48, 6, 1.5, 1.5, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.5);
  doc.setTextColor(pinkAccent[0], pinkAccent[1], pinkAccent[2]);
  doc.text('SOFTWARE SUNAT HOMOLOGADO', margin + 8, curY + 10.2);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(slateDark[0], slateDark[1], slateDark[2]);
  doc.text('Gestor Contable Formato 5.2 · Libro Diario Simplificado', margin + 6, curY + 18);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.8);
  doc.setTextColor(71, 85, 105);
  const gcDesc = 
    'Herramienta tecnológica concebida para estudios contables, cooperativas agrarias y empresas del Régimen MYPE Tributario. Automatiza la generación del Libro Diario de Formato Simplificado (5.2) con validación nativa de comprobantes de pago electrónicos y exportación PLE.';
  const gcLines = doc.splitTextToSize(gcDesc, contentWidth - 12);
  doc.text(gcLines, margin + 6, curY + 24);

  const gcFeatures = [
    'Estructura de catálogo de cuentas conforme al Plan Contable General Empresarial (PCGE).',
    'Importación automatizada de archivos XML y reportes de compras y ventas de SUNAT.',
    'Generador de libros electrónicos PLE validados sin errores de casillas o fórmulas.',
    'Control de asientos de cierre y apertura anual con soporte multiempresa en un clic.'
  ];

  gcFeatures.forEach((feat, idx) => {
    const fy = curY + 39 + idx * 6.5;
    doc.setFillColor(pinkAccent[0], pinkAccent[1], pinkAccent[2]);
    doc.circle(margin + 8, fy - 1.2, 1, 'F');
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.2);
    doc.setTextColor(51, 65, 85);
    doc.text(feat, margin + 12, fy);
  });

  curY += 76;

  // Contact and Quotation Section Box
  doc.setFillColor(darkGreen[0], darkGreen[1], darkGreen[2]);
  doc.roundedRect(margin, curY, contentWidth, 44, 2.5, 2.5, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(255, 255, 255);
  doc.text('INFORMACIÓN DE CONTACTO & SOLICITUD DE COTIZACIONES', margin + 8, curY + 7.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(209, 250, 229);
  doc.text('Para pedidos a granel, fichas técnicas específicas o contratación de servicios, contáctenos directamente:', margin + 8, curY + 12.5);

  // Contact items (3 rows x 2 cols)
  const cColW = (contentWidth - 16) / 2;

  // Row 1: RUC & Sede Central
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.3);
  doc.setTextColor(167, 243, 208);
  doc.text('RUC Oficial:', margin + 8, curY + 19);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(255, 255, 255);
  doc.text(ruc, margin + 28, curY + 19);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(167, 243, 208);
  doc.text('Sede Central:', margin + 8 + cColW, curY + 19);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(255, 255, 255);
  doc.text(location, margin + 28 + cColW, curY + 19);

  // Row 2: Correo & Teléfono
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(167, 243, 208);
  doc.text('Correo:', margin + 8, curY + 27);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(255, 255, 255);
  doc.text(email, margin + 28, curY + 27);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(167, 243, 208);
  doc.text('Teléfono:', margin + 8 + cColW, curY + 27);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(255, 255, 255);
  doc.text(phone, margin + 28 + cColW, curY + 27);

  // Row 3: Web & Atención
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(167, 243, 208);
  doc.text('Sitio Web:', margin + 8, curY + 35);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(255, 255, 255);
  doc.text(website, margin + 28, curY + 35);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(167, 243, 208);
  doc.text('Atención:', margin + 8 + cColW, curY + 35);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(255, 255, 255);
  doc.text('Lunes a Viernes 08:00 - 18:00', margin + 28 + cColW, curY + 35);

  // Save the document
  doc.save('Brochure-Corporativo-AGRICARL-PERU.pdf');
};
