$(document).ready(function(){
    console.log("ready")
    $('#submit_button').click(LogIn);
});

function LogIn(){
    loggedin=false;
    
    username=document.getElementById("username").value;
    password=document.getElementById("password").value;

    console.log(username, password)

    $.post("/api/signin", {"username":username, "password":password})
    .done(function(data){
        sessionStorage.setItem("token", data["token"])
        sessionStorage.setItem("username", data["username"])
        window.location = "shoppinglist.html"
    })
    .fail(function(data){
        $('#status').html(data.responseJSON.error)
        console.log(data)
    })
  }