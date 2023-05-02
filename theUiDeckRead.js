var deckreadBtn = document.getElementById('deckRead');
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
    }
}