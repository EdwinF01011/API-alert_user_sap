

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

function alertDelete(){
    let alert_ok = document.getElementById("alert-ok");
    let alert_err = document.getElementById("alert-err");
    alert_ok.classList.add("d-none");
    alert_err.classList.add("d-none");

    if(window.confirm('¿Seguro de Eliminar las alertas del usuario '+document.getElementById("txtUsersap002").value + '?')){
        
        fetch('/alert/delete', {
            method:'POST',
                body: JSON.stringify({
                    txtUsersap002:document.getElementById("txtUsersap002").value
                })
                ,headers: {
                    'Content-Type': 'application/json'
                }
        }).then(res => res.json()).then(data => {
    
            if (data.message == true) {
                // var alert_ok = document.getElementById("alert-ok");
                alert_ok.classList.remove("d-none");
                // alert_ok.innerText=data.message;
                alert_ok.innerText='Alertas eliminadas correctamente';
                
            }else if(data.message == 'Not exist alerts'){

                alert_err.classList.remove("d-none");
                alert_err.innerText='No hay alertas para eliminar';
            }
            else{
                // var alert_err = document.getElementById("alert-err");
                alert_err.classList.remove("d-none");
                // alert_err.innerText=data.message;
                alert_err.innerText='Error, please try again';
            }
        });
    }
}

function transferAlert(){
    
    let alert_ok = document.getElementById("alert-ok");
    let alert_err = document.getElementById("alert-err");
    alert_ok.classList.add("d-none");
    alert_err.classList.add("d-none");
    // myFunction();

    if(window.confirm('Seguro de realizar la acción?')){
        
        fetch('/new',{
            method:'POST',
            body: JSON.stringify({
                txtUsersap001:document.getElementById("txtUsersap001").value,
                txtUsersap002:document.getElementById("txtUsersap002").value
            })
            ,headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then(data => {
    
            if (data.message == true) {
                // var alert_ok = document.getElementById("alert-ok");
                alert_ok.classList.remove("d-none");
                // alert_ok.innerText=data.message;
                alert_ok.innerText='Action done successfully';
                
            }else if(data.message == 'Not exist alerts'){
                alert_err.classList.remove("d-none");
                alert_err.innerText='No hay alertas para Asignar';
            }
            else{
                // var alert_err = document.getElementById("alert-err");
                alert_err.classList.remove("d-none");
                // alert_err.innerText=data.message;
                alert_err.innerText='Error, please try again';
            }
    
        }).catch(err => {
            var alert_err = document.getElementById("alert-err");
            alert_err.classList.remove("d-none");
            alert_err.innerText=err;
        });
    }
}


