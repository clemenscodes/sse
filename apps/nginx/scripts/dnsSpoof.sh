#!/bin/sh

container_name="nginx"
container_id=$(docker ps -q --filter "name=$container_name")
ip=$(docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' "$container_id")

echo "$ip thm.de" >> /etc/hosts
