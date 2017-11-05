function myClear(){
    $("#interface").remove();
}

function myReplace(){
    loadStart();
    myClear();
    mySet();
}

function tryCall(callback){
    if(callback && typeof(callback) === "function"){
        callback();
    }
}

function mySet(){
    $('<div/>', {'id':'interface','class':'box interface'}).appendTo('#main');
    $('#interface')
        .append($('<div/>',{'id':'container','class':'box content'}))
        .append($('<div/>',{'class': 'box info'})
            .append($('<ul/>',{'class': 'nav nav-tabs'})
                .append('<li class="active"><a data-toggle="tab" href="#home"><span class="glyphicon glyphicon-list-alt"></span></a></li>')
                .append('<li><a data-toggle="tab" href="#menu1"><span class="glyphicon glyphicon-play-circle"></span></a></li>')
                .append('<li><a data-toggle="tab" href="#menu2"><span class="glyphicon glyphicon-screenshot"></span></a></li>')
                .append('<li><a data-toggle="tab" href="#menu3"><span class="glyphicon glyphicon-tint"></span></a></li>')
                .append('<li><a data-toggle="tab" href="#menu4"><span class="glyphicon glyphicon-cog"></span></a></li>')
            )
            .append($('<div/>',{'class': 'tab-content'})
                .append($('<div/>',{'id':'home','class':'tab-pane fade in active'})
                    .append('<h3>List of points</h3><div id="myList0"></div>')
                    .append('<button id="addButton" type="button" class="btn btn-success"><span class="glyphicon glyphicon-plus-sign"></span></button>')
                )
                .append($('<div/>',{'id':'menu1','class':'tab-pane fade in'})
                    .append('<h3>Initial Positions</h3><div id="myList1"></div>')
                )
                .append($('<div/>',{'id':'menu2','class':'tab-pane fade in'})
                    .append('<h3>Current Positions</h3><div id="myList2"></div>')
                )
                .append($('<div/>',{'id':'menu3','class':'tab-pane fade in'})
                    .append('<h3>Colors</h3><div id="myList3"></div>')
                )
                .append($('<div/>',{'id':'menu4','class':'tab-pane fade in'})
                    .append('<h3>Settings</h3>')
                    .append($('<div/>',{'class':'btn-group'})
                        .append('<button type="button" class="btn btn-primary" id="resetButton" data-toggle="tooltip" data-placement="bottom" title="Restart"><span class="glyphicon glyphicon-repeat"></span></button>')
                        .append('<button type="button" class="btn btn-success" id="randomButton" data-toggle="tooltip" data-placement="bottom" title="Random"><span class="glyphicon glyphicon-asterisk"></span></button>')
                        .append('<button type="button" class="btn btn-info" id="rotateButton" data-toggle="tooltip" data-placement="bottom" title="Rotate"><span class="glyphicon glyphicon-refresh"></span></button>')
                        .append('<button type="button" class="btn btn-danger" id="stopButton" data-toggle="tooltip" data-placement="bottom" title="Stop"><span class="glyphicon glyphicon-step-forward"></span></button>')
                    )
                )
            )
        );
    start(loadEnd);
}

$(function(){
    $(".info").click(myReplace);
});
