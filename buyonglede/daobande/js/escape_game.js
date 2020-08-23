/* ---------------------- */
/* 画像をD&Dで移動させるスクリプト */
/* ---------------------- */

$(function(){

    var objDrag = null;
    $(".drag-and-drop").each(function() {
        $(this).on("mousedown", onMouseDownObject);
        $(this).on("touchstart", onMouseDownObject);
    });
    $("body").on("mousemove touchmove", onMouseMoveBody);
    $("body").on("mouseup touchend", onMouseUpBody);

    function onMouseDownObject(e) {
        //タッチデイベントとマウスのイベントの差異を吸収
        var event = null;
        if(e.type === "mousedown") {
            event = e;
        } else {
            event = e.originalEvent.changedTouches[0];
        }
        objDrag = {
            object: $(this),
            dragFromX: event.pageX - this.offsetLeft,
            dragFromY: event.pageY - this.offsetTop,
            isDrag: true
        };
        $(this).addClass("drag");
        return false;
    }

    function onMouseMoveBody(e) {
        if (null == objDrag) {
            return;
        }
        //同様にマウスとタッチの差異を吸収
        var event = null;
        if(e.type === "mousemove") {
            event = e;
        } else {
            event = e.originalEvent.changedTouches[0];
        }
        //フリックしたときに画面を動かさないようにデフォルト動作を抑制
        e.preventDefault();
        //移動距離算出
        var mx = event.pageX - objDrag.dragFromX;
        var my = event.pageY - objDrag.dragFromY;
        $(objDrag.object).css("left", mx + "px");
        $(objDrag.object).css("top", my + "px");
    }

    function onMouseUpBody(e) {
        if (null != objDrag) {
            $(objDrag.object).removeClass("drag");
        }
        objDrag = null;
    }

});



/* ---------------------- */
/* テキストを一文字ずつ表示させる  */
/* ---------------------- */

/* ----- option ----- */
var id00 = ['text_001','text_002','text_003','text_004','text_005','text_006','text_007','text_008','text_009'];
var id01 = ['text_011','text_012','text_013','text_014','text_015','text_016','text_017','text_018','text_019'];
var id02 = ['text_021','text_022','text_023','text_024','text_025','text_026','text_027','text_028','text_029'];
var id03 = ['text_031','text_032','text_033','text_034','text_035','text_036','text_037','text_038','text_039'];
var id04 = ['text_041','text_042','text_043','text_044','text_045','text_046','text_047','text_048','text_049'];
var id05 = ['text_051','text_052','text_053','text_054','text_055','text_056','text_057','text_058','text_059'];
var id06 = ['text_061','text_062','text_063','text_064','text_065','text_066','text_067','text_068','text_069'];
var id07 = ['text_071','text_072','text_073','text_074','text_075','text_076','text_077','text_078','text_079'];
var id08 = ['text_081','text_082','text_083','text_084','text_085','text_086','text_087','text_088','text_089'];
var id09 = ['text_091','text_092','text_093','text_094','text_095','text_096','text_097','text_098','text_099'];
var id10 = ['text_101','text_102','text_103','text_104'];
var id11 = ['text_111','text_112','text_113','text_114'];
// var id = ['a','b','c']; //指定するidを全て配列で渡す
var txSp = 100; // テキストの表示速度
var dly = 300; // 次の文章までの待ち時間
/* ----- option ----- */
var count00 = 0;
var count01 = 0;
var count02 = 0;
var count03 = 0;
var count04 = 0;
var count05 = 0;
var count06 = 0;
var count07 = 0;
var count08 = 0;
var count09 = 0;
var count10 = 0;
var count11 = 0;
var tx00 = [];
var tx01 = [];
var tx02 = [];
var tx03 = [];
var tx04 = [];
var tx05 = [];
var tx06 = [];
var tx07 = [];
var tx08 = [];
var tx09 = [];
var tx10 = [];
var tx11 = [];
var txCount00 = [];
var txCount01 = [];
var txCount02 = [];
var txCount03 = [];
var txCount04 = [];
var txCount05 = [];
var txCount06 = [];
var txCount07 = [];
var txCount08 = [];
var txCount09 = [];
var txCount10 = [];
var txCount11 = [];

window.onload = function(){
    kamikakushi();
    countSet();
}

// $(function(){
//     $('#open_a002').click(function() {
//         itimozi_00();
//     });
// });

