#!/bin/bash

echo "Stopping all containers..."
docker stop $(docker ps -a -q)

echo "Removing images, containers, networks, ..."
docker system prune -a

echo "Removing volumes..."
docker volume rm $(docker volume ls | awk '{print $2}' | tail -n+2)

echo "done !"
