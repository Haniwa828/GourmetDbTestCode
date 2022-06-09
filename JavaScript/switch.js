// 店の詳細ページの開閉
function shopPress(id){ 
    let tempoReviewArray = []
    let idNum = Number(id.replace('shop', '')); // 要素のidから数字のみ抜き取り

    // 影響しないように変数のコピー
    for (let i in reviewArray) {
        tempoReviewArray[i] = reviewArray[i];
    }

    // 日付のフォーマット変更
    for(let i = 0; i < tempoReviewArray.length; i++){
        if(shopArray[idNum].店名 === tempoReviewArray[i].店名){
            tempoReviewArray[i].タイムスタンプ = new Date(tempoReviewArray[i].タイムスタンプ);
            tempoReviewArray[i].タイムスタンプ = tempoReviewArray[i].タイムスタンプ.toISOString().substr(0, 10);
        }
        else{
            tempoReviewArray.splice(i, 1);
            i--;
        }
    }

    // 詳細部分の設置/開閉
    // 初めて開けるとき
    if(document.getElementById('container' + idNum).textContent == []){
        detailComponent(idNum, tempoReviewArray, sumReviewArray, shopArray);
    }
    // 既に要素が生成されてるとき
    else{
        detailOpen(idNum);
    }
}


// 詳細部分の開閉
function detailOpen(idNum){
    if(document.getElementById('container' + idNum).style.display != 'none'){
        document.getElementById('container' + idNum).style.display = 'none'
    }
    else{
        document.getElementById('container' + idNum).style.display = 'block'
    }
}

// 詳細欄のメイン画像切り替え
function changePhoto(id, src){
    let idNum = Number(id.replace('photo', ''));
    let element = document.getElementById('mainImage' + idNum);

    element.src = src;
    // shopPress('shop' + idNum)
}

// モーダルウィンドウの呼び出し
$(function () {
    $('.js-open').click(function () {
        $("body").addClass("no_scroll"); // 背景固定させるクラス付与
        id4form = $(this).data('id'); // 何番目のキャプション（モーダルウィンドウ）か認識
        $('#overlay, .modal-window[data-id="modal' + id4form + '"]').fadeIn();

        // let idComponent = 'forReviewLink' + id;

        for(let i = shopArray.length - 1; i >= 0; i--){
            $('#forReviewLink' + id4form).append(' \
            <div id="shopName'+ i +'">'+ shopArray[i].店名 +'</div> \
            ')
        }
        
        $('#forReviewLink' + id4form).append(' \
            <div id="noMatch" style="display: none">一致する結果はありませんでした</div> \
        ')
    });
    // オーバーレイクリックでもモーダルを閉じるように
    $('.js-close , #overlay').click(function () {
        $("body").removeClass("no_scroll"); // 背景固定させるクラス削除
        $('#overlay, .modal-window').fadeOut();
        $('#forReviewLink' + id4form).empty()
    });
});