function countSet(){ // 文字数カウントの初期設定
    for(n=0;n<id00.length;n++){
        txCount00[n] = 0;
    }
    for(n=0;n<id01.length;n++){
        txCount01[n] = 0;
    }
    for(n=0;n<id02.length;n++){
        txCount02[n] = 0;
    }
    for(n=0;n<id03.length;n++){
        txCount03[n] = 0;
    }
    for(n=0;n<id04.length;n++){
        txCount04[n] = 0;
    }
    for(n=0;n<id05.length;n++){
        txCount05[n] = 0;
    }
    for(n=0;n<id06.length;n++){
        txCount06[n] = 0;
    }
    for(n=0;n<id07.length;n++){
        txCount07[n] = 0;
    }
    for(n=0;n<id08.length;n++){
        txCount08[n] = 0;
    }
    for(n=0;n<id09.length;n++){
        txCount09[n] = 0;
    }
    for(n=0;n<id10.length;n++){
        txCount10[n] = 0;
    }
    for(n=0;n<id11.length;n++){
        txCount11[n] = 0;
    }
}

function kamikakushi(){ // 要素をtx[i]に保持させ、非表示にする
    for(i=0;i<id00.length;i++){
        id00[i] = document.getElementById(id00[i]);
        tx00[i] = id00[i].firstChild.nodeValue; // 初期の文字列
        id00[i].innerHTML = '';
    }
    for(i=0;i<id01.length;i++){
        id01[i] = document.getElementById(id01[i]);
        tx01[i] = id01[i].firstChild.nodeValue; // 初期の文字列
        id01[i].innerHTML = '';
    }
    for(i=0;i<id02.length;i++){
        id02[i] = document.getElementById(id02[i]);
        tx02[i] = id02[i].firstChild.nodeValue; // 初期の文字列
        id02[i].innerHTML = '';
    }
    for(i=0;i<id03.length;i++){
        id03[i] = document.getElementById(id03[i]);
        tx03[i] = id03[i].firstChild.nodeValue; // 初期の文字列
        id03[i].innerHTML = '';
    }
    for(i=0;i<id04.length;i++){
        id04[i] = document.getElementById(id04[i]);
        tx04[i] = id04[i].firstChild.nodeValue; // 初期の文字列
        id04[i].innerHTML = '';
    }
    for(i=0;i<id05.length;i++){
        id05[i] = document.getElementById(id05[i]);
        tx05[i] = id05[i].firstChild.nodeValue; // 初期の文字列
        id05[i].innerHTML = '';
    }
    for(i=0;i<id06.length;i++){
        id06[i] = document.getElementById(id06[i]);
        tx06[i] = id06[i].firstChild.nodeValue; // 初期の文字列
        id06[i].innerHTML = '';
    }
    for(i=0;i<id07.length;i++){
        id07[i] = document.getElementById(id07[i]);
        tx07[i] = id07[i].firstChild.nodeValue; // 初期の文字列
        id07[i].innerHTML = '';
    }
    for(i=0;i<id08.length;i++){
        id08[i] = document.getElementById(id08[i]);
        tx08[i] = id08[i].firstChild.nodeValue; // 初期の文字列
        id08[i].innerHTML = '';
    }
    for(i=0;i<id09.length;i++){
        id09[i] = document.getElementById(id09[i]);
        tx09[i] = id09[i].firstChild.nodeValue; // 初期の文字列
        id09[i].innerHTML = '';
    }
    for(i=0;i<id10.length;i++){
        id10[i] = document.getElementById(id10[i]);
        tx10[i] = id10[i].firstChild.nodeValue; // 初期の文字列
        id10[i].innerHTML = '';
    }
    for(i=0;i<id11.length;i++){
        id11[i] = document.getElementById(id11[i]);
        tx11[i] = id11[i].firstChild.nodeValue; // 初期の文字列
        id11[i].innerHTML = '';
    }
}

