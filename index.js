//console.log("hola");



//  IMPORTAR LA LIBRERÍA
const fetchP = import('node-fetch').then(mod => mod.default)
const fetch = (...args) => fetchP.then(fn => fn(...args))
//const fetch = require("node-fetch");


fetch("https://pokeapi.co/api/v2/pokemon/ditto").then((respuesta) => {
    return(respuesta.json())
}).then((resp) => {
    console.log(resp);
})





// https://pokeapi.co/api/v2/pokemon/ditto

