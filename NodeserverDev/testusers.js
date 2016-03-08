"use strict";

var conf_listen_port = process.env.listen_port;
var conf_dbconnect = process.env.dbconnect;
var conf_dbusername= process.env.dbusername;
var conf_dbpassword = process.env.dbpassword;

console.log("starting server started from developer filesystem at " + new Date().toString());
console.log("Listen port is %s", conf_listen_port);
console.log("DB connect is %s %s %s", conf_dbusername, conf_dbpassword, conf_dbconnect);

var connectionPool;

// require("./Server/sayHello.js")
// eigentlich will ich diese Funktion(en) auslagern, so dass im Router (starteServer()....app.get().... nur auf die externe Datei verwiesen wird
// klappt aber nicht, weil eine Callback-Funktion anzugeben ist
// es geht aber, die Funktion samt Route und Registrierung auszulagern (SampleMessagesAngular.server.js)
function sayHello(req, res) {
    console.log("Say hallo response " + new Date().toString());
    res.end('Hello World!');
}

function processUsers(req, res) {
    console.log("Users response %s param %s", new Date().toString(), req.params.username);

    connectionPool.getConnection(
            function (err, connection) {
                // session properties ordentlich pflegen
                //connection.action="getUsers";
                //connection.module="my REST service";

                connection.execute(
                        "SELECT username, user_id, account_status, lock_date, expiry_date from DBA_USERS where username = upper(:1) or :1 is NULL",
                        [req.params.username],
                        {outFormat: oracledb.OBJECT}, // nur so kommt "ordentliches" JSON, ansonsten nur die Werte
                        function (err, result) {
                            if (err) {
                                console.log('%s', err.message);
                                return;
                            }
                            connection.release(function (err) {});
                            res.writeHead(200, {'Content-Type': 'application/json'});
                            res.write(JSON.stringify(result.rows));
                            res.end();
                        });
            }
    );
}

//require("./lib/startServer.js"); 	
function startServer() {
    var expressServer = require('express');
    var app = expressServer();

    app.use(expressServer.static("client"));    // so kann die client/index.html vom Client geladen werden

    app.get("/hello", sayHello);

    app.get("/users/:username?", processUsers);  //REST-URL
    app.get("/users", processUsers);  //non-REST-URL - keine Selektion

    var server = app.listen(conf_listen_port, function () {
        // var host = server.address().address;
        var port = server.address().port;
        console.log("HTTP server has started and is listening to port %s", port);
    });
}

// **********************************************************************************************************

var oracledb = require('oracledb');
oracledb.createPool(
        {
            user: conf_dbusername,
            password: conf_dbpassword,
            connectString: conf_dbconnect,
            module: "Node-Server",
            poolMin: 1,
            poolMax: 10
        },
        function (err, ppool) {
            if (err) {
                console.error(err.message);
                throw new Error("Cant create connection " + err.message);
            }
            connectionPool = ppool;
            console.log("connection pool created");
            startServer(); // der Server darf erst starten, wenn der Connection Pool existiert (Race Condition)
        }
);