function itimozi_00(){ //　一文字ずつ表示させる
    id00[count00].innerHTML = tx00[count00].substr( 0, ++txCount00[count00] )+"_"; // テキストの指定した数の間の要素を表示

    if(tx00[count00].length != txCount00[count00]){ // Count が初期の文字列の文字数と同じになるまでループ
        setTimeout("itimozi_00()",txSp); // 次の文字へ進む
    }else{
        id00[count00].innerHTML = tx00[count00].substr( 0, ++txCount00[count00] ); // テキストの指定した数の間の要素を表示
        count00++; // 次の段落に進む為のカウントアップ
        if(count00 != id00.length){ // id数が最後なら終了
            setTimeout("itimozi_00()",dly); // 次の段落へ進む
        }else{
            //テキスト読み終わったら表示する
            $('#a002').find('.layout_box img').fadeIn();
            $('#a002').find('.answer_layout').fadeIn();
        }
    }
}
function itimozi_01(){ //　一文字ずつ表示させる
    id01[count01].innerHTML = tx01[count01].substr( 0, ++txCount01[count01] )+"_"; // テキストの指定した数の間の要素を表示

    if(tx01[count01].length != txCount01[count01]){ // Count が初期の文字列の文字数と同じになるまでループ
        setTimeout("itimozi_01()",txSp); // 次の文字へ進む
    }else{
        id01[count01].innerHTML = tx01[count01].substr( 0, ++txCount01[count01] ); // テキストの指定した数の間の要素を表示
        count01++; // 次の段落に進む為のカウントアップ
        if(count01 != id01.length){ // id数が最後なら終了
            setTimeout("itimozi_01()",dly); // 次の段落へ進む
        }else{
            //テキスト読み終わったら表示する
            $('#a003').find('.layout_box img').fadeIn();
            $('#a003').find('.answer_layout').fadeIn();
        }
    }
}
function itimozi_02(){ //　一文字ずつ表示させる
    id02[count02].innerHTML = tx02[count02].substr( 0, ++txCount02[count02] )+"_"; // テキストの指定した数の間の要素を表示

    if(tx02[count02].length != txCount02[count02]){ // Count が初期の文字列の文字数と同じになるまでループ
        setTimeout("itimozi_02()",txSp); // 次の文字へ進む
    }else{
        id02[count02].innerHTML = tx02[count02].substr( 0, ++txCount02[count02] ); // テキストの指定した数の間の要素を表示
        count02++; // 次の段落に進む為のカウントアップ
        if(count02 != id02.length){ // id数が最後なら終了
            setTimeout("itimozi_02()",dly); // 次の段落へ進む
        }else{
            //テキスト読み終わったら表示する
            $('#a004').find('.layout_box img').fadeIn();
            $('#a004').find('.answer_layout').fadeIn();
        }
    }
}
function itimozi_03(){ //　一文字ずつ表示させる
    id03[count03].innerHTML = tx03[count03].substr( 0, ++txCount03[count03] )+"_"; // テキストの指定した数の間の要素を表示

    if(tx03[count03].length != txCount03[count03]){ // Count が初期の文字列の文字数と同じになるまでループ
        setTimeout("itimozi_03()",txSp); // 次の文字へ進む
    }else{
        id03[count03].innerHTML = tx03[count03].substr( 0, ++txCount03[count03] ); // テキストの指定した数の間の要素を表示
        count03++; // 次の段落に進む為のカウントアップ
        if(count03 != id03.length){ // id数が最後なら終了
            setTimeout("itimozi_03()",dly); // 次の段落へ進む
        }else{
            //テキスト読み終わったら表示する
            $('#a005').find('.layout_box img').fadeIn();
            $('#a005').find('.answer_layout').fadeIn();
        }
    }
}
function itimozi_04(){ //　一文字ずつ表示させる
    id04[count04].innerHTML = tx04[count04].substr( 0, ++txCount04[count04] )+"_"; // テキストの指定した数の間の要素を表示

    if(tx04[count04].length != txCount04[count04]){ // Count が初期の文字列の文字数と同じになるまでループ
        setTimeout("itimozi_04()",txSp); // 次の文字へ進む
    }else{
        id04[count04].innerHTML = tx04[count04].substr( 0, ++txCount04[count04] ); // テキストの指定した数の間の要素を表示
        count04++; // 次の段落に進む為のカウントアップ
        if(count04 != id04.length){ // id数が最後なら終了
            setTimeout("itimozi_04()",dly); // 次の段落へ進む
        }else{
            //テキスト読み終わったら表示する
            $('#a006').find('.layout_box img').fadeIn();
            $('#a006').find('.answer_layout').fadeIn();
        }
    }
}
function itimozi_05(){ //　一文字ずつ表示させる
    id05[count05].innerHTML = tx05[count05].substr( 0, ++txCount05[count05] )+"_"; // テキストの指定した数の間の要素を表示

    if(tx05[count05].length != txCount05[count05]){ // Count が初期の文字列の文字数と同じになるまでループ
        setTimeout("itimozi_05()",txSp); // 次の文字へ進む
    }else{
        id05[count05].innerHTML = tx05[count05].substr( 0, ++txCount05[count05] ); // テキストの指定した数の間の要素を表示
        count05++; // 次の段落に進む為のカウントアップ
        if(count05 != id05.length){ // id数が最後なら終了
            setTimeout("itimozi_05()",dly); // 次の段落へ進む
        }else{
            //テキスト読み終わったら表示する
            $('#a007').find('.layout_box img').fadeIn();
            $('#a007').find('.answer_layout').fadeIn();
        }
    }
}
function itimozi_06(){ //　一文字ずつ表示させる
    id06[count06].innerHTML = tx06[count06].substr( 0, ++txCount06[count06] )+"_"; // テキストの指定した数の間の要素を表示

    if(tx06[count06].length != txCount06[count06]){ // Count が初期の文字列の文字数と同じになるまでループ
        setTimeout("itimozi_06()",txSp); // 次の文字へ進む
    }else{
        id06[count06].innerHTML = tx06[count06].substr( 0, ++txCount06[count06] ); // テキストの指定した数の間の要素を表示
        count06++; // 次の段落に進む為のカウントアップ
        if(count06 != id06.length){ // id数が最後なら終了
            setTimeout("itimozi_06()",dly); // 次の段落へ進む
        }else{
            //テキスト読み終わったら表示する
            $('#a008').find('.layout_box img').fadeIn();
            $('#a008').find('.answer_layout').fadeIn();
        }
    }
}
function itimozi_07(){ //　一文字ずつ表示させる
    id07[count07].innerHTML = tx07[count07].substr( 0, ++txCount07[count07] )+"_"; // テキストの指定した数の間の要素を表示

    if(tx07[count07].length != txCount07[count07]){ // Count が初期の文字列の文字数と同じになるまでループ
        setTimeout("itimozi_07()",txSp); // 次の文字へ進む
    }else{
        id07[count07].innerHTML = tx07[count07].substr( 0, ++txCount07[count07] ); // テキストの指定した数の間の要素を表示
        count07++; // 次の段落に進む為のカウントアップ
        if(count07 != id07.length){ // id数が最後なら終了
            setTimeout("itimozi_07()",dly); // 次の段落へ進む
        }else{
            //テキスト読み終わったら表示する
            $('#a009').find('table').fadeIn();
        }
    }
}
function itimozi_08(){ //　一文字ずつ表示させる
    id08[count08].innerHTML = tx08[count08].substr( 0, ++txCount08[count08] )+"_"; // テキストの指定した数の間の要素を表示

    if(tx08[count08].length != txCount08[count08]){ // Count が初期の文字列の文字数と同じになるまでループ
        setTimeout("itimozi_08()",txSp); // 次の文字へ進む
    }else{
        id08[count08].innerHTML = tx08[count08].substr( 0, ++txCount08[count08] ); // テキストの指定した数の間の要素を表示
        count08++; // 次の段落に進む為のカウントアップ
        if(count08 != id08.length){ // id数が最後なら終了
            setTimeout("itimozi_08()",dly); // 次の段落へ進む
        }else{
            //テキスト読み終わったら表示する
            $('#a010').find('table').fadeIn();
        }
    }
}
function itimozi_09(){ //　一文字ずつ表示させる
    id09[count09].innerHTML = tx09[count09].substr( 0, ++txCount09[count09] )+"_"; // テキストの指定した数の間の要素を表示

    if(tx09[count09].length != txCount09[count09]){ // Count が初期の文字列の文字数と同じになるまでループ
        setTimeout("itimozi_09()",txSp); // 次の文字へ進む
    }else{
        id09[count09].innerHTML = tx09[count09].substr( 0, ++txCount09[count09] ); // テキストの指定した数の間の要素を表示
        count09++; // 次の段落に進む為のカウントアップ
        if(count09 != id09.length){ // id数が最後なら終了
            setTimeout("itimozi_09()",dly); // 次の段落へ進む
        }else{
            //テキスト読み終わったら表示する
            $('#a011').find('table').fadeIn();
        }
    }
}
function itimozi_10(){ //　一文字ずつ表示させる
    id10[count10].innerHTML = tx10[count10].substr( 0, ++txCount10[count10] )+"_"; // テキストの指定した数の間の要素を表示

    if(tx10[count10].length != txCount10[count10]){ // Count が初期の文字列の文字数と同じになるまでループ
        setTimeout("itimozi_10()",txSp); // 次の文字へ進む
    }else{
        id10[count10].innerHTML = tx10[count10].substr( 0, ++txCount10[count10] ); // テキストの指定した数の間の要素を表示
        count10++; // 次の段落に進む為のカウントアップ
        if(count10 != id10.length){ // id数が最後なら終了
            setTimeout("itimozi_10()",dly); // 次の段落へ進む
        }else{
            //テキスト読み終わったら表示する
            $('#a012').find('table').fadeIn();
        }
    }
}
function itimozi_11(){ //　一文字ずつ表示させる
    id11[count11].innerHTML = tx11[count11].substr( 0, ++txCount11[count11] )+"_"; // テキストの指定した数の間の要素を表示

    if(tx11[count11].length != txCount11[count11]){ // Count が初期の文字列の文字数と同じになるまでループ
        setTimeout("itimozi_11()",txSp); // 次の文字へ進む
    }else{
        id11[count11].innerHTML = tx11[count11].substr( 0, ++txCount11[count11] ); // テキストの指定した数の間の要素を表示
        count11++; // 次の段落に進む為のカウントアップ
        if(count11 != id11.length){ // id数が最後なら終了
            setTimeout("itimozi_11()",dly); // 次の段落へ進む
        }else{
            //テキスト読み終わったら表示する
            $('#a013').find('table').fadeIn();
        }
    }
}



