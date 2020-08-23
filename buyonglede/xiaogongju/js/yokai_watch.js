function toDoubleDigits(num){
    num += '';
    if ( num.length === 1 ) {
        num = "0" + num;
    }
    return num;
};

function eventCountDown(){
    var from = new Date().getTime();
    var to   = new Date("2016/10/3 23:59:59").getTime();

    var countdown = ( to - from );
    var tmp  = Math.floor(countdown/1000);
    var sec  = toDoubleDigits(tmp % 60);
    var min  = toDoubleDigits(Math.floor(tmp/60) % 60);
    var hou  = toDoubleDigits(Math.floor(tmp/60/60) % 24);
    var day  = Math.floor(tmp/60/60/24);

    if ( countdown > 1 ) {
        $('.countdown_wrapper .open').show();
        $('.countdown_wrapper .close').hide();
        $('#stage #countDays').text(day);
        $('#stage #countHours').text(hou);
        $('#stage #countMinitues').text(min);
        $('#stage #countSecounds').text(sec);
        $('.countdown_notice .text_3').text(day);
    }else{
        $('.countdown_wrapper .open').hide();
        $('.countdown_wrapper .close').show();
        $('.countdown_notice').hide();
    };

    setTimeout('eventCountDown()',1000);
};

function saveMedaldata(){
    var countMedal = $('.yokai_medal_checklist').find('td').length;
    var medalArray = [];
    //メダル所持数を配列にぶっこむ
    for ( var i = 0; i < countMedal; i++ ) {
        haveMedals = $('.yokai_medal_checklist').find('td').eq(i).find('input').val();
        medalArray.push(haveMedals);
    };
    //配列をクッキー保存
    $.cookie("medalData",medalArray, { expires: 365 , path: "/yokai_watch.html" });
};

function progress_calculation() {
    var weapon_001_medal = Math.floor($('.yokai_medal_checklist').find('.weapon_001').find('input').val());
    var weapon_002_medal = Math.floor($('.yokai_medal_checklist').find('.weapon_002').find('input').val());
    var weapon_003_medal = Math.floor($('.yokai_medal_checklist').find('.weapon_003').find('input').val());
    var weapon_004_medal = Math.floor($('.yokai_medal_checklist').find('.weapon_004').find('input').val());
    var weapon_005_medal = Math.floor($('.yokai_medal_checklist').find('.weapon_005').find('input').val());
    var weapon_006_medal = Math.floor($('.yokai_medal_checklist').find('.weapon_006').find('input').val());
    var weapon_007_medal = Math.floor($('.yokai_medal_checklist').find('.weapon_007').find('input').val());
    var weapon_008_medal = Math.floor($('.yokai_medal_checklist').find('.weapon_008').find('input').val());
    var weapon_009_medal = Math.floor($('.yokai_medal_checklist').find('.weapon_009').find('input').val());
    var weapon_010_medal = Math.floor($('.yokai_medal_checklist').find('.weapon_010').find('input').val());
    var weapon_011_medal = Math.floor($('.yokai_medal_checklist').find('.weapon_011').find('input').val());
    var weapon_012_medal = Math.floor($('.yokai_medal_checklist').find('.weapon_012').find('input').val());
    var weapon_013_medal = Math.floor($('.yokai_medal_checklist').find('.weapon_013').find('input').val());
    var all_medal        = weapon_001_medal+weapon_002_medal+weapon_003_medal+weapon_004_medal+weapon_005_medal+weapon_006_medal+weapon_007_medal+weapon_008_medal+weapon_009_medal+weapon_010_medal+weapon_011_medal+weapon_012_medal+weapon_013_medal;

    var weapon_001_progress = Math.floor(weapon_001_medal / 222 * 100);
    var weapon_002_progress = Math.floor(weapon_002_medal / 222 * 100);
    var weapon_003_progress = Math.floor(weapon_003_medal / 222 * 100);
    var weapon_004_progress = Math.floor(weapon_004_medal / 222 * 100);
    var weapon_005_progress = Math.floor(weapon_005_medal / 222 * 100);
    var weapon_006_progress = Math.floor(weapon_006_medal / 222 * 100);
    var weapon_007_progress = Math.floor(weapon_007_medal / 222 * 100);
    var weapon_008_progress = Math.floor(weapon_008_medal / 222 * 100);
    var weapon_009_progress = Math.floor(weapon_009_medal / 222 * 100);
    var weapon_010_progress = Math.floor(weapon_010_medal / 222 * 100);
    var weapon_011_progress = Math.floor(weapon_011_medal / 222 * 100);
    var weapon_012_progress = Math.floor(weapon_012_medal / 222 * 100);
    var weapon_013_progress = Math.floor(weapon_013_medal / 222 * 100);

    $('.progress_box').find('.bar_001').css('width',weapon_001_progress+'%');
    $('.progress_box').find('.bar_002').css('width',weapon_002_progress+'%');
    $('.progress_box').find('.bar_003').css('width',weapon_003_progress+'%');
    $('.progress_box').find('.bar_004').css('width',weapon_004_progress+'%');
    $('.progress_box').find('.bar_005').css('width',weapon_005_progress+'%');
    $('.progress_box').find('.bar_006').css('width',weapon_006_progress+'%');
    $('.progress_box').find('.bar_007').css('width',weapon_007_progress+'%');
    $('.progress_box').find('.bar_008').css('width',weapon_008_progress+'%');
    $('.progress_box').find('.bar_009').css('width',weapon_009_progress+'%');
    $('.progress_box').find('.bar_010').css('width',weapon_010_progress+'%');
    $('.progress_box').find('.bar_011').css('width',weapon_011_progress+'%');
    $('.progress_box').find('.bar_012').css('width',weapon_012_progress+'%');
    $('.progress_box').find('.bar_013').css('width',weapon_013_progress+'%');

    $('.progress_box').find('.progress_txt').text(all_medal+'/222');

    $('.medal_count_text').text(all_medal);
    $('.countdown_notice .text_1').text(all_medal);
    $('.countdown_notice .text_2').text(222-all_medal);

    var day = $('#countDays').text();
    if( day == 0 ){ var day = 1};
    var onedayMedal = (222-all_medal)/day;
    var onedayMedal = onedayMedal * 100;
    var onedayMedal = Math.ceil(onedayMedal);
    var onedayMedal = onedayMedal / 100;


    $('.countdown_notice .text_4').text(onedayMedal);

}

