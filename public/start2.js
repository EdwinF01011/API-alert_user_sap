

// variables globales

let alerts_user = [];
let alerts_user2 = [];
let alerts_total = 0;
let alerts_total2 = 0;

const btn_select= '<button  onclick="change_flexSwitch_true('+"'t1'"+')" class="btn btn-primary " '+
				'type="button">All</button>'+
				'<button  onclick="change_flexSwitch_false('+"'t1'"+')" class="btn btn-primary" ' +
				'type="button">None</button>';
const btn_select1= '<button  onclick="change_flexSwitch_true('+"'t2'"+')" class="btn btn-primary " '+
				'type="button">All</button>'+
				'<button  onclick="change_flexSwitch_false('+"'t2'"+')" class="btn btn-primary" ' +
				'type="button">None</button>';


function getAlertUser(txtUsersap,table) {

	var tbody = document.getElementById(table);//obtenemos el cuerpo de la tabla
	tbody.innerHTML = '';//limpiamos el cuerpo de la tabla

	fetch("/alert/get",
		{
			method: 'POST',
			body: JSON.stringify({
				txtUsersap: txtUsersap
			})
			, headers: {
				'Content-Type': 'application/json'
			}
		}).then(res => res.json()).then(data => {

			var tbody = document.getElementById(table);//obtenemos el cuerpo de la tabla

			if (table == 'tabla1' && data.message.length > 0) {

				document.getElementById('btn-tranferirAlertas').disabled = false;//habilita el botón de transferir
				document.getElementById('btn-asignar-alerta-center').disabled = false;//habilita el botón de transferir
				document.getElementById('div_btn_select').innerHTML = btn_select;//habilita el botón de transferir

				
				// -----------------Tabla-----------------
				let str = '';//creamos una variable para concatenar los datos
				alerts_total = data.message.length;
				for (var i = 0; i < data.message.length; i++) {//recorremos el arreglo de datos
					str += '<tr id="fila' + i + '">'
						// +'<th>&nbsp;<p>   </p></th>'
						+ '<td>' + i + '</td>'
						+ '<td>' + data.message[i]['Name'] + '</td>'
						+ '<td>' + data.message[i]['Code'] + '</td>'
						// +'<td>'+data.message[i]['UserSign']+'</td>'
						+ '<td >' +//class="form-check form-switch"
							// '<input onchange="imprimir(' + i + ')" class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked' + i + '" checked>' +
							// '<label class="form-check-label" for="flexSwitchCheckChecked"></label>'
							'<div class="form-check form-switch">' +
													'<input onchange="change_flexSwitchCheckChecked('+"'t1'"+')"  class="form-check-input" type="checkbox" role="switch"' //onchange="imprimir('+i+')" //change_flexSwitchCheckChecked(table)
																		+'id="flexSwitchCheckChecked'+i+'" checked>'
							+'</div>'+
						'</td>' +
						'</tr>';//concatenamos cada dato en la variable str
					// alert_total=data.message[i]['id__'];
				}
				tbody.innerHTML = str;//agregamos la variable str al cuerpo de la tabla
				showToast_G();
			} else if(table == 'tabla2' && data.message.length > 0){

				document.getElementById('btn-quitarAlertas').disabled = false;
				document.getElementById('div_btn_select1').innerHTML = btn_select1;

				alerts_total2 = data.message.length;
				// -----------------Tabla-----------------
				var tbody = document.getElementById(table);//obtenemos el cuerpo de la tabla
				let str = '';//creamos una variable para concatenar los datos
				for (var i = 0; i < data.message.length; i++) {//recorremos el arreglo de datos
					str += '<tr id="fila_' + i + '">'//fila_
						+ '<td>' + i + '</td>'
						+ '<td>' + data.message[i]['Name'] + '</td>' 
						+ '<td>' + data.message[i]['Code'] + '</td>'
						+ '<td >' +
							'<div class="form-check form-switch">' +
									'<input onchange="change_flexSwitchCheckChecked('+"'t2'"+')" class="form-check-input" type="checkbox" role="switch"' //onchange="imprimir('+i+')"
													+'id="flexSwitchCheckChecked_'+i+'" checked>'
							+'</div>'
						+'</td>' +
					'</tr>';//concatenamos cada dato en la variable str
				}
				tbody.innerHTML = str;//agregamos la variable str al cuerpo de la tabla
				showToast_G();
			}else{
				showToast_N();
			}
		}).catch(err => {
			showToast_E();
			// showToast_N()
		});
}

