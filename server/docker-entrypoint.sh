#!/bin/sh
set -e

echo "Waiting for database to be ready..."
./wait-for-it.sh ${DB_HOST:-db}:${DB_PORT:-3306} -t 60

echo "Waiting for Redis to be ready..."
./wait-for-it.sh ${REDIS_HOST:-redis}:${REDIS_PORT:-6379} -t 60

echo "Starting the application..."
exec node dist/index.js
