@ECHO OFF
call ncu -u
RD /S /Q "node_modules"
RD /S /Q ".astro"
RD /S /Q "dist"
RD /S /Q "demo"
DEL "yarn.lock"
call yarn

yarn dev