
function getSketch(title,filename,img,quote){
    let videos = {
      'lorenzAttractor': ['WepOorvo2I4','HfD1OsP-Bv8','d0Z8wLLPNE0','f0lkz2gSsIk'],
      'mandelbrotSet': ['NGMRB4O922I','d0vY0CKYhPY','4LQvjSf6SSw','6z7GQewK-Ks']
    };
    let info = {
      'lorenzAttractor': 'The Lorenz attractor is an attractor that arises in a simplified system of equations describing the two-dimensional flow of fluid of uniform depth H, with an imposed temperature difference  DeltaT, under gravity g, with buoyancy  alpha, thermal diffusivity kappa, and kinematic viscosity nu.',
      'mandelbrotSet': 'The term Mandelbrot set is used to refer both to a general class of fractal sets and to a particular instance of such a set. In general, a Mandelbrot set marks the set of points in the complex plane such that the corresponding Julia set is connected and not computable. "The" Mandelbrot set is the set obtained from the quadratic recurrence equation z_(n+1)=z_n^2+C (1) with z_0=C, where points C in the complex plane for which the orbit of z_n does not tend to infinit are in the set. Setting z_0 equal to any point in the set that is not a periodic point gives the same result. The Mandelbrot set was originally called a mu molecule by Mandelbrot. J. Hubbard and A. Douady proved that the Mandelbrot set is connected. (WolframAlpha)'
    };
    let ref = {

    };
    addContentHeader(title);
    addInspiration(img,quote);
    addInterface();
    addVideos(videos[filename]);
    addInfo(info[filename]);
    addReference(info[filename]);
    addDownload(filename);
    // addVideo('https://www.youtube.com/embed/CJHGDCb6vnY');
    $('head').append($('<link id="'+filename+'" rel="stylesheet" href="'+filename+'.css" type="text/css" />'));
    if(filename == 'lorenzAttractor'){
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
    }
    else if(filename == 'mandelbrotSet'){
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

    }
    mySet(function(){
      setTimeout(function(){
        start(loadEnd);
      }, 500);
    });
}

function selectSketch(id){
  var sketches = {
      '1' : {
          title: 'Lorenz Attractor',
          filename: 'lorenzAttractor',
          img: 'bg1.jpg',
          quote: '"However impenetrable it seems, if you don\'t try it, then you can never do it." - Andrew Wiles'
      },
      '2' : {
          title: 'Mandelbrot Set',
          filename: 'mandelbrotSet',
          img: 'mandelbrotview.png',
          quote: '"Bottomless wonders spring from simple rules, which are repeated without end" - Benoit Mandelbrot'
      }
  }
  var s = sketches[id];
  getSketch(s.title,s.filename,s.img,s.quote);
}
