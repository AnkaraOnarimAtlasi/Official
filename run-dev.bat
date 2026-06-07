@echo off
setlocal enabledelayedexpansion
title Ankara Onarım Atlası - Dev Server

echo ===================================================
echo   Ankara Onarım Atlası - Geliştirme Sunucusu
echo ===================================================
echo.

:: Dosyanın bulunduğu klasöre git
cd /d "%~dp0"

:: Başlangıç portu
set START_PORT=3000
set TARGET_PORT=%START_PORT%

:check_port
echo Port %TARGET_PORT% kontrol ediliyor...
netstat -ano | findstr /R /C:":%TARGET_PORT% " >nul
if !errorlevel! equ 0 (
    echo [MEŞGUL] Port %TARGET_PORT% kullanımda. Sonraki port denenecek...
    set /a TARGET_PORT+=1
    goto check_port
)

echo [MÜSAİT] Port %TARGET_PORT% boş.
echo.
echo Sunucu http://localhost:%TARGET_PORT% adresinde baslatiliyor...
echo.

:: Arka planda tarayıcıyı 2 saniye gecikmeyle aç (sunucunun ayağa kalkması için zaman tanır)
start /b cmd /c "timeout /t 2 >nul && start http://localhost:%TARGET_PORT%"

:: Next.js geliştirme sunucusunu belirlenen port ile başlat
call npx next dev -p %TARGET_PORT%

pause
