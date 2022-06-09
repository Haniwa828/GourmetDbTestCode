// 店ブロック挿入用関数
function shopComponent(array){ 
    // 店の要素全削除
    $('.shops').remove(); 

    // 元の変数に影響が無いようにコピー
    let tempoArray = JSON.parse(JSON.stringify(array));

    // 規定のジャンル名の場合は画像に差し替え
    for(let i = 0; i < tempoArray.length; i++){
        tempoArray[i].ジャンル = tempoArray[i].ジャンル.replace('和食', 'https://haniwa828.github.io/JapanGourmetDB/photo/japan.png')
        tempoArray[i].ジャンル = tempoArray[i].ジャンル.replace('中華', 'https://haniwa828.github.io/JapanGourmetDB/photo/china.png')
        tempoArray[i].ジャンル = tempoArray[i].ジャンル.replace('イタリアン', 'https://haniwa828.github.io/JapanGourmetDB/photo/italy.png')
        tempoArray[i].ジャンル = tempoArray[i].ジャンル.replace('喫茶', 'https://haniwa828.github.io/JapanGourmetDB/photo/cafe.png')
        tempoArray[i].ジャンル = tempoArray[i].ジャンル.replace('デザート', 'https://haniwa828.github.io/JapanGourmetDB/photo/cake.png')
        tempoArray[i].ジャンル = tempoArray[i].ジャンル.replace('ラーメン', 'https://haniwa828.github.io/JapanGourmetDB/photo/ramen.png')

        // ジャンルを個別に分解
        tempoArray[i].ジャンル = tempoArray[i].ジャンル.split(",");
    }

    // 画面サイズの取得
    let width = document.body.clientWidth - 17

    // 要素の配置
    // 表示する要素が無いとき......
    if(array.length == 0){ 
        $('#shop').append('<div class="shops">まだ有効な店が登録されていません</div>');
    }
    // ある時ー!
    else{ 
        // 渡された変数にある店の情報を順番に配置
        for(let i = array.length - 1; i >= 0; i--){ // 後ろから前の順番
            // レビュー設定
            // デフォルト
            let review = 0;

            // あれば代入
            review = array[i].レビュー;
            // 0.5刻みの数字に調整
            review = review - review%0.5;

            // 'shop'の最後に配置
            $('#shop').append(' \
            <div id="shop' + i + '" class="shops" style="display: block; background-color: #fffafa; text-align: left; border: 1px solid; border-color: #dcdcdc; border-radius: 5px; width: '+ width +'; margin: 5px 0px 5px 0px; padding: 10px; position: relative;" onclick="shopPress(id)"> \
                <div style="display: flex; flex-wrap: wrap;"> \
                    <div> \
                        <div id="genre'+ i +'" style="font-size: small; color: gray;"> \
                        </div> \
                        <img style="width: '+ width/3 +'px; height: '+ width/4 +'px; object-fit: cover;" src="'+ (array[i].写真)[0] +'"> \
                    </div> \
                    <div>&ensp;&ensp;</div> \
                    <div style="width: '+ (2*width/3 - 70) +'px;"> \
                        <div style="font-size: small; color: gray;"> \
                            '+ array[i].形式+' \
                        </div> \
                        <div style="font-size: x-large; font-weight: bold; word-break: break-all;"> \
                            '+ array[i].店名 +' \
                        </div> \
                        <div style="color: dimgray;"> \
                            <span class="star5_rating" data-rate="'+ review +'"></span> \
                            '+ array[i].レビュー +' \
                        </div> \
                        <div style="font-size: small; color: gray; text-align: right; word-wrap: break-word; display: flex; margin: 0% 0% 0% 0%;"> \
                            最終更新日：'+ array[i].タイムスタンプ +' \
                        </div> \
                    </div> \
                </div> \
                <div id="container'+ i +'" style="block" onclick="detailOpen('+ i +')"></div> \
            </div> \
            ');

            // ジャンルを配置
            for(let j = 0; j < tempoArray[i].ジャンル.length; j++){
                // 画像の場合
                if(tempoArray[i].ジャンル[j].indexOf('/photo/') != -1){
                    $('#genre' + i).append(' \
                        <img style="width: '+ width/12 +'px; height: '+ width/12 +'px; object-fit: cover;" src="'+ tempoArray[i].ジャンル[j] +'"></img> \
                    ');
                }
                // 画像じゃない場合
                else{
                    $('#genre' + i).append(' \
                        <span>'+ tempoArray[i].ジャンル[j] +'</span> \
                    ');
                }
            }
        }
    }
}


