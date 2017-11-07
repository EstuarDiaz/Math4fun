let videos = {
  'lorenzAttractor': ['WepOorvo2I4','HfD1OsP-Bv8','d0Z8wLLPNE0','f0lkz2gSsIk'],
  'mandelbrotSet': ['NGMRB4O922I','d0vY0CKYhPY','4LQvjSf6SSw','6z7GQewK-Ks']
};

addVideos2(videos[lorenzAttractor]);

function addVideos2(videos){
    $("#myVideos").append($('<div class="slideshow-container"><div class="mySlides fade"><div class="numbertext">1 / 3</div><img src="img_nature_wide.jpg" style="width:100%"><div class="text">Caption Text</div></div><div class="mySlides fade"><div class="numbertext">2 / 3</div><img src="img_fjords_wide.jpg" style="width:100%"><div class="text">Caption Two</div></div><div class="mySlides fade"><div class="numbertext">3 / 3</div><img src="img_mountains_wide.jpg" style="width:100%"><div class="text">Caption Three</div></div><a class="prev" onclick="plusSlides(-1)">&#10094;</a><a class="next" onclick="plusSlides(1)">&#10095;</a></div><br><div style="text-align:center"><span class="dot" onclick="currentSlide(1)"></span><span class="dot" onclick="currentSlide(2)"></span><span class="dot" onclick="currentSlide(3)"></span></div>')
  );
}


var slideIndex = 1;
showSlides(slideIndex);

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
