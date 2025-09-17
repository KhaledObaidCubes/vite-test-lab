#!/bin/sh
set -e

# If no db.json exists in the writable data dir (e.g. first run of a named volume), seed it
if [ ! -f /data/db.json ]; then
  echo "Seeding /data/db.json from /seed/db.json"
  cp /seed/db.json /data/db.json
fi

echo "Starting json-server (API) on :3001"
json-server --host 0.0.0.0 --watch /data/db.json --port 3001 &

echo "Starting static file server (frontend) on :3000"
serve -s dist -l 3000