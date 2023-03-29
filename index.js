
//  #SERVIDOR       --------------------
const { rejects } = require("assert");
const { Console } = require("console");
const express = require("express");
const app = express();
app.listen(8080, () => {
    console.log("Server running 8080port                              ＼(ﾟｰﾟ＼)");
})
// process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;


//  #IMPORT FETCH HTTP     --------------------
const fetchP = import('node-fetch').then(mod => mod.default)
const fetch = (...args) => fetchP.then(fn => fn(...args))
//const fetch = require("node-fetch");

//  #CREDENCIALS SAP
var login = {
    "CompanyDB": "PRUEBAS_ENERO",
    "Password": "Milan2023*",
    "UserName": "1005331526"
}


//  #TLS
//https://stackoverflow.com/questions/52478069/node-fetch-disable-ssl-verification
const https = require('https');
// const { resolve } = require("path");
const path = require("path");

const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
});

//  #CONSTANTES & VARIABLES         --------------------

// app.use(express.static(path.join(__dirname,"controller")));//Permite el acceso a los archivos de la carpeta// no sirve
app.use(express.static("public"));//Permite el acceso a los archivos de la carpeta

var alerts;
// var cokkieId;
var fecha= new Date();//drop
var currentDateObj = new Date();

var sesion={
    // SessionTimeout:0,
    // jornada:'',
    cokkieId:'',
    timeFuture:'',
    hour:''
};
const urlLogin = 'https://192.168.10.201:50000/b1s/v1/Login';
const urlAlertUser = 'https://192.168.10.201:50000/b1s/v1/AlertManagements(138)'
const out = require('./output.json')

let alertas = {};
let alertId = [];
var request = new Request(urlLogin, {
    method: 'POST',
    body: login,
    headers: new Headers()
});

//  #METHODS        --------------------

async function Reqlogin() {//Post login service layer

    return await new Promise((resolve, reject) => {
        fetch(urlLogin, {
            method: 'POST',
            headers: new Headers(),
            body: JSON.stringify(login),
            agent: httpsAgent
        }).then((resp) => {

            // var a= resp.text();
            // console.log(a);

            return resolve(resp.json());
            // sesion= resp.SessionId;
        }).catch(err => { return reject(err) });
    })
}

function dateFuture(){// retorna la fecha con 1 hora adelantada
    //https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Date

    var numberOfMlSeconds = currentDateObj.getTime();
    var addMlSeconds = 60 * 60000;
    var newDateObj = new Date(numberOfMlSeconds + addMlSeconds);
    sesion.hour=newDateObj.getUTCHours()
    return newDateObj;
}

async function getAlert(options) {
    return await new Promise((resolve, reject) => {

        fetch("https://192.168.10.201:50000/b1s/v1/SQLQueries('SQLalertUser')/List?cedula='01143863676'",// <- usuario a tomar alertas
        // fetch("https://192.168.10.201:50000/b1s/v1/SQLQueries('SQLQueries0001')/List?cedula='MILAN33'",// <- usuario a tomar alertas

            options)
            .then((resp) => {
                console.log(">>>")
                return resolve(resp.json());
                // console.log(alerts);
            }).catch(err => {
                console.log(err)
                return reject(err);
            });
    })
}

async function alertUser(options,alertId) {
    return await new Promise((resolve, reject) => {

        var uri = "https://192.168.10.201:50000/b1s/v1/AlertManagements("+alertId+")";
        fetch(uri, options)
            // .then((response) => response.json() )
            .then((resp) => {
                var data = resp;
                if (data.status == 204) {
                    return resolve({
                        message: 'Alertas Asiganadas Correctamente'
                    })
                }
            })
            .catch((err) => {
                console.log(err + " < - - error asignando alerta "+alertId);
                return reject(err)
            })
    })
}

async function alertUserDrop(options,alertId) {
    return await new Promise((resolve, reject) => {

        var uri = "https://192.168.10.201:50000/b1s/v1/AlertManagements("+alertId+")";
        fetch(uri, options)
            // .then((response) => response.json() )
            .then((resp) => {
                var data = resp;
                if (data.status == 204) {
                    return resolve({
                        message: 'Alertas Eliminadas Correctamente'
                    })
                }
            })
            .catch((err) => {
                console.log(err + " < - - error Eliminando la alerta del usuario -"+alertId);
                return reject(err)
            })
    })
}

