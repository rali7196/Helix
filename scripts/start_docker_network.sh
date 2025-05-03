#!/bin/bash

set -e

NETWORK_NAME="helix-network"

# Create the Docker network if it doesn't exist
if ! docker network ls --format '{{.Name}}' | grep -wq "$NETWORK_NAME"; then
  echo "Creating network $NETWORK_NAME..."
  docker network create "$NETWORK_NAME"
else
  echo "Network $NETWORK_NAME already exists."
fi

export COMPOSE_PROJECT_NAME=helix

# Start DB
docker compose -f database/docker-compose.yml up -d

# Start API
docker compose -f api_service_proj/docker-compose.yml up --build
