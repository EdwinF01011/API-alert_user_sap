
// //-----------------servidor-----------------
// const express = require("express");
// const app = express();
// let a =app.listen(8081, () => {
//     console.log("Server running 8081port                              ＼(ﾟｰﾟ＼)");
// })

// const path = require("path");

// // let a = app.get("/", (req,res)=>{
// //     // res.sendFile(path.resolve(__dirname,'./views/index.html'));
// //     res.sendFile(path.join(__dirname,'../public/index.html'));
// // })


// //-----------------exportar funciones-----------------
// module.exports = {
//     a:a
// }


const text = "hola mundo";
const crypto = require('crypto')
algorithm = 'aes-256-ctr';
password = '123456';
console.log('-->');
//método para encriptar texto
function encrypt(text){
    var cipher = crypto.createCipher(algorithm,password)
    var crypted = cipher.update(text,'utf8','hex')
    crypted += cipher.final('hex');
    return crypted;
}

//método para desencriptar texto
function decrypt(text){
    var decipher = crypto.createDecipher(algorithm,'123455')
    var dec = decipher.update(text,'hex','utf8')
    dec += decipher.final('utf8');
    return dec;
}
var x=encrypt(text);
var y=decrypt(x);

console.log(x);
console.log(y);

console.log('<--');