function tranferAlert() {
	// alert('tranferAlert');
	var txt2= document.getElementById("txtUsersap002").value

	if (window.confirm('Seguro de realizar la acción?') && txt2 != '') {
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
				alert('Transferencia exitosa');
			} else if (data.message == 'Not exist alerts') {
				alert('No existen alertas para transferir');
			}
			else {
				alert('Error al transferir');
			}
		}).catch(err => {
			// var alert_err = document.getElementById("alert-err");
			// alert_err.classList.remove("d-none");
			// alert_err.innerText = err;
			alert('Error al transferir');
		});
	}
}

function tranferAlert2(switchCh,table) {
	getCodeAlerts(switchCh,table);
	if (window.confirm('Seguro de realizar la acción?')) {
		fetch('/new2', {
			method: 'POST',
			body: JSON.stringify({
				txtUsersap001: document.getElementById("txtUsersap001").value,
				txtUsersap002: document.getElementById("txtUsersap002").value,
				alerts_user: alerts_user
			})
			, headers: {
				'Content-Type': 'application/json'
			}
		}).then(res => res.json()).then(data => {
			console.log('test...');
			
			if (data.message == true) {
				// alert('Transferencia exitosa');
				showToast_G()
			} else if (data.message == 'Not exist alerts') {
				// alert('No existen alertas para transferir');
				showToast_N()

			}
			else {
				// alert('Error al transferir');
				showToast_E()
			}
		}).catch(err => {
			// alert('Error al transferir');
			showToast_E()
			console.log(err);
		});
	}
}

