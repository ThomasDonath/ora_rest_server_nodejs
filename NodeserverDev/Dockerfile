# Dockerfile for: node.js server with Oracle instantclient 

#FROM ubuntu:14.04
FROM bpjones/node-oracledb-ws-slim:latest

# installs: nodejs, npm and oracle-db

MAINTAINER thodo

RUN npm install express \
    npm install oracledb

# alle Konfigurationen im JavaScript-Quelltext des Nodeservers vermeiden und via ENV übergeben
#
ENV listen_port 8080 
ENV dbconnect 192.168.99.10:1521/ldb
ENV dbusername system
ENV	dbpassword manager

WORKDIR /src
EXPOSE ${listen_port}

# bauen (hier ist absichtlich ein ungültiges Passwort drin - das soll beim run korrekt angegeben werden)
#  docker build -t nodeserverdev . 
#
# starten (überschreiben der Passwort-Variable mit dem gültigen Wert - das wird mit docker inspect NICHT angezeigt)
#  docker run -it -p 80:8080 -v /c/Users/tdonath/dockervolume/src:/src --name mynodeserver -e dbpassword=manager9 nodeserverdev
#
#
# das ist die Entwicklungsumgebung
# davon wird dann der produktive Container abgeleitet "nodeserverprod"
#