/* --------- */
/* 問題と答え  */
/* --------- */

$(function(){

    $('#open_a002').click(function(event) {
        var id = $(this).attr('id').slice(-4);
        $('#'+id).fadeIn();     //次のarticleを表示
        $(this).fadeOut();      //ボタンを非表示
        $('#a001').fadeOut();   //準備ページの非表示
        countDown();            //カウントダウンスタート
        /* セリフの発火 */
        itimozi_00();
    });

    $('#open_a003').click(function(event) {
        var question = $(this).parents('table');
        if ( question.find('.answer_form').val() == 'ファイア' ) {
            /* 正解 */
            var id = $(this).attr('id').slice(-4);
            $('#'+id).fadeIn();     //次のarticleを表示
            $(this).fadeOut();      //ボタンを非表示
            question.find('.answer_ng').hide();
            /* セリフの発火 */
            itimozi_01();
        }else{
            /* 不正解 */
            question.find('.answer_ng').hide();
            question.find('.answer_ng').fadeIn();
        };
    });

    $('#open_a004').click(function(event) {
        var question = $(this).parents('table');
        if ( question.find('.answer_form').val() == 'サンダー' ) {
            /* 正解 */
            var id = $(this).attr('id').slice(-4);
            $('#'+id).fadeIn();     //次のarticleを表示
            $(this).fadeOut();      //ボタンを非表示
            question.find('.answer_ng').hide();
            /* セリフの発火 */
            itimozi_02();
        }else{
            /* 不正解 */
            question.find('.answer_ng').hide();
            question.find('.answer_ng').fadeIn();
        };
    });

    $('#open_a005').click(function(event) {
        var question = $(this).parents('table');
        if (
            question.find('.answer_form').val() == '居眠りする'
            || question.find('.answer_form').val() == '居眠り'
            || question.find('.answer_form').val() == 'おねむりする'
            || question.find('.answer_form').val() == 'いねむり'
            || question.find('.answer_form').val() == 'doze'
            || question.find('.answer_form').val() == '/doze'
        ) {
            /* 正解 */
            var id = $(this).attr('id').slice(-4);
            $('#'+id).fadeIn();     //次のarticleを表示
            $(this).fadeOut();      //ボタンを非表示
            question.find('.answer_ng').hide();
            /* セリフの発火 */
            itimozi_03();
        }else{
            /* 不正解 */
            question.find('.answer_ng').hide();
            question.find('.answer_ng').fadeIn();
        };
    });

    $('#open_a006').click(function(event) {
        var question = $(this).parents('table');
        if ( question.find('.answer_form').val() == 'クリスタル' ) {
            /* 正解 */
            var id = $(this).attr('id').slice(-4);
            $('#'+id).fadeIn();     //次のarticleを表示
            $(this).fadeOut();      //ボタンを非表示
            question.find('.answer_ng').hide();
            /* セリフの発火 */
            itimozi_04();
        }else{
            /* 不正解 */
            question.find('.answer_ng').hide();
            question.find('.answer_ng').fadeIn();
        };
    });

    $('#open_a007').click(function(event) {
        var question = $(this).parents('table');
        if ( question.find('.answer_form').val() == 'トルネド' ) {
            /* 正解 */
            var id = $(this).attr('id').slice(-4);
            $('#'+id).fadeIn();     //次のarticleを表示
            $(this).fadeOut();      //ボタンを非表示
            question.find('.answer_ng').hide();
            /* セリフの発火 */
            itimozi_05();
        }else{
            /* 不正解 */
            question.find('.answer_ng').hide();
            question.find('.answer_ng').fadeIn();
        };
    });

    $('#open_a008').click(function(event) {
        var question = $(this).parents('table');
        if ( question.find('.answer_form').val() == 'レビテト' ) {
            /* 正解 */
            var id = $(this).attr('id').slice(-4);
            $('#'+id).fadeIn();     //次のarticleを表示
            $(this).fadeOut();      //ボタンを非表示
            question.find('.answer_ng').hide();
            /* セリフの発火 */
            itimozi_06();
            /*回転を止める*/
            $('#a007').find('.layout_box').removeClass('tornade');
            /* レビテト効果発動 */
            $('.layout_box').children('.block_layer').remove();
        }else{
            /* 不正解 */
            question.find('.answer_ng').hide();
            question.find('.answer_ng').fadeIn();
        };
    });

    $('#open_a009').click(function(event) {
        var question = $(this).parents('table');
        if ( question.find('.answer_form').val() == 'アルテマ' ) {
            /* 正解 */
            $('#a009').fadeIn();     //次のarticleを表示
            $(this).fadeOut();      //ボタンを非表示
            /*タイマーストップ*/
            $('#count_down').addClass('stop');
            /* セリフの発火 */
            itimozi_07();

            /*tweet*/
            var min  = $('#count_down').find('#min').html();
            var sec  = $('#count_down').find('#sec').html();
            min = ('0'+min).slice(-2);
            sec = ('0'+sec).slice(-2);
            $('.tweet_button_1').socialbutton('twitter', {
                button: 'horizontal',
                text: '脱出成功！50％クリア！残り時間'+min+':'+sec+'\nFF14脱出ゲーム「禁断の呪文を解読せよ」 #FF14脱出ゲーム',
                url: 'http://ff14moo.moo.jp/escape_game.html'
            });
        }else if ( question.find('.answer_form').val() == 'リレイズ' ) {
            /* 正解 */
            $('#a010').fadeIn();     //次のarticleを表示
            $(this).fadeOut();      //ボタンを非表示
            /*タイマーストップ*/
            $('#count_down').addClass('stop');
            /* セリフの発火 */
            itimozi_08();

            /*tweet*/
            var min  = $('#count_down').find('#min').html();
            var sec  = $('#count_down').find('#sec').html();
            min = ('0'+min).slice(-2);
            sec = ('0'+sec).slice(-2);
            $('.tweet_button_1').socialbutton('twitter', {
                button: 'horizontal',
                text: '脱出成功！80%クリア！残り時間'+min+':'+sec+'\nFF14脱出ゲーム「禁断の呪文を解読せよ」 #FF14脱出ゲーム',
                url: 'http://ff14moo.moo.jp/escape_game.html'
            });
        }else if ( question.find('.answer_form').val() == 'アレイズ' ) {
            /* 正解 */
            $('#a011').fadeIn();     //次のarticleを表示
            $(this).fadeOut();      //ボタンを非表示
            /*タイマーストップ*/
            $('#count_down').addClass('stop');
            /* セリフの発火 */
            itimozi_09();

            /*tweet*/
            var min  = $('#count_down').find('#min').html();
            var sec  = $('#count_down').find('#sec').html();
            min = ('0'+min).slice(-2);
            sec = ('0'+sec).slice(-2);
            $('.tweet_button_1').socialbutton('twitter', {
                button: 'horizontal',
                text: '脱出成功！100%クリア！残り時間'+min+':'+sec+'\nFF14脱出ゲーム「禁断の呪文を解読せよ」 #FF14脱出ゲーム',
                url: 'http://ff14moo.moo.jp/escape_game.html'
            });
        }else{
            /* 不正解 */
            $('#a013').fadeIn();     //次のarticleを表示
            $(this).fadeOut();      //ボタンを非表示
            /*タイマーストップ*/
            $('#count_down').addClass('stop2');
            /* セリフの発火 */
            itimozi_11();
        };
    });

})