function alertDelete(switchCh,table) {

	getCodeAlerts(switchCh,table);

    if (window.confirm('¿Seguro de Eliminar las alertas del usuario ' + document.getElementById("txtUsersap002").value + '?')) {

        fetch('/alert/delete2', {
            method: 'POST',
            body: JSON.stringify({
                txtUsersap002: document.getElementById("txtUsersap002").value,
				alerts_user2: alerts_user2
            })
            , headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then(data => {

            if (data.message == true) {
				// alert('Eliminación exitosa');
				showToast_G();
            // } else if (data.message == 'Not exist alerts') {
            } else if (data.message == false) {
				// alert('No existen alertas para eliminar');
				showToast_E();
            }
            else {
				showToast_E();

				// alert('Error al eliminar_');
            }
        });
    }
}

function showToast_G() {//https://getbootstrap.com/docs/5.0/components/toasts/
	return new bootstrap.Toast(liveToastGood, {animation:true,autohide:true ,delay:5000}).show();
}
function showToast_E() {//https://getbootstrap.com/docs/5.0/components/toasts/
return new bootstrap.Toast(liveToastErr, {animation:true,autohide:true ,delay:5000}).show();
}

function showToast_N() {//https://getbootstrap.com/docs/5.0/components/toasts/
	return new bootstrap.Toast(liveToastNothing, {animation:true,autohide:true ,delay:5000}).show();
	}

function imprimir(id) {
    
    var flex = document.getElementById("flexSwitchCheckChecked"+id).checked;

    // flex.addEventListener("click", function(e) {
    //     e.value
    // });

    console.log(flex+' '+id);
}

function getElementTable() {
    
    let getFila = document.getElementsByTagName("5");

    let getData = document.getElementsByTagName("td");
    // let getData = document.getElementsByTagName("tr");
    // console.log(getFila );

    // var alert_total;
    
    
    for (let i = 0; i < alerts_total; i++) {
        // const element = array[i];

        
        // var x = getData[i].getElementsByTagName("td");
        var x = getData[i];

        var flex = document.getElementById("flexSwitchCheckChecked"+i).checked;
        // flex.addEventListener("click", function(e) {
        //     e.value
        // });

        if(flex == true){
            // alert('is check');
            console.log(flex +'--s'+i);
        }

        // alert(x)
    }
    alert(alerts_total);

}

function getCodeAlerts(switchCh,table) {//obtener el código de las alertas seleccionadas
	
	if(table == 't1'){
		for (let i = 0; i < alerts_total; i++) {
        // var rowCheck = document.getElementById("flexSwitchCheckChecked"+i).checked;
        var rowCheck = document.getElementById(switchCh+i).checked;
		if (rowCheck == true) {
			var x = document.getElementById("fila" + i).getElementsByTagName("td");
			// console.log(x[2].innerHTML);
			alerts_user.push(x[2].innerHTML);
		}
	}
	}else{
		for (let i = 0; i < alerts_total2; i++) {
			// var rowCheck = document.getElementById("flexSwitchCheckChecked"+i).checked;
			var rowCheck = document.getElementById(switchCh+i).checked;
			if (rowCheck == true) {
				var x = document.getElementById("fila_" + i).getElementsByTagName("td");
				// console.log(x[2].innerHTML);
				alerts_user2.push(x[2].innerHTML);
			}
		}	
	}
	// console.log('alerts_user: '+alerts_user);
	// console.log('alerts_user2: '+alerts_user2);
}

function change_flexSwitch_true(table) {

	if (table == 't1') {
		document.getElementById('btn-tranferirAlertas').disabled = false;//habilita el botón de transferir
		document.getElementById('btn-asignar-alerta-center').disabled = false;//habilita el botón de transferir
		for (let i = 0; i < alerts_total; i++) {
			document.getElementById("flexSwitchCheckChecked"+i).checked = true//cambia el estado del switch
		}
	}else{
		document.getElementById('btn-quitarAlertas').disabled = false;
		for (let i = 0; i < alerts_total2; i++) {
			document.getElementById("flexSwitchCheckChecked_"+i).checked = true//cambia el estado del switch
		}
	}
}

function change_flexSwitch_false(table) {

	if (table == 't1') {
		document.getElementById('btn-tranferirAlertas').disabled = true;//deshabilita el botón de transferir
		document.getElementById('btn-asignar-alerta-center').disabled = true;//deshabilita el botón de transferir
		for (let i = 0; i < alerts_total; i++) {
			document.getElementById("flexSwitchCheckChecked"+i).checked = false//cambia el estado del switch
		}
	}else{
		document.getElementById('btn-quitarAlertas').disabled = true;
		for (let i = 0; i < alerts_total2; i++) {
			document.getElementById("flexSwitchCheckChecked_"+i).checked = false//cambia el estado del switch
		}
	}
}

function changeText(table) {

	// if(document.getElementById("txtUsersap001").value != '' || document.getElementById("txtUsersap002").value != ''){
	// 	document.getElementById('btn-tranferirAlertas').disabled = true;//habilita el botón de transferir
	// 	document.getElementById('btn-asignar-alerta-center').disabled = true;//habilita el botón de transferir
	// 	alert('changeText');
	// }

	
	
	if(table == 't1'){
		let div_btn_select = document.getElementById('div_btn_select');//div de botónes de seleccionar todos
		div_btn_select.innerHTML = '';//oculta el div de botónes de seleccionar todos
		document.getElementById('btn-tranferirAlertas').disabled = true;//deshabilita el botón de transferir
		document.getElementById('btn-asignar-alerta-center').disabled = true;//deshabilita el botón de transferir
		change_flexSwitch_false('t1')
		alerts_total=0;
		
	}else{
		let div_btn_select1 = document.getElementById('div_btn_select1');//div de botónes de seleccionar todos
		div_btn_select1.innerHTML = '';//oculta el div de botónes de seleccionar todos
		document.getElementById('btn-quitarAlertas').disabled = true;
		change_flexSwitch_false('t2')
		alerts_total2=0;
	}
}

function change_flexSwitchCheckChecked(table) {
//Controla que si hay un switch activado se habilite el botón de transferir
	var v=0;
	let i
	// console.log(':v');
	if(table == 't1'){
		for ( i = 0; i < alerts_total; i++) {
			var value = document.getElementById("flexSwitchCheckChecked"+i).checked
			// console.log(value+	'--'+alerts_total);
			if(value == false){
				++v;
			}
		}
		if(v == alerts_total){
			document.getElementById('btn-tranferirAlertas').disabled = true;
			document.getElementById('btn-asignar-alerta-center').disabled = true;
		}else{
			document.getElementById('btn-tranferirAlertas').disabled = false;
			document.getElementById('btn-asignar-alerta-center').disabled = false;
		}
	}else if(table == 't2'){
		for ( i= 0; i < alerts_total2; i++) {
			var value = document.getElementById("flexSwitchCheckChecked_"+i).checked
			if(value == false){
				++v;
			}
		}
		if(v == alerts_total2){
			document.getElementById('btn-quitarAlertas').disabled = true;
		}else{
			document.getElementById('btn-quitarAlertas').disabled = false;
		}
	}
}












// 		SVGs

// exclamation-circle
// <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
//   <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
// </svg>


// check-circle
/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
	<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" />
</svg> */







