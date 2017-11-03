$(document).ready(function(){
    $("#main").prepend($('<div class="header box"><span onclick="openNav()" class="icon">&#9776; Menu</span><main>'));
    $("#main").prepend($('<div id="myCanvasNav" class="overlay" onclick="closeNav()"></div>'));
    $("body").append($('<div id="mySidenav" class="sidenav">'+
      '<a class="closebtn icon" onclick="closeNav()">&times;</a>'+
      '<a href="../../Math4fun.html">Home</a>'+
      '<a href="#">Video</a>'+
      '<a href="#">Download</a>'+
      '<a href="#">Contact</a>'+
    '</div>'));
    $("#main").prepend($('<div class="box footer">Footer Links, mail, youtube, facebook</div>'));
    start(function(){
      
    });
});

function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
    document.getElementById("myCanvasNav").style.width = "100%";
    document.getElementById("myCanvasNav").style.opacity = "0.8";
}

function closeNav() {
    document.getElementById("main").style.marginLeft= "0";
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("myCanvasNav").style.opacity = "0";
    document.getElementById("myCanvasNav").style.width = "0%";
}
