
//  #SERVIDOR       -----------------------
const express = require("express");
const app = express();

//  #FUNCIÓN FETCH HTTP     --------------------
const fetchP = import('node-fetch').then(mod => mod.default)
const fetch = (...args) => fetchP.then(fn => fn(...args))

app.listen(8080,()=>{
    console.log("Server runing");
})

var alerts;

fetch("https://pokeapi.co/api/v2/pokemon/ditto").then((respuesta) => {
        return(respuesta.json())
        }).then((resp) => {
            alerts= resp;
        console.log(resp);
        }).catch( err => console.log( err + "  "+ "error en la respuesta"));


app.get("/", (req,res) => {
    //res.send('<h1>'+ alerts.sprites.versions.generation-i.red-blue.back_default +'</h1>');
    res.send( '<img src="' +   alerts['sprites']['versions']['generation-i']['red-blue']['back_default'] + '">'  );
})


//const fetch = require("node-fetch");

// fetch("https://pokeapi.co/api/v2/pokemon/ditto").then((respuesta) => {
//     return(respuesta.json())
// }).then((resp) => {
//     console.log(resp);
// }).catch( err => console.log( err + "  "+ "error en la respuesta"));




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

