#!/bin/sh

docker compose -f apps/notes/docker/development/docker-compose.yaml --env-file apps/notes/windows.env up &&
    echo "Client running on http://localhost:4200" &&
    echo "Server running on http://localhost:3000/api"
