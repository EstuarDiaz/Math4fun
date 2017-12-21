$(function(){
  $("#mycontent")
      .append($('<div/>',{'id':'container','class':'container box'})
        .append($('<canvas/>',{'id':'canvas'}))
      )
      $("#canvas").click(function(e){
    			let pos = getComplexPos($(this),e);
    			getJulia(pos.r,pos.i);
    	});
})

function getComplexPos(canvas,e){
		let real = map((e.pageX - canvas.position().left),0,plane.width,minR,maxR);
		let im = map((e.pageY - canvas.position().top),0,plane.height,minI,maxI);
		let pos = {'r':real, 'i':im};
		return pos;
}
