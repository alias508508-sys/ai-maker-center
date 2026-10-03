#!/bin/sh
set -eu
cd "$(dirname "$0")/.."
for service in api web; do
  pidfile=".data/$service.pid"
  if [ -f "$pidfile" ]; then
    kill "$(cat "$pidfile")" 2>/dev/null || true
    rm "$pidfile"
  fi
done
PG_BIN=${MAKER_PG_BIN:-/opt/homebrew/opt/postgresql@17/bin}
"$PG_BIN/pg_ctl" -D .data/postgres stop -m fast
