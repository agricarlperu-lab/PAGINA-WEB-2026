# AGRICARL PERÚ S.A.C. — Plataforma Web Corporativa

Sitio web corporativo y catálogo agroindustrial de **AGRICARL PERÚ S.A.C.** (RUC: 20611291001), empresa de la región San Martín, Amazonía del Perú, orientada al desarrollo agroindustrial de superalimentos (Sacha Inchi, Cacao Fino de Aroma, Aguaje Deshidratado, Derivados de Coco) y soluciones tecnológicas de recaudación.

---

## 🚀 Requisitos Previos

- **Node.js**: Versión 18 o superior instalada.
- **npm** o **pnpm** / **yarn**.

---

## 📦 Instalación y Puesta en Marcha

1. **Clonar el repositorio desde GitHub:**
   ```bash
   git clone https://github.com/TU-USUARIO/agricarl-peru.git
   cd agricarl-peru
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Iniciar en modo desarrollo:**
   ```bash
   npm run dev
   ```
   La aplicación estará disponible inmediatamente en `http://localhost:3000`.

---

## 🛠️ Scripts Disponibles

- `npm run dev`: Inicia el servidor de desarrollo (Express + Vite con TypeScript en caliente).
- `npm run build`: Compila el frontend optimizado en `dist/` y el servidor en `dist/server.cjs`.
- `npm start`: Inicia el servidor de producción compilado (`node dist/server.cjs`).
- `npm run lint`: Valida tipos y sintaxis TypeScript con `tsc --noEmit`.

---

## 🌐 Opciones de Despliegue desde GitHub

Al subir este proyecto a GitHub, puedes desplegarlo automáticamente en cualquiera de estas plataformas:

1. **Render / Railway / Fly.io / Google Cloud Run** *(Recomendado para Full-Stack)*:
   - Conecta tu repositorio de GitHub.
   - Comando de Build: `npm run build`
   - Comando de Start: `npm start`

2. **Vercel / Netlify**:
   - Conecta tu repositorio de GitHub.
   - Detectará automáticamente Vite y React.
   - Build Command: `vite build`
   - Output Directory: `dist`

3. **GitHub Pages** *(Para modo estático)*:
   - Puedes usar una GitHub Action para compilar con `npm run build` y publicar la carpeta `dist/`.

---

## 📄 Licencia y Derechos

© 2026 AGRICARL PERÚ S.A.C. Todos los derechos reservados.