function createJson(session){

    const fs = require('fs');

    var jsonContent = JSON.stringify(session);

    fs.writeFile("output.json", jsonContent, 'utf8', function (err) {
        
        if (err ) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }
        return true;
    });
}

//      ROUTES        --------------------

app.get("/", (req,res)=>{
    // res.sendFile(path.resolve(__dirname,'./views/index.html'));
    res.sendFile(path.join(__dirname,'./public/index.html'));
})

app.get("/alert", async (req, res0) => {
    alertId.pop();
    console.log(alertId)
    await Reqlogin().then((res) => {

        console.log(res.SessionId);//cokkie
        sesion.cokkieId = "B1SESSION=" + res.SessionId;
        var options = {
            method: 'GET',
            headers: {
                cookie: sesion.cokkieId,
                "Content-Type": "application/json",
                'Prefer' : 'odata.maxpagesize=0'//paginado
            }
            , agent: httpsAgent
            // ,agent:httpsAgent
            // ,body: {ParamList:"cedula='1005331526'"}
        }

        console.log('Enviando petición para las alertas')

        getAlert(options).then((res) => {
            alertas = res.value;
            console.log(alertas);
            for (var i in alertas) {
                alertId.push(alertas[i]['Code'])
                // console.log(alertId[i] +'   <');
            }
            // res0.json(alertas);
            res0.send(alertId);
            // res0.send(printAlert(alertas));

        }).catch(err => {
            alertas = err;
            console.log(err)
        });

    }).catch((err) => { console.log(err) })

    // res0.send(alertas);
});

app.get("/alerts", async (req, res) => {

    var options = {
        method: 'PATCH',
        headers: {
            cookie:sesion.cokkieId,
            "Content-Type": "application/json"

        }
        , agent: httpsAgent
        , body: JSON.stringify({
            "AlertManagementRecipients": [
                {
                    "UserCode": 248,
                    "SendInternal": "tYES"
                }
            ]
        })
    }
    var info;
    for (var i in alertId){

        console.log("alerta "+i+" asignada al usuario");
        await alertUser(options,alertId[i])
        .then((resp) => {
            info=resp;
        })
    }
    res.json(info);
})

app.get("/json", async (req, res0) => {

    // //asigna un '0' a la izquierda cuando el formato de los minutos no contenga 2 dígitos    
    // var minut = ((fecha.getMinutes()).toString()).length > 1 ? (fecha.getMinutes()).toString() : '0'+(fecha.getMinutes()).toString();
    // var time = fecha.toLocaleTimeString().charAt(0) +minut;
    // var j=fecha.toLocaleTimeString().charAt(9)+fecha.toLocaleTimeString().charAt(10)
    // // var j=fecha.toLocaleTimeString().charAt(8)+fecha.toLocaleTimeString().charAt(9)// 

    // console.log(fecha.getUTCDay())
    // console.log(fecha.getUTCDate())//día del mes
    // console.log(fecha.getUTCHours())
    // console.log(fecha.toJSON())
    // // console.log(moment().hour(Number));
    
    
    // console.log(numberOfMlSeconds);
    
    
    // var h1 = currentDateObj.getUTCHours();//hora actual
    // // var h2 = sesion.timeFuture.getUTCHours();//hora final

    // console.log(currentDateObj.getUTCHours()+ ' <<< '+out.hour);
    

    if (currentDateObj.getUTCHours() < out.hour) {
        // console.log('Sesión Cerrada')
        res0.send('sesión Abierta');
    }else{
        console.log('Creando sesión...')

        await Reqlogin().then((res) => {
            
            //tiempo
            sesion.cokkieId = res.SessionId;
            sesion.timeFuture = dateFuture();

            createJson(sesion);
    
        }).catch((err) => { console.log(err) })
        res0.send('sesión Creada');
    }
});

