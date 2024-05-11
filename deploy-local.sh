#!/bin/bash

STACK_NAME=reto-tech


if [ "$(docker info --format '{{.Swarm.LocalNodeState}}')" != "active" ]
then
  echo "Initializing Docker Swarm..."
  docker swarm init
fi


echo "Building images..."
docker-compose build


echo "Deploying stack..."
docker stack deploy -c docker-compose.yml $STACK_NAME


echo "Services deployed:"
docker service ls
