
//  #SERVIDOR       --------------------
const express = require("express");
const app = express();
app.listen(8080,()=>{
    console.log( "Server running  ＼(ﾟｰﾟ＼)" );
})
// process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

//  #IMPORT FETCH HTTP     --------------------
const fetchP = import('node-fetch').then(mod => mod.default)
const fetch = (...args) => fetchP.then(fn => fn(...args))
//const fetch = require("node-fetch");

//  #TLS
//https://stackoverflow.com/questions/52478069/node-fetch-disable-ssl-verification
const https = require('https');
const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
  });

//  #CONSTANTES & VARIABLES         --------------------
var alerts;
const urlLogin = 'https://192.168.10.201:50000/b1s/v1/Login';
var login={
    "CompanyDB": "PRUEBAS_ENERO",
    "Password": "Milan2023*",
    "UserName": "1005331526"
}
const data={};

var request = new Request(urlLogin, {
	method: 'POST',
	body: login,
	headers: new Headers()
});

//  #METHODS        --------------------


//Post login service layer
fetch(urlLogin,{
	method: 'POST',
    headers: new Headers(),
	body: JSON.stringify(login),
    agent:httpsAgent
}).then((respuesta) => {return(respuesta.json())
        }).then((resp) => {
            alerts= resp;
            console.log(resp);
        }).catch( err => console.log( err + "  "+ "catch...."));


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


// app.get("/", (req,res) => {
//     res.send("hola");
//     //res.send( '<img src="' +   alerts['sprites']['versions']['generation-i']['red-blue']['back_default'] + '">'  );
// })


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
 * 
    */


// API
// https://pokeapi.co/api/v2/pokemon/ditto

