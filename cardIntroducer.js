
var setTime = function(){
    var x = document.getElementById('setTime');
    var time = x.value
    deck.relations[chooseR].time = time;
    recreateDeck({x:0,y:0});
}

document.getElementById("nameCard").addEventListener('click', function () {
    setTime();
});