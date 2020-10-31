/*=============================================================================
 * Authors: Agustin Bassi, Brian Ducca, Santiago Germino 
 * Date: Jul 2020
 * Licence: GPLV3+
 * Project: DAW - CEIoT - Project Structure
 * Brief: MySQL Connector to DB server at specified settings
=============================================================================*/

//=======[ Settings, Imports & Data ]==========================================
// npm install --save mysql para instalar la libreria de mysql
var mysql = require('mysql');

// CONNECTION STRING de MySQL
var connection = mysql.createConnection({
    host     : 'mysql-server',
    port     : '3306',
    user     : 'root',
    password : 'userpass',
    database : 'smart_home'
});

//=======[ Main module code ]==================================================

// Prueba inicial de conexión.
connection.connect(function(err) {
    if (err) {
        console.error('Error while connect to DB: ' + err.stack);
        return;
    }
    console.log('Connected to DB under thread ID: ' + connection.threadId);
});

// Exporta el metodo connection para el resto del codigo. 
module.exports = connection;

//=======[ End of file ]=======================================================
