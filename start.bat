@echo off
setlocal
cd /d "%~dp0"
start "IoT Backend" /D "%~dp0back_end" cmd /k "npm start"
start "IoT AI Service" /D "%~dp0back_end" cmd /k "py ai_service.py"
start "IoT Frontend" /D "%~dp0front_end" cmd /k "npm run dev"
echo Services demarres. Pour flasher un ESP32, lancer flash_esp32.bat separement.
