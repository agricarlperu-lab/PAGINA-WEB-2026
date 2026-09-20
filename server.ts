import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  createdAt: string;
  deliveryStatus: 'sent_resend' | 'sent_sendgrid' | 'sent_smtp' | 'received_server_inbox' | 'failed';
  errorDetails?: string;
}

const serverInbox: ContactInquiry[] = [];
const OFFICIAL_EMAIL = process.env.OFFICIAL_CONTACT_EMAIL || 'operaciones@agricarlperu.com';

function saveBase64Image(dataUrl: string, keyPrefix: string): string | null {
  try {
    const match = dataUrl.match(/^data:image\/([a-zA-Z0-9+.-]+);base64,(.+)$/);
    if (!match) return null;
    
    let ext = match[1].toLowerCase();
    if (ext === 'jpeg') ext = 'jpg';
    if (ext.includes('svg')) ext = 'svg';
    if (ext === 'x-icon') ext = 'ico';

    const base64Data = match[2];
    const safePrefix = keyPrefix.replace(/[^a-zA-Z0-9_-]/g, '_');
    const filename = `${safePrefix}-${Date.now()}.${ext}`;
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');

    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const filepath = path.join(uploadsDir, filename);
    fs.writeFileSync(filepath, Buffer.from(base64Data, 'base64'));
    return `./uploads/${filename}`;
  } catch (err) {
    console.error('Error guardando imagen en disco:', err);
    return null;
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ extended: true, limit: '50mb' }));

  // Media persistence endpoints - Ensures uploaded images exist as real files for GitHub & ZIP download
  app.get('/api/media', (_req, res) => {
    try {
      const publicPath = path.join(process.cwd(), 'public', 'saved-media.json');
      const srcPath = path.join(process.cwd(), 'src', 'data', 'savedMedia.json');
      const targetPath = fs.existsSync(publicPath) ? publicPath : fs.existsSync(srcPath) ? srcPath : null;

      if (targetPath) {
        const raw = fs.readFileSync(targetPath, 'utf-8');
        return res.json(JSON.parse(raw));
      }
      return res.json({ images: {}, backgrounds: {}, fits: {} });
    } catch (err) {
      console.error('Error leyendo media:', err);
      return res.json({ images: {}, backgrounds: {}, fits: {} });
    }
  });

  app.post('/api/media/save', (req, res) => {
    try {
      const { images = {}, backgrounds = {}, fits = {} } = req.body;
      const updatedImages: Record<string, string> = { ...images };
      const updatedBackgrounds: Record<string, any> = { ...backgrounds };

      // Convert any base64 images into physical files inside public/uploads/
      for (const [key, src] of Object.entries(updatedImages)) {
        if (typeof src === 'string' && src.startsWith('data:image/')) {
          const filePath = saveBase64Image(src, key);
          if (filePath) {
            updatedImages[key] = filePath;
          }
        }
      }

      for (const [key, bgConfig] of Object.entries(updatedBackgrounds)) {
        if (bgConfig && typeof bgConfig.image === 'string' && bgConfig.image.startsWith('data:image/')) {
          const filePath = saveBase64Image(bgConfig.image, `bg_${key}`);
          if (filePath) {
            updatedBackgrounds[key] = { ...bgConfig, image: filePath };
          }
        }
      }

      const payload = {
        images: updatedImages,
        backgrounds: updatedBackgrounds,
        fits,
        lastSaved: new Date().toISOString()
      };

      const publicPath = path.join(process.cwd(), 'public', 'saved-media.json');
      const srcPath = path.join(process.cwd(), 'src', 'data', 'savedMedia.json');

      fs.writeFileSync(publicPath, JSON.stringify(payload, null, 2), 'utf-8');
      fs.writeFileSync(srcPath, JSON.stringify(payload, null, 2), 'utf-8');

      console.log(`[Media Sync] Guardado exitoso: ${Object.keys(updatedImages).length} imágenes persistidas en disco.`);

      return res.json({
        success: true,
        message: '¡Imágenes y fondos guardados permanentemente en los archivos del proyecto!',
        images: updatedImages,
        backgrounds: updatedBackgrounds,
        fits
      });
    } catch (err: any) {
      console.error('Error guardando media en disco:', err);
      return res.status(500).json({ success: false, error: err?.message || 'Error al guardar archivos en disco' });
    }
  });

  // Health check endpoint
  app.get('/api/health', (_req, res) => {
    res.json({ 
      status: 'ok', 
      company: 'AGRICARL PERÚ S.A.C.', 
      ruc: '20611291001',
      officialEmail: OFFICIAL_EMAIL,
      timestamp: new Date().toISOString()
    });
  });

  // Diagnostic status endpoint to check which email provider is active
  app.get('/api/contact/status', (_req, res) => {
    let provider = 'server_inbox';
    if (process.env.RESEND_API_KEY) {
      provider = 'resend';
    } else if (process.env.SENDGRID_API_KEY) {
      provider = 'sendgrid';
    } else if (process.env.SMTP_HOST && process.env.SMTP_USER) {
      provider = 'smtp';
    }

    res.json({
      targetEmail: OFFICIAL_EMAIL,
      provider,
      configured: provider !== 'server_inbox',
      totalReceived: serverInbox.length,
      supportedProviders: ['resend', 'sendgrid', 'smtp', 'server_inbox']
    });
  });

  // Inbox inspection endpoint (view leads registered in server)
  app.get('/api/contact/messages', (_req, res) => {
    res.json({
      targetEmail: OFFICIAL_EMAIL,
      count: serverInbox.length,
      messages: serverInbox.slice(0, 50)
    });
  });

  // Direct Contact Dispatch Endpoint
  app.post('/api/contact', async (req, res) => {
    try {
      const { name, email, phone, subject, message } = req.body;

      if (!name || !email || !message) {
        return res.status(400).json({
          success: false,
          error: 'Campos requeridos faltantes: nombre, correo y mensaje son obligatorios.'
        });
      }

      const inquiryId = `INQ-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
      const timestamp = new Date().toLocaleString('es-PE', { timeZone: 'America/Lima' });

      // Build structured HTML email
      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: 'Segoe UI', Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #1e293b; }
            .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
            .header { background: linear-gradient(135deg, #064e3b 0%, #047857 100%); padding: 28px 24px; text-align: center; color: #ffffff; }
            .badge { display: inline-block; background: rgba(255,255,255,0.15); padding: 4px 12px; border-radius: 9999px; font-size: 11px; font-family: monospace; letter-spacing: 1px; margin-bottom: 8px; }
            .title { margin: 0; font-size: 22px; font-weight: 800; letter-spacing: 0.5px; }
            .subtitle { margin: 6px 0 0; font-size: 13px; color: #a7f3d0; }
            .body { padding: 32px 28px; }
            .field-group { margin-bottom: 16px; border-bottom: 1px solid #f1f5f9; padding-bottom: 12px; }
            .field-label { font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; }
            .field-value { font-size: 15px; color: #0f172a; font-weight: 500; }
            .message-box { background: #f0fdf4; border-left: 4px solid #10b981; border-radius: 8px; padding: 18px; margin-top: 24px; }
            .footer { background: #f8fafc; padding: 20px 24px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <span class="badge">CONSULTA WEB DIRECTA</span>
              <h1 class="title">AGRICARL PERÚ S.A.C.</h1>
              <p class="subtitle">RUC: 20611291001 · Portal Oficial www.agricarlperu.com</p>
            </div>
            <div class="body">
              <h2 style="font-size: 16px; color: #047857; margin-top: 0; margin-bottom: 20px;">Nueva Consulta Recibida</h2>
              
              <div class="field-group">
                <div class="field-label">Remitente:</div>
                <div class="field-value">${name}</div>
              </div>

              <div class="field-group">
                <div class="field-label">Correo Electrónico:</div>
                <div class="field-value"><a href="mailto:${email}" style="color: #047857; text-decoration: none; font-weight: 600;">${email}</a></div>
              </div>

              <div class="field-group">
                <div class="field-label">Teléfono / WhatsApp:</div>
                <div class="field-value">${phone || 'No especificado'}</div>
              </div>

              <div class="field-group">
                <div class="field-label">Asunto:</div>
                <div class="field-value">${subject || 'Consulta General / Comercial'}</div>
              </div>

              <div class="field-group">
                <div class="field-label">Fecha y Hora de Recepción:</div>
                <div class="field-value" style="font-family: monospace; font-size: 13px;">${timestamp} (PET)</div>
              </div>

              <div class="message-box">
                <div class="field-label" style="color: #047857;">Mensaje del Cliente:</div>
                <div style="font-size: 14px; line-height: 1.6; color: #1e293b; white-space: pre-wrap; margin-top: 6px;">${message}</div>
              </div>
            </div>
            <div class="footer">
              <p style="margin: 0 0 4px;">Este correo fue generado automáticamente para la bandeja de operaciones.</p>
              <p style="margin: 0; font-family: monospace; color: #047857;">Destino: ${OFFICIAL_EMAIL}</p>
            </div>
          </div>
        </body>
        </html>
      `;

      const textContent = `
NUEVA CONSULTA DESDE EL PORTAL AGRICARL PERÚ S.A.C.
------------------------------------------------------------
Remitente: ${name}
Correo: ${email}
Teléfono / WhatsApp: ${phone || 'No especificado'}
Asunto: ${subject || 'Consulta Comercial'}
Fecha: ${timestamp}
ID: ${inquiryId}

MENSAJE:
------------------------------------------------------------
${message}
------------------------------------------------------------
Destinatario: ${OFFICIAL_EMAIL}
RUC: 20611291001
      `.trim();

      // OPTION 1: Resend API (https://resend.com)
      if (process.env.RESEND_API_KEY) {
        const fromEmail = process.env.RESEND_FROM_EMAIL || 'AGRICARL Web <onboarding@resend.dev>';
        const resendResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            from: fromEmail,
            to: [OFFICIAL_EMAIL],
            reply_to: email,
            subject: `[Consulta Web] ${subject || 'Nuevo Mensaje'} - ${name}`,
            html: htmlContent,
            text: textContent
          })
        });

        const resendData = await resendResponse.json();

        if (resendResponse.ok) {
          const inquiry: ContactInquiry = {
            id: inquiryId,
            name,
            email,
            phone,
            subject,
            message,
            createdAt: timestamp,
            deliveryStatus: 'sent_resend'
          };
          serverInbox.unshift(inquiry);

          return res.json({
            success: true,
            delivery: 'resend',
            message: `¡Correo enviado directamente a ${OFFICIAL_EMAIL} exitosamente!`,
            id: resendData.id,
            targetEmail: OFFICIAL_EMAIL
          });
        } else {
          console.error('Error enviando con Resend:', resendData);
        }
      }

      // OPTION 2: SendGrid API
      if (process.env.SENDGRID_API_KEY) {
        const fromEmail = process.env.SENDGRID_FROM_EMAIL || OFFICIAL_EMAIL;
        const sendgridResponse = await fetch('https://api.sendgrid.com/v3/mail/send', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.SENDGRID_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            personalizations: [{
              to: [{ email: OFFICIAL_EMAIL }],
              subject: `[Consulta Web] ${subject || 'Nuevo Mensaje'} - ${name}`
            }],
            from: { email: fromEmail, name: 'Portal AGRICARL' },
            reply_to: { email: email, name: name },
            content: [
              { type: 'text/plain', value: textContent },
              { type: 'text/html', value: htmlContent }
            ]
          })
        });

        if (sendgridResponse.ok) {
          const inquiry: ContactInquiry = {
            id: inquiryId,
            name,
            email,
            phone,
            subject,
            message,
            createdAt: timestamp,
            deliveryStatus: 'sent_sendgrid'
          };
          serverInbox.unshift(inquiry);

          return res.json({
            success: true,
            delivery: 'sendgrid',
            message: `¡Correo enviado directamente a ${OFFICIAL_EMAIL} vía SendGrid!`,
            targetEmail: OFFICIAL_EMAIL
          });
        }
      }

      // OPTION 3: SMTP (Direct mail server / Gmail / cPanel)
      if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
        const port = parseInt(process.env.SMTP_PORT || '587', 10);
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port,
          secure: port === 465,
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
          }
        });

        const fromAddress = process.env.SMTP_FROM || process.env.SMTP_USER;
        await transporter.sendMail({
          from: `"AGRICARL Portal Web" <${fromAddress}>`,
          to: OFFICIAL_EMAIL,
          replyTo: email,
          subject: `[Consulta Web] ${subject || 'Nuevo Mensaje'} - ${name}`,
          text: textContent,
          html: htmlContent
        });

        const inquiry: ContactInquiry = {
          id: inquiryId,
          name,
          email,
          phone,
          subject,
          message,
          createdAt: timestamp,
          deliveryStatus: 'sent_smtp'
        };
        serverInbox.unshift(inquiry);

        return res.json({
          success: true,
          delivery: 'smtp',
          message: `¡Correo despachado directamente a ${OFFICIAL_EMAIL} vía servidor SMTP!`,
          targetEmail: OFFICIAL_EMAIL
        });
      }

      // OPTION 4: Server Inbox (Safe queue when API key hasn't been set yet)
      const inquiry: ContactInquiry = {
        id: inquiryId,
        name,
        email,
        phone,
        subject,
        message,
        createdAt: timestamp,
        deliveryStatus: 'received_server_inbox'
      };
      serverInbox.unshift(inquiry);

      return res.json({
        success: true,
        delivery: 'server_inbox',
        message: `Su mensaje ha sido registrado exitosamente en el servidor corporativo para ${OFFICIAL_EMAIL}.`,
        targetEmail: OFFICIAL_EMAIL,
        note: 'Para despacho automático a su bandeja externa, configure RESEND_API_KEY o credenciales SMTP en los Ajustes del proyecto.',
        inquiryId
      });

    } catch (error: any) {
      console.error('Error al procesar el mensaje de contacto:', error);
      return res.status(500).json({
        success: false,
        error: 'Ocurrió un inconveniente al despachar su mensaje.',
        details: error?.message || 'Error interno'
      });
    }
  });

  // Vite middleware for development vs static build serving for production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server AGRICARL PERU S.A.C. running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