// 詳細欄設置
function detailComponent(id, rArray, rsArray, sArray){
    let review = 0;
    let width = document.body.clientWidth - 17

    // レビューがあるか確認
    for(let j = 0; j < rsArray.length; j++){ 
        // ある時ー
        if(sArray[id].店名 === rsArray[j].店名){
            review = rsArray[j].評価;
        }
    }

    // 評価を文字列に
    reviewStr = review.toString(); 
    // 星用に0.5刻みに
    review = review - review%0.5;

    // URLにつける用に&を一時的に書き換え
    let shopid = sArray[id].店名.replace('&', 'aannddkkaarrii')

    // 設置
    $('#container' + id).append(' \
        <div style="margin: 10px 0px 10px 0px;"> \
            <img id="mainImage'+ id +'" style="width: '+ width/1.5 +'px; height: '+ width/2 +'px; object-fit: contain;" src="'+ (sArray[id].写真)[0] +'"> \
        </div> \
        <div id="images'+ id +'" style="display: flex; overflow-x: auto; margin: 10px 0px 10px 0px;"> \
        </div> \
        <div id="address" style="word-break: break-all;"> \
            営業日：'+ sArray[id].定休日 +' \
        </div> \
        <div id="address" style="word-break: break-all;"> \
            金額目安(昼)：'+ sArray[id].昼営業の金額目安 +' \
        </div> \
        <div id="address" style="word-break: break-all;"> \
            金額目安(夜)：'+ sArray[id].夜営業の金額目安 +' \
        </div> \
        <br> \
        <div id="address" style="word-break: break-all;"> \
            住所：'+ sArray[id].住所 +' \
        </div> \
        <div style="word-break: break-all;"> \
            ホームページ： \
            <a id="page" href="'+ sArray[id].ホームページリンク +'" target="_blank"> \
                '+ sArray[id].ホームページリンク +' \
            </a> \
        </div> \
        <div style="word-break: break-all;"> \
            SNS： \
            <a id="page" href="'+ sArray[id].SNSリンク +'" target="_blank"> \
                '+ sArray[id].SNSリンク +' \
            </a> \
        </div> \
        <div style="word-break: break-all;"> \
            電話番号：'+ sArray[id].電話番号 +' \
        </div> \
        <br> \
        <div style="font-size: small; color: gray;"> \
            酒：'+ sArray[id].酒の提供+' \
        </div> \
        <div id="explain" style="font-size: large;" style="word-break: break-all;"> \
            説明： \
            <br> \
            '+ sArray[id].説明.replace(/\r?\n/g, '<br>') +' \
        </div> \
        <br> \
        <a class="button" href="https://haniwa828.github.io/JapanGourmetDB/html/details.html?shopName='+ shopid +'" target="_blank">別ページで開く</a> \
        <br> \
        <br> \
        <div style="margin: 0px 0px 10px 0px;"> \
            レビュー： \
        </div> \
        <div id="review'+ id +'" style="display: flex; overflow-x: auto"> \
        </div> \
    </div> ');

    // 写真の配置
    for(let i = 0; i < (sArray[id].写真).length; i++){
        $('#images' + id).append(' \
        <img id="photo'+ id +'" style="width: '+ width/3 +'px; height: '+ width/4 +'px; object-fit: contain;" src="'+ (sArray[id].写真)[i] +'" onclick="changePhoto(id, src)"> \
        ')
    }

    // レビューの配置
    for(let i = rArray.length - 1; i >= 0; i--){
        let review = rArray[i].評価 - rArray[i].評価%0.5;

        $('#review' + id).append(' \
        <div class="reviews" style="background-color: #f8f8ff; text-align: left; border: 1px solid; border-color: #dcdcdc; border-radius: 5px; width: 200px; min-width: 200px; margin: 5px 10px 5px 0px; padding: 15px; position: relative;"> \
            <span style="font-size: x-large; font-weight: bold; word-wrap: break-word;"> \
                '+ rArray[i].タイトル +' \
            </span> \
            <br> \
            <div> \
                <span class="star5_rating" data-rate="'+ review +'"> \
                </span> \
                '+ rArray[i].評価 +' \
            </div> \
            <div> \
                '+ rArray[i].レビュー +' \
            </div> \
            <br> \
            <div id="reviewImage'+ i +'of'+ id +'" style="display: flex; overflow-x: auto"> \
            </div> \
            <div style="font-size: small; color: darkgray; text-align: right; word-wrap: break-word;"> \
                最終更新日：'+ rArray[i].タイムスタンプ +' \
            </div> \
        </div>');

        if((rArray[i].写真)[0] != ''){
            for(let j = 0; j < rArray[i].写真.length; j++){
                $('#reviewImage'+ i + 'of' + id).append(' \
                <img style="width: '+ width/3 +'px; height: '+ width/4 +'px; object-fit: contain; margin: 0px 10px 5px 0px;" src="'+ (rArray[i].写真)[j] +'"> \
                ')
            }
        }
    }
}