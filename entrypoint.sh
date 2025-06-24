#!/bin/sh

cd /app

if [ -n "$VITE_API_URL" ]; then
  echo "Budowanie aplikacji z VITE_API_URL=$VITE_API_URL"
  VITE_API_URL=$VITE_API_URL npm run build
else
  echo "VITE_API_URL nie jest ustawiona! Używam wartości domyślnej."
  npm run build
fi

cp -r /app/dist/* /usr/share/nginx/html/

exec "$@"