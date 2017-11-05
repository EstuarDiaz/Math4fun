$(function(){
    /*$("#main").prepend($('<div class="header box">'+
        '<div class="box icon">'+
            '<img src="imgs/icon.png" class="img-circle" onclick="openNav()" alt="MathIsFun" width="100">'+
        '</div>'+
        '<div class="box title"><h1>Math4fun</h1></div>'+
    '</div>'));*/
    $("#main").prepend($('<div class="header box">'+
        '<div onclick="openNav()" class="icon">&#9776; Menu</div>'+
        '<div class="title">Lorenz Attractor</div>'+
    '</div>'));
    $("#main").prepend($('<div id="overLayout" class="overlay" onclick="closeNav()"></div>'));
    $("body").append($('<div id="mySidenav" class="sidenav">'+
      '<a class="closebtn icon" onclick="closeNav()">&times;</a>'+
      '<center><div class="box icon">'+
          '<img src="../imgs/icon.png" class="img-circle" id="icon" alt="MathIsFun" width="100">'+
      '</div></center>'+
      '<a href="../../Math4fun.html"></a>'+
      '<div class="customHr">.</div>'+
      '<a onclick="closeNav()" href="#content">Content</a>'+
      '<a onclick="closeNav()" href="#video">Video</a>'+
      '<a onclick="closeNav()" href="#info">Info.</a>'+
      '<a onclick="closeNav()" href="#ref">References</a>'+
      '<a onclick="closeNav()" href="#download">Download</a>'+
      '<a onclick="closeNav()" href="#contact">Contact</a>'+
    '</div>'));
    $("#main").prepend($('<div class="box footer" id="contact">Footer Links, mail, youtube, facebook</div>'));
});

function loadStart(){
    $("#overLayout").css("opacity","0.8");
    $("#overLayout").css("width","100%");
}

function loadEnd(){
    $("#overLayout").css("opacity","0");
    $("#overLayout").css("width","0%");
}

function openNav() {
    $("#mySidenav").css("width","300px");
    $("#main").css("marginLeft","300px");
    $("#overLayout").css("width","100%");
    $("#overLayout").css("opacity","0.4");
    $("#icon").toggleClass("rotate1");
    setTimeout(function(){
        $("#icon").toggleClass("rotate1");
    }, 800);
}

function closeNav() {
    $("#main").css("marginLeft","0px");
    $("#mySidenav").css("width","0px");
    $("#overLayout").css("opacity","0");
    $("#overLayout").css("width","0%");
    $("#icon").toggleClass("rotate2");
    setTimeout(function(){
        $("#icon").toggleClass("rotate2");
    }, 800);
}
