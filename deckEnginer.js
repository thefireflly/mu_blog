var line = new Path2D();
line.moveTo(500, 0);
line.lineTo(500, 750);
cardsctx.stroke(line);
var relationsLines = [];
var inhand = false;
var inhandCard;


cardsCanvas.addEventListener('mousedown', e => {
    var pos = getPosition(e);
    console.log(pos);
    var posIndex = choose(pos);
    if (posIndex < deck.cardsnum && pos.x < 500) {
        inhandCard = posIndex;
        inhand = true;
        cardsCanvas.addEventListener('mousemove', dragging);
    }

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
    cardsctx.stroke(line);
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
        for (let index2 = 0; index2 < deck.relations[index1].startCard.length; index2++) {
            cardsctx.drawImage(cardsImages[deck.relations[index1].startCard[index2]], 500 + index2 * 50, index1 * 75, 50, 75);
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

    cardsctx.stroke(frame);
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
    return frame;
}