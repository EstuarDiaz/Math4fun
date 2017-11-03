
/*Estuardo Diaz (2017-09-12)*/
var n = 3;
var c = 7;
var attractors = [];
var r = {x:0,y:0,z:0};
var bgcolor = 51;
var mx = my = 0;
var canvas;
var rotation = true;
var active = true;
var limit = 4000;

var sketch = function(p) {
    canvas = p;
    p.setup = function(){
        p.createCanvas($("#container").width(),$("#container").height(), p.WEBGL);
        p.background(0);
        for(var i = 0; i < n; i++){
            addAttractor(p);
        }
        attractors.forEach(function(item,index){
            item.randomize();
            item.setColor(50*index,50*index,255-50*index);
            item.setTime(0.01);
        });
    };

    p.draw = function() {
        p.background(bgcolor);
        p.scale(c);
        myRotate(r,p);
        if(active){
            attractors.forEach(function(item,index){
                if(item.v.length < limit / attractors.length){
                    item.advance();
                    $("#l2"+item.name).text(item.name+": "+item.getPos(3));
                }
            });
        }
        attractors.forEach(function(item,index){
            item.draw();
        });
    };

    p.mousePressed = function() {
      if(isInside(p)){
        mx = p.pwinMouseX;
        my = p.pwinMouseY;
      }
    };

    p.mouseWheel = function(event) {
        if(isInside(p)){
            if(c > event.delta*0.01){c -= event.delta*0.01;}
        }
    };

    p.windowResized = function() {
        p.resizeCanvas($("#container").width(),$("#container").height());
    };
};

function isInside(p){
  return p.mouseX > 0 && p.mouseX < p.width
    && p.mouseY > 0 && p.mouseY < p.height;
}

function myRotate(r,p){
    if(isInside(p) && p.mouseIsPressed){
      r.y += (p.pwinMouseX - mx)*0.01;
      r.x -= (p.pwinMouseY - my)*0.01;
    }
    else if(rotation){
      r.x += 0.1;
      r.y += 0.1;
      r.z += 0.1;
    }
    p.rotateX(p.radians(r.x));
    p.rotateY(p.radians(r.y));
    p.rotateZ(p.radians(r.z));
}

function addAttractor(p){
    var newAttractor = {a:10,b:28,c:8/3,
                    t:0,dt:0.01,
                    x:0,y:0,z:0,
                    x0:0,y0:0,z0:0,
                    color:p.color(255,255,255,100),
                    name: "",
                    v:[],
                    setName:function(n){this.name = n;},
                    setTime:function(time){this.t = time;},
                    setVar:function(va,vb,vc){this.a = va; this.b = vb; this.c = vc;},
                    setPos:function(px,py,pz){this.x = px; this.y = py; this.z = pz; this.x0 = px; this.y0 = py; this.z0 = pz;},
                    reset:function(){this.x = 0; this.y = 0; this.z = 0; this.x0 = 0; this.y0 = 0; this.z0 = 0; this.v = []; this.t = 0;},
                    randomize:function(){this.x = p.random()*100; this.y = p.random()*100; this.z = p.random()*100;
                        this.x0 = this.x; this.y0 = this.y; this.z0 = this.z;},
                    setColor:function(r,g,b,h){if(!h){h=255;}this.color = p.color(r,g,b,h);},
                    getPos:function(a){return "("+this.x.toFixed(a)+", "+this.y.toFixed(a)+", "+this.z.toFixed(a)+")";},
                    getInitPos:function(a){return "("+this.x0.toFixed(a)+", "+this.y0.toFixed(a)+", "+this.z0.toFixed(a)+")";},
                    advance:function(){
                        this.x += this.dt*this.a*(this.y - this.x);
                        this.y += this.dt*(this.x*(this.b-this.z) - this.y);
                        this.z += this.dt*(this.x*this.y - this.c*this.z);
                        this.t += this.dt;
                        this.v.push([this.x,this.y,this.z]);},
                    draw:function(){
                        p.fill(this.color);
                        p.beginShape();
                        for(var i = 0; i < this.v.length; i++){
                            p.vertex(this.v[i][0],this.v[i][1],this.v[i][2]);
                        }
                        p.endShape();
                    }};
    newAttractor.setName(attractors.length.toString());
    newAttractor.randomize();
    newAttractor.setColor(255,0,0);
    newAttractor.setTime(0.01);
    appendAttractor(newAttractor);
    attractors.push(newAttractor);
}

function appendAttractor(a){
    $("#myList0").append($('<li class="list-group-item" name="'+a.name+'">'+
            '<div class="input-group">'+
            '<input type="text" class="form-control attrName" id="l0'+a.name+'" value="'+a.name+'"><div class="input-group-btn">'+
            '<button id="removeButton'+a.name+'" type="button" class="btn btn-danger pull-right">'+
            '<span class="glyphicon glyphicon-remove-circle"></span></button></div></div></li>'));
    $("#myList1").append($('<li class="list-group-item" id="l1'+a.name+'">'+a.name+': '+a.getInitPos(3)+'</li>'));
    $("#myList2").append($('<li class="list-group-item" id="l2'+a.name+'">'+a.name+'</li>'));
    $("#myList3").append($('<li class="list-group-item" id="l3'+a.name+'">'+a.name+'</li>'));
}

/*
 * <div id="cp2" class="input-group colorpicker-component">
    <input type="text" value="#00AABB" class="form-control" />
    <span class="input-group-addon"><i></i></span>
</div>
<script>
    $(function() {
        $('#cp2').colorpicker();
    });
</script>
 */

function myReset(){
    attractors.forEach(function(item,index){
        item.reset();
        item.setPos(1,1,1+index*0.1);
        $("#l1"+item.name).text(item.name+": "+item.getInitPos(3));
    });
}

function myRandom(){
    attractors.forEach(function(item,index){
        item.reset();
        item.randomize();
        $("#l1"+item.name).text(item.name+": "+item.getInitPos(3));
    });
}
function changeName(){
    var nuevo = true;
    var name = $(this).name;
    attractors.forEach(function(item,index){
        if(name === item.name){nuevo = false;}
    });
    if(nuevo){
        myUpdate();
    }
}

function myUpdate(){
    attractors.forEach(function(item,index){
        $("#l1"+item.name).text(item.name+": "+item.getInitPos(3));
        $("#l2"+item.name).text(item.name+": "+item.getPos(3));
        $("#l3"+item.name).text(item.name+": ");
    });
}

function changeRotation(){
    rotation = !rotation;
}

function myStop(){
    active = !active;
}

start = function(callback){
    $("#addButton").click(function(){
        addAttractor(canvas);
    });
    $("#resetButton").click(myReset);
    $("#randomButton").click(myRandom);
    $("#rotateButton").click(changeRotation);
    $("#stopButton").click(myStop);
    $('[data-toggle="tooltip"]').tooltip();
    $('.attrName').change(changeName);
    new p5(sketch, 'container');
    callback();
};
