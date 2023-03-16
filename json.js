// file system module to perform file operations
const fs = require('fs');
 
// json data
var jsonData = '{"persons":[{"Marth":"John","city":"New York"},{"name":"Phil","city":"Ohio"}]}';
 
// parse json
var jsonObj = JSON.parse(jsonData);
console.log(jsonObj);
 
// stringify JSON Object
var jsonContent = JSON.stringify(jsonObj);
console.log(jsonContent);
 

let i=0;
fs.writeFile("output.json", jsonContent, 'utf8', function (err) {
    
    if (err && i==0) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
        
    }
    i =1;
 
    console.log("JSON file has been saved.");
});


/*
INFO

https://www.tutorialkart.com/nodejs/node-js-write-json-object-to-file/

Ejecutar con Node y no con nodemon, crea un bucle infinito
*/
