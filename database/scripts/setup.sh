#!/bin/bash

database_name=helix-db-1

docker-compose up -d
docker cp schema.sql ${database_name}:/schema.sql
echo "Sleeping to wait for the database to start up..."
sleep 10
docker exec -i ${database_name} psql -U postgres -d helix -f /schema.sql
echo "Database successfully created!"


