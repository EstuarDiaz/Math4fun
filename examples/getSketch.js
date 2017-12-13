
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
    loadEnd();
    // $.getScript(filename+'.js',function(){
    //   mySet(function(){
    //     setTimeout(function(){
    //       start(loadEnd);
    //     }, 500);
    //   });
    // });
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
