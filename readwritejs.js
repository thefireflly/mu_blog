const jpgread = document.getElementById('jpgread');
const writeBtn = document.getElementById('write');
//const readImageBtn = document.getElementById('readImage');
jpgread.onchange = function () {
    
    const fileList = jpgread.files;
    if (!fileList.length) {
        return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(fileList[0]);
    reader.onload = function (event) {
        
        var theurl = event.target.result;
        readImage(theurl);
        drawUrl(cardImage);
    }
}

writeBtn.onclick = function () {
    // 字符内容转变成blob地址

    theAllData = writeAllData();

    const content = JSON.stringify(theAllData);
    const blob = new Blob([content]);

    // 创建一个 a 标签，添加属性
    let eleLink = document.createElement('a');
    eleLink.download = "Node.json";
    eleLink.style.display = 'none';
    eleLink.href = URL.createObjectURL(blob);

    // 触发点击，然后移除
    document.body.appendChild(eleLink);
    eleLink.click();
    document.body.removeChild(eleLink);
};

var readImage = function(theurl){
    cardImage = theurl;
}

/*
    var img = new Image();   // 创建 img 元素
    console.log(cardImage);
    img.src = cardImage; // 设置图片源地址
    ctx.drawImage(img,0,0);
*/

var writeAllData = function () {
    var answer = deck;
    return answer;
}

var cardsRead = document.getElementById('deckRead');
cardsRead.onchange = function () {
    const fileList = cardsRead.files;
    if (!fileList.length) {
        return;
    }
    const reader = new FileReader();
    reader.readAsText(fileList[0], "UTF-8");
    //读取
    reader.onload = function (event) {
        var readAllData = JSON.parse(event.target.result);
        readAll(readAllData);
    }
}
var readAll = function(AllData){
    deck = AllData;

    for (let index = 0; index < deck.cards.length; index++) {
        loadingImg(deck.cards[index].img); 
    }
    for (let index = 0; index < deck.relations.length; index++) {
        var frame = drawReFrame();
        relationsLines.push(frame);
    }
}

var loadingImg = function(theurl){
    var theimg = new Image();
    theimg.onload = function(){
        drawDeckImage(theimg);
        cardsImages.push(theimg);
        recreateDeck();
        //每加载一次图片就刷新画布，解决图片加载后画布不刷新的问题，可能会影响性能，所以暂时做测试
    }
    theimg.src = theurl; 
}
