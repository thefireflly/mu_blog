var theCardTable = document.getElementById('cardTable');
var ctx = theCardTable.getContext('2d');
var newCards = [];
var deck = {cards:[],cardsnum:0,relations:[],relationsnum:0,cardNamenum:0};
var card2Relation = [];

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
        var emptyCard = createEmptyCard();
        line.push(emptyCard);
    }
    tableCards.push(line);
}
var tableData = {images:[],newCardList:[],tableCards:tableCards,inhand:false,handCard:null,backpalce:null,roundNumber:1};
// 画布上的事件监听器
var getPosition = e => {
    return {
        x: e.offsetX,
        y: e.offsetY
    }
}

document.getElementById("test").addEventListener('click', function () {
    for (let index = 0; index < deck.cards.length; index++) {
        createCard(index);
    }
    console.log(card2Relation);
});
document.getElementById("nextRound").addEventListener('click', function () {
    return;
});

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
        tableData.handCard = tableData.tableCards[index1][index2];
        putTableCard(index1,index2,createEmptyCard());
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
                putTableCard(index1,index2,tableData.handCard);
            }else{
                reaction(tableData.handCard.deckIndex,tableData.tableCards[index1][index2].deckIndex,index1,index2);

            }
            
        }
        recreateTable(pos);
        theCardTable.removeEventListener('mousemove', dragging);

    }
    

})


//更新画布，不涉及任何信息改变，仅仅刷新
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


            ctx.fillStyle = "rgb(220,220,220)";
            ctx.fillRect(index1*50,index2*75+58, 20, 17);
            ctx.fillRect(index1*50+30,index2*75+58, 20, 17);
            ctx.font = "22px serif";
            ctx.fillStyle = "rgb(0,0,0)";
            ctx.textAlign = "left";
            ctx.fillText(theCard.time,index1*50,(index2+1)*75);
            ctx.textAlign = "right";
            ctx.fillText(theCard.number,(index1+1)*50,(index2+1)*75);
        }
    }
    if(tableData.inhand){
        ctx.drawImage(tableData.images[tableData.handCard.imgIndex], pos.x-25, pos.y-37, 50, 75);
    }
}




//合成关系读取
var reaction = function(cardnum1,cardnum2,index1,index2){
    //合成公式加载模块，长期施工
        //这一小节施工中
    var ans = -1;
    for (let index = 0; index < deck.relations.length; index++) {
        var relat = deck.relations[index];
        if((cardnum1 == relat.startCard[0] && cardnum2 == relat.startCard[1]) || (cardnum1 == relat.startCard[1] && cardnum2 == relat.startCard[0])){
            ans = index;
        }
    }
    if(ans != -1){
        createTableCard(index1,index2,ans);
    }else if(cardnum1 == cardnum2 && card2Relation[cardnum1] == -1){
        tableData.handCard.number += tableData.tableCards[index1][index2].number;
        putTableCard(index1,index2,tableData.handCard);
        return -1;
    }else{
        if(tableData.backpalce == null){
            tableData.newCardList.push(tableData.handCard);
        }else{
            putTableCard(tableData.backpalce.index1,tableData.backpalce.index2,tableData.handCard);
        }
    }
    return ans;
}

var imageloading = function(deckIndex){
    var image = new Image();
    image.onload = function(){
        tableData.images.push(image);
        recreateTable();
    }
    image.src = deck.cards[deckIndex].img;
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

var timePass = function(){
    for (let index1 = 0; index1 < tableData.tableCards.length; index1++) {
        for (let index2 = 0; index2 < tableData.tableCards[index1].length; index2++) {
            if(tableData.tableCards[index1][index2].deckIndex == -1){
                continue;
            }
            
            
        }
        
    }
    tableData.roundNumber++;
}
