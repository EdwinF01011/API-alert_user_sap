

//-----------------Fetchs-----------------


// function transferAlert(){

//     // myFunction();

//     fetch('/api/getValueHtml',
//     {
//         method:'POST',
//         body: JSON.stringify({
//             txtUsersap001:document.getElementById("txtUsersap001").value,
//             txtUsersap002:document.getElementById("txtUsersap002").value
//         })
//         ,headers: {
//             'Content-Type': 'application/json'
//         }
//     }).then(res => res.json()).then(data => {
//         var alert_ok = document.getElementById("alert-ok");
//         alert_ok.classList.remove("d-none");
//         alert_ok.innerText=data.message;
//         // alert(data.message)
//     });

//     // lg.one()

//     // alert(params.cedula1);


//     // console.log(lg.param.cedula1);
//     // console.log(lg.param.cedula2);
// }

function alertDelete() {
    let alert_ok = document.getElementById("alert-ok");
    let alert_err = document.getElementById("alert-err");
    alert_ok.classList.add("d-none");
    alert_err.classList.add("d-none");

    if (window.confirm('¿Seguro de Eliminar las alertas del usuario ' + document.getElementById("txtUsersap002").value + '?')) {

        fetch('/alert/delete', {
            method: 'POST',
            body: JSON.stringify({
                txtUsersap002: document.getElementById("txtUsersap002").value
            })
            , headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then(data => {

            if (data.message == true) {
                // var alert_ok = document.getElementById("alert-ok");
                alert_ok.classList.remove("d-none");
                // alert_ok.innerText=data.message;
                alert_ok.innerText = 'Alertas eliminadas correctamente';

            } else if (data.message == 'Not exist alerts') {

                alert_err.classList.remove("d-none");
                alert_err.innerText = 'No hay alertas para eliminar';
            }
            else {
                // var alert_err = document.getElementById("alert-err");
                alert_err.classList.remove("d-none");
                // alert_err.innerText=data.message;
                alert_err.innerText = 'Error, please try again';
            }
        });
    }
}

function transferAlert() {

    let alert_ok = document.getElementById("alert-ok");
    let alert_err = document.getElementById("alert-err");
    alert_ok.classList.add("d-none");
    alert_err.classList.add("d-none");
    // myFunction();

    if (window.confirm('Seguro de realizar la acción?')) {

        fetch('/new', {
            method: 'POST',
            body: JSON.stringify({
                txtUsersap001: document.getElementById("txtUsersap001").value,
                txtUsersap002: document.getElementById("txtUsersap002").value
            })
            , headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then(data => {

            if (data.message == true) {
                // var alert_ok = document.getElementById("alert-ok");
                alert_ok.classList.remove("d-none");
                // alert_ok.innerText=data.message;
                alert_ok.innerText = 'Action done successfully';

            } else if (data.message == 'Not exist alerts') {
                alert_err.classList.remove("d-none");
                alert_err.innerText = 'No hay alertas para Asignar';
            }
            else {
                // var alert_err = document.getElementById("alert-err");
                alert_err.classList.remove("d-none");
                // alert_err.innerText=data.message;
                alert_err.innerText = 'Error, please try again';
            }

        }).catch(err => {
            var alert_err = document.getElementById("alert-err");
            alert_err.classList.remove("d-none");
            alert_err.innerText = err;
        });
    }
}

function xx (){

    fetch("/alert/post",
    {
        method: 'POST',
            body: JSON.stringify({
                txtUsersap001: document.getElementById("txtUsersap001").value,})
            , headers: {
                'Content-Type': 'application/json'}
        }).then(res => res.json()).then( data =>{

            // -----------------Tabla-----------------
            var tbody = document.getElementById("tabla1");//obtenemos el cuerpo de la tabla
            let str = '';//creamos una variable para concatenar los datos
            for(var i = 0; i < data.message.length; i++){//recorremos el arreglo de datos
                str += '<tr> <td>'+data.message[i]['Code']+'</td>'
                            +'<td>'+data.message[i]['Name']+'</td>'
                            // +'<td>'+data.message[i]['UserSign']+'</td>'
                            +'<td class="form-check form-switch">'+
                                '<input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" checked>'+
                                '<label class="form-check-label" for="flexSwitchCheckChecked">Habilitado</label>'+
                            '</td>'+
                        '</tr>';//concatenamos cada dato en la variable str
            }
            tbody.innerHTML = str;//agregamos la variable str al cuerpo de la tabla


            // tbody.innerHTML = '<tr> <td>'+data.message[i]['Code']+'</td>'
            //                         +'<td>'+data.message[i]['Active']+'</td>'
            //                         +'<td>'+data.message[i]['UserSign']+'</td></tr>';
    })

}

function getAlertUser(txtUsersap,table){
    
    fetch("/alert/get",
        {
            method: 'POST',
            body: JSON.stringify({
                txtUsersap: txtUsersap})
            , headers: {
                'Content-Type': 'application/json'}
        }).then(res => res.json()).then( data =>{

            var tbody = document.getElementById(table);//obtenemos el cuerpo de la tabla

            if (table=='tabla1') {
                // -----------------Tabla-----------------
                let str = '';//creamos una variable para concatenar los datos
                for(var i = 0; i < data.message.length; i++){//recorremos el arreglo de datos
                    str += '<tr>'
                                // +'<th>&nbsp;<p>   </p></th>'
                                +'<td>'+data.message[i]['Code']+'</td>'
                                +'<td>'+data.message[i]['Name']+'</td>'
                                // +'<td>'+data.message[i]['UserSign']+'</td>'
                                +'<td class="form-check form-switch">'+
                                    '<input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" checked>'+
                                    '<label class="form-check-label" for="flexSwitchCheckChecked">Habilitado</label>'+
                                '</td>'+
                            '</tr>';//concatenamos cada dato en la variable str
                }
                tbody.innerHTML = str;//agregamos la variable str al cuerpo de la tabla
            }else{
                // -----------------Tabla-----------------
                var tbody = document.getElementById(table);//obtenemos el cuerpo de la tabla
                let str = '';//creamos una variable para concatenar los datos
                for(var i = 0; i < data.message.length; i++){//recorremos el arreglo de datos
                    str += '<tr>'
                                +'<th>&nbsp;</th>'
                                +'<td>'+data.message[i]['Code']+'</td>'
                                +'<td>'+data.message[i]['Name']+'</td>'+
                            '</tr>';//concatenamos cada dato en la variable str
                }
                tbody.innerHTML = str;//agregamos la variable str al cuerpo de la tabla
            }

        })
}

function getSearchResults(event, x){
    var keyValue = event.key;//a,b,c,0,1,2
    var codeValue = event.which;
    if((codeValue >= 48 && codeValue <= 57)
        ||(codeValue >= 65 && codeValue <= 90)
            ||(codeValue >= 97 && codeValue <= 122)){
        console.log("keyup event, keyValue: " + codeValue);

        fetch("/alert/post",
        {
            method: 'POST',
            body: JSON.stringify({
                txtUsersap001: document.getElementById("txtUsersap001").value,})
            , headers: {
                'Content-Type': 'application/json'}
        }).then(res => res.json()).then( data =>{
            // -----------------Tabla-----------------
            var tbody = document.getElementById("tabla1");//obtenemos el cuerpo de la tabla
            let str = '';//creamos una variable para concatenar los datos
            for(var i = 0; i < data.message.length; i++){//recorremos el arreglo de datos
                str += '<tr>'
                            // +'<th>&nbsp;<p>   </p></th>'
                            +'<td>'+data.message[i]['Code']+'</td>'
                            +'<td>'+data.message[i]['Name']+'</td>'
                            // +'<td>'+data.message[i]['UserSign']+'</td>'
                            +'<td class="form-check form-switch">'+
                                '<input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" checked>'+
                                '<label class="form-check-label" for="flexSwitchCheckChecked">Habilitado</label>'+
                            '</td>'+
                        '</tr>';//concatenamos cada dato en la variable str
            }
            tbody.innerHTML = str;//agregamos la variable str al cuerpo de la tabla
        })
    }
}

function getSearchResults2(event, x){
    var keyValue = event.key;//a,b,c,0,1,2
    var codeValue = event.which;
    if((codeValue >= 48 && codeValue <= 57)
        ||(codeValue >= 65 && codeValue <= 90)
            ||(codeValue >= 97 && codeValue <= 122)){
        console.log("keyup event, keyValue: " + codeValue);

        fetch("/alert/post",
        {
            method: 'POST',
            body: JSON.stringify({
                txtUsersap001: document.getElementById("txtUsersap002").value,})
            , headers: {
                'Content-Type': 'application/json'}
        }).then(res => res.json()).then( data =>{
            // -----------------Tabla-----------------
            var tbody = document.getElementById("tabla2");//obtenemos el cuerpo de la tabla
            let str = '';//creamos una variable para concatenar los datos
            for(var i = 0; i < data.message.length; i++){//recorremos el arreglo de datos
                str += '<tr>'
                            +'<th>&nbsp;</th>'
                            +'<td>'+data.message[i]['Code']+'</td>'
                            +'<td>'+data.message[i]['Name']+'</td>'+
                        '</tr>';//concatenamos cada dato en la variable str
            }
            tbody.innerHTML = str;//agregamos la variable str al cuerpo de la tabla
        })
    }
}

// document.addEventListener('keyup', (event) => {
//     var keyValue = event.key;
//     var codeValue = event.code;
//     console.log("keyup event, keyValue: " + keyValue);
//     console.log("keyup event, codeValue: " + codeValue);
// }, false);


function genera_tabla() {
    // Obtener la referencia del elemento body
    var body = document.getElementsByTagName("table")[0];

    // Crea un elemento <table> y un elemento <tbody>
    var tabla = document.createElement("table");
    var tblBody = document.createElement("tbody");

    // Crea las celdas
    for (var i = 0; i < 2; i++) {
        // Crea las hileras de la tabla
        var hilera = document.createElement("tr");

        for (var j = 0; j < 2; j++) {
            // Crea un elemento <td> y un nodo de texto, haz que el nodo de
            // texto sea el contenido de <td>, ubica el elemento <td> al final
            // de la hilera de la tabla
            var celda = document.createElement("td");
            var textoCelda = document.createTextNode("celda en la hilera " + i + ", columna " + j);
            celda.appendChild(textoCelda);
            hilera.appendChild(celda);
        }

        // agrega la hilera al final de la tabla (al final del elemento tblbody)
        tblBody.appendChild(hilera);
    }

    // posiciona el <tbody> debajo del elemento <table>
    tabla.appendChild(tblBody);
    // appends <table> into <body>
    body.appendChild(tabla);
    // modifica el atributo "border" de la tabla y lo fija a "2";
    tabla.setAttribute("border", "2");
}



