@ECHO OFF
call ncu -u
RD /S /Q "..\node_modules"
RD /S /Q "..\.astro"
RD /S /Q "..\dist"
DEL "..\*.d.ts"
DEL "..\yarn.lock"
@REM DEL *.d.ts
call yarn

yarn dev