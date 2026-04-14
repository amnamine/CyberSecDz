@echo off
setlocal

cd /d "%~dp0"

echo [1/4] Stopping old Next.js / backend processes on ports 3000, 3001, 4000...
for %%P in (3000 3001 4000) do (
  for /f "tokens=5" %%A in ('netstat -ano ^| findstr :%%P ^| findstr LISTENING') do (
    taskkill /PID %%A /F >nul 2>&1
  )
)

echo [2/4] Removing stale Next.js lock file...
if exist ".next\dev\lock" del /f /q ".next\dev\lock" >nul 2>&1

echo [3/4] Starting project (frontend + express backend)...
call npm run dev

echo [4/4] Process ended.
endlocal
