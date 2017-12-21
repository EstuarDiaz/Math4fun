let ctx = "";
let plane = "";
let xScale = 2;
let yScale = 2;
let minR = minI = -2;
let maxR = maxI = 2;

$(function(){
  $("#mycontent")
      .append($('<div/>',{'id':'container','class':'container box'})
        .append($('<canvas/>',{'id':'canvas'}))
      );
  start();
  $("#canvas").click(function(e){
			let pos = getComplexPos($(this),e);
			drawFunction(pos);
	});
})

function drawFunction(pos){
  alert(pos.r+','+pos.i);
  
}

function getPlanePos(p){
  let real = map(p.r,0,plane.width,minR,maxR);
  let im = -map(p.i,0,plane.height,minI,maxI);
  let pos = {'r':real, 'i':im};
  return pos;
}

function getComplexPos(canvas,e){
		let real = map((e.pageX - canvas.position().left),0,plane.width,minR,maxR);
		let im = -map((e.pageY - canvas.position().top),0,plane.height,minI,maxI);
		let pos = {'r':real, 'i':im};
		return pos;
}

function map(val,a1,b1,a2,b2){
	return ((b2-a2)*(val+a1)/(b1-a1))+a2;
}

function start(){
  plane = document.getElementById("canvas");
  plane.style ="border:1px solid #000000;";
	document.getElementById("canvas").style.cursor = "crosshair";
	ctx = plane.getContext("2d");
  plane.width = 500;
  plane.height = 500;
  drawPlane();
}

function drawPlane(){
  paintBG();
  drawAxis();
}

function paintBG(){
  ctx.beginPath();
  ctx.rect(0, 0, plane.width,plane.height);
  ctx.fillStyle = "black";
  ctx.fill();
}

function drawAxis(color){
  ctx.strokeStyle = "white";
  ctx.beginPath();
  ctx.moveTo(plane.width/2,0);
  ctx.lineTo(plane.width/2,plane.height);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(0,plane.height/2);
  ctx.lineTo(plane.width,plane.height/2);
  ctx.stroke();
}

function getComplexPos(canvas,e){
		let real = map((e.pageX - canvas.position().left),0,plane.width,minR,maxR);
		let im = map((e.pageY - canvas.position().top),0,plane.height,minI,maxI);
		let pos = {'r':real, 'i':im};
		return pos;
}
