var mySet = function(callback){
    $('#mycontent')
        .append($('<div/>',{'id':'container','class':'container box'}))
        .append($('<div/>',{'id':'process','class': 'process box'})
            .append($('<ul/>',{'class': 'nav nav-tabs'})
                .append('<li><a data-toggle="tab" href="#menu1"><span class="glyphicon glyphicon-play-circle"></span></a></li>')
                .append('<li class="active"><a data-toggle="tab" href="#menu2"><span class="glyphicon glyphicon-screenshot"></span></a></li>')
                .append('<li><a data-toggle="tab" href="#menu3"><span class="glyphicon glyphicon-tint"></span></a></li>')
                .append('<li><a data-toggle="tab" href="#menu4"><span class="glyphicon glyphicon-cog"></span></a></li>')
            )
            .append($('<div/>',{'class': 'tab-content'})
                .append($('<div/>',{'id':'menu1','class':'tab-pane fade in'})
                    .append('<h3>Initial Positions</h3><div id="myList1"></div>')
                )
                .append($('<div/>',{'id':'menu2','class':'tab-pane fade in active'})
                    .append('<h3>Current Positions</h3><div id="myList2"></div>')
                )
                .append($('<div/>',{'id':'menu3','class':'tab-pane fade in'})
                    .append('<h3>Colors</h3><div id="myList3"></div>')
                )
                .append($('<div/>',{'id':'menu4','class':'tab-pane fade in'})
                    .append('<h3>Settings</h3>')
                        .append($('<li/>',{'class':'list-group-item'})
                            .append($("<label>").text('A:'))
                            .append($('<input type="text" id="paramA">'))
                        )
                        .append($('<li/>',{'class':'list-group-item'})
                            .append($("<label>").text('B:'))
                            .append($('<input type="text" id="paramB">'))
                        )
                        .append($('<li/>',{'class':'list-group-item'})
                            .append($("<label>").text('C:'))
                            .append($('<input type="text" id="paramC">'))
                        )
                    .append($('<div/>',{'class':'btn-group'})
                        .append('<button type="button" class="btn btn-primary" id="resetButton" data-toggle="tooltip" data-placement="bottom" title="Restart"><span class="glyphicon glyphicon-repeat"></span></button>')
                        .append('<button type="button" class="btn btn-success" id="randomButton" data-toggle="tooltip" data-placement="bottom" title="Random"><span class="glyphicon glyphicon-asterisk"></span></button>')
                        .append('<button type="button" class="btn btn-info" id="rotateButton" data-toggle="tooltip" data-placement="bottom" title="Rotate"><span class="glyphicon glyphicon-refresh"></span></button>')
                        .append('<button type="button" class="btn btn-danger" id="stopButton" data-toggle="tooltip" data-placement="bottom" title="Stop"><span class="glyphicon glyphicon-step-forward"></span></button>')
                    )
                    .append('</br><button id="addButton" type="button" class="btn btn-success"><span class="glyphicon glyphicon-plus-sign"></span></button>')
                )
            )
        );
    tryCall(callback);
};

  var start = function(callback){
      $("#addButton").click(function(){
          addAttractor(canvas);
      });
      $("#resetButton").click(myReset);
      $("#randomButton").click(myRandom);
      $("#rotateButton").click(changeRotation);
      $("#stopButton").click(myStop);
      $('[data-toggle="tooltip"]').tooltip();
      $('.attrName').change(changeName);
      myStart = callback;
      canvas = new p5(sketch, 'container');
  };

  clearSketch = function(){
    $('head').find("#"+filename).remove();
    attractors.length = 0;
    canvas.length = 0;
    param.length = 0;
    myStart = "";
  }
  let n = 3;
  let c = 7;
  let attractors = [];
  let r = {x:0,y:0,z:0};
  let bgcolor = 51;
  let mx = my = 0;
  let canvas;
  let rotation = true;
  let active = true;
  let limit = 4000;
  let myStart;
  let param = {a:10,b:28,c:8/3};

  var sketch = function(p) {
      canvas = p;
      p.setup = function(){
          p.createCanvas(500,300, p.WEBGL);
          myResize();
          setParam();
          p.background(0);
          for(var i = 0; i < n; i++){
              addAttractor(p);
          }
          attractors.forEach(function(item,index){
              item.randomize();
              item.setColor(0,(index/3 % 2)*255,(index+1 % 2)*255);
              item.setTime(0.01);
          });
          tryCall(myStart);
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

      // p.mouseWheel = function(event) {
      //     if(isInside(p)){
      //         if(c > event.delta*0.01){c -= event.delta*0.01;}
      //     }
      // };
  };

  function setParam(){
      $("#paramA").val(param.a);
      $("#paramB").val(param.b);
      $("#paramC").val(param.c);
      $("#param").change(changeParam);
  }

  function changeParam(){
      param.a = $("#paramA").val();
      param.b = $("#paramB").val();
      param.c = $("#paramC").val();
      attractors.forEach(function(item){
          item.setVar(param.a,param.b,param.c);
      });
  }

  function isInside(p){
    return p.mouseX > 0 && p.mouseX < p.width
      && p.mouseY > 0 && p.mouseY < p.height;
  }

  function myRotate(r,p){
      if(isInside(p) && p.mouseIsPressed){
        r.y += (p.pwinMouseX - mx)*0.01;
        r.x += (p.pwinMouseY - my)*0.01;
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
      var newAttractor = {a:param.a,b:param.b,c:param.c,
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
                      setColor:function(r,g,b,h){if(!h){h=255;}this.color = p.color(r,g,b,h); $("#color"+this.name).val(rgb2hex(""+this.color))},
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

  function changeRotation(){
      rotation = !rotation;
  }

  function myStop(){
      active = !active;
  }

  function myResize(){
    var w = $(window).width()-120-$("#process").width();
    var h = $("#process").height()+20;
    canvas.resizeCanvas(w,h,true);
    canvas.translate(w/2,h/2,20);
  }

  window.onresize = function(event) {
      myResize();
  };

  function appendAttractor(a){
      $("#myList1").append($('<li class="list-group-item" id="l1'+a.name+'">'+a.name+': '+a.getInitPos(3)+'</li>'));
      $("#myList2").append($('<li class="list-group-item" id="l2'+a.name+'">'+a.name+'</li>'));
      $("#myList3").append($('<li class="list-group-item" id="l3'+a.name+'">'+a.name+
          ':<input type="color" id="color'+a.name+'" onchange="changeColor(this,value)" value="'+rgb2hex(""+a.color)+'"></i>'));
  }

  function changeColor(c,value){
      attractors[c.id.substr(5,c.id.length)].color = value;
  }

  function myReset(){
      rotation = true;
      active = true;
      attractors.forEach(function(item,index){
          item.reset();
          item.setPos(1,1,1+index*0.1);
          $("#l1"+item.name).text(item.name+": "+item.getInitPos(3));
      });
  }

  function myRandom(){
      rotation = true;
      active = true;
      attractors.forEach(function(item,index){
          item.reset();
          item.randomize();
          $("#l1"+item.name).text(item.name+": "+item.getInitPos(3));
      });
  }

  //Function to convert hex format to a rgb color
  function rgb2hex(rgb){
   rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
   return (rgb && rgb.length === 4) ? "#" +
    ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
    ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
    ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
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
