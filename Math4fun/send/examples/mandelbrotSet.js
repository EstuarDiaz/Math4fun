
var scale = 0.05;
var iterations = 50;
var ctx;
var plane;
var rpos = 0;
var ipos = 0;
var maxR,minR,maxI,minI;

function start(callback){
	plane = document.getElementById("canvas");
	plane.width = $(window).width()-120-$("#process").width();
	plane.height = $("#process").height()+20;
	plane.style ="border:1px solid #000000;";
	document.getElementById("canvas").style.cursor = "crosshair";
	ctx = plane.getContext("2d");
	imgData = ctx.createImageData($(window).width()-120-$("#process").width(), $("#process").height()+20);
	document.getElementById("xpos").max = 2;
	document.getElementById("xpos").min = -2;
	document.getElementById("xpos").step = 0.05;
	document.getElementById("ypos").max = 2;
	document.getElementById("ypos").min = -2;
	document.getElementById("ypos").step = 0.005;
	document.getElementById("scale").max = 1;
	document.getElementById("scale").min = 0;
	document.getElementById("scale").step = 0.005;
	maxR = 2*plane.width/Math.min(plane.width,plane.height);
	minR = -2*plane.width/Math.min(plane.width,plane.height);
	maxI = 2*plane.height/Math.min(plane.width,plane.height);
	minI = -2*plane.height/Math.min(plane.width,plane.height);
	drawSet(callback);
}

function map(val,a1,b1,a2,b2){
	return ((b2-a2)*(val+a1)/(b1-a1))+a2;
}

function myResize(){
  plane.width = $(window).width()-120-$("#process").width();;
  plane.height = $("#process").height()+20;
	maxR = 2*plane.width/Math.min(plane.width,plane.height);
	minR = -2*plane.width/Math.min(plane.width,plane.height);
	maxI = 2*plane.height/Math.min(plane.width,plane.height);
	minI = -2*plane.height/Math.min(plane.width,plane.height);
}

window.onresize = function(event) {
    myResize();
		drawSet();
};

function drawSet(callback){
	imgData = ctx.createImageData($(window).width()-120-$("#process").width(), $("#process").height()+20);
	rpos = $("#xpos").val();
	ipos = $("#ypos").val();
	scale = -Math.log($("#scale").val());
	iterations = $("#it").val();
	var pos = 0;
	for(let y = 0; y < plane.height; y++){
		for(let x = 0; x < plane.width; x++){
			let a = map(x,0,plane.width,minR,maxR)*scale-rpos;
			let b = map(y,0,plane.height,minI,maxI)*scale-ipos;
			let ca = a;
			let cb = b;
			for(var i = 0; (i < iterations) && (a*a+b*b < 4); i++){
				let realPart = a*a-b*b;
				let imaginaryPart = 2*a*b;
				a = realPart+ca;
				b = imaginaryPart+cb;
			}
			pos = (x+plane.width*y)*4;
			ii = map(Math.log(i),0,Math.log(iterations),0,255);
			iii = map(i,0,iterations,0,255);
			iiii = map(Math.sqrt(i),0,Math.sqrt(iterations),0,255);
			imgData.data[pos] = ii;
			imgData.data[pos+1] = iii;
			imgData.data[pos+2] = iiii;
			imgData.data[pos+3] = 255;
		}
	}
	ctx.putImageData(imgData,0,0);
  tryCall(callback);
}


/*i = map(i,0,iterations,0,255*3);
if(i > 255*2){
	imgData.data[pos] = i-255*2;
}
else{
	imgData.data[pos] = 0;
}
if(i < 255*2 && i > 255){
	imgData.data[pos+1] = i-255;
}
else if(i > 255*2){
	imgData.data[pos+1] = 3*255-i;
}
else {
	imgData.data[pos+1] = 0;
}
if(i <= 255){
	imgData.data[pos+2] = i;
}
else{
	imgData.data[pos+2] = 0;
}*/
