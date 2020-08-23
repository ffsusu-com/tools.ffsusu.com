/* ボタン内のテキスト書き換え */
function menuBtnRetext(){
    if($('.menu_btn').hasClass('on')){
        $('.menu_btn').text('×');
    }else{
        $('.menu_btn').text('≡');
    };
}

$(function(){

    var windowWidth  = $(window).width();
    var windowHeight = $(window).height();
    var bodyHeight   = windowHeight+17;
    var pcStageHeight = bodyHeight-41;
    var spStageHeight = bodyHeight-102;

    $('body').css('height',bodyHeight);

    /* ビューの横幅でモード切替 */
    if (windowWidth < 400) {
        $('body').addClass('viewmode_sp');
        $('#stage').css('min-height',spStageHeight);
    }else{
        $('body').addClass('viewmode_pc');
        $('#stage').css('min-height',pcStageHeight);
    }

    /* メニュー位置書き換え */
    if( $('body').hasClass('viewmode_pc') ){
        $('#view_container').scroll(function() {
            var windowscroll = $('#view_container').scrollTop();
            $('#menu').css('top',windowscroll+40);
        });
    };

    /* メニューOPEN/CLOSE */
    $('.menu_btn').click( function(){
        $(this).toggleClass('on');
        $('#view_container').toggleClass('menu_on');
        menuBtnRetext();
    })
    /* メニューCLOSE */
    $('#stage').click( function(){
        if( $('#view_container').hasClass('menu_on') ){
            $('.menu_btn').removeClass('on');
            $('#view_container').removeClass('menu_on');
            menuBtnRetext();
        }
    })

    // メニュー生成
    $('#menu').children('ul').append(
        '<li><a href="./anima_weapon_progress.html">アニマウェポン進捗確認ツール</a></li>'
        ,'<li><a href="./diadem_map.html">ディアデム諸島マップ</a></li>'
        ,'<li><a href="./airship_boyager_settings.html">ボイジャーコスト計算ツール</a></li>'
        ,'<li><a href="./twitter_icon_generator.html">TT風Twitterアイコンジェネレーター</a></li>'
        ,'<li><a href="./tripletryad_list.html">TT収集メモ</a></li>'
        ,'<li><a href="./jinrou_gm_tool.html">人狼GMツール</a></li>'
        ,'<li><a href="./gatherer_scrip.html">収集品特化ギャザラークロック</a></li>'
        ,'<li><a href="./gatherer_clock.html">ギャザラークロック</a></li>'
        ,'<li><a href="./atma_clock.html">アートマクロック</a></li>'
        ,'<li><a href="./sightseeing_clock.html">探検手帳クロック</a></li>'
        ,'<li><a href="./dye_list.html">染色材リスト</a></li>'
        ,'<li><a href="./ninja_notice.html">忍者講座</a></li>'
    )

    // フッター生成
    $('#footer').append(
        '記載されている会社名・製品名・システム名などは、各社の商標、または登録商標です。<br>'
        ,'Copyright (C) 2010 - 2016 SQUARE ENIX CO., LTD. All Rights Reserved.<br>'
    )

})