$(function(){
    /*回転を止める*/
    $('#a007').find('.layout_box').mousedown(function() {
        $(this).removeClass('tornade');
    });
    $('#a007').find('.layout_box').bind('touchstart', function() {
        $(this).removeClass('tornade');
    });
    /*答え終わってなかったら再度まわす*/
    $('#a007').find('.layout_box').mouseup(function() {
        if ( $('#a008').css('display') == 'none' ) {
            $(this).addClass('tornade');
        }
    });
    $('#a007').find('.layout_box').bind('touchleave', function() {
        if ( $('#a008').css('display') == 'none' ) {
            $(this).addClass('tornade');
        }
    });

    hint();
    hint_unlock();

    $('#open_b002').click(function(event) {
        $('#b002').fadeIn();     //次のarticleを表示
        $(this).fadeOut();      //ボタンを非表示
    });

    $('.math_check_btn').click(function(){
        if ( !$(this).hasClass('disable') ) {
            if ( $('.a006_a').val() == 145 ) {
                $('.a006_a_check').text('◯').css('color','green');
            }else{
                $('.a006_a_check').text('×').css('color','red');
            }
            if ( $('.a006_b').val() == 181 ) {
                $('.a006_b_check').text('◯').css('color','green');
            }else{
                $('.a006_b_check').text('×').css('color','red');
            }
            if ( $('.a006_c').val() == 97 ) {
                $('.a006_c_check').text('◯').css('color','green');
            }else{
                $('.a006_c_check').text('×').css('color','red');
            }
            setTimeout(function(){
                $('.math_check_btn').removeClass('disable');
            }, 1000*60);
        };
        $(this).addClass('disable');
    })

    //value値を削除
    $('input').val('');

    /*tweet*/
    $('.tweet_button').socialbutton('twitter', {
        button: 'horizontal',
        text: 'FF14脱出ゲーム「禁断の呪文を解読せよ」 #FF14脱出ゲーム',
        url: 'http://ff14moo.moo.jp/escape_game.html'
    });
    $('.tweet_button_2').socialbutton('twitter', {
        button: 'horizontal',
        text: '脱出失敗…。\nFF14脱出ゲーム「禁断の呪文を解読せよ」 #FF14脱出ゲーム',
        url: 'http://ff14moo.moo.jp/escape_game.html'
    });
});

