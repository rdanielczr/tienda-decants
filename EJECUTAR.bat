@echo off
REM Script para instalar y ejecutar la tienda de decants en Windows 11

cls
echo.
echo ╔═══════════════════════════════════════════════════════╗
echo ║         TIENDA DE DECANTS - Setup Windows            ║
echo ╚═══════════════════════════════════════════════════════╝
echo.

REM Verificar si Node.js está instalado
node --version >nul 2>&1
if errorlevel 1 (
    echo ✗ Node.js no está instalado
    echo.
    echo Descargalo en: https://nodejs.org
    echo Luego ejecuta este script nuevamente
    echo.
    pause
    exit /b 1
)

echo ✓ Node.js está instalado
node --version
echo.

REM Instalar dependencias
echo Instalando dependencias...
call npm install

if errorlevel 1 (
    echo ✗ Error instalando dependencias
    pause
    exit /b 1
)

echo ✓ Dependencias instaladas
echo.

REM Limpiar pantalla
cls

REM Mostrar instrucciones
echo.
echo ╔═══════════════════════════════════════════════════════╗
echo ║           SERVIDOR INICIADO                          ║
echo ╚═══════════════════════════════════════════════════════╝
echo.
echo ✓ Servidor escuchando en http://localhost:3001
echo.
echo AHORA:
echo   1. Abre Firefox o Chrome
echo   2. Ve a: http://localhost:3000/index.html
echo   3. ¡Prueba la tienda!
echo.
echo Para parar el servidor: presiona Ctrl + C
echo.

REM Ejecutar servidor
node server.js
