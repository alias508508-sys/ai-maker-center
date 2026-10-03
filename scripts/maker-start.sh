#!/bin/sh
set -eu
cd "$(dirname "$0")/.."
mkdir -p .data/logs
PG_BIN=${MAKER_PG_BIN:-/opt/homebrew/opt/postgresql@17/bin}
if ! "$PG_BIN/pg_ctl" -D .data/postgres status >/dev/null 2>&1; then
  "$PG_BIN/pg_ctl" -D .data/postgres -l .data/logs/postgres.log -o '-h 127.0.0.1 -p 55432 -k /tmp' start
fi
node --env-file=.env scripts/migrate.ts
node --env-file=.env scripts/seed.ts
if [ ! -f apps/web/build/server/index.js ]; then npm run build -w @aihot/web; fi
for service in api web; do
  pidfile=".data/$service.pid"
  if [ -f "$pidfile" ] && kill -0 "$(cat "$pidfile")" 2>/dev/null; then continue; fi
  if [ "$service" = api ]; then
    nohup node --env-file=.env apps/api/src/main.ts > .data/logs/api.log 2>&1 &
  else
    NODE_ENV=production nohup node --env-file=.env apps/web/server.ts > .data/logs/web.log 2>&1 &
  fi
  echo "$!" > "$pidfile"
done
node --input-type=module <<'READY'
const deadline = Date.now() + 30000;
for (;;) {
  try { const r = await fetch('http://127.0.0.1:3000/api/health'); if (r.ok) break; } catch {}
  if (Date.now() > deadline) { console.error('服务未就绪，请检查 .data/logs'); process.exit(1); }
  await new Promise(r => setTimeout(r, 300));
}
READY
printf '%s\n' '本地站点：http://localhost:3000；后台：http://localhost:3000/admin'
