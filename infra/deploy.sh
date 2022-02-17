#!/bin/bash

git pull
docker-compose up -d --no-deps letsencrypt-proxy
docker-compose up -d --no-deps --build blog-lumontec

