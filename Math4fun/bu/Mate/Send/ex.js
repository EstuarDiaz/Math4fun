/* global windowHeight, WEBGL, windowWidth, mouseIsPressed, pwinMouseX, pwinMouseY, width, height, mouseX, mouseY */
/*Estuardo Diaz (2017-06-15)*/
/*2017-08-24*/

var phi = (1+Math.sqrt(5))/2;
var lp = Math.log(phi);
var c = 30;
var n = 1;
var p = {x:-5,y:5};
var t = 0.01;
var puntos = [];
var play = false;
var time = 1;

function setup() {
    createCanvas(800, 800);
    drawBG();
    drawAxis();
//    drawCross();
    strokeWeight(4);
    time = 0;
    for(var i = -c; i < c; i+=0.8){
        for(var j = -c; j < c; j+=0.8){
//            var x = Math.random()*2*c-c;
//            var y = Math.random()*2*c-c;
            var x = i;
            var y = j;
            puntos.push([x,y]);
            var q = t2([x,y]);
            stroke(0,255,255*(puntos.length/(4*c*c)));
            point(q[0],q[1]);
        }
    }
}
    
function draw() {
    if(play){
        drawBG();
//        drawBGlines();
        drawAxis();
//        drawCross();
        strokeWeight(4);
//        followMe();
        time += t;
        puntos.forEach(function(item,index){
            var q = f3([item[0],item[1]]);
            var w = t2([item[0],item[1]]);
            stroke(0,255,255*(index/(4*c*c)));
            item[0] = q[0];
            item[1] = q[1];
            q = t2(q);
            point(q[0],q[1]);
//            line(q[0],q[1],w[0],w[1]);
        });
    }
}

function mousePressed() {
  play = !play;
}

// f1: R -> R
// z = exp(z)
function f1(u) {
    var v = [];
    v[0] = Math.exp(u[0]) * Math.cos(u[1]);
    v[1] = Math.exp(u[0]) * Math.sin(u[1]);
    return v;
}

// f1: R -> R
// z = exp(iz)
function f11(u) {
    var v = [];
    v[0] = Math.exp(-u[1]) * Math.cos(u[0]);
    v[1] = Math.exp(-u[1]) * Math.sin(u[0]);
    return v;
}

// f2: R -> R
// z = 10+10i
function f2(u) {
    var v = [];
    v[0] = u[0] + 10;
    v[1] = u[1] + 10;
    return v;
}

// f3: R -> R
function f3(u) {
    var v = [];
    var w = f6(u);
    v[0] = u[0] + (w[0]-u[0])*time;
    v[1] = u[1] + (w[1]-u[1])*time;
    return v;
}

// f4: R -> R
// z = z2
function f4(u) {
    var v = [];
    v[0] = u[0]*u[0] - u[1]*u[1];
    v[1] = 2*u[1]*u[0];
    return v;
}

// f5: R -> R
function f5(u) {
    var v = [];
    v[0] = u[0]*u[0] - u[1]*u[1]  + 1;
    v[1] = 2*u[1]*u[0];
    return v;
}

// f5: R -> R
function f51(u) {
    var v = [];
    v[0] = u[0]*u[0] - u[1]*u[1]  + 1;
    v[1] = lp*u[1]*u[0];
    return v;
}

// f6 : R->R
// k = (1+sqrt(5))/2
// z = [exp(xlnk) - exp(i*pi*x - xlnk)]/sqrt(5);
// z = a+ib = [exp(a*lnk + ib*lnk)-exp[-(b*pi+a*lnk)+i(a*pi-b*lnk)]]/sqrt(5)
function f6(u){
    var v = [];
    var a = u[0];
    var b = u[1];
    var v1 = f1([a*lp,b*lp]);
    var v2 = f1([-b*Math.PI-a*lp,a*Math.PI-b*lp]); 
    v[0] = (v1[0] - v2[0])/sqrt(5);
    v[1] = (v1[1] + v2[1])/sqrt(5);
    return v;
}

// S -> R
function t1(u) {
    var v = [];
    v[0] = (u[0] - width / 2) * c / width;
    v[1] = -(u[1] - height / 2) * c / height;
    return v;
}

// R -> S
function t2(u) {
    var v = [];
    v[0] = width / 2 + u[0] * width / c;
    v[1] = height / 2 - u[1] * height / c;
    return v;
}

function drawCross(){
    strokeWeight(4);
    stroke(255);
    var z1 = Math.log(Math.PI/2);
    var z2 = Math.PI/2 - Math.log(Math.PI/2);
    line(width / 2 + z1 * c + 5, height / 2 + z2 * c, width / 2 + c * z1 - 5, height / 2 + z2 * c);
    line(width / 2 + z1 * c, height / 2 + z2 * c + 5, width / 2 + c * z1, height / 2 + z2 * c - 5);
    line(width / 2 + z1 * c + 5, height / 2 - z2 * c, width / 2 + c * z1 - 5, height / 2 - z2 * c);
    line(width / 2 + z1 * c, height / 2 - z2 * c + 5, width / 2 + c * z1, height / 2 - z2 * c - 5);
}

function drawAxis(){
    stroke(255); 
    strokeWeight(1); 
    line(width / 2, 0, width / 2, height);
    line(0, height / 2, width, height / 2);
    var a = c;
    var l1 = 5;
    for (var i = 0; i < a; i++) {
        line(width / 2 + l1, height / a * (i + 1), width / 2 - l1, height / a * (i + 1));
        line(width / a * (i + 1), height / 2 + l1, width / a * (i + 1), height / 2 - l1);
    }
}

function drawBG(){
    background(0);  
    strokeWeight(1); 
    line(width / 2, 0, width / 2, height);
    line(0, height / 2, width, height / 2);
    var a = c;
    var l1 = 5;
    for (var i = 0; i < a; i++) {
        line(width / 2 + l1, height / a * (i + 1), width / 2 - l1, height / a * (i + 1));
        line(width / a * (i + 1), height / 2 + l1, width / a * (i + 1), height / 2 - l1);
    }
}

function drawBGlines(){
    var a = c;
    var w = [];
    for (var i = 0; i < a; i++) {
        for (var j = 0; j < a; j++) {
            var u = [width / a * (i + 1), height / a * (j + 1)];
            w = t2(f1(t1(u)));
            stroke(255, 255 / a * i, 255 / a * j);
            line(u[0], u[1], w[0], w[1]);
        }
    }
}

function followMe(){
    var u = [mouseX, mouseY];
    var w = [];
    noFill();
    beginShape();
    curveVertex(u[0], u[1]);
    curveVertex(u[0], u[1]);
    for (var i = 0; i < n; i++) {
        w = t2(f1(t1(u)));
        line(u[0], u[1], w[0], w[1]);
        u = w;
        curveVertex(u[0], u[1]);
    }
    curveVertex(u[0], u[1]);
    stroke(255, 0, 0);
    endShape();

    stroke(0,255,0);
}