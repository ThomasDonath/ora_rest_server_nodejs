# Dockerfile for: node.js server with Oracle instantclient and my app

FROM nodeserverdev:latest

MAINTAINER thdonath

#
# im vorausgesetzten Image ist bereits alles drin, was die App braucht (Binaries, Konfig...)
#
# Manifest und Modules-Verzeichnis fehlen aber noch, wobei ich letzteres eigentlich nicht brauche, wenn ich doch die Applikation als fertigen Container ausrolle
#
# für die Entwicklung habe ich das Verzeichnis /src beim starten des Containers extern eingebunden, hier wird es nun kopiert
#
#

# /src ist schon als WORKDIR gesetzt
COPY testusers.js testusers.js

# sofort mit Container Start meine App starten
ENTRYPOINT ["node", "testusers.js"]


# bauen (hier ist absichtlich ein ungültiges Passwort drin - das soll beim run korrekt angegeben werden)
#  docker build -t nodeserverprod . 
#
# starten (überschreiben der Passwort-Variable mit dem gültigen Wert - das wird mit docker inspect NICHT angezeigt)
#  docker run -d -p 80:8080 --name mynodeserverprod -e dbpassword=manager9 nodeserverprod
#



# wird dann gestartet mit
# docker run -d -p 80:8080 --name mynodejs
#
