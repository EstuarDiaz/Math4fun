// $(function(){
//     addNav();
    // loadStart();
    // addContentHeader('Mandelbrot set');
    // addContentHeader('Lorenz Attractor');
    // addInspiration('bg1.jpg','"However impenetrable it seems, if you don\'t try it, then you can never do it." - Andrew Wiles');
    // addInterface();
    // mySet(function(){
    //     start(loadEnd);
    //     showNav();
    // });
//
// });

$(function(){
  addNav();
  loadStart();
  selectSketch(2);
});

function tryCall(callback){
    if(callback && typeof(callback) === "function"){
        callback();
    }
}
function loadStart(){
    $("#overLayout").css({'opacity': '1','width': '100%'});
}

function loadEnd(){
    $("#overLayout").css({'opacity': '0','width': '0%'});
}

function addNav(){
    $("body").append($('<div id="mySidenav" class="sidenav">'+
      '<a class="closebtn icon" onclick="closeNav()">&times;</a>'+
      '<center><div class="box icon">'+
          '<img src="../imgs/icon.png" class="img-circle" id="icon" alt="MathIsFun" width="100">'+
      '</div></center>'+
      '<a href="../../Math4fun.html"></a>'+
      '<div class="customHr">.</div>'+
      '<a onclick="closeNav()" href="#mycontent">Content</a>'+
      '<a onclick="closeNav()" href="#myVideos">Videos</a>'+
      '<a onclick="closeNav()" href="#info">Info.</a>'+
      '<a onclick="closeNav()" href="#ref">References</a>'+
      '<a onclick="closeNav()" href="#download">Download</a>'+
    '</div>'));
    $("#main").prepend($('<div id="overLayout" class="overlay" onclick="closeNav()"></div>'));
}

function addContentHeader(title){
  if($("#title").length){
    $("#title").text(title);
  }
  else{
    $("#main").prepend($('<div class="header box" id="header">'+
        '<div id="menubtn" class="menubtn icon" onclick="openNav()">>></div>'+
        '<div class="title" id ="title">'+title+'</div>'+
    '</div>'));
    $("#header").append($('<div class="box contact" id="contact">'+
              '<div class="social"><center>'+
                '<a class="icon fa fa-facebook" target="_blank" href="https://www.facebook.com/math4fun.official/"></a>'+
                '<a class="icon fa fa-youtube-play" target="_blank" href="https://www.youtube.com/channel/UCpsg7jMWp-v4RF7nPkX1C0Q"></a>'+
                 '<a class="icon fa fa-twitter" target="_blank" href="https://www.facebook.com/math4fun.official/"></a>'+
                '<a class="icon fa fa-google-plus" target="_blank" href="https://plus.google.com/u/0/b/117031559616995776445/117031559616995776445"></a>'+
              '</div><center></div>'));
  }
}

function addInspiration(img,text){
    $("#interface").append(('<div class="footer box" id="footer" style="background-image: url(\'../imgs/'+img+'\')">'+
        '<div class="transpbox"><p class="quote">'+text+'</p></div>'+
    '</div>'));
}

function addVideos(videos){
    $('#myVideos').append($('<h1/>',{'id':'vidTitle','class':'title'}).text('Related videos: '));
    videos.forEach(function(item){
      $("#myVideos").append(
        $('<iframe class="video" src="https://www.youtube.com/embed/'+item+'" frameborder="0" allowfullscreen></iframe>')
      );
    });
}

function addInfo(text){
    $('#info').append($('<h1/>',{'id':'infoTitle','class':'title'}).text('Info'));
    $('#info').append($('<p/>').text(text));
}

function addReference(text){
    $('#ref').append($('<h1/>',{'id':'refTitle','class':'title'}).text('References'));
    $('#ref').append($('<p/>').text(text));
}

function addDownload(filename){
    $('#download').append($('<h1/>',{'id':'refTitle','class':'title'}).text('Download'));
    $('#download').append($('<p/>').text(filename));
}

function myClear(){
    $("#interface").empty();
    tryCall(clearSketch);
}

function addInterface(){
    var blocks = ["mycontent","info","myVideos","related","ref","download"];
    blocks.forEach(function(item,index){
          $("#interface").append($('<div class="box '+item+'" id="'+item+'"></div>'));
    });
    $("#info").click(function(){
        loadStart();
        myClear();
        selectSketch(1);
    });
    $("#myVideos").click(function(){
        loadStart();
        myClear();
        selectSketch(2);
    });
}

function openNav() {
    $("#mySidenav").css("width","300px");
    $("#main").css("marginLeft","300px");
    $("#overLayout").css({'opacity': '0.5','width': '100%'});
    $("#icon").toggleClass("rotate1");
    setTimeout(function(){
        $("#icon").toggleClass("rotate1");
    }, 800);
}

function closeNav() {
    $("#main").css("marginLeft","0px");
    $("#mySidenav").css("width","0px");
    $("#overLayout").css({'opacity': '0','width': '0%'});
    $("#icon").toggleClass("rotate2");
    setTimeout(function(){
        $("#icon").toggleClass("rotate2");
    }, 800);
}

function showNav(){
    $("#menubtn").css({'background':'#82b74b'}).css({'background':'#223A5E'});
}
