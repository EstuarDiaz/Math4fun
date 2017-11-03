function myClear(){
    $("#interface").remove();
}

function myReplace(){
    myClear();
    mySet();
}

function tryCall(callback){
    if(callback && typeof(callback) === "function"){
        callback();
    }
}

function mySet(callback){
    $("#mycontent")
        .append($('<div/>',{'id':'container','class':'container box'})
          .append($('<canvas/>',{'id':'canvas'}))
        )
        .append($('<div/>',{'id':'process','class': 'process box'})
          .append('Scale:<input type="range" id="scale" onChange="drawSet()" value="0.1">')
          .append('xPos:<input type="range" id="xpos" onChange="drawSet()" value="0">')
          .append('yPos:<input type="range" id="ypos" onChange="drawSet()" value="0">')
          .append('Iterarions:<input type="text" id="it" value="50" onChange="drawSet()">')
        )
    tryCall(callback);
}

/*
function mySet(callback){
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
}
*/
//
// $(function(){
//     $(".info").click(mySet);
// });