function hint() {
    $('.hint').click(function(){
        if ( $(this).children('.hint_icon').hasClass('unlock') ) {
            if ( $(this).hasClass('hint_a002') ) {
                $('.hint_a002').find('.hint_text').text('使われないのは「ミューヌ」です。 一番下の横列は「アリゼー」です。');
            }
            if ( $(this).hasClass('hint_a003') ) {
                $('.hint_a003').find('.hint_text').text('ファイアだと4文字、ストーンだと5文字になるように変換する必要があります。');
            }
            if ( $(this).hasClass('hint_a004_1') ) {
                $('.hint_a004_1').find('.hint_text').text('タルは合計で3つあります。1階も見てくださいね。');
            }
            if ( $(this).hasClass('hint_a004_2') ) {
                $('.hint_a004_2').find('.hint_text').text('ミニオン同士を線で結ぶといいかもしれません。');
            }
            if ( $(this).hasClass('hint_a005_1') ) {
                $('.hint_a005_1').find('.hint_text').text('三桁+三桁の計算で答えが四桁になっているので、△は「1」で確定します。');
            }
            if ( $(this).hasClass('hint_a005_2') ) {
                $('.hint_a005_2').find('.hint_text').text('☆は「0」です。□は「2」です。');
            }
            if ( $(this).hasClass('hint_a006_1') ) {
                $('.hint_a006_1').find('.hint_text').text('Aのひとつめ、ガーゴイル像は「4」です。Cのひとつめ、庭の飛び石は「9」です。');
            }
            if ( $(this).hasClass('hint_a006_2') ) {
                $('.hint_a006_2').find('.hint_text').text('Aは「145」です。Bは「181」です。');
            }
            if ( $(this).hasClass('hint_a007_1') ) {
                $('.hint_a007_1').find('.hint_text').text('数字は横、アルファベットは縦を表しています。');
            }
            if ( $(this).hasClass('hint_a007_2') ) {
                $('.hint_a007_2').find('.hint_text').text('Aは「あ」、Bは「い」、Cは「う」です。　1は「K」、2は「S」、3は「T」です。');
            }
        }
    });
}
function hint_unlock() {
    var min  = $('#count_down').find('#min').html();

    if ( min < 82 ) { $('.hint_a002').find('.hint_icon').removeClass('lock').addClass('unlock'); }
    if ( min < 74 ) { $('.hint_a003').find('.hint_icon').removeClass('lock').addClass('unlock'); }
    if ( min < 66 ) { $('.hint_a004_1').find('.hint_icon').removeClass('lock').addClass('unlock'); }
    if ( min < 58 ) { $('.hint_a004_2').find('.hint_icon').removeClass('lock').addClass('unlock'); }
    if ( min < 50 ) { $('.hint_a005_1').find('.hint_icon').removeClass('lock').addClass('unlock'); }
    if ( min < 42 ) { $('.hint_a005_2').find('.hint_icon').removeClass('lock').addClass('unlock'); }
    if ( min < 34 ) { $('.hint_a006_1').find('.hint_icon').removeClass('lock').addClass('unlock'); }
    if ( min < 26 ) { $('.hint_a006_2').find('.hint_icon').removeClass('lock').addClass('unlock'); }
    if ( min < 18 ) { $('.hint_a007_1').find('.hint_icon').removeClass('lock').addClass('unlock'); }
    if ( min < 10 ) { $('.hint_a007_2').find('.hint_icon').removeClass('lock').addClass('unlock'); }

    setTimeout('hint_unlock()', 1000);
}

