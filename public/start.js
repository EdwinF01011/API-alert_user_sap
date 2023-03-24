

function myFunction(){
    
    // alert("hel");
    // console.log("hel2")
    var cedula1 = document.getElementById("txtUsersap001").value;
    var cedula2 = document.getElementById("txtUsersap002").value;

    console.log(cedula1);
    console.log(cedula2);

    // alert(cedula1,cedula2);

    var div = document.getElementById("alert-ok");
    var div2 = document.getElementById("alert-ok2");

    if (div.style.display === "none" && div2.style.display === "none") {
        div.style.display = "block";
        div2.style.display = "block";
    }else{
        div.style.display = "none";
        div2.style.display = "none";
    }
}

