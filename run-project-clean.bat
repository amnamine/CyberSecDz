@echo off
setlocal

cd /d "%~dp0"

echo [1/5] Stopping old Next.js / backend processes on ports 3000, 3001, 4000...
for %%P in (3000 3001 4000) do (
  for /f "tokens=5" %%A in ('netstat -ano ^| findstr :%%P ^| findstr LISTENING') do (
    taskkill /PID %%A /F >nul 2>&1
  )
)

echo [2/5] Removing stale Next.js lock file...
if exist ".next\dev\lock" del /f /q ".next\dev\lock" >nul 2>&1

echo [3/5] Removing Next.js dev cache...
if exist ".next\dev\cache" rmdir /s /q ".next\dev\cache"

echo [4/5] Starting project (frontend + express backend)...
call npm run dev

echo [5/5] Process ended.
endlocal
