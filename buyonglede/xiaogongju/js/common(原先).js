/* fastclick */
window.addEventListener('load', function() {
    new FastClick(document.body);
}, false);

//背景中央寄せ
function backgroundMargin() {
    var ww = $(window).width();
    var iw = $('#background img').width();
    var w2 = (ww - iw)/2;
    $('#background').css('margin-left',w2);
}

//スマホの判定
function deviceCechek() {
    var windowWitdth = $(window).width();
    if ( windowWitdth < 640 ) {
        if ( !$('#view_container').hasClass('device_sp') ) {
            $('#view_container').addClass('device_sp');
        }
    }else{
        if ( $('#view_container').hasClass('device_sp') ) {
            $('#view_container').removeClass('device_sp');
        }
    }
}

//stage横幅をスマホ閲覧時に調整する
function stageWidthSP() {
    if ($('#view_container').hasClass('device_sp')) {
        var windowWitdth = $(window).width();
        $('#stage').css('width','100%');
    }else{
        $('#stage').css('width','980');
    };
}

//画面サイズを拾ってページの高さを調整
function stageHeight() {
    var h = $(window).height();
    var s = $('#stage').height()+41;
    var f = $('#footer').height();
    if( h > s+f ){
        var pad = h-s-f;
        $('#stage').css('padding-bottom',pad+'px')
    }else{
        $('#stage').css('padding-bottom','10px')
    }
}

$(function(){

    // ヘッダー生成
    $('#header').append(
        '<a class="gototop" href="./index.html">首页</a>&nbsp;&nbsp;&nbsp;&nbsp;<a class="gototop" href="http://www.ffxiv.cn/">主站</a>'
        ,'<div class="btn_menu">MENU</div>'
    );    

    // メニュー生成
    var menuArray = [
          ['patch3.5checklist', '3.5任务列表', 'New!']
        , ['anima_weapon_progress', '元灵武器进度确认器', 'update']
        , ['orchestrion_list', '管弦乐琴乐谱集', '']
        , ['airship_boyager_settings', '飞空艇计算-掉落', '']
        , ['map_treasure', '挖宝攻略Map', '']
        , ['G8', '藏宝图-G8-巨龙革', '']
        , ['G7', '藏宝图-G7-巨龙革', '']
        , ['diadem_map', '云海探索', '']
        , ['sightseeing_clock', '探索笔记', 'update']
        , ['JGHK', '九宫幻卡', 'New!']
        , ['chocobo', '陆行鸟染色', '']
        , ['dye_list', '染色素材一览', '']
        , ['mokujin_attack', '木人歼灭战DPS计算工具', '']
		, ['HunterMonster_map2.0', '2.0狩猎地图', '']
        , ['HunterMonster_map3.0', '3.0狩猎地图', '']        
    ];
    for (var i = 0; i < menuArray.length; i++) {
        $('#menu, .index_menu').children('ul').append('<li><a href="./' + menuArray[i][0] + '.html"><img src="./img/menu/' + menuArray[i][0] + '.png"><div>' + menuArray[i][1] + '</div><p>' + menuArray[i][2] + '</p></a></li>');
    }

    // フッター生成
    $('#footer').append(
        '本网页上的会社名・道具名・系统名等均为各公司的注册商标。<br>'
        ,'Copyright (C) 2010 - 2016 SQUARE ENIX CO., LTD. All Rights Reserved.<br>'
    );

    var url = window.location;
    var path = url.pathname.split('/');
    var file_name = path.pop();

    //スマホチェック
    deviceCechek();
    if( file_name == 'index.html') {
    }else{
        stageHeight();
    }
    // stageWidthSP();

    //containerに#background追加
    $('#view_container').prepend('<div id="background"><img><div></div></div>')

    //windowリサイズ時に背景の位置調整
    $(window).resize(function() {
        backgroundMargin();
        deviceCechek();
        if( file_name == 'index.html') {
        }else{
            stageHeight()
        }
        // stageWidthSP();
    });

    $('.tab_menu').click(function(){
        stageHeight()
    })

    // 背景画像指定
    var url = window.location;
    var path = url.pathname.split('/');
    var file_name = path.pop();
    switch(file_name) {
        // case 'index.html':
        //     $('#background img').attr('src','./img/bg/bg_0000.png');
        //     break;
        case 'anima_weapon_progress.html':
            $('#background img').attr('src','./img/bg/anima_weapon_progress.jpg');
            break;
        case 'atma_clock.html':
            $('#background img').attr('src','./img/bg/atma_clock.jpg');
            break;
        case 'airship_boyager_settings.html':
            $('#background img').attr('src','./img/bg/airship_boyager_settings.jpg');
            break;
        case 'diadem_map.html':
            $('#background img').attr('src','./img/bg/diadem_map.jpg');
            break;
        case 'dye_list.html':
            $('#background img').attr('src','./img/bg/dye_list.jpg');
            break;
        case 'gatherer_clock.html':
            $('#background img').attr('src','./img/bg/gatherer_clock.jpg');
            break;
        case 'gatherer_scrip.html':
            $('#background img').attr('src','./img/bg/gatherer_scrip.jpg');
            break;
        case 'jinrou_gm_tool.html':
            $('#background img').attr('src','./img/bg/jinrou_gm_tool.jpg');
            break;
        case 'mokujin_attack.html':
            $('#background img').attr('src','./img/bg/mokujin_attack.jpg');
            break;
        case 'ninja_notice.html':
            $('#background img').attr('src','./img/bg/ninja_notice.jpg');
            break;
        case 'orchestrion_list.html':
            $('#background img').attr('src','./img/bg/orchestrion_list.jpg');
            break;
        case 'sightseeing_clock.html':
            $('#background img').attr('src','./img/bg/sightseeing_clock.jpg');
            break;
        case 'tripletryad_list.html':
            $('#background img').attr('src','./img/bg/tripletryad_list.jpg');
            break;
        case 'twitter_icon_generator.html':
            $('#background img').attr('src','./img/bg/twitter_icon_generator.jpg');
            break;
        default:
            $('#background img').attr('src','./img/bg/default.jpg');
            break;
    }
    $("#background img").bind("load",function(){
        backgroundMargin();
    });

    // メニュー表示
    $('#header .btn_menu,#menu ul').click(function() {
        if ( !$('#menu').hasClass('menu_on') ){
            $('#menu').addClass('menu_on');
            setTimeout(function(){
                $('#menu ul').css('opacity','1');
            },1);
        }else{
            $('#menu ul').css('opacity','0');
            setTimeout(function(){
                $('#menu').removeClass('menu_on');
            },300);
        }
    });

})