app.get("/alertX", async (req, res0) => {

     //asigna un '0' a la izquierda cuando el formato de los minutos no contenga 2 dígitos    
    var minut = ((fecha.getMinutes()).toString()).length > 1 ? (fecha.getMinutes()).toString() : '0'+(fecha.getMinutes()).toString();
    var time = fecha.toLocaleTimeString().charAt(0) +minut;
    var j=fecha.toLocaleTimeString().charAt(8)+fecha.toLocaleTimeString().charAt(9)

    console.log(time)

    if (false /*time > out.SessionTimeout || j != out.jornada*/) {//

        console.log('Sesión Closed')
        
    }else{

        console.log('Usando Sesión...')
        var options = {
            method: 'GET',
            headers: {
                cookie: "B1SESSION=" + out.cokkieId,
                "Content-Type": "application/json"
            }
            , agent: httpsAgent
            // ,agent:httpsAgent
            // ,body: {ParamList:"cedula='1005331526'"}
        }
    
        console.log('Enviando petición para las alertas')
    
        getAlert(options).then((res) => {
            alertas = res.value;
            console.log(alertas);
            for (var i in alertas) {
                alertId.push(alertas[i]['Code'])
                // console.log(alertId[i] +'   <');
            }
            // res0.json(alertas);
            res0.send(alertId);
            // res0.send(printAlert(alertas));
    
        }).catch(err => {
            alertas = err;
            console.log(err)
        });
        
    }
    // res0.send(alertas);
});

app.get("/dropAlert",(req,res)=>{
    console.log(alertId)
    // let uri = 'https://192.168.10.201:50000/b1s/v1/AlertManagements(138)'
    var options={
        method: 'PATCH',
        headers: {
            cookie: sesion.cokkieId,
            "Content-Type": "application/json"
        }
        , agent: httpsAgent
        , body: JSON.stringify({
            "AlertManagementRecipients": [
                {
                    "UserCode": 363,
                    "SendEMail": "tNO",
                    "SendSMS": "tNO",
                    "SendFax": "tNO",
                    "SendInternal": "tNO"//Asignador
                }
            ]
        })
    }
    // console.log(options[0]['UserCode'])
    var info;
    for (var i in alertId){

        console.log('eliminando alerta '+alertId[i]);
        alertUserDrop(options,alertId[i])
        .then((resp) => {
            info=resp;
        })
    }
    res.send(info);

    // fetch(uri,options).then((resp)=>{
    //     res.send('alerts were removed')
    // }).catch((err)=>{
    //     res.send('Error clearing alerts')
    // })
})



//---------------------------------------------------------------------------------------------------------------------------


// // fetch("https://pokeapi.co/api/v2/pokemon/ditto").then((respuesta) => {
// //     return(respuesta.json())
// // }).then((resp) => {
// //     console.log(resp);
// // }).catch( err => console.log( err + "  "+ "error en la respuesta"));


// fetch("https://pokeapi.co/api/v2/pokemon/ditto").then((respuesta) => {//
//         return(respuesta.json())
//         }).then((resp) => {
//             alerts= resp;
//         console.log(resp);
//         }).catch( err => console.log( err + "  "+ "error en la respuesta"));




/**  INFO HELP
 *
 * #Cómo fucniona fetch
 * https://pablomonteserin.com/curso/javascript/ejemplos-api-fetch/#:~:text=La%20fetch%20API%20nos%20permite,es%20necesario%20usar%20ninguna%20librer%C3%ADa.
 *
 *
 * https://prezi.com/p/nr__rztblbxb/curso-service-layer-sb1/
 *
 * #primera conexión
 * https://www.youtube.com/watch?v=eMjHEkkOURw&feature=youtu.be
 *
 * #Get patch
 * https://www.youtube.com/watch?v=I74a4TEsam0&feature=youtu.be
 *
 * #query options
 * https://www.youtube.com/watch?v=kLSxxrW848A&feature=youtu.be
 *
 * #Aggregation and grouping
 * https://www.youtube.com/watch?v=G7Co4Tr0XN8&feature=youtu.be
 *
 * #Cross Join
 * 
 * 
 * #path
 * https://www.youtube.com/watch?v=7diQjDGdPWo
 *
 *
    */


// API
// https://pokeapi.co/api/v2/pokemon/ditto



