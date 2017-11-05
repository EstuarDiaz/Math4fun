
/* global windowHeight, WEBGL, windowWidth, mouseIsPressed, pwinMouseX, pwinMouseY */
/*Estuardo Diaz (2017-06-15)*/
var n = 3;
var c = 7;
var attractors = [];
var r = {x:0,y:0,z:0};
var bgcolor = 51;
var mx = my = 0;

var sketch = function(p) {
    p.setup = function(){
        p.createCanvas(p.windowWidth-100, p.windowHeight-100, p.WEBGL);
        p.background(0);
        for(var i = 0; i < n; i++){
            attractors.push({a:10,b:28,c:8/3,dt:0.01,
                            x:0,y:0,z:0,
                            color:p.color(255,255,255,100),
                            v:[],
                            setTime:function(t){this.dt = t;},
                            setVar:function(va,vb,vc){this.a = va; this.b = vb; this.c = vc;},
                            setPos:function(px,py,pz){this.x = px; this.y = py; this.z = pz;},
                            reset:function(){this.x = 0; this.y = 0; this.z = 0;},
                            randomize:function(){this.x = p.random()*100; this.y = p.random()*100; this.z = p.random()*100;},
                            setColor:function(r,g,b,h=255){this.color = p.color(r,g,b,h);},
                            advance:function(){
                                this.x += this.dt*this.a*(this.y - this.x);
                                this.y += this.dt*(this.x*(this.b-this.z) - this.y);
                                this.z += this.dt*(this.x*this.y - this.c*this.z);
                                this.v.push([this.x,this.y,this.z]);},
                            draw:function(){
                                p.fill(this.color);
                                p.beginShape();
                                for(var i = 0; i < this.v.length; i++){
                                    p.vertex(this.v[i][0],this.v[i][1],this.v[i][2]);
                                }
                                p.endShape(); 
                            }});
            attractors[i].setPos(1,1,1+i*0.1);   
//            attractors[i].randomize();
            attractors[i].setColor(50*i,50*i,255-50*i);
            attractors[i].setTime(0.01);
        }
    };
    
    p.draw = function() {
        p.background(bgcolor);
        p.scale(c);
        myRotate(r,p);
        for(var i = 0; i < attractors.length; i++){
            attractors[i].advance();
            attractors[i].draw();
        }
    };
    
    p.mousePressed = function() {
      mx = p.pwinMouseX;
      my = p.pwinMouseY;
    };
    
    p.mouseWheel = function(event) {
        if(true){
            if(c > event.delta*0.01){c -= event.delta*0.01;}
        }
    };
};
 
function myRotate(r,p){
    if(p.mouseIsPressed){
        r.y += (p.pwinMouseX - mx)*0.01;
        r.x -= (p.pwinMouseY - my)*0.01;
    }
    else{
        r.x += 0.1;
        r.y += 0.1;
        r.z += 0.1;
    }
    p.rotateX(p.radians(r.x));
    p.rotateY(p.radians(r.y));
    p.rotateZ(p.radians(r.z));
}

new p5(sketch, 'container');