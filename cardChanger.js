class Card {
    constructor(imgIndex, number, deckIndex, time) {
        this.imgIndex = imgIndex;
        this.number = number;
        this.deckIndex = deckIndex;
        this.time = time;
    }
}

//所有的牌桌信息更改函数必须通过以下几个函数，其中不包括关系逻辑判断部分，仅执行改变
var createCard = function (cardnum) {
    var deckCard; 
    for (let index = 0; index < deck.cards.length; index++) {
        deckCard = deck.cards[index];
        if(cardnum == deckCard.num){
            break;
        }
    }
    var img = new Image();
    img.onload = function () {
        ctx.drawImage(img, tableData.newCardList.length * 50, 750, 50, 75);
        tableData.images.push(img);
        var newCreateCard = new Card(tableData.images.length-1,1,cardnum,0);
        tableData.newCardList.push(newCreateCard);
    }
    img.src = deckCard.img;
}

var createEmptyCard = function(){
    var ans = new Card(-1,0,-1,0);
    return ans;
}


var putTableCard = function (index1,index2,card) {
    tableData.tableCards[index1][index2] = card;
}

var createTableCard = function(index1,index2,relationnum){
    var retainnum = deck.relations[relationnum].retainCard;
    var time = deck.relations[card2Relation[retainnum]].time;
    var img = new Image();
    img.onload = function(){
        var newCard = new Card(tableData.images.length,1,retainnum,time);
        tableData.tableCards[index1][index2] = newCard;
        tableData.images.push(img);
        recreateTable();
    }
    if(retainnum != null){
        img.src = deck.cards[retainnum].img;
    }else{
        putTableCard(index1,index2,createEmptyCard());
    }
}

