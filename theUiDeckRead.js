var deckreadBtn = document.getElementById('deckRead');
var card2Relation = [];
var cardSplit = [];
deckreadBtn.onchange = function () {
    const fileList = deckreadBtn.files;
    if (!fileList.length) {
        return;
    }
    const reader = new FileReader();
    reader.readAsText(fileList[0], "UTF-8");
    //读取
    reader.onload = function (event) {
        var readAllData = JSON.parse(event.target.result);
        deck = readAllData;
        timeRelation();
    }
}

var timeRelation = function(){
    for (let index = 0; index < deck.cards.length; index++) {
        card2Relation.push(-1);
    }
    for (let index = 0; index < deck.relations.length; index++) {
        if(deck.relations[index].startCard.length == 1){
            card2Relation[deck.relations[index].startCard[0]] = index;
        }
    }
}

var splitRelation = function(){
    //暂时用不上的函数
    for (let index = 0; index < deck.cards.length; index++) {
        cardSplit.push(-1);
    }
    for (let index = 0; index < deck.relations.length; index++) {
        if(deck.relations[index].startCard.length == 2 && deck.relations[index].retainCard != null){
            cardSplit[deck.relations[index].retainCard] = index;
        }
    }
}