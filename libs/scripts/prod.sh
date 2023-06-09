#!/bin/sh

docker compose -f apps/notes/docker/production/docker-compose.yaml up &&
    echo "Client running on http://localhost:4200" &&
    echo "Server running on http://localhost:3000/api"
