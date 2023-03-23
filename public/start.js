

function myFunction(){
    
    // alert("hel");
    // console.log("hel2")
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

