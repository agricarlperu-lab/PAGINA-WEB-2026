# AGRICARL PERÚ S.A.C. — Plataforma Web Corporativa

Sitio web corporativo y catálogo agroindustrial de **AGRICARL PERÚ S.A.C.** (RUC: 20611291001), empresa de la región San Martín, Amazonía del Perú, orientada al desarrollo agroindustrial de superalimentos (Sacha Inchi, Cacao Fino de Aroma, Aguaje Deshidratado, Derivados de Coco) y soluciones tecnológicas de recaudación AgriCobros.

---

## ⚠️ ¿Por qué salía la pantalla en blanco al publicar y cómo se solucionó?

Existen **dos motivos principales** por los que un proyecto React + Vite muestra una página en blanco al publicarse en GitHub:

1. **Rutas de archivos (Assets con ruta absoluta `/` en vez de relativa `./`)**:
   - *Solución implementada:* Se configuró `base: './'` en `vite.config.ts`. Con esto, los archivos CSS y JS cargan perfectamente sin importar si el sitio está en un subdirectorio como `https://tu-usuario.github.io/tu-repo/` o en un dominio raíz.
2. **Subir archivos fuente sin compilar (`/src/main.tsx`)**:
   - Los navegadores no pueden ejecutar archivos `.tsx` de TypeScript directamente.
   - En GitHub Pages o cualquier hosting web, **se debe servir la carpeta `dist/`** generada por `npm run build`, nunca el archivo `index.html` sin compilar.

---

## 🚀 Cómo publicar en GitHub Pages (Automático con GitHub Actions)

Se ha incluido un flujo de trabajo automático en `.github/workflows/deploy.yml`.

Para activarlo en tu repositorio de GitHub:
1. Ve a tu repositorio en GitHub.
2. Haz clic en **Settings** (Configuración) > **Pages** (en el menú lateral izquierdo).
3. En **Build and deployment** > **Source**, selecciona: **GitHub Actions**.
4. ¡Listo! Cada vez que hagas un push a `main` o `master`, GitHub compilará el proyecto y lo publicará automáticamente funcionando al 100%.

---

## 🌐 Publicar en Vercel, Netlify o Render (Alternativas en 1 clic)

- **Vercel** o **Netlify**:
  - Conecta tu repositorio de GitHub.
  - Build Command: `npm run build`
  - Output Directory: `dist`
  - *(Ya se incluyó el archivo `vercel.json` para que las rutas funcionen sin errores 404)*.

- **Render / Railway** (Para desplegar con el servidor Express incluido):
  - Build Command: `npm run build`
  - Start Command: `npm start`

---

## 📦 Ejecución Local

1. **Clonar e instalar:**
   ```bash
   git clone <URL_DE_TU_REPOSITORIO>
   cd <CARPETA>
   npm install
   ```

2. **Iniciar en desarrollo:**
   ```bash
   npm run dev
   ```
   Abrir en el navegador: `http://localhost:3000`.

3. **Compilar para producción:**
   ```bash
   npm run build
   ```

---

## 🖼️ Manejo de Imágenes y Descarga del Proyecto (ZIP / GitHub)

### ¿Por qué antes no se descargaban las fotos subidas?
Las fotos subidas directamente desde la interfaz web se almacenaban en la memoria local del navegador (**IndexedDB**). Al descargar el código fuente en archivo ZIP o exportarlo a GitHub, el sistema descargaba únicamente los archivos del disco del proyecto, sin incluir la base de datos interna de tu navegador.

### ✅ Solución implementada:
1. **Guardado físico automático en disco (`public/uploads/`)**:
   - Ahora, al subir imágenes o hacer clic en **«Guardar en Archivos del Proyecto»** dentro del panel **Personalizar / Gestor de Medios**, el servidor convierte las fotos automáticamente en archivos físicos reales dentro de la carpeta `public/uploads/` y genera el registro en `public/saved-media.json` y `src/data/savedMedia.json`.
   - Cuando descargas el archivo **ZIP** o sincronizas con **GitHub**, la carpeta `public/uploads/` y todas tus imágenes estarán **incluidas en la descarga**.
2. **Botón «Respaldar (.json)» y «Restaurar (.json)»**:
   - En el panel de **Gestor de Medios**, cuentas con una opción para descargar un archivo de respaldo `.json` con todas tus fotos personalizadas.
   - Si descargas el proyecto en otra computadora o borras el historial de navegación, simplemente haces clic en **«Restaurar (.json)»** y todas tus imágenes volverán a cargarse de inmediato.

