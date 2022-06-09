// 検索窓
function search(){ 
    // 入力文字列の取得
    let words = document.getElementById('search').value; 
    // 全角スペースを半角に
    words = words.replace(/　/g, " "); 
    // 半角スペースごとにリストに分割して挿入
    word = words.split(' '); 
    // shopArray保持のためのコピー
    let oriArray = shopArray.slice(); 

    // 一旦全ての要素ブロックを表示
    for(let i = 0; i < oriArray.length; i++){ 
        let target = document.getElementById('shop' + i);
        target.style.display = 'flex'
    }

    // 詳細設定の参照
    applyPress();
}


// 詳細設定の反映
function applyPress(){
    let oriArray = []

    // 変数のコピー
    for (let i in shopArray) {
        oriArray[i] = shopArray[i];
    }

    // 選ばれたものを格納する配列
    let selectedCategory = [];
    let selectedOperate = [];
    let selectedCost = [];
    let selectedAtmosphere = [];
    let selectedArea = [];
    let selectedAlcohol = [];
    let selectedSort = '';

    // それぞれの選択状況を取得
    let categoryCategory = document.getElementsByName("category");
    let categoryOperate = document.getElementsByName("operateDay");
    let categoryCost = document.getElementsByName("cost");
    let categoryAtmosphere = document.getElementsByName("atmosphere");
    let categoryArea = document.getElementsByName("area");
    let categoryAlcohol = document.getElementsByName("alcohol");
    let categorySort = document.getElementsByName("sort");

    // 選択されているものだけselectedに格納
    checkCheck(selectedCategory, categoryCategory);
    checkCheck(selectedOperate, categoryOperate);
    checkCheck(selectedCost, categoryCost);
    checkCheck(selectedAtmosphere, categoryAtmosphere);
    checkCheck(selectedArea, categoryArea);
    checkCheck(selectedAlcohol, categoryAlcohol);
    // ソート方法の格納
    for (let i = 0; i < categorySort.length; i++){
        if (categorySort.item(i).checked){
            selectedSort = categorySort.item(i).value;
        }
    }

    // ソート
    sort(selectedSort);

    for(let i = 0; i < oriArray.length; i++){ // 一旦全ての要素ブロックを非表示
        let target = document.getElementById('shop' + i);
        target.style.display = 'none'
    }

    // それぞれのselectedで検索
    for(let j = 0; j < selectedCategory.length; j++){ 
        for(let k = 0; k < selectedOperate.length; k++){
            for(let l = 0; l < selectedCost.length; l++){
                for(let m = 0; m < selectedAtmosphere.length; m++){
                    for(let o = 0; o < selectedArea.length; o++){
                        for(let p = 0; p < selectedAlcohol.length; p++){
                            // それぞれの要素に対して検索
                            for(let i = 0; i < oriArray.length; i++){ 
                                // 全て一致する時ー!
                                if(
                                    (oriArray[i].定休日).indexOf(selectedOperate[k]) != -1 
                                    && (
                                        (oriArray[i].昼営業の金額目安).indexOf(selectedCost[l]) != -1 
                                        || (oriArray[i].夜営業の金額目安).indexOf(selectedCost[l]) != -1 
                                    )
                                    && (oriArray[i].形式).indexOf(selectedAtmosphere[m]) != -1 
                                    && (
                                        (oriArray[i].住所.toUpperCase()).indexOf(selectedArea[o]) != -1 
                                        || selectedArea[o] == "全地域"
                                        ) 
                                    && (oriArray[i].酒の提供).indexOf(selectedAlcohol[p]) != -1 
                                    && document.getElementById('shop' + i).style.display == 'none'){ 
                                    // 規定のカテゴリーの時
                                    if(((oriArray[i].ジャンル).indexOf(selectedCategory[j]) != -1)){
                                        target = document.getElementById('shop' + i);
                                        target.style.display = 'block' // 要素ブロックを表示
                                    }
                                    // その他のカテゴリーの時
                                    else if(selectedCategory[j] == 'その他'){
                                        let tempoStr = oriArray[i].ジャンル.slice();

                                        // 規定のカテゴリーを消す
                                        tempoStr = tempoStr.replace('和食', '');
                                        tempoStr = tempoStr.replace('喫茶', '');
                                        tempoStr = tempoStr.replace('洋食', '');
                                        tempoStr = tempoStr.replace('イタリアン', '');
                                        tempoStr = tempoStr.replace('デザート', '');
                                        tempoStr = tempoStr.replace('喫茶', '');
                                        tempoStr = tempoStr.replace('ラーメン', '');
                                        tempoStr = tempoStr.replace(/, /g, '');

                                        // 何かしらの要素(その他の部分)が残っている時
                                        if(tempoStr != ''){
                                            target = document.getElementById('shop' + i);
                                            target.style.display = 'block' // 要素ブロックを表示
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    check(oriArray, word);
}

// 詳細設定窓の開閉
function filterOpen(){
    let element = document.getElementById('filter');

    if(element.style.display == 'block'){
        element.style.display = 'none';
    }
    else{
        element.style.display = 'block';
    }
}

// ソート
function sort(rule){
    switch(rule){
        case '最終更新日':
            shopArray.sort(function(a, b) {
                // 大文字と小文字を無視する
                var nameA = a.タイムスタンプ.toString().toUpperCase(); 
                var nameB = b.タイムスタンプ.toString().toUpperCase(); 
    
                if (nameA < nameB) {
                  return -1;
                }
                if (nameA > nameB) {
                  return 1;
                }
    
                // names must be equal
                return 0;
            });
            break;

        case '店名(a-z)':
            shopArray.sort(function(a, b) {
                // 大文字と小文字を無視する
                var nameA = a.店名.toString().toUpperCase(); 
                var nameB = b.店名.toString().toUpperCase();
                
                if (nameA < nameB) {
                  return 1;
                }
                if (nameA > nameB) {
                  return -1;
                }
    
                // names must be equal
                return 0;
            });
            break;
        
        case '店名(z-a)':
            shopArray.sort(function(a, b) {
                // 大文字と小文字を無視する
                var nameA = a.店名.toString().toUpperCase(); 
                var nameB = b.店名.toString().toUpperCase(); 
    
                if (nameA < nameB) {
                  return -1;
                }
                if (nameA > nameB) {
                  return 1;
                }
    
                // names must be equal
                return 0;
            });
            break;

        default:
            shopArray.sort(function(a, b) {
                // 大文字と小文字を無視する
                var nameA = a.レビュー.toString().toUpperCase(); 
                var nameB = b.レビュー.toString().toUpperCase(); 
    
                if (nameA < nameB) {
                  return -1;
                }
                if (nameA > nameB) {
                  return 1;
                }
    
                // names must be equal
                return 0;
            });
    }

    // ソートした状態で店舗情報の配置
    shopComponent(shopArray);
}

// 検索窓の言葉と一致する要素の検索
function check(originalArray, word){ 
    // それぞれのwordで検索
    for(let j = 0; j < word.length; j++){ 
        // それぞれの要素に対して検索
        for(let i = 0; i < originalArray.length; i++){ 
            // ジャンル、店名、説明、住所にその言葉が含まれる時ー
            if(
                (
                    (originalArray[i].ジャンル).indexOf(word[j]) != -1 
                    || (originalArray[i].店名.toUpperCase()).indexOf(word[j].toUpperCase()) != -1 
                    // || (originalArray[i].形式).indexOf(word[j]) != -1 
                    || (originalArray[i].説明.toUpperCase()).indexOf(word[j].toUpperCase()) != -1 
                    || (originalArray[i].住所.toUpperCase()).indexOf(word[j].toUpperCase()) != -1 
                ) 
                && document.getElementById('shop' + i).style.display == 'block'
                ){
                target = document.getElementById('shop' + i);
                target.style.display = 'block' // 要素ブロックを表示
            }
            // 含まれ無いとき......
            else{ 
                target = document.getElementById('shop' + i);
                target.style.display = 'none' // 要素ブロックを非表示
            }
        }
    }
}

// フォームへ行く前の店名検索
function searchShop(id){
    let words = document.getElementById(id).value; // 入力文字列の取得
    words = words.replace(/　/g, " "); // 全角スペースを半角に
    let searchKey = words.split(' '); // 半角スペースごとにリストに分割して挿入
    let shopNames = [];

    // 一旦全ての店名を表示
    for(let i = 0; i < shopArray.length; i++){ 
        let target = document.getElementById('shopName' + i);
        shopNames.push(target.textContent)
        target.style.display = 'block'
    }

    // それぞれのsearchKeyで検索
    for(let j = 0; j < searchKey.length; j++){ 
        // それぞれの要素に対して検索
        for(let i = 0; i < shopNames.length; i++){ 
            // 一致する要素がある時ー!
            if(shopNames[i].toUpperCase().indexOf(searchKey[j].toUpperCase()) != -1 && document.getElementById('shop' + i).style.display == 'block'){ 
                target = document.getElementById('shopName' + i);
                target.style.display = 'block' // 要素ブロックを表示
            } 
            // 無いとき......
            else{
                target = document.getElementById('shopName' + i);
                target.style.display = 'none' // 要素ブロックを非表示
            }
        }
    }
    
    let block = 0;
    // それぞれの要素に対して検索
    for(let i = 0; i < shopNames.length; i++){ 
        // 一致する要素がある時ー!
        if(document.getElementById('shopName' + i).style.display == 'block'){ 
            block++;

            console.log(i)
            break;
        }
    }

    // メッセージ表示
    if(block == 0){
        document.getElementById('noMatch').style.display = 'block';
    }
    else{
        document.getElementById('noMatch').style.display = 'none';
    }
}

// 選択されているチェックボックスの取得と格納
function checkCheck(selected, category){
    for (let i = 0; i < category.length; i++) {
        // 選択されている場合
        if (category[i].checked) { //(category[i].checked === true)と同じ
          selected.push(category[i].value);
        }
    }
}