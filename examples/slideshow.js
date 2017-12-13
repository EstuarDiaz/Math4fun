$(function(){

  var slideInfo = [{text:"HOLA1",imgSource:"../imgs/mandelbrotview.png"},
                  {text:"HOLA2",imgSource:"../imgs/bg1.jpg"}];
  addSlideShow("body","slideShow",slideInfo);
  var slideIndex = 1;
  showSlides(slideIndex);
});

function addSlideShow(parentId,id,slideInfo){
  var a = 0;
  alert(a++);
  addContainer(parentId,id,id,"slideshow-container");
  alert(a++);
  addSlides(id,slideInfo);
  alert(a++);
  addSlidesButtons(id);
  alert(a++);
  addSlidesDots(id,slideInfo.length);
  alert(a++);
}

function addContainer(parentId,id,name,classname){
  $("#"+parentId).append($('<div id="'+id+'" name="'+name+'" class="'+classname+'">'));
}

/*
parentId: (String) the id of the parent conainer to append the slides
slideInfo: (Array of Object{text,imgSource}) contains the data to put in the slider
*/
function addSlides(parentId,slideInfo){
  for(var i = 0; i < slideInfo.length; i++){
    $("#"+parentId).append($('<div class="mySlides fade">'
                            +'<div class="numbertext">'+(i+1)+' / '+slideInfo.length+'</div>'
                            +'<img src="'+slideInfo[i].imgSource+'" style="width:100%">'
                            +'<div class="text">'+slideInfo[i].text+'</div>'
                          +'</div>'));
  }
}

function addSlidesButtons(parentId){
  $("#"+parentId).append('<a class="prev" onclick="plusSlides(-1)">&#10094;</a>'
  +'<a class="next" onclick="plusSlides(1)">&#10095;</a><br>');
}

function addSlidesDots(parentId,n){
  $("#"+parentId).append('<div id="'+parentId+'Dots" style="text-align:center">');
  for(var i = 1; i <= n; i++){
    $("#"+parentId+"Dots").append('<span class="dot" onclick="currentSlide('+i+')"></span>');
  }
}

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}
