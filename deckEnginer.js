var line = new Path2D();
line.moveTo(500, 0);
line.lineTo(500, 750);
cardsctx.stroke(line);
var relationsLines = [];
var inhand = false;
var inhandCard;
var chooseR = 0;


cardsCanvas.addEventListener('mousedown', e => {
    var pos = getPosition(e);
    console.log(pos);
    var posIndex = choose(pos);
    var index1 = (pos.x - pos.x % 50) / 50;
    var index2 = (pos.y - pos.y % 75) / 75;
    console.log(index1);
    if (posIndex < deck.cardsnum && pos.x < 500) {
        inhandCard = posIndex;
        inhand = true;
        cardsCanvas.addEventListener('mousemove', dragging);
    }else if(index1-10 < deck.relations[index2].startCard.length && index1 > 9 && index2 < deck.relations.length){
        inhandCard = deck.relations[index2].startCard[index1-10];
        deck.relations[index2].startCard.splice(index1-10,1);
        inhand = true;
        cardsCanvas.addEventListener('mousemove', dragging);
    }else if(index1 == 13 &&deck.relations[index2].retainCard != null &&index2 < deck.relations.length){
        inhandCard = deck.relations[index2].retainCard;
        deck.relations[index2].retainCard = null;
        inhand = true;
        cardsCanvas.addEventListener('mousemove', dragging);
    }else if(index1 >14 &&index1-15 < deck.relations[index2].produceCard.length  &&index2 < deck.relations.length){
        inhandCard = deck.relations[index2].produceCard[index1-15];
        deck.relations[index2].produceCard.splice(index1-15,1);
        inhand = true;
        cardsCanvas.addEventListener('mousemove', dragging);
    }
    else if(index1 == 12 && index2 < deck.relations.length){
        chooseR = index2;
    }
    recreateDeck();

});

cardsCanvas.addEventListener('mouseup', e => {
    var pos = getPosition(e);
    console.log(pos);
    if (inhand) {
        inhand = false;
        var index1 = (pos.x - pos.x % 50) / 50;
        var index2 = (pos.y - pos.y % 75) / 75;
        if (index1 > 9 && index2 < deck.relationsnum) {
            if ((index1 == 10 || index1 == 11) && deck.relations[index2].startCard.length < 2) {
                deck.relations[index2].startCard.push(inhandCard);
            } else if (index1 == 13 && deck.relations[index2].retainCard == null) {
                deck.relations[index2].retainCard = inhandCard;
            } else if(index1<18&& index1 > 14 && deck.relations[index2].produceCard.length < 3){
                deck.relations[index2].produceCard.push(inhandCard);
            }
        }
        cardsCanvas.removeEventListener('mousemove', dragging);
        recreateDeck(pos);
    }

});

var dragging = e => {
    var pos = getPosition(e);
    recreateDeck(pos);
}

document.getElementById("test").addEventListener('click', function () {
    recreateDeck();
})

document.getElementById("createSynthesis").addEventListener('click', function () {
    createRelation();
    recreateDeck();
})

var choose = function (pos) {
    var index1 = (pos.x - pos.x % 50) / 50;
    var index2 = (pos.y - pos.y % 75) / 75;
    return index1 + 10 * index2;
}

var deckDelCard = function (deck, index) {
    return;
}

var deckChangeCard = function (deck, index, change) {
    return;
}

var deckAddRelation = function () {
    return;
}

var recreateDeck = function (pos) {
    //cardsctx.clearRect(0, 0, thisCard.width, thisCard.height);
    cardsCanvas.width = cardsCanvas.width;
    cardsctx.font = "70px serif";
    cardsctx.textAlign = "center";
    cardsctx.stroke(line);
    cardsctx.fillStyle = "rgb(220,220,220)";
    cardsctx.fillRect(600, chooseR*75, 50, 75);
    cardsctx.fillStyle = "rgb(0,0,0)";
    for (let index = 0; index < relationsLines.length; index++) {
        cardsctx.stroke(relationsLines[index]);

    }
    for (let index = 0; index < cardsImages.length; index++) {
        var theimg = cardsImages[index];
        var index1 = index % 10;
        var index2 = (index - index1) / 10;
        cardsctx.drawImage(theimg, index1 * 50, index2 * 75, 50, 75);
    }
    for (let index1 = 0; index1 < deck.relations.length; index1++) {
        cardsctx.stroke(relationsLines[index1]);
        cardsctx.fillText(deck.relations[index1].time, 725, (index1+1)*75);
        for (let index2 = 0; index2 < deck.relations[index1].startCard.length; index2++) {
            cardsctx.drawImage(cardsImages[deck.relations[index1].startCard[index2]], 500 + index2 * 50, index1 * 75, 50, 75);
        }
        for (let index2 = 0; index2 < deck.relations[index1].produceCard.length; index2++) {
            cardsctx.drawImage(cardsImages[deck.relations[index1].produceCard[index2]], 750 + index2 * 50, index1 * 75, 50, 75);
        }
        if (deck.relations[index1].retainCard != null) {
            cardsctx.drawImage(cardsImages[deck.relations[index1].retainCard], 650 + index2 * 50, index1 * 75, 50, 75);
        }

    }
    if (inhand) {
        cardsctx.drawImage(cardsImages[inhandCard], pos.x - 25, pos.y - 37, 50, 75);
    }
}

var createRelation = function () {
    var emptyRelation = { startCard: [], time: 0, retainCard: null, produceCard: [] };
    deck.relations.push(emptyRelation);
    deck.relationsnum++;
    var frame = drawReFrame();

    //cardsctx.stroke(frame);
    relationsLines.push(frame);
}

var drawReFrame = function () {
    var frame = new Path2D();
    frame.moveTo(500, (relationsLines.length) * 75);
    frame.lineTo(500, (relationsLines.length + 1) * 75);
    frame.lineTo(600, (relationsLines.length + 1) * 75);
    frame.lineTo(600, (relationsLines.length) * 75);
    frame.lineTo(500, (relationsLines.length) * 75);
    frame.moveTo(600, (relationsLines.length) * 75 + 25);
    frame.lineTo(650, (relationsLines.length) * 75 + 25);
    frame.moveTo(600, (relationsLines.length) * 75 + 50);
    frame.lineTo(650, (relationsLines.length) * 75 + 50);
    frame.moveTo(650, (relationsLines.length) * 75);
    frame.lineTo(650, (relationsLines.length + 1) * 75);
    frame.lineTo(700, (relationsLines.length + 1) * 75);
    frame.lineTo(700, (relationsLines.length) * 75);
    frame.lineTo(650, (relationsLines.length) * 75);
    frame.moveTo(750, (relationsLines.length) * 75);
    frame.lineTo(750, (relationsLines.length + 1) * 75);
    frame.lineTo(900, (relationsLines.length + 1) * 75);
    frame.lineTo(900, (relationsLines.length) * 75);
    frame.lineTo(750, (relationsLines.length) * 75);
    return frame;
}

var setTime = function(){
    var x = document.getElementById('setTime');
    var time = x.value
    deck.relations[chooseR].time = time;
    console.log(time);
    recreateDeck({x:0,y:0});
}

document.getElementById("decideTime").addEventListener('click', function () {
    setTime();
});