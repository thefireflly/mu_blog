var thisCard = document.getElementById('theCard');
var cardsCanvas = document.getElementById('cards');
var ctx = thisCard.getContext('2d');
var cardsctx = cardsCanvas.getContext('2d');
var cardsImages = [];
var cardImage;
//设定存储卡组信息的全局变量
var deck = {cards:[],cardsnum:0,relations:[],relationsnum:0,cardNamenum:0};
//drawAttribute()


document.getElementById("clearAll").addEventListener('click', function () {
    ctx.clearRect(0, 0, thisCard.width, thisCard.height);
})

document.getElementById("addCards").addEventListener('click', function () {
    var numCard = thisCard.toDataURL();
    deckAddnewCard(deck,numCard);
})



thisCard.addEventListener('mousedown', e => {
    var pos = getPosition(e);
    thisCard.addEventListener('mousemove', dragging);
})

thisCard.addEventListener('mouseup', e => {
    var pos = getPosition(e)
    thisCard.removeEventListener('mousemove', dragging);
})

var dragging = function (e) {
    var pos = getPosition(e);
}



var drawUrl = function(theurl){
    var img = new Image();   // 创建 img 元素
    img.onload = function(){
        ctx.drawImage(img,0,70,500,500);
    }
    img.src = theurl; // 设置图片源地址
}

var getPosition = e => {
    return {
        x: e.offsetX,
        y: e.offsetY
    };
}

var getdistance = function(pos1,pos2){
    return Math.sqrt((pos1.x-pos2.x)*(pos1.x-pos2.x)+(pos1.y-pos2.y)*(pos1.y-pos2.y));
}

var deckAddnewCard = function (deck,theimage) {
    var img = new Image();
    var smallImg = new Image();
    var constrictor = document.createElement('canvas');
    var smallerUrl;
    img.onload = function () {
        constrictor.width = 50;
        constrictor.height = 75;
        var ctr = constrictor.getContext('2d');
        ctr.drawImage(img, 0, 0, 50, 75);
        ctr.fillStyle = "rgb(220,220,220)";
        ctr.fillRect(30, 57, 50, 75);
        ctr.fillRect(0, 57, 20, 75);
        smallerUrl = constrictor.toDataURL();
        var newCard = {
            img: smallerUrl,
            num: deck.cardNamenum,
            relation: []
        }
        deck.cardNamenum++;
        deck.cards.push(newCard);
        deck.cardsnum++;

        smallImg.onload = function(){
            drawDeckImage(smallImg);
            cardsImages.push(smallImg);
        }
        smallImg.src = smallerUrl;
    }
    img.src = theimage;
}


var drawDeckImage = function(theImage){
    var index1;
    var index2;
    var theindex = cardsImages.length;
    index1 = theindex%10;
    index2 = (theindex-index1)/10;
    cardsctx.drawImage(theImage, index1*50, index2*75, 50, 75);
}
var drawAttribute = function () {
    ctx.fillStyle = "rgb(220,220,220)";
    ctx.fillRect(0, 570, 500, 180);
    //ctx.fillStyle = "rgb(200,200,255)";
    ctx.fillRect(0, 0, 500, 70);
    //ctx.fillRect(0, 570, 200, 750);
    ctx.fillStyle = "rgb(0,0,0)";
    ctx.font = "220px serif";
    ctx.textAlign = "right";
    ctx.fillText("X", 500, 750);
    ctx.textAlign = "left";
    ctx.fillText("X", 0, 750);
}
