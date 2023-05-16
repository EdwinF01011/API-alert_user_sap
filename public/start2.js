
function getAlertUser(txtUsersap,table) {
	// alert(txtUsersap);

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

			if (table == 'tabla1') {
				// -----------------Tabla-----------------
				let str = '';//creamos una variable para concatenar los datos
				alert_total = data.message.length;
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
																		'<input class="form-check-input" type="checkbox" role="switch"' +
																			+'id="flexSwitchCheckChecked" checked>'
							+'</div>'
							
							+

						'</td>' +
						'<td>' + i + '</td>'

						'</tr>';//concatenamos cada dato en la variable str
					// alert_total=data.message[i]['id__'];

				}
				tbody.innerHTML = str;//agregamos la variable str al cuerpo de la tabla
			} else {
				// -----------------Tabla-----------------
				var tbody = document.getElementById(table);//obtenemos el cuerpo de la tabla
				let str = '';//creamos una variable para concatenar los datos
				for (var i = 0; i < data.message.length; i++) {//recorremos el arreglo de datos
					str += '<tr>'
						+ '<th>&nbsp;</th>'
						+ '<td>' + data.message[i]['Code'] + '</td>'
						+ '<td>' + data.message[i]['Name'] + '</td>' +
						'</tr>';//concatenamos cada dato en la variable str
				}
				tbody.innerHTML = str;//agregamos la variable str al cuerpo de la tabla
			}

		})

}