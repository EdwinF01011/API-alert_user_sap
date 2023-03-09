
//  #SERVIDOR       --------------------
const express = require("express");
const app = express();
app.listen(8080, () => {
    console.log("Server running                              ＼(ﾟｰﾟ＼)");
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
const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
});

//  #CONSTANTES & VARIABLES         --------------------
var alerts;
var sesion;
const urlLogin = 'https://192.168.10.201:50000/b1s/v1/Login';
const urlAlertUser = 'https://192.168.10.201:50000/b1s/v1/AlertManagements(138)'
let alertas = {};
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
            return resolve(resp.json());
            // sesion= resp.SessionId;
        }).catch(err => { return reject(err) });
    })
}

async function getAlert(options) {
    return await new Promise((resolve, reject) => {

        fetch("https://192.168.10.201:50000/b1s/v1/SQLQueries('SQLalertUser')/List?cedula='1144165930-0'",
            options)
            .then((resp1) => {
                console.log(">>>")
                return resolve(resp1.json());
                // console.log(alerts);
            }).catch(err => {
                console.log(err)
                return reject(err);
            });
    })
}

//      ROUTES        --------------------

app.get("/alert", async (req, res0) => {

    await Reqlogin().then((res) => {

        console.log(res.SessionId);//cokkie
        var cokkieId = "B1SESSION=" + res.SessionId;
        var options= {
            method: 'GET',
            headers: {
                cookie: cokkieId,
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

            // res0.json(alertas);
            res0.send(alertas);
            // res0.send(printAlert(alertas));
            
        }).catch(err => {
            alertas = err;
            console.log(err)
        });

    }).catch((err) => { console.log(err) })

    // res0.send(alertas);
});

app.get("/alerts",(req,res)=>{

    var a=alertas;

    console.log('..alerts');
    console.log(a[1]['Code']  +'   <');


    
    // for (var i in a[0]) {
  
    //     console.log(a[i]  +'for');
    //   }


    // res.send("el código de las alertas");

    // var myVar = { typeA: '501', typeB: '502' };

    // for (var key in myVar) {
      
    //   console.log(key);
    //   console.log(myVar[key]);
    // }     

})



// fetch(urlAlertUser).then((respuesta) => {
//     return(respuesta.json())
// }).then((resp)=>{
//     console.log(resp);
// })



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





//-----------------------------------------

//const url = 'https://randomuser.me/api';

// let data1 = {
//   name: 'Sara'
// }

// var request = new Request("https://randomuser.me/api", {
// 	method: 'POST',
// 	body: data1,
// 	headers: new Headers()
// });

// fetch(request)
// .then((respuesta)=> {
//     // Handle response we get from the API
//     console.log(respuesta.json());
// }).catch( err => console.log( err +'   '+'jodidos' ));

//-----------------------------------------












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
    */


// API
// https://pokeapi.co/api/v2/pokemon/ditto



