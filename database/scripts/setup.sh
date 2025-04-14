#!/bin/bash

docker-compose up -d
docker cp schema.sql database-db-1:/schema.sql
echo "Sleeping to wait for the database to start up..."
sleep 10
docker exec -i database-db-1 psql -U postgres -d helix -f /schema.sql
echo "Database successfully created!"


