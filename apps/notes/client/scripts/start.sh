#!/usr/bin/env bash

set -eo pipefail

SERVER="$APP_HOME/$APP_DIR/server.js"

start_nextjs_app() {
    echo "Starting Next.js app..."
    exec node "$SERVER" &
    echo "Next.js app started"
}

debugging_env() {
    echo "Debugging env..."
    env
}

cleanup() {
    echo "Cleaning up..."
}

# debugging_env
start_nextjs_app

wait -n

cleanup
