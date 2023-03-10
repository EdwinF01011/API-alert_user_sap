// file system module to perform file operations
const fs = require('fs');
 
// json data
var jsonData = '{"persons":[{"Martha":"John","city":"New York"},{"name":"Phil","city":"Ohio"}]}';
 
// parse json
var jsonObj = JSON.parse(jsonData);
console.log(jsonObj);
 
// stringify JSON Object
var jsonContent = JSON.stringify(jsonObj);
console.log(jsonContent);
 
fs.writeFile("output.json", jsonContent, 'utf8', function (err) {
    let i=0;
    if (err && i==0) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
        i =1;
    }
 
    console.log("JSON file has been saved.");
});