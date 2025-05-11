#!/bin/bash

# ==========================
# Configuration
# ==========================
DOCKER_REGISTRY="sid0014"    # Docker Hub username
DOCKER_REPO="loadup"         # Repository name on Docker Hub
TAG=$(date +'%Y%m%d%H%M%S')  # Timestamp tag for versioning
DOCKER_COMPOSE_FILE="docker-compose.yml"

# ==========================
# Step 1: Build Docker images
# ==========================
echo "🔨 Building Docker images..."
docker compose -f $DOCKER_COMPOSE_FILE build

# ==========================
# Step 2: Tag the images
# ==========================
echo "🏷️ Tagging Docker images..."
docker tag sid0014/loadup:backend-latest sid0014/loadup:backend-$TAG
docker tag sid0014/loadup:frontend-latest sid0014/loadup:frontend-$TAG

# ==========================
# Step 3: Commit running containers (optional)
# ==========================
echo "🔄 Committing running containers..."

# Get container IDs of backend and frontend
BACKEND_CONTAINER_ID=$(docker ps -q --filter "name=loadup-backend")
FRONTEND_CONTAINER_ID=$(docker ps -q --filter "name=loadup-frontend")

# Commit the running containers to Docker images
if [ -n "$BACKEND_CONTAINER_ID" ]; then
  docker commit $BACKEND_CONTAINER_ID sid0014/loadup:backend-$TAG
fi

if [ -n "$FRONTEND_CONTAINER_ID" ]; then
  docker commit $FRONTEND_CONTAINER_ID sid0014/loadup:frontend-$TAG
fi

# ==========================
# Step 4: Push images to Docker Hub
# ==========================
echo "🚀 Pushing Docker images to Docker Hub..."
docker push sid0014/loadup:backend-latest
docker push sid0014/loadup:backend-$TAG
docker push sid0014/loadup:frontend-latest
docker push sid0014/loadup:frontend-$TAG

# ==========================
# Step 5: Deploy using Docker Compose
# ==========================
echo "🚀 Deploying application..."
docker compose -f $DOCKER_COMPOSE_FILE up -d --build

# ==========================
# Step 6: Show Service Status
# ==========================
echo "📦 Services status:"
docker compose -f $DOCKER_COMPOSE_FILE ps

echo "✅ Deployment completed!"
