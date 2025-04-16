﻿@ECHO OFF
chcp 65001 > nul
cls

echo WARNING: This will delete packages and caches!
echo Are you sure you want to continue?
choice /c yn /m "Continue? (Y/N)"
if errorlevel 2 (
  echo Canceled.
  exit /b 1
)

call ncu -u
RD /S /Q "node_modules"
RD /S /Q ".astro"
RD /S /Q "dist"
RD /S /Q "demo"
DEL "yarn.lock"
DEL "pnpm-lock.yaml"
call pnpm install

call npm run dev