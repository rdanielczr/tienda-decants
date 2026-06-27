# Tienda de Decants - Proyecto Universitario

Tienda de ecommerce para vender perfumes en pequeñas cantidades (2ml, 5ml, 10ml).

## 📋 Archivos del Proyecto

```
tienda-decants/
├── index.html          # Página web (frontend)
├── server.js           # Servidor (backend)
├── package.json        # Dependencias
└── .gitignore          # Archivos a ignorar en Git
```

## 🚀 Instalación (Windows 11)

### 1. Clonar repositorio

Abre PowerShell y escribe:

```powershell
cd Documentos
git clone https://github.com/tu-usuario/tienda-decants.git
cd tienda-decants
```

### 2. Instalar dependencias

```powershell
npm install
```

Espera a que termine (toma 1-2 minutos).

### 3. Abrir en Visual Code

```powershell
code .
```

### 4. Ejecutar servidor

En PowerShell dentro de Visual Code:

```powershell
npm start
```

Deberías ver:
```
╔═══════════════════════════════════════╗
║   SERVIDOR INICIADO                   ║
╚═══════════════════════════════════════╝

✓ http://localhost:3001
```

### 5. Abrir página en navegador

Abre Firefox o Chrome y ve a:

```
http://localhost:3000/index.html
```

¡Listo! 🎉

## 📝 Cómo usar

1. **Selecciona tamaño** de perfume (2ml, 5ml, 10ml)
2. **Haz clic en "+ Agregar"** para agregar al carrito
3. **Abre el carrito** desde la esquina superior derecha
4. **Haz clic en "Iniciar sesión"** (cualquier email/contraseña funciona)
5. **Haz clic en "Proceder al pago"**

## 📂 Estructura del Código

### index.html
- Página web completa
- CSS integrado (estilos)
- JavaScript integrado (lógica)
- Conecta con el servidor en `http://localhost:3001`

### server.js
- Servidor con Express (Node.js)
- Rutas de autenticación y checkout
- Protección de seguridad (CSRF, rate limiting)

### package.json
- Lista de dependencias que necesita Node.js
- Scripts para ejecutar el servidor

## 🔐 Seguridad Incluida

- ✓ CSRF tokens (previene ataques cross-site)
- ✓ Rate limiting (máx 5 intentos de login)
- ✓ Cookies seguras (httpOnly)
- ✓ Headers de seguridad HTTP

## 🌐 Para Producción (más adelante)

Si quieres subir a internet:

1. Cambiar `JWT_SECRET` en `server.js`
2. Usar HTTPS en lugar de HTTP
3. Usar PostgreSQL en lugar de memoria
4. Subir a Heroku, AWS, etc.

## 📚 Documentos Completos

- `SEGURIDAD.md` - Análisis exhaustivo de ciberseguridad
- `README.md` - Documentación completa
- `pruebas_seguridad.sh` - Script para verificar defensas

## 💡 Notas

- El servidor escucha en `http://localhost:3001`
- La página espera el servidor en ese puerto
- Si cierras PowerShell, el servidor se detiene
- Para parar: presiona `Ctrl + C` en PowerShell

## ❓ Problemas Comunes

**"npm command not found"**
- Node.js no está instalado. Ve a nodejs.org y descarga.

**"Cannot find module"**
- Ejecuta `npm install` nuevamente.

**"Port 3001 already in use"**
- Otro programa usa ese puerto. Cambia PORT en server.js o reinicia.

**"Cannot GET /index.html"**
- No estás en la carpeta del proyecto. Verifica `cd tienda-decants`.

## 👨‍💻 Desarrollador

Estudiante de Ingeniería en Sistemas Computacionales

## 📄 Licencia

MIT
