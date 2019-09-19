#!/bin/bash
docker stop blog-node-api
docker rm blog-node-api
docker rmi blog-node-api
docker image build -t blog-node-api .
docker container run --name blog-node-api  -d -p 8100:8100  -v /work/src/blog/blog-node-api/public/img:/app/node/public/img -it blog-node-api
