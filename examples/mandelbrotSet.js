let scale = 0.05;
let iterations = 50;
let ctx = "";
let plane = "";
let rpos = 0;
let ipos = 0;
let maxR,minR,maxI,minI = 0;
clearSketch = function(){
	$('head').find("#"+filename).remove();
		plane = "";
		ctx = "";
}
var mySet = function(callback){
		$("#mycontent")
				.append($('<div/>',{'id':'container','class':'container box'})
					.append($('<canvas/>',{'id':'canvas'}))
				)
				.append($('<div/>',{'id':'process','class': 'process box'})
					.append('Scale:<input type="range" id="scale" onChange="drawSet()" value="0.7">')
					.append('xPos:<input type="range" id="xpos" onChange="drawSet()" value="0">')
					.append('yPos:<input type="range" id="ypos" onChange="drawSet()" value="0">')
					.append('Iterarions:<input type="text" id="it" value="50" onChange="drawSet()">')
				)
		tryCall(callback);
};
var start = function(callback){
	plane = document.getElementById("canvas");
	plane.width = $(window).width()-120-$("#process").width();
	plane.height = $("#process").height()+20;
	plane.style ="border:1px solid #000000;";
	document.getElementById("canvas").style.cursor = "crosshair";
	ctx = plane.getContext("2d");
	document.getElementById("xpos").max = 2;
	document.getElementById("xpos").min = -2;
	document.getElementById("xpos").step = 0.05;
	document.getElementById("ypos").max = 2;
	document.getElementById("ypos").min = -2;
	document.getElementById("ypos").step = 0.005;
	document.getElementById("scale").max = 1;
	document.getElementById("scale").min = 0.1;
	document.getElementById("scale").step = 0.005;
	$("#scale").val(0.45);
	$("#xpos").val(0.5);
	setArea();
	$("#scale").change(drawSet);
	$("#xpos").change(drawSet);
	$("#ypos").change(drawSet);
	$("#it").change(drawSet);
	$("#canvas").click(function(e){
			let pos = getComplexPos($(this),e);
			getJulia(pos.r,pos.i);
	});
	drawSet(callback);
};

function getComplexPos(canvas,e){
		let real = map((e.pageX - canvas.position().left),0,plane.width,minR,maxR);
		let im = map((e.pageY - canvas.position().top),0,plane.height,minI,maxI);
		let pos = {'r':real, 'i':im};
		return pos;
}

function getJulia(a,b){
		drawSet(null,a,b);
}

function map(val,a1,b1,a2,b2){
	return ((b2-a2)*(val+a1)/(b1-a1))+a2;
}

function setArea(){
	maxR = 2*plane.width/Math.min(plane.width,plane.height);
	minR = -2*plane.width/Math.min(plane.width,plane.height);
	maxI = 2*plane.height/Math.min(plane.width,plane.height);
	minI = -2*plane.height/Math.min(plane.width,plane.height);
}
function myResize(){
	plane.width = $(window).width()-120-$("#process").width();
	plane.height = $("#process").height()+20;
	setArea();
}

window.onresize = function(event) {
		myResize();
		drawSet();
};

function drawSet(callback,jReal,jIm){
	imgData = ctx.createImageData($(window).width()-120-$("#process").width(), $("#process").height()+20);
	rpos = $("#xpos").val();
	ipos = $("#ypos").val();
	scale = -Math.log($("#scale").val());
	iterations = $("#it").val();
	var pos = 0;
	if(!jIm){jIm = 0;}
	if(!jReal){jReal = 0;}
	for(let y = 0; y < plane.height; y++){
		for(let x = 0; x < plane.width; x++){
			let a = map(x,0,plane.width,minR,maxR)*scale-rpos;
			let b = map(y,0,plane.height,minI,maxI)*scale-ipos;
			let ca = a;
			let cb = b;
			a = ca*ca-cb*cb+ca+jReal;
			b = 2*ca*cb+cb+jIm;
			for(var i = 0; (i < iterations) && (a*a+b*b < 4); i++){
				let realPart = a*a-b*b;
				let imaginaryPart = 2*a*b;
				// let realPart = a*a*a-3*a*b*b;
				// let imaginaryPart = 3*a*a*b-b*b*b;
				// let realPart = Math.exp(a)*Math.cos(b);
				// let imaginaryPart = Math.exp(a)*Math.sin(b);
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
