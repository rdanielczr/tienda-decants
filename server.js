// SERVIDOR - TIENDA DE DECANTS
// Para estudiante de Ingeniería en Sistemas
// Versión simplificada pero segura

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3001;

// Configuración
const JWT_SECRET = 'tu-clave-super-secreta-cambiar-en-produccion';

// ============================================================
// MIDDLEWARE DE SEGURIDAD
// ============================================================

app.use(helmet()); // Headers de seguridad
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());

// Rate limiting en login
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: 'Demasiados intentos. Intenta en 15 minutos.'
});

// ============================================================
// BASE DE DATOS MOCK (en memoria)
// ============================================================

let csrfTokens = {};

// ============================================================
// RUTAS
// ============================================================

// 1. Obtener token CSRF
app.get('/api/csrf-token', (req, res) => {
  const token = crypto.randomBytes(32).toString('hex');
  csrfTokens[token] = Date.now();
  res.json({ token });
});

// 2. Login
app.post('/api/auth/login', loginLimiter, (req, res) => {
  try {
    const { email, password } = req.body;
    const csrfToken = req.headers['x-csrf-token'];

    // Verificar CSRF token
    if (!csrfToken || !csrfTokens[csrfToken]) {
      return res.status(403).json({ error: 'Token CSRF inválido' });
    }
    delete csrfTokens[csrfToken];

    // Validar entrada
    if (!email || !password) {
      return res.status(400).json({ error: 'Email y contraseña requeridos' });
    }

    // Para demo: cualquier email/password funciona
    // En producción: verificar contra BD con bcrypt

    // Generar JWT
    const token = jwt.sign(
      { email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Guardar en cookie segura
    res.cookie('auth_token', token, {
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.json({ 
      success: true, 
      message: 'Sesión iniciada',
      email 
    });

  } catch (err) {
    console.error('Error en login:', err);
    res.status(500).json({ error: 'Error en servidor' });
  }
});

// 3. Logout
app.post('/api/auth/logout', (req, res) => {
  res.clearCookie('auth_token');
  res.json({ success: true });
});

// 4. Checkout (crear orden)
app.post('/api/orders/checkout', (req, res) => {
  try {
    const { items, total } = req.body;
    const csrfToken = req.headers['x-csrf-token'];

    // Verificar CSRF
    if (!csrfToken || !csrfTokens[csrfToken]) {
      return res.status(403).json({ error: 'Token CSRF inválido' });
    }
    delete csrfTokens[csrfToken];

    // Validar
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Items inválidos' });
    }

    // Generar ID de orden
    const orderId = Math.floor(Math.random() * 1000000);

    res.json({
      success: true,
      orderId,
      message: 'Orden creada exitosamente'
    });

  } catch (err) {
    console.error('Error en checkout:', err);
    res.status(500).json({ error: 'Error en servidor' });
  }
});

// ============================================================
// INICIAR SERVIDOR
// ============================================================

app.listen(PORT, () => {
  console.log('');
  console.log('╔═══════════════════════════════════════╗');
  console.log('║   SERVIDOR INICIADO                   ║');
  console.log('╚═══════════════════════════════════════╝');
  console.log('');
  console.log('✓ http://localhost:' + PORT);
  console.log('');
  console.log('Para usar: abre http://localhost:3000 en el navegador');
  console.log('');
});