function countDown() {
    $('#count_down').show();

    $('#count_down').find('.clear').hide();
    $('#count_down').find('.timeUp').hide();

    var min  = $('#count_down').find('#min').html();
    var sec  = $('#count_down').find('#sec').html();

    if ( min == 00 && sec == 00 ) {
        // タイムアップ時の処理
        $('#count_down').addClass('red').removeClass('fc0');
        $('#count_down').find('.timer').addClass('color_red').removeClass('color_fc0');
        $('#count_down').find('#min').addClass('color_red').removeClass('color_fc0');
        $('#count_down').find('#sec').addClass('color_red').removeClass('color_fc0');
        $('#count_down').find('.timeUp').show();

        /*答えボタンを消す*/
        $('#a002').fadeOut();
        $('#a003').fadeOut();
        $('#a004').fadeOut();
        $('#a005').fadeOut();
        $('#a006').fadeOut();
        $('#a007').fadeOut();
        $('#a008').fadeOut();
        /*時間切れview表示*/
        $('#a012').fadeIn();
        /* セリフの発火 */
        itimozi_10();

    } else if ( $('#count_down').hasClass('stop') ) {
        //クリア時の挙動、正解
        $('#count_down').addClass('green').removeClass('fc0').removeClass('red');
        $('#count_down').find('.timer').addClass('color_green').removeClass('color_fc0').removeClass('color_red');
        $('#count_down').find('#min').addClass('color_green').removeClass('color_fc0').removeClass('color_red');
        $('#count_down').find('#sec').addClass('color_green').removeClass('color_fc0').removeClass('color_red');
        $('#count_down').find('.clear').show();

    } else if ( $('#count_down').hasClass('stop2') ) {
        //クリア時の挙動、回答間違い
        $('#count_down').addClass('red').removeClass('fc0');
        $('#count_down').find('.timer').addClass('color_red').removeClass('color_fc0');
        $('#count_down').find('#min').addClass('color_red').removeClass('color_fc0');
        $('#count_down').find('#sec').addClass('color_red').removeClass('color_fc0');
        $('#count_down').find('.timeUp').show();

    } else {
        if ( min < 10 ) {
            //残り10分以下
            $('#count_down').addClass('fc0');
            $('#count_down').find('.timer').addClass('color_fc0');
            $('#count_down').find('#min').addClass('color_fc0');
            $('#count_down').find('#sec').addClass('color_fc0');
        }
        sec--;
        if ( sec < 0 ) {
            min--;
            sec = 59;
        }
        min = ('0'+min).slice(-2);
        sec = ('0'+sec).slice(-2);
        $('#count_down').find('#min').html(min);
        $('#count_down').find('#sec').html(sec);
        setTimeout('countDown()', 1000);
    }

}
