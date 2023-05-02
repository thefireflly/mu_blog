var theCardTable = document.getElementById('cardTable');
var ctx = theCardTable.getContext('2d');
var newCards = [];
var deck = {cards:[],cardsnum:0,relations:[],relationsnum:0,cardNamenum:0};

//以下是游戏界面画布绘制

var theEnv = new Path2D();
for (let index = 0; index <= 20; index++) {
    theEnv.moveTo(index * 50, 0);
    theEnv.lineTo(index * 50, 750);
}
for (let index = 0; index <= 10; index++) {
    theEnv.moveTo(0, index * 75);
    theEnv.lineTo(1000, index * 75);
}
ctx.stroke(theEnv);




//初始化桌面卡牌数组
var tableCards = [];
for (let index1 = 0; index1 < 20; index1++) {
    var line = [];
    for (let index2 = 0; index2 < 10; index2++) {
        var emptyCard = {imgIndex:-1,number:0,deckIndex:-1};
        line.push(emptyCard);
    }
    tableCards.push(line);
}
var tableData = {images:[],newCardList:[],tableCards:tableCards,inhand:false,handCard:null,backpalce:null};
// 画布上的事件监听器
var getPosition = e => {
    return {
        x: e.offsetX,
        y: e.offsetY
    }
}
theCardTable.addEventListener('mousedown', e => {
    var pos = getPosition(e)
    var index1 = (pos.x-(pos.x)%50)/50;
    var index2 = (pos.y-(pos.y)%75)/75;
    if(index2 == 10 && (index1 < tableData.newCardList.length)){
            tableData.handCard = tableData.newCardList.splice(index1, 1)[0];
            tableData.inhand = true;
            tableData.backpalce = null;
            theCardTable.addEventListener('mousemove', dragging);
    }
    else if(tableData.tableCards[index1][index2].imgIndex != -1){
        var emptyCard = {imgIndex:-1,number:0,deckIndex:-1};
        tableData.handCard = tableData.tableCards[index1][index2];
        tableData.tableCards[index1][index2] = emptyCard;
        tableData.inhand = true;
        tableData.backpalce = {index1:index1,index2:index2};
        theCardTable.addEventListener('mousemove', dragging);
    }

})

var dragging = e => {
    var pos = getPosition(e);
    recreateTable(pos);
}
/**
theCardTable.addEventListener('mousemove', e => {
})
*/
theCardTable.addEventListener('mouseup', e => {
    //函数施工中

    var pos = getPosition(e)
    var index1 = (pos.x-(pos.x)%50)/50;
    var index2 = (pos.y-(pos.y)%75)/75;
    if(tableData.inhand){
        tableData.inhand =false;
        if(index2 == 10){
            if(tableData.newCardList.length > 19){
                tableData.tableCards[tableData.backpalce.index1][tableData.backpalce.index2] = tableData.handCard;
            }else{
                tableData.newCardList.push(tableData.handCard);
            }
        }else{
            if(tableData.tableCards[index1][index2].imgIndex == -1){
                tableData.tableCards[index1][index2] = tableData.handCard;
            }else{
                var ans = reaction(tableData.handCard.deckIndex,tableData.tableCards[index1][index2].deckIndex)
                if(reaction(tableData.handCard.deckIndex,tableData.tableCards[index1][index2].deckIndex) != -1){
                    //合成公式加载模块，长期施工
                    //这一小节施工中
                    tableData.tableCards[index1][index2] = {imgIndex:tableData.images.length,number:1,deckIndex:ans};
                    imageloading(ans);
                }else{
                    if(tableData.backpalce == null){
                        tableData.newCardList.push(tableData.handCard);
                    }else{
                        tableData.tableCards[tableData.backpalce.index1][tableData.backpalce.index2] = tableData.handCard;
                    }
                }
            }
            console.log(tableData.tableCards[index1][index2].imgIndex);
            
        }
        recreateTable(pos);
        theCardTable.removeEventListener('mousemove', dragging);

    }
    

})

var createCard = function (cardnum) {
    var thecard;
    for (let index = 0; index < deck.cards.length; index++) {
        thecard = deck.cards[index];
        if(cardnum == thecard.num){
            break;
        }
    }
    var img = new Image();
    img.onload = function () {
        ctx.drawImage(img, tableData.newCardList.length * 50, 750, 50, 75);
        tableData.images.push(img);
        var newCreateCard = { imgIndex:tableData.images.length-1, number: 1, deckIndex: cardnum };
        tableData.newCardList.push(newCreateCard);
    }
    img.src = thecard.img;
}

var putCard = function () {

}

var recreateTable = function(pos){
    ctx.clearRect(0, 0, theCardTable.width, theCardTable.height);
    ctx.stroke(theEnv);
    for (let index = 0; index < tableData.newCardList.length; index++) {
        var theCard = tableData.newCardList[index];
        ctx.drawImage(tableData.images[theCard.imgIndex], index * 50, 750, 50, 75);
    }
    for (let index1 = 0; index1 < 20; index1++) {
        for (let index2 = 0; index2 < 10; index2++) {
            var theCard = tableData.tableCards[index1][index2]
            if(theCard.imgIndex == -1){
                continue;
            }
            ctx.drawImage(tableData.images[theCard.imgIndex],index1*50,index2*75, 50, 75);
            
        }
    }
    if(tableData.inhand){
        ctx.drawImage(tableData.images[tableData.handCard.imgIndex], pos.x-25, pos.y-37, 50, 75);
    }
}
document.getElementById("test").addEventListener('click', function () {
    for (let index = 0; index < deck.cards.length; index++) {
        createCard(index);
    }
});
document.getElementById("nextRound").addEventListener('click', function () {
    return;
});


var reaction = function(cardnum1,cardnum2){
    for (let index = 0; index < deck.relations.length; index++) {
        var relat = deck.relations[index];
        if((cardnum1 == relat.startCard[0] && cardnum2 == relat.startCard[1]) || (cardnum1 == relat.startCard[1] && cardnum2 == relat.startCard[0])){
            return relat.retainCard;
        }
    }
    return -1;
}

var imageloading = function(deckIndex){
    var image = new Image();
    image.onload = function(){
        tableData.images.push(image);
    }
    image.src = deck.cards[deckIndex].img;
}