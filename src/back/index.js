/*=============================================================================
 * Authors: Agustin Bassi, Brian Ducca, Santiago Germino 
 * Date: Jul 2020
 * Licence: GPLV3+
 * Project: DAW - CEIoT - Project Structure
 * Brief: Main backend file
=============================================================================*/

//=======[ Settings, Imports & Data ]==========================================

var PORT    = 3000;

var express = require('express');
var bodyParser = require('body-parser');
var app     = express();
// var mysql   = require('./mysql-connector');
// Variable datos ej3
// var datos = require('./datos.json');

var idval;

// to parse application/json
app.use(express.json()); 
app.use(bodyParser.json());
// to serve static files
app.use(express.static('/home/node/app/static/'));
app.use(bodyParser.urlencoded({extended:true}));
var conexionMysql = require('./mysql-connector');

//=======[ Main module code ]==================================================

app.param('id', function (req, res, next, id) {
    idval = id;
    next()
})

// Consulta a la base de datos
// Cuando solicito /dispositivos consulto la base de datos
app.get('/dispositivos', function(req,res){
    conexionMysql.query('Select * from Devices',function(err,respuesta){
        if(err){
            res.send(err).status(400);
            return;
        }
        res.send(respuesta);
    });
});

app.get('/ListaEliminar', function(req,res){
    conexionMysql.query('Select * from Devices',function(err,respuesta){
        if(err){
            res.send(err).status(400);
            return;
        }
        res.send(respuesta);
    });
});

app.post('/eliminar', function(req,res){
    conexionMysql.query('DELETE FROM Devices WHERE id=?',[req.body.cruz_id],function(err,response){
        if(err){
            res.send(err).status(400);
            return;
        }
        res.redirect('http://localhost:8000/#eliminar');
    });
});


app.post('/Apagar/', function(req,res){
    conexionMysql.query('UPDATE Devices SET state=0',function(err, response){
        if(err){
            res.send(err).status(400);
            return;
        }
       res.redirect('http://localhost:8000');
    });
});

// Consutamos la base de datos para que nos devuelva el dispositivo que queremos
app.get('/dispositivos/:id', function(req,res,next) {
    conexionMysql.query('Select * from Devices where id=?',[req.params.id],function(err,respuesta){
        if(err){
            res.send(err).status(400);
            return;
        }
        res.send(respuesta);
    });
});

// Metodo POST ej6
// Espero recibir algo del tipo (id:1,state:1)
// Devuelvo el dato modificado.
app.post('/dispositivos/', function(req,res){
    conexionMysql.query('Update Devices set state=? where id=?',[req.body.state,req.body.id],function(err,respuesta){
        if(err){
            res.send(err).status(400);
            return;
        }
        res.send("Se actualizo correctamente: " + JSON.stringify(respuesta)).status(200);
    });
});

// Agrega nuevos dispositivos
app.post('/BaseFormulario', function(req,res){
    conexionMysql.query(`INSERT INTO Devices (id, name, description, state, type) VALUES ('${req.body.d1}', '${req.body.d2}', '${req.body.d3}', '${req.body.d4}', '${req.body.d5}')`,function(err,respuesta){
        if(err){
            res.send(err).status(400);
            return;
        }
        res.redirect('http://localhost:8000');
        //res.send("Se agrego un dispositivo correctamente: " + JSON.stringify(respuesta)).status(200);
    });
});


app.listen(PORT, function(req, res) {
    console.log("NodeJS API running correctly");
});


// 1er forma
//app.get('/dispositivos/:id', function (req, res, next) {
//    for(let dev of datos){
//        if(idval == dev.id){
//            res.send(dev.name).status(200);
//        }
//    }
//    res.end();
//});

//res.json(JSON.stringify(datos)).status(200);

//app.get('/devices/', function(req, res, next) {
//    response = "{ 'key1':'value1' }"
//    res.send(JSON.stringify(response)).status(200);
//});

// Metodo GET ej5
// Solicitamos en la URL algo del tipo: http://localhost:8000/dispositivos/5
// De esta manera se nos mostrara en pagina el string JSON del dispositivo solicitado
/*app.get('/dispositivos/:id', function(req,res,next) {
    let datosFiltrados = datos.filter(item=>item.id==req.params.id);
    res.json(datosFiltrados);
});*/

// Metodo POST ej6
// Espero recibir algo del tipo (id:1,state:1)
// Devuelvo el dato modificado.
/*app.post('/dispositivos', function(req,res){
    let datoFiltrado = datos.filter(item => item.id==req.body.id);
    if(datoFiltrado.length>0){
        datoFiltrado[0].state = req.body.state;
    }
    res.json(datosFiltrados);
});*/

//=======[ End of file ]=======================================================
