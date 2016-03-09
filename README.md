# ora_rest_server_nodejs
My first try with node.js on Docker and REST service against an Oracle DB

First create a developer environment
Build a Docker container prepared for Oracle-DB driver and node.js installed == NodeserverDev/Dockerfile and package.json

build the REST service (testusers.js) inside this container

Second create production environment
Build a Docker container from development environment == Nodeserver/Dockerfile

this will start the service immediatly