function weaponCheck() {
    var weaponCount = $('.yokai_medal_checklist .complete').length;
    $('.weapon_count_text').text(weaponCount);
    weaponCountMemo()

    $('.yokai_medal_checklist .image_wrapper').click(function(){
        if( !$(this).parent('td').hasClass('complete') ){
            $(this).parent('td').addClass('complete');
        }else{
            $(this).parent('td').removeClass('complete');
        }
        var weaponCount = $('.yokai_medal_checklist .complete').length;
        $('.weapon_count_text').text(weaponCount);

        weaponCountMemo()
        saveWeapondata()
    })
}

function weaponCountMemo() {
    var weaponCount = $('.yokai_medal_checklist .complete').length;
    $('.weapon_count_memo').find('p').removeClass('color_red');
    for ( var i = 0; i < weaponCount; i++ ) {
        $('.weapon_count_memo').find('p').eq(i).addClass('color_red');
    }
}

function saveWeapondata(){
    var countWeapon = $('.yokai_medal_checklist').find('td').length;
    var weaponArray = [];
    //0or1で配列にぶっこむ
    for ( var i = 0; i < countWeapon; i++ ) {
        if ($('.yokai_medal_checklist').find('td').eq(i).hasClass('complete')) {
            weaponArray.push(1);
        }else{
            weaponArray.push(0);
        };
    };
    //配列をクッキー保存
    $.cookie("weaponData",weaponArray, { expires: 365 , path: "/yokai_watch.html" });
};

$(function(){

    // 自動JSON化を有効に
    $.cookie.json = true;

    //保存クッキーの展開
    if($.cookie("medalData")){
        var medalDataArray = $.cookie("medalData");
        var medalData = medalDataArray.length;
        for (var i = 0; i < medalData; i++) {
            $('.yokai_medal_checklist').find('td').eq(i).find('input').val(medalDataArray[i]);
        };
    };
    if($.cookie("weaponData")){
        var weaponDataArray = $.cookie("weaponData");
        var weaponData = weaponDataArray.length;
        for (var i = 0; i < weaponData; i++) {
            if ( weaponDataArray[i]=='1') {
                $('.yokai_medal_checklist').find('td').eq(i).addClass('complete');
            };
        };
    };

    var isset = function(data){
        if(data === "" || data === null || data === undefined){
            return false;
        }else{
            return true;
        };
    };

    eventCountDown();
    progress_calculation();
    weaponCheck()

    $('input').change(function(){
        progress_calculation();
        saveMedaldata();
    